
Ext.define('MyApp.model.CwjetjModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CwjetjModel',
    fields: [
    {name: 'id', type: 'int'    },
    {name: 'L_id', type: 'int'    }, 
    {name: 'E_code'    },
    {name: 'day'    },
    {name: 'khid',type:'int'},
    {name: 'ny',type:'int'},
    {name: 'yu',type:'int'},
    {name: 'ri',type:'int'},
    {name: 'khmc' }, 
    {name: 'rq', type: 'date', dateFormat: 'Y-m-d' },
    {name: 'sl', type: 'float' },
    {name: 'zl', type: 'float' },
    {name: 'je', type: 'float' },
    {name: 'je0', type: 'float' },
    {name: 'xjje', type: 'float' },
    {name: 'byje', type: 'float' },
    {name: 'byxjje', type: 'float' },
    {name: 'gfje', type: 'float' },
    {name: 'gfxjje', type: 'float' },
    {name: 'ghje', type: 'float' },
    {name: 'ghxjje', type: 'float' },
    {name: 'qtje', type: 'float' },
    {name: 'qtxjje', type: 'float' },
    {name: 'byzl', type: 'float' },
    {name: 'xm'},
    {name: 'cnote' }
]
});


