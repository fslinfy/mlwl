var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var fheight = 218;
var sumfooterrow = true;
var gridTableName = "cztjlocgridTable";
var gridpostData;
var isEditEnable = false;
var isAddEnable = false;
var isDeleteEnable = false;
var isExportEnable = true;
var isSearchEnable = false;
var gridrowNum;
var gridSortName;
var PageTitleName = "月度收入统计表";
var gridgrouping = false;
var gridgroupingView = {};
var lastSel = 0;
var navGridObj;
var lastEditRow = 0;
var exportload = false;
var paging = false;
var editUrl = "";
var listUrl = "";
var mycolModel;
var setGroupHeaders = false;
var exportfilename = PageTitleName;
Ext.define("MyApp.view.main.cpczgl.CpcztjlocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpcztjlocCtrl",
  requires: [
    "MyApp.view.main.jqGridFunction",
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCkmc",
    "MyApp.view.main.tree.PageTitle",
    "MyApp.view.main.cpczgl.CpcztjlocView",
  ],
  init: function () {
    that = this;
    that.viewname = that.getView();
    var v = that.getView().getViewModel();
    var ckid = v.get("ckid");
    var khid = v.get("khid");
    //   var cpid = v.get('cpid');
    var ny = v.get("ny");
    var yu = v.get("yu");
    PageTitleName = "月度收入统计表";
    exportfilename = ny + "年" + yu + PageTitleName + ".xlsx";
    gridpostData = {
      export: "0",
      initArg: 123,
      p_e_code: 1,
      p_l_id: ckid,
      khid: khid,
      ny: ny,
      yu: yu,
    };
    fheight = 218;
    paging = false;
    gridrowNum = 10000;
    gridTableName = "cztjlocgridTable";
    listUrl = "jqgriddata.php?act=cztjloclist";
    gridgrouping = true;
    setGroupHeaders = false;
    gridgroupingView = {
      groupField: ["khmc"],
      groupColumnShow: [false],
      groupSummary: [true],
      // groupText : ['<b>{0}日 - {1}条记录 </b>'],
      groupCollapse: false,
      groupOrder: ["asc"],
    };
    mycolModel = [
      { label: "公司", name: "khmc", width: 80, sortable: false },
      { label: "日 ", name: "day", width: 50, sortable: false },
      { label: "产品名称", name: "cpmc", width: 300, sortable: false },
      {
        label: "单位",
        name: "jldw",
        width: 50,
        align: "center",
        width: 40,
        align: "center",
        sortable: false,
      },
      {
        label: "数量",
        name: "sl",
        width: 100,
        align: "right",
        formatter: zlFormat,
        sortable: false,
        summaryType: "sum",
      },
      {
        label: "重量",
        name: "zl",
        width: 100,
        align: "right",
        formatter: zlFormat,
        sortable: false,
        summaryType: "sum",
      },
      {
        label: "仓租",
        name: "je",
        width: 100,
        align: "right",
        formatter: jeFormat,
        sortable: false,
        summaryType: "sum",
      },
      //  {label: '单位',    name: 'dw',align: 'center',width:40, sortable: false },
      {
        label: "重量",
        name: "byzl",
        width: 100,
        align: "right",
        sortable: false,
        formatter: jeFormat,
        summaryType: "sum",
      },
      {
        label: "记帐金额",
        name: "byje",
        width: 100,
        align: "right",
        sortable: false,
        formatter: jeFormat,
        summaryType: "sum",
      },
      {
        label: "现收金额",
        name: "byxjje",
        width: 100,
        align: "right",
        sortable: false,
        formatter: jeFormat,
        summaryType: "sum",
      },
      {
        label: "合计金额",
        name: "sumje",
        width: 100,
        align: "right",
        sortable: false,
        formatter: jeFormat,
        summaryType: "sum",
      },
    ];
    var tool = that.getView().down("#QueryToolbarView");
    tool.down("#btnExport").setHidden(!isExportEnable);
    that.control({
      "#btnQuery": { click: that.onBtnQueryClick },
      "#btnHelp": { click: onBtnHelpClick },
      "#btnExport": { click: onBtnExportClick },
      "#btnQueryKhmc": { click: onSelectKhbmView },
      "#btnQueryCkmc": { click: onSelectCkbmView },
    });
    if (sys_customer_id > 0) {
      that.viewname.getViewModel().set("khid", sys_customer_id);
      that.viewname.getViewModel().set("khmc", sys_customer_name);
    }
    if (sys_location_id > 0) {
      that.viewname.getViewModel().set("ckid", sys_location_id);
      that.viewname.getViewModel().set("ckmc", sys_location_name);
      that.getView().down("#QueryCkmc").setHidden(true);
    }
  },
  onBtnQueryClick: function (button, e, options) {
    var v = that.getView().getViewModel();
    var ckid = v.get("ckid");
    var khid = v.get("khid");
    var ny = v.get("ny");
    var yu = v.get("yu");
    exportfilename = ny + "年" + yu + PageTitleName + ".xlsx";
    gridpostData = {
      export: "0",
      initArg: 123,
      p_e_code: 1,
      p_l_id: ckid,
      khid: khid,
      ny: ny,
      yu: yu,
    };
    grid
      .jqGrid("setGridParam", { postData: gridpostData })
      .trigger("reloadGrid");
  },
  onGridComplete: function () {
    console.log(" var CpcztjlocGrid onGridComplete");
    if (!setGroupHeaders) {
      jQuery("#" + gridTableName).jqGrid("setGroupHeaders", {
        //useColSpanStyle: false,
        useColSpanStyle: true,
        groupHeaders: [
          {
            startColumnName: "jldw",
            numberOfColumns: 4,
            titleText: "仓租明细",
          },
          {
            startColumnName: "byzl",
            numberOfColumns: 3,
            titleText: "装卸作业",
          },
        ],
      });
      jQuery("#" + gridTableName + "Export").jqGrid("setGroupHeaders", {
        useColSpanStyle: false,
        groupHeaders: [
          {
            startColumnName: "jldw",
            numberOfColumns: 4,
            titleText: "仓租明细",
          },
          {
            startColumnName: "byzl",
            numberOfColumns: 3,
            titleText: "装卸作业",
          },
        ],
      });
      setGroupHeaders = true;
    }
  },
  /********************************************************************************************* */
  editbeforeSubmit: function (postdata, formid) {
    return [true, ""];
  },
  editAfterSubmit: function (resp, postdata) {
    var obj = JSON.parse(resp.responseText);
    alert(obj.data.msg);
    return true;
  },
  addAfterSubmit: function (resp, postdata) {
    var obj = JSON.parse(resp.responseText);
    alert(obj.data.msg);
    return true;
  },
  deleteAfterSubmit: function (resp, postdata) {
    var obj = JSON.parse(resp.responseText);
    alert(obj.data.msg);
    return true;
  },
  gridLoadComplete: function (data) {},
  onGridSelectRow: function (id) {},
});
