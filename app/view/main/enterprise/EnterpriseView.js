Ext.define("MyApp.view.main.enterprise.EnterpriseView", {
  extend: "Ext.grid.Panel",
  xtype: "EnterpriseView",
  title: "Enterprise",
  requires: ["MyApp.store.EnterpriseStore", "MyApp.view.main.QueryToolbarView"],
  id: "EnterpriseGrid",
  plugins: ["cellediting", "gridfilters"],
  controller: "EnterpriseCtrl",
  store: { type: "EnterpriseStore" },
  closeAction: "destroy",
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
          ],
        },
        { xtype: "QueryToolbarView" },
      ],
    },
  ],
  columns: [
    {
      text: "\u516c\u53f8\u4ee3\u7801",
      width: 80,
      dataIndex: "E_code",
      align: "left",
      editor: { allowBlank: false, regex: /(^[0-9A-Z]{1,5}$)/, type: "string" },
    },
    {
      text: "\u516c\u53f8\u540d\u79f0",
      dataIndex: "E_name",
      flex: 1,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: { emptyText: "Search for\u2026" },
      },
      editor: { allowBlank: false, type: "string" },
    },
    {
      text: "\u516c\u53f8\u5730\u5740",
      dataIndex: "Address",
      flex: 1,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: { emptyText: "Search for\u2026" },
      },
      editor: { allowBlank: true, type: "string" },
    },
    {
      text: "\u8054\u7cfb\u7535\u8bdd",
      dataIndex: "Tel",
      flex: 1,
      align: "left",
      editor: { allowBlank: true, type: "string" },
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
