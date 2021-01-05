
Ext.define('MyApp.model.PackingModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.PackingModel',
    fields: [{
        name: 'id', type: 'int'
    },
    {
        name: 'khid', type: 'int'
    },
    {
        name: 'L_id', type: 'int'
    },

    {
        name: 'Pid', type: 'int'
    },
    {
        name: 'khps_id', type: 'int'
    },
    {
        name: 'E_code'
    }, {
        name: 'PS_code'
    }, {
        name: 'PS_name'

    }, {
        name: 'PS_shortname'

    }, {
        name: 'Quantity_Unit'

    }, {
        name: 'Weight_Unit'
    },
    {
        name: 'mints', type: 'int'
    },
    {
        name: 'czts', type: 'int'
    },

    {
        name: 'Rate', type: 'number'
    },
    {
        name: 'Czdj', type: 'number'
    }, {
        name: 'Phdj', type: 'number'
    }, {
        name: 'Czdj2', type: 'number'
    }, {
        name: 'Phdj2', type: 'number'
    }, {
        name: 'Pfdj', type: 'number'
    }, {
        name: 'Bydj', type: 'number'
    }, {
        name: 'Pbdj', type: 'number'
    }, {
        name: 'Ghdj', type: 'number'
    },
    {
        name: 'Czdj0', type: 'number'
    }, {
        name: 'Phdj0', type: 'number'
    }, {
        name: 'Czdj20', type: 'number'
    }, {
        name: 'Phdj20', type: 'number'
    }, {
        name: 'Pfdj0', type: 'number'
    }, {
        name: 'Bydj0', type: 'number'
    }, {
        name: 'Pbdj0', type: 'number'
    }, {
        name: 'Ghdj0', type: 'number'
    },

    {
        name: 'Active',
        type: 'bool'
    },
    {
        name: 'Xmlb',
        type: 'bool'
    },
    {
        name: 'Flbz',
        type: 'bool'
    },

    {
        name: 'Weight_Status',
        type: 'bool'
    }]

});


