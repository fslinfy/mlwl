Ext.define("MyApp.view.main.showView.CpjkdListView", {
  extend: "Ext.grid.Panel",
  alias: "widget.CpjkdListView",
  requires: [
    "MyApp.view.main.SubTable",
    "MyApp.store.CpjkdListStore",
    "MyApp.store.CpjkdmxStore",
    "MyApp.store.CpjkdcwStore",
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.cpjkdsh.CpjkdShowView",
    "MyApp.view.main.tree.QueryDate",
    "MyApp.view.main.cpjkdsh.CpjkdCtrlFunction",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.DataSave",
    "MyApp.view.main.tree.QueryCkmc",
  ],
  itemId: "CpjkdListGrid",
  reference: "CpjkdListGrid",
  plugins: ["gridfilters"],
  closeAction: "destroy",
  viewModel: {
    data: {
      start_date: new Date(),
      end_date: new Date(),
      khmc: "",
      khid: 0,
      deletebz: 0,
      PageTitleName: "",
    },
  },
  store: { type: "CpjkdListStore" },
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
          text: "数量",
          width: 100,
          align: "right",
          dataIndex: "jcsl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "重量",
          width: 100,
          align: "right",
          dataIndex: "jczl",
          renderer: slrenderer,
        },
        {
          xtype: "numbercolumn",
          text: "单价",
          width: 100,
          align: "right",
          dataIndex: "czdj",
          renderer: jerenderer,
        },
        {
          xtype: "numbercolumn",
          text: "进仓费用",
          width: 100,
          align: "right",
          dataIndex: "jcje",
          renderer: jerenderer,
        },
        /*,
            
            {
                xtype: 'numbercolumn',
                text: '现付',
                dataIndex: 'xjje',
                renderer: jerenderer
            },*/
        /* 
             {
                 xtype: 'textcolumn',
                 text: '机械',
                 dataIndex: 'gs'
             }
             ,
             {
                 xtype: 'textcolumn',
                 text: '搬运',
                 dataIndex: 'byg'
             }
             ,
             {
                 xtype: 'textcolumn',
                 text: '仓管',
                 dataIndex: 'cg'
             }*/
      ],
      getAssociatedRecords: function (record) {
        var result = Ext.Array.filter(cpjkdmxStore.data.items, function (r) {
          return r.get("jkid") == record.get("id");
        });
        return result;
      },
    },
  ],
  enableHdMenu: false,
  enableColumnHide: false,
  collapsible: false,
  animCollapse: false,
  //defaults:{
  // sortable:false
  //},
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
        handler: "onCpjkdmxShowView",
      },
    },
    {
      text: "流水单号",
      width: 130,
      sortable: true,
      hideable: false,
      dataIndex: "jkdh",
    } /*{
        xtype: 'datecolumn',
        text: '日期',
        width: 100,
       formatter: 'date("Y-m-d")',
      //  format: 'y-m-d',
       
       sortable: false,
        hideable: false,
        dataIndex: 'jkrq'
    }, */,
    {
      xtype: "datecolumn",
      text: "进库日期",
      width: 120,
      formatter: 'date("Y-m-d")',
      sortable: false,
      hideable: false,
      dataIndex: "czrq",
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
      width: 200,
      sortable: false,
      hidden: sys_location_id > 0,
      dataIndex: "ckmc",
    },
    {
      xtype: "numbercolumn",
      text: "数量",
      align: "right",
      sortable: false,
      dataIndex: "jcsl",
      renderer: slrenderer,
    },
    {
      xtype: "numbercolumn",
      text: "重量",
      align: "right",
      sortable: false,
      dataIndex: "jczl",
      renderer: slrenderer,
    },
    {
      xtype: "numbercolumn",
      text: "费用",
      align: "right",
      dataIndex: "jcje",
      sortable: false,
      renderer: jerenderer,
    },
    {
      xtype: "numbercolumn",
      text: "其中现金",
      sortable: false,
      align: "right",
      hidden: true,
      dataIndex: "xjje",
      renderer: jerenderer,
    },
    {
      text: "送货单号",
      sortable: false,
      dataIndex: "sfdh",
    },
    {
      text: "车牌号码",
      sortable: false,
      dataIndex: "cphm",
    },
    {
      text: "送货人",
      sortable: false,
      dataIndex: "sfr",
    },
    {
      text: "经办人",
      sortable: false,
      dataIndex: "czy",
    } /* {
        xtype: 'datecolumn',
        text: '起租日期',
        width: 120,
        formatter: 'date("Y-m-d")',
        sortable: false,
        hideable: false,
        dataIndex: 'czrq'
    },*/,
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
  /*,
        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: { type: 'CpjkdListStore' },
            dock: 'bottom',
            displayInfo: true,
          
            displayMsg: '总记录数 {0} - {1} of {2}',
            emptyMsg: "没有记录"
        }]*/
});
