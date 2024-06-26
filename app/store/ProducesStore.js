Ext.define("MyApp.store.ProducesStore", {
    extend: "Ext.data.Store",
    alias: "store.ProducesStore",
    model: "MyApp.model.ProducesModel",
    pageSize: 1E4,
    proxy: {
        type: "ajax",
        api: {
            read: sys_ActionPHP + "?act\x3dproduceslist",
            update: sys_ActionPHP + "?act\x3dproducessave",
            create: sys_ActionPHP + "?act\x3dproducesnew",
            destroy: sys_ActionPHP + "?act\x3dproducesdelete"
        },
        actionMethods: {
            create: "POST",
            read: "GET",
            update: "POST",
            destroy: "POST"
        },
        extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code
        },
        reader: {
            type: "json",
            rootProperty: "rows"
        }
    },
    autoLoad: true
});