﻿var gfid = 0;
var that;
displaycksh =true;
var curcpgfdjeStore;
/*
var khmcCallBack = function (node) {
    that.popupmx.getViewModel().set('khid', node.data.id);
    that.popupmx.getViewModel().set('khmc', node.data.text);
}
*/
var gfdshsaveCallBack = function (th) {
  var p = th.lookupReference("popupCpgfdWindow");
  // var mid = th.gfid;
  if (that.loc != "delete") {
    // 发信息
    Ext.Ajax.request({
      method: "GET",
      url: "qcloudsmssend.php",
      params: {
        act: "cpgfd",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        id: gfid,
      },
      scope: this,
      success: function (response) {
        var result = Ext.decode(response.responseText);
        if (result.result == "success") {
        } else {
          Ext.MessageBox.alert("提示!", result.msg);
        }
      },
    });
    Ext.MessageBox.show({
      title: "提示",
      msg: "打印商品过车单",
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: "确认打印",
        no: "放  弃",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        if (btn == "yes") {
          //  PrintwxCpgfdgfid(gfid);
          PrintCpgfdgfid(gfid);
        }
        p.close();
        that.locQuery();
      },
    });
  } else {
    p.close();
    that.locQuery();
    Ext.MessageBox.alert("提示！", "此过车单过车内容已作废！");
  }
};
var cpgfdmxStore0;
Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdshCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.wxCpgfdshCtrl",
  requires: [
    "MyApp.view.main.wxcpgfgl.wxCpgfdshView",
    //, 'MyApp.view.main.wxcpgfgl.wxCpgfdmxEdit'
    "MyApp.view.main.tree.WorkerSelectTree",
    "MyApp.view.main.report.PrintwxCpgfd",
  ],
  locQuery: function (the) {
    var v = that.viewname.getViewModel();
    var khid = v.get("khid");
    // cpgfdmxStore0.proxy.extraParams.loc = "wxcpgfdywsh";
    cpgfdmxStore0.proxy.extraParams.khid = khid;
    cpgfdmxStore0.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(that);
    return false;
  },
  init: function () {
    that = this;
    displaycksh =true;
    that.viewname = that.getView().down("#CpgfdListGrid");
    var v = that.viewname.getViewModel();
    v.set("PageTitleName", "商品过车业务审核");
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
    }
    cpgfdmxStore0 = Ext.create("Ext.data.Store", {
      alias: "store.cpgfdmxStore",
      model: "MyApp.model.CpgfdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=wxCpgfdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "wxcpgfdmxywsh",
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
      var store = that.viewname.getStore();
      store.proxy.extraParams.khid = khid;
      store.proxy.extraParams.act = "wxCpgfdlist_pc";
      store.proxy.extraParams.loc = "wxcpgfdywsh";
      store.reload();
    });
    that.listmxstore = cpgfdmxStore0;
    that.liststore = that.viewname.getStore();
    that.control({
      "#btnQuery": {
        click: that.onBtnQueryClick,
      },
      "#btnCpgfdSave": {
        click: that.onwxCpgfdFormSubmit,
      },
      "#btnQueryKhmc": {
        click: this.onSelectKhbmView,
      },
      "#btnPrintCpgfd": {
        click: function () {
          onPrintwxCpgfd();
        },
      },
      "#btnwxCpgfdDelete": {
        click: that.onwxCpgfdshDeleteSubmit,
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
  onCpgfdmxShowView: function (button) {
    var rec = button.getWidgetRecord();
    issave = false;
    gfid = rec.data.gfid;
    mgfid = gfid;
    var record = rec.data;
    sys_current_khid=rec.data.khid;;
    sys_current_ckid=rec.data.L_id;
    //console.log('rec gf',rec);
    //console.log("CpgfshShowView", record);
    record["op"] = "sh";
    record["gsop"] = false;
    record["w"] = 50;
    record["btnButtonHidden"] = false;
    record["title"] = "商品过车单-仓库审核";
    var view = this.getView();
    this.isEdit = false; // !!record;
    that.gfdrecord = rec;
    this.dialog = view.add({
      xtype: "cpgfshformwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
    var cpgfdmx_store = this.lookupReference("CpgfdmxGrid").getStore();
    var p = this.lookupReference("popupCpgfdWindow");
    p.down("#btnCpgfdSave").setHidden(!sys_system_sh);
    p.down("#btnPrintCpgfd").setHidden(true);
    if (sys_system_sh) {
      p.down("#btnwxCpgfdDelete").setHidden(!sys_system_sh);
    }
    var cpgfdmx_store = that.lookupReference("CpgfdmxGrid").getStore();
    cpgfdmx_store.proxy.extraParams.gfid = gfid;
    cpgfdmx_store.proxy.extraParams.act = "wxCpgfdgfmxlist_pc";
    cpgfdmx_store.load();
  },
  onCpgfdmxgheditView: function (button) {
    var rec = button.getWidgetRecord();
    //console.log("onCpgfdmxgheditView 商品过车处理", rec.data);
    if (rec.data.mccsl == 0 && rec.data.mcczl == 0) {
      return;
    }
    mmccsl = 0;
    mmcczl = 0;
    var rec0 = that.lookupReference("popupCpgfdWindow").getViewModel();
    var mxid = rec.data.mxid;
    var kcid = rec.data.kcid;
    var record = rec.data;
    that.gfdrecord = rec;
    that.mainrecord = record;
    record["btnButtonHidden"] = false;
    var view = this.getView();
    this.isEdit_mx = !!record;
    that.ghmxid = mxid;
    //console.log("endrq", record);
    that.recordID = record["id"];
    record["newrecord"] = false;
    record["xjbz"] = rec0.data.xjbz;
    record["title"] = "商品过车处理";
    if (record["sl"] == 0 && record["zl"] == 0) {
      record["sl"] = record["khsl"];
      record["zl"] = record["khzl"];
    }
    this.dialog_mx = view.add({
      xtype: "gfdformmxwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog_mx.show();
    var cpgfdje_store = this.lookupReference("cpgfdmxje").getStore();
    cpgfdje_store.filter({
      filterFn: function (item) {
        return item.get("mxid") == mxid && item.get("gfid") == gfid;
      },
    });
    var cpgfdmx_store = that.lookupReference("CpgfdmxGrid").getStore();
    cpgfdmx_store.proxy.extraParams.gfid = rec.data.gfid;
    cpgfdmx_store.proxy.extraParams.act = "wxCpgfdgfmxlist_pc";
    cpgfdmx_store.load();
  },
  /*    onCpgfdjeDeleteClick: function (button) {
                var customerGrid = this.lookupReference('cpgfdmxje'),
                selection = customerGrid.getSelectionModel().getSelection()[0];
            var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
            var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
                if (e == 'yes') {
                    selection.drop();
                    var panel = that.lookupReference('popupmxWindow').getViewModel();
                    var store = customerGrid.getStore();
                    that.sumjs(null, store, panel);
                }
            });
    
        },
*/
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onSelectWorkerView: function (button) {
    var rec = button.getWidgetRecord();
    if (rec.data.mxdh == "1") {
      return;
    }
    //console.log("rec=", rec);
    SelectWorkerView(button);
  },
  onWorkerSelectOkClick: function () {
    cpgfWorkerSelectOkClick(that);
  },
  onwxCpgfdFormSubmit: function () {
    this.wxCpgfdshSave("cpgfdywsh", that);
  },
  onwxCpgfdshDeleteSubmit: function () {
    this.wxCpgfdshSave("delete", that);
  },
  wxCpgfdshSave: function (loc, the) {
    var p = the.lookupReference("popupCpgfdWindow").getViewModel();
    var form = this.lookupReference("windowForm");
    if (!form.isValid()) {
      Ext.MessageBox.alert("注意！", "输入内容不完整！");
      return false;
    }
    var wxcpgfdmx_store = the.lookupReference("CpgfdmxGrid").getStore();
    var sumsl = 0,
      sumzl = 0,
      sumje = 0,
      recs = 0;
    var mx = [];
    wxcpgfdmx_store.each(function (rec) {
      if (rec.data.mxdh != "1") {
        recs = recs + 1;
        sumsl = sumsl + rec.data.sl;
        sumzl = sumzl + rec.data.zl;
        sumje = sumje + rec.data.je;
        mx.push(rec.data);
      }
    });
    //  if (recs==0)
    //    {
    //        Ext.MessageBox.alert('注意！', '请输入明细机械作用数据内容！');
    //       return false;
    //  }
    var gfd = {};
    gfd["gfid"] = gfid;
    gfd["cphm"] = p.data.cphm;
    gfd["sfr"] = p.data.sfr;
    gfd["cnote"] = p.data.cnote;
    gfd["gfrq"] = Ext.decode(Ext.encode(p.get("gfrq")));
    if (p.data.xjbz) {
      gfd["xjbz"] = 1;
      gfd["xjje"] = sumje;
    } else {
      gfd["xjbz"] = 0;
      gfd["xjje"] = 0;
    }
    gfd["gfdje"] = mx;
    var msg = "过车单号：" + p.get("gfdh") + "<br>客户名称：" + p.get("khmc");
    var title = "真的取消此过车单的过车内容？";
    if (loc != "delete") {
      var ntbname = "过车业务审核";
      title = "真的业务审核通过此过车单过车内容？";
    } else {
      var ntbname = "确 认";
      var cgfrq = gfd["gfrq"].substr(0, 10);
      var ctoday = Ext.Date.format(new Date(), "Y-m-d");
      if (cgfrq < sys_option_min_date && ctoday >= sys_option_min_date) {
        Ext.MessageBox.alert("注意！", "此单已封帐，不能作删除处理！");
        return false;
      }
    }
    that.loc = loc;
    that.gfid = gfid;
    //console.log(gfd);
    //return ;
    Ext.MessageBox.show({
      title: title,
      msg: msg,
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: ntbname,
        no: "放 弃",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        if (btn == "yes") {
          that
            .lookupReference("popupCpgfdWindow")
            .down("#btnCpgfdSave")
            .setHidden(true);
          that
            .lookupReference("popupCpgfdWindow")
            .down("#btnwxCpgfdDelete")
            .setHidden(true);
          var str = obj2str(gfd);
          var encodedString = base64encode(Ext.encode(str));
          // //console.log('save....');
          AjaxDataSave(
            "wxcpgfdshsave",
            loc,
            encodedString,
            gfdshsaveCallBack,
            the
          );
        }
      },
    });
  },
  //onPrintwxCpgfd: function () {
  //    var p = that.lookupReference('gfdpopupWindow').getViewModel();
  //    PrintwxCpgfdgfid(p.get('gfid'));
  //    return;
  //},
  /*
    sumje: function () {
        
        var customerGrid = that.lookupReference('wxCpgfdmxGrid');
        var store = customerGrid.getStore();
        var v = that.lookupReference('gfdpopupWindow').getViewModel();
        v.set('sl', store.sum('sl'));
        v.set('zl', store.sum('zl'));
        v.set('je', store.sum('je'));
        //console.log(v.get('sl'),v.get('zl'),v.get('je'));
        if (v.get('xjbz')) {
            v.set('xjje', v.get('je'));
        }
        else {
            v.set('xjje', 0);
        }
    },
    sumjs: function (store1, store2, panel) {
        if (store2) {
            var ccje = 0;
            var xjje = 0;
            store2.each(function (rec) {
                ccje = ccje + rec.data.je;
                if (rec.data.xjbz) {
                    xjje = xjje + rec.data.je;
                }
            })
            panel.set('je', ccje);
            panel.set('xjje', xjje);
        }
    
    
        if (store1) {
            var sl = store1.sum('sl');
            var zl = store1.sum('zl');
    
            if ((sl > panel.get('khsl')) || (zl > panel.get('khzl'))) {
                // //console.log(sl,zl);
                return false;
            };
            panel.set('sl', sl);
            panel.set('zl', zl);
        }
    
        return true;
    
    },
    */
});
