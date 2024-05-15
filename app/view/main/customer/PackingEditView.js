var cztsfl = 360;
Ext.Ajax.request({
  url: "mysql_action.PHP?act=getsqlselect&sql=select * from sys_ini where varmc='CZTSFL' ", //跨域请求的URL
  method: "GET",
  dataType: "json",
  headers: { "Content-Type": "application/json" },
  async: false,
  //jsonData:Ext.util.JSON.decode(paraMap),
  success: function (response, options) {
    var o = Ext.util.JSON.decode(response.responseText);
    var rs = o["rows"];
    var oj = rs[0];
    cztsfl = oj["VARVALUE"];
  },
  failure: function () {
    console.log("failure");
  },
});
Ext.define("MyApp.view.main.customer.PackingEditView", {
  extend: "Ext.window.Window",
  xtype: "formpackingwindow",
  reference: "popuppackingWindow",
  itemId: "PackingEditView",
  bind: { title: "{title}" },
  width: "95%",
  height: 600,
  minWidth: 600,
  top: 0,
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
      autoScroll: true,
      border: false,
      items: [
        {
          xtype: "grid",
          flex: 1,
          border: 1,
          store: { type: "PackingStore" },
          reference: "packingmxGrid",
          plugins: ["cellediting"],
          enableHdMenu: false,
          enableColumnHide: false,
          collapsible: false,
          columnLines: true,
          animCollapse: false,
          itemId: "packingmxGrid",
          margin: "0 0 0 0",
          columns: [
            {
              text: "代码",
              width: 50,
              dataIndex: "PS_code",
              align: "left",
              sortable: false,
            },
            {
              text: "包装名称",
              dataIndex: "PS_name",
              flex: 3,
              align: "left",
              sortable: false,
            },
            {
              text: "数量单",
              dataIndex: "Quantity_Unit",
              flex: 1,
              align: "left",
              sortable: false,
            },
            {
              xtype: "numbercolumn",
              align: "right",
              format: "00000.00",
              text: "转换系数",
              dataIndex: "Rate",
              flex: 1,
              align: "left",
              sortable: false,
            },
            {
              text: "重量单位",
              dataIndex: "Weight_Unit",
              flex: 1,
              align: "left",
              sortable: false,
            },
            {
              text: "临时仓仓租单价",
              columns: [
                {
                  text: cztsfl + "天内",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      align: "right",
                      format: "00000.00",
                      text: "不分批号",
                      dataIndex: "Czdj",
                      flex: 1,
                      align: "left",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 3,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 9999.99,
                      },
                    },
                    {
                      xtype: "numbercolumn",
                      align: "right",
                      format: "00000.00",
                      text: "分批号",
                      dataIndex: "Phdj",
                      flex: 1,
                      align: "left",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 3,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 9999.99,
                      },
                    },
                  ],
                },
                {
                  text: cztsfl + "天之后",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      align: "right",
                      format: "00000.00",
                      text: "不分批号",
                      dataIndex: "Czdj2",
                      flex: 1,
                      align: "left",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 3,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 9999.99,
                      },
                    },
                    {
                      xtype: "numbercolumn",
                      align: "right",
                      format: "00000.00",
                      text: "分批号",
                      dataIndex: "Phdj2",
                      flex: 1,
                      align: "left",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 3,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 9999.99,
                      },
                    },
                  ],
                },
                {
                  text: "最小",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      align: "center",
                      format: "00",
                      text: "天数",
                      dataIndex: "mints",
                      width: 50,
                      align: "center",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 0,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 31,
                      },
                    },
                  ],
                },
                {
                  text: "周期",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      align: "center",
                      format: "00",
                      text: "天数",
                      dataIndex: "czts",
                      width: 50,
                      align: "center",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 0,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 31,
                      },
                    },
                  ],
                },
              ],
            },
            {
              text: "固定仓",
              columns: [
                {
                  text: "每月平方",
                  columns: [
                    {
                      xtype: "numbercolumn",
                      align: "right",
                      format: "00000.00",
                      width: 70,
                      text: "单  价",
                      dataIndex: "Pfdj",
                      align: "left",
                      sortable: false,
                      editor: {
                        type: "numberfield",
                        decimalPrecision: 3,
                        align: "right",
                        allowBlank: true,
                        minValue: 0,
                        maxValue: 9999.99,
                      },
                    },
                  ],
                },
              ],
            },
            {
              text: "其它费用单价",
              columns: [
                {
                  xtype: "numbercolumn",
                  align: "right",
                  format: "00000.00",
                  text: "装卸",
                  dataIndex: "Bydj",
                  width: 70,
                  align: "left",
                  sortable: false,
                  editor: {
                    type: "numberfield",
                    decimalPrecision: 3,
                    align: "right",
                    allowBlank: true,
                    minValue: 0,
                    maxValue: 9999.99,
                  },
                },
                {
                  xtype: "numbercolumn",
                  align: "right",
                  format: "00000.00",
                  text: "破包修复",
                  dataIndex: "Pbdj",
                  flex: 1,
                  align: "left",
                  sortable: false,
                  editor: {
                    type: "numberfield",
                    decimalPrecision: 3,
                    align: "right",
                    allowBlank: true,
                    minValue: 0,
                    maxValue: 9999.99,
                  },
                },
                {
                  xtype: "numbercolumn",
                  align: "right",
                  format: "00000.00",
                  text: "过户",
                  dataIndex: "Ghdj",
                  width: 70,
                  align: "left",
                  sortable: false,
                  editor: {
                    type: "numberfield",
                    decimalPrecision: 3,
                    align: "right",
                    allowBlank: true,
                    minValue: 0,
                    maxValue: 9999.99,
                  },
                },
              ],
            },
            {
              width: 90,
              text: "重量核算",
              sortable: false,
              dataIndex: "Weight_Status",
              renderer: function (val) {
                if (val) return "\u91cd\u91cf\u6838\u7b97";
                else return "";
              },
            },
            {
              text: "过车",
              width: 50,
              sortable: false,
              enable: false,
              readOnly: true,
              dataIndex: "Xmlb",
              renderer: function (val) {
                if (val) return "是";
                else return "";
              },
            },
          ],
        },
      ],
    },
  ],
  buttons: [
    "->",
    { text: "保  存", icon: "images/right.gif", itemId: "btnpackingSave" },
    {
      text: "放  弃",
      icon: "images/close.gif",
      handler: function () {
        this.up("window").hide();
      },
    },
  ],
});
