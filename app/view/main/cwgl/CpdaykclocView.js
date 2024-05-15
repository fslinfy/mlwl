var khsum = true;
var cpsum = true;
var CpdaykcmxStore = Ext.create("MyApp.store.CpjcttmxStore", {
  groupField: "bz",
  proxy: {
    type: "ajax",
    api: {
      read: sys_ActionPHP + "?act=cpdaykclist_pc",
    },
    actionMethods: {
      read: "GET",
    },
    extraParams: {
      loc: "cpdaykcloc",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      khid: 0,
      khbz: 1,
      cpbz: 0,
      jclb: "",
      ny: new Date().getYear(),
      yu: new Date().getMonth() + 1,
      ri: new Date().getDate(),
    },
    reader: {
      type: "json",
      rootProperty: "rows",
    },
  },
  autoLoad: false,
});
Ext.define("MyApp.model.base.BillStatusEnum", {
  extend: "Ext.data.Store",
  alias: "model.base.BillStatusEnum",
  singleton: true,
  valueField: "value",
  displayField: "label",
  fields: ["value", "label"],
  data: [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: 4, label: "04" },
    { value: 5, label: "05" },
    { value: 6, label: "06" },
    { value: 7, label: "07" },
    { value: 8, label: "08" },
    { value: 9, label: "09" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" },
    { value: 18, label: "18" },
    { value: 19, label: "19" },
    { value: 20, label: "20" },
    { value: 21, label: "21" },
    { value: 22, label: "22" },
    { value: 23, label: "23" },
    { value: 24, label: "24" },
    { value: 25, label: "25" },
    { value: 26, label: "26" },
    { value: 27, label: "27" },
    { value: 28, label: "28" },
    { value: 29, label: "29" },
    { value: 30, label: "30" },
    { value: 31, label: "31" },
  ],
});
var showSummary = true;
Ext.define("MyApp.view.main.cwgl.CpdaykclocView", {
  extend: "Ext.grid.Panel",
  xtype: "CpdaykclocView",
  requires: [
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCkmc",
  ],
  closeAction: "destroy",
  itemId: "CpdaykclocGrid",
  reference: "CpdaykclocGrid",
  plugins: ["gridfilters"],
  controller: "CpdaykclocCtrl",
  viewModel: {
    data: {
      start_date: new Date(),
      ckid: 0,
      khsum: khsum,
      cpsum: cpsum,
      ckmc: "",
      khmc: "",
      khid: 0,
      jclb: "",
      ny: new Date().getFullYear(),
      yu: new Date().getMonth() + 1,
      ri: new Date().getDate() + 1,
    },
  },
  // store: { type: 'CpdaykcmxStore' },
  store: CpdaykcmxStore,
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
              xtype: "QueryKhmc",
              flex: 1,
              hidden: sys_customer_id > 0,
            },
            // {
            //    xtype: 'QueryCkmc', flex: 2,
            //     hidden: (sys_location_id > 0)
            // },
            {
              xtype: "datefield",
              fieldLabel: "库存日期",
              labelWidth: 60,
              margin: "0 0 0 5",
              width: 200,
              bind: "{start_date}",
              allowBlank: false,
              format: "Y-m-d",
            },
            {
              flex: 1,
            },
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
      text: "客户",
      width: 200,
      //flex: 1,
      dataIndex: "khmc",
    },
    {
      text: "商品",
      width: 200,
      //flex: 1,
      dataIndex: "cpmc",
    },
    {
      text: "上月结存",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 90,
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
          width: 90,
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
    {
      text: "入库",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 90,
          dataIndex: "jcsl",
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
          width: 90,
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
      text: "出库",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 90,
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
          width: 90,
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
      text: "过户出仓",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 90,
          dataIndex: "gfsl",
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
          width: 90,
          align: "right",
          dataIndex: "gfzl",
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
      text: "过户入仓",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 90,
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
          width: 90,
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
      text: "结存",
      //width: 200,
      columns: [
        {
          xtype: "numbercolumn",
          text: "数量(包)",
          align: "right",
          sortable: false,
          width: 100,
          dataIndex: "sl",
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
          width: 100,
          align: "right",
          dataIndex: "zl",
          summaryType: "sum",
          summaryRenderer: slrenderer,
          field: {
            xtype: "numberfield",
          },
          renderer: slrenderer,
        },
      ],
    },
    /*{
            text: 'kc',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 100,
                    dataIndex: 'kcsl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 100, align: 'right',
                    dataIndex: 'kczl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },
          {
            text: 'kc0',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 100,
                    dataIndex: 'sl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 100, align: 'right',
                    dataIndex: 'zl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },*/
    {
      flex: 1,
    },
  ],
});
