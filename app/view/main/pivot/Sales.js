Ext.define('KiMyApp.view.main.pivot.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',

    model: 'MyApp.view.main.pivot.Sale',

    proxy: {
        // load using HTTP
        type: 'ajax',
        limitParam: null,
        url: 'MyApp/SalesData',
        // the return will be JSON, so lets set up a reader
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
