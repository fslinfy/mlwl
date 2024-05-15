Ext.define("MyApp.view.main.cpgfgl.CpgfdshView", {
  extend: "Ext.container.Container",
  xtype: "CpgfdshView",
  requires: [
    "MyApp.view.main.showView.CpgfdListView",
    "MyApp.store.CurCpgfdmxStore",
  ],
  controller: "CpgfdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfdListView" }],
});
