Ext.define('MyApp.view.main.report.PrintCpghkd', {
  extend: 'Ext.Mixin'
});

function printCpghd(p) {
  var mx = p.mxrec;

  if (!LODOP) {
    console.log("lodop not readly!");
    return;
  }
  LODOP.PRINT_INIT("过户单");
  if (p.jebz==1){
  var pjebz=  "新客户支付过户费用";

  }else{
    var pjebz=  "";
  }
  var str = '<style>table,th{border:none;height:22px;align:left;} td{border: 1px solid #000;height:20px}</style>';
  str = str + '<table border=0 cellSpacing=0 cellPadding=0  width="100%"  bordercolor="#000000" style="border-collapse:collapse">';
  str = str + '<caption><br><b><font face="黑体" size="4">' + p.khmc + '</font></b></caption>';
  str = str + '<caption><br><b><font face="黑体" size="5">商品过户单</font></b></caption>';
  str = str + '<thead>';
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;">No:</td><td style="text-align:left;border:0;width:130;" ><strong>' + p.ghdh + '</strong></td></tr></table></th></tr>';
  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr>';

  str = str + '<td style="text-align:left;border:0;width:70;" >过户仓库:</td><td style="text-align:left;border:0;"><strong>' + p.ckmc + '</strong></td>';

  str = str + '<td style="text-align:right;border:0;width:70;">开单日期:</td><td style="text-align:left;border:0;width:80;" ><strong>' + p.xsrq + '</strong></td></tr></table></th></tr>';


  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td style="text-align:left;border:0;width:70;" >接收客户</td><td style="text-align:left;border:0;"><strong>' + p.newkhmc + '</strong></td>';
  str = str + '<td style="text-align:right;border:0;width:0;" ></td><td style="text-align:left;border:0;"><strong>' + pjebz + '</strong></td>';

  str = str + '<td style="text-align:right;border:0;width:70;" >有效日期:</td><td  style="text-align:left;border:0;width:80;"><strong>' + p.endrq + '</strong></td></tr></table></th></tr>';
  //表头
  str = str + '<tr><td style="text-align:center;" ><strong>产地名称</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>商品名称</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>规格型号</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>批号</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>包装</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>单位</strong></td>';
  str = str + '<td  style="text-align:center;width:50;"><strong>数  量</strong></td>';
  str = str + '<td  style="text-align:center;width:60;"><strong>重  量</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>注</strong></td>';
  str = str + '</tr>';

  str = str + '</thead>'
  str = str + '<tbody>'
  mx.forEach(function (rec) {
    //str = str + '<tr><td>'+trim(rec.cpmc)+'</td><td>'+rec.cpgg+'</td><td>'+trim(rec.bzmc)+'</td><td  style="text-align:center;">'+rec.jldw+'</td><td style="text-align:right;">'+printsl(rec.jcsl)+'</td><td  style="text-align:right;">'+printsl(rec.jczl)+'</td><td  style="text-align:right;">'+printsl(rec.czdj)+'</td><td  style="text-align:right;">'+printsl(rec.jcje)+'</td></tr>'



    str = str + '<tr><td style="text-align:left;" >' + rec.cdmc + '</td>';
    str = str + '<td  style="text-align:left;">' + rec.cpmc + '</td>';
    str = str + '<td  style="text-align:left;">' + rec.cpgg + '</td>';
    str = str + '<td  style="text-align:left;">' + rec.cpph + '</td>';
    str = str + '<td  style="text-align:left;">' + rec.bzmc + '</td>';
    str = str + '<td  style="text-align:center;">' + rec.jldw + '</td>';
    str = str + '<td  style="text-align:right;">' + slrenderer(rec.xssl) + '</td>';
    str = str + '<td  style="text-align:right;">' + slrenderer(rec.xszl) + '</td>';
    str = str + '<td  style="text-align:left;">' + rec.sm + '</td>';
    str = str + '</tr>';



  })

  // str = str + '  <tr><strong><td  style="text-align:center;">汇总 </td><td  style="text-align:left;"  colspan="3"></td><td  style="text-align:right;"><strong>'+printsl(p.xssl)+'</strong></td><td style="text-align:right;"><strong>'+printsl(p.xszl)+'</strong></td><td  style="text-align:center;"></td><td  style="text-align:right;"><strong></strong></td></strong></tr>'

  str = str + '<tr><td style="text-align:center;" ></td>';
  str = str + '<td  style="text-align: center;"></td>';
  str = str + '<td  style="text-align: center;"></td>';
  str = str + '<td  style="text-align: center;"></td>';
  str = str + '<td  style="text-align: center;"></td>';
  str = str + '<td  style="text-align:center;">汇总</td>';
  str = str + '<td  style="text-align:right;">' + slrenderer(p.xssl) + '</td>';
  str = str + '<td  style="text-align:right;">' + slrenderer(p.xszl) + '</td>';
  str = str + '<td  style="text-align:center;"></td>';
  str = str + '</tr>';




  str = str + '</tbody>'
  str = str + '<tfoot>'

  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:20%;" >制单:' + p.czy + '</td><td  style="text-align:left;border:0;width:20%;">业务:' + p.shr + '</td><td  style="text-align:left;border:0;width:20%;">财务:</td><td  style="text-align:left;border:0;width:20%;">经办:</td><td  style="text-align:left;border:0;width:20%;">打印:' + sys_userInfo.username + '</td></tr></table></th></tr>'

  str = str + '<tr><th width="100%" colspan="8"><table width="100%" border=0 ><tr><td  style="text-align:left;border:0;width:42;" >备注:</td><td  style="text-align:left;border:1;">'
  if (p.xjbz == 1) {
    str = str + '装卸费用付现金</br>';
  }
  str = str + p.cnote + '</td></tr></table></th></tr>'

  str = str + '<tr><th ></th></tr>'
  str = str + '</tfoot></table>';

  LODOP.ADD_PRINT_TABLE(5, 5, "98%", 260, str);
  LODOP.SET_PRINT_STYLEA(0, "Top2Offset", -80); //这句可让次页起点向上移
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.ghdh);
  if (p.delbz) {
    LODOP.ADD_PRINT_TABLE(50, 600, 130, 30, '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>');
  }
  LODOP.PREVIEW();

};
function onPrintCpghd() {
  PrintCpghdghid(ghid);
};

