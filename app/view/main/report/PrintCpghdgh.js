var areaArray = [];
var ckmc = "";
var cur = 0;
Ext.define('MyApp.view.main.report.PrintCpghdgh', {
  extend: 'Ext.Mixin'
});
function printcpghd(p) {
  if (!LODOP) {
    return;
  }
  var mx = p.mxrec;
  LODOP.PRINT_INIT("过货单");
  var str = '<style>table,th{border:none;height:22px;align:left;} td{border: 1px solid #000;height:20px}</style>'
  str = str + '<table border=0 cellSpacing=0 cellPadding=0  width="100%"  bordercolor="#000000" style="border-collapse:collapse">'
  str = str + '<caption><br><b><font face="黑体" size="4">' + sys_enterprise_name + '</font></b></caption>'
  str = str + '<caption><br><b><font face="黑体" size="5">商品过货单</font></b></caption>'
  str = str + '<thead>'
    var upje="";

  if (p.xjje > 0) {
    upje=lowMoneyToUp(p.ccje + p.xjje) + '(' + slrenderer(p.ccje + p.xjje) + '元)'
    str = str + '<tr><th width="100%" colspan="11"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;"></td><td style="border:0;width:130;color:red; " ><strong>作业费用即结</strong></td></tr></table></th></tr>'
  }
  str = str + '<tr><th width="100%" colspan="11"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;">No:</td><td style="border:0;width:130;" ><strong>' + p.ghdh + '</strong></td></tr></table></th></tr>'

  str = str + '<tr><th width="100%" colspan="11"><table width="100%" border=0 ><tr>';
  str = str + '<td style="border:0;width:70;" >客户名称:</td>';
  str = str + '<td style="border:0;"><strong>' + p.khmc + '</strong></td>';
  //str = str + '<td style="text-align:right;border:0;width:70;" >新客户:</td><td style="border:0;"><strong></strong></td>';
  str = str + '<td style="text-align:right;border:0;width:70;">开单日期:</td><td style="border:0;width:90;" ><strong>' + p.xsrq + '</strong></td></tr></table></th></tr>';

  str = str + '<tr><th width="100%" colspan="11"><table width="100%" border=0 ><tr>';
  str = str + '<td style="border:0;width:70;" >新客户:</td><td style="border:0;"><strong>' + p.newkhmc + '</strong></td>';
  str = str + '<td style="border:0;width:70;" >过货仓库:</td><td style="border:0;"><strong>' + p.ckmc + '</strong></td>';
  str = str + '<td style="text-align:right;border:0;width:70;" >过货日期:</td><td  style="border:0;width:90;"><strong>' + p.ghrq + '</strong></td>   </tr></table></th></tr>';
  //表头
  str = str + '<tr>';
  str = str + '<td  style="text-align:center;" ><strong>产地</strong></td>';
  str = str + '<td  style="text-align:center;" ><strong>商品名称</strong></td>';

  str = str + '<td  style="text-align: center;"><strong>包装</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>批号</strong></td>';
  str = str + '<td  style="text-align:right;width:70;"><strong>数量(包)</strong></td>';
  str = str + '<td  style="text-align:right;width:70;"><strong>重量(吨)</strong></td>';
  str = str + '<td  style="width:50;text-align:center;"><strong>仓位</strong></td>';
  str = str + '<td  style="text-align: center;width:50;"><strong>付现</strong></td>';
  str = str + '</td></tr></thead>';
  str = str + '<tbody>';
  mx.forEach(function (rec) {
    if (rec.mxdh < '2') {
      str = str + '<tr><td>' + trim(rec.cdmc) + '</td>';

      str = str + '<td>' + trim(rec.cpmc) + '</td>';
      str = str + '<td>' + trim(rec.bzmc) + '</td>';
      str = str + '<td>' + trim(rec.cpph) + '</td>';
      str = str + '<td style="text-align:center;">' + slrenderer(rec.ccsl) + '</td>';
      str = str + '<td  style="text-align:center;">' + slrenderer(rec.cczl) + '</td>';
      str = str + '<td>' + rec.cw + '</td>';
      str = str + '<td  style="text-align:center;">' + slrenderer(rec.xjje) + '</td></tr>';
    }
  })




  str = str + '<tr><td style="text-align:center;">汇总 </td><td   colspan="3"><strong>过货费用:' +upje  + '</strong></td>';
 
 
  str = str + '<td style="text-align:center;"><strong>' + slrenderer(p.ccsl) + '</strong></td><td style="text-align:center;"><strong>' + slrenderer(p.cczl) + '</strong></td>';
  str = str + '<td  style="text-align:right;"><strong></strong></td>';
  str = str + '<td  style="text-align:center;：color:red;"><strong>' + slrenderer(p.xjje) + '</strong></td></tr>';
  
 // str = str + '<tr height="50" ><td   colspan="12">'
 // str = str + '<table  style="font-size:15px;" width="100%" border="0">'
 // str = str + '<tr><td style="width:75;border:0; " >新客户:</td><td  style="border:0;" ><strong>' + p.newkhmc + '</strong></td>';
 // str = str + '<td style="text-align:right;width:60;border:0;"  ></td><td style="border:0;width:35%;" ><strong></strong></td></tr></table>';
 // str = str + '</td></tr>'


  str = str + '<tr height="50" ><td   colspan="12">'
  str = str + '<table  style="font-size:15px;" width="100%" border="0">'
  str = str + '<tr><td style="width:42;border:0; " >备注:</td><td style="border:0;"  >'+ p.cnote + '</td></tr></table>';
  str = str + '</td></tr>'

  
  str = str + '</tbody>'
  str = str + '<tfoot>'
  
  

  str = str + '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr><td  style="border:0;width:16%;" >制单:' + p.ghr + '</td>';

  str = str + '<td  style="border:0;width:16%;">仓管:</td>';
  str = str + '<td  style="border:0;width:16%;">叉车:</td>';
  str = str + '<td  style="border:0;width:16%;">搬运:</td>';
  str = str + '<td  style="border:0;width:36%;">过户：</td></tr></table></th></tr>';
  
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
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.ghdh);
  //if (p.delbz) {
  //  LODOP.ADD_PRINT_TABLE(50, 600, 130, 30, '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>');
 // }


  LODOP.PREVIEW();
};

