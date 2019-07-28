Ext.define('MyApp.store.CpghdStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpghdStore',
    model: 'MyApp.model.CpghdModel',
    proxy:{
        type: 'ajax',
        api: {
            read: sys_ActionPHP + '?act=Cpghdlist_pc'
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc:'cpghdsh',
            userInfo:  base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
