
Ext.define('MyApp.model.WorkModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.WorkModel',
    fields: [{
        name: 'id', type: 'int'
    }, {
        name: 'E_code'
    }, {
        name: 'Jobs'
    }, {
        name: 'Jobsname'

    },
    {
        name: 'lidstring'

    },
    {
        name: 'Unit_price', type: 'int'
    },
    {
        name: 'Weight_status',
        type: 'bool'
    },
    {
        name: 'Quantity_in',
        type: 'bool'
    },
    {
        name: 'Price_in',
        type: 'bool'
    },
    {
        name: 'Active',
        type: 'bool'
    }]
});


