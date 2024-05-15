Ext.define("MyApp.view.main.xsdgl.CpxsdEdit", {
  extend: "Ext.window.Window",
  xtype: "formshwindow",
  reference: "popupWindow",
  itemId: "cpxsdedit",
  bind: { title: "{title}" },
  title: "\u5546\u54c1\u8c03\u5e10\u5904\u7406",
  width: 1e3,
  height: 500,
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
      layout: { type: "vbox", align: "stretch" },
      border: false,
      items: [
        {
          margin: "0 0 0 0",
          defaultType: "textfield",
          fieldDefaults: { labelWidth: 40, frame: true },
          layout: { type: "vbox", align: "stretch" },
          items: [
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: { type: "hbox", align: "stretch" },
              defaults: { labelWidth: 60 },
              items: [
                {
                  name: "khid",
                  fieldLabel: "id",
                  hidden: true,
                  bind: "{khid}",
                },
                {
                  name: "xsdh",
                  fieldLabel: "xsdh",
                  hidden: true,
                  bind: "{xsdh}",
                },
                {
                  name: "khmc",
                  fieldLabel: "\u5ba2\u6237\u540d\u79f0",
                  flex: 2,
                  readOnly: true,
                  bind: "{khmc}",
                  margin: "0 10 0 0",
                },
                {
                  name: "xsdh",
                  fieldLabel: "\u9500\u552e\u5355\u53f7",
                  flex: 1,
                  allowBlank: true,
                  readOnly: true,
                  bind: "{xsdh}",
                  margin: "0 10 0 0",
                },
                {
                  xtype: "datefield",
                  name: "xsrq",
                  flex: 2,
                  bind: "{xsrq}",
                  format: "Y-m-d",
                  readOnly: true,
                  fieldLabel: "\u5f00\u5355\u65e5\u671f",
                  allowBlank: false,
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: { type: "hbox", align: "stretch" },
              defaults: { labelWidth: 60 },
              items: [
                { name: "ckid", hidden: true, bind: "{ckid}" },
                {
                  name: "ckmc",
                  fieldLabel: "\u63d0\u8d27\u4ed3\u5e93",
                  flex: 1,
                  readOnly: true,
                  bind: "{ckmc}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "cphm",
                  fieldLabel: "\u63d0\u8d27\u8f66\u724c",
                  flex: 1,
                  bind: "{cphm}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "sfr",
                  fieldLabel: "\u63d0\u8d27\u4eba",
                  labelWidth: 50,
                  flex: 1,
                  bind: "{sfr}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  xtype: "datefield",
                  name: "endrq",
                  flex: 1,
                  bind: "{endrq}",
                  format: "Y-m-d",
                  fieldLabel: "\u6709\u6548\u65e5\u671f",
                  allowBlank: false,
                },
              ],
            },
          ],
        },
        {
          xtype: "grid",
          flex: 1,
          border: 1,
          columnLines: true,
          plugins: ["cellediting"],
          store: { type: "CurCpxsdmxStore" },
          reference: "CpxsdmxGrid",
          itemId: "CpxsdmxGrid",
          margin: "0 0 0 0",
          columns: [
            { text: "\u4ea7\u5730", dataIndex: "cdmc", flex: 2 },
            { text: "\u5546\u54c1\u540d\u79f0", dataIndex: "cpmc", flex: 4 },
            { text: "\u5305\u88c5", dataIndex: "bzmc", flex: 3 },
            { text: "\u89c4\u683c\u578b\u53f7", dataIndex: "cpgg", flex: 2 },
            { text: "\u5546\u54c1\u6279\u53f7", dataIndex: "cpgg", flex: 2 },
            { text: "\u5355\u4f4d", dataIndex: "jldw", width: 60 },
            {
              xtype: "numbercolumn",
              text: "\u5f00\u5355\u6570\u91cf",
              dataIndex: "xssl",
              flex: 2,
              format: "000000.000",
              editor: {
                type: "numberfield",
                decimalPrecision: 3,
                align: "right",
                allowBlank: true,
                listeners: {
                  change: function (record, value) {
                    var customerGrid = this.up("#CpxsdmxGrid");
                    var selection = customerGrid
                      .getSelectionModel()
                      .getSelection()[0];
                    var sl = selection.get("sl");
                    var zl = selection.get("zl");
                    if (value == sl) {
                      selection.set("xszl", zl);
                      return true;
                    }
                    var rate = 0;
                    if (sl != 0) rate = zl / sl;
                    if (sl > 0 && value > sl) {
                      Ext.MessageBox.alert(
                        "\u6ce8\u610f\uff01",
                        "\u6700\u5927\u53ef\u5f00\u5355\u6570\u91cf\u4e3a\uff1a" +
                          sl
                      );
                      return false;
                      value = sl;
                    }
                    if (sl < 0 && value < sl) value = sl;
                    selection.set("xssl", value);
                    selection.set("xszl", value * rate);
                  },
                },
              },
            },
            {
              xtype: "numbercolumn",
              text: "\u5f00\u5355\u91cd\u91cf",
              dataIndex: "xszl",
              flex: 2,
              format: "000000.000",
              editor: {
                type: "numberfield",
                decimalPrecision: 3,
                align: "right",
                allowBlank: true,
                listeners: {
                  change: function (record, value) {
                    var customerGrid = this.up("#CpxsdmxGrid");
                    var selection = customerGrid
                      .getSelectionModel()
                      .getSelection()[0];
                    var sl = selection.get("sl");
                    var zl = selection.get("zl");
                    var rate = 0;
                    if (sl != 0) rate = zl / sl;
                    if (zl > 0 && value > zl) {
                      Ext.MessageBox.alert(
                        "\u6ce8\u610f\uff01",
                        "\u6700\u5927\u53ef\u5f00\u5355\u91cd\u91cf\u4e3a\uff1a" +
                          zl
                      );
                      selection.set("xszl", zl);
                      return false;
                    }
                    if (zl < 0 && value < zl) value = zl;
                  },
                },
              },
            },
            {
              text: "\u8bf4\u660e",
              dataIndex: "sm",
              flex: 2,
              editor: { type: "textfield" },
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
                  name: "cwsh",
                  fieldLabel: "\u8d22\u52a1\u51fa\u7eb3",
                  bind: "{cwsh}",
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
                { name: "cnote", fieldLabel: "\u5907\u6ce8", bind: "{cnote}" },
              ],
            },
          ],
        },
      ],
    },
  ],
  buttons: [
    "-\x3e",
    {
      text: "\u4fdd\u5b58",
      icon: "images/right.gif",
      handler: "onCpxsdFormSubmit",
    },
    {
      text: "\u653e\u5f03",
      icon: "images/close.gif",
      handler: function () {
        this.up("#cpxsdedit").close();
      },
    },
  ],
});
