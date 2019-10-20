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
        { name: 'area' },
        { name: 'cnote' },
        { name: 'sl', type: 'float' },
        { name: 'zl', type: 'float' },
        { name: 'je', type: 'float' },
        { name: 'xjje', type: 'float' },
        { name: 'kdrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'endrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'gfrq', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'shrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'ztbz', type: 'int' },
        { name: 'xjbz', type: 'bool' },
        { name: 'delbz', type: 'bool' },
        { name: 'shbz', type: 'bool' },

        {name: 'khsl',  type: 'float'        },
        {name: 'khzl',  type: 'float'        },

        {name: 'gfsl',  type: 'float'        },
        {name: 'gfzl',  type: 'float'        },

        { name: 'fhbz', type: 'int' },
        
        { name: 'khshrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'khshr' },
        { name: 'ckshrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'ckshr' },
        { name: 'cwshrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
        { name: 'cwshr' }
    ]
});


