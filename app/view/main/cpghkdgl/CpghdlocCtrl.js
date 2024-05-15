var that;
var ghid;
var cpghdmxStore;
var mfhsaveCallBack = function (th) {
  //th.getView().down("#popupCpghdWindow").close();
  var win = th.lookupReference("popupCpghdWindow");
  win.close();
  that.locQuery(th);
  Ext.MessageBox.alert("提示！", "此过户单内容已作废！");
};
Ext.define("MyApp.view.main.cpghkdgl.CpghdlocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpghdlocCtrl",
  requires: [
    "MyApp.view.main.cpghkdgl.CpghdlocView",
    "MyApp.view.main.showView.CpghkdShowView",
    "MyApp.view.main.report.PrintCpghkd",
  ],
  locQuery: function (that) {
    var v = that.viewname.getViewModel();
    var khid = v.get("khid");
    var ckid = v.get("ckid");
    start_date = v.get("start_date");
    end_date = v.get("end_date");
    var d1 = Ext.Date.format(start_date, "Y-m-d");
    var d2 = Ext.Date.format(end_date, "Y-m-d");
    var bz = v.get("deletebz");
    if (bz) {
      bz = 1;
    } else {
      bz = 0;
    }
    cpghdmxStore.proxy.extraParams.deletebz = bz;
    cpghdmxStore.proxy.extraParams.loc = "cpghdmxloc";
    cpghdmxStore.proxy.extraParams.khid = khid;
    cpghdmxStore.proxy.extraParams.ckid = ckid;
    cpghdmxStore.proxy.extraParams.startdate = d1;
    cpghdmxStore.proxy.extraParams.enddate = d2;
    cpghdmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("popupCpghdWindow");
    win.close();
    return false;
  },
  init: function () {
    //        console.log("init");
    that = this;
    var viewname = that.getView().down("#CpghdListGrid");
    that.viewname = viewname;
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
      //    "#btnCpghdDelete": {
      //       click: this.onCpghdDeleteSubmit
      //  },
      "#btnPrintCpghkd": {
        click: function () {
          PrintCpghkdghid(ghid);
        },
      },
      "#btnQueryCkmc": {
        click: this.onSelectCkbmView,
      },
    });
    var v = viewname.getViewModel();
    v.set("PageTitleName", "商品过户单明细查询");
    v.set("start_date", start_date);
    v.set("end_date", end_date);
    if (sys_location_id > 0) {
      v.set("ckmc", sys_location_name);
      v.set("ckid", sys_location_id);
      viewname.down("#QueryKhmc").setHidden(false);
      viewname.down("#QueryCkmc").setHidden(true);
    }
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
      viewname.down("#QueryKhmc").setHidden(true);
      viewname.down("#QueryCkmc").setHidden(false);
    }
    viewname.down("#QueryDate").setHidden(false);
    that.viewname.down("#deletebz").setHidden(false);
    cpghdmxStore = Ext.create("Ext.data.Store", {
      alias: "store.cpghdmxStore",
      model: "MyApp.model.CpghdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=cpghdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "cpghdmxloc",
          userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
          p_e_code: sys_enterprise_code,
          p_l_id: sys_location_id,
          deletebz: 0,
        },
        reader: {
          type: "json",
          rootProperty: "rows",
        },
      },
    });
    cpghdmxStore.on("load", function () {
      var v = that.viewname.getViewModel();
      var khid = v.get("khid");
      var ckid = v.get("ckid");
      start_date = v.get("start_date");
      end_date = v.get("end_date");
      var d1 = Ext.Date.format(start_date, "Y-m-d");
      var d2 = Ext.Date.format(end_date, "Y-m-d");
      var store = that.viewname.getStore();
      var bz = v.get("deletebz");
      if (bz) {
        bz = 1;
      } else {
        bz = 0;
      }
      store.proxy.extraParams.deletebz = bz;
      store.proxy.extraParams.loc = "cpghdloc";
      store.proxy.extraParams.khid = khid;
      store.proxy.extraParams.ckid = ckid;
      store.proxy.extraParams.startdate = d1;
      store.proxy.extraParams.enddate = d2;
      store.reload();
    });
    this.locQuery(this);
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onSelectCkbmView: function (record) {
    treeSelect("ckmc", that, "", that.viewname, true);
    return false;
  },
  ckmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("C_name")) ||
        regExp.test(record.get("C_code")) ||
        regExp.test(record.get("Py_code")) ||
        regExp.test(record.get("ghdh"))
      );
    });
  },
  onCpghdmxShowView: function (button) {
    var rec = button.getWidgetRecord();
    ghid = rec.data.ghid;
    var record = rec.data;
    record["btnButtonHidden"] = true;
    record["op"] = "loc";
    record["ckop"] = false;
    record["title"] = "商品过户单";
    console.log(record);
    var view = this.getView();
    this.isEdit = false;
    this.dialog = view.add({
      xtype: "cpghkdformwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
    var cpghdmx_store = this.lookupReference("CpghdmxGrid").getStore();
    cpghdmxStore.each(function (rec) {
      if (rec.data.ghid == ghid) {
        cpghdmx_store.add(rec);
      }
    });
    var p = this.lookupReference("popupCpghdWindow");
    if (
      ((sys_location_id > 0 && rec.data.khkd == 0) ||
        (sys_customer_id > 0 && rec.data.khkd == 1)) &&
      rec.data.ztbz > 0
    ) {
      p.down("#btnPrintCpghkd").setHidden(false);
    }
    /*      
        if (sys_system_lastdel) {
            if ((rec.data.ztbz==1)&&(rec.data.fhbz==0) &&(rec.data.delbz==0)) {
            p.down("#btnCpghdDelete").setHidden(false);
          }
         }
         */
  },
  onGridReload: function () {
    var store = this.lookupReference("CpghdmxGrid").getStore();
    var mxid = store.getAt(0).get("mxid");
    var cpghdcw_store = this.lookupReference("cpghdmxcw0").getStore();
    cpghdcw_store.clearFilter();
    cpghdcw_store.filterBy(function (record, id) {
      return record.get("mxid") == mxid;
    });
  },
  onCpghdmxItemSelected: function (sender, record) {
    var cpghdcw_store = this.lookupReference("cpghdmxcw0").getStore();
    var mxid = record.data.mxid;
    cpghdcw_store.clearFilter();
    cpghdcw_store.filterBy(function (record, id) {
      return record.get("mxid") == mxid;
    });
  },
  onCpghdDeleteSubmit: function () {
    var p = this.lookupReference("popupCpghdWindow").getViewModel();
    var ghid = p.get("ghid");
    if (ghid == 0) {
      return;
    }
    //         console.log("p",p);
    var msg = "过户单：" + p.get("ghdh") + "<br>客户名称：" + p.get("khmc");
    var title = "真的作废此过户单内容？";
    Ext.MessageBox.show({
      title: title,
      msg: msg,
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: "确认作废",
        no: "取消",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        // console.log(btn, text);
        if (btn == "yes") {
          var p = that.lookupReference("popupCpghdWindow");
          p.down("#btnCpghdDelete").setHidden(true);
          AjaxDataSave("cpghdshsave", "lastdel", ghid, mfhsaveCallBack, that);
        }
      },
    });
    return;
  },
});
