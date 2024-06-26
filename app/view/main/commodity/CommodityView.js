﻿Ext.define("MyApp.view.main.commodity.CommodityView", {
  extend: "Ext.panel.Panel",
  xtype: "CommodityView",
  closeAction: "destroy",
  requires: [
    "MyApp.view.main.commodity.CommodityGridView",
    "MyApp.view.main.commodity.CommodityTypeTreeView",
    "MyApp.view.main.commodity.CommodityTypeEdit",
  ],
  controller: "CommodityCtrl",
  items: [
    {
      xtype: "panel",
      layout: "border",
      defaults: { collapsible: true, split: true, border: 1 },
      items: [
        { xtype: "CommodityTypeTreeView", region: "west" },
        { xtype: "CommodityGridView", collapsible: false, region: "center" },
      ],
    },
  ],
});
