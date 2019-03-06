Ext.define('MyApp.store.CpkclocStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CpkclocStore',
    model: 'MyApp.model.CpkcModel',
    proxy: {
        type: 'ajax',
        api: {
            read: sys_ActionPHP + "?act=cpkclist_pc"
        },
        actionMethods: {
            read: 'GET'
        },
        extraParams: {
            loc: 'cpkcloc',
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_l_id: sys_location_id,
            khid: sys_customer_id
        },
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    },
     autoLoad: false
});
