var that;
var khid = 0;
sys_DisplayAll = "";
Ext.define("MyApp.view.main.users.KhUsersCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.KhUsersCtrl",
  requires: ["MyApp.view.main.users.KhUsersView"],
  onBtnQueryClick: function (button, e, options) {
    var v = that.viewname.getViewModel();
    khid = v.get("khid");
    var store = that.viewname.getStore();
    store.proxy.extraParams.khid = khid;
    store.reload();
    var tool = that.viewname.down("#QueryToolbarView");
    tool.down("#btnNew").setDisabled(khid == 0);
    tool.down("#btnDelete").setDisabled(true);
    return false;
  },
  onItemSelected: function (sender, record) {
    var tool = that.viewname.down("#QueryToolbarView");
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function (rs) {
    if (khid > 0)
      that.viewname.getStore().addSorted([{ active: 1, khid: khid }]);
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = that.viewname.getStore();
    var grid = that.viewname;
    return storeBtnDeleteClick(this, grid, store);
  },
  onBtnHelpClick: function (button, e, options) {
    console.log(" help");
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = that.viewname.getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    that.viewname.getStore().rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = that.viewname.getStore();
    return storeBeforeReload(this, store);
  },
  init: function () {
    that = this;
    that.viewname = that.getView();
    var tool = that.viewname.down("#QueryToolbarView");
    tool.down("#btnNew").setHidden(false);
    tool.down("#btnSave").setHidden(false);
    tool.down("#btnDelete").setHidden(false);
    tool.down("#btnUndo").setHidden(false);
    if (sys_customer_id > 0) {
      that.viewname.getViewModel().set("khid", sys_customer_id);
      that.viewname.getViewModel().set("khmc", sys_customer_name);
      that.viewname.down("#QueryKhmc").setHidden(true);
    }
    this.control({
      "#btnQuery": { click: this.onBtnQueryClick },
      "#button1": { click: this.onButtonAddClick },
      "#btnNew": { click: this.onBtnNewClick },
      "#btnSave": { click: this.onBtnSaveClick },
      "#btnQueryKhmc": { click: this.onSelectKhbmView },
      "#btnDelete": { click: this.onBtnDeleteClick },
      "#btnHelp": { click: this.onBtnHelpClick },
      "#btnUndo": { click: this.onBtnUndoClick },
      "#Cancel": { click: this.onBtnCancelClick },
      "#FilterField": { change: this.onFilterChange },
    });
    this.onBtnQueryClick();
    var store = that.viewname.getStore();
    store.on("beforeload", this.onBeforeReload, this);
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("usercode")) ||
        regExp.test(record.get("username"))
      );
    });
  },
});
