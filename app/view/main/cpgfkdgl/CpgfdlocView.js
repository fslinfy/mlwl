Ext.define("MyApp.view.main.cpgfkdgl.CpgfdlocView", {
  extend: "Ext.container.Container",
  xtype: "CpgfdlocView",
  requires: [
    "MyApp.view.main.showView.CpgfkdListView",
    "MyApp.store.CurCpgfdmxStore",
  ],
  controller: "CpgfdlocCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfkdListView" }],
});
