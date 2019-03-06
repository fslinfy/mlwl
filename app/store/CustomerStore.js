Ext.define('MyApp.store.CustomerStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CustomerStore',
    model: 'MyApp.model.CustomerModel',
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=customerlist',
            update: sys_ActionPHP + '?act=customersave',
            create: sys_ActionPHP + '?act=customernew',
            destroy: sys_ActionPHP + '?act=customerdelete'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
            
        }
    },
    autoLoad: true
});
