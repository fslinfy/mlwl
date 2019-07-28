Ext.define('MyApp.store.CurCpghdcwStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpghdcwStore',
    model: 'MyApp.model.CpghdcwModel',
    autoLoad: true,
    proxy: {
        type: 'localstorage',
        id  : 'CurCpghdcwModel'
    }
});
