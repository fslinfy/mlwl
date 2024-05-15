Ext.define("MyApp.view.main.showView.CpghdListView", {
  extend: "Ext.grid.Panel",
  alias: "widget.CpghdListView",
  requires: [
    "MyApp.view.main.SubTable",
    "MyApp.store.CpghdStore",
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.DataSave",
    "MyApp.store.CpghdmxStore",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCkmc",
    "MyApp.view.main.tree.QueryDate",
  ],
  itemId: "CpghdListGrid",
  plugins: ["gridfilters"],
  closeAction: "destroy",
  viewModel: {
    data: {
      start_date: new Date(),
      end_date: new Date(),
      khmc: "",
      khid: 0,
      ckmc: "",
      ckid: 0,
      deletebz: false,
      PageTitleName: "",
    },
  },
  store: { type: "CpghdStore" },
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
              bind: "{PageTitleName}",
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0px",
                color: "#000",
              },
              fieldCls: "biggertext",
              hideLabel: true,
            },
            { xtype: "QueryKhmc" },
            { xtype: "QueryCkmc" },
            { xtype: "QueryDate", itemId: "QueryDate", hidden: true },
            {
              xtype: "checkbox",
              labelWidth: 60,
              fieldLabel: "含作废单",
              width: 100,
              margin: "0 5 0 5",
              bind: "{deletebz}",
              itemId: "deletebz",
              hidden: true,
            },
            {
              labelWidth: 30,
              xtype: "triggerfield",
              fieldLabel: "过滤",
              itemId: "FilterField",
              margin: "0 10 0 10",
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
  plugins: [
    {
      ptype: "subtable",
      columnLines: true,
      headerWidth: 24,
      columns: [
        {
          text: "产地名称",
          dataIndex: "cdmc",
        },
        {
          text: "商品名称",
          dataIndex: "cpmc",
        },
        {
          text: "包装规格",
          dataIndex: "bzmc",
        },
        {
          text: "规格型号",
          dataIndex: "cpgg",
        },
        {
          width: 50,
          text: "单位",
          dataIndex: "jldw",
        },
        {
          xtype: "numbercolumn",
          text: "申请数量",
          align: "right",
          dataIndex: "xssl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "申请重量",
          align: "right",
          dataIndex: "xszl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "过户数量",
          align: "right",
          dataIndex: "ghsl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "过户重量",
          align: "right",
          dataIndex: "ghzl",
          renderer: slrenderer,
        },
      ],
      getAssociatedRecords: function (record) {
        var result = Ext.Array.filter(cpghdmxStore.data.items, function (r) {
          return r.get("ghid") == record.get("id");
        });
        return result;
      },
    },
  ],
  columnLines: true,
  enableColumnHide: false,
  defaults: {
    sortable: false,
  },
  columns: [
    {
      text: "ID",
      hidden: true,
      hideable: false,
      dataIndex: "id",
    },
    {
      xtype: "widgetcolumn",
      sortable: false,
      width: 90,
      widget: {
        xtype: "button",
        text: "浏览",
        handler: "onCpghdmxShowView",
      },
    },
    {
      text: "流水单号",
      width: 130,
      sortable: false,
      hideable: false,
      dataIndex: "ghdh",
    },
    {
      xtype: "datecolumn",
      text: "通知日期",
      sortable: false,
      width: 100,
      format: "y-m-d",
      hideable: false,
      dataIndex: "xsrq",
    },
    {
      xtype: "datecolumn",
      text: "过户日期",
      sortable: false,
      width: 100,
      format: "y-m-d",
      hideable: false,
      // bind: {
      //   hidden:( "{fhbz}"<2 )
      //   },
      dataIndex: "ghrq",
    },
    {
      text: "客户名称",
      width: 200,
      sortable: false,
      hidden: sys_customer_id > 0,
      dataIndex: "khmc",
    },
    {
      text: "仓库名称",
      width: 150,
      sortable: false,
      hidden: sys_location_id > 0,
      dataIndex: "ckmc",
    },
    {
      xtype: "numbercolumn",
      text: "数量",
      align: "right",
      sortable: false,
      dataIndex: "xssl",
      renderer: slrenderer,
    },
    {
      xtype: "numbercolumn",
      text: "重量",
      align: "right",
      sortable: false,
      dataIndex: "xszl",
      renderer: slrenderer,
    },
    /*{
        xtype: 'numbercolumn',
        text: '金额',align: 'right',
        sortable: false,
        dataIndex: 'xsje',
        renderer: jerenderer
    },
    {
        text: '提货车牌',
        sortable: false,
        dataIndex: 'cphm'
    }, {
        text: '提货人',
        sortable: false,
        dataIndex: 'sfr'
    },
    */ {
      text: "申请人",
      sortable: false,
      dataIndex: "czy",
    },
    {
      text: "经办人",
      sortable: false,
      dataIndex: "ghr",
    },
    {
      text: "新客户名称",
      width: 200,
      sortable: false,
      hidden: sys_customer_id > 0,
      dataIndex: "newkhmc",
    },
    {
      text: "状态",
      sortable: false,
      dataIndex: "delbz",
      width: 80,
      renderer: function (value, cellmeta, record) {
        if (value) {
          return "作废";
        } else {
          if (record.data.cdbz) {
            return "过期冲单";
          } else {
            return "";
          }
        }
      },
    },
  ],
});
