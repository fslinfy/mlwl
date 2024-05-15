sys_DisplayAll = "";
var that;
Ext.define("MyApp.view.main.cwgl.CpdaykclocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpdaykclocCtrl",
  requires: ["MyApp.view.main.cwgl.CpdaykclocView"],
  locQuery: function (the) {
    var v = the.getView().getViewModel();
    var khid = v.get("khid");
    var rq = v.get("start_date");
    var ny = rq.getFullYear();
    var yu = rq.getMonth() + 1;
    var ri = rq.getDate();
    CpdaykcmxStore.proxy.extraParams.ckid = sys_location_id;
    CpdaykcmxStore.proxy.extraParams.khid = khid;
    CpdaykcmxStore.proxy.extraParams.enddate = Ext.Date.format(rq, "Y-m-d"); //;; Ext.decode(Ext.encode(v.get('start_date')));
    CpdaykcmxStore.proxy.extraParams.ny = ny;
    CpdaykcmxStore.proxy.extraParams.yu = yu;
    CpdaykcmxStore.proxy.extraParams.ri = ri;
    CpdaykcmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  init: function () {
    console.log("day=", new Date().getDay(), new Date().getDate());
    that = this;
    that.viewname = that.getView();
    if (sys_customer_id > 0) {
      that.viewname.getViewModel().set("khid", sys_customer_id);
      that.viewname.getViewModel().set("khmc", sys_customer_name);
    }
    // if (sys_location_id > 0) {
    //    that.viewname.getViewModel().set('ckid', sys_location_id);
    //    that.viewname.getViewModel().set('ckmc', sys_location_name);
    // }
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
    console.log("ri", Ext.Date.getDaysInMonth(new Date()));
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
