Ext.define('MyApp.store.CurCptzdjeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurCptzdjeStore',
    model: 'MyApp.model.CptzdjeModel',
    autoLoad: true,
    proxy: {
        type: 'localstorage',
        id  : 'CurCptzdjeModel'
    }
});
