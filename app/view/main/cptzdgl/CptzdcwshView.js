﻿Ext.define("MyApp.view.main.cptzdgl.CptzdcwshView", {
  extend: "Ext.container.Container",
  xtype: "CptzdcwshView",
  requires: ["MyApp.view.main.showView.CptzdListView"],
  controller: "CptzdcwshCtrl",
  layout: "fit",
  closeAction: "destroy",
  items: [{ xtype: "CptzdListView" }],
});
