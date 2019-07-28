Ext.define('MyApp.model.CpghdghshModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpghdghshModel',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'ckid', type: 'int' },
        { name: 'ghid', type: 'int' },
        { name: 'thr' },
        { name: 'cgy' },
        { name: 'cwsh' },
        { name: 'czy' },
        { name: 'shr' },
        { name: 'cnote' },
        { name: 'newkhmc' },
        { name: 'sfdh' },
        { name: 'ghdh' },
        { name: 'cphm' },
        { name: 'sfr' },
        { name: 'ckmc' },
        { name: 'khmc' },
        { name: 'Address' },
        { name: 'dh' },
        { name: 'ghsl', type: 'float' },
        { name: 'ghzl', type: 'float' },
        
        { name: 'xssl', type: 'float' },
        { name: 'xszl', type: 'float' },
        { name: 'cwsl', type: 'float' },
        { name: 'cwzl', type: 'float' },

        { name: 'ghje', type: 'float' },
        { name: 'xjje', type: 'float' },
        { name: 'ghrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'xsrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'ckrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'cwshrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'shrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'ztbz', type: 'bool' },
        { name: 'delbz', type: 'bool' },
        { name: 'shbz', type: 'bool' }
    ]
});


