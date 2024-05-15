Ext.define("MyApp.view.main.report.PrintCpgfd", {
  extend: "Ext.Mixin",
});
function printcpgfd(p) {
  if (!LODOP) {
    console.log("lodop not readly!");
    return;
  }
  // console.log("p",p);
  var mx = p.mxrec;
  LODOP.PRINT_INIT("过货单");
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
    '<caption><br><b><font face="黑体" size="5">商品过货单</font></b></caption>';
  str = str + "<thead>";
  upje = "";
  str =
    str +
    '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;"></td><td style="text-align:left;border:0;width:130;" ><strong></strong></td></tr></table></th></tr>';
  if (p.xjje > 0) {
    //  upje=lowMoneyToUp(p.ccje + p.xjje) + '(' + slrenderer(p.ccje + p.xjje) + '元)'
    str =
      str +
      '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;"></td><td style="border:0;width:130;color:red; " ><strong>作业费用即结</strong></td></tr></table></th></tr>';
  }
  //str = str + '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td style="text-align:left;border:0;width:70;" >客户名称:</td><td style="text-align:left;border:0;"><strong>' + p.khmc + '</strong></td><td style="text-align:left;border:0;width:30;">No:</td><td style="text-align:left;border:0;width:120;" ><strong>' + p.gfdh + '</strong></td></tr></table></th></tr>'
  str =
    str +
    '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td style="border:0;width:70;" >客户名称:</td><td style="text-align:left;border:0;"><strong>' +
    p.khmc +
    "</strong></td>";
  //????if (p.xjbz) {
  //  str = str + '<td style="text-align:cnter;border:0;width:150;" ><strong>  此单现付！     </strong></td>'
  // }
  // else {
  str =
    str +
    '<td style="text-align:cnter;border:0;width:150;" ><strong>               </strong></td>';
  // }
  str =
    str +
    '<td style="text-align:left;border:0;width:30;">No:</td><td style="text-align:left;border:0;width:120;" ><strong>' +
    p.gfdh +
    "</strong></td></tr></table></th></tr>";
  str =
    str +
    '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td style="border:0;width:70;" >过货仓库:</td><td style="text-align:left;border:0;"><strong>' +
    p.ckmc +
    "</strong></td>";
  str =
    str +
    '<td style="text-align:right;border:0;width:50;">日期:</td><td style="text-align:left;border:0;width:120;" ><strong>' +
    p.gfrq +
    p.rq.substr(10, 6) +
    "</strong></td></tr></table></th></tr>";
  //表头
  str =
    str +
    '  <tr><strong><td  style="text-align:center;" ><strong>产地</strong></td>';
  str = str + '<td  style="text-align:center;" ><strong>商品名称</strong></td>';
  str =
    str +
    '<td  style="text-align:center;width:50;" ><strong>单位</strong></td>';
  str =
    str + '<td  style="text-align:center;width:80;"><strong>数量</strong></td>';
  str =
    str +
    '<td  style="text-align:center;width:80;"><strong>重量(吨)</strong></td>';
  //str = str + '<td  style="text-align:center;width:80;"><strong>单价</strong></td>';
  str =
    str +
    '<td  style="text-align:center;width:80;"><strong>金额</strong></td></strong></tr>';
  str = str + "</thead>";
  str = str + "<tbody>";
  mx.forEach(function (rec) {
    str =
      str +
      "<tr><td>" +
      rec.cdmc +
      "</td><td>" +
      rec.xmmc +
      '</td><td style="text-align:center;" >' +
      trim(rec.jldw) +
      '</td><td style="text-align:right;">' +
      slrenderer(rec.sl) +
      '</td><td  style="text-align:right;">' +
      slrenderer(rec.zl) +
      '</td><td  style="text-align:right;">' +
      slrenderer(rec.je) +
      "</td></tr>";
  });
  str =
    str +
    '  <tr><strong><td  style="text-align:center;">汇总 </td><td  style="text-align:left;"  colspan="2"><strong>' +
    lowMoneyToUp(p.je) +
    '</strong></td><td  style="text-align:right;"><strong>' +
    slrenderer(p.sl) +
    '</strong></td><td style="text-align:right;"><strong>' +
    slrenderer(p.zl) +
    '</strong></td><td  style="text-align:right;">' +
    slrenderer(p.je) +
    "</td></strong></tr>";
  str = str + '<tr height="50" ><td  style="text-align:left;"  colspan="6">';
  str = str + '<table  style="font-size:15px;" width="100%" border="0">';
  str =
    str +
    '<tr><td style="text-align:left;width:75;border:0; " >车牌号码:</td><td  style="text-align:left;border:0;width:40%;" ><strong>' +
    p.cphm +
    "</strong></td>";
  str =
    str +
    '<td style="text-align:right;width:75;border:0;"  >司机姓名:</td><td style="text-align:left;border:0;" ><strong>' +
    p.sfr +
    "</strong></td></tr></table>";
  str = str + "</td></tr>";
  str = str + '<tr height="50" ><td  style="text-align:left;"  colspan="6">';
  str = str + '<table  style="font-size:15px;" width="100%" border="0">';
  str =
    str +
    '<tr><td style="width:42;border:0; " >备注:</td><td style="border:0;"  >' +
    p.cnote +
    "</td></tr></table>";
  str = str + "</td></tr>";
  str = str + "</tbody>";
  str = str + "<tfoot>";
  // str = str + '<tr><th width="100%" colspan="7"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:42;" >备注:</td><td  style="text-align:left;border:0;">' + p.cnote + '</td></tr></table></th></tr>'
  // str = str + '<tr><th width="100%" colspan="7"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:20%;" >制单:' + p.czy + '</td><td  style="text-align:left;border:0;width:20%;">业务:' + p.shr + '</td><td  style="text-align:left;border:0;width:20%;">财务:' + p.cwsh + '</td><td  style="text-align:left;border:0;width:20%;">仓库:' + p.cgy + '</td><td  style="text-align:left;border:0;width:20%;">打印:' +sys_userInfo.username + '</td></tr></table></th></tr>'
  str =
    str +
    '<tr><th width="100%" colspan="6"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:16%;" >制单:' +
    p.czy +
    "</td>";
  str =
    str +
    '<td  style="text-align:left;border:0;width:16%;">审核:' +
    p.shr +
    "</td>";
  str = str + '<td  style="text-align:left;border:0;width:17%;">仓管:</td>';
  str = str + '<td  style="text-align:left;border:0;width:17%;">叉车:</td>';
  str = str + '<td  style="text-align:left;border:0;width:17%;">搬运:</td>';
  str =
    str +
    '<td  style="text-align:left;border:0;width:17%;">司机:</td></tr></table></th></tr>';
  str = str + "<tr><th ></th></tr>";
  str = str + "</tfoot></table>";
  LODOP.ADD_PRINT_TABLE(5, 5, "98%", 260, str);
  LODOP.SET_PRINT_STYLEA(0, "Top2Offset", -80); //这句可让次页起点向上移
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.gfdh);
  if (p.delbz) {
    LODOP.ADD_PRINT_TABLE(
      80,
      600,
      130,
      30,
      '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>'
    );
  }
  LODOP.PREVIEW();
}
function PrintCpgfdgfid(gfid) {
  if (gfid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }
  var prtgfmxStore = Ext.create("Ext.data.Store", {
    alias: "store.cpgfdmxStore",
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
        loc: "cpgfdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        gfid: gfid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id,
      },
      reader: {
        type: "json",
        rootProperty: "rows",
      },
    },
  });
  var prtgfStore = Ext.create("Ext.data.Store", {
    alias: "store.cpgfdStore",
    model: "MyApp.model.CpgfdModel",
    proxy: {
      type: "ajax",
      api: {
        read: sys_ActionPHP + "?act=Cpgfdlist_pc",
      },
      actionMethods: {
        read: "GET",
      },
      extraParams: {
        loc: "cpgfdloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        gfid: gfid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id,
      },
      reader: {
        type: "json",
        rootProperty: "rows",
      },
    },
  });
  prtgfmxStore.on("load", function () {
    prtgfStore.load();
  });
  prtgfStore.on("load", function () {
    prtgfd(prtgfStore, prtgfmxStore);
  });
  prtgfmxStore.load();
}
function prtgfd(prtgfStore, prtgfmxStore) {
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  prtgfStore.each(function (p) {
    var sumsl = 0,
      sumzl = 0,
      sumje = 0,
      sumxjje = 0;
    prtgfmxStore.each(function (rec) {
      sumje = sumje + rec.data.je;
      // sumxjje = sumxjje + rec.data.xjje;
      sumsl = sumsl + rec.data.sl;
      sumzl = sumzl + rec.data.zl;
      mxrec.push(rec.data);
      i = i + 1;
      // }
    });
    gsbyrec = {};
    gsbyrec["cdmc"] = "";
    gsbyrec["xmmc"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["sl"] = 0;
    gsbyrec["zl"] = 0;
    gsbyrec["dj"] = 0;
    gsbyrec["je"] = 0;
    gsbyrec["xjje"] = 0;
    mxrec.push(gsbyrec);
    var gfd = p.data;
    gfd["gfrq"] = Ext.Date.format(p.data.gfrq, "Y-m-d");
    gfd["mxrec"] = mxrec;
    gfd["je"] = sumje;
    if (gfd["xjbz"] == 1) {
      gfd["xjje"] = sumje;
    } else {
      gfd["xjje"] = 0;
    }
    gfd["sl"] = sumsl.toFixed(3);
    gfd["zl"] = sumzl.toFixed(3);
    console.log(gfd);
    printcpgfd(gfd);
  });
}
