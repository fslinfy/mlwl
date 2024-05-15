Ext.define("MyApp.view.main.cpckgl.CpckdckshView", {
  extend: "Ext.container.Container",
  xtype: "CpckdckshView",
  requires: ["MyApp.view.main.showView.CpckdListView"],
  controller: "CpckdckshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpckdListView" }],
});
