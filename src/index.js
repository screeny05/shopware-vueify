import PluginBase from 'shopware/plugin-base';
import Vue from 'vue';
import $ from 'jquery';

if(typeof PluginBase === 'undefined' || typeof Vue === 'undefined' || typeof $ === 'undefined') {
    throw new Error('Unmet dependencies. shopware-vueify needs Vue, jQuery and $.PluginBase globally available.');
}

export default component => ({
    Component: Vue.extend(component),

    opts: (() => {
        const opts = {};

        // add empty default options
        // (vue handles prop-defaults & -validation by itself)
        if(typeof component.props === 'object') {
            Object.keys(component.props).forEach(p => { opts[p] = null; });
        }

        return opts;
    })(),

    init() {
        // prepare props data
        this.applyDataAttributes();

        this.$children = this.$el
            .children()
            .detach();

        this.$mountPoint = $('<div>')
            .append(this.$children)
            .appendTo(this.$el);

        // enable $.override()
        const BoundComponent = this.Component.extend(this);

        this.vm = new BoundComponent({
            propsData: this.opts,
            name: this.getName(),
            $plugin: this, // reference to this plugin
        });

        // pseudo-parent
        this.vm.supercomponent = component;

        // replace mount point with component
        this.vm.$mount(this.$mountPoint.get(0));
    },

    _destroy() {
        // trick the base into thinking the wrapper is our element
        PluginBase.prototype._destroy.call(this);

        // destroy vm instance
        this.vm.$destroy();

        // remove vue element from dom and re-add original children
        this.$el
            .empty()
            .append(this.$children);
    },
});
