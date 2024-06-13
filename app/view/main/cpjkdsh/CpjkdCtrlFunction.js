Ext.define("MyApp.view.main.cpjkdsh.CpjkdCtrlFunction", {
  extend: "Ext.Mixin",
});
function cpjkWorkerSelectOkClick(the) {
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
  // var selection = that.recordID;
  //if (selection != undefined) {
  //    selection.set('gs', gs.join(';'));
  //    selection.set('byg', by.join(';'));
  //    selection.set('cg', cg.join(';'));
  that.getView().down("#selectWorkerWindow").close();
  //}
  //console.log("jkdrecord", that.mainrecord, the.mainrecord);
  var cpjkd = {};
  var arrayjemx = [];
  var jemx = {};
  jemx["byg"] = by.join(";");
  jemx["gs"] = gs.join(";");
  jemx["cg"] = cg.join(";");
  jemx["jeid"] = that.recordID.data.jeid;
  arrayjemx.push(jemx);
  cpjkd["cpjkdje"] = arrayjemx;
  var str = obj2str(cpjkd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpjkdjesave",
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
        //var store = the.lookupReference("CpjkdmxGrid").getStore();
store=cpjkdmxStore;
//var store = the.up("#CpjkdmxGrid").getStore();
        store.proxy.extraParams.loc = the.locname;
        //store.proxy.extraParams.khid =the.mainrecord.data.khid ;
        store.proxy.extraParams.jkid = the.mainrecord.jkid;
        store.reload();
        //cpjkdmxStore.reload();
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
function imagesload(id) {
  var p = that.lookupReference("popupCpjkdWindow").getViewModel();
  var id = p.get("jkid");
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "imagesload",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      dhlb: "cpjkd",
      dhid: id,
    },
    scope: that,
    success: function (req) {
      var data = req.responseText;
      var cnote = "";
      data = data.substring(1);
      var obj = JSON.parse(data);
      // //console.log(obj);
      if (obj.results > 0) {
        ////console.log(obj.rows);
        var arrrec = obj.rows;
        that.lookupReference("popupCpjkdWindow").down("#imageShow").removeAll();
        arrrec.forEach(function (rec) {
          cnote = trim(rec.imgnote);
          if (cnote.length > 0) {
            var cnote = Ext.decode(base64decode(cnote));
          }
          //  //console.log("rec",rec);
          //that.creatOneImage(rec.id, rec.filename, rec.fileguid, cnote, rec.w, rec.h, true);
          creatOneImage(
            rec.id,
            rec.filename,
            rec.fileguid,
            cnote,
            rec.w,
            rec.h,
            true
          );
        });
      }
    },
    failure: function () {
      Ext.MessageBox.alert("错误!", "发生错误！");
    },
  });
}
function creatOneImage(id, title, pjg, cnote, w, h, delbz) {
  //  //console.log(title,pjg);
  if (w > 400) {
    h = (h * 400) / w;
    w = 400;
  }
  if (h > 300) {
    w = (w * 300) / h;
    h = 300;
  }
  var s = that.lookupReference("popupCpjkdWindow").down("#imageShow");
  ////console.log(title,pjg,s);
  var boximage = Ext.create("Ext.container.Container", {
    items: [
      {
        xtype: "panel",
        title: title,
        margin: "10,10,10,10 ",
        layout: {
          type: "hbox",
          align: "stretch",
        },
        border: 1,
        tools: [
          {
            xtype: "button",
            text: "",
            icon: "images/delete.gif",
            hidden: !delbz,
            handler: function () {
              // //console.log("handler");
              //that.imagesdelete(id, pjg);
              imagesdelete(id, pjg);
            },
          },
        ],
        items: [
          {
            xtype: "panel",
            height: 300,
            width: 400,
            border: 1,
            items: [
              {
                xtype: "box",
                height: h,
                width: w,
                //margin: "10,10,10,10 ",
                title: "box",
                autoEl: {
                  tag: "img",
                  src: "uploadFiles//" + pjg,
                },
              },
            ],
          },
          {
            xtype: "panel",
            flex: 1,
            layout: "fit",
            border: 1,
            html: cnote,
          },
        ],
      },
    ],
  });
  s.add(boximage);
  return;
}
function imagesdelete(imgid, imgfile) {
  // //console.log(imgid, imgfile);
  var abc = Ext.Msg.confirm("注意！ ", "真的删除此图片吗？", function (e) {
    if (e == "yes") {
      Ext.Ajax.request({
        method: "GET",
        url: "upload.php",
        params: {
          act: "imgdelete",
          imgid: imgid,
          imgfile: imgfile,
        },
        scope: that,
        success: function (f, a) {
          var result = Ext.decode(f.responseText);
          if (result.success) {
            imagesload();
          } else {
            Ext.Msg.alert("注意", result.msg);
          }
          return;
        },
        failure: function (f, a) {
          Ext.Msg.alert("失败", a.result.msg);
        },
      });
    }
  });
}
function onImagesAdd() {
  var p = that.lookupReference("popupCpjkdWindow").getViewModel();
  var jkid = p.get("jkid");
  uploadFile("cpjkd", jkid, uploadCallBack);
  return false;
}
function uploadCallBack(rec) {
  var cnote = trim(rec.imgnote);
  if (cnote.length > 0) {
    var cnote = Ext.decode(base64decode(cnote));
  }
  creatOneImage(rec.id, rec.filename, rec.fileguid, cnote, rec.w, rec.h, true);
}
/*
function SelectKhbmView(record) {
    treeSelect('khmc', that, '', that.viewname, true);
    return false;
};
function SelectCkbmView(record) {
    treeSelect('ckmc', that, '', that.viewname, true);
    return false;
};
function onPrintCpjkd() {
    var p = that.lookupReference('popupCpjkdWindow').getViewModel();
    PrintCpjkdJkid(p.get('jkid'));
    return;
}
*/
/*
function SelectWorkerView(button) {
    var rec = button.getWidgetRecord();
    if (rec.data.jeid == 0) {
        return;
    }
    that.recordID = rec;
    var view = that.getView();
    that.dialog = view.add({
        xtype: 'selectWorkerWindow',
        session: true
    });
    that.dialog.show();
};
function cpjkWorkerSelectOkClick() {
    var names = [];
    var by = [];
    var gs = [];
    var cg = [];
    var records = that.getView().down("#selectWorkerTreePanel").getChecked();
    Ext.Array.each(records, function (rec) {
        names.push(rec.get('text'));
        switch (rec.get('pname')) {
            case '机械':
                gs.push(rec.get('text'));
                break;
            case '搬运':
                by.push(rec.get('text'));
                break;
            default:
                cg.push(rec.get('text'));
                break;
        }
    });
    records = that.getView().down("#selectWorkerTreePanel1").getChecked();
    Ext.Array.each(records, function (rec) {
        names.push(rec.get('text'));
        switch (rec.get('pname')) {
            case '机械':
                gs.push(rec.get('text'));
                break;
            case '搬运':
                by.push(rec.get('text'));
                break;
            default:
                cg.push(rec.get('text'));
                break;
        }
    });
    records = that.getView().down("#selectWorkerTreePanel2").getChecked();
    Ext.Array.each(records, function (rec) {
        names.push(rec.get('text'));
        switch (rec.get('pname')) {
            case '机械':
                gs.push(rec.get('text'));
                break;
            case '搬运':
                by.push(rec.get('text'));
                break;
            default:
                cg.push(rec.get('text'));
                break;
        }
    });
    var selection = that.recordID;
    if (selection != undefined) {
        selection.set('gs', gs.join(';'));
        selection.set('byg', by.join(';'));
        selection.set('cg', cg.join(';'));
        that.getView().down("#selectWorkerWindow").close();
    }
};
*/
