Ext.define("MyApp.view.main.cpckgl.CpckdCtrlFunction", {
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
function cpckWorkerSelectOkClick(the) {
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
  var cpckd = {};
  var arrayjemx = [];
  var jemx = {};
  jemx["byg"] = by.join(";");
  jemx["gs"] = gs.join(";");
  jemx["cg"] = cg.join(";");
  jemx["jeid"] = that.recordID.data.jeid;
  arrayjemx.push(jemx);
  cpckd["cpckdje"] = arrayjemx;
  var str = obj2str(cpckd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpckdjesave",
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
        var store = the.lookupReference("CpckdmxGrid").getStore();
        store.reload();
        //cpckdmxStore.reload();
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
function onCpckdmxShEdit(button) {
  var rec = button.getWidgetRecord();
  var ckid = rec.data.ckid;
  var record = rec.data;
  //console.log(record);
  record["op"] = "cksh";
  record["gsop"] = false;
  record["w"] = 40;
  record["btnButtonHidden"] = false;
  record["title"] = "商品出库数据补录入";
  var view = this.getView();
  this.isEdit = false; // !!record;
  this.dialog = view.add({
    xtype: "formmxwindow",
    viewModel: {
      data: record,
    },
    session: true,
  });
  this.dialog.show();
  /*var cpckdmx_store = this.lookupReference('CpckdmxGrid').getStore();
    cpckdmx_store.proxy.extraParams.ckid = ckid;
    cpckdmx_store.load();        
    
    var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
    cpckdcw_store.proxy.extraParams.ckid = ckid;
    cpckdcw_store.proxy.extraParams.loc = 'ckid';
    cpckdcw_store.load();
    
    this.onGridReload();
    */
}
function onPrintCpckd() {
  var p = that.lookupReference("popupCpckdWindow").getViewModel();
  PrintCpckdckid(p.get("ckid"));
  /*
            var ckid = p.get('ckid');
            if (ckid == 0) {
                return;
            }
            var cpckdmx_store = that.lookupReference('CpckdmxGrid').getStore();
            var mxrec = [];
            var gsbyrec = {};
            var i = 0;
            var sumsl = 0, sumzl = 0, sumje = 0,sumxjje = 0;
            cpckdmx_store.each(function (rec) {
                sumxjje = sumxjje + rec.data.xjje;
                sumje = sumje + rec.data.ccje;
                if (rec.data.jeid == 0) {
                    sumsl = sumsl + rec.data.ccsl;
                    sumzl = sumzl + rec.data.cczl;
    
                }
    
                mxrec.push(rec.data);
                i = i + 1
                // }
            })
                gsbyrec = {};
                gsbyrec["cdmc"] = "";
                gsbyrec["cpmc"] = "";
                gsbyrec["bzmc"] = "";
                gsbyrec["cpgg"] = "";
                gsbyrec["jldw"] = "";
                gsbyrec["ccsl"] = 0;
                gsbyrec["cczl"] =0;
                gsbyrec["czdj"] = 0;
                gsbyrec["ccje"] = 0;
                gsbyrec["xjje"] = 0;
                gsbyrec["sm"] = "";
                gsbyrec["cpph"] = "";
                mxrec.push(gsbyrec);
    
            for (var j = i; j < 5; j++) {
                gsbyrec = {};
                gsbyrec["cdmc"] = "";
                gsbyrec["cpmc"] = "";
                gsbyrec["bzmc"] = "";
                gsbyrec["cpgg"] = "";
                gsbyrec["jldw"] = "";
                gsbyrec["ccsl"] = 0;
                gsbyrec["cczl"] = 0;
                gsbyrec["czdj"] = 0;
                gsbyrec["ccje"] = 0;
                gsbyrec["xjje"] = 0;
                gsbyrec["sm"] = "";
                gsbyrec["cpph"] = "";
                mxrec.push(gsbyrec);
            }
    
            var ckd = {};
            ckd["ckid"] = p.get('ckid');
            ckd["khmc"] = trim(p.get('khmc'));
            ckd["ckdh"] = p.get('ckdh');
            ckd["ckrq"] = Ext.Date.format(p.get('ckrq'), 'Y-m-d');
            ckd["xsrq"] = Ext.Date.format(p.get('xsrq'), 'Y-m-d');
            ckd["xsdh"] = p.get('xsdh');
            ckd["cphm"] = p.get('cphm');
            ckd["cpph"] = p.get('cpph');
            ckd["sfr"] = p.get('sfr');
            ckd["czy"] = p.get('czy');
            ckd["shr"] = p.get('shr');
            ckd["cwsh"] = p.get('cwsh');
            ckd["cgy"] = p.get('cgy');
            ckd["address"] = p.get('address');
            ckd["ckmc"] = p.get('ckmc');
            ckd["cnote"] = p.get('cnote');
            ckd["mxrec"] = mxrec;
            ckd["ccje"] = sumje;
            ckd["xjje"] = sumxjje;
            ckd["ccsl"] = sumsl;
            ckd["cczl"] = sumzl;
    
            printcpckd(ckd);*/
}
/*
function AjaxDataSave(act,loc,data,CallBackFunction,the) {
					//console.log("开始数据保存！");
			Ext.Ajax.request({
				method: 'GET',
				url: sys_ActionPHP,
				params: {
					act: act,
					loc: loc,
					p_l_id:sys_location_id,
					userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
					data: data
				},
				scope: that,
				success: function (response) {
					
					var result = Ext.decode(response.responseText);
					//console.log("数据保存:",result.result);
					if (result.result == 'success') {
                        //console.log("call back:",CallBackFunction);	
                      
                        CallBackFunction(the);    
					
					}
					else {
						Ext.MessageBox.alert('错误!', '数据保存失败！');
					}
				},
				failure: function () {
					Ext.MessageBox.alert('错误!', '发生错误！');
				}
			});
};
*/
