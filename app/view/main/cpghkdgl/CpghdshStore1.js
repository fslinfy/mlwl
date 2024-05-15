Ext.define("MyApp.view.main.cpghdgl.CpghdshStore", {
  extend: "Ext.data.Store",
  alias: "store.CpghdshStore",
  model: "MyApp.model.CpghdModel",
  proxy: {
    type: "ajax",
    api: { read: sys_ActionPHP + "?actCpghdlist_pc" },
    actionMethods: { read: "GET" },
    extraParams: {
      loc: "cpghdsh",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
    },
    reader: { type: "json", rootProperty: "rows" },
  },
});
