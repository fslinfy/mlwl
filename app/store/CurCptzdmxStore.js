Ext.define('MyApp.store.CurCptzdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCptzdmxStore',
    model: 'MyApp.model.CptzdmxModel',
    proxy: {
        type: 'sessionstorage',
        id  : 'CurCptzdmxModel'
    },
    autoLoad: true
    
});
