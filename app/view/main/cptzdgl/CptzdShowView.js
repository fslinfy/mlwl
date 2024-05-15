Ext.define("MyApp.view.main.cptzdgl.CptzdShowView", {
  extend: "Ext.window.Window",
  xtype: "formcptzdwindow",
  reference: "popupmxShowWindow",
  bind: { title: "{title}" },
  itemId: "cptzdshowview",
  width: "95%",
  height: 610,
  minWidth: 600,
  minHeight: 500,
  layout: "fit",
  maximizable: true,
  closeAction: "destroy",
  bodyPadding: 10,
  modal: true,
  items: [
    {
      xtype: "form",
      reference: "windowShowFormmx",
      itemId: "windowShowFormmx",
      layout: { type: "vbox", align: "stretch" },
      border: false,
      items: [
        {
          height: 86,
          border: false,
          margin: "0 0 0 0",
          defaults: {
            flex: 1,
            xtype: "fieldcontainer",
            msgTarget: "side",
            readOnly: true,
            defaultType: "textfield",
          },
          layout: { type: "vbox", align: "stretch" },
          items: [
            {
              fieldDefaults: { labelWidth: 60, flex: 1, frame: true },
              layout: { type: "hbox", align: "stretch" },
              items: [
                {
                  xtype: "numberfield",
                  name: "khid",
                  fieldLabel: "id",
                  hidden: true,
                  bind: "{khid}",
                },
                {
                  name: "khmc",
                  fieldLabel: "\u5ba2\u6237\u540d\u79f0",
                  flex: 3,
                  readOnly: true,
                  bind: "{khmc}",
                  margin: "0 10 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "ckid",
                  fieldLabel: "id",
                  hidden: true,
                  bind: "{ckid}",
                },
                {
                  name: "ckmc",
                  fieldLabel: "\u8c03\u8d26\u4ed3\u5e93",
                  flex: 3,
                  readOnly: true,
                  bind: "{ckmc}",
                  margin: "0 10 0 0",
                },
                {
                  name: "tzdh",
                  fieldLabel: "\u8c03\u8d26\u5355\u53f7",
                  flex: 3,
                  readOnly: true,
                  bind: "{tzdh}",
                },
                {
                  xtype: "datefield",
                  name: "tzrq",
                  flex: 2,
                  bind: "{tzrq}",
                  format: "Y-m-d",
                  fieldLabel: "\u8c03\u8d26\u65e5\u671f",
                  allowBlank: false,
                },
              ],
            },
            {
              fieldDefaults: { labelWidth: 60, readOnly: true, frame: true },
              layout: { type: "hbox", align: "stretch" },
              items: [
                {
                  xtype: "numberfield",
                  name: "newkhid",
                  fieldLabel: "id",
                  hidden: true,
                  bind: "{newkhid}",
                },
                {
                  name: "newkhmc",
                  fieldLabel: "\u8c03\u5165\u5ba2\u6237",
                  flex: 2,
                  readOnly: true,
                  bind: "{newkhmc}",
                  margin: "0 0 0 0",
                },
                {
                  xtype: "button",
                  text: "...",
                  width: 30,
                  margin: "0 10 0 0",
                  handler: "onSelectKhbmView",
                },
                {
                  xtype: "numberfield",
                  name: "tzsl",
                  fieldLabel: "\u8c03\u8d26\u6570\u91cf",
                  bind: "{tzsl}",
                  hideTrigger: true,
                  readOnly: true,
                  flex: 1,
                  margin: "0 10 0 0",
                  decimalPrecision: 3,
                },
                {
                  xtype: "numberfield",
                  name: "tzzl",
                  fieldLabel: "\u8c03\u8d26\u91cd\u91cf",
                  flex: 1,
                  bind: "{tzzl}",
                  hideTrigger: true,
                  readOnly: true,
                  decimalPrecision: 3,
                  margin: "0 10 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "tzje",
                  fieldLabel: "\u8c03\u8d26\u8d39\u7528",
                  flex: 1,
                  bind: "{tzje}",
                  hideTrigger: true,
                  readOnly: true,
                  enabled: false,
                  decimalPrecision: 2,
                  margin: "0 5 0 0",
                },
                {
                  xtype: "checkbox",
                  fieldLabel: "\u8c03\u5165\u5ba2\u6237\u4ed8\u8d39",
                  name: "jekh",
                  labelWidth: 90,
                  flex: 1,
                  margin: "0 5 0 10",
                  bind: "{jekh}",
                },
              ],
            },
          ],
        },
        {
          margin: "0 0 0 0",
          defaultType: "textfield",
          fieldDefaults: { labelWidth: 40, frame: true },
          layout: { type: "vbox", align: "stretch" },
          items: [
            {
              xtype: "grid",
              border: 1,
              height: 300,
              reference: "cptzdmxShowGrid",
              itemId: "cptzdmxShowGrid",
              columnLines: true,
              enableColumnHide: false,
              store: { type: "CptzdmxStore" },
              columns: [
                {
                  text: "\u5546\u54c1\u540d\u79f0",
                  dataIndex: "cpmc",
                  sortable: false,
                  width: 180,
                },
                {
                  text: "\u4ea7\u5730\u540d\u79f0",
                  dataIndex: "cdmc",
                  sortable: false,
                  width: 100,
                },
                {
                  text: "\u5305\u88c5",
                  dataIndex: "bzmc",
                  sortable: false,
                  width: 170,
                },
                {
                  text: "\u89c4\u683c\u578b\u53f7",
                  dataIndex: "cpgg",
                  sortable: false,
                  width: 80,
                },
                {
                  text: "\u5355\u4f4d",
                  dataIndex: "jldw",
                  sortable: false,
                  width: 60,
                },
                {
                  xtype: "numbercolumn",
                  text: "\u5355\u4ef7",
                  sortable: false,
                  width: 60,
                  dataIndex: "czdj",
                  renderer: jerenderer,
                },
                {
                  xtype: "datecolumn",
                  text: "\u8d77\u79df\u65e5\u671f",
                  sortable: false,
                  width: 90,
                  format: "y-m-d",
                  dataIndex: "czrq",
                },
                {
                  text: "\u533a",
                  dataIndex: "area",
                  hidden: true,
                  sortable: false,
                  width: 35,
                },
                {
                  text: "\u4ed3\u4f4d",
                  sortable: false,
                  dataIndex: "cw",
                  width: 60,
                },
                {
                  text: "\u5546\u54c1\u6279\u53f7",
                  dataIndex: "cpph",
                  sortable: false,
                  width: 100,
                },
                {
                  text: "\u4ed3\u4f4d\u8bf4\u660e",
                  sortable: false,
                  dataIndex: "sm",
                  width: 100,
                },
                {
                  text: "\u8c03\u5165\u5185\u5bb9",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      text: "\u8c03\u8d26\u6570\u91cf",
                      dataIndex: "tzsl",
                      sortable: false,
                      width: 100,
                      renderer: zlrenderer,
                    },
                    {
                      xtype: "numbercolumn",
                      text: "\u8c03\u8d26\u91cd\u91cf",
                      dataIndex: "tzzl",
                      sortable: false,
                      width: 100,
                      renderer: zlrenderer,
                    },
                    {
                      text: "\u4ed3\u4f4d",
                      sortable: false,
                      dataIndex: "newcw",
                      width: 60,
                    },
                    {
                      text: "\u6279\u53f7",
                      sortable: false,
                      dataIndex: "newcpph",
                      width: 100,
                    },
                    {
                      xtype: "numbercolumn",
                      text: "\u5355\u4ef7",
                      sortable: false,
                      dataIndex: "czdj",
                      hidden: true,
                      width: 80,
                      renderer: jerenderer,
                    },
                    {
                      xtype: "datecolumn",
                      text: "\u8d77\u79df\u65e5\u671f",
                      sortable: false,
                      dataIndex: "newczrq",
                      width: 90,
                      format: "y-m-d",
                    },
                    {
                      text: "\u8bf4\u660e",
                      sortable: false,
                      dataIndex: "newsm",
                      width: 100,
                    },
                  ],
                },
                {
                  text: "\u4f5c\u4e1a\u8d44\u6599",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      text: "\u91d1\u989d",
                      dataIndex: "tzje",
                      width: 80,
                      sortable: false,
                      renderer: jerenderer,
                    },
                    {
                      text: "\u673a\u68b0",
                      width: 70,
                      sortable: false,
                      dataIndex: "gs",
                    },
                    {
                      text: "\u642c\u8fd0",
                      width: 70,
                      sortable: false,
                      dataIndex: "byg",
                    },
                    {
                      text: "\u4ed3\u7ba1",
                      width: 70,
                      sortable: false,
                      dataIndex: "cg",
                    },
                    {
                      xtype: "widgetcolumn",
                      width: 0,
                      bind: { width: "{w}" },
                      sortable: false,
                      widget: {
                        xtype: "button",
                        text: "...",
                        bind: { hidden: "{gsop}" },
                        handler: "onSelectWorkerView",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldcontainer",
          height: 100,
          defaultType: "textfield",
          fieldDefaults: { labelWidth: 40, frame: true },
          layout: { type: "vbox", align: "stretch" },
          items: [
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: { type: "hbox", align: "stretch" },
              defaults: {
                flex: 1,
                labelWidth: 60,
                readOnly: true,
                margin: "3 10 0 0",
              },
              items: [
                {
                  name: "czy",
                  fieldLabel: "\u64cd\u4f5c\u5458",
                  bind: "{czy}",
                },
                {
                  name: "shr",
                  fieldLabel: "\u5ba1\u6838\u5458",
                  bind: "{shr}",
                },
                {
                  name: "cwr",
                  fieldLabel: "\u8d22\u52a1\u51fa\u7eb3",
                  bind: "{cwr}",
                },
                {
                  name: "cgy",
                  fieldLabel: "\u4ed3\u5e93\u7ba1\u7406",
                  bind: "{cgy}",
                  margin: "3 0 0 0",
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: { type: "hbox", align: "stretch" },
              defaults: { flex: 1, labelWidth: 60, margin: "3 10 0 0" },
              items: [
                {
                  name: "cnote",
                  fieldLabel: "\u5907\u6ce8",
                  readOnly: true,
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
      text: "\u5220\u9664\u6b64\u8c03\u8d26\u5355",
      icon: "images/right.gif",
      hidden: true,
      itemId: "btnCptzdDeleteSave",
    },
    { text: "\u6b64\u5355\u5df2\u5220\u9664!!", bind: { hidden: "{!delbz}" } },
    "-\x3e",
    {
      text: "\u901a\u8fc7\u5ba1\u6838",
      icon: "images/right.gif",
      hidden: true,
      itemId: "btnCptzdOkSave",
    },
    {
      text: "\u6253\u5370\u6b64\u5355",
      icon: "images/print.gif",
      disabled: !LODOP,
      itemId: "btnPrintCptzd",
    },
    {
      text: "\u53d6\u6d88\u4e0a\u6b65\u5ba1\u6838",
      icon: "images/unDo.gif",
      hidden: true,
      itemId: "btnCptzdCancel",
    },
    {
      text: "\u653e\u5f03",
      icon: "images/close.gif",
      handler: function () {
        this.up("window").close();
      },
    },
  ],
});
