Ext.define("MyApp.store.CommodityStore",
    {
        extend: "Ext.data.Store", alias: "store.CommodityStore",
        model: "MyApp.model.CommodityModel", pageSize: 1E4,
        proxy: {
            type: "ajax",
            api: {
                read: sys_ActionPHP + "?act\x3dcommoditylist_pc",
                update: sys_ActionPHP + "?act\x3dcommoditysave",
                create: sys_ActionPHP + "?act\x3dcommoditynew",
                destroy: sys_ActionPHP + "?act\x3dcommoditydelete"
            },
            actionMethods: {
                create: "POST",
                read: "GET",
                update: "POST",
                destroy: "POST"
            },
            extraParams: {
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                 p_e_code: sys_enterprise_code,
                T_id: 0,
                CT_id: 0,
                active:1,
                pct_code: "",
                displayall: sys_DisplayAll
            },
            reader: {
                type: "json",
                rootProperty: "rows"
            }
        },
        autoLoad: true
    }
);