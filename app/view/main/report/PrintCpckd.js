var areaArray = [];
var ckmc = "";
var cur = 0;
Ext.define('MyApp.view.main.report.PrintCpckd', {
  extend: 'Ext.Mixin'
});
function printcpckd(p) {
  if (!LODOP) {
    return;
  }
  var mx = p.mxrec;
  LODOP.PRINT_INIT("出仓单");
  var str = '<style>table,th{border:none;height:22px;align:left;} td{border: 1px solid #000;height:20px}</style>'
  str = str + '<table border=0 cellSpacing=0 cellPadding=0  width="100%"  bordercolor="#000000" style="border-collapse:collapse">'
  str = str + '<caption><br><b><font face="黑体" size="4">' + sys_enterprise_name + '</font></b></caption>'
  str = str + '<caption><br><b><font face="黑体" size="5">商品出库单</font></b></caption>'
  str = str + '<thead>'
    var upje="";

  if (p.xjje > 0) {
    upje=lowMoneyToUp(p.ccje + p.xjje) + '(' + slrenderer(p.ccje + p.xjje) + '元)'
    str = str + '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;"></td><td style="border:0;width:130;color:red; " ><strong>作业费用即结</strong></td></tr></table></th></tr>'
  }
  str = str + '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr><td style="border:0;" ></td><td style="text-align:right;border:0;width:50;">No:</td><td style="border:0;width:130;" ><strong>' + p.ckdh + '</strong></td></tr></table></th></tr>'

  str = str + '<tr><th width="100%" colspan="12"><table width="100%" border=0 ><tr>';
  str = str + '<td style="border:0;width:70;" >客户名称:</td>';
  str = str + '<td style="border:0;"><strong>' + p.khmc + '</strong></td>';
  str = str + '<td style="text-align:right;border:0;width:70;" >提货单号:</td><td style="border:0;"><strong>' + p.xsdh + '</strong></td>';
  str = str + '<td style="text-align:right;border:0;width:70;">开单日期:</td><td style="border:0;width:90;" ><strong>' + p.xsrq + '</strong></td></tr></table></th></tr>';

  str = str + '<tr><th width="100%" colspan="11"><table width="100%" border=0 ><tr>';
  str = str + '<td style="border:0;width:70;" >出库仓库:</td><td style="border:0;"><strong>' + p.ckmc + '</strong></td>';
  str = str + '<td style="text-align:right;border:0;width:70;" >出库日期:</td><td  style="border:0;width:120;"><strong>' + p.ckrq+p.rq.substr(10,6) + '</strong></td>   </tr></table></th></tr>';
  //表头
  str = str + '<tr>';
  str = str + '<td  style="text-align:center;" ><strong>产地</strong></td>';
  str = str + '<td  style="text-align:center;" ><strong>商品名称</strong></td>';

  str = str + '<td  style="text-align: center;"><strong>包装</strong></td>';
  str = str + '<td  style="text-align: center;"><strong>批号</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>数量(包)</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>重量(吨)</strong></td>';
  str = str + '<td  style="text-align:center;"><strong>作业方式 </strong></td>';
  str = str + '<td  style="text-align:center;"><strong>仓位</strong></td>';
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
      str = str + '<td style="text-align:center;">' + slrenderer(rec.cczl) + '</td>';
      str = str + '<td style="text-align:center;" >' + rec.sm + '</td>';
      str = str + '<td style="text-align:center;">' + rec.cw + '</td>';
      str = str + '<td style="text-align:center;">' + slrenderer(rec.xjje) + '</td></tr>';
    }
  })




  str = str + '<tr><td style="text-align:center;">汇总 </td><td   colspan="3"><strong>出仓费用:' +upje  + '</strong></td>';
 
 
  str = str + '<td style="text-align:center;"><strong>' + slrenderer(p.ccsl) + '</strong></td><td style="text-align:center;"><strong>' + slrenderer(p.cczl) + '</strong></td>';
  str = str + '<td  style="text-align:right;"><strong></strong></td>';
  str = str + '<td  style="text-align:right;"><strong></strong></td>';
  str = str + '<td  style="text-align:center;：color:red;"><strong>' + slrenderer(p.xjje) + '</strong></td></tr>';
  str = str + '<tr height="50" ><td   colspan="13">'
  str = str + '<table  style="font-size:15px;" width="100%" border="0">'
  str = str + '<tr><td style="width:75;border:0; " >提货车牌:</td><td  style="border:0;" ><strong>' + p.cphm + '</strong></td>';
  str = str + '<td style="text-align:right;width:60;border:0;"  >提货人:</td><td style="border:0;width:35%;" ><strong>' + p.thr + '</strong></td></tr></table>';
  str = str + '</td></tr>'


  str = str + '<tr height="50" ><td   colspan="13">'
  str = str + '<table  style="font-size:15px;" width="100%" border="0">'
  str = str + '<tr><td style="width:42;border:0; " >备注:</td><td style="border:0;"  >'+ p.cnote + '</td></tr></table>';
  str = str + '</td></tr>'

  
  str = str + '</tbody>'
  str = str + '<tfoot>'
  
  

  str = str + '<tr><th width="100%" colspan="13"><table width="100%" border=0 ><tr><td  style="border:0;width:16%;" >制单:' + p.czy + '</td>';

  str = str + '<td  style="border:0;width:16%;">仓管:</td>';
  str = str + '<td  style="border:0;width:16%;">叉车:</td>';
  str = str + '<td  style="border:0;width:16%;">搬运:</td>';
  str = str + '<td  style="border:0;width:36%;">提货人/电话:</td></tr></table></th></tr>';
  
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
  LODOP.ADD_PRINT_BARCODE(5, 5, 120, 120, "QRCode", p.ckdh);
  if (p.delbz) {
    LODOP.ADD_PRINT_TABLE(50, 600, 130, 30, '<table width="100%" border=0 ><tr><td style="color:red;text-align:center;border:0; " ><strong>此单已作废!</strong></td></tr></table>');
  }


  LODOP.PREVIEW();
};

