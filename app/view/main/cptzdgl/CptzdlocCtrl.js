var that;
var cptzdmxStore;
var tzlocsaveCallBack = function (th) {
  that.getView().down("#cptzdshowview").close();
  that.locQuery(th);
};
Ext.define("MyApp.view.main.cptzdgl.CptzdlocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CptzdlocCtrl",
  requires: ["MyApp.view.main.cptzdgl.CptzdlocView"],
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
    cptzdmxStore.proxy.extraParams.deletebz = bz;
    cptzdmxStore.proxy.extraParams.khid = khid;
    cptzdmxStore.proxy.extraParams.ckid = ckid;
    cptzdmxStore.proxy.extraParams.startdate = d1;
    cptzdmxStore.proxy.extraParams.enddate = d2;
    cptzdmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    //  console.log(" help", changes)
    return false;
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("popupCptzdWindow");
    win.close();
    return false;
  },
  init: function () {
    that = this;
    that.viewname = that.getView().down("#CptzdListGrid");
    this.control({
      "#btnQuery": {
        click: this.onBtnQueryClick,
      },
      "#btnHelp": {
        click: this.onBtnHelpClick,
      },
      "#btnPrintCptzd": {
        click: function () {
          onPrintCptzd();
        },
      },
      "#FilterField": {
        change: this.onFilterChange,
      },
      "#btnQueryKhmc": {
        click: this.onSelectKhbmView,
      },
      "#btnCptzdmxShowView": {
        click: this.onCptzdlocShowView,
      },
      "#btnCptzdCancel": {
        click: this.onCptzdlocCancel,
      },
    });
    var v = that.viewname.getViewModel();
    v.set("start_date", start_date);
    v.set("end_date", end_date);
    if (sys_location_id > 0) {
      v.set("ckmc", sys_location_name);
      v.set("ckid", sys_location_id);
    }
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
    }
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
    that.viewname.down("#QueryDate").setHidden(false);
    that.viewname.down("#deletebz").setHidden(false);
    cptzdmxStore = Ext.create("Ext.data.Store", {
      //   extend: 'Ext.data.Store',
      alias: "store.cptzdmxStore",
      model: "MyApp.model.CptzdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=cptzdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "cptzdmxloc",
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
    cptzdmxStore.on("load", function () {
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
      store.proxy.extraParams.loc = "cptzdloc";
      store.proxy.extraParams.khid = khid;
      store.proxy.extraParams.ckid = ckid;
      store.proxy.extraParams.startdate = d1;
      store.proxy.extraParams.enddate = d2;
      store.reload();
    });
    that.listmxstore = cptzdmxStore;
    that.liststore = that.viewname.getStore();
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
    //return storeFilter(this.getView().getStore(),'C_name',v.rawValue);
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return regExp.test(record.get("khmc")) || regExp.test(record.get("tzdh"));
    });
  },
  onCptzdlocShowView: function (button) {
    var rec = button.getWidgetRecord();
    var tzid = rec.data.tzid;
    var record = rec.data;
    //console.log(record);
    record["w"] = 0;
    record["btnButtonHidden"] = true;
    record["title"] = "商品调账单";
    var view = this.getView();
    this.isEdit = false; // !!record;
    this.dialog = view.add({
      xtype: "formcptzdwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
    var cptzdmx_store = this.lookupReference("cptzdmxShowGrid").getStore();
    // cptzdmxStore.each(function (rec) {
    //     if (rec.data.tzid == tzid) {
    //         cptzdmx_store.add(rec);
    //     }
    // })
    var cptzdmx_store = this.lookupReference("cptzdmxShowGrid").getStore();
    cptzdmx_store.proxy.extraParams.loc = "cptzdmxloc";
    cptzdmx_store.proxy.extraParams.tzid = tzid;
    cptzdmx_store.load();
    if (sys_system_lastdel > 0) {
      var p = that.lookupReference("popupmxShowWindow");
      p.down("#btnCptzdCancel").setHidden(false);
    }
  },
  onCptzdlocCancel: function () {
    var the = this;
    var p = the.lookupReference("popupmxShowWindow").getViewModel();
    var tzid = p.get("tzid");
    if (tzid == 0) {
      return;
    }
    var msg = "调账库单号：" + p.get("tzdh") + "<br>客户名称：" + p.get("khmc");
    var title = "真的取消此调账单审核内容？";
    Ext.MessageBox.show({
      title: title,
      msg: msg,
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: "财务审核取消",
        no: "关 闭",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        if (btn == "yes") {
          that
            .lookupReference("popupmxShowWindow")
            .down("#btnCptzdCancel")
            .setDisabled(true);
          //console.log(tzid,msg);
          AjaxDataSave("cptzdcwshsave", "cancel", tzid, tzlocsaveCallBack, the);
        }
      },
    });
  },
});
