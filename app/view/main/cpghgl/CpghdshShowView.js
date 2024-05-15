var that;
var ghdworkCallBack = function (node) {
  var workrec = node.data;
  var ghmxrec = that.record.data;
  var ghdrec = that.ghdrecord.data;
  console.log("ghdrec", ghdrec);
  console.log("workrec", workrec);
  console.log("recId", that.recordID.data);
  console.log("rec", that.record.data);
  var cpghd = {};
  var arrayjemx = [];
  var jemx = {};
  //work,byg,gs,cg,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj
  jemx["work"] = workrec.text;
  jemx["byg"] = "";
  jemx["gs"] = "";
  jemx["cg"] = "";
  if (workrec.zljs == "1") {
    jemx["dw"] = "吨";
    jemx["sl"] = ghmxrec.ghzl;
  } else {
    jemx["dw"] = ghmxrec.jldw;
    jemx["sl"] = ghmxrec.ghsl;
  }
  jemx["dj"] = workrec.bydj;
  jemx["je"] = jemx["dj"] * jemx["sl"];
  if (ghdrec.xjbz) {
    jemx["xjbz"] = 1;
    // console.log('xjbz', ghdrec.xjbz,1);
    jemx["xjje"] = jemx["dj"] * jemx["sl"];
  } else {
    jemx["xjbz"] = 0;
    jemx["xjje"] = 0;
    // console.log('xjbz', ghdrec.xjbz,0);
  }
  jemx["workid"] = workrec.id;
  jemx["mxid"] = ghmxrec.mxid;
  jemx["zljs"] = workrec.zljs;
  jemx["inbz"] = 0;
  jemx["indj"] = 0;
  arrayjemx.push(jemx);
  cpghd["cpghdje"] = arrayjemx;
  console.log("ghd", cpghd);
  //    return;
  var str = obj2str(cpghd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpghdjesave",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      data: encodedString,
    },
    scope: this,
    success: function (response) {
      var result = Ext.decode(response.responseText);
      if (result.result == "success") {
        var store = that.lookupReference("CpghdmxGrid").getStore();
        //               store.proxy.extraParams.ghid =  ghmxrec.ghid;
        //             store.proxy.extraParams.loc = 'cpghdmxcwsh';
        store.reload();
        //           var storelist = that.listmxstore;
        //         storelist.reload()
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
Ext.define("MyApp.view.main.cpghgl.CpghdshShowView", {
  extend: "Ext.window.Window",
  xtype: "cpghshformwindow",
  reference: "popupCpghdWindow",
  itemId: "cpghdshowview",
  bind: {
    title: "{title}",
  },
  width: "95%",
  height: 600,
  //width: 1200,
  // height: 500,
  minWidth: 600,
  requires: [
    // 'MyApp.view.main.report.PrintCpghd'
    // 'MyApp.view.main.cpghgl.CpghdghshStore'
  ],
  minHeight: 400,
  layout: "fit",
  closeAction: "destroy",
  bodyPadding: 5,
  plain: true,
  maximizable: true,
  //viewModel: {
  //    type: 'CpghdViewModel'
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
                  name: "xsrq",
                  width: 160,
                  bind: "{xsrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "开单日期",
                  allowBlank: false,
                  margin: "0 10 0 0",
                },
                {
                  name: "ghdh",
                  labelWidth: 30,
                  fieldLabel: "No",
                  width: 160,
                  readOnly: true,
                  bind: "{ghdh}",
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
                  flex: 3,
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "newkhmc",
                  fieldLabel: "新客户",
                  flex: 3,
                  bind: "{newkhmc}",
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  xtype: "checkbox",
                  fieldLabel: "新客户付费用",
                  labelWidth: 100,
                  flex: 1,
                  align: "right",
                  name: "jebz",
                  readOnly: true,
                  bind: "{jebz}",
                },
                {
                  xtype: "checkbox",
                  fieldLabel: "费用付现",
                  flex: 1,
                  align: "right",
                  name: "xjbz",
                  readOnly: true,
                  bind: "{xjbz}",
                },
                {
                  xtype: "datefield",
                  name: "ghrq",
                  width: 160,
                  bind: "{ghrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "过户日期",
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
          store: { type: "CpghdghshStore" },
          //bind: "{cpghdmxStore}",
          //store:cpghdmxStore,
          reference: "CpghdmxGrid",
          itemId: "CpghdmxGrid",
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
                  dataIndex: "xssl",
                  width: 80,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "重量",
                  sortable: false,
                  dataIndex: "xszl",
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
                  dataIndex: "ghsl",
                  width: 80,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "重量",
                  sortable: false,
                  dataIndex: "ghzl",
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
                  dataIndex: "czdj",
                  renderer: jerenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "金额",
                  width: 70,
                  sortable: false,
                  dataIndex: "ccje",
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
            select: "onCpghdmxItemSelected",
            itemcontextmenu: function (tree, record, item, index, e, eOpts) {
              // Optimize : create menu once
              console.log("that", that, that.ghdrecord);
              that.record = record;
              that.recordID = record;
              var ghdrec = that.ghdrecord.data;
              console.log("rec", record.data.jeid, ghdrec);
              if (ghdrec.ztbz > 3 || ghdrec.ztbz < 1 || ghdrec.delbz) return;
              if (record.data.jeid > 0) {
                var menu_grid = new Ext.menu.Menu({
                  items: [
                    {
                      text: "删除当前作业项目",
                      icon: "images/delete.gif",
                      handler: function () {
                        console.log("删除当前作业项目");
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
                                  act: "cpghdjesave",
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
                                  console.log(result);
                                  if (result.result == "success") {
                                    var p =
                                      that.lookupReference("popupCpghdWindow");
                                    var mghid = p.getViewModel().get("ghid");
                                    var store = that
                                      .lookupReference("CpghdmxGrid")
                                      .getStore();
                                    // store.proxy.extraParams.ghid =  mghid;
                                    // store.proxy.extraParams.loc = 'cpghdmxcwsh';
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
                      disabled: ghdrec.ztbz == 0,
                      handler: function () {
                        console.log("选择项目作业人员");
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
                //if (ghdrec.ztbz<2) return ;
                var menu_grid = new Ext.menu.Menu({
                  items: [
                    {
                      text: "增加新的作业项目",
                      icon: "images/add.gif",
                      handler: function () {
                        console.log("增加新的作业项目");
                        var rec = record;
                        var ghdrec = that.ghdrecord.data;
                        that.popupmx = that.getView().down("#CpghdmxGrid");
                        var obj = [];
                        obj["xjbz"] = ghdrec.xjbz;
                        obj["khid"] = ghdrec.khid;
                        obj["bzid"] = rec.data.bzid;
                        console.log("bzid", rec, obj, that.popupmx);
                        treeSelect(
                          "work",
                          that,
                          obj,
                          that.popupmx,
                          false,
                          ghdworkCallBack
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
          xtype: "grid",
          height: 150,
          border: 1,
          reference: "cpghdmxcw0",
          itemId: "cpghdmxcw0",
          columnLines: true,
          enableColumnHide: false,
          store: { type: "CpghdcwStore" },
          columns: [
            {
              text: "区",
              dataIndex: "area",
              sortable: false,
              width: 100,
            },
            {
              text: "仓位",
              dataIndex: "cw",
              sortable: false,
              flex: 1,
            },
            /*                    {
                        text: '商品批号',
                        dataIndex: 'cpph', sortable: false,
                        flex: 1
                    },*/
            {
              xtype: "numbercolumn",
              text: "数量",
              sortable: false,
              dataIndex: "sl",
              flex: 1,
              renderer: zlrenderer,
            },
            {
              text: "单位",
              dataIndex: "dw",
              sortable: false,
              width: 50,
            },
            {
              xtype: "numbercolumn",
              text: "重量",
              sortable: false,
              dataIndex: "zl",
              flex: 1,
              renderer: zlrenderer,
            },
            {
              xtype: "datecolumn",
              text: "进库日期",
              width: 120,
              formatter: 'date("Y-m-d")',
              sortable: false,
              hideable: false,
              dataIndex: "czrq",
            },
            {
              text: "仓位说明",
              flex: 1,
              sortable: false,
              dataIndex: "sm",
            },
          ],
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
                  bind: "{ghr}",
                },
                {
                  name: "shr",
                  fieldLabel: "业务审核",
                  bind: "{shr}",
                },
                {
                  name: "cwshr",
                  fieldLabel: "财务审核",
                  bind: "{cwshr}",
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
      text: "取消此出仓内容",
      icon: "images/delete.gif",
      hidden: true,
      //  bind: {
      //      hidden: "{btnButtonHidden}"
      // },
      itemId: "btnCpghdDelete",
    },
    {
      text: "此出仓单已取消!!",
      bind: {
        hidden: "{!delbz}",
      },
    },
    "->",
    {
      text: "审核通过此单",
      icon: "images/right.gif",
      hidden: true,
      itemId: "btnCpghdSave",
    },
    {
      text: "打印此单",
      icon: "images/print.gif",
      disabled: !LODOP,
      itemId: "btnPrintCpghd",
    },
    {
      text: "取消上步审核",
      icon: "images/unDo.gif",
      hidden: true,
      itemId: "btnCpghdCancel",
    },
    {
      text: "返回",
      icon: "images/close.gif",
      handler: function () {
        //this.up("#cpghdshowview").close();
        this.up("window").close();
        //this.up("window").close();
      },
    },
  ],
});
