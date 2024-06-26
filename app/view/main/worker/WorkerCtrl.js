﻿var jobsname = "";
Ext.define("MyApp.view.main.worker.WorkerCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.WorkerCtrl",
  requires: ["MyApp.view.main.worker.WorkerView"],
  onBtnQueryClick: function (button, e, options) {
    this.getView().down("#WorkerGridView").getStore().load();
    return false;
  },
  onItemSelected: function (sender, record) {
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function (rs) {
    this.getView()
      .down("#WorkerGridView")
      .getStore()
      .addSorted([{ E_code: sys_enterprise_code }]);
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = this.getView().down("#WorkerGridView").getStore();
    var grid = this.getView().down("#WorkerGridView");
    var rs = grid.getSelectionModel().getSelection();
    store.remove(rs[0]);
    return;
  },
  onBtnHelpClick: function (button, e, options) {
    console.log(" help");
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = this.getView().down("#WorkerGridView").getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    var store = this.getView().down("#WorkerGridView").getStore();
    store.rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = this.getView().down("#WorkerGridView").getStore();
    return storeBeforeReload(this, store);
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("popupWindow");
    win.close();
    return false;
  },
  init: function () {
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnNew").setHidden(false);
    tool.down("#btnSave").setHidden(false);
    tool.down("#btnDelete").setHidden(false);
    tool.down("#btnUndo").setHidden(false);
    this.control({
      "#btnQuery": { click: this.onBtnQueryClick },
      "#button1": { click: this.onButtonAddClick },
      "#btnNew": { click: this.onBtnNewClick },
      "#btnSave": { click: this.onBtnSaveClick },
      "#btnDelete": { click: this.onBtnDeleteClick },
      "#btnHelp": { click: this.onBtnHelpClick },
      "#btnUndo": { click: this.onBtnUndoClick },
      "#Cancel": { click: this.onBtnCancelClick },
      "#FilterField": { change: this.onFilterChange },
      "#LeftTree": { itemclick: this.onTreeSelected },
    });
    var store = this.getView().down("#WorkerGridView").getStore();
    store.on("beforeload", this.onBeforeReload, this);
  },
  onTreeSelected: function (node, event) {
    this.getView().down("#FilterField").reset();
    var store = this.getView().down("#WorkerGridView").getStore();
    store.clearFilter();
    store.proxy.extraParams.Jobs = event.data.id;
    store.proxy.extraParams.Jobsname = event.data.text;
    store.load();
  },
  onFilterChange: function (v) {
    return storeFilter(
      this.getView().down("#WorkerGridView").getStore(),
      "Name",
      v.rawValue
    );
  },
});
