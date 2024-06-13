Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdCtrlFunction", {
  extend: "Ext.Mixin",
});
function SelectWorkerView(button) {
  var rec = button.getWidgetRecord();
  if (rec.data.jeid == 0) {
    return;
  }
  that.recordID = rec;
  var view = that.getView();
  that.dialog = view.add({
    xtype: "selectWorkerWindow",
    session: true,
  });
  that.dialog.show();
}
function cpgfWorkerSelectOkClick(the) {
  var records = that.getView().down("#selectWorkerTreePanel").getChecked();
  var names = [];
  var by = [];
  var gs = [];
  var cg = [];
  Ext.Array.each(records, function (rec) {
    names.push(rec.get("text"));
    switch (rec.get("pname")) {
      case "机械":
        gs.push(rec.get("text"));
        break;
      case "搬运":
        by.push(rec.get("text"));
        break;
      default:
        cg.push(rec.get("text"));
        break;
    }
  });
  records = that.getView().down("#selectWorkerTreePanel1").getChecked();
  Ext.Array.each(records, function (rec) {
    // names.push(rec.get('text'));
    switch (rec.get("pname")) {
      case "机械":
        gs.push(rec.get("text"));
        break;
      case "搬运":
        by.push(rec.get("text"));
        break;
      default:
        cg.push(rec.get("text"));
        break;
    }
  });
  records = that.getView().down("#selectWorkerTreePanel2").getChecked();
  Ext.Array.each(records, function (rec) {
    // names.push(rec.get('text'));
    switch (rec.get("pname")) {
      case "机械":
        gs.push(rec.get("text"));
        break;
      case "搬运":
        by.push(rec.get("text"));
        break;
      default:
        cg.push(rec.get("text"));
        break;
    }
  });
  that.getView().down("#selectWorkerWindow").close();
  var cpgfd = {};
  var arrayjemx = [];
  var jemx = {};
  jemx["byg"] = by.join(";");
  jemx["gs"] = gs.join(";");
  jemx["cg"] = cg.join(";");
  jemx["jeid"] = that.recordID.data.jeid;
  arrayjemx.push(jemx);
  cpgfd["cpgfdje"] = arrayjemx;
  var str = obj2str(cpgfd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpgfdjesave",
      loc: "workersave",
      data: encodedString,
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      jeid: that.recordID.data.jeid,
    },
    scope: this,
    success: function (response) {
      var result = Ext.decode(response.responseText);
      if (result.result == "success") {
        var store = the.lookupReference("CpgfdmxGrid").getStore();
        store.reload();
        Ext.MessageBox.alert("提示", "作业人员已保存!");
      } else {
        Ext.MessageBox.alert("错误!", result.msg);
      }
    },
    failure: function () {
      Ext.MessageBox.alert("错误!", "发生错误！");
    },
  });
}
function SelectKhbmView(record) {
  treeSelect("khmc", that, "", that.viewname, true);
  return false;
}
function SelectCkbmView(record) {
  treeSelect("ckmc", that, "", that.viewname, true);
  return false;
}
function onCpgfdmxShEdit(button) {
  var rec = button.getWidgetRecord();
  var gfid = rec.data.gfid;
  var record = rec.data;
  //console.log(record);
  record["op"] = "cksh";
  record["gsop"] = false;
  record["w"] = 40;
  record["btnButtonHidden"] = false;
  record["title"] = "商品过车数据补录入";
  var view = this.getView();
  this.isEdit = false; // !!record;
  this.dialog = view.add({
    xtype: "gfdformmxwindow",
    viewModel: {
      data: record,
    },
    session: true,
  });
  this.dialog.show();
  /*var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
    cpgfdmx_store.proxy.extraParams.gfid = gfid;
    cpgfdmx_store.load();        
    
    var cpgfdcw_store = this.lookupReference('cpgfdmxcw0').getStore();
    cpgfdcw_store.proxy.extraParams.gfid = gfid;
    cpgfdcw_store.proxy.extraParams.loc = 'gfid';
    cpgfdcw_store.load();
    
    this.onGridReload();
    */
}
function onPrintwxCpgfd() {
  var p = that.lookupReference("popupCpgfdWindow").getViewModel();
  if (p.get("ztbz") < "2") {
    ////console.log('ztbz',p.get('ztbz'),p);
    Ext.MessageBox.alert("注意！", "此过车内容未进行过车业务审核，不能打印！");
    return;
  }
  PrintCpgfdgfid(p.get("gfid"));
  //Printcpgfdgfid
  //PrintCpgfdgfid(4);
}
