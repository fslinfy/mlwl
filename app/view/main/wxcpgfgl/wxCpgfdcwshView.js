Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdcwshView", {
  extend: "Ext.container.Container",
  xtype: "wxCpgfdcwshView",
  requires: [
    "MyApp.view.main.showView.wxCpgfdListView",
    "MyApp.view.main.wxcpgfgl.wxCpgfdshShowView",
    // ,"MyApp.view.main.showView.CpgfdShowView"
    //, 'MyApp.store.CurCpgfdjeStore'
    // ,'MyApp.store.CurCpgfdmxStore'
    // , 'MyApp.store.CpgfdmxStore'
  ],
  controller: "wxCpgfdcwshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfdListView" }],
});
