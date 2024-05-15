Ext.define("MyApp.view.main.xsdgl.CpxsdlocView", {
  extend: "Ext.container.Container",
  xtype: "CpxsdlocView",
  requires: ["MyApp.view.main.showView.CpxsdListView"],
  controller: "CpxsdlocCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpxsdListView" }],
});
