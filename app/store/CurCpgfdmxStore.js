Ext.define('MyApp.store.CurCpgfdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCpgfdmxStore',
    model: 'MyApp.model.CpgfdmxModel',
    proxy: {
        type: 'sessionstorage',
        id: 'CpgfdmxModel'
    },
    autoLoad: true
});
