var gfid = 0;
var that;
var khmcCallBack = function (node) {
  that.popupmx.getViewModel().set("khid", node.data.id);
  that.popupmx.getViewModel().set("khmc", node.data.text);
};
var cdmcCallBack = function (node) {
  //console.log('node');
  //console.log(node.data.text);
  var customerGrid = that.lookupReference("CpgfdmxGrid");
  var selection = customerGrid.getSelectionModel().getSelection()[0];
  selection.set("cdmc", node.data.text);
};
var bzmcCallBack = function (node) {
  console.log("node", node);
  //console.log(node.data.bydj);
  var customerGrid = that.lookupReference("CpgfdmxGrid");
  var selection = customerGrid.getSelectionModel().getSelection()[0];
  selection.set("bzmc", node.data.text);
  selection.set("dj", node.data.bydj);
  selection.set("rate", node.data.rate);
};
var cpmcCallBack = function (node) {
  //  console.log(node.data);
  var customerGrid = that.lookupReference("CpgfdmxGrid");
  var selection = customerGrid.getSelectionModel().getSelection()[0];
  selection.set("xmmc", node.data.text);
};
var gfdDeleteCallBack = function (th) {
  var p = th.lookupReference("gfdpopupWindow");
  p.close();
  th.locQuery();
  Ext.MessageBox.alert("提示！", "此过货单内容已作废！");
};
var addCpmcCallBack = function (node) {
  var rec = node.data;
  var p = that.popupmx;
  var cpgfdmx = that.lookupReference("CpgfdmxGrid").getStore();
  cpgfdmx.add({
    xmmc: rec.text,
    jldw: "吨",
    sl: 0,
    zl: 0,
    je: 0,
    dj: 0,
    byg: "",
    cg: "",
    gs: "",
  });
};
var gfdshsaveCallBack = function (th) {
  var p = th.lookupReference("popupCpgfdWindow");
  var mgfid = p.getViewModel().get("gfid");
  if (that.loc == "ok") {
    Ext.MessageBox.show({
      title: "提示",
      msg: "打印商品进仓单",
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: "确认打印",
        no: "放  弃",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        if (btn == "yes") {
          PrintCpgfdgfid(p.get("gfid"));
        }
        p.close();
        that.locQuery();
      },
    });
  } else {
    p.close();
    that.locQuery();
  }
};
var cpgfdmxStore0;
Ext.define("MyApp.view.main.cpgfgl.CpgfdshCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpgfdshCtrl",
  requires: [
    "MyApp.view.main.cpgfgl.CpgfdshView",
    "MyApp.view.main.cpgfgl.CpgfdEdit",
    "MyApp.view.main.tree.WorkerSelectTree",
    "MyApp.view.main.report.PrintCpgfd",
  ],
  locQuery: function (the) {
    var v = that.viewname.getViewModel();
    var khid = v.get("khid");
    cpgfdmxStore0.proxy.extraParams.loc = "cpgfdmxsh";
    cpgfdmxStore0.proxy.extraParams.khid = khid;
    cpgfdmxStore0.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(that);
    return false;
  },
  init: function () {
    that = this;
    that.viewname = that.getView().down("#CpgfdListGrid");
    var v = that.viewname.getViewModel();
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
    }
    cpgfdmxStore0 = Ext.create("Ext.data.Store", {
      alias: "store.cpgfdmxStore0",
      model: "MyApp.model.CpgfdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=Cpgfdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "cpgfdmxsh",
          userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
          p_e_code: sys_enterprise_code,
          gfid: 0,
          p_l_id: sys_location_id,
        },
        reader: {
          type: "json",
          rootProperty: "rows",
        },
      },
    });
    cpgfdmxStore0.on("load", function () {
      var v = that.viewname.getViewModel();
      var khid = v.get("khid");
      // var ckid = v.get('ckid');
      var store = that.viewname.getStore();
      store.proxy.extraParams.khid = khid;
      // store.proxy.extraParams.ckid = ckid;
      store.proxy.extraParams.loc = "cpgfdsh";
      store.reload();
    });
    that.listmxstore = cpgfdmxStore0;
    that.liststore = that.viewname.getStore();
    that.control({
      "#btnQuery": {
        click: that.onBtnQueryClick,
      },
      "#btnNew": {
        click: that.onBtnNewClick,
      },
      "#btnAddCpmc": {
        click: that.onSelectCpbmView,
      },
      "#btnDeleteCpmc": {
        click: that.onDeleteCpmc,
      },
      "#btnCpgfdSave": {
        click: that.onCpgfdshOkSubmit,
      },
      "#btnQueryKhmc": {
        click: this.onSelectKhbmView,
      },
      "#btnPrintCpgfd": {
        click: this.onPrintCpgfd,
      },
      "#btnCpgfdDelete": {
        click: that.onCpgfdshDeleteSubmit,
      },
      "#FilterField": {
        change: this.onFilterChange,
      },
    });
    that.getView().down("#QueryKhmc").setHidden(false);
    if (sys_location_id > 0) {
      that.getView().down("#QueryKhmc").setHidden(false);
    } else {
      that.getView().down("#QueryKhmc").setHidden(true);
    }
    that.locQuery(that);
    var tool = that.viewname.down("#QueryToolbarView");
    tool.down("#btnNew").setText("新单");
    tool.down("#btnNew").setDisabled(false);
    tool.down("#btnNew").setHidden(false);
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("khmc")) ||
        regExp.test(record.get("xmmc")) ||
        regExp.test(record.get("gfdh"))
      );
    });
  },
  onBtnNewClick: function (rs) {
    khid = that.viewname.getViewModel().get("khid");
    var khmc = that.viewname.getViewModel().get("khmc");
    gfid = 0;
    sys_current_khid = khid;
    var record = {};
    record["khid"] = khid;
    record["gfid"] = 0;
    record["w"] = 50;
    record["cphm"] = "";
    record["sfr"] = "";
    record["sfdh"] = "";
    record["gfdh"] = "";
    record["gsop"] = false;
    record["khmc"] = khmc;
    record["gfrq"] = new Date();
    record["czy"] = sys_userInfo.username;
    var view = that.viewname;
    that.dialog = view.add({
      xtype: "formgfdwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    that.dialog.show();
  },
  onSelectCpbmView: function (record) {
    var p = that.lookupReference("gfdpopupWindow");
    sys_current_khid = p.getViewModel().get("khid");
    console.log(sys_current_khid);
    if (sys_current_khid == 0) {
      Ext.MessageBox.alert("提示！", "请先选择客户名称！");
      return;
    }
    treeSelect("cpmc", that, "", that.viewname, false, addCpmcCallBack);
    return false;
  },
  onCpgfdmxShowView: function (button) {
    var rec = button.getWidgetRecord();
    gfid = rec.data.gfid;
    var record = rec.data;
    record["btnButtonHidden"] = false;
    record["op"] = "ywsh";
    record["gsop"] = false;
    record["title"] = "商品过货单-审核";
    record["w"] = 40;
    var view = this.getView();
    this.isEdit = false;
    this.dialog = view.add({
      xtype: "formgfdwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
    var cpgfdmx_store = this.lookupReference("CpgfdmxGrid").getStore();
    cpgfdmx_store.proxy.extraParams.gfid = gfid;
    cpgfdmx_store.proxy.extraParams.loc = "cpgfdmxsh";
    cpgfdmx_store.reload();
    var p = that.lookupReference("gfdpopupWindow");
    p.down("#btnAddCpmc").setHidden(true);
    p.down("#btnDeleteCpmc").setHidden(!sys_system_del);
    p.down("#btnDeleteCpmc").setText("删除此单");
    p.down("#CpgfdFormSubmit").setHidden(!sys_system_sh);
    p.down("#CpgfdFormSubmit").setText("审核此单");
    p.down("#btnPrintCpgfd").setHidden(false);
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  onSelectNewKhbmView: function (record) {
    that.popupmx = this.lookupReference("gfdpopupWindow");
    treeSelect("khmc", that, "", that.popupmx, false, khmcCallBack);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onCpgfdFormSubmit: function () {
    this.CpgfdshSave("ok", that);
  },
  onCpgfdshDeleteSubmit: function () {
    this.CpgfdshSave("delete", that);
  },
  CpgfdshSave: function (loc, the) {
    var p = the.lookupReference("gfdpopupWindow").getViewModel();
    var form = this.lookupReference("windowForm");
    if (!form.isValid()) {
      Ext.MessageBox.alert("注意！", "输入内容不完整！");
      return false;
    }
    var cpgfdmx_store = that.lookupReference("CpgfdmxGrid").getStore();
    if (cpgfdmx_store.getCount() == 0) {
      Ext.MessageBox.alert("注意！", "请输入过货商品明细数据！");
      return false;
    }
    if (p.data.khmc == "") {
      Ext.MessageBox.alert("注意！", "请选择客户名称！");
      return false;
    }
    var rq = Ext.decode(Ext.encode(p.get("gfrq")));
    console.log(rq, sys_option_min_date);
    if (rq < sys_option_min_date) {
      Ext.MessageBox.alert(
        "注意！",
        "输入日期不能小于：" + sys_option_min_date
      );
      return false;
    }
    // return;
    //if (p.data.zl == 0) {
    // Ext.MessageBox.alert('注意！', '请输入重量！');
    // return false;
    // }
    var sumsl = 0,
      sumzl = 0,
      sumje = 0;
    var mx = [];
    if (gfid > 0) {
      cpgfdmx_store.each(function (rec) {
        rec.data.id = rec.data.mxid;
        sumsl = sumsl + rec.data.sl;
        sumzl = sumzl + rec.data.zl;
        sumje = sumje + rec.data.je;
        mx.push(rec.data);
      });
    } else {
      cpgfdmx_store.each(function (rec) {
        //    if (rec.data.zl > 0) {
        sumsl = sumsl + rec.data.sl;
        sumzl = sumzl + rec.data.zl;
        sumje = sumje + rec.data.je;
        mx.push(rec.data);
        //  }
      });
    }
    if (sumzl == 0 && sumje == 0) {
      Ext.MessageBox.alert("注意！", "请输入明细数据内容！");
      return false;
    }
    var gfd = {};
    gfd["sl"] = sumsl;
    gfd["zl"] = sumzl;
    gfd["je"] = sumje;
    gfd["khid"] = p.data.khid;
    gfd["gfid"] = gfid;
    gfd["khmc"] = p.data.khmc;
    gfd["cphm"] = p.data.cphm;
    gfd["sfr"] = p.data.sfr;
    gfd["cnote"] = p.data.cnote;
    gfd["gfdh"] = p.data.gfdh;
    gfd["gfrq"] = Ext.decode(Ext.encode(p.get("gfrq")));
    gfd["rq"] = Ext.decode(Ext.encode(p.get("gfrq")));
    // gfd["sl"] = 0;//p.data.sl;
    // gfd["zl"] = p.data.zl;
    //gfd["je"] = p.data.je;
    gfd["xjje"] = p.data.xjje;
    if (p.data.xjbz) {
      gfd["xjbz"] = 1;
      gfd["xjje"] = sumje;
    } else {
      gfd["xjbz"] = 0;
      gfd["xjje"] = 0;
    }
    gfd["gfdmx"] = mx;
    var str = obj2str(gfd);
    var encodedString = base64encode(Ext.encode(str));
    Ext.Ajax.request({
      method: "GET",
      url: sys_ActionPHP,
      params: {
        act: "cpgfdmxsave",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        p_l_id: sys_location_id,
        data: encodedString,
      },
      scope: this,
      success: function (response) {
        var result = Ext.decode(response.responseText);
        //  console.log("result", result);
        if (result.result == "success") {
          //Ext.MessageBox.alert('提示', '过货单已保存，单号是：' + result.dh);
          //that.DeletecpjkdAll(cpjkdmx_store, cpjkdcw_store, cpjkdje_store, jkdh);
          var msg =
            "过货单已保存，单号是：" + result.dh + "</br>是否打印此商品过货单";
          Ext.MessageBox.show({
            title: "提示",
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
              yes: "确认打印",
              no: "放  弃",
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
              if (btn == "yes") {
                PrintCpgfdgfid(result.gfid);
              }
              that.getView().down("#cpgfdedit").close();
              that.locQuery(that);
            },
          });
        } else {
          Ext.MessageBox.alert("错误!", result.msg);
        }
      },
      failure: function () {
        Ext.MessageBox.alert("错误!", "发生错误！");
      },
    });
    return;
  },
  onDeleteCpmc: function (button) {
    var p = that.lookupReference("gfdpopupWindow").getViewModel();
    gfid = p.data.gfid;
    if (gfid > 0) {
      var msg = "过货单号：" + p.get("gfdh") + "<br>客户名称：" + p.get("khmc");
      var title = "真的删除此过货单内容？";
      that.loc = "delete";
      var abc = Ext.Msg.confirm(title, msg, function (e) {
        if (e == "yes") {
          AjaxDataSave("cpgfdmxsave", "delete", gfid, gfdDeleteCallBack, that);
        }
      });
      return;
    }
    var customerGrid = that.lookupReference("CpgfdmxGrid");
    selection = customerGrid.getSelectionModel().getSelection()[0];
    var msg =
      "项目：" +
      selection.get("xmmc") +
      "<br>重量：" +
      selection.get("zl") +
      "<br>单位：" +
      selection.get("jldw") +
      "<br>单价：" +
      selection.get("dj") +
      "<br>金额:" +
      selection.get("je");
    var abc = Ext.Msg.confirm("真的删除此项目费用内容？", msg, function (e) {
      if (e == "yes") {
        selection.drop();
        that.sumje();
      }
    });
  },
  onSelectWorkerView: function (button) {
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
  },
  onWorkerSelectOkClick: function () {
    var names = [];
    var by = [];
    var gs = [];
    var cg = [];
    var records = that.getView().down("#selectWorkerTreePanel").getChecked();
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
    records = that.getView().down("#selectWorkerTreePanel2").getChecked();
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
    var selection = that.recordID;
    if (selection != undefined) {
      selection.set("gs", gs.join(";"));
      selection.set("byg", by.join(";"));
      selection.set("cg", cg.join(";"));
      that.getView().down("#selectWorkerWindow").close();
    }
  },
  /*
    SelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },*/
  onPrintCpgfd: function () {
    var p = that.lookupReference("gfdpopupWindow").getViewModel();
    PrintCpgfdgfid(p.get("gfid"));
    return;
  },
  sumje: function () {
    var customerGrid = that.lookupReference("CpgfdmxGrid");
    var store = customerGrid.getStore();
    var v = that.lookupReference("gfdpopupWindow").getViewModel();
    v.set("sl", store.sum("sl"));
    v.set("zl", store.sum("zl"));
    v.set("je", store.sum("je"));
    console.log(v.get("sl"), v.get("zl"), v.get("je"));
    if (v.get("xjbz")) {
      v.set("xjje", v.get("je"));
    } else {
      v.set("xjje", 0);
    }
  },
});
