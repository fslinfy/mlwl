﻿ var treestore;
 var gfid = 0;
 var that;
 var khmcCallBack = function (node) {
   console.log('cpgfkdsh  khmcCallBack', that.popupmx );
   that.popupmx.getViewModel().set("khid", node.data.id);
   that.popupmx.getViewModel().set("khmc", node.data.text);
 };
 var AddgfcpCallBack = function (node) {
   //console.log('sh add------CallBack', node);


   var p = that.popupmx;
   var cpgfdmx = that.lookupReference("CpgfdmxGrid").getStore();
   cpgfdmx.add({
     cpid: node.cpmcdata.id,
     xmmc: node.cpmcdata.text,
     cdid: node.cdmcdata.id,
     cdmc: node.cdmcdata.text,
     bzid: node.bzmcdata.id,
     bzmc: node.bzmcdata.text,
     jldw: "吨",
     khsl: 0,
     khzl: 0,
     sl: 0,
     zl: 0,
     je: 0,
     dj: node.bzmcdata.bydj,
     rate: node.bzmcdata.rate,
     byg: "",
     cg: "",
     gs: "",
   });



 }
 var cdmcCallBack = function (node) {
   var customerGrid = that.lookupReference("CpgfdmxGrid");
   var selection = customerGrid.getSelectionModel().getSelection()[0];
   selection.set("cdmc", node.data.text);
 };
 var bzmcCallBack = function (node) {
   var customerGrid = that.lookupReference("CpgfdmxGrid");
   var selection = customerGrid.getSelectionModel().getSelection()[0];
   //console.log("node", node);
   selection.set("bzmc", node.data.text);
   selection.set("bzid", node.data.id);
   selection.set("dj", node.data.bydj);
   selection.set("rate", node.data.rate);
   //console.log(selection.data.rate, selection.data.sl, selection.data.rate, "sl", selection);
   if (selection.data.khsl > 0) {
     selection.set("khzl", selection.data.khsl * node.data.rate);
   }

 };
 var cpmcCallBack = function (node) {
   var customerGrid = that.lookupReference("CpgfdmxGrid");
   var selection = customerGrid.getSelectionModel().getSelection()[0];
   selection.set("xmmc", node.data.text);
 };
 var gfdDeleteCallBack = function (th) {
   var p = th.lookupReference("gfdpopupWindow");
   p.close();
   th.locQuery();
   Ext.MessageBox.alert("提示！", "此过车单内容已作废！");
 };

 var addCpmcCallBack = function (node) {
   var rec = node.data;
   //console.log(rec);
   var p = that.popupmx;
   var cpgfdmx = that.lookupReference("CpgfdmxGrid").getStore();
   cpgfdmx.add({
     cpid: rec.id,
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
 var gfdshCallBack = function (th, ret) {
   var p = th.lookupReference("gfdpopupWindow");
   //   var mgfid = p.getViewModel().get('gfid');
   if (that.loc == "ok") {
     if (ret.zt == 1) {
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
             // //console.log("p=",p);
             PrintCpgfkdgfid(gfid);
           }
           p.close();
           that.locQuery();
         },
       });
     } else {
       Ext.MessageBox.alert("注意!", "数据审核成功！");
       p.close();
       that.locQuery(th);

     }
   } else {
     Ext.MessageBox.alert("提示！", "此单内容已作废！");

     p.close();
     that.locQuery();
   }
 };
 var cpgfdmxStore0;
 Ext.define("MyApp.view.main.cpgfkdgl.CpgfdkdshCtrl", {
   extend: "Ext.app.ViewController",
   alias: "controller.CpgfdkdshCtrl",
   requires: [
     "MyApp.view.main.cpgfkdgl.CpgfdkdshView",
     "MyApp.view.main.cpgfkdgl.CpgfdEdit",
     "MyApp.view.main.tree.WorkerSelectTree",
     "MyApp.view.main.report.PrintCpgfkd",
     "MyApp.view.main.tree.NewCpjkSelectTree",
     "MyApp.view.main.tree.CpTreeSelect"
   ],
   locQuery: function (the) {
     var v = that.viewname.getViewModel();
     var khid = v.get("khid");
     var ckid = v.get("ckid");
     sys_current_khid = khid;
     sys_current_ckid = ckid;
     cpgfdmxStore0.proxy.extraParams.loc = "wxcpgfdmxkdsh";
     cpgfdmxStore0.proxy.extraParams.khid = khid;
     if (sys_customer_id > 0) {
       cpgfdmxStore0.proxy.extraParams.khkd = 1;
     } else {
       cpgfdmxStore0.proxy.extraParams.khkd = 0;
     }
     cpgfdmxStore0.proxy.extraParams.p_l_id = sys_current_ckid;
     cpgfdmxStore0.reload();
     var tool = that.viewname.down("#QueryToolbarView");
     tool.down("#btnNew").setText("新单");
     tool.down("#btnNew").setDisabled(ckid == 0);
   },
   onBtnQueryClick: function (button, e, options) {
     this.locQuery(that);
     return false;
   },
   init: function () {
     that = this;
     that.viewname = that.getView().down("#CpgfdListGrid");
     var v = that.viewname.getViewModel();
     v.set("PageTitleName", "商品过车开单");
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
           read: sys_ActionPHP + "?act=wxCpgfdmxlist_pc",
         },
         actionMethods: {
           read: "GET",
         },
         extraParams: {
           loc: "wxcpgfdmxkdsh",
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
       var ckid = v.get('ckid');
       var store = that.viewname.getStore();
       store.proxy.extraParams.khid = khid;
       store.proxy.extraParams.p_l_id = ckid;
       store.proxy.extraParams.act = "wxCpgfdlist_pc";
       store.proxy.extraParams.loc = "wxcpgfdkdsh";
       if (sys_customer_id > 0) {
         store.proxy.extraParams.khkd = 1;
       } else {
         store.proxy.extraParams.khkd = 0;
       }

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
         click: that.PrintCpgfkd,
       },
       "#btnQueryKhmc": {
         click: this.onSelectKhbmView,
       },
       "#btnQueryCkmc": {
         click: this.onSelectCkbmView,
       },
       "#btnPrintCpgfd": {
         //click: this.onPrintCpgfd
         click: function () {
           PrintCpgfkdgfid(gfid);
         },
       },
       "#btnCpgfdDelete": {
         click: that.onCpgfdshDeleteSubmit,
       },
       "#FilterField": {
         change: this.onFilterChange,
       },
     });
     /* that.getView().down("#QueryKhmc").setHidden(false);
      if (sys_location_id > 0) {
        that.getView().down("#QueryKhmc").setHidden(false);
      } else {
        that.getView().down("#QueryKhmc").setHidden(true);
      }
      */
     var viewname = that.viewname;

     var v = viewname.getViewModel();


     if (sys_location_id > 0) {
       v.set("ckmc", sys_location_name);
       v.set("ckid", sys_location_id);
       sys_current_ckid = sys_location_id;
       sys_current_ckmc = sys_location_name;
       viewname.down("#QueryKhmc").setHidden(false);
       viewname.down("#QueryCkmc").setHidden(true);
     }
     if (sys_customer_id > 0) {
       v.set("khmc", sys_customer_name);
       v.set("khid", sys_customer_id);
       sys_current_khid = sys_customer_id;
       sys_current_khmc = sys_customer_name;
       viewname.down("#QueryKhmc").setHidden(true);
       viewname.down("#QueryCkmc").setHidden(false);
     }
     that.locQuery(that);
     var tool = that.viewname.down("#QueryToolbarView");
     tool.down("#btnNew").setText("新单");
     tool.down("#btnNew").setDisabled(true);
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
     ckid = that.viewname.getViewModel().get("ckid");
     var ckmc = that.viewname.getViewModel().get("ckmc");
     sys_current_ckid = ckid;
     sys_current_ckmc = ckmc;
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
     record["cnote"] = "";
     record["area"] = "";
     record["delbz"] = 0;
     record["gsop"] = false;
     record["khmc"] = khmc;
     record["ckmc"] = ckmc;
     record["ckid"] = ckid;
     record["kdrq"] = new Date();
     var todaysDate = new Date();
     todaysDate.setDate(todaysDate.getDate() + 2);
     todaysDate = new Date(Ext.Date.format(todaysDate, "Y-m-d"));
     record["endrq"] = todaysDate;
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
     //console.log("sys_current_khid", sys_current_khid, "sys_current_Ckid", sys_current_ckid);

     sys_current_khid = p.getViewModel().get("khid");

     sys_current_ckid = p.getViewModel().get("ckid");
     //console.log("sys_current_khid sys_current_ckid", sys_current_khid, sys_current_ckid);
     if (sys_current_khid == 0) {
       Ext.MessageBox.alert("提示！", "请先选择客户名称！");
       return;
     }
     if (sys_current_ckid == 0) {
       Ext.MessageBox.alert("提示！", "请先选择仓库名称！");
       return;
     }
     cpbmtreeSelect(AddgfcpCallBack);
     // treeSelect("cpmc", that, "", that.viewname, false, addCpmcCallBack);
     return false;

     var view = this.getView();
     this.dialog = view.add({
       xtype: "selectJkspWindow",
       session: true,
     });
     this.dialog.show();

     /* var v = that.viewname.getViewModel();
      var khid = v.get("khid");
      var ckid = v.get("ckid");*/
     //selectJkspTreeStore2

     var s = that.getView().down("#selectCdmcTreePanel2").getStore();
     // s= that.getView().down("#selectCdmcTreePanel2").getSelectionModel().getStore();
     //console.log("store", sys_current_ckid, sys_current_khid, s);
     s.proxy.extraParams.p_c_id = sys_current_khid;
     s.proxy.extraParams.p_l_id = sys_current_ckid;
     //s.reload();




     return false;
   },

   onJkspSelectOkClick: function () {
     ////console.log("onJkspTreeAdd", current_newid);
     var p = that.lookupReference("gfdpopupWindow").getViewModel();
     var selecttree = that.getView().down("#selectCdmcTreePanel");
     var sm = selecttree.getSelectionModel();
     var cpmc = "";
     var cpid = 0;
     var cdmc = "";
     var bzmc = "";

     if (sm.hasSelection()) {
       node = sm.getSelection()[0];
       if (node.data.leaf) {
         // p.set("cdid", node.data.id);
         // p.set("cdmc", node.data.text);
         cdmc = node.data.text;
         cpid = node.data.id;
       }
     }
     if (cdmc == "") {

       Ext.MessageBox.alert("注意！", "请选择商品产地名称！");
       return false;
     }

     selecttree = that.getView().down("#selectCdmcTreePanel1");
     sm = selecttree.getSelectionModel();
     if (sm.hasSelection()) {
       node = sm.getSelection()[0];
       if (node.data.leaf) {
         //p.set("cpid", node.data.id);
         //p.set("cpmc", node.data.text);
         cpmc = node.data.text;
       }
     }
     if (cpmc == "") {
       Ext.MessageBox.alert("注意！", "请选择商品名称！");
       return false;
     }
     selecttree = that.getView().down("#selectCdmcTreePanel2");
     sm = selecttree.getSelectionModel();
     node = null;
     if (sm.hasSelection()) {
       node = sm.getSelection()[0];
       if (!node.data.leaf) {
         Ext.MessageBox.alert("注意！", "请选择商品包装规格！");
         return false;
       }
     }


     /*p.set("bzmc", node.data.text);
        p.set("bzid", node.data.id);
        p.set("rate", node.data.rate);
        p.set("zljs", node.data.zljs);
        p.set("czdj", 0);
        p.set("phdj", 0);
        p.set("bydj", node.data.bydj);
        p.set("sldw", node.data.sldw);
        p.set("zldw", node.data.zldw);
        
          selection.set("bzmc", node.data.text);
  selection.set("bzid", node.data.id);
  selection.set("dj", node.data.bydj);
  selection.set("rate", node.data.rate);
        */
     if (node.data.zljs == 1) {
       var jldw = node.data.zldw;
     } else {
       var jldw = node.data.sldw;
     }


     var cpgfdmx = that.lookupReference("CpgfdmxGrid").getStore();
     cpgfdmx.add({
       cpid: cpid,
       xmmc: cpmc,
       jldw: jldw,
       cdmc: cdmc,
       bzmc: node.data.text,
       bzid: node.data.id,
       sl: 0,
       zl: 0,
       je: 0,
       dj: node.data.bydj,
       rate: node.data.rate,
       byg: "",
       cg: "",
       gs: "",
     });


     that.lookupReference("popupSelectJkspWindow").close();
     return;
   },

   onCpgfdmxShowView: function (button) {
     var rec = button.getWidgetRecord();
     gfid = rec.data.gfid;
     var record = rec.data;
     record["btnButtonHidden"] = false;
     record["op"] = "ywsh";
     record["gsop"] = false;
     record["title"] = "商品过车单-审核";
     record["w"] = 40;
     //console.log(record);
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
     cpgfdmx_store.proxy.extraParams.act = "wxCpgfdmxlist_pc";
     cpgfdmx_store.proxy.extraParams.loc = "wxcpgfdmxkdsh";
     cpgfdmx_store.reload();
     var p = that.lookupReference("gfdpopupWindow");

     //console.log("rec", record);
     const shrarray = record.khshr.split(';');

     var sh = shrarray.includes(sys_userInfo.username);

     p.down("#btnAddCpmc").setHidden(true);
     p.down("#btnDeleteCpmc").setHidden(!sys_system_del);
     p.down("#btnDeleteCpmc").setText("删除此单");
     p.down("#CpgfdFormSubmit").setHidden(!sys_system_sh || sh);
     p.down("#CpgfdFormSubmit").setText("审核此单");
     // p.down("#btnPrintCpgfd").setHidden(false);
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
   onSelectCkbmView: function (record) {
     treeSelect("ckmc", that, "", that.viewname, true);
     return false;
   },
   ckmcTriggerClick: function (record) {
     that.onBtnQueryClick();
     return false;
   },

   khmcTriggerClick: function (record) {
     that.onBtnQueryClick();
     return false;
   },
   onCpgfdFormSubmit: function () {
     var the = that;
     var p = the.lookupReference("gfdpopupWindow").getViewModel();
     gfid = p.data.gfid;
     if (gfid > 0) {
       var shr = p.get("khshr");
       var shrs = parseInt(p.get("shrs"));
       var data = {};
       data["gfid"] = gfid;
       var shrarray = [];
       if (shr != "") {
         var shrarray = shr.split(';');
       }
       if (shrarray.length + 1 >= shrs) {
         data["ztbz"] = 1;
       } else {
         data["ztbz"] = 0;
       }
       shrarray.push(sys_userInfo.username);
       data["shr"] = shrarray.join(';');
       var d = base64encode(Ext.encode(obj2str(data)))

       var msg = "过车单号：" + p.get("gfdh") + "<br>客户名称：" + p.get("khmc");
       var title = "真的审核通过此过车单内容？";
       that.loc = "ok";
       var abc = Ext.Msg.confirm(title, msg, function (e) {
         if (e == "yes") {
           AjaxDataSave("cpgfkdmxsave", "ok", d, gfdshCallBack, that);
         }
       });
       return;
     }
     var form = this.lookupReference("windowForm");
     if (!form.isValid()) {
       Ext.MessageBox.alert("注意！", "输入内容不完整！");
       return false;
     }
     var cpgfdmx_store = that.lookupReference("CpgfdmxGrid").getStore();
     if (cpgfdmx_store.getCount() == 0) {
       Ext.MessageBox.alert("注意！", "请输入过车商品明细数据！");
       return false;
     }
     if (p.data.khmc == "") {
       Ext.MessageBox.alert("注意！", "请选择客户名称！");
       return false;
     }
     cpgfdmx_store.each(function (rec) {
       if (rec.data.bzid == 0) {
         Ext.MessageBox.alert("注意！", "请完善过车商品的包装信息！");
         return false;
       }
     });
     var sumsl = 0,
       sumzl = 0,
       sumje = 0;
     var mx = [];
     if (gfid > 0) {
       cpgfdmx_store.each(function (rec) {
         rec.data.id = rec.data.mxid;
         sumsl = sumsl + rec.data.khsl;
         sumzl = sumzl + rec.data.khzl;
         //    sumje = sumje + rec.data.je;
         mx.push(rec.data);
       });
     } else {
       cpgfdmx_store.each(function (rec) {
         //    if (rec.data.zl > 0) {
         sumsl = sumsl + rec.data.khsl;
         sumzl = sumzl + rec.data.khzl;
         //  sumje = sumje + rec.data.je;
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
     gfd["ckid"] = p.data.ckid;
     gfd["ckmc"] = p.data.ckmc;
     gfd["gfid"] = gfid;
     gfd["khmc"] = p.data.khmc;
     gfd["area"] = p.data.area;
     gfd["cphm"] = p.data.cphm;
     gfd["sfr"] = p.data.sfr;
     gfd["cnote"] = p.data.cnote;
     gfd["gfdh"] = p.data.gfdh;
     gfd["kdrq"] = Ext.decode(Ext.encode(p.get("kdrq")));
     gfd["endrq"] = Ext.decode(Ext.encode(p.get("endrq")));
     gfd["rq"] = Ext.decode(Ext.encode(p.get("gfrq")));
     gfd["gfdmx"] = mx;
     //console.log(gfd);
     //return ;
     var str = obj2str(gfd);
     var encodedString = base64encode(Ext.encode(str));
     Ext.Ajax.request({
       method: "GET",
       url: sys_ActionPHP,
       params: {
         act: "cpgfkdmxsave",
         userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
         p_l_id: sys_current_ckid,
         loc: "",
         data: encodedString,
       },
       scope: this,
       success: function (response) {
         var result = Ext.decode(response.responseText);
         //  //console.log("result", result);
         if (result.result == "success") {
           Ext.MessageBox.alert("提示", "过车单已保存，单号是：" + result.dh);
           //that.DeletecpjkdAll(cpjkdmx_store, cpjkdcw_store, cpjkdje_store, jkdh);
           /*
                     var msg = "过车单已保存，单号是：" + result.dh + "</br>是否打印此商品过车单"
                     Ext.MessageBox.show({
                         title: "提示",
                         msg: msg,
                         buttons: Ext.MessageBox.YESNO,
                         buttonText: {
                             yes: "确认打印",
                             no: "放  弃"
                         },
                         icon: Ext.MessageBox["WARNING"],
                         scope: this,
                         fn: function (btn, text) {
                             if (btn == "yes") {
                                 PrintCpgfkdgfid(result.gfid);
                             }
                             that.getView().down("#cpgfdedit").close();
                             that.locQuery(that);
                         }
                     });
                     */
           that.getView().down("#cpgfdedit").close();
           that.locQuery(that);
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
       var msg = "过车单号：" + p.get("gfdh") + "<br>客户名称：" + p.get("khmc");
       var title = "真的删除此过车单内容？";
       that.loc = "delete";
       var abc = Ext.Msg.confirm(title, msg, function (e) {
         if (e == "yes") {
           AjaxDataSave("cpgfkdmxsave", "delete", gfid, gfdDeleteCallBack, that);
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
   //  onPrintCpgfd: function () {
   //    var p = that.lookupReference('gfdpopupWindow').getViewModel();
   //    PrintCpgfkdgfid(p.get('gfid'));
   //   return;
   // },
   sumje: function () {
     var customerGrid = that.lookupReference("CpgfdmxGrid");
     var store = customerGrid.getStore();
     var v = that.lookupReference("gfdpopupWindow").getViewModel();
     v.set("khsl", store.sum("khsl"));
     v.set("khzl", store.sum("khzl"));

     /*v.set("je", store.sum("je"));
     //        //console.log(v.get('sl'), v.get('zl'), v.get('je'));
     if (v.get("xjbz")) {
       v.set("xjje", v.get("je"));
     } else {
       v.set("xjje", 0);
     }*/
   }
 });