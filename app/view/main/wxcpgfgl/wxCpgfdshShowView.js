var that;
var gfdworkCallBack = function (node) {
  var workrec = node.data;
  var gfmxrec = that.record;
  var gfdrec = that.gfdrecord.data;
  console.log("local ", local );
  //console.log("workrec", workrec);
  //console.log("recId", that.recordID.data);
  //console.log("rec", that.record.data);
  var cpgfd = {};
  var arrayjemx = [];
  var jemx = {};
  //work,byg,gs,cg,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj
  jemx["work"] = workrec.text;
  jemx["byg"] = "";
  jemx["gs"] = "";
  jemx["cg"] = "";
  if (workrec.zljs == "1") {
    jemx["dw"] = "吨";
    jemx["sl"] = gfmxrec.zl;
  } else {
    jemx["dw"] = gfmxrec.jldw;
    jemx["sl"] = gfmxrec.sl;
  }
  jemx["dj"] = workrec.bydj;
  jemx["je"] = workrec.bydj * jemx["sl"];
  if (gfdrec.xjbz) {
    jemx["xjbz"] = 1;
    //console.log("xjbz", gfdrec.xjbz, 1);
    jemx["xjje"] = workrec.bydj * jemx["sl"];
  } else {
    jemx["xjbz"] = 0;
    jemx["xjje"] = 0;
    //console.log("xjbz", gfdrec.xjbz, 0);
  }
  jemx["workid"] = workrec.id;
  jemx["mxid"] = gfmxrec.mxid;
  jemx["zljs"] = workrec.zljs;
  jemx["inbz"] = 0;
  jemx["indj"] = 0;
  arrayjemx.push(jemx);
  cpgfd["cpgfdje"] = arrayjemx;
  //console.log("gfd", cpgfd);
  //    return;
  var str = obj2str(cpgfd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpgfdjesave",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      data: encodedString,
    },
    scope: this,
    success: function (response) {
      var result = Ext.decode(response.responseText);
      if (result.result == "success") {
        var store = that.lookupReference("CpgfdmxGrid").getStore();
        // store.proxy.extraParams.gfid =  gfmxrec.gfid;
        // store.proxy.extraParams.loc = 'cpgfdmxcwsh';
        store.reload();
        // var storelist = that.listmxstore;
        // storelist.reload()
        that.locQuery(that);
        Ext.MessageBox.alert("提示", "过户单费用项目已保存!");
      } else {
        Ext.MessageBox.alert("错误!", result.msg);
      }
    },
    failure: function () {
      Ext.MessageBox.alert("错误!", "发生错误！");
    },
  });
};
Ext.define("MyApp.view.main.wxcpgfgl.wxCpgfdshShowView", {
  extend: "Ext.window.Window",
  xtype: "cpgfshformwindow",
  reference: "popupCpgfdWindow",
  itemId: "cpgfdshowview",
  bind: {
    title: "{title}",
  },
  width: "95%",
  height: 500,
  minWidth: 600,
  requires: [
    "MyApp.view.main.report.PrintwxCpgfd",
    "MyApp.view.main.wxcpgfgl.wxCpgfdCtrlFunction",
    "MyApp.view.main.wxcpgfgl.wxCpgfdshStore",
  ],
  minHeight: 400,
  layout: "fit",
  closeAction: "destroy",
  bodyPadding: 5,
  plain: true,
  maximizable: true,
  //viewModel: {
  //    type: 'CpgfdViewModel'
  //},
  modal: true,
  items: [
    {
      xtype: "form",
      reference: "windowForm",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      autoScroll: true,
      // bodyPadding: 5,
      height: "100%",
      border: false,
      items: [
        {
          // xtype: 'fieldcontainer',
          //  width: "100%",
          //   height: 85,
          margin: "0 0 0 0",
          defaultType: "textfield",
          fieldDefaults: {
            labelWidth: 40,
            frame: true,
          },
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: {
                type: "hbox",
                align: "stretch",
              },
              defaults: {
                labelWidth: 60,
                //hideLabel: true
              },
              items: [
                {
                  name: "khid",
                  fieldLabel: "id",
                  hidden: true,
                  bind: "{khid}",
                },
                {
                  name: "khmc",
                  fieldLabel: "客户名称",
                  flex: 2,
                  readOnly: true,
                  bind: "{khmc}",
                  margin: "0 10 0 0",
                },
                {
                  xtype: "datefield",
                  name: "kdrq",
                  width: 160,
                  bind: "{kdrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "开单日期",
                  allowBlank: false,
                  margin: "0 10 0 0",
                },
                {
                  name: "gfdh",
                  labelWidth: 30,
                  fieldLabel: "No",
                  width: 160,
                  readOnly: true,
                  bind: "{gfdh}",
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: {
                type: "hbox",
                align: "stretch",
              },
              defaults: {
                //                           flex: 1,
                labelWidth: 60,
              },
              items: [
                {
                  name: "sfdh",
                  fieldLabel: "仓库名称",
                  bind: "{ckmc}",
                  flex: 1,
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "cphm",
                  fieldLabel: "车牌号码",
                  flex: 1,
                  bind: "{cphm}",
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "sfr",
                  fieldLabel: "送货人",
                  flex: 1,
                  bind: "{sfr}",
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  xtype: "datefield",
                  name: "gfrq",
                  width: 160,
                  bind: "{gfrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "过车日期",
                  allowBlank: false,
                },
              ],
            },
          ],
        },
        {
          xtype: "grid",
          height: 220,
          border: 1,
          columnLines: true,
          enableColumnHide: false,
          store: { type: "wxCpgfdshStore" },
          //bind: "{cpgfdmxStore}",
          //store:cpgfdmxStore,
          reference: "CpgfdmxGrid",
          itemId: "CpgfdmxGrid",
          margin: "0 0 0 0",
          //title: 'Orders',
          //   bind: '{theCustomer.orders}',
          //  tbar: [{
          //     text: 'Add Order',
          //     handler: 'onAddOrderClick'
          // }],
          columns: [
            {
              text: "产地",
              dataIndex: "cdmc",
              flex: 1,
              //width: 80,
              sortable: false,
              // renderer: 'renderOrderId'
            },
            {
              text: "商品名称",
              dataIndex: "cpmc",
              sortable: false,
              //width: 150
              flex: 2,
            },
            {
              text: "包装",
              sortable: false,
              dataIndex: "bzmc",
              //width: 140
              flex: 2,
            },
            {
              text: "规格型号",
              sortable: false,
              dataIndex: "cpgg",
              width: 120,
            },
            {
              text: "批号",
              sortable: false,
              dataIndex: "cpph",
              width: 70,
            },
            {
              text: "单位",
              sortable: false,
              dataIndex: "jldw",
              width: 50,
            },
            {
              text: "计划过户数量",
              columns: [
                {
                  xtype: "numbercolumn",
                  text: "数量",
                  sortable: false,
                  dataIndex: "khsl",
                  width: 80,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "重量",
                  sortable: false,
                  dataIndex: "khzl",
                  width: 80,
                  renderer: zlrenderer,
                },
              ],
            },
            {
              text: "实际已过户数量",
              columns: [
                {
                  xtype: "numbercolumn",
                  text: "数量",
                  sortable: false,
                  dataIndex: "sl",
                  width: 80,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "重量",
                  sortable: false,
                  dataIndex: "zl",
                  width: 80,
                  renderer: zlrenderer,
                },
              ],
            },
            {
              text: "过户费用",
              columns: [
                {
                  xtype: "numbercolumn",
                  text: "单价",
                  width: 64,
                  sortable: false,
                  dataIndex: "dj",
                  renderer: jerenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "金额",
                  width: 70,
                  sortable: false,
                  dataIndex: "je",
                  renderer: jerenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "现付",
                  width: 70,
                  sortable: false,
                  dataIndex: "xjje",
                  renderer: jerenderer,
                },
              ],
            },
            {
              text: "过户作业资料",
              columns: [
                {
                  text: "搬运",
                  width: 70,
                  sortable: false,
                  dataIndex: "byg",
                },
                {
                  text: "机械",
                  width: 70,
                  sortable: false,
                  dataIndex: "gs",
                },
                {
                  text: "仓管",
                  width: 70,
                  sortable: false,
                  dataIndex: "cg",
                },
                {
                  xtype: "widgetcolumn",
                  sortable: false,
                  width: 0,
                  bind: {
                    width: "{w}",
                  },
                  widget: {
                    xtype: "button",
                    text: "...",
                    bind: {
                      hidden: "{gsop}",
                    },
                    handler: "onSelectWorkerView",
                  },
                },
              ],
            },
          ],
          listeners: {
            itemcontextmenu: function (tree, record, item, index, e, eOpts) {
              //console.log("that", that, that.gfdrecord);
              that.record = record;
              that.recordID = record;
              var gfdrec = that.gfdrecord.data;
              //console.log("rec", record.data.jeid, gfdrec);
              if (gfdrec.ztbz > 3 || gfdrec.ztbz < 1 || gfdrec.delbz) return;
              if (record.data.jeid > 0) {
                var menu_grid = new Ext.menu.Menu({
                  items: [
                    {
                      text: "删除当前作业项目",
                      icon: "images/delete.gif",
                      handler: function () {
                        //console.log("删除当前作业项目");
                        var abc = Ext.Msg.confirm(
                          "注意",
                          "真的删除当前作业项目内容？",
                          function (e) {
                            if (e == "yes") {
                              Ext.Ajax.request({
                                method: "GET",
                                url: sys_ActionPHP,
                                headers: {
                                  "my-header": "linfuyang",
                                },
                                params: {
                                  act: "cpgfdjesave",
                                  jeid: record.data.jeid,
                                  userInfo: base64encode(
                                    Ext.encode(obj2str(sys_userInfo))
                                  ),
                                  p_l_id: sys_location_id,
                                },
                                scope: this,
                                success: function (response) {
                                  var result = Ext.decode(
                                    response.responseText
                                  );
                                  //console.log(result);
                                  if (result.result == "success") {
                                    var p =
                                      that.lookupReference("popupCpgfdWindow");
                                    var mgfid = p.getViewModel().get("gfid");
                                    var store = that
                                      .lookupReference("CpgfdmxGrid")
                                      .getStore();
                                    // store.proxy.extraParams.gfid =  mgfid;
                                    // store.proxy.extraParams.loc = 'cpgfdmxcwsh';
                                    store.reload();
                                    //var storelist = that.listmxstore;
                                    //storelist.reload()
                                    that.locQuery(that);
                                    Ext.MessageBox.alert(
                                      "提示",
                                      "出库单费用项目已删除!"
                                    );
                                  } else {
                                    Ext.MessageBox.alert("错误!", result.msg);
                                  }
                                },
                                failure: function () {
                                  Ext.MessageBox.alert("错误!", "发生错误！");
                                },
                              });
                            }
                          }
                        );
                      },
                    },
                    {
                      text: "选择项目作业人员",
                      disabled: gfdrec.ztbz == 0,
                      handler: function () {
                        //console.log("选择项目作业人员");
                        var view = that.getView();
                        that.dialog = view.add({
                          xtype: "selectWorkerWindow",
                          session: true,
                        });
                        that.dialog.show();
                      },
                    },
                  ],
                });
              } else {
                //if (gfdrec.ztbz<2) return ;
                var menu_grid = new Ext.menu.Menu({
                  items: [
                    {
                      text: "增加新的作业项目",
                      icon: "images/add.gif",
                      handler: function () {
                        //console.log("增加新的作业项目");
                        var rec = record;
                        var gfdrec = that.gfdrecord.data;
                        that.popupmx = that.getView().down("#CpgfdmxGrid");
                        var obj = [];
                        obj["xjbz"] = gfdrec.xjbz;
                        obj["khid"] = gfdrec.khid;
                        obj["bzid"] = rec.data.bzid;
                        //console.log("bzid", rec, obj, that.popupmx);
                        treeSelect(
                          "work",
                          that,
                          obj,
                          that.popupmx,
                          false,
                          gfdworkCallBack
                        );
                        return false;
                      },
                    },
                  ],
                });
              }
              var position = e.getXY();
              e.stopEvent();
              menu_grid.showAt(position);
            },
          },
        },
        {
          xtype: "fieldcontainer",
          //title:'NORTH',
          height: 100,
          defaultType: "textfield",
          fieldDefaults: {
            labelWidth: 40,
            frame: true,
          },
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              xtype: "fieldcontainer",
              //  fieldLabel: 'Availability',
              //combineErrors: true,
              msgTarget: "side",
              defaultType: "textfield",
              layout: {
                type: "hbox",
                align: "stretch",
              },
              defaults: {
                flex: 1,
                labelWidth: 60,
                readOnly: true,
                margin: "3 10 0 0",
              },
              items: [
                {
                  name: "czy",
                  fieldLabel: "操作员",
                  bind: "{czy}",
                },
                {
                  name: "shr",
                  fieldLabel: "业务审核",
                  bind: "{shr}",
                },
                {
                  name: "cwsh",
                  fieldLabel: "财务审核",
                  bind: "{cwsh}",
                },
                {
                  name: "ckshr",
                  fieldLabel: "仓库复核",
                  bind: "{ckshr}",
                },
                {
                  name: "ckid",
                  fieldLabel: "ckid",
                  bind: "{ckid}",
                  hidden: true,
                },
              ],
            },
            ,
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: {
                type: "hbox",
                align: "stretch",
              },
              defaults: {
                flex: 1,
                readOnly: true,
                labelWidth: 60,
                margin: "3 10 0 0",
              },
              items: [
                {
                  name: "cnote",
                  fieldLabel: "备注",
                  bind: "{cnote}",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  buttons: [
    {
      text: "取消此过车内容",
      icon: "images/delete.gif",
      hidden: true,
      //@ts-check  bind: {
      //      hidden: "{btnButtonHidden}"
      //},
      itemId: "btnwxCpgfdDelete",
    },
    "->",
    {
      text: "审核通过此单",
      icon: "images/right.gif",
      hidden: true,
      itemId: "btnCpgfdSave",
    },
    {
      text: "打印此单",
      icon: "images/print.gif",
      disabled: !LODOP,
      itemId: "btnPrintCpgfd",
    },
    {
      text: "取消上步审核",
      icon: "images/unDo.gif",
      hidden: true,
      itemId: "btnCpgfdCancel",
    },
    {
      text: "返回.",
      icon: "images/close.gif",
      handler: function () {
        //this.up("#cpgfdshowview").close();
        this.up("window").close();
        //this.up("window").close();
      },
    },
  ],
});
