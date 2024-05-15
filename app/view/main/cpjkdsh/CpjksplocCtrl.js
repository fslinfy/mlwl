var PageTitleName = "进仓商品明细帐";
sys_DisplayAll = "";
var that;
Ext.define("MyApp.view.main.cpjkdsh.CpjksplocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpjksplocCtrl",
  requires: ["MyApp.view.main.cpjkdsh.CpjksplocView"],
  locQuery: function (the) {
    var v = the.getView().getViewModel();
    var ckid = v.get("ckid");
    var khid = v.get("khid");
    var cpid = v.get("cpid");
    start_date = v.get("start_date");
    end_date = v.get("end_date");
    var d1 = Ext.Date.format(start_date, "Y-m-d");
    var d2 = Ext.Date.format(end_date, "Y-m-d");
    //  CpjksplocStore.proxy.extraParams.act = 'cpjkdlist_pc';
    // CpjksplocStore.proxy.extraParams.loc = 'cpjksploc';
    CpjksplocStore.proxy.extraParams.p_l_id = ckid;
    CpjksplocStore.proxy.extraParams.khid = khid;
    CpjksplocStore.proxy.extraParams.cpid = cpid;
    CpjksplocStore.proxy.extraParams.startdate = d1;
    CpjksplocStore.proxy.extraParams.enddate = d2;
    CpjksplocStore.reload();
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
      "#btnQueryCkmc": {
        click: this.SelectCkbmView,
      },
    });
    var v = this.getView().getViewModel();
    v.set("start_date", start_date);
    v.set("end_date", end_date);
    that.viewname.down("#QueryDate").setHidden(false);
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
