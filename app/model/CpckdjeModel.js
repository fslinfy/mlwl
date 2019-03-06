Ext.define('MyApp.model.CpckdjeModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpckdjeModel',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'ckmxid', type: 'int' },
        { name: 'mxid', type: 'int' },
        { name: 'work' },
        { name: 'worker' },
        { name: 'dw' },
        { name: 'gs' },
        { name: 'cg' },
        { name: 'byg' },
        { name: 'dh' },
        { name: 'sm' },
        { name: 'area' },
        { name: 'sl', type: 'float' },
        { name: 'dj', type: 'float' },
        { name: 'je', type: 'float' },
        { name: 'xjje', type: 'float' },
        { name: 'workid', type: 'int' },
        { name: 'zljs', type: 'bool' },
        { name: 'xjbz', type: 'bool' },
        { name: 'indj', type: 'bool' },
        { name: 'inbz', type: 'bool' }
    ]
});



