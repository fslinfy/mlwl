Ext.define("MyApp.view.main.cpjkdsh.CpjkdListStore", {
  extend: "Ext.data.Store",
  alias: "store.CpjkdListStore",
  model: "MyApp.model.CpjkdModel",
  proxy: {
    type: "ajax",
    api: {
      read: sys_ActionPHP + "?act=Cpjkdlist_pc",
    },
    actionMethods: {
      read: "GET",
    },
    extraParams: {
      loc: "cpjkdloc",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
    },
    reader: {
      type: "json",
      rootProperty: "rows",
    },
  },
});
