Ext.define("MyApp.view.main.cpckgl.CpckdmfhView", {
  extend: "Ext.container.Container",
  xtype: "CpckdmfhView",
  requires: ["MyApp.view.main.showView.CpckdListView"],
  controller: "CpckdmfhCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpckdListView" }],
});
