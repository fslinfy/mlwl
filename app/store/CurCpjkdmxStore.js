Ext.define('MyApp.store.CurCpjkdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpjkdmxStore',
    model: 'MyApp.model.CpjkdmxModel',
    proxy: {
        type: 'sessionstorage',
        id  : 'CurCpjkdmxModel'
    },
    autoLoad: true
    
});
