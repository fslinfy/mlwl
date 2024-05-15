Ext.define("MyApp.view.main.showView.CptzdListView", {
  extend: "Ext.grid.Panel",
  alias: "widget.CptzdListView",
  requires: [
    "MyApp.view.main.SubTable",
    ,
    // 'MyApp.view.main.cptzdgl.CptzdCtrlFunction',
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.store.CptzdListStore",
    "MyApp.store.CptzdmxStore",
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.cptzdgl.CptzdShowView",
    "MyApp.view.main.DataSave",
    "MyApp.view.main.tree.QueryCkmc",
    "MyApp.view.main.tree.QueryDate",
    "MyApp.view.main.report.PrintCptzd",
  ],
  itemId: "CptzdListGrid",
  reference: "CptzdListGrid",
  closeAction: "destroy",
  plugins: ["gridfilters"],
  viewModel: {
    data: {
      start_date: new Date(),
      end_date: new Date(),
      khmc: "",
      khid: 0,
      deletebz: false,
    },
  },
  store: { type: "CptzdListStore" },
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
              flex: 1,
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
          width: 100,
          text: "规格型号",
          dataIndex: "cpgg",
        },
        {
          width: 100,
          text: "商品批号",
          dataIndex: "cpph",
        },
        {
          width: 50,
          text: "单位",
          dataIndex: "jldw",
        },
        {
          width: 50,
          text: "仓位",
          dataIndex: "cw",
        },
        {
          width: 100,
          text: "说明",
          dataIndex: "sm",
        },
        {
          xtype: "datecolumn",
          text: "进库日期",
          width: 90,
          format: "y-m-d",
          dataIndex: "czrq",
        },
        {
          xtype: "numbercolumn",
          text: "单价",
          dataIndex: "czdj",
          renderer: jerenderer,
        },
        {
          xtype: "numbercolumn",
          text: "调账数量",
          align: "right",
          dataIndex: "tzsl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "调账重量",
          align: "right",
          dataIndex: "tzzl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "进仓费用",
          align: "right",
          dataIndex: "tzje",
          renderer: jerenderer,
        },
        {
          width: 50,
          text: "新仓位",
          dataIndex: "newcw",
        },
        {
          width: 100,
          text: "新商品批号",
          dataIndex: "newcpph",
        },
        {
          xtype: "datecolumn",
          text: "调入日期",
          width: 100,
          format: "y-m-d",
          dataIndex: "newczrq",
        },
        /* {
             xtype: 'numbercolumn',
             text: '新仓租单价',
             dataIndex: 'newczdj',
             renderer: jerenderer
         },*/
        {
          width: 100,
          text: "新说明",
          dataIndex: "newsm",
        },
      ],
      getAssociatedRecords: function (record) {
        var result = Ext.Array.filter(cptzdmxStore.data.items, function (r) {
          return r.get("tzid") == record.get("id");
        });
        return result;
      },
    },
  ],
  enableColumnHide: false,
  columnLines: true,
  columns: [
    {
      text: "ID",
      hidden: true,
      hideable: false,
      dataIndex: "id",
    },
    {
      xtype: "widgetcolumn",
      width: 90,
      sortable: false,
      widget: {
        xtype: "button",
        text: "浏览",
        itemId: "btnCptzdmxShowView",
        //handler: 'onCptzdmxShowView'
      },
    },
    {
      text: "流水单号",
      width: 130,
      sortable: true,
      hideable: false,
      dataIndex: "tzdh",
    },
    {
      xtype: "datecolumn",
      text: "日期",
      width: 100,
      formatter: 'date("Y-m-d")',
      //format: 'y-m-d',
      sortable: false,
      hideable: false,
      dataIndex: "tzrq",
    },
    {
      text: "调出客户名称",
      width: 250,
      sortable: false,
      dataIndex: "khmc",
    },
    {
      xtype: "numbercolumn",
      text: "调账数量",
      sortable: false,
      dataIndex: "tzsl",
      renderer: slrenderer,
    },
    {
      xtype: "numbercolumn",
      text: "调账重量",
      sortable: false,
      dataIndex: "tzzl",
      renderer: slrenderer,
    },
    {
      xtype: "numbercolumn",
      text: "调账费用",
      sortable: false,
      dataIndex: "tzje",
      renderer: jerenderer,
    },
    /*{
        xtype: 'numbercolumn',
        text: '其中现金',
        dataIndex: 'xjje',
        renderer: jerenderer
    },*/
    {
      text: "调入客户名称",
      width: 250,
      sortable: false,
      dataIndex: "newkhmc",
    },
    {
      xtype: "checkcolumn",
      width: 150,
      sortable: false,
      text: "调入客户计费",
      dataIndex: "jekh",
    },
    {
      text: "",
      width: 60,
      sortable: false,
      dataIndex: "delbz",
      renderer: function (val) {
        if (val) {
          return "作废";
        }
        return "";
      },
    },
  ],
});
