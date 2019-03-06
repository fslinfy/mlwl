Ext.define('MyApp.model.CpgfdModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpgfdModel',
    fields: [
        { name: 'id'   },
        { name: 'gfid' },
        { name: 'gfdh' },
        { name: 'khmc' },
        { name: 'khid', type: 'int' },
        { name: 'ckmc' },
        { name: 'L_id', type: 'int' },
        { name: 'cwsh' },
        { name: 'cwr' },
                { name: 'cphm' },
                { name: 'sfr' },
        { name: 'czy' },
        { name: 'shr' },
        { name: 'cnote' },
        { name: 'sl', type: 'float' },
        { name: 'zl', type: 'float' },
        { name: 'je', type: 'float' },
        { name: 'xjje', type: 'float' },
        { name: 'gfrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'shrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'ztbz', type: 'bool' },
        { name: 'xjbz', type: 'bool' },
        { name: 'delbz', type: 'bool' },
        { name: 'shbz', type: 'bool' }
    ]
});


