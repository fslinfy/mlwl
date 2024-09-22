var that;
var xsid;
var cpxsdmxStore;
var xsshsaveCallBack = function (th, ret) {
  // that.getView().down("#cpxsdshowview").close();
  // that.locQuery(th);
  //console.log(th, ret);
  var p = th.lookupReference("popupCpxsdWindow");
  var mxsid = p.getViewModel().get("xsid");
  if (that.loc == "ok") {
    if (ret.zt == "1") {
      Ext.MessageBox.show({
        title: "提示",
        msg: "打印商品销售单",
        buttons: Ext.MessageBox.YESNO,
        buttonText: {
          yes: "确认打印",
          no: "放  弃",
        },
        icon: Ext.MessageBox["WARNING"],
        scope: this,
        fn: function (btn, text) {
          if (btn == "yes") {
            PrintCpxsdxsid(mxsid);
          }
          p.close();
          that.locQuery(th);
        },
      });
    } else {
      Ext.MessageBox.alert("注意!", "数据审核成功！");
      p.close();
      that.locQuery(th);

    }
  } else {
    Ext.MessageBox.alert("注意!", "销售单取消成功！");
    p.close();
    that.locQuery(th);
  }
};
Ext.define("MyApp.view.main.xsdgl.CpxsdshCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.CpxsdshCtrl",
  requires: [
    "MyApp.view.main.xsdgl.CpxsdshView",
    "MyApp.view.main.report.PrintCpxsd",
  ],
  locQuery: function (th) {
    //  //console.log("locQuery cpxsdshctrl");
    var v = that.viewname.getViewModel();
    var khid = v.get("khid");
    var ckid = v.get("ckid");
    cpxsdmxStore.proxy.extraParams.loc = "cpxsdmxsh";
    cpxsdmxStore.proxy.extraParams.khid = khid;
    cpxsdmxStore.proxy.extraParams.ckid = ckid;
    var khkd = 0;
    if (sys_customer_id > 0) {
      khkd = 1;
    }
    cpxsdmxStore.proxy.extraParams.khkd = khkd;
    cpxsdmxStore.reload();
  },
  onBtnQueryClick: function (button, e, options) {
    this.locQuery(this);
    return false;
  },
  onBtnHelpClick: function (button, e, options) {
    return false;
  },
  onBtnCancelClick: function (button, e, options) {
    var win = this.lookupReference("popupCpxsdWindow");
    win.close();
    return false;
  },
  init: function () {
    //        //console.log("init");
    that = this;
    this.control({
      "#btnQuery": {
        click: this.onBtnQueryClick,
      },
      "#btnHelp": {
        click: this.onBtnHelpClick,
      },
      "#FilterField": {
        change: this.onFilterChange,
      },
      "#btnQueryKhmc": {
        click: this.onSelectKhbmView,
      },
      "#btnQueryCkmc": {
        click: this.onSelectCkbmView,
      },
      "#btnPrintCpxsd": {
        click: function () {
          onPrintCpxsd();
        },
      },
      "#btnCpxsdSave": {
        click: this.onCpxsdSaveSubmit,
      },
      "#btnCpxsdDelete": {
        click: this.onCpxsdDeleteSubmit,
      },
    });
    var viewname = that.getView().down("#CpxsdListGrid");
    that.viewname = viewname;
    var v = viewname.getViewModel();
    v.set("PageTitleName", "商品提货单审核");
    //v.set('start_date', start_date);
    //v.set('end_date', end_date);
    if (sys_location_id > 0) {
      v.set("ckmc", sys_location_name);
      v.set("ckid", sys_location_id);
      viewname.down("#QueryKhmc").setHidden(false);
      viewname.down("#QueryCkmc").setHidden(true);
    }
    if (sys_customer_id > 0) {
      v.set("khmc", sys_customer_name);
      v.set("khid", sys_customer_id);
      viewname.down("#QueryKhmc").setHidden(true);
      viewname.down("#QueryCkmc").setHidden(false);
    }
    //viewname.down('#QueryDate').setHidden(true);
    cpxsdmxStore = Ext.create("Ext.data.Store", {
      alias: "store.cpxsdmxStore",
      model: "MyApp.model.CpxsdmxModel",
      proxy: {
        type: "ajax",
        api: {
          read: sys_ActionPHP + "?act=cpxsdmxlist_pc",
        },
        actionMethods: {
          read: "GET",
        },
        extraParams: {
          loc: "cpxsdmxsh",
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
    cpxsdmxStore.on("load", function () {
      var v = that.viewname.getViewModel();
      if  (v.get("khid")==null){
         var khid = sys_customer_id;
      }else{
        var khid = v.get("khid");
      }

      var ckid = v.get("ckid");
      var khkd = 0;
      if (sys_customer_id > 0) {
        khkd = 1;
      }
      //  start_date= v.get('start_date');
      //  end_date = v.get('end_date');
      //  var  d1 = Ext.Date.format(start_date, 'Y-m-d');
      //  var  d2 = Ext.Date.format(end_date, 'Y-m-d');
      var store = that.viewname.getStore();
      store.proxy.extraParams.loc = "cpxsdsh";
      store.proxy.extraParams.khid = khid;
      store.proxy.extraParams.ckid = ckid;
      store.proxy.extraParams.khkd = khkd;
      // store.proxy.extraParams.startdate = d1;
      // store.proxy.extraParams.enddate = d2;
      store.reload();
    });
    this.locQuery(this);
  },
  onSelectKhbmView: function (record) {
    treeSelect("khmc", that, "", that.viewname, true);
    return false;
  },
  khmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onSelectCkbmView: function (record) {
    treeSelect("ckmc", that, "", that.viewname, true);
    return false;
  },
  ckmcTriggerClick: function (record) {
    that.onBtnQueryClick();
    return false;
  },
  onFilterChange: function (v) {
    var store = that.viewname.getStore();
    var regExp = new RegExp(".*" + v.rawValue + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
      return (
        regExp.test(record.get("C_name")) ||
        regExp.test(record.get("C_code")) ||
        regExp.test(record.get("Py_code")) ||
        regExp.test(record.get("xsdh"))
      );
    });
  },
  onCpxsdmxShowView: function (button) {
    var rec = button.getWidgetRecord();
    xsid = rec.data.xsid;
    var record = rec.data;
    record["btnButtonHidden"] = true;
    record["op"] = "loc";
    record["ckop"] = false;
    record["title"] = "商品销售单-审核处理";
    //console.log(record);
    var view = this.getView();
    this.isEdit = false;
    this.dialog = view.add({
      xtype: "cpxsdformwindow",
      viewModel: {
        data: record,
      },
      session: true,
    });
    this.dialog.show();
    var cpxsdmx_store = this.lookupReference("CpxsdmxGrid").getStore();
    cpxsdmxStore.each(function (rec) {
      if (rec.data.xsid == xsid) {
        cpxsdmx_store.add(rec);
      }
    });
    //console.log("xsd rec",record);
    const shrarray = record.shr.split(';');

    var sh = shrarray.includes(sys_userInfo.username) || sys_userInfo.username == record.czy ;

    //console.log(sys_userInfo.username,"shrarray", shrarray, "sh", !sh,"czy", record.czy);
    var p = this.lookupReference("popupCpxsdWindow");
    p.down("#btnCpxsdSave").setText("审核通过此单");
    p.down("#btnCpxsdSave").setHidden(!sys_system_sh || sh);

    p.down("#btnCpxsdDelete").setHidden(!sys_system_del);
    p.down("#btnPrintCpxsd").setHidden(true);
    //var p = this.lookupReference('popupCpxsdWindow');
    //p.down("#btncpxsdsave").setHidden(false);
    //p.down("#btncpxsddelete").setHidden(false);
    //p.down("#field_cnote").setReadOnly(false);
  },
  onGridReload: function () {
    var store = this.lookupReference("CpxsdmxGrid").getStore();
    var mxid = store.getAt(0).get("mxid");
    var cpxsdcw_store = this.lookupReference("cpxsdmxcw0").getStore();
    cpxsdcw_store.clearFilter();
    cpxsdcw_store.filterBy(function (record, id) {
      return record.get("mxid") == mxid;
    });
  },
  onCpxsdmxItemSelected: function (sender, record) {
    var cpxsdcw_store = this.lookupReference("cpxsdmxcw0").getStore();
    var mxid = record.data.mxid;
    cpxsdcw_store.clearFilter();
    cpxsdcw_store.filterBy(function (record, id) {
      return record.get("mxid") == mxid;
    });
  },
  onCpxsdSaveSubmit: function () {
    this.CpxsdshSave("ok", this);
  },
  onCpxsdDeleteSubmit: function () {
    this.CpxsdshSave("delete", this);
  },
  CpxsdshSave: function (loc, th) {
    var p = th.lookupReference("popupCpxsdWindow").getViewModel();
    xsid = p.get("xsid");
    shr = p.get("shr");
    shrs = parseInt(p.get("shrs"));
    // //console.log("khkd",p.get('khkd'));
    if (xsid == 0) {
      return;
    }
    var msg = "销售提货单：" + "<br>客户名称：" + p.get("khmc"); // + "<br>进库日期：" + p.get('xsrq');
    var title = "真的取消此提货单内容？";
    var data = {};
    data["xsid"] = xsid;
    if (loc == "ok") {
      title = "真的审核通过此提货单内容？";
      var shrarray = [];
      if (shr != "") {
        var shrarray = shr.split(';');
      }
      if (shrarray.length + 1 >= shrs) {
        data["ztbz"] = 1;
      } else {
        data["ztbz"] = 0;
      }

      //    if (shrarray.length == 0) {
      //    data["shr"] = sys_userInfo.username;
      // } else {
      shrarray.push(sys_userInfo.username);
      data["shr"] = shrarray.join(';');
      // }
    }
    //console.log("data", data);
    //return;
    var d = base64encode(Ext.encode(obj2str(data)))
    //console.log("data:", d);
    that.loc = loc;
    var abc = Ext.Msg.confirm(title, msg, function (e) {
      if (e == "yes") {
        var p = that.lookupReference("popupCpxsdWindow");
        p.down("#btnCpxsdSave").setHidden(true);
        AjaxDataSave("cpxsdshsave", loc, d, xsshsaveCallBack, th);
        // //console.log("cpxsdshsave");
      }
    });
  },
});
