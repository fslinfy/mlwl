var that;
var cpckdmxStore;
var mmccsl = 0;
var mmcczl = 0;
var cwsaveCallBack = function (th) {
  console.log("cwsaveCallBack");
  var cpckdmx_store = that.lookupReference("CpckdmxGrid").getStore();
  cpckdmx_store.load();
  var cpckdcw_store = that.lookupReference("cpckdmxcw0").getStore();
  cpckdcw_store.load();
  // that.lookupReference('popupCpckdWindow').hide();
  that.getView().down("#CpckdmxShEdit").close();
};
var ckckshsaveCallBack = function (th) {
  that.getView().down("#cpckdshowview").close();
  that.locQuery(th);
};
Ext.define("MyApp.view.main.cpckgl.CpckdckshCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpckdckshCtrl",
  requires: [
    "MyApp.view.main.cpckgl.CpckdckshView",
    "MyApp.view.main.tree.WorkerSelectTree",
    "MyApp.view.main.cpckgl.CpckdmxShEdit",
  ],
  locQuery: function (that) {
    console.log("cksh locQuery");
    var v = that.viewname.getViewModel();
    var khid = v.get("khid");
    var ckid = v.get("ckid");
    cpckdmxStore.proxy.extraParams.loc = "cpckdmxcksh";
    cpckdmxStore.proxy.extraParams.khid = khid;
    cpckdmxStore.proxy.extraParams.l_id = ckid;
    cpckdmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
  },
  init: function () {
    that = this;
    that.workersave = "cpckdjesave";
    that.viewname = that.getView().down("#CpckdListGrid");
    var v = that.viewname.getViewModel();
    if (sys_location_id > 0) {
      v.set("ckmc", sys_location_name);
      v.set("ckid", sys_location_id);
    }
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
    }
    cpckdmxStore = Ext.create("Ext.data.Store", {
      alias: "store.cpckdmxStore",
      model: "MyApp.model.CpckdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=cpckdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "cpckdmxcksh",
          userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
          p_e_code: sys_enterprise_code,
          p_l_id: sys_location_id,
        },
        reader: {
          type: "json",
          rootProperty: "rows",
        },
      },
    });
    cpckdmxStore.on("load", function () {
      var v = that.viewname.getViewModel();
      var khid = v.get("khid");
      var ckid = v.get("ckid");
      var store = that.viewname.getStore();
      store.proxy.extraParams.loc = "cpckdcksh";
      store.proxy.extraParams.khid = khid;
      store.proxy.extraParams.l_id = ckid;
      store.reload();
    });
    that.listmxstore = cpckdmxStore;
    that.liststore = that.viewname.getStore();
    this.locQuery(this);
    this.control({
      "#btnQuery": {
        click: this.onBtnQueryClick,
      },
      "#btnCpckdSave": {
        click: this.onCpckdshOkSubmit,
      },
      "#btnQueryKhmc": {
        click: function () {
          SelectKhbmView();
        },
      },
      "#btnQueryCkmc": {
        click: function () {
          SelectCkbmView();
        },
      },
      "#btnPrintCpckd": {
        click: function () {
          onPrintCpckd();
        },
      },
      "#btnCpckdDelete": {
        click: this.onCpckdshDeleteSubmit,
      },
      "#FilterField": {
        change: this.onFilterChange, //function () { FilterChange(); }
      },
    });
    if (sys_customer_id > 0) {
      that.getView().down("#QueryKhmc").setHidden(true);
      that.getView().down("#QueryCkmc").setHidden(false);
    } else {
      that.getView().down("#QueryKhmc").setHidden(false);
      that.getView().down("#QueryCkmc").setHidden(true);
      if (sys_location_id > 0) {
        that.getView().down("#QueryKhmc").setHidden(false);
        that.getView().down("#QueryCkmc").setHidden(true);
      } else {
        that.getView().down("#QueryKhmc").setHidden(true);
        that.getView().down("#QueryCkmc").setHidden(false);
      }
    }
    that.viewname.getViewModel().set("PageTitleName", "商品出仓单仓管审核");
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("ckdh")) ||
        regExp.test(record.get("xsdh")) ||
        regExp.test(record.get("khmc")) ||
        regExp.test(record.get("cKmc"))
      );
    });
  },
  onCpckdmxShowView: function (button) {
    var rec = button.getWidgetRecord();
    var ckid = rec.data.ckid;
    var record = rec.data;
    that.mainrecord = rec;
    console.log("record", record);
    record["op"] = "cksh";
    record["gsop"] = false;
    record["w"] = 40;
    record["btnButtonHidden"] = false;
    record["title"] = "商品出库单-仓管复核";
    var view = this.getView();
    that.isEdit = false; // !!record;
    that.dialog = view.add({
      xtype: "cpckformwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    that.dialog.show();
    // var cpckdmx_store = this.lookupReference('CpckdmxGrid').getStore();
    // cpckdmx_store.proxy.extraParams.ckid = ckid;
    //  cpckdmx_store.load();
    var p = that.lookupReference("popupCpckdWindow");
    p.down("#btnCpckdSave").setHidden(!sys_system_sh);
    p.down("#btnCpckdDelete").setHidden(!sys_system_del);
    p.down("#btnCpckdSave").setText("复核确认");
    /*var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.ckid == ckid) {
                cpckdmx_store.add(rec);
            }
        })
        */
    /* var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
         cpckdcw_store.proxy.extraParams.ckid = ckid;
         cpckdcw_store.proxy.extraParams.loc = 'ckid';
         cpckdcw_store.load();
 
         this.onGridReload();
 */
    var cpckdcw_store = that.lookupReference("cpckdmxcw0").getStore();
    cpckdcw_store.proxy.extraParams.ckid = ckid;
    cpckdcw_store.proxy.extraParams.loc = "ckid";
    cpckdcw_store.load();
    var cpckdmx_store = that.lookupReference("CpckdmxGrid").getStore();
    cpckdmx_store.on("load", function () {
      var mxid = cpckdmx_store.getAt(0).get("mxid");
      cpckdcw_store.clearFilter();
      cpckdcw_store.filterBy(function (record, id) {
        return record.get("ckmxid") == mxid;
      });
    });
    cpckdmx_store.proxy.extraParams.ckid = ckid;
    cpckdmx_store.load();
  },
  onCpckdmxShEdit: function (button) {
    var rec = button.getWidgetRecord();
    mmccsl = 0;
    mmcczl = 0;
    // console.log(rec.data);
    var mxid = rec.data.mxid;
    var kcid = rec.data.kcid;
    var record = rec.data;
    record["btnButtonHidden"] = true;
    var view = this.getView();
    this.isEdit_mx = !!record;
    this.recordID = record["id"];
    record["newrecord"] = false;
    record["title"] = "商品出仓单-补入数据";
    // if (record['ccsl'] == 0 && record['cczl'] == 0) {
    //     record['ccsl'] = record['mccsl'];
    //     record['cczl'] = record['mcczl'];
    // }
    // console.log("onCpckdmxShowView", record['ccsl'], record['cczl']);
    this.dialog_mx = view.add({
      xtype: "cpckdmxsheditwindow",
      //   xtype:'cpxsdcpckformwindow',
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog_mx.show();
    var cpckdmxcw = this.lookupReference("cpckdmxcw").getStore();
    cpckdmxcw.proxy.extraParams.ckmxid = mxid;
    cpckdmxcw.proxy.extraParams.loc = "cpckdckcpkcmx";
    cpckdmxcw.load();
  },
  onGridReload: function () {
    var store = this.lookupReference("CpckdmxGrid").getStore();
    /*   store.each(function (rec) {
               console.log(rec);
                    if (rec.data.jeid > 0) {
                        gsbyrec = {};
                        gsbyrec["jeid"] = rec.data.jeid;
                        gsbyrec["gs"] = rec.data.gs;
                        gsbyrec["byg"] = rec.data.byg;
                        gsbyrec["cg"] = rec.data.cg;
                        gsby.push(gsbyrec);
                    }
                })*/
    console.log(store);
    var mxid = store.getAt(0).get("mxid");
    var cpckdcw_store = this.lookupReference("cpckdmxcw0").getStore();
    cpckdcw_store.clearFilter();
    cpckdcw_store.filterBy(function (record, id) {
      return record.get("ckmxid") == mxid;
    });
  },
  onCpckdmxItemSelected: function (sender, record) {
    //console.log("ckmcid",record);
    var cpckdcw_store = that.lookupReference("cpckdmxcw0").getStore();
    var mxid = record.data.mxid;
    //console.log("ckmcid",mxid);
    cpckdcw_store.clearFilter();
    //cpckdcw_store.each(function (rec) {
    //    console.log("ckdcw",rec);
    //})
    cpckdcw_store.filterBy(function (record, id) {
      return record.get("ckmxid") == mxid;
    });
  },
  /*onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
 */
  onSelectWorkerView: function (button) {
    var rec = button.getWidgetRecord();
    //console.log("SelectWorkerView",rec);
    if (rec.data.jeid > 0) {
      //console.log("SelectWorkerView");
      SelectWorkerView(button);
    } else {
      if (rec.data.cwsl < rec.data.ccsl) {
        this.onCpckdmxShEdit(button);
      }
    }
  },
  onWorkerSelectOkClick: function () {
    WorkerSelectOkClick(that);
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  /*
        onSelectCkbmView: function (record) {
            treeSelect('ckmc', that, '', that.viewname, true);
            return false;
        },
        */
  ckmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onCpckdshOkSubmit: function () {
    that.CpckdshSave("ok", this);
  },
  onCpckdshDeleteSubmit: function () {
    that.CpckdshSave("delete", this);
  },
  CpckdshSave: function (loc, the) {
    var p = the.lookupReference("popupCpckdWindow").getViewModel();
    var ckid = p.get("ckid");
    if (ckid == 0) {
      return;
    }
    var cpckdcw_store = that.lookupReference("cpckdmxcw0").getStore();
    cpckdcw_store.clearFilter();
    var i = 0,
      sumsl = 0,
      sumzl = 0;
    var ckstatus = 0;
    var cpckdmx_store = that.lookupReference("CpckdmxGrid").getStore();
    var gsby = [];
    var ckmxid = 0;
    var gsbyrec = {};
    cpckdmx_store.each(function (rec) {
      ckmxid = rec.data.mxid;
      if (rec.data.jeid > 0) {
        gsbyrec = {};
        gsbyrec["jeid"] = rec.data.jeid;
        gsbyrec["gs"] = rec.data.gs;
        gsbyrec["byg"] = rec.data.byg;
        gsbyrec["cg"] = rec.data.cg;
        gsby.push(gsbyrec);
      } else {
        sumsl = 0;
        sumzl = 0;
        cpckdcw_store.each(function (reccw) {
          //console.log(ckmxid,reccw.data);
          if (reccw.data.ckmxid == ckmxid) {
            sumsl = sumsl + reccw.data.sl;
            sumzl = sumzl + reccw.data.zl;
          }
        });
        //console.log(sumsl, Math.round(sumzl * 1000) / 1000,rec.data.ccsl,rec.data.cczl,rec.data);
        if (
          Math.round(rec.data.ccsl * 1000) != Math.round(sumsl * 1000) ||
          Math.round(rec.data.cczl * 1000) != Math.round(sumzl * 1000)
        ) {
          ckstatus = 1;
        }
      }
    });
    if (loc == "ok") {
      if (ckstatus == 1) {
        Ext.MessageBox.alert(
          "注意！",
          "输入出仓数量、重量与仓位明细出仓内容不一致！</br>请补录入仓位出仓明细数据！"
        );
        return;
      }
    }
    // return;
    var cksh = {};
    cksh["ckid"] = ckid;
    cksh["gsby"] = gsby;
    var msg = "出库单号：" + p.get("ckdh") + "<br>客户名称：" + p.get("khmc");
    var title = "真的取消此出库单内容？";
    if (loc == "ok") {
      title = "真的复核确认此出库单内容？";
    } else {
      var rq = Ext.decode(Ext.encode(p.get("ckrq"))).substr(0, 10);
      var ctoday = Ext.Date.format(new Date(), "Y-m-d");
      if (rq < sys_option_min_date && ctoday >= sys_option_min_date) {
        Ext.MessageBox.alert("注意！", "此单是上月出库单，不能作删除处理！");
        return false;
      }
    }
    Ext.MessageBox.show({
      title: title,
      msg: msg,
      buttons: Ext.MessageBox.YESNO,
      buttonText: {
        yes: "确 认",
        no: "放 弃",
      },
      icon: Ext.MessageBox["WARNING"],
      scope: this,
      fn: function (btn, text) {
        if (btn == "yes") {
          that
            .lookupReference("popupCpckdWindow")
            .down("#btnCpckdSave")
            .setHidden(true);
          var str = obj2str(cksh);
          var encodedString = base64encode(Ext.encode(str));
          AjaxDataSave(
            "cpckdckshsave",
            loc,
            encodedString,
            ckckshsaveCallBack,
            the
          );
        }
      },
    });
  },
  onCpckdmxFormSubmit: function () {
    var dialog = this.dialog_mx,
      form = this.lookupReference("windowFormmx"),
      isEdit = this.isEdit_mx,
      id;
    if (!form.isValid()) {
      Ext.MessageBox.alert("注意！", "输入内容不完整！");
      return false;
    }
    var rec = form.getValues();
    var p = this.lookupReference("popupmxWindow").getViewModel();
    var cpckdcw_store = this.lookupReference("cpckdmxcw").getStore();
    cpckdcw_store.clearFilter();
    var i = 0,
      sumsl = 0,
      sumzl = 0;
    cpckdcw_store.each(function (reccw) {
      if (reccw.data.ccsl != 0 || reccw.data.cczl != 0) {
        i++;
        sumsl = sumsl + reccw.data.ccsl;
        sumzl = sumzl + reccw.data.cczl;
      }
    });
    if (i == 0) {
      Ext.MessageBox.alert("注意！", "输入出仓数量、重量！");
      return false;
    }
    if (sumsl != 0 || sumzl != 0) {
      if (
        Math.round(sumsl * 1000) != 1000 * p.get("ccsl") ||
        Math.round(sumzl * 1000) != 1000 * p.get("cczl")
      ) {
        Ext.MessageBox.alert("注意！", "输入出仓数量、重量与明细内容不一致！");
        return false;
      }
    }
    var arraycw = [];
    var newrec = {};
    var ckid = 0;
    cpckdcw_store.each(function (reccw) {
      if (reccw.get("ccsl") != 0 || reccw.get("cczl") != 0) {
        newrec = {};
        ckid = reccw.data.ckid;
        newrec["ckid"] = reccw.data.ckid;
        newrec["ckmxid"] = reccw.data.ckmxid;
        newrec["kcmxid"] = reccw.data.kcmxid;
        newrec["area"] = reccw.data.area;
        newrec["cw"] = reccw.data.cw;
        newrec["ccsl"] = reccw.data.ccsl;
        newrec["cczl"] = reccw.data.cczl;
        newrec["sm"] = reccw.data.sm;
        newrec["dw"] = reccw.data.dw;
        newrec["cpph"] = reccw.data.cpph;
        newrec["czdj"] = reccw.data.czdj;
        arraycw.push(newrec);
      }
    });
    var cpckdcw = {};
    cpckdcw["cpckdcw"] = arraycw;
    var str = obj2str(cpckdcw);
    var encodedString = base64encode(Ext.encode(str));
    AjaxDataSave("cpckdmxcwcksave", ckid, encodedString, cwsaveCallBack, this);
    return;
  },
});
