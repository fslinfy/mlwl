Ext.define('MyApp.store.CurCptzdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCptzdmxStore',
    model: 'MyApp.model.CptzdmxModel',
    proxy: {
        type: 'localstorage',
        id  : 'CurCptzdmxModel'
    },
    autoLoad: true
    
});
