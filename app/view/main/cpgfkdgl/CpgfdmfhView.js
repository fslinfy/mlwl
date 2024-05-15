Ext.define("MyApp.view.main.cpgfkdgl.CpgfdmfhView", {
  extend: "Ext.container.Container",
  xtype: "CpgfdmfhView",
  requires: [
    "MyApp.view.main.showView.CpgfkdListView",
    "MyApp.store.CurCpgfdmxStore",
  ],
  controller: "CpgfdmfhCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfkdListView" }],
});
