Ext.define('MyApp.store.CurAreaStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CurAreaStore',
    itemId: 'areacode',
    fields: ['area'],
    data: [
        { area: 'A' },
        { area: 'B' },
        { area: 'C' },
        { area: 'C' }
    ],
    proxy: {
        type: 'localstorage',
        id: 'CurAreaModel'
    }
});
