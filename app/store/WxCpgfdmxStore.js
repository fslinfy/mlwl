Ext.define('MyApp.store.WxCpgfdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpgfdmxStore',
    model: 'MyApp.model.CpgfdmxModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=WxCpgfdmxlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            gfid: 0,
            p_l_id: sys_current_ckid,
            khid: sys_current_khid
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
