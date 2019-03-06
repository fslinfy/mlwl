
Ext.define('MyApp.model.CktjjdModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CktjjdModel',
    fields: [{        name: 'id', type: 'int'    }, 
    {        name: 'L_id'    }, 
    {        name: 'ckmc'    }, 
    {        name: 'jby'    }, 
    {        name: 'ny', type: 'int'    }, 
    {        name: 'yu', type: 'int'    },
    {        name: 'status', type: 'int'    },
    {        name: 'rq', type: 'date' }
    ]
});


