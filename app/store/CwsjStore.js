Ext.define('MyApp.store.CwsjStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CwsjStore',
    model: 'MyApp.model.CwsjModel',
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cwsjlist'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code:sys_enterprise_code,
            p_l_id:sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
    autoLoad: false
});
