var gridTableName = "cwworktjmxgridTable";
var bystore = Ext.create("Ext.data.ArrayStore", {
  fields: ["id", "workname"],
  data: [
    ["1", "搬运"],
    ["2", "机械"],
    ["3", "仓管"],
  ],
});
var griddiv = new Ext.Component({
  itemId: "gridComponentId",
  flex: 1,
  bodyStyle: { border: 1 },
  reference: "gridComponentId",
  layout: "fit",
  bodyPadding: 0,
  html:
    '<div style="background:red; width:100%;height:100%;padding:0 1 0 1;" id="griddivid' +
    gridTableName +
    '"> <table id="' +
    gridTableName +
    '" style="width:100%;"></table><div id="' +
    gridTableName +
    'Pager"></div></div>',
});
var fheight = 218;
var paging = false;
var that;
var grid;
var sumfooterrow = false;
var PageTitleName = "月度工作量统计明细表";
var exportfilename;
var listUrl = "";
var isSearchEnable;
Ext.define("MyApp.view.main.cwgl.Cwworktjmx_Ctrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwworktjmx_Ctrl",
  requires: [
    "MyApp.view.main.QueryToolbarView",
    //,"MyApp.view.main.cwgl.Cwworktjmx_Grid"
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCkmc",
    "MyApp.view.main.cwgl.Cwworktjmx_View",
  ],
  init: function () {
    that = this;
    that.viewname = that.getView();
    gridTableName = "cwworktjmxgridTable";
    PageTitleName = "月度工作量统计明细表";
    exportfilename = PageTitleName + ".xlsx";
    var tool = that.getView().down("#QueryToolbarView");
    tool.down("#btnExport").setHidden(false);
    that.control({
      "#btnQuery": { click: that.onBtnQueryClick },
      "#btnHelp": { click: that.onBtnHelpClick },
      "#btnExport": { click: that.onBtnExportClick },
      "#btnQueryKhmc": { click: that.onSelectKhbmView },
      "#btnQueryCkmc": { click: that.onSelectCkbmView },
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
    that.getView().down("#QueryKhmc").setHidden(true);
    var d = document.getElementById("maintabpanel");
    if (d) {
      d.style.top = "37px";
      d.style.left = "0px";
    }
  },
  onBtnQueryClick: function (button, e, options) {
    createpivotgridmx(1);
  },
  onBtnHelpClick: function (button, e, options) {},
  onBtnExportClick: function (button, e, options) {
    grid.jqGrid("exportToCsv", {
      includeLabels: true,
      includeGroupHeader: true,
      includeFooter: true,
      fileName: exportfilename,
      maxlength: 40,
    });
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    //   that.onBtnQueryClick();
    return false;
  },
  onSelectCkbmView: function (record) {
    treeSelect("ckmc", that, "", that.viewname, true);
    return false;
  },
  ckmcTriggerClick: function (record) {
    //  that.onBtnQueryClick();
    return false;
  },
  //************************************************ */
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
  //**************************************************** */
});
createpivotgridmx = function (op) {
  //if (op>0){
  var w = window.innerWidth - 8;
  var h = document.documentElement.clientHeight - 238;
  var dt = new Date()
    .toISOString()
    .replace("-", "")
    .replace("-", "")
    .replace(".", "")
    .replace(":", "")
    .replace(":", "");
  dt = "Id" + dt;
  //console.log('createpivotgrid0',dt,w,h);
  griddiv = new Ext.Component({
    itemId: dt,
    flex: 1,
    id: dt,
    bodyStyle: { border: 1 },
    reference: dt,
    layout: "fit",
    bodyPadding: 0,
    html:
      '<div style="width:' +
      w +
      ";height:" +
      h +
      ';padding:0 1 0 1;" id="griddivid' +
      gridTableName +
      '"> <table id="' +
      gridTableName +
      '" style="width:100%;"></table><div id="' +
      gridTableName +
      'Pager"></div></div>',
  });
  var panel = that.getView().down("#" + gridTableName + "gridPanelId");
  panel.removeAll();
  panel.add(griddiv);
  var v = that.getView().getViewModel();
  var ckid = v.get("ckid");
  var khid = v.get("khid");
  var ny = v.get("ny");
  var yu = v.get("yu");
  var work = v.get("bywork");
  var workname = "搬运";
  switch (work) {
    case "1":
      workname = "搬运";
      break;
    case "2":
      workname = "机械";
      break;
    case "3":
      workname = "仓管";
      break;
  }
  exportfilename = ny + "年" + yu + "月度" + workname + "工作量统计表.xlsx";
  var url =
    "JQGRIDDATA.php?act=CwworktjmxLIST&loc=&bybz=" +
    work +
    "&ny=" +
    ny +
    "&yu=" +
    yu +
    "&khid=" +
    khid +
    "&p_l_id=" +
    ckid +
    "&bz=&page=1&start=0&limit=25";
  grid = jQuery("#" + gridTableName);
  //grid=that.getView().down("#"+gridTableName);
  //console.log(url,grid);
  grid.jqGrid(
    "jqPivot",
    url,
    {
      xDimension: [
        // { dataName: "bz" , label: '   ',width:20 },
        { dataName: "ri", label: "日", align: "center", width: 50 },
        { dataName: "dw", label: "计量单位", align: "center", width: 100 },
      ],
      groupSummaryPos: "footer",
      groupSummary: false,
      aggregates: [
        {
          formatter: "number",
          label: "sl",
          width: 100,
          align: "right",
          aggregator: "sum",
          summaryType: "sum",
          formatoptions: { defaultValue: "" },
          member: "sl",
        },
      ],
      yDimension: [
        { dataName: "bz" },
        { dataName: "xm" },
        { dataName: "jcbz" },
      ],
      rowTotals: false,
      colTotals: true,
      // caption: "Multiple aggregates"
    },
    {
      gridComplete: function () {
        // onGridComplete();
        grid.setGridWidth(window.innerWidth - 8);
        grid.setGridHeight(document.documentElement.clientHeight - 238);
        jQuery(window)
          .bind("resize", function () {
            grid.setGridWidth(window.innerWidth - 8);
            grid.setGridHeight(document.documentElement.clientHeight - 238);
            //  console.log("resize",document.documentElement.clientHeight-238,window.innerWidth-8);
          })
          .trigger("resize");
      },
      //  groupingView: {
      //  hideFirstGroupCol: false,
      //  groupColumnShow: [true, true]
      // },
      width: 600,
      height: 400,
      rowNum: 10000,
      loadonce: true,
      viewrecords: true,
      shrinkToFit: false,
      // footerrow: true,
      useColSpanStyle: true,
      //  rowList : ["10:10","20:20","30:30","10000:All"],
      //   pager: "#"+gridTableName+"Pager",
    }
  );
};
