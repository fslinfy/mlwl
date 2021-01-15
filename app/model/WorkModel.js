
Ext.define('MyApp.model.WorkModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.WorkModel',
    fields: [{
        name: 'id', type: 'int'
    }, {
        name: 'E_code'
    }, {
        name: 'Jobs',type: 'int'
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
        name: 'L_id', type: 'int'
    },
    {
        name: 'Bytcdj', type: 'number'
    },
    {
        name: 'Bytcdj2', type: 'number'
    },
    {
        name: 'Gstcdj', type: 'number'
    },
    {
        name: 'Cgtcdj', type: 'number'
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


