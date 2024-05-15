var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var jelb = 2;
var fheight = 218;
var sumfooterrow = true;
var gridTableName = "cwbytcjetjgridTable";
var gridpostData;
var isEditEnable = false;
var isAddEnable = false;
var isDeleteEnable = false;
var isExportEnable = true;
var isSearchEnable = false;
var gridrowNum;
var gridSortName;
var PageTitleName = "作业提成统计明细";
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
var exportfilename = PageTitleName + ".xlsx";
Ext.define("MyApp.view.main.cwgl.Cwbytcjetj_Ctrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.Cwbytcjetj_Ctrl",
  requires: [
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.jqGridFunction",
    "MyApp.view.main.tree.QueryKhmc",
    "MyApp.view.main.tree.QueryCkmc",
    "MyApp.view.main.cwgl.Cwbytcjetj_View",
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
    gridpostData = {
      export: "0",
      jelb: 2,
      bz: 0,
      loc: "",
      initArg: 123,
      p_e_code: 1,
      p_l_id: ckid,
      khid: khid,
      ny: ny,
      yu: yu,
    };
    //console.log(gridpostData);
    setGroupHeaders = false;
    gridTableName = "cwbytcjetjgridTable";
    gridpostData;
    isEditEnable = false;
    isAddEnable = false;
    isDeleteEnable = false;
    isExportEnable = true;
    isSearchEnable = false;
    gridrowNum = 20000;
    gridSortName = "Id";
    PageTitleName = "作业提成统计明细";
    lastSel = 0;
    jelb = 2;
    fheight = 218;
    lastEditRow = 0;
    exportload = false;
    exportfilename = ny + "年" + yu + PageTitleName + ".xlsx";
    editUrl = "";
    listUrl = "jqgriddata.php?act=cwbytcjetjlist";
    gridgrouping = true;
    gridgroupingView = {
      groupField: ["xm"],
      groupColumnShow: [false],
      groupSummary: [true],
      // groupText : ['<b>{0}日 - {1}条记录 </b>'],
      groupCollapse: false,
      groupOrder: ["asc"],
    };
    mycolModel = [
      { label: "姓名", name: "xm", sortable: false, width: 120 },
      { label: "日", name: "ri", width: 50, sortable: false, align: "center" },
      {
        label: "单位",
        name: "dw",
        width: 50,
        align: "center",
        sortable: false,
      },
      { label: "", name: "jcbz", width: 50, align: "center", sortable: false },
      {
        label: "重量",
        name: "zl",
        width: 100,
        align: "right",
        sortable: false,
        formatter: zlFormat,
        summaryType: "sum",
      },
      {
        label: "提成单价",
        name: "tcdj",
        width: 100,
        align: "right",
        sortable: false,
        formatter: zlFormat,
      },
      {
        label: "提成金额",
        name: "je",
        width: 100,
        align: "right",
        formatter: jeFormat,
        sortable: false,
        summaryType: "sum",
      },
    ];
    var tool = that.getView().down("#QueryToolbarView");
    tool.down("#btnExport").setHidden(!isExportEnable);
    that.control({
      "#btnQuery": { click: that.onBtnQueryClick },
      "#btnHelp": { click: that.onBtnHelpClick },
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
  /*
    onBtnExportClick:function(button,e,options){
        var v = that.getView().getViewModel();
        var ny = v.get('ny');
        var yu = v.get('yu');
        exportfilename=ny+'年'+yu+PageTitleName+".xlsx";
        //grid.jqGrid('exportToCsv');
        grid.jqGrid("exportToCsv",{
          includeLabels : true,
          includeGroupHeader : true,
          includeFooter: true,
          fileName :exportfilename,
          maxlength : 40 
        })
     },*/
  onBtnQueryClick: function (button, e, options) {
    var v = that.getView().getViewModel();
    console.log("v=", v);
    var ckid = v.get("ckid");
    var khid = v.get("khid");
    var ny = v.get("ny");
    var yu = v.get("yu");
    if (khid > 0) {
      gridgroupingView = {
        groupField: ["khmc"],
        groupColumnShow: [false],
        groupSummary: [false],
        // groupText : ['<b>{0}日 - {1}条记录 </b>'],
        groupCollapse: false,
        groupOrder: ["asc"],
      };
    } else {
      gridgroupingView = {
        groupField: ["xm"],
        groupColumnShow: [false],
        groupSummary: [true],
        // groupText : ['<b>{0}日 - {1}条记录 </b>'],
        groupCollapse: false,
        groupOrder: ["asc"],
      };
    }
    exportfilename = ny + "年" + yu + PageTitleName + ".xlsx";
    gridpostData = {
      export: "0",
      jelb: 2,
      loc: "",
      bz: "",
      initArg: 123,
      p_e_code: 1,
      p_l_id: ckid,
      khid: khid,
      ny: ny,
      yu: yu,
    };
    grid
      .jqGrid("setGridParam", {
        postData: gridpostData,
        groupingView: gridgroupingView,
      })
      .trigger("reloadGrid");
  },
  onBtnHelpClick: function (button, e, options) {
    console.log("help");
    jQuery("#" + gridTableName).jqGrid("navGrid", "hideCol", "khmc");
  },
  onGridComplete: function () {
    console.log("onGridComplete");
    if (!setGroupHeaders) {
      setGroupHeaders = true;
      // if (jelb==2){
      jQuery("#" + gridTableName).jqGrid("setGroupHeaders", {
        //useColSpanStyle: false,
        useColSpanStyle: true,
        groupHeaders: [
          {
            startColumnName: "byxjje",
            numberOfColumns: 5,
            titleText: "现收金额",
          },
        ],
      });
      jQuery("#" + gridTableName + "Export").jqGrid("setGroupHeaders", {
        useColSpanStyle: false,
        groupHeaders: [
          {
            startColumnName: "byxjje",
            numberOfColumns: 5,
            titleText: "现收金额",
          },
        ],
      });
    }
    // }
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
