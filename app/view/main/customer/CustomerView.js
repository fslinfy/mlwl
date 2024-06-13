var store = Ext.create("MyApp.store.CustomerStore", { pageSize: 10000 });
Ext.define("MyApp.view.main.customer.CustomerView", {
  extend: "Ext.grid.Panel",
  xtype: "CustomerView",
  title: "Customer",
  requires: [],
  id: "CustomerGrid",
  closeAction: "destroy",
  plugins: ["cellediting", "gridfilters"],
  controller: "CustomerCtrl",
  // store: { type: 'CustomerStore' },
  viewModel: { data: { active: 1 } },
  store: store,
  enableHdMenu: false,
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
              value: "客户资料维护",
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
              itemId: "active"
            }
          ]
        },
        {
          xtype: "QueryToolbarView"
        }
      ]
    }
  ],
  columns: [
    {
      text: "客户ID",
      width: 50,
      dataIndex: "id",
    },
    {
      text: "代码",
      width: 70,
      dataIndex: "C_code",
      align: "left",
      editor: {
        allowBlank: false,
        regex: /(^[0-9A-Z]{1,5}$)/,
        type: "string",
      }
    },
    {
      text: "客户名称",
      dataIndex: "C_name",
      flex: 2,
      align: "left",
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
      text: "客户简称",
      dataIndex: "C_shortname",
      flex: 1,
      align: "left",
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
      text: "客户地址",
      dataIndex: "Address",
      flex: 3,
      align: "left",
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
      text: "联系电话",
      dataIndex: "Tel",
      flex: 1,
      align: "left",
      editor: {
        allowBlank: true,
        type: "string",
      }
    },
    {
      text: "移动电话",
      dataIndex: "smsphone",
      flex: 1,
      align: "left",
      editor: {
        allowBlank: true,
        type: "string",
      }
    },
    {
      text: "审核人数",
      dataIndex: "shrs",
      flex: 1,
      align: "center",
      editor: {
        allowBlank: false,
        type: "numberfield",
        decimalPrecision: 1
      }
    },
    {
      text: "月度开始日",
      dataIndex: "Beginday",
      width: 90,
      align: "center",
      hidden: true,
      editor: {
        allowBlank: false,
        type: "numberfield",
        decimalPrecision: 1,
      }
    },
    {
      xtype: "datecolumn",
      text: "有效日期",
      sortable: false,
      dataIndex: "Enddate",
      width: 120,
      //formatter: 'date("Y-m-d")',
      format: "Y-m-d",
      editor: {
        xtype: "datefield",
        format: "y-m-d",
        //disabledDays: [0, 6],
        //disabledDaysText: 'Plants are not available on the weekends'
      }
    },
    {
      xtype: "checkcolumn",
      width: 50,
      text: "活跃",
      dataIndex: "Active",
    },
    {
      xtype: "checkcolumn",
      width: 80,
      text: "独立单价",
      dataIndex: "Aloneprice",
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
  listeners: {
    select: "onItemSelected",
  },
});