function PrintCpckdckid(ckid) {
  if (ckid == 0) {
    return;
  }
  if (!LODOP) {
    return;
  }

  var prtcwStore = "";

  var prtckmxStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpckdmxStore',
    model: 'MyApp.model.CpckdmxModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=Cpckdmxlist_prt'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        ckid: ckid
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });
  var prtckStore = Ext.create('Ext.data.Store', {
    alias: 'store.cpckdStore',
    model: 'MyApp.model.CpckdModel',
    proxy: {
      type: 'ajax',
      api: {
        read: sys_ActionPHP + '?act=Cpckdlist_pc'
      },
      actionMethods: {
        read: 'GET'
      },
      extraParams: {
        loc: "cpckdmxloc",
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        ckid: ckid,
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id
      },
      reader: {
        type: 'json',
        rootProperty: 'rows'
      }
    }
  });

  prtckmxStore.on("load", function () {
    // prtcwStore.load();
    prtckStore.load();
  });

  prtckStore.on("load", function () {
    prtckd(prtckStore, prtckmxStore, prtcwStore);
  });


  prtckmxStore.load();

}

function prtckd(prtckStore, prtckmxStore, prtcwStore) {
 // console.log("store", prtckStore, prtckmxStore, prtcwStore);    
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;
  prtckStore.each(function (p) {
      p.data.ckrq = Ext.Date.format(p.data.ckrq, 'Y-m-d');
      p.data.xsrq = Ext.Date.format(p.data.xsrq, 'Y-m-d');
 // console.log("prt", p.data);    
      ckmc = p.data.ckmc;
  })
  //console.log("ckmc", ckmc);
  areaArray = [];

  prtckmxStore.each(function (rec) {
    i = 0;
   // console.log("ckmx", rec);
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
        value: '打印出仓单第:' + (cur + 1).toString() + '份/共:' + areaArray.length + '份',
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
          prtckd0(prtckStore, prtckmxStore, areaArray[cur]);
          cur = cur + 1;
          if (cur > areaArray.length - 1) {
            apploginWin.destroy();
            return;

          }
          Ext.getCmp("msgid").setValue('打印出仓单第:' + (cur + 1).toString() + '份/共:' + areaArray.length + '份')
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
    prtckd0(prtckStore, prtckmxStore, areaArray[0]);
  }
}

function prtckd0(prtckStore, prtckmxStore, area) {
 // console.log("area=" + area);
  var mxrec = [];
  var gsbyrec = {};
  var i = 0;

  prtckStore.each(function (pp) {

    var sumsl = 0, sumzl = 0, sumje = 0, sumxjje = 0;
    var ckd = pp.data;
    var ckcw = "";
    var ckcwstr = "";
    var ckcwstr0 = "";
    var ckmxid = 0;
    var ckcount = 0;
    var zyfs="";
    var prtckmxStoreje=prtckmxStore;
    prtckmxStore.each(function (rec) {
     // console.log("rec=", rec.data);
      if (rec.data.area == area) {
        sumxjje = sumxjje + rec.data.xjje;
        sumje = sumje + rec.data.ccje;
        if (rec.data.jeid == 0) {
          sumsl = sumsl + rec.data.ccsl;
          sumzl = sumzl + rec.data.cczl;
        }
        zyfs="";
        prtckmxStoreje.each(function (jerec) {
          if (jerec.data.jeid>0 && jerec.data.mxid==rec.data.mxid) {
            if (!zyfs.includes(jerec.data.cpmc+";")){
               zyfs +=jerec.data.cpmc+";";
            }
          }
        })      
        if (zyfs.length>0){
          rec.data.sm=zyfs.substring(0,zyfs.length-1);  
        }  
          
        mxrec.push(rec.data);
        i = i + 1
      }
    })


    gsbyrec = {};
    gsbyrec["cdmc"] = "";

    gsbyrec["mxdh"] = "1";
    gsbyrec["cpmc"] = "";
    gsbyrec["bzmc"] = "";
    gsbyrec["cpgg"] = "";
    gsbyrec["jldw"] = "";
    gsbyrec["cw"] = "";
    gsbyrec["ccsl"] = 0;
    gsbyrec["cczl"] = 0;
    gsbyrec["czdj"] = 0;
    gsbyrec["ccje"] = 0;
    gsbyrec["xjje"] = 0;
    gsbyrec["sm"] = "";
    gsbyrec["cw"] = "";
    gsbyrec["cpph"] = "";

    mxrec.push(gsbyrec);


    ckd["mxrec"] = mxrec;
    ckd["ccje"] = sumje;
    if (area == "") {
    } else {
      ckd["ckmc"] = ckmc + "(" + area + ")";
    }
    ckd["cnote"] = trim(ckd["cnote"]) + " " + ckcwstr;;
   // ckd["xjje"] = sumxjje;
    ckd["ccsl"] = sumsl.toFixed(3);
    ckd["cczl"] = sumzl.toFixed(3);
   // console.log("prt ckd",pp.data,ckd);
    printcpckd(ckd);

  })
}


