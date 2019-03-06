Ext.define('MyApp.view.main.report.PrintCpjkd', {
  extend: 'Ext.Mixin'
});
function printcpjkd(p) {
  if (!LODOP) {
//    console.log("lodop not readly!");
    return;
  }

  var mx = p.mxrec;

  LODOP.PRINT_INIT("进仓单");
  var str = '<style>table,th{border:none;height:22px;align:left;} td{border: 1px solid #000;height:20px}</style>'
  str = str + '<table border=0 cellSpacing=0 cellPadding=0  width="100%"  bordercolor="#000000" style="border-collapse:collapse">'
  str = str + '<caption><br><b><font face="黑体" size="4">' + sys_enterprise_name + '</font></b></caption>'
  str = str + '<caption><br><b><font face="黑体" size="5">商品进库单</font></b></caption>'
  str = str + '<thead>'
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;"></td><td style="border:0;width:130;" ><strong></strong></td></tr></table></th></tr>'
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td style="border:0;width:70;" >客户名称:</td><td style="border:0;"><strong>' + p.khmc + '</strong></td><td style="border:0;width:30;">No:</td><td style="border:0;width:120;" ><strong>' + p.jkdh + '</strong></td></tr></table></th></tr>'
  
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td style="border:0;width:70;" >进库仓库:</td><td style="border:0;"><strong>' + p.ckmc ;
  if (p.area != "") {
      str = str +  '(' + p.area + ')' ;
  }
  str = str + '</strong></td><td style="width:75;border:0; " >送货单号:</td><td  style="border:0;width:150;" ><strong>' + p.sfdh + '</strong></td><td style="text-align:right;border:0;width:70;">进库日期:</td><td style="border:0;width:120;" ><strong>' + p.jkrq +p.rq.substr(10,6)+ '</strong></td></tr></table></th></tr>';
  //表头
  str = str + '  <tr><strong><td  style="text-align:center;" ><strong>产地名称</strong></td><td  style="text-align:center;" ><strong>商品名称</strong></td><td  style="text-align: center;"><strong>批号</strong></td><td  style="text-align: center;"><strong>包装</strong></td><td  style="text-align:right;width:70;"><strong>数量(包)</strong></td><td  style="text-align:right;width:70;"><strong>重量(吨)</strong></td><td  style="text-align:center;width:50;"><strong>仓位</strong></td></strong></tr>'
  str = str + '</thead>'
  str = str + '<tbody>'
  mx.forEach(function (rec) {
    if (rec.mxdh < '2') {
      str = str + '<tr><td>' + rec.cdmc + '</td><td>' + trim(rec.cpmc) + '</td><td>' + rec.cpph + '</td><td>' + trim(rec.bzmc) + '</td><td style="text-align:center;">' + slrenderer(rec.jcsl) + '</td><td  style="text-align:center;">' + slrenderer(rec.jczl) + '</td><td >' + rec.cw + '</td></tr>'
    }
  })

  str = str + '  <tr><strong><td  style="text-align:center;">汇总 </td><td    colspan="3"><strong>进仓费用:' + lowMoneyToUp(p.jcje) + '(' + slrenderer(p.jcje) + '元)' + '</strong></td><td  style="text-align:center;"><strong>' + slrenderer(p.jcsl) + '</strong></td><td style="text-align:center;"><strong>' + slrenderer(p.jczl) + '</strong></td><td  style="text-align:center;"></td></strong></tr>'


  str = str + '<tr height="50" ><td    colspan="12">'
  str = str + '<table  style="font-size:15px;" width="100%" border="0">'
  str = str + '<tr><td style="width:75;border:0; " >送货车牌:</td><td  style="border:0;" ><strong>' + p.cphm + '</strong></td>';
  str = str + '<td style="text-align:right;width:60;border:0;"  >送货人:</td><td style="border:0;width:30%;" ><strong>' + p.sfr + '</strong></td></tr></table>';
  str = str + '</td></tr>'


  str = str + '<tr height="50" ><td    colspan="12">'
  str = str + '<table  style="font-size:15px;" width="100%" border="0">'
  str = str + '<tr><td style="width:42;border:0; " >备注:</td><td style="border:0;"  >' + p.cnote + '</td></tr></table>';
  str = str + '</td></tr>'



  str = str + '</tbody>'
  str = str + '<tfoot>'
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td  style="border:0;width:20%;" >制单:' + p.czy + '</td>';
  str = str + '<td  style="border:0;width:20%;">审核:' + p.shr + '</td>';
  str = str + '<td  style="border:0;width:20%;">仓管:' + p.cgy + '</td>';
  str = str + '<td  style="border:0;width:20%;">叉车:</td>';
  str = str + '<td  style="border:0;width:20%;">搬运:</td></tr></table></th></tr>'
  str = str + '<tr><th ></th></tr>'
  str = str + '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr><td  style="border:0;width:20%;" >第一联：存概</td>';
  str = str + '<td  style="border:0;width:20%;">第二联：叉车</td>';
  str = str + '<td  style="border:0;width:20%;">第三联：仓库</td>';
  str = str + '<td  style="border:0;width:20%;">第四联：搬运</td>';
  str = str + '<td  style="border:0;width:20%;">第五联：客户</td></tr></table></th></tr>';




  str = str + '<tr><th ></th></tr>'
  str = str + '</tfoot></table>';

  LODOP.ADD_PRINT_TABLE(5, 5, "98%", 260, str);
  LODOP.SET_PRINT_STYLEA(0, "Top2Offset", -80); //这句可让次页起点向上移
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.jkdh);
  if (p.delbz) {
    LODOP.ADD_PRINT_TABLE(80, 600, 130, 30, '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>');
  }
  LODOP.PREVIEW();

};


