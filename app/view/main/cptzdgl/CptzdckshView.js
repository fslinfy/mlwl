﻿Ext.define("MyApp.view.main.cptzdgl.CptzdckshView", {
  extend: "Ext.container.Container",
  xtype: "CptzdckshView",
  requires: ["MyApp.view.main.showView.CptzdListView"],
  controller: "CptzdckshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CptzdListView" }],
});
