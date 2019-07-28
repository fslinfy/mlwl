Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdshStore', {
    extend: 'Ext.data.Store',
    alias: 'store.wxCpgfdshStore',
    model: 'MyApp.model.CpgfdshModel',
    proxy:{
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=wxCpgfdgfmxlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc:'wxcpgfdmxywsh',
            userInfo:  base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
