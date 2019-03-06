Ext.define('MyApp.model.CpckdcwModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpckdcwModel',
    fields: [
        { name: 'id' },
        { name: 'mxid', type: 'int' },
        { name: 'ckmxid', type: 'int' },
        { name: 'ckid', type: 'int' },
        { name: 'kcid', type: 'int' },
        { name: 'kcmxid', type: 'int' },
        { name: 'mints', type: 'int' },
        { name: 'czrq', type: 'date' },
        { name: 'area' },
        { name: 'cw'   },
        { name: 'cpph' },
        { name: 'dh' },
        { name: 'dw' },
        { name: 'sm' },
        { name: 'sl', type: 'float' },
        { name: 'zl', type: 'float' },
        { name: 'czdj', type: 'float' },
        { name: 'ccsl', type: 'float' },
        { name: 'cczl', type: 'float' }
    ]
});


