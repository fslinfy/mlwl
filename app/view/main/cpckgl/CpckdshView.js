﻿Ext.define("MyApp.view.main.cpckgl.CpckdshView", {
  extend: "Ext.container.Container",
  xtype: "CpckdshView",
  requires: ["MyApp.view.main.showView.CpckdListView"],
  controller: "CpckdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpckdListView" }],
});
