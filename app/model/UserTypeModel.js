
Ext.define('MyApp.model.UserTypeModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.UserTypeModel',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'typeid', type: 'int' },
        { name: 'typename' },
        { name: 'menustring' },
        { name: 'wxmenustring' },
        { name: 'new', type: 'bool' },
        { name: 'delete', type: 'bool' },
        { name: 'edit', type: 'bool' },
        { name: 'sh', type: 'bool' },
        { name: 'system', type: 'bool' }
    ]
});


