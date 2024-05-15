var store = Ext.define("MyApp.store.CustomerDjStore", {
  extend: "Ext.data.Store",
  alias: "store.CustomerDjStore",
  model: "MyApp.model.CustomerModel",
  pageSize: 10000,
  proxy: {
    type: "ajax",
    api: {
      read: sys_ActionPHP + "?act=customerlist",
    },
    actionMethods: {
      create: "POST",
      read: "GET",
      update: "POST",
      destroy: "POST",
    },
    extraParams: {
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_e_code: sys_enterprise_code,
      CustomerDj: 1,
    },
    reader: {
      type: "json",
      rootProperty: "rows",
    },
  },
  autoLoad: true,
});
Ext.define("MyApp.view.main.customer.CustomerDjView", {
  extend: "Ext.grid.Panel",
  xtype: "CustomerDjView",
  title: "CustomerDj",
  id: "CustomerDjGrid",
  closeAction: "destroy",
  plugins: ["cellediting", "gridfilters"],
  controller: "CustomerDjCtrl",
  store: { type: "CustomerDjStore" },
  // store:store,
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
              value: "客户独立仓租单价定义",
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0px",
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
              },
            },
          ],
        },
        {
          xtype: "QueryToolbarView",
        },
      ],
    },
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
        },
      },
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
        },
      },
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
        },
      },
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
      },
    },
    {
      xtype: "datecolumn",
      text: "有效日期",
      sortable: false,
      dataIndex: "Enddate",
      width: 120,
      format: "Y-m-d",
    },
    {
      width: 90,
      text: "重量核算",
      sortable: false,
      dataIndex: "Weight_Status",
      align: "center",
      renderer: function (val) {
        if (val) return "是";
        else return "";
      },
    },
    {
      width: 90,
      text: "活跃",
      sortable: false,
      dataIndex: "Active",
      align: "center",
      renderer: function (val) {
        if (val) return "是";
        else return "";
      },
    },
    {
      width: 90,
      text: "独立单价",
      sortable: false,
      dataIndex: "Aloneprice",
      align: "center",
      renderer: function (val) {
        if (val) return "是";
        else return "";
      },
    },
    {
      xtype: "widgetcolumn",
      width: 120,
      sortable: false,
      widget: {
        xtype: "button",
        text: "独立仓租单价",
        handler: "onPackingEdit",
      },
    },
  ],
  listeners: {
    select: "onItemSelected",
  },
});
