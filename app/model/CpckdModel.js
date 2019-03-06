Ext.define('MyApp.model.CpckdModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpckdModel',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'ckid', type: 'int' },
        { name: 'xsid', type: 'int' },
        { name: 'thr' },
        { name: 'cgy' },
        { name: 'cwsh' },
        { name: 'czy' },
        { name: 'shr' },
        { name: 'cnote' },
        { name: 'ckdh' },
        { name: 'sfdh' },
        { name: 'xsdh' },
        { name: 'cphm' },
        { name: 'sfr' },
        { name: 'ckmc' },
        { name: 'khmc' },
        { name: 'Address' },
        { name: 'dh' },
        { name: 'ccsl', type: 'float' },
        { name: 'cczl', type: 'float' },
        { name: 'ccje', type: 'float' },
        { name: 'xjje', type: 'float' },
        { name: 'xsrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'ckrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'cwshrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'shrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'ztbz', type: 'bool' },
        { name: 'delbz', type: 'bool' },
        { name: 'shbz', type: 'bool' }
    ]
});


