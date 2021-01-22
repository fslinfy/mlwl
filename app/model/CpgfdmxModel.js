
Ext.define('MyApp.model.CpgfdmxModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpgfdmxModel',
    fields: [{name: 'id'    },
     {name: 'xmmc' },
     {name: 'cdmc' },
     {name: 'bzmc'    },
     {name: 'area'    },
    { name: 'mxid', type: 'int'    },
    { name: 'bzid', type: 'int'    },
    { name: 'cpid', type: 'int'    },
    {name: 'sl',        type: 'float'    },
    {name: 'zl',        type: 'float'    },
    {name: 'khsl',        type: 'float'    },
    {name: 'khzl',        type: 'float'    },
    {name: 'dj',        type: 'float'    },
    {name: 'rate',        type: 'float'    },
    { name: 'je',
        type: 'float'
    },
    {
        name: 'xjje',
        type: 'float'
    },
    {
        name: 'jldw'
    },
    {
        name: 'gs'
    },
    {
        name: 'cw'
    },
    {
        name: 'cg'
    },
    {
        name: 'byg'
    },
    {
        name: 'gfid',
        type: 'int'
    },
    {
        name: 'zljs', type: 'bool'
    }
    ]
});


