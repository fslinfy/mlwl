﻿Ext.define("MyApp.view.main.cptzdgl.CptzdshView", {
  extend: "Ext.container.Container",
  xtype: "CptzdshView",
  requires: ["MyApp.view.main.showView.CptzdListView"],
  controller: "CptzdshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CptzdListView" }],
});
