Ext.define("MyApp.view.main.location.LocationView", {
  extend: "Ext.grid.Panel",
  xtype: "LocationView",
  title: "Location",
  requires: [
    "MyApp.store.LocationStore",
    "MyApp.store.PackingStore",
    "MyApp.model.PackingModel",
    "MyApp.view.main.location.PackingEditView",
    "MyApp.view.main.QueryToolbarView",
  ],
  id: "LocationGrid",
  plugins: ["cellediting", "gridfilters"],
  controller: "LocationCtrl",
  store: { type: "LocationStore" },
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
              xtype: "displayfield",
              itemId: "PageTitle",
              value: "仓库名称维护",
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
          ],
        },
        { xtype: "QueryToolbarView" },
      ],
    },
  ],
  columns: [
    {
      text: "\u4ed3\u5e93\u4ee3\u7801",
      width: 80,
      dataIndex: "L_code",
      align: "left",
      editor: { allowBlank: false, regex: /(^[0-9A-Z]{1}$)/, type: "string" },
    },
    {
      text: "\u4ed3\u5e93\u540d\u79f0",
      dataIndex: "L_name",
      flex: 1,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: { emptyText: "Search for\u2026" },
      },
      editor: { allowBlank: false, type: "string" },
    },
    {
      text: "仓库筒称",
      dataIndex: "L_shortname",
      flex: 1,
      align: "left",
      width: 100,
      filter: {
        type: "string",
        itemDefaults: { emptyText: "Search for\u2026" },
      },
      editor: { allowBlank: false, type: "string" },
    },
    {
      text: "\u4ed3\u5e93\u5730\u5740",
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
    /*,
    {
        xtype: 'widgetcolumn',
        width: 100, sortable: false,
        widget: {
            xtype: 'button',
            text: '单价定义',
            handler: 'onPackingEdit'
        }
    }*/
  ],
  listeners: { select: "onItemSelected" },
});
