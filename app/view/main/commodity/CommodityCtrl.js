﻿var p_ct_id = 0;
var that;
Ext.define("MyApp.view.main.commodity.CommodityCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CommodityCtrl",
  requires: ["MyApp.view.main.commodity.CommodityView"],
  onBtnQueryClick: function (button, e, options) {
    //   this.getView().down("#CommodityGridView").getStore().load();
    console.log("onBtnQueryClick");
    var v = that.viewname.getViewModel();
    var active = v.get("active");
    if (active) {
      active = 1;
    } else {
      active = 0;
    }
    console.log("active", active);
    var store = that.getView().down("#CommodityGridView").getStore();
    store.proxy.extraParams.active = active;
    store.load();
    return false;
  },
  onItemSelected: function (sender, record) {
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function () {
    console.log(p_ct_id);
    if (p_ct_id > 0) {
      var store = this.getView().down("#CommodityGridView").getStore();
      store.addSorted([{ E_code: sys_enterprise_code, CT_id: p_ct_id }]);
    }
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = this.getView().down("#CommodityGridView").getStore();
    var grid = this.getView().down("#CommodityGridView");
    return storeBtnDeleteClick(this, grid, store);
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = this.getView().down("#CommodityGridView").getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    var store = this.getView().down("#CommodityGridView").getStore();
    store.rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = this.getView().down("#CommodityGridView").getStore();
    return storeBeforeReload(this, store);
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("popupWindow");
    win.close();
    return false;
  },
  init: function () {
    that = this;
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
    that.viewname = that.getView().down("#CommodityGridView");
    var store = this.getView().down("#CommodityGridView").getStore();
    store.proxy.extraParams.active = 1;
    store.on("beforeload", this.onBeforeReload, this);
  },
  onFilterChange: function (v) {
    var store = this.getView().down("#CommodityGridView").getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("S_name")) ||
        regExp.test(record.get("S_code")) ||
        regExp.test(record.get("CT_name"))
      );
    });
  },
  onTreeSelected: function (node, event) {
    this.getView().down("#FilterField").reset();
    var tool = this.getView().down("#QueryToolbarView");
    var store = this.getView().down("#CommodityGridView").getStore();
    store.clearFilter();
    p_ct_id = event.data.id;
    var v = that.viewname.getViewModel();
    var active = v.get("active");
    if (active) {
      active = 1;
    } else {
      active = 0;
    }
    if (event.data.root) {
      store.proxy.extraParams.T_id = 0;
      store.proxy.extraParams.CT_id = 0;
      tool.down("#btnNew").setDisabled(true);
    } else if (event.data.pid == 0) {
      store.proxy.extraParams.T_id = event.data.T_id;
      store.proxy.extraParams.CT_id = 0;
      tool.down("#btnNew").setDisabled(true);
    } else {
      store.proxy.extraParams.CT_id = event.data.CT_id;
      store.proxy.extraParams.T_id = 0;
      tool.down("#btnNew").setDisabled(false);
    }
    store.proxy.extraParams.active = active;
    store.load();
  },
  onTreeAddClick: function () {
    var obj = {};
    var panel = this.getView().down("#LeftTree"),
      sm = panel.getSelectionModel(),
      node;
    if (sm.hasSelection()) {
      node = sm.getSelection()[0];
      obj["Active"] = true;
      obj["hiddenactive"] = true;
      obj["pid"] = 0;
      if (node.data.root) {
        obj["title"] = "\u589e\u52a0\u5927\u7c7b";
        obj["table"] = "type";
      } else if (node.data.pid == 0) {
        obj["T_id"] = node.data.T_id;
        obj["pid"] = node.data.T_id;
        obj["title"] = "\u589e\u52a0\u5c0f\u7c7b";
        obj["table"] = "commoditytype";
      }
      obj["id"] = 0;
      obj["name"] = "";
      this.createDialog(obj);
    }
  },
  onTreeEditClick: function () {
    var obj = {};
    var panel = this.getView().down("#LeftTree"),
      sm = panel.getSelectionModel(),
      node;
    if (sm.hasSelection()) {
      node = sm.getSelection()[0];
      obj["id"] = node.data.id;
      obj["code"] = node.data.code;
      obj["name"] = node.data.name;
      obj["Active"] = node.data.Active;
      if (node.data.root) obj = {};
      else if (node.data.pid == 0) {
        obj["id"] = node.data.T_id;
        obj["pid"] = 0;
        obj["table"] = "type";
        obj["title"] = "\u7f16\u8f91\u5927\u7c7b\uff1a" + node.data.text;
        obj["leaf"] = node.data.leaf;
      } else {
        obj["id"] = node.data.id;
        obj["table"] = "commoditytype";
        obj["leaf"] = true;
        obj["pid"] = node.data.pid;
        obj["title"] = "\u7f16\u8f91\u5c0f\u7c7b\uff1a" + node.data.text;
      }
      obj["hiddenactive"] = false;
      this.createDialog(obj);
    }
  },
  createDialog: function (record) {
    var view = this.getView();
    this.isEdit = !!record;
    this.dialog = view.add({
      xtype: "formtypewindow",
      viewModel: { data: record },
      session: true,
    });
    this.dialog.show();
    if (record.id == 0) {
      this.lookupReference("Activecheckbox").setDisabled(true);
      this.lookupReference("btnDeleteButton").setDisabled(true);
    } else {
      this.lookupReference("Activecheckbox").setDisabled(false);
      if (record.pid == 0)
        if (record.leaf == false)
          this.lookupReference("btnDeleteButton").setDisabled(true);
    }
  },
  onFormCancel: function (event) {
    this.lookupReference("windowForm").getForm().reset();
    this.lookupReference("popupWindow").hide();
  },
  dataSave: function (obj) {
    Ext.Ajax.request({
      method: "POST",
      url: sys_ActionPHP + "?act\x3dcommoditytypeupdate",
      scope: this,
      params: obj,
      success: function (response) {
        var result = Ext.decode(response.responseText);
        if (result.success)
          this.getView().down("#LeftTree").getStore().reload();
        else
          console.log(
            "\u9519\u8bef",
            "\u6570\u636e\u4fdd\u5b58\u5931\u8d25\uff01"
          );
      },
      failure: function () {
        console.log("\u9519\u8bef", "\u53d1\u751f\u9519\u8bef\uff01");
      },
    });
  },
  onFormDelete: function () {
    var formPanel = this.lookupReference("windowForm"),
      form = formPanel.getForm();
    var record = form.getValues();
    var obj = {};
    obj["update"] = "delete";
    obj["id"] = record["id"];
    obj["table"] = record["table"];
    this.dataSave(obj);
    form.reset();
    this.lookupReference("popupWindow").hide();
  },
  onFormSubmit: function () {
    var formPanel = this.lookupReference("windowForm"),
      form = formPanel.getForm();
    if (form.isValid()) {
      var record = form.getValues();
      record["E_code"] = sys_enterprise_code;
      var obj = record;
      obj["id"] = record["id"];
      obj["table"] = record["table"];
      obj["update"] = "";
      console.log(obj);
      this.dataSave(obj);
      form.reset();
      this.lookupReference("popupWindow").hide();
    }
  },
});
