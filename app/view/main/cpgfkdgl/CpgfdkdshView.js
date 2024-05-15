Ext.define("MyApp.view.main.cpgfkdgl.CpgfdkdshView", {
  extend: "Ext.container.Container",
  xtype: "CpgfdkdshView",
  requires: [
    "MyApp.view.main.showView.CpgfkdListView",
    "MyApp.store.CurCpgfdmxStore",
  ],
  controller: "CpgfdkdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfkdListView" }],
});
