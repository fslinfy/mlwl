var p_t_id = 0;
Ext.define("MyApp.view.main.commodityType.CommodityTypeCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CommodityTypeCtrl",
  requires: ["MyApp.view.main.commodityType.CommodityTypeView"],
  onBtnQueryClick: function (button, e, options) {
    this.getView().down("#CommodityTypeGridView").getStore().load();
    return false;
  },
  onSelectionchange: function (model, record) {
    // this.lookupReference('windowForm').getForm.loadRecord(record[0]);
    console.log(1, record);
    // var tool = this.getView().down("#QueryToolbarView");
    //tool.down('#btnEdit').setDisabled(false);
    // tool.down('#btnDelete').setDisabled(false);
    // return false;
  },
  onItemSelected: function (sender, record) {
    console.log(2, record);
    var tool = this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);
    tool.down("#btnDelete").setDisabled(false);
    return false;
  },
  onBtnNewClick: function (rs) {
    //   console.log(p_t_id);
    if (p_t_id > 0) {
      var store = this.getView().down("#CommodityTypeGridView").getStore();
      store.addSorted([{ E_code: sys_enterprise_code, T_id: p_t_id }]);
    }
    return false;
  },
  onBtnDeleteClick: function (button, e, options) {
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    var grid = Ext.getCmp("CommodityTypeGrid");
    return storeBtnDeleteClick(this, grid, store);
  },
  onBtnHelpClick: function (button, e, options) {
    console.log("help");
    return false;
  },
  onBtnSaveClick: function (button, e, options) {
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    return storeBtnSaveClick(this, store);
  },
  onBtnUndoClick: function (button, e, options) {
    this.getView().down("#CommodityTypeGridView").getStore().rejectChanges();
    return false;
  },
  onBeforeReload: function (store, records, options) {
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    return storeBeforeReload(this, store);
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference(
      "MyApp.view.main.commodityType.CommodityTypeEdit"
    );
    //var win = this.lookupReference('TypeEditWindow');
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
      /*,
            "#btnTreeRefresh":{
                click:this.onTreeRefresh
            }*/
    });
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    store.on("beforeload", this.onBeforeReload, this);
  },
  onFilterChange: function (v) {
    // return storeFilter(this.getView().down("#CommodityTypeGridView").getStore(),'CT_name',v.rawValue);
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("CT_name")) || regExp.test(record.get("CT_code"))
      );
    });
  },
  onTreeSelected: function (node, event) {
    this.getView().down("#FilterField").reset();
    var store = this.getView().down("#CommodityTypeGridView").getStore();
    store.clearFilter();
    store.proxy.extraParams.T_id = event.data.id;
    store.load();
  },
  onTreeAddClick: function () {
    this.createDialog({});
  },
  onTreeEditClick: function () {
    var obj = {};
    var panel = this.getView().down("#LeftTree"),
      sm = panel.getSelectionModel(),
      node;
    if (sm.hasSelection()) {
      node = sm.getSelection()[0];
      // console.log("node",node);
      obj["title"] = "编辑大类：" + node.data.text;
      obj["id"] = node.data.id;
      obj["T_code"] = node.data.T_code;
      obj["T_name"] = node.data.text;
      obj["Active"] = node.data.Active;
      this.createDialog(obj);
    }
  },
  createDialog: function (record) {
    //console.log(record);
    var view = this.getView();
    this.isEdit = !!record;
    // console.log(record,this.isEdit);
    this.dialog = view.add({
      xtype: "formwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
  },
  onFormCancel: function (event) {
    this.lookupReference("windowForm").getForm().reset();
    this.lookupReference("popupWindow").hide();
  },
  onFormSubmit: function () {
    var formPanel = this.lookupReference("windowForm"),
      form = formPanel.getForm();
    if (form.isValid()) {
      // In a real application, this would submit the form to the configured url
      // form.submit();
      //console.log(form.getValues());
      //******************************* */
      Ext.Ajax.request({
        method: "POST",
        url: sys_ActionPHP + "?act=save_type_test",
        scope: this,
        params: form.getValues(),
        success: function (response) {
          var result = Ext.decode(response.responseText);
          console.log(result);
          if (result.success) {
            console.log(result.data);
          } else {
            console.log("错误", "数据保存失败！");
          }
        },
        failure: function () {
          console.log("错误", "发生错误！");
        },
      });
      //******************************* */
      /*
                        Ext.Ajax.request({
                            url: sys_ActionPHP + '?act=save_type_test',
                            method: 'POST',
                            //jsonData://指定需要发送给服务器端的JSON数据。如果指定了该属性则其它的地方设置的要发送的参数值将无效。
                            //xmlData://指定用于发送给服务器的xml文档,如果指定了该属性则其它地方设置的参数将无效。
                            params: form.getValues(),//取得key/value对象数组
                            //指定Ajax请求的回调函数，该函数不管是调用成功或失败，都会执行。
                            callback: function (options, success, response) {
            
                                if (success) {
                                    var result = response.responseText;
                                        //console.log(result);
                                    if (result.success) {
                                        console.log(result.data.msg);
                                    }
                                    else {
                                        console.log("save fail! "+result.data.msg);
                                    }
            
                                }
                            }
                        });
            
            */
      form.reset();
      this.lookupReference("popupWindow").hide();
      /*Ext.MessageBox.alert(
                'Thank you!',
                'Your inquiry has been sent. We will respond as soon as possible.'
            );*/
    }
  },
  /*
onTreeRefresh:function(node,event)
    {  // console.log("tree1");
        //this.getView().down("#LeftTree").loader();
        var store=this.getView().down("#LeftTree").getStore();
       //  console.log("tree2");
        
        store.reload();
       //  console.log("tree3");
}*/
});
