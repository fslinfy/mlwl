﻿Ext.define("MyApp.view.main.cpckgl.CpckdlocView", {
  extend: "Ext.container.Container",
  xtype: "CpckdlocView",
  requires: ["MyApp.view.main.showView.CpckdListView"],
  controller: "CpckdlocCtrl",
  closeAction: "destroy",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpckdListView" }],
});
