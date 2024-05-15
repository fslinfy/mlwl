Ext.define("MyApp.view.main.cpckgl.CpckdView", {
  extend: "Ext.container.Container",
  xtype: "CpckdView",
  requires: [
    "MyApp.view.main.showView.CpxsdListView",
    "MyApp.view.main.cpckgl.CpckdmxEdit",
    "MyApp.model.CpckdcwModel",
  ],
  controller: "CpckdCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpxsdListView" }],
});
