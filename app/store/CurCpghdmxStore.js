Ext.define('MyApp.store.CurCpghdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpghdmxStore',
    model: 'MyApp.model.CpghdmxModel',
    proxy: {
        type: 'sessionstorage',
        id  : 'CurCpghdmxModel'
    }//,
    //autoLoad: true
});
