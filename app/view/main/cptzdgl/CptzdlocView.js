﻿Ext.define("MyApp.view.main.cptzdgl.CptzdlocView", {
  extend: "Ext.container.Container",
  xtype: "CptzdlocView",
  requires: ["MyApp.view.main.showView.CptzdListView"],
  controller: "CptzdlocCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CptzdListView" }],
});
