
Ext.define('MyApp.model.UsersModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.UsersModel',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'userid', type: 'int' },
        { name: 'typeid', type: 'int' },
        { name: 'usercode' },
        { name: 'username' },
        { name: 'tel' },
            { name: 'smsphone' },
        { name: 'lidstring' },
        { name: 'address' },
        { name: 'sfjhm' },
        { name: 'qqnumber' },
        { name: 'wxnumber' },
        { name: 'wxname' },
        { name: 'password' },
        { name: 'E_code' },
        { name: 'active', type: 'bool' },
        { name: 'locked', type: 'bool' },
        { name: 'smsactive', type: 'bool' },
        { name: 'L_id', type: 'int' },
        { name: 'login', type: 'int' },
        { name: 'logincount', type: 'int' },
        { name: 'new', type: 'bool' },
        { name: 'edit', type: 'bool' },
        { name: 'sh', type: 'bool' },
        { name: 'cwsh', type: 'bool' },
        { name: 'del', type: 'bool' },
        { name: 'lastdel', type: 'bool' },
        { name: 'system', type: 'bool' },
        { name: 'khid', type: 'int' }

    ]
});


