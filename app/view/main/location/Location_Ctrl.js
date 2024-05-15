var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var gridgrouping = false;
var gridgroupingView = {};
var sumfooterrow = false;
var gridTableName = "locgridTable";
var gridpostData;
var isEditEnable = true;
var isAddEnable = true;
var isDeleteEnable = true;
var isExportEnable = true;
var isSearchEnable = true;
var gridrowNum = 20;
var gridSortName = "c_id";
var PageTitleName = "客户资料列表";
var lastSel = 0;
var navGridObj;
var paging = true;
var lastEditRow = 0;
var exportload = false;
var exportfilename = PageTitleName + ".xlsx";
var editUrl = "http://localhost:8080/devmlwl/jqgriddata.php?act=customeredit";
var listUrl = "http://localhost:8080/devmlwl/jqgriddata.php?act=customerlist";
var mycolModel;
Ext.define("MyApp.view.main.location.Location_Ctrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.Location_Ctrl",
  requires: ["MyApp.view.main.location.Location_View"],
  onBtnQueryClick: function (button, e, options) {
    return false;
  },
  /*
    onBtnNewClick:function(rs){
        jqGridAddRow(grid);
    },
    onBtnDeleteClick:function(button,e,options){
        jqGridDeleteRow(grid);
    },
    onBtnEditClick:function(button,e,options){
        jqGridEditRow(grid);
     },
    onBtnHelpClick:function(button,e,options){
    },
    
    onBtnExportClick:function(button,e,options){
        jqGridExportToCSV(grid);
        return false
    },
    */
  init: function () {
    that = this;
    that.viewname = that.getView();
    gridTableName = "locgridTable";
    gridpostData;
    isEditEnable = true;
    isAddEnable = true;
    isDeleteEnable = true;
    isExportEnable = true;
    isSearchEnable = true;
    gridrowNum = 20;
    gridSortName = "c_id";
    PageTitleName = "客户资料列表";
    lastSel = 0;
    lastEditRow = 0;
    exportload = false;
    exportfilename = PageTitleName + ".xlsx";
    editUrl = "http://localhost:8080/devmlwl/jqgriddata.php?act=customeredit";
    listUrl = "http://localhost:8080/devmlwl/jqgriddata.php?act=customerlist";
    gridgrouping = false;
    gridgroupingView = {};
    gridpostData = {
      export: "0",
      initArg: 123,
      p_e_code: 1,
    };
    mycolModel = [
      {
        label: "ID",
        name: "Id",
        index: "Id",
        sorttype: "string",
        search: false,
        hidden: true,
      },
      {
        label: "id",
        name: "C_id",
        index: "C_id",
        width: 30,
        sorttype: "string",
        editable: false,
        search: true,
        searchoptions: { sopt: ["eq"] },
      },
      {
        label: "代码",
        name: "C_code",
        index: "C_code",
        width: 80,
        sorttype: "string",
        editable: true,
        searchoptions: { sopt: ["cn", "eq"] },
        recreateFilter: false,
      },
      {
        label: "客户名称",
        name: "C_name",
        index: "C_name",
        width: 200,
        sorttype: "string",
        search: true,
        editable: true,
        editrules: { required: true },
        recreateFilter: true,
        searchoptions: { sopt: ["cn", "eq"] },
      },
      {
        label: "客户简称",
        name: "C_shortname",
        index: "C_shortname",
        width: 100,
        searchoptions: { sopt: ["cn", "eq"] },
        sorttype: "string",
        editable: true,
        editrules: {
          required: true,
          custom: true,
          custom_func: function (value) {
            if (value == "") return [false, "客户简称不能为空值！"];
            return [true, ""];
          },
        },
      },
      {
        label: "地址",
        name: "Address",
        index: "Address",
        width: 300,
        searchoptions: { sopt: ["cn", "eq"] },
        sorttype: "string",
        editable: true,
      },
      {
        label: "联系电话",
        name: "Tel",
        index: "Tel",
        searchoptions: { sopt: ["cn", "eq"] },
        sorttype: "string",
        editable: true,
      },
      {
        label: "移动电话",
        name: "smsphone",
        index: "smsphone",
        searchoptions: { sopt: ["cn", "eq"] },
        sorttype: "string",
        editable: true,
      },
      {
        label: "有效日期",
        name: "Enddate",
        width: 150,
        search: true,
        sorttype: "date",
        searchoptions: {
          sopt: ["eq"],
          dataInit: function (element) {
            $(element).datepicker({ dateFormat: "yy-m-d", showOn: "focus" });
          },
        },
        editable: true,
        edittype: "text",
        editoptions: {
          dataInit: function (element) {
            $(element).datepicker({ dateFormat: "yy-m-d", showOn: "focus" });
          },
        },
      },
      {
        label: "活跃",
        name: "Active",
        index: "Active",
        align: "center",
        width: 60,
        formatter: "checkbox",
        sorttype: "string",
        editable: true,
        edittype: "checkbox",
        editoptions: { value: "1:0" },
        stype: "select",
        searchoptions: { sopt: ["eq"], value: ":;1:Yes;0:No" },
      },
      {
        label: "独立单价",
        name: "Aloneprice",
        index: "Aloneprice",
        width: 60,
        align: "center",
        formatter: "checkbox",
        sorttype: "string",
        editable: true,
        edittype: "checkbox",
        editoptions: { value: "1:0" },
        searchoptions: {
          sopt: ["eq"],
          value: ":;1:Yes;0:No",
          attr: {
            size: 18,
            maxlength: 18,
            style: "width:130px;margin-top:1px;",
          },
        },
        stype: "select",
      },
    ];
    var tool = that.getView().down("#QueryToolbarView");
    tool.down("#btnNew").setHidden(!isAddEnable);
    tool.down("#btnDelete").setHidden(!isDeleteEnable);
    tool.down("#btnEdit").setHidden(!isEditEnable);
    tool.down("#btnExport").setHidden(!isExportEnable);
    tool.down("#btnEdit").setDisabled(!isEditEnable);
    tool.down("#btnDelete").setDisabled(!isDeleteEnable);
    that.control({
      "#btnQuery": { click: that.onBtnQueryClick },
      "#btnEdit": { click: onBtnEditClick },
      "#btnNew": { click: onBtnNewClick },
      "#btnDelete": { click: onBtnDeleteClick },
      "#btnHelp": { click: onBtnHelpClick },
      "#btnExport": { click: onBtnExportClick }, //,
      //"#btnpackingSave": { click: that.onBtnPackingSaveClick } ,
      // "#FilterField":{change:that.onFilterChange}
    });
  },
  /*
    onFilterChange:function(v)    {
        var store=that.getView().getStore();var regExp=new RegExp(".*"+v.rawValue+".*");
        store.clearFilter();
        store.filterBy(function(record,id){
            return regExp.test(record.get("L_name"))||regExp.test(record.get("L_code"))
        })
    },
    
     
    onBtnPackingSaveClick: function() {
        var store = that.lookupReference('packingmxGrid').getStore();
        store.sync({
            success: function (batch, options) {
                var p = that.lookupReference('popuppackingWindow');
                p.close();
            },
            failure: function (batch, options) {
                Ext.Msg.alert('提示信息', '添加失败!');
            },
            scope: that
        });
    }*/
});
