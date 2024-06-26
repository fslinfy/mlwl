Ext.define("MyApp.view.main.cpjkdsh.CpjkdshStore", {
  extend: "Ext.data.Store",
  alias: "store.CpjkdshStore",
  model: "MyApp.model.CpjkdModel",
  proxy: {
    type: "ajax",
    api: { read: sys_ActionPHP + "?act\x3dCpjkdlist_pc" },
    actionMethods: { read: "GET" },
    extraParams: {
      loc: "cpjkdsh",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
    },
    reader: { type: "json", rootProperty: "rows" },
  },
});
