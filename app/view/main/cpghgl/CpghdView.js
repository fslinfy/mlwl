Ext.define("MyApp.view.main.cpghgl.CpghdView", {
  extend: "Ext.container.Container",
  xtype: "CpghdView",
  requires: [
    "MyApp.view.main.showView.CpghdListView",
    "MyApp.view.main.showView.CpghdShowView",
    "MyApp.view.main.cpghgl.CpghdmxEdit",
    //,"MyApp.store.CpghdmxStore"
    "MyApp.store.CurCpghdcwStore",
    "MyApp.store.CurCpghdjeStore",
  ],
  controller: "CpghdCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpghdListView" }],
});
