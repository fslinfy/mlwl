Ext.define('MyApp.store.WxCpgfdListStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpgfdListStore',
    model: 'MyApp.model.CpgfdModel',
    pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=wxcpgfdlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc: 'wxcpgfdloc',
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
