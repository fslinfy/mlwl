﻿Ext.define("MyApp.view.main.commodity.CommodityGridView", {
  extend: "Ext.grid.Panel",
  alias: "widget.CommodityGridView",
  itemId: "CommodityGridView",
  requires: ["MyApp.store.CommodityStore", "MyApp.view.main.QueryToolbarView"],
  plugins: ["cellediting", "gridfilters"],
  store: { type: "CommodityStore" },
  closeAction: "destroy",
  viewModel: {
    data: { active: 1 },
  },
  tbar: [
    {
      xtype: "container",
      flex: 1,
      layout: "hbox",
      items: [
        {
          xtype: "container",
          flex: 1,
          layout: "hbox",
          items: [
            {
              xtype: "displayfield",
              itemId: "PageTitle",
              value: "商品资料",
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0",
                color: "#000",
              },
              fieldCls: "biggertext",
              hideLabel: true,
            },
            {
              labelWidth: 30,
              xtype: "triggerfield",
              fieldLabel: "\u8fc7\u6ee4",
              itemId: "FilterField",
              flex: 1,
              triggerCls: "x-form-clear-trigger",
              onTriggerClick: function () {
                this.reset();
              },
            },
            {
              xtype: "checkbox",
              labelWidth: 30,
              fieldLabel: "活跃",
              width: 80,
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "0px 0px 0 20px",
                color: "#000",
              },
              bind: "{active}",
              itemId: "active",
            },
          ],
        },
        { xtype: "QueryToolbarView" },
      ],
    },
  ],
  columns: [
    {
      text: "\u5546\u54c1\u4ee3\u7801",
      width: 80,
      dataIndex: "S_code",
      align: "left",
      editor: {
        allowBlank: false,
        regex: /(^[0-9A-Z]{1,10}$)/,
        type: "string",
      },
    },
    {
      text: "\u5546\u54c1\u540d\u79f0",
      dataIndex: "S_name",
      flex: 1,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: { emptyText: "Search for\u2026" },
      },
      editor: { allowBlank: false, type: "string" },
    },
    {
      xtype: "checkcolumn",
      width: 90,
      text: "\u6d3b\u8dc3",
      dataIndex: "Active",
    },
  ],
  listeners: { select: "onItemSelected" },
});
