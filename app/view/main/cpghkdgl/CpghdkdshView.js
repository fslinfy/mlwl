Ext.define("MyApp.view.main.cpghkdgl.CpghdkdshView", {
  extend: "Ext.container.Container",
  xtype: "CpghdkdshView",
  requires: ["MyApp.view.main.showView.CpghdListView"],
  controller: "CpghdkdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpghdListView" }],
});
