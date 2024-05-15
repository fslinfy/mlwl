var that;
var typeid = 0;
Ext.define("MyApp.view.main.users.UsersCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.UsersCtrl",
  requires: [
    "MyApp.view.main.users.UsersView",
    "MyApp.view.main.tree.CkmcSelectTree",
  ],
  onBtnQueryClick: function (button, e, options) {
    this.getView().down("#UsersGridView").getStore().load();
    return false;
  },
  onSelectionchange: function (model, record) {
    //  console.log(1, record);
  },
  onItemSelected: function (sender, record) {
    // console.log(2, record);
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function (rs) {
    if (typeid > 0) {
      var store = this.getView().down("#UsersGridView").getStore();
      store.addSorted([{ L_id: sys_location_id, typeid: typeid }]);
    }
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = this.getView().down("#UsersGridView").getStore();
    var grid = this.getView().down("#UsersGridView"); // Ext.getCmp('UsersGrid');
    return storeBtnDeleteClick(this, grid, store);
  },
  onBtnHelpClick: function (button, e, options) {
    //  console.log("help")
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = this.getView().down("#UsersGridView").getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    this.getView().down("#UsersGridView").getStore().rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = this.getView().down("#UsersGridView").getStore();
    return storeBeforeReload(this, store);
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("MyApp.view.main.users.UsersEdit");
    //var win = this.lookupReference('TypeEditWindow');
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
    tool.down("#btnNew").setDisabled(true);
    tool.down("#btnDelete").setDisabled(true);
    this.control({
      "#btnQuery": {
        click: this.onBtnQueryClick,
      },
      "#button1": {
        click: this.onButtonAddClick,
      },
      "#btnNew": {
        click: this.onBtnNewClick,
      },
      "#btnSave": {
        click: this.onBtnSaveClick,
      },
      "#btnDelete": {
        click: this.onBtnDeleteClick,
      },
      "#btnHelp": {
        click: this.onBtnHelpClick,
      },
      "#btnUndo": {
        click: this.onBtnUndoClick,
      },
      "#Cancel": {
        click: this.onBtnCancelClick,
      },
      "#FilterField": {
        change: this.onFilterChange,
      },
      "#LeftTree": {
        itemclick: this.onTreeSelected,
      },
      "#btnCkmcTreeAdd": {
        click: this.onCkmcSelectOkClick,
      },
    });
    var store = this.getView().down("#UsersGridView").getStore();
    store.on("beforeload", this.onBeforeReload, this);
  },
  onFilterChange: function (v) {
    // return storeFilter(this.getView().down("#UsersGridView").getStore(),'CT_name',v.rawValue);
    var store = this.getView().down("#UsersGridView").getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("username")) ||
        regExp.test(record.get("usercode"))
      );
    });
  },
  onCkmcSelectOkClick: function (b) {
    // console.log("sssssssssssss  ckstr,names");
    var records = that.getView().down("#selectCkmcTreePanel").getChecked();
    var names = [];
    var ckstr = [];
    Ext.Array.each(records, function (rec) {
      names.push(rec.get("text"));
      ckstr.push(rec.get("id"));
    });
    // console.log(ckstr, names)
    var selection = that.recordID;
    if (selection != undefined) {
      var str = "," + ckstr.join(",") + ",";
      if (str == ",,") str = "";
      selection.set("lidstring", str);
      that.getView().down("#selectCkmcWindow").close();
    }
  },
  onSelectckmcView: function (button) {
    var rec = button.getWidgetRecord();
    // console.log(rec.data.lidstring)
    var record = [];
    record["lidstring"] = rec.data.lidstring;
    that.recordID = rec;
    that.checkedidstring = rec.data.lidstring;
    var view = that.getView();
    that.dialog = view.add({
      xtype: "selectCkmcWindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    that.dialog.show();
  },
  onTreeSelected: function (node, event) {
    this.getView().down("#FilterField").reset();
    var store = this.getView().down("#UsersGridView").getStore();
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnDelete").setDisabled(true);
    typeid = event.data.id;
    store.clearFilter();
    if (event.data.root) {
      store.proxy.extraParams.typeid = 0;
      tool.down("#btnNew").setDisabled(true);
    } else {
      store.proxy.extraParams.typeid = typeid;
      tool.down("#btnNew").setDisabled(false);
    }
    store.load();
  },
  onTreeAddClick: function () {
    var obj = {};
    obj["title"] = "新增分类";
    obj["id"] = 0;
    obj["E_code"] = sys_enterprise_code;
    obj["typename"] = "";
    obj["new"] = 1;
    obj["edit"] = 1;
    obj["del"] = 1;
    obj["sh"] = 0;
    obj["menustring"] = "";
    obj["wxmenustring"] = "";
    obj["cwsh"] = 0;
    this.createDialog(obj);
  },
  onTreeEditClick: function () {
    var obj = {};
    var panel = this.getView().down("#LeftTree"),
      sm = panel.getSelectionModel(),
      node;
    if (sm.hasSelection()) {
      node = sm.getSelection()[0];
      // console.log("node",node);
      if (node.data.id > 0) {
        obj["title"] = "编辑分类：" + node.data.text;
        obj["id"] = node.data.id;
        obj["code"] = node.data.code;
        obj["typename"] = node.data.text;
        obj["new"] = node.data.new;
        obj["edit"] = node.data.edit;
        obj["del"] = node.data.del;
        obj["sh"] = node.data.sh;
        obj["menustring"] = node.data.menustring;
        obj["wxmenustring"] = node.data.wxmenustring;
        obj["cwsh"] = node.data.cwsh;
        //obj["system"] = node.data.system;
        this.createDialog(obj);
      }
    }
  },
  createDialog: function (record) {
    //  console.log(record);
    var view = this.getView();
    this.isEdit = !!record;
    // console.log(record,this.isEdit);
    this.dialog = view.add({
      xtype: "usertypeformwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
  },
  onFormCancel: function (event) {
    this.lookupReference("windowForm").getForm().reset();
    this.lookupReference("popupWindow").close();
  },
  onFormSubmit: function () {
    var records = that.getView().down("#selectWorkerTreePanel").getChecked();
    var names = [];
    var ids = [];
    Ext.Array.each(records, function (rec) {
      //// if (rec.get('leaf')){
      names.push(rec.get("text"));
      ids.push(rec.get("id"));
      //  }
    });
    var p = that.lookupReference("popupWindow").getViewModel();
    var str = "";
    if (ids.length > 0) {
      str = ";" + ids.join(";") + ";";
    }
    p.set("menustring", str);
    records = that.getView().down("#selectWorkerTreePanel1").getChecked();
    //console.log(records);
    names = [];
    ids = [];
    Ext.Array.each(records, function (rec) {
      names.push(rec.get("text"));
      ids.push(rec.get("id"));
    });
    var str1 = "";
    if (ids.length > 0) {
      str1 = "|" + ids.join("|") + "|";
    }
    p.set("wxmenustring", str1);
    //console.log('str',str);
    //console.log('str1',str1);
    var formPanel = this.lookupReference("windowForm"),
      form = formPanel.getForm();
    // console.log(form.getValues()) ;
    if (form.isValid()) {
      Ext.Ajax.request({
        method: "POST",
        url:
          sys_ActionPHP +
          "?act=usertypeupdate&menustring=" +
          str +
          "&wxmenustring=" +
          str1,
        scope: this,
        params: form.getValues(),
        success: function (response) {
          var result = Ext.decode(response.responseText);
          // console.log(result);
          if (result.success) {
            //  console.log(result.data);
            that.getView().down("#LeftTree").getStore().reload();
          } else {
            console.log("错误", result.msg);
          }
        },
        failure: function () {
          console.log("错误", "发生错误！");
        },
      });
      // form.reset();
      this.lookupReference("popupWindow").close();
      //this.getView().down("#LeftTree").getStore().reload();
    }
  },
});
