sys_DisplayAll = "";
var that;
Ext.define("MyApp.view.main.cpckgl.CpcksplocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpcksplocCtrl",
  requires: ["MyApp.view.main.cpckgl.CpcksplocView"],
  locQuery: function (the) {
    var v = the.getView().getViewModel();
    var ckid = v.get("ckid");
    var khid = v.get("khid");
    var cpid = v.get("cpid");
    start_date = v.get("start_date");
    end_date = v.get("end_date");
    var d1 = Ext.Date.format(start_date, "Y-m-d");
    var d2 = Ext.Date.format(end_date, "Y-m-d");
    //  CpcksplocStore.proxy.extraParams.act = 'cpckdlist_pc';
    // CpcksplocStore.proxy.extraParams.loc = 'cpcksploc';
    CpcksplocStore.proxy.extraParams.p_l_id = ckid;
    CpcksplocStore.proxy.extraParams.khid = khid;
    CpcksplocStore.proxy.extraParams.cpid = cpid;
    CpcksplocStore.proxy.extraParams.startdate = d1;
    CpcksplocStore.proxy.extraParams.enddate = d2;
    CpcksplocStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  init: function () {
    that = this;
    that.viewname = that.getView();
    if (sys_customer_id > 0) {
      that.viewname.getViewModel().set("khid", sys_customer_id);
      that.viewname.getViewModel().set("khmc", sys_customer_name);
    }
    if (sys_location_id > 0) {
      that.viewname.getViewModel().set("ckid", sys_location_id);
      that.viewname.getViewModel().set("ckmc", sys_location_name);
    }
    this.control({
      "#btnQuery": {
        click: this.onBtnQueryClick,
      },
      "#btnHelp": {
        click: this.onBtnHelpClick,
      },
      "#FilterField": {
        change: this.onFilterChange,
      },
      "#btnQueryKhmc": {
        click: this.onSelectKhbmView,
      },
      "#btnQueryCpmc": {
        click: this.SelectCpbmView,
      },
      "#btnExport": {
        click: this.onBtnExportClick,
      },
      "#btnQueryCkmc": {
        click: this.SelectCkbmView,
      },
    });
    var v = this.getView().getViewModel();
    v.set("start_date", start_date);
    v.set("end_date", end_date);
    that.viewname.down("#QueryDate").setHidden(false);
    if (sys_customer_id > 0) {
      that.getView().down("#QueryKhmc").setHidden(true);
      that.getView().down("#QueryCkmc").setHidden(false);
    } else {
      that.getView().down("#QueryKhmc").setHidden(false);
      that.getView().down("#QueryCkmc").setHidden(true);
      if (sys_location_id > 0) {
        that.getView().down("#QueryKhmc").setHidden(false);
        that.getView().down("#QueryCkmc").setHidden(true);
      } else {
        that.getView().down("#QueryKhmc").setHidden(true);
        that.getView().down("#QueryCkmc").setHidden(false);
      }
    }
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnExport").setHidden(false);
    this.locQuery(this);
  },
  onBtnExportClick: function (record) {
    var that = this;
    var title = "出仓商品明细账";
    var store = that.getView().getStore();
    var kcarray = store.data.items;
    var sheetarr = [];
    var khmc = "";
    for (var i = 0; i < kcarray.length; i++) {
      var oldobj = kcarray[i].data;
      if (oldobj.khmc != khmc) {
        khmc = oldobj.khmc;
        sheetarr.push({
          //"khid":khid,
          khjc: oldobj.khjc,
          khmc: oldobj.khmc,
        });
      }
    }
    var tableDataarr = [];
    var jsonSheetData = [];
    jsonSheetData = this.getexcelsheetdata(kcarray, title);
    tableDataarr.push({
      sheetName: title,
      data: jsonSheetData,
    });
    var prtData = {
      options: {
        fileName: title,
      },
      tableData: tableDataarr,
    };
    Jhxlsx.export(prtData.tableData, prtData.options);
    return;
  },
  //盘点表
  getexcelsheetdata: function (kcarray, title) {
    var that = this;
    khmc = "";
    var jsonData = [];
    var arr;
    for (var i = 0; i < kcarray.length; i++) {
      var oldobj = kcarray[i].data;
      if (oldobj.khmc != khmc) {
        var sumsl = 0;
        var sumzl = 0;
        if (khmc > "") {
          jsonData.push([]);
          jsonData.push([]);
          jsonData.push([]);
        }
        arr = [
          {
            merge: {
              c: 10,
            },
            style: {
              fill: {
                bgcolor: "red",
              },
              font: {
                size: 36,
                bold: true,
              },
            },
            text: "客户：" + oldobj.khmc,
          },
        ];
        jsonData.push(arr); //增加小标题
        arr = [
          {
            text: "    产地       ",
            style: {
              font: {
                bold: true,
              },
              color: {
                rgb: "FF4F81BD",
              },
            },
          },
          {
            text: "     商品名称     ",
            style: {
              font: {
                bold: true,
              },
              width: 500,
              backgcolor: "blue",
            },
          },
          {
            text: "      包装     ",
            style: {
              font: {
                bold: true,
              },
              width: 400,
            },
          },
          {
            text: "      规格   ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "批号     ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "  单位  ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "库存数量   ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "库存重量    ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "日期    ",
            style: {
              font: {
                bold: true,
              },
            },
          },
          {
            text: "单号     ",
            style: {
              font: {
                bold: true,
              },
            },
          },
        ];
        jsonData.push(arr);
      }
      arr = [];
      //  var oldobj = kcarray[i].data;
      arr.push({ text: oldobj.cdmc });
      arr.push({ text: oldobj.cpmc });
      arr.push({ text: oldobj.bzmc });
      arr.push({ text: oldobj.cpgg });
      arr.push({ text: oldobj.cpph });
      arr.push({ text: oldobj.jldw });
      arr.push({ text: slrenderer(oldobj.sl) });
      arr.push({ text: slrenderer(oldobj.zl) });
      arr.push({ text: Ext.Date.format(oldobj.czrq, "Y-m-d") });
      arr.push({ text: oldobj.dh });
      sumsl += oldobj.sl;
      sumzl += oldobj.zl;
      jsonData.push(arr);
      khmc = oldobj.khmc;
    }
    return jsonData;
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  SelectCkbmView: function (record) {
    treeSelect("ckmc", that, "", that.viewname, true);
    return false;
  },
  ckmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  SelectCpbmView: function (record) {
    treeSelect("cpmc", that, "", that.viewname, true);
    return false;
  },
  cpmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("cdmc")) ||
        regExp.test(record.get("dh")) ||
        regExp.test(record.get("cpmc")) ||
        regExp.test(record.get("cpgg")) ||
        regExp.test(record.get("cpph")) ||
        regExp.test(record.get("khmc"))
      );
    });
  },
});
