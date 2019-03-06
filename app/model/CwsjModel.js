
Ext.define('MyApp.model.CwsjModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CwsjModel',
    fields: [{
        name: 'id', type: 'int'
    },{
        name: 'L_id', type: 'int'
    }, {
        name: 'E_code'
    },{
        name: 'cwzy'
    }, {
        name: 'khmc'
    }, 
    {
        name: 'sjdh'
    }, {
        name: 'jby'
    }, {
        name: 'czy'

    }, {
        name: 'shr'
    }, 
    { name: 'sjrq', type: 'date', dateFormat: 'Y-m-d' },
    { name: 'shrq', type: 'date', dateFormat: 'Y-m-d h:ia' },
    { name: 'srje', type: 'float' },
    { name: 'jcje', type: 'float' },
    { name: 'Active', type: 'bool'}
]
});


