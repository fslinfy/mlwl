Ext.define("MyApp.view.main.cpghgl.CpghdghlocView", {
  extend: "Ext.container.Container",
  xtype: "CpghdghlocView",
  requires: [
    "MyApp.view.main.showView.CpghdListView",
    "MyApp.view.main.cpghgl.CpghdshShowView",
    "MyApp.view.main.cpghgl.CpghdghshStore",
    //,'MyApp.model.CpghdmxModel'
    //,'MyApp.model.CpghdModel'
    // , 'MyApp.store.CpghdjeStore'
    "MyApp.store.CpghdcwStore",
    // , 'MyApp.store.CurCpghdcwStore'
    // , 'MyApp.store.CurCpghdjeStore'
  ],
  controller: "CpghdghlocCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpghdListView" }],
});
