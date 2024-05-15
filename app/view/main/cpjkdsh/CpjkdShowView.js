var that;
var jkdworkCallBack = function (node) {
  var workrec = node.data;
  var jkmxrec = that.record.data;
  console.log("workrec", workrec);
  console.log("recId", that.recordID.data);
  console.log("rec", that.record.data);
  var cpjkd = {};
  var arrayjemx = [];
  var jemx = {};
  //work,byg,gs,cg,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj
  jemx["work"] = workrec.text;
  jemx["byg"] = "";
  jemx["gs"] = "";
  jemx["cg"] = "";
  if (workrec.zljs > 0) {
    jemx["dw"] = "吨";
    jemx["sl"] = jkmxrec.jczl;
  } else {
    jemx["dw"] = jkmxrec.jldw;
    jemx["sl"] = jkmxrec.jcsl;
  }
  jemx["dj"] = workrec.dj;
  jemx["je"] = workrec.dj * jemx["sl"];
  jemx["workid"] = workrec.id;
  jemx["mxid"] = jkmxrec.mxid;
  jemx["xjbz"] = 0;
  jemx["zljs"] = workrec.zljs;
  jemx["inbz"] = 0;
  jemx["indj"] = 0;
  arrayjemx.push(jemx);
  cpjkd["cpjkdje"] = arrayjemx;
  console.log("jkd", cpjkd);
  //    return;
  var str = obj2str(cpjkd);
  var encodedString = base64encode(Ext.encode(str));
  Ext.Ajax.request({
    method: "GET",
    url: sys_ActionPHP,
    params: {
      act: "cpjkdjesave",
      userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
      p_l_id: sys_location_id,
      data: encodedString,
    },
    scope: this,
    success: function (response) {
      var result = Ext.decode(response.responseText);
      if (result.result == "success") {
        var store = that.lookupReference("CpjkdmxGrid").getStore();
        store.proxy.extraParams.jkid = that.mainrecord.jkid;
        store.proxy.extraParams.loc = that.locname;
        store.reload();
        //var storelist = that.listmxstore;
        //storelist.reload()
        that.locQuery(that);
        Ext.MessageBox.alert("提示", "进库单费用项目已保存!");
      } else {
        Ext.MessageBox.alert("错误!", result.msg);
      }
    },
    failure: function () {
      Ext.MessageBox.alert("错误!", "发生错误！");
    },
  });
};
Ext.define("MyApp.view.main.cpjkdsh.CpjkdShowView", {
  extend: "Ext.window.Window",
  xtype: "formcpjkdwindow",
  reference: "popupCpjkdWindow",
  itemId: "cpjkdshowview",
  bind: {
    title: "{title}",
  },
  requires: ["MyApp.view.main.report.PrintCpjkd"],
  width: "90%",
  height: 600,
  minWidth: 600,
  minHeight: 400,
  layout: "fit",
  closeAction: "destroy",
  bodyPadding: 5,
  plain: true,
  maximizable: true,
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
      border: false,
      items: [
        {
          margin: "0 0 0 0",
          defaultType: "textfield",
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
                  name: "area",
                  fieldLabel: "存放分区",
                  width: 200,
                  hidden: sys_location_areas < 2,
                  readOnly: true,
                  bind: "{area}",
                  margin: "0 10 0 0",
                },
                {
                  name: "jkdh",
                  fieldLabel: "进库单号",
                  width: 200,
                  readOnly: true,
                  bind: "{jkdh}",
                  margin: "0 0 0 0",
                },
                /* {
                                 xtype: 'datefield',
                                 name: 'jkrq',
                                 width: 200,
                                 bind: "{jkrq}",
                                 format: 'Y-m-d',
                                 readOnly: true,
                                 fieldLabel: '进库日期',
                                 allowBlank: false
                             }*/
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
                  fieldLabel: "送货单号",
                  bind: "{sfdh}",
                  flex: 1,
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "cphm",
                  fieldLabel: "送货车牌",
                  flex: 1,
                  bind: "{cphm}",
                  readOnly: true,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "sfr",
                  fieldLabel: "送货人员",
                  flex: 1,
                  readOnly: true,
                  bind: "{sfr}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  xtype: "datefield",
                  name: "czrq",
                  width: 200,
                  bind: "{czrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "进库日期",
                  allowBlank: false,
                },
              ],
            },
          ],
        },
        {
          xtype: "grid",
          height: 230,
          border: 1,
          store: { type: "CpjkdmxStore" },
          reference: "CpjkdmxGrid",
          enableHdMenu: false,
          enableColumnHide: false,
          collapsible: false,
          columnLines: true,
          animCollapse: false,
          itemId: "CpjkdmxGrid",
          margin: "0 0 0 0",
          columns: [
            {
              text: "产地",
              dataIndex: "cdmc",
              sortable: false,
              flex: 2,
            },
            {
              text: "商品名称",
              dataIndex: "cpmc",
              sortable: false,
              flex: 3,
            },
            {
              text: "包装",
              sortable: false,
              dataIndex: "bzmc",
              flex: 3,
            },
            {
              text: "规格型号",
              sortable: false,
              dataIndex: "cpgg",
              flex: 2,
            },
            {
              text: "单位",
              sortable: false,
              dataIndex: "jldw",
              width: 50,
            },
            {
              text: "入库数量",
              columns: [
                {
                  xtype: "numbercolumn",
                  sortable: false,
                  text: "数量",
                  dataIndex: "jcsl",
                  width: 80,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  sortable: false,
                  text: "重量",
                  dataIndex: "jczl",
                  width: 80,
                  renderer: zlrenderer,
                },
              ],
            },
            {
              text: "费用",
              columns: [
                {
                  xtype: "numbercolumn",
                  sortable: false,
                  text: "单价",
                  width: 70,
                  dataIndex: "czdj",
                  renderer: jerenderer,
                },
                {
                  xtype: "numbercolumn",
                  sortable: false,
                  text: "金额",
                  width: 70,
                  dataIndex: "jcje",
                  renderer: jerenderer,
                },
                {
                  xtype: "numbercolumn",
                  sortable: false,
                  text: "现付",
                  hidden: true,
                  width: 60,
                  dataIndex: "xjje",
                  renderer: jerenderer,
                },
              ],
            },
            {
              text: "作业资料",
              columns: [
                {
                  text: "机械",
                  width: 70,
                  dataIndex: "gs",
                },
                {
                  text: "搬运",
                  sortable: false,
                  width: 70,
                  dataIndex: "byg",
                },
                {
                  text: "仓管",
                  sortable: false,
                  width: 70,
                  dataIndex: "cg",
                },
                {
                  xtype: "widgetcolumn",
                  width: 0,
                  bind: {
                    width: "{w}",
                  },
                  sortable: false,
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
            select: "onCpjkdmxItemSelected",
            // itemcontextmenu:'onCpjkdmxItemcontextmenu'
            itemcontextmenu: function (tree, record, item, index, e, eOpts) {
              // Optimize : create menu once
              that.record = record;
              that.recordID = record;
              var jkdrec = that.jkdrecord;
              console.log("rec", record.data.jeid, jkdrec);
              if (jkdrec.ztbz > 2 || jkdrec.delbz) return;
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
                                  act: "cpjkdjesave",
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
                                      that.lookupReference("popupCpjkdWindow");
                                    var mjkid = p.getViewModel().get("jkid");
                                    var store = that
                                      .lookupReference("CpjkdmxGrid")
                                      .getStore();
                                    store.proxy.extraParams.jkid =
                                      that.mainrecord.jkid;
                                    store.proxy.extraParams.loc = that.locname;
                                    store.reload();
                                    //   var storelist = that.listmxstore;
                                    //   storelist.reload()
                                    that.locQuery(that);
                                    Ext.MessageBox.alert(
                                      "提示",
                                      "进库单费用项目已删除!"
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
                      disabled: jkdrec.ztbz == 0,
                      handler: function () {
                        console.log("选择项目作业人员");
                        //this.onCpjkdmxItemworkerselected(record);
                        //that.onCpjkdmxItemworkerselected(record);
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
                var menu_grid = new Ext.menu.Menu({
                  items: [
                    {
                      text: "增加新的作业项目",
                      icon: "images/add.gif",
                      handler: function () {
                        console.log("增加新的作业项目");
                        // that.fireEvent('addWorkerRow', this);
                        var rec = record; //  button.getWidgetRecord();
                        console.log("rec", rec);
                        that.popupmx = that.getView().down("#CpjkdmxGrid");
                        var khrec = that
                          .lookupReference("popupCpjkdWindow")
                          .getViewModel();
                        var jkdrec = that.jkdrecord;
                        console.log("khrec", khrec, jkdrec);
                        var obj = [];
                        obj["khid"] = jkdrec.khid;
                        obj["xjbz"] = 0;
                        obj["bzid"] = rec.data.bzid;
                        console.log("bzid", rec, obj);
                        treeSelect(
                          "work",
                          that,
                          obj,
                          that.popupmx,
                          false,
                          jkdworkCallBack
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
          reference: "cpjkdmxcw0",
          itemId: "cpjkdmxcw0",
          columnLines: true,
          //             enableHdMenu: false,
          enableColumnHide: false,
          //           collapsible: false,
          animCollapse: false,
          store: { type: "CpjkdcwStore" },
          columns: [
            {
              text: "仓位",
              sortable: false,
              flex: 1,
              dataIndex: "cw",
            },
            {
              text: "商品批号",
              sortable: false,
              flex: 1,
              dataIndex: "cpph",
            },
            {
              xtype: "numbercolumn",
              text: "数量",
              sortable: false,
              flex: 1,
              dataIndex: "sl",
              renderer: zlrenderer,
            },
            {
              text: "单位",
              sortable: false,
              flex: 1,
              dataIndex: "dw",
            },
            {
              xtype: "numbercolumn",
              text: "重量",
              dataIndex: "zl",
              sortable: false,
              flex: 1,
              renderer: zlrenderer,
            },
            /*{
                        xtype: 'numbercolumn',
                        text: '仓租单价',
                        sortable: false,
                        flex: 1,
                        dataIndex: 'czdj',
                        renderer: jerenderer
                    },*/
            {
              text: "仓位说明",
              sortable: false,
              flex: 1,
              dataIndex: "sm",
            },
          ],
        },
        //***********************************************************/
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
                  name: "cgy",
                  fieldLabel: "仓库复核",
                  bind: "{cgy}",
                  margin: "3 0 0 0",
                },
                {
                  name: "jkid",
                  fieldLabel: "jkid",
                  bind: "{jkid}",
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
        {
          xtype: "fieldset",
          title: "附件",
          reference: "imageShow",
          itemId: "imageShow",
          collapsible: true,
          layout: {
            type: "vbox",
            align: "stretch",
          },
        },
      ],
    },
  ],
  buttons: [
    {
      text: "删除此单",
      icon: "images/delete.gif",
      hidden: true,
      itemId: "btnCpjkdDelete",
    },
    {
      text: "此单已删除!!",
      bind: {
        hidden: "{!delbz}",
      },
    },
    {
      text: "上传图片",
      margin: "0 0 0 300",
      icon: "images/add.gif",
      hidden: true,
      itemId: "btnImagesAdd", //,
      //handler: 'onBtnImagesAdd'
    },
    "->",
    {
      text: "审核通过此单",
      icon: "images/right.gif",
      hidden: true,
      itemId: "btnCpjkdSave",
    },
    {
      text: "打印此单",
      icon: "images/print.gif",
      // hidden:sys_location_id=0 ,
      disabled: !LODOP,
      itemId: "btnPrintCpjkd",
    },
    {
      text: "返回",
      icon: "images/close.gif",
      handler: function () {
        this.up("window").close();
      },
    },
  ],
});
