Ext.define('MyApp.view.main.cpghgl.CpghdghshStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpghdghshStore',
    model: 'MyApp.model.CpghdghshModel',
    proxy:{
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cpghdghmxlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc:'wxcpghdmxywsh',
            userInfo:  base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
