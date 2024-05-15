sys_DisplayAll = "";
var that;
Ext.define("MyApp.view.main.cwgl.CpjcttlocCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpjcttlocCtrl",
  requires: ["MyApp.view.main.cwgl.CpjcttlocView"],
  locQuery: function (the) {
    var v = the.getView().getViewModel();
    console.log("area", v.get("area"));
    //  var ckid = v.get('ckid');
    var khid = v.get("khid");
    var jclb = ""; // v.get('jclb');
    var yu = v.get("yu");
    var ny = v.get("ny");
    var ri = v.get("ri");
    var khbz = 0;
    if (v.get("khsum")) khbz = 1;
    var cpbz = 0;
    if (v.get("cpsum")) cpbz = 1;
    CpjcttmxStore.proxy.extraParams.ckid = sys_location_id;
    CpjcttmxStore.proxy.extraParams.khid = khid;
    CpjcttmxStore.proxy.extraParams.jclb = jclb;
    CpjcttmxStore.proxy.extraParams.khbz = khbz;
    CpjcttmxStore.proxy.extraParams.cpbz = cpbz;
    CpjcttmxStore.proxy.extraParams.area = v.get("area");
    CpjcttmxStore.proxy.extraParams.ny = ny;
    CpjcttmxStore.proxy.extraParams.yu = yu;
    CpjcttmxStore.proxy.extraParams.ri = ri;
    CpjcttmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  init: function () {
    console.log(sys_location_areas);
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
