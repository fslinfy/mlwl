﻿Ext.define("MyApp.view.main.enterprise.EnterpriseCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.EnterpriseCtrl",
  requires: ["MyApp.view.main.enterprise.EnterpriseView"],
  onBtnQueryClick: function (button, e, options) {
    this.getView().getStore().load();
    return false;
  },
  onItemSelected: function (sender, record) {
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function (rs) {
    this.getView().getStore().addSorted([{}]);
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = this.getView().getStore();
    var grid = Ext.getCmp("EnterpriseGrid");
    return storeBtnDeleteClick(this, grid, store);
  },
  onBtnHelpClick: function (button, e, options) {
    console.log("help");
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = this.getView().getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    this.getView().getStore().rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = this.getView().getStore();
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
    });
    var store = this.getView().getStore();
    store.on("beforeload", this.onBeforeReload, this);
  },
  onFilterChange: function (v) {
    var store = this.getView().getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("E_name")) || regExp.test(record.get("E_code"))
      );
    });
  },
});
