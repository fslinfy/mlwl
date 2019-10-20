Ext.define('MyApp.store.CurCpghdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpghdmxStore',
    model: 'MyApp.model.CpghdmxModel',
    proxy: {
        type: 'localstorage',
        id  : 'CurCpghdmxModel'
    }//,
    //autoLoad: true
});
