Ext.define('MyApp.view.main.cpckgl.CpckdshStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpckdshStore',
    model: 'MyApp.model.CpckdModel',
    proxy:{
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cpckdlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc:'cpckdmxsh',
            userInfo:  base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