function PrintCpghdghid(ghid) {
  
  if (ghid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }

  var prtcwStore = "";
  console.log(ghid);
  var prtghmxStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpghdmxStore',
    model: 'MyApp.model.CpghdmxModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=cpghdghmxlist_prt'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        ghid:ghid
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });
  console.log('ghid',sys_userInfo);
  //return;
  
  var prtghStore = Ext.create('Ext.data.Store', {
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

  prtghmxStore.on("load", function () {
    console.log('prtghmxStore.onload');
    prtghStore.load();
  });

  prtghStore.on("load", function () {
    console.log('prtghmxStore.onload');
    prtghd(prtghStore, prtghmxStore, prtcwStore);
  });


  prtghmxStore.load();

}

function prtghd(prtghStore, prtghmxStore, prtcwStore) {
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  prtghStore.each(function (p) {
      console.log("ckmc",p);
      p.data.ghrq = Ext.Date.format(p.data.ghrq, 'Y-m-d');
      p.data.xsrq = Ext.Date.format(p.data.xsrq, 'Y-m-d');
      ckmc = p.data.ckmc;
      console.log("ckmc", ckmc,p);
  })
  //onsole.log("ckmc", ckmc,p);
  areaArray = [];

  prtghmxStore.each(function (rec) {
    i = 0;
    areaArray.forEach(function (item, index) {
      if (item == rec.data.area) {
        i = 1;
      }
    });
    if (i == 0) {
      areaArray.push(rec.data.area);
    }
  })
  var j = 0;
  if (areaArray.length > 1) {
    cur = 0;
    apploginForm = new Ext.form.FormPanel({
      labelAlign: 'left',
      buttonAlign: 'center',
      bodyStyle: 'padding:5px',
      frame: true,
      defaults: {
        anchor: '97%',
        labelWidth: 0
      },
      items: [{
        xtype: 'displayfield',
        id: "msgid",
        padding: '30 20 20 20',
        // font:'38px',
        style: {
          font: '38px'
        },
        name: 'msg',
        value: '打印过货单第:' + (cur + 1).toString() + '份/共:' + areaArray.length + '份',
        fieldLabel: ''
      }
      ],
      buttons: [{
        id: "submitButton",
        text: '打印',
        cls: "x-btn-text-icon",
        icon: "images/print.gif",
        scope: this,
        handler: function () {
          prtghd0(prtghStore, prtghmxStore, areaArray[cur]);
          cur = cur + 1;
          if (cur > areaArray.length - 1) {
            apploginWin.destroy();
            return;

          }
          Ext.getCmp("msgid").setValue('打印过货单第:' + (cur + 1).toString() + '份/共:' + areaArray.length + '份')
        }
      }, {
        text: '放弃',
        cls: 'x-btn-text-icon details',
        icon: "images/close.gif",
        scope: this,
        handler: function () {
          apploginWin.destroy();

        }
      }
      ]
    })

    apploginWin = new Ext.Window({
      width: 300,
      height: 200,
      title: '注意',
      plain: true,
      resizable: false,
      frame: true,
      layout: 'fit',
      closeAction: 'destroy',
      border: false,
      hasvcode: false,
      items: [apploginForm
      ]
    }
    ).show();



    //************************************************************* */
  } else {
    prtghd0(prtghStore, prtghmxStore, areaArray[0]);
  }
}

function prtghd0(prtghStore, prtghmxStore, area) {
  //console.log("area=" + area);
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;

  prtghStore.each(function (pp) {

    var sumsl = 0, sumzl = 0, sumje = 0, sumxjje = 0;
    var ghd = pp.data;
  


    var ckcw = "";
    var ckcwstr = "";
    var ckcwstr0 = "";
    var ckmxid = 0;
    var ckcount = 0;
    prtghmxStore.each(function (rec) {
      if (rec.data.area == area) {
        sumxjje = sumxjje + rec.data.xjje;
        sumje = sumje + rec.data.ccje;
        if (rec.data.jeid == 0) {
          //sumsl = sumsl + rec.data.ccsl;
          //sumzl = sumzl + rec.data.cczl;
          sumsl =sumsl+ Math.round(1000 * rec.data.ccsl) / 1000;
          sumzl =sumzl+ Math.round(1000 * rec.data.cczl) / 1000;
        }
        mxrec.push(rec.data);
        i = i + 1
      }
    })


    gsbyrec = {};
    gsbyrec["cdmc"] = "";

    gsbyrec["mxdh"] = "1";
    gsbyrec["mxid"] = 0;
    gsbyrec["cpmc"] = "";
    gsbyrec["bzmc"] = "";
    gsbyrec["cpgg"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["cw"] = "";
    gsbyrec["ghsl"] = 0;
    gsbyrec["ghzl"] = 0;
    gsbyrec["czdj"] = 0;
    gsbyrec["ghje"] = 0;
    gsbyrec["xjje"] = 0;
    gsbyrec["sm"] = "";
    gsbyrec["cw"] = "";
    gsbyrec["cpph"] = "";

    mxrec.push(gsbyrec);


    ghd["mxrec"] = mxrec;
    ghd["ghje"] = sumje;
    if (area == "") {
    } else {
      ghd["ckmc"] = ckmc + "(" + area + ")";
    }
    ghd["cnote"] = trim(ghd["cnote"]) + " " + ckcwstr;;
    ghd["xjje"] = sumxjje;
    ghd["ccsl"] = sumsl.toFixed(3);
    ghd["cczl"] = sumzl.toFixed(3);
   // console.log("prt ghd",pp.data,ghd,sumsl);
    printcpghd(ghd);

  })
}


