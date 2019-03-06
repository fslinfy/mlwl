Ext.define('MyApp.store.CpgfdmxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpgfdmxStore',
    model: 'MyApp.model.CpgfdmxModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cpgfdmxlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            gfid: 0,
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
