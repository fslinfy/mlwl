Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdshView", {
  extend: "Ext.container.Container",
  xtype: "wxCpgfdshView",
  requires: [
    "MyApp.view.main.showView.wxCpgfdListView",
    "MyApp.view.main.wxcpgfgl.wxCpgfdshShowView",
    // ,"MyApp.view.main.showView.CpgfdShowView"
    //, 'MyApp.store.CurCpgfdjeStore'
    // ,'MyApp.store.CurCpgfdmxStore'
    // , 'MyApp.store.CpgfdmxStore'
  ],
  controller: "wxCpgfdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpgfdListView" }],
});
