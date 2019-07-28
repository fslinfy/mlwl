Ext.define('MyApp.model.CpghdcwModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpghdcwModel',
    fields: [
        { name: 'id' },
        { name: 'ghid' },
        { name: 'mxid', type: 'int' },
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


