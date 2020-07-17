Ext.define('MyApp.store.CurCpckdcwStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpckdcwStore',
    model: 'MyApp.model.CpckdcwModel',
    autoLoad: true,
    proxy: {
        type: 'sessionstorage',
        id  : 'CurCpckdcwModel'
    }
});
