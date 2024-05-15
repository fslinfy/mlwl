var CpjxcrilocStore = Ext.create("MyApp.store.CpkclocStore", {
  groupField: "khmc",
  proxy: {
    type: "ajax",
    api: {
      read: sys_ActionPHP + "?act=cpjxcriloc",
    },
    actionMethods: {
      read: "GET",
    },
    extraParams: {
      loc: "cpjxcriloc",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      khid: 0,
      cdid: 0,
      cpid: 0,
      area: null,
      rq: new Date(),
    },
    reader: {
      type: "json",
      rootProperty: "rows",
    },
  },
  autoLoad: false,
});
var showSummary = true;
Ext.define("MyApp.view.main.cpkc.CpjxcrilocView", {
  extend: "Ext.grid.Panel",
  xtype: "CpjxcrilocView",
  requires: [
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCpmc",
    "MyApp.view.main.tree.QueryCdmc",
    "MyApp.view.main.tree.QueryCkmc",
    //, 'MyApp.view.main.tree.QueryBzmc'
  ],
  closeAction: "destroy",
  itemId: "CpjxcrilocGrid",
  reference: "CpjxcrilocGrid",
  plugins: ["gridfilters"],
  controller: "CpjxcrilocCtrl",
  viewModel: {
    data: {
      khmc: "",
      khid: 0,
      rq: new Date(),
      ckmc: "",
      ckid: 0,
      cpmc: "",
      cpid: 0,
      cdmc: "",
      cdid: 0,
      bzmc: "",
      bzid: 0,
    },
  },
  // store: { type: 'CpjxcrilocStore' },
  store: CpjxcrilocStore,
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
              xtype: "datefield",
              fieldLabel: "日期",
              labelWidth: 30,
              itemId: "rq",
              margin: "0 0 0 5",
              width: 158,
              bind: "{rq}",
              allowBlank: false,
              format: "Y-m-d",
            },
            {
              xtype: "QueryKhmc",
              flex: 1,
              hidden: sys_customer_id > 0,
            },
            {
              xtype: "QueryCkmc",
              flex: 1,
              hidden: sys_location_id > 0,
            },
            {
              xtype: "QueryCdmc",
              flex: 1, //               hidden: (sys_location_id > 0)
            },
            { xtype: "QueryCpmc", flex: 1 },
          ],
        },
        {
          xtype: "QueryToolbarView",
        },
      ],
    },
  ],
  columnLines: true,
  enableColumnHide: false,
  features: [
    {
      id: "group",
      ftype: "groupingsummary",
      groupHeaderTpl: "{name}",
      hideGroupedHeader: true,
      enableGroupingMenu: false,
    },
    {
      ftype: "summary",
      dock: "bottom",
    },
  ],
  lockedViewConfig: {
    scroll: "horizontal",
  },
  columns: [
    {
      text: "客户名称",
      width: 200,
      hideable: true,
      hidden: sys_customer_id > 0,
      dataIndex: "khmc",
    },
    {
      text: "仓库名称",
      width: 200,
      hideable: true,
      hidden: sys_location_id > 0,
      dataIndex: "ckmc",
    },
    {
      text: "产地名称",
      // width: 150,
      flex: 1,
      dataIndex: "cdmc",
    },
    {
      text: "商品名称",
      //width: 150,
      flex: 1,
      dataIndex: "cpmc",
    },
    {
      text: "包装",
      //width: 150,
      flex: 1,
      dataIndex: "bzmc",
      summaryType: "count",
      summaryRenderer: function (value, summaryData, dataIndex) {
        if (typeof value == "object") {
          return "合计";
        } else {
          return "小计";
        }
      },
    },
    /*{
            text: '规格型号',
            width: 100,
            dataIndex: 'cpgg'
        },*/
    {
      text: "批号",
      width: 130,
      dataIndex: "cpph",
    },
    {
      text: "单位",
      width: 50,
      sortable: false,
      dataIndex: "jldw",
    },
    {
      text: "上期商品库存",
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量",
          sortable: false,
          width: 70,
          dataIndex: "kcsl0",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量(吨)",
          sortable: false,
          width: 85,
          align: "right",
          dataIndex: "kczl0",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
    {
      text: "本期商品进库",
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量",
          sortable: false,
          width: 70,
          align: "right",
          dataIndex: "jcsl",
          summaryType: "sum",
          // summaryRenderer: slrenderer,
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量(吨)",
          sortable: false,
          width: 85,
          align: "right",
          dataIndex: "jczl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
    {
      text: "本期商品出库",
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量",
          sortable: false,
          width: 70,
          align: "right",
          dataIndex: "ccsl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量(吨)",
          sortable: false,
          width: 85,
          align: "right",
          dataIndex: "cczl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
    {
      text: "本期商品调账",
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量",
          sortable: false,
          width: 70,
          align: "right",
          dataIndex: "tzsl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量(吨)",
          sortable: false,
          width: 85,
          align: "right",
          dataIndex: "tzzl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
    {
      text: "本期商品结存",
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量",
          sortable: false,
          width: 70,
          align: "right",
          dataIndex: "kcsl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量(吨)",
          sortable: false,
          width: 85,
          align: "right",
          dataIndex: "kczl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
  ],
});
