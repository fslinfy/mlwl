Ext.define('MyApp.store.CpxsdStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpxsdStore',
    model: 'MyApp.model.CpxsdModel',
    proxy:{
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cpxsdlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc:'cpxsdsh',
            userInfo:  base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
