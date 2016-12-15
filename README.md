# shopware-vueify
use vue components with the shopware statemanager



## Requirements
Requires Vue, jQuery and Shopware JS environment.



## Basic usage
```
vueify(<Component>) : <Shopware-jQuery-Plugin>
```

```javascript
$.plugin('myComponent', vueify({
    template: `
        <div>
            <i>Hello, {{ who }}!</i>
            <button @click="toggleWho">toggle</button>
        </div>
    `,
    data() {
        return { who: 'world' };
    },
    methods: {
        toggleWho(e) {
            this.who = this.who === 'world' ? 'there' : 'world';
        }
    }
}));

StateManager.addPlugin('[data-my-component="true"]', 'myComponent', ['l', 'xl']);
```

Can be `require`d. If not, `vueify` is available globally.


### Stand-alone component files
Can be used with vue-files:
```javascript
const MyComponent = require('components/my-component.vue');
$.plugin('myComponent', vueify(MyComponent));
```


### Properties
Vueify has support for options, which get passed to vue as properties.
Including support for shopware inline-option style.
```javascript
$.plugin('myComponent', vueify({
    props: {
        value: Number,
        additional: String
    },

    template: '<div>{{ value }}</div>'
}));

StateManager.addPlugin('[data-my-component="true"]', 'myComponent', { additional: 'Foobar' });
```

```html
<div data-my-component="true" data-value="135"></div>
```


### Overriding
`$.override` is supported. Vueify makes the parent-component available to developers as `supercomponent`.
```javascript
$.plugin('myComponent', vueify({
    template: `
        <div>
            {{ message }}
            <a @click.prevent="triggerPonies">click me</a>
        </div>
    `,
    data() {
        return { message: 'initial message' };
    },
    methods: {
        triggerPonies() {
            this.message = 'component message';
            alert('hurray! message is: ' + this.message);
        }
    }
}));

// no vueify here
$.overridePlugin('myComponent', {
    methods: {
        triggerPonies() {
            this.supercomponent.methods.triggerPonies.call(this);
            this.message = 'child message';
        }
    }
});
```

`$.overridePlugin` works as you expect it. You can override any property with it, including `props` and `template`.


### Plugin access
To access the Vue-instance externally you need to get hold of the plugin-data first.
```javascript
const plugin = $('.element').data('plugin_myComponent');
const vm = plugin.vm;
```

And vice versa:
```javascript
$.plugin('myComponent', vueify({
    methods: {
        enableCake() {
            const plugin = this.$options.$plugin;
            const $el = plugin.$el;
        }
    }
}));
```

### Lifecycle
Remember `init()` and `destroy()`? Yeah, screw those. now we've got a better lifecycle.
You may use any [Lifecycle Events](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) Vue offers you.

Once a Vueified™ plugin gets added to an element, the `$el`s content will get replaced by the vue-component.

When that plugin then gets destroyed, the original content will get re-added and the vue-component disappears.

```javascript
$.plugin('myComponent', vueify({
    template: '<div>Hello, world!</div>'
}));

StateManager.addPlugin('[data-my-component="true"]', 'myComponent', ['xl']);
```

```html
<div data-my-component="true">
    <b>original content</b>
</div>

When viewport equals xl:
<div data-my-component="true">
    <div>Hello, world!</div>
</div>

When viewport equals anything but xl:
<div data-my-component="true">
    <b>original content</b>
</div>
```



## Notes
When using slots you will need to use the standalone vue-build.



## Changelog

### 1.0.1 - 23. November 2016
* Improve README
* Fix webpack requiring $.PluginBase

### 1.0.0 - 22. November 2016
* Initial Release
