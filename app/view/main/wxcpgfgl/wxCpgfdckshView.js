Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdckshView", {
  extend: "Ext.container.Container",
  xtype: "wxCpgfdckshView",
  requires: [
    "MyApp.view.main.showView.wxCpgfdListView",
    "MyApp.view.main.wxcpgfgl.wxCpgfdshShowView",
    // ,"MyApp.view.main.showView.CpgfdShowView"
    //, 'MyApp.store.CurCpgfdjeStore'
    // ,'MyApp.store.CurCpgfdmxStore'
    // , 'MyApp.store.CpgfdmxStore'
  ],
  controller: "wxCpgfdckshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfdListView" }],
});
