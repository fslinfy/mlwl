Ext.define("MyApp.view.main.report.PrintCptzd", {
  extend: "Ext.Mixin",
});
function printcptzd(p) {
  if (!LODOP) {
    // console.log("lodop not readly!");
    return;
  }
  console.log(p);
  var mx = p.mxrec;
  LODOP.PRINT_INIT("调账单");
  var str =
    "<style>table,th{border:none;height:22px;align:left;} td{border: 1px solid #000;height:20px}</style>";
  str =
    str +
    '<table border=0 cellSpacing=0 cellPadding=0  width="100%"  bordercolor="#000000" style="border-collapse:collapse">';
  str =
    str +
    '<caption><br><b><font face="黑体" size="4">' +
    sys_enterprise_name +
    "</font></b></caption>";
  str =
    str +
    '<caption><br><b><font face="黑体" size="5">商品调账单</font></b></caption>';
  str = str + "<thead>";
  str = str + '<tr><th width="100%" colspan="14"></th></tr>';
  str =
    str +
    '<tr><th width="100%" colspan="14"><table width="100%" border=0 ><tr>';
  str =
    str +
    '<td style="text-align:left;border:0;width:70;" >客户名称:</td><td style="text-align:left;border:0;"><strong>' +
    p.khmc +
    "</strong></td>";
  str =
    str +
    '<td style="text-align:left;border:0;width:70;" >调账仓库:</td><td style="text-align:left;border:0;"><strong>' +
    p.ckmc +
    "</strong></td>";
  str =
    str +
    '<td style="text-align:left;border:0;width:30;" >No:</td><td style="text-align:left;border:0;width:120;"><strong>' +
    p.tzdh +
    "</strong></td></tr></table></th></tr>";
  str =
    str +
    '<tr><th width="100%" colspan="14"><table width="100%" border=0 ><tr>';
  str =
    str +
    '<td style="text-align:left;border:0;width:70;" >调入客户:</td><td style="text-align:left;border:0;"><strong>' +
    p.newkhmc +
    "</strong></td>";
  str =
    str +
    '<td style="text-align:left;border:0;width:70;" >调账费用:</td><td style="text-align:left;border:0;"><strong>' +
    p.tzje +
    "</strong></td>";
  if (p.jekh) {
    str =
      str +
      '<td style="text-align:left;border:0;width:60;">支付方:</td><td style="text-align:left;border:0;"><strong>调入方</strong></td>';
  } else {
    str =
      str +
      '<td style="text-align:left;border:0;width:60;">支付方:</td><td style="text-align:left;border:0;"><strong>调出方</strong></td>';
  }
  str =
    str +
    '<td style="text-align:right;border:0;width:70;">调账日期:</td><td style="text-align:left;border:0;width:120;" ><strong>' +
    p.tzrq +
    p.rq.substr(10, 6) +
    "</strong></td></tr></table></th></tr>";
  //str = str + '<td style="text-align:left;border:0;width:70;" >ymmt日期:</td><td  style="text-align:left;border:0;width:90;"><strong>' + p.xsrq + '</strong></td>   </tr></table></th></tr>';
  //表头
  str = str + "<tr>";
  str = str + '<td  style="text-align:center;" ><strong>产地</strong></td>';
  str = str + '<td  style="text-align:center;" ><strong>商品名称</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>规格型号</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>包装</strong></td>';
  str =
    str + '<td  style="text-align:center;width:35;"><strong>单位</strong></td>';
  str =
    str +
    '<td  style="text-align:center;width:50;"><strong>数 量</strong></td>';
  str =
    str +
    '<td  style="text-align:center;width:60;"><strong>重 量</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>仓位</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>批号</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>单价</strong></td>';
  str =
    str +
    '<td  style="text-align: center;width:80;"><strong>进库日期</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>说明</strong></td>';
  //str = str + '<td  style="width:68;text-align:center;"><strong>注</strong>';
  str = str + "</td></tr></thead>";
  str = str + "<tbody>";
  mx.forEach(function (rec) {
    if (rec.mxdh == "1") {
      str = str + '<tr><td rowspan="2">' + trim(rec.cdmc) + "</td>";
      str = str + '<td rowspan="2">' + trim(rec.cpmc) + "</td>";
      str = str + '<td rowspan="2">' + trim(rec.cpgg) + "</td>";
      str = str + '<td rowspan="2">' + trim(rec.bzmc) + "</td>";
      str =
        str +
        '<td rowspan="2" style="text-align:center;">' +
        trim(rec.jldw) +
        "</td>";
      str =
        str +
        '<td rowspan="2" style="text-align:right;">' +
        printsl(rec.tzsl) +
        " </td>";
      str =
        str +
        '<td rowspan="2" style="text-align:right;">' +
        printsl(rec.tzzl) +
        " </td>";
      str = str + '<td style="text-align:center;">' + trim(rec.cw) + "</td>";
      str = str + "<td>" + trim(rec.cpph) + "</td>";
      str =
        str + '<td  style="text-align:center;">' + printsl(rec.czdj) + "</td>";
      str =
        str +
        '<td  style="text-align:center;">' +
        Ext.Date.format(rec.czrq, "Y-m-d") +
        "</td>";
      str = str + '<td  style="text-align:right;">' + rec.sm + "</td></tr>";
      str = str + "<tr>";
      str = str + '<td style="text-align:center;">' + trim(rec.newcw) + "</td>";
      str = str + "<td>" + trim(rec.newcpph) + "</td>";
      str =
        str +
        '<td  style="text-align:center;">' +
        printsl(rec.newczdj) +
        "</td>";
      str =
        str +
        '<td  style="text-align:center;">' +
        Ext.Date.format(rec.newczrq, "Y-m-d") +
        "</td>";
      // console.log(rec.czrq, rec.newczrq);
      str = str + '<td  style="text-align:right;">' + rec.newsm + "</td></tr>";
    } else {
      str = str + "<tr><td ></td>";
      str = str + "<td ></td>";
      str = str + "<td >" + trim(rec.cpgg) + "</td>";
      str = str + "<td >" + trim(rec.bzmc) + "</td>";
      str = str + '<td  style="text-align:center;">' + trim(rec.jldw) + "</td>";
      str =
        str +
        '<td  style="text-align:right;">' +
        slrenderer(rec.tzsl) +
        "</td>";
      str =
        str +
        '<td  style="text-align:right;">' +
        slrenderer(rec.tzzl) +
        "</td>";
      str = str + "<td>" + trim(rec.cw) + "</td>";
      str = str + "<td>" + trim(rec.cpph) + "</td>";
      str =
        str +
        '<td  style="text-align:center;">' +
        slrenderer(rec.czdj) +
        "</td>";
      str =
        str +
        '<td  style="text-align:right;">' +
        slrenderer(rec.tzje) +
        "</td>";
      str = str + '<td  style="text-align:right;"></td></tr>';
    }
    // str = str + '<td  style="text-align:right;">' + trim(rec.sm) + '</td></tr>';
  });
  str =
    str +
    '<tr><td style="text-align:center;">汇总 </td><td  style="text-align:left;"  colspan="3"><strong>' +
    lowMoneyToUp(p.tzje) +
    "</strong></td>";
  str =
    str +
    '<td></td><td style="text-align:right;"><strong>' +
    slrenderer(p.tzsl, 0) +
    '</strong></td><td style="text-align:right;"><strong>' +
    slrenderer(p.tzzl, 0) +
    "</strong></td>";
  str =
    str +
    '<td></td><td></td><td style="text-align:center;"></td><td  style="text-align:right;"><strong>' +
    slrenderer(p.tzje) +
    "</strong></td><td></td></tr>";
  str = str + '<tr height="50" ><td  style="text-align:left;"  colspan="12">';
  str = str + '<table  style="font-size:15px;" width="100%" border="0">';
  str =
    str +
    '<tr><td style="width:42;border:0; " >备注:</td><td style="border:0;"  >' +
    p.cnote +
    "</td></tr></table>";
  str = str + "</td></tr>";
  str = str + "</tbody>";
  str = str + "<tfoot>";
  //str = str + '<tr><th width="100%" colspan="14"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:20%;" >制单:' + p.czy + '</td><td  style="text-align:left;border:0;width:20%;">业务:' + p.shr + '</td><td  style="text-align:left;border:0;width:20%;">财务:' + p.cwsh + '</td><td  style="text-align:left;border:0;width:20%;">仓库:' + p.cgy + '</td><td  style="text-align:left;border:0;width:20%;">打印:' +sys_userInfo.username + '</td></tr></table></th></tr>'
  str =
    str +
    '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:20%;" >制单:' +
    p.czy +
    "</td>";
  str =
    str +
    '<td  style="text-align:left;border:0;width:20%;">审核:' +
    p.shr +
    "</td>";
  str = str + '<td  style="text-align:left;border:0;width:20%;">仓管员:</td>';
  str = str + '<td  style="text-align:left;border:0;width:20%;">叉车员:</td>';
  str =
    str +
    '<td  style="text-align:left;border:0;width:20%;">搬运员:</td></tr></table></th></tr>';
  // str = str + '<tr><th width="100%" colspan="14"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:42;" >备注:</td><td  style="text-align:left;border:0;">' + p.cnote + '</td></tr></table></th></tr>'
  str = str + "<tr><th ></th></tr>";
  str = str + "</tfoot></table>";
  LODOP.ADD_PRINT_TABLE(5, 5, "98%", 260, str);
  LODOP.SET_PRINT_STYLEA(0, "Top2Offset", -80); //这句可让次页起点向上移
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.tzdh);
  if (p.delbz) {
    LODOP.ADD_PRINT_TABLE(
      80,
      900,
      130,
      30,
      '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>'
    );
  }
  //LODOP.SET_SAVE_MODE("FILE_PROMPT",false);
  //LODOP.SAVE_TO_FILE('testtzd.xls')
  LODOP.PREVIEW();
}
function onPrintCptzd() {
  var p = that.lookupReference("popupmxShowWindow").getViewModel();
  var tzid = p.get("tzid");
  PrintCptzdtzid(tzid);
}
function PrintCptzdtzid(tzid) {
  // console.log("PrintCptzdtzid", tzid)
  if (tzid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }
  var prttzmxStore = Ext.create("Ext.data.Store", {
    alias: "store.cptzdmxStore",
    model: "MyApp.model.CptzdmxModel",
    proxy: {
      type: "ajax",
      api: {
        read: sys_ActionPHP + "?act=Cptzdmxlist_pc",
      },
      actionMethods: {
        read: "GET",
      },
      extraParams: {
        loc: "cptzdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        tzid: tzid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id,
      },
      reader: {
        type: "json",
        rootProperty: "rows",
      },
    },
  });
  var prttzStore = Ext.create("Ext.data.Store", {
    alias: "store.cptzdStore",
    model: "MyApp.model.CptzdModel",
    proxy: {
      type: "ajax",
      api: {
        read: sys_ActionPHP + "?act=Cptzdlist_pc",
      },
      actionMethods: {
        read: "GET",
      },
      extraParams: {
        loc: "cptzdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        tzid: tzid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id,
      },
      reader: {
        type: "json",
        rootProperty: "rows",
      },
    },
  });
  prttzmxStore.on("load", function () {
    prttzStore.load();
  });
  prttzStore.on("load", function () {
    prttzd(prttzStore, prttzmxStore);
  });
  prttzmxStore.load();
}
function prttzd(prttzStore, prttzmxStore) {
  //console.log("Prttzd")
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  prttzStore.each(function (p) {
    var sumsl = 0,
      sumzl = 0,
      sumje = 0;
    prttzmxStore.each(function (rec) {
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
    /*
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
    */
    var tzd = p.data;
    tzd["tzrq"] = Ext.Date.format(p.data.tzrq, "Y-m-d");
    tzd["mxrec"] = mxrec;
    tzd["tzje"] = sumje;
    tzd["tzsl"] = sumsl.toFixed(3);
    tzd["tzzl"] = sumzl.toFixed(3);
    console.log("tzd", tzd);
    printcptzd(tzd);
  });
}
