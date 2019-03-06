Ext.define('MyApp.store.CpjcttmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpjcttmxStore',
    model: 'MyApp.model.CpjcttmxModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + "?act=cpjcttlist_pc"
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc: 'cpjcttloc',
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id,
            khid: 0,
            jclb:"",
            ny:0,
            yu:0,
            ri:0
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
     autoLoad: false
});
