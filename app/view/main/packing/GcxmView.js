var pagetitle = "包装规格维护";
Ext.define("MyApp.view.main.packing.GcxmView", {
  extend: "Ext.grid.Panel",
  xtype: "GcxmView",
  title: "Gcxm",
  requires: [],
  viewModel: { data: { active: 1 } },
  id: "GcxmGrid",
  plugins: ["cellediting", "gridfilters"],
  controller: "GcxmCtrl",
  columnLines: true,
  enableHdMenu: false,
  enableColumnHide: false,
  store: { type: "PackingStore" },
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
              xtype: "PageTitle",
            },
            {
              labelWidth: 30,
              xtype: "triggerfield",
              fieldLabel: "过滤",
              itemId: "FilterField",
              flex: 1,
              triggerCls: "x-form-clear-trigger",
              onTriggerClick: function () {
                this.reset();
              }
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
            }
          ]
        },
        {
          xtype: "QueryToolbarView",
        }
      ]
    }
  ],
  columns: [
    {
      text: "代码",
      width: 50,
      dataIndex: "PS_code",
      align: "left",
      sortable: false,
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        }
      },
      editor: {
        allowBlank: false,
        regex: /(^[0-9A-Z]{1,5}$)/,
        type: "string",
      }
    },
    {
      text: "包装名称",
      dataIndex: "PS_name",
      width: 250,
      align: "left",
      sortable: false,
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        }
      },
      editor: {
        allowBlank: false,
        type: "string",
      }
    },
    {
      text: "数量单位",
      dataIndex: "Quantity_Unit",
      width: 80,
      align: "left",
      sortable: false,
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        }
      },
      editor: {
        allowBlank: true,
        //regex:/>([^<>]+)</,
        type: "string",
      }
    },
    {
      //xtype: "numbercolumn",
      align: "right",
      //formatter: 'usMoney',
      format: "00000.00",
      //align: 'right',
      text: "转换系数",
      dataIndex: "Rate",
      width: 120,
      align: "right",
      sortable: false,
      editor: {
        type: "numberfield",
        //	regex: /(^[0-9]{1,8}.[0-9]{3}$)/,
        decimalPrecision: 3,
        align: "right",
        allowBlank: false,
        minValue: 0,
        maxValue: 100000,
      }
    },
    {
      text: "重量单位",
      dataIndex: "Weight_Unit",
      width: 80,
      align: "left",
      sortable: false,
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        }
      },
      editor: {
        allowBlank: true,
        type: "string",
      }
    },
    {
      text: "其它费用单价",
      columns: [
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "装卸单价",
          dataIndex: "Bydj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          },
        },
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "破包修复",
          dataIndex: "Pbdj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          }
        },
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "过户费",
          dataIndex: "Ghdj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          }
        }
      ]
    },
    {
      text: "工作费用提成单价",
      columns: [
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "搬运",
          dataIndex: "Bytcdj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          }
        },
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "机械",
          dataIndex: "Gstcdj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          }
        },
        {
          xtype: "numbercolumn",
          align: "right",
          format: "00000.00",
          text: "仓管",
          dataIndex: "Cgtcdj",
          flex: 1,
          sortable: false,
          editor: {
            type: "numberfield",
            decimalPrecision: 3,
            align: "right",
            allowBlank: true,
            minValue: 0,
            maxValue: 9999.99,
          }
        }
      ]
    },
    {
      xtype: "checkcolumn",
      width: 80,
      text: "重量核算",
      sortable: false,
      dataIndex: "Weight_Status",
    },
    {
      xtype: "checkcolumn",
      width: 50,
      text: "活跃",
      sortable: false,
      dataIndex: "Active",
    },
    {
      xtype: "checkcolumn",
      width: 50,
      text: "粉料",
      sortable: false,
      dataIndex: "Flbz",
    },
    {
      xtype: "checkcolumn",
      width: 50,
      text: "过车",
      sortable: false,
      dataIndex: "Xmlb",
      hidden:true
    }
  ],
  listeners: {
    select: "onItemSelected",
  }
});
