
Ext.define('MyApp.model.CustomerModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CustomerModel',
    fields: [{
        name: 'id', type: 'int'
    }, {
        name: 'L_id', type: 'int'
    },
    {
        name: 'Beginday', type: 'int'
    },

    { name: 'Enddate', type: 'date', dateFormat: 'Y-m-d' },
    {
        name: 'C_code'
    }, {
        name: 'C_name'
    }, {
        name: 'Address'

    }, {
        name: 'C_shortname'

    }, 
    {
        name: 'smsphone'

    }, {
        name: 'Py_code'

    }, {
        name: 'password'

    }, {
        name: 'Tel'

    }, {
        name: 'Active',
        type: 'bool'
    }, {
        name: 'Aloneprice',
        type: 'bool'
    }]
});


