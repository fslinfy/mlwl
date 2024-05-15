var showSummary = true;
Ext.define("MyApp.view.main.cpkc.CpkcmxlocView", {
  extend: "Ext.grid.Panel",
  xtype: "CpkcmxlocView",
  closeAction: "destroy",
  itemId: "CpkcmxlocGrid",
  reference: "CpkcmxlocGrid",
  plugins: ["gridfilters"],
  // plugins: [{
  //     ptype: 'gridexporter'
  // }],
  controller: "CpkcmxlocCtrl",
  viewModel: {
    data: {
      khmc: "",
      khid: 0,
      cdmc: "",
      cdid: 0,
      ckmc: "",
      ckid: 0,
      area: "",
      cpmc: "",
      cpid: 0,
    },
  },
  store: { type: "CpkclocStore" },
  //store: CpkclocStore,
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
              value: "库存明细查询",
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
              xtype: "QueryArea",
            },
            { xtype: "QueryCdmc", flex: 1 },
            { xtype: "QueryCpmc", flex: 1 },
            {
              labelWidth: 30,
              xtype: "triggerfield",
              fieldLabel: "过滤",
              itemId: "FilterField",
              flex: 1,
              margin: "0 10 0 15",
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
      text: "ID",
      hidden: true,
      hideable: false,
      dataIndex: "id",
    },
    {
      text: "客户名称",
      flex: 2,
      hideable: true,
      hidden: sys_customer_id > 0,
      dataIndex: "khmc",
    },
    {
      text: "仓库名称",
      flex: 2,
      hideable: true,
      hidden: sys_location_id > 0,
      dataIndex: "ckmc",
    },
    {
      text: "产地名称",
      flex: 2,
      dataIndex: "cdmc",
    },
    {
      text: "商品名称",
      flex: 4,
      dataIndex: "cpmc",
    },
    {
      text: "包装",
      flex: 4,
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
    {
      text: "规格型号",
      flex: 2,
      dataIndex: "cpgg",
    },
    {
      text: "批号",
      flex: 2,
      dataIndex: "cpph",
    },
    {
      text: "区",
      width: 80,
      sortable: false,
      hideable: true,
      hidden: sys_location_areas < 2 || sys_location_id == 0,
      dataIndex: "area",
    },
    {
      text: "仓位",
      width: 60,
      sortable: false,
      dataIndex: "cw",
    },
    {
      text: "单位",
      width: 60,
      sortable: false,
      dataIndex: "jldw",
    },
    {
      xtype: "numbercolumn",
      text: "数量",
      sortable: false,
      flex: 2,
      align: "right",
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
      text: "重量",
      sortable: false,
      flex: 2,
      align: "right",
      dataIndex: "zl",
      summaryType: "sum",
      summaryRenderer: slrenderer,
      field: {
        xtype: "numberfield",
      },
      renderer: slrenderer,
    },
    {
      text: "进库日期",
      sortable: false,
      formatter: 'date("Y-m-d")',
      width: 90,
      dataIndex: "czrq",
    },
    {
      text: "仓位说明",
      sortable: false,
      width: 80,
      dataIndex: "sm",
    },
  ],
  listeners: {
    select: "onItemSelected" /*,
        celldblclick: function (grid, row) {
               var selection = grid.getSelectionModel().getSelection()[0];
               console.log(selection);
               return ;
        }
*/,
  },
});
