﻿Ext.define("MyApp.view.main.cpjkdsh.CpjkdshView", {
  extend: "Ext.container.Container",
  xtype: "CpjkdshView",
  requires: ["MyApp.view.main.showView.CpjkdListView"],
  controller: "CpjkdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CpjkdListView" }],
});
