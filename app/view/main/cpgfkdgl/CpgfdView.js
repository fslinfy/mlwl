Ext.define("MyApp.view.main.cpgfkdgl.CpgfdView", {
  extend: "Ext.container.Container",
  xtype: "CpgfdView",
  requires: [
    "MyApp.view.main.showView.CpgfkdListView",
    "MyApp.view.main.cpgfkdgl.CpgfdEdit",
  ],
  controller: "CpckdCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpxsdListView" }],
});
