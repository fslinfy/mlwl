﻿Ext.define("MyApp.view.main.cptzdgl.CptzdCtrlFunction", {
  extend: "Ext.Mixin",
});
function onPrintCptzd() {
  var p = that.lookupReference("popupmxShowWindow").getViewModel();
  var tzid = p.get("tzid");
  if (tzid == 0) return;
  var cptzdmx_store = that.lookupReference("cptzdmxShowGrid").getStore();
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  var sumsl = 0,
    sumzl = 0,
    sumje = 0;
  cptzdmx_store.each(function (rec) {
    sumje = sumje + rec.data.tzje;
    if (rec.data.mxdh == "1") {
      sumsl = sumsl + rec.data.tzsl;
      sumzl = sumzl + rec.data.tzzl;
    }
    mxrec.push(rec.data);
    i = i + 1;
  });
  gsbyrec = {};
  gsbyrec["cdmc"] = "";
  gsbyrec["cpmc"] = "";
  gsbyrec["bzmc"] = "";
  gsbyrec["cpgg"] = "";
  gsbyrec["jldw"] = "";
  gsbyrec["tzsl"] = 0;
  gsbyrec["tzzl"] = 0;
  gsbyrec["tzje"] = 0;
  gsbyrec["cw"] = "";
  gsbyrec["sm"] = "";
  gsbyrec["cpph"] = "";
  gsbyrec["czdj"] = 0;
  gsbyrec["czrq"] = "";
  gsbyrec["newcw"] = "";
  gsbyrec["newsm"] = "";
  gsbyrec["newcpph"] = "";
  gsbyrec["newczdj"] = 0;
  gsbyrec["newrq"] = "";
  mxrec.push(gsbyrec);
  for (var j = i; j < 5; j++) {
    gsbyrec = {};
    gsbyrec["cdmc"] = "";
    gsbyrec["cpmc"] = "";
    gsbyrec["bzmc"] = "";
    gsbyrec["cpgg"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["tzsl"] = 0;
    gsbyrec["tzzl"] = 0;
    gsbyrec["tzje"] = 0;
    gsbyrec["cw"] = "";
    gsbyrec["sm"] = "";
    gsbyrec["cpph"] = "";
    gsbyrec["czdj"] = 0;
    gsbyrec["czrq"] = "";
    gsbyrec["newcw"] = "";
    gsbyrec["newsm"] = "";
    gsbyrec["newcpph"] = "";
    gsbyrec["newczdj"] = 0;
    gsbyrec["newrq"] = "";
    mxrec.push(gsbyrec);
  }
  var tzd = {};
  tzd["tzid"] = p.get("tzid");
  tzd["khmc"] = trim(p.get("khmc"));
  tzd["newkhmc"] = trim(p.get("newkhmc"));
  tzd["jekh"] = p.get("jekh");
  tzd["tzje"] = p.get("tzje");
  tzd["tzdh"] = p.get("tzdh");
  tzd["tzrq"] = Ext.Date.format(p.get("tzrq"), "Y-m-d");
  tzd["czy"] = p.get("czy");
  tzd["shr"] = p.get("shr");
  tzd["cwsh"] = p.get("cwsh");
  tzd["cgy"] = p.get("cgy");
  tzd["ckmc"] = p.get("ckmc");
  tzd["cnote"] = p.get("cnote");
  tzd["mxrec"] = mxrec;
  tzd["tzje"] = sumje;
  tzd["tzsl"] = sumsl;
  tzd["tzzl"] = sumzl;
  printcptzd(tzd);
}
