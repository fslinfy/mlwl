Ext.define("MyApp.view.main.cpgfgl.CpgfdShowView", {
  extend: "Ext.window.Window",
  xtype: "formcpgfdwindow",
  reference: "popupCpgfdWindow",
  itemId: "cpgfdshowview",
  bind: {
    title: "{title}",
  },
  requires: ["MyApp.view.main.report.PrintCpgfd"],
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
                  name: "gfdh",
                  fieldLabel: "进库单号",
                  width: 200,
                  readOnly: true,
                  bind: "{gfdh}",
                  margin: "0 0 0 0",
                },
                /* {
                                 xtype: 'datefield',
                                 name: 'gfrq',
                                 width: 200,
                                 bind: "{gfrq}",
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
          store: { type: "CpgfdmxStore" },
          reference: "CpgfdmxGrid",
          enableHdMenu: false,
          enableColumnHide: false,
          collapsible: false,
          columnLines: true,
          animCollapse: false,
          itemId: "CpgfdmxGrid",
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
                    text: "",
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
            select: "onCpgfdmxItemSelected",
          },
        },
        {
          xtype: "grid",
          height: 150,
          border: 1,
          reference: "cpgfdmxcw0",
          itemId: "cpgfdmxcw0",
          columnLines: true,
          //             enableHdMenu: false,
          enableColumnHide: false,
          //           collapsible: false,
          animCollapse: false,
          store: { type: "CpgfdcwStore" },
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
                  name: "gfid",
                  fieldLabel: "gfid",
                  bind: "{gfid}",
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
      itemId: "btnCpgfdDelete",
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
      itemId: "btnCpgfdSave",
    },
    {
      text: "打印此单",
      icon: "images/print.gif",
      // hidden:sys_location_id=0 ,
      disabled: !LODOP,
      itemId: "btnPrintCpgfd",
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
