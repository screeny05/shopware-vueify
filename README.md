# shopware-vueify
use vue components with the shopware statemanager

## Basic usage
```
vueify(<Component>) : <Shopware-jQuery-Plugin>
```

```javascript
$.plugin('myComponent', vueify({
    template: '<div>Hello, {{ who }}!</div>',
    data: function(){
        return { who: 'world' }
    }
}));

StateManager.add('[data-my-component="true"]', 'myComponent', ['l', 'xl']);
```

Can be `require`d. If not, `vueify` is available globally.

Can also be used with vue-files:
```javascript
const MyComponent = require('components/my-component.vue');
$.plugin('myComponent', vueify(MyComponent));
```

Vueify also has support for options (passed to vue as properties)
```javascript
$.plugin('myComponent', vueify({
    properties: {
        value: {
            type: Number,
            default: 0
        }
    },

    template: '<div>{{ value }}</div>'
}));
```

## Currently unsupported:
* Slots