function PrintCpjkdJkid(jkid) {
  //console.log("PrintCpjkdJkid", jkid)
  if (jkid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }


  var prtmxStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpjkdmxStore',
    model: 'MyApp.model.CpjkdmxModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=Cpjkdmxlist_pc'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        loc: "cpjkdprt",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        jkid: jkid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });
  var prtStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpjkdStore',
    model: 'MyApp.model.CpjkdModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=Cpjkdlist_pc'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        loc: "cpjkdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        jkid: jkid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });

  prtmxStore.on("load", function () {
    prtStore.load();
  });
  prtStore.on("load", function () {
    prtjcd(prtStore, prtmxStore);
  });
  prtmxStore.load();

}

function prtjcd(prtStore, prtmxStore) {
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  prtStore.each(function (p) {
    var sumsl = 0, sumzl = 0, sumje = 0, sumxjje = 0;
    prtmxStore.each(function (rec) {
      // console.log(rec.data);
      sumje = sumje + rec.data.jcje;
      sumxjje = sumxjje + rec.data.xjje;
      if (rec.data.jeid == 0) {
        sumsl = sumsl + rec.data.jcsl;
        sumzl = sumzl + rec.data.jczl;
      }
      mxrec.push(rec.data);
      i = i + 1
      // }
    })
    gsbyrec = {};
    gsbyrec["cpmc"] = "";
    gsbyrec["cpph"] = "";
    gsbyrec["cw"] = "";
    gsbyrec["mxdh"] = "1";
    gsbyrec["cdmc"] = "";
    gsbyrec["bzmc"] = "";
    gsbyrec["cpgg"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["jcsl"] = 0;
    gsbyrec["jczl"] = 0;
    gsbyrec["czdj"] = 0;
    gsbyrec["jcje"] = 0;
    gsbyrec["xjje"] = 0;
    gsbyrec["cpph"] = "";
    mxrec.push(gsbyrec);

    var jkd = p.data;
    
    jkd["jkrq"] = Ext.Date.format(p.data.czrq, 'Y-m-d');
    jkd["czrq"] = Ext.Date.format(p.data.czrq, 'Y-m-d');
    jkd["mxrec"] = mxrec;
    jkd["jcje"] = sumje;
    jkd["xjje"] = sumxjje;
    jkd["jcsl"] = sumsl.toFixed(3);
    jkd["jczl"] = sumzl.toFixed(3);
    printcpjkd(jkd);
  })
}


