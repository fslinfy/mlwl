Ext.define('MyApp.store.CpjcworkmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpjcworkmxStore',
    model: 'MyApp.model.CpjcworkmxModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + "?act=cpjcworklist_pc"
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc: 'cpjcworkloc',
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id,
            khid: 0,
            jclb:""
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
     autoLoad: false
});
