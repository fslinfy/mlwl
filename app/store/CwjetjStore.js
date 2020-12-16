Ext.define('MyApp.store.CwjetjStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CwjetjStore',
    model: 'MyApp.model.CwjetjModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + "?act=cwjetj"
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc: 'cwjetj',
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id,
            khid: 0,
            ny:2020,
            yu:9
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: false
});