function PrintCpghdghid(ghid) {
  // console.log('PrintCpghdghid',ghid);
  if (ghid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }


  var prtghkdmxStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpghdmxStore',
    model: 'MyApp.model.CpghdmxModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=cpghdmxlist_pc'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        loc: "cpghdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        ghid: ghid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });
  var prtghkdStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpghdStore',
    model: 'MyApp.model.CpghdModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=cpghdlist_pc'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        loc: "cpghdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        ghid: ghid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });

  prtghkdmxStore.on("load", function () {
    prtghkdStore.load();
  });
  prtghkdStore.on("load", function () {
    // console.log("load");
    prtghd(prtghkdStore, prtghkdmxStore);
  });
  prtghkdmxStore.load();

}

function prtghd(prtghkdStore, prtghkdmxStore) {
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;

  prtghkdStore.each(function (p) {

    var sumsl = 0, sumzl = 0, sumje = 0;
    prtghkdmxStore.each(function (rec) {
      sumsl = sumsl + rec.data.xssl;
      sumzl = sumzl + rec.data.xszl;
      mxrec.push(rec.data);
      i = i + 1
    })
    // console.log(p,mxrec);
    gsbyrec = {};
    gsbyrec["cpmc"] = "";
    gsbyrec["cdmc"] = "";
    gsbyrec["bzmc"] = "";
    gsbyrec["cpgg"] = "";
    gsbyrec["cpph"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["xssl"] = "";
    gsbyrec["xszl"] = "";
    gsbyrec["sm"] = "";

    mxrec.push(gsbyrec);
    /*
    for (var j = i; j < 5; j++) {
      gsbyrec = {};
      gsbyrec["cpmc"] = "";
      gsbyrec["cdmc"] = "";
      gsbyrec["bzmc"] = "";
      gsbyrec["cpgg"] = "";
      gsbyrec["cpph"] = "";
      gsbyrec["jldw"] = "";
      gsbyrec["xssl"] = "";
      gsbyrec["xszl"] = "";
      gsbyrec["sm"] = "";
      mxrec.push(gsbyrec);
    }
    */
    var ghd = p.data;
    ghd["xsrq"] = Ext.Date.format(p.data.xsrq, 'Y-m-d');
    ghd["endrq"] = Ext.Date.format(p.data.endrq, 'Y-m-d');
    ghd["mxrec"] = mxrec;
    ghd["xsje"] = 0;
    ghd["xssl"] = sumsl.toFixed(3);
    ghd["xszl"] = sumzl.toFixed(3);
    // console.log(ghd);
    printCpghd(ghd);
  })
}


