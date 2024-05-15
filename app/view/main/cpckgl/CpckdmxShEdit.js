var mmccsl = 0;
var mmcczl = 0;
Ext.define("MyApp.view.main.cpckgl.CpckdmxShEdit", {
  extend: "Ext.window.Window",
  xtype: "cpckdmxsheditwindow",
  reference: "popupmxWindow",
  bind: {
    title: "{title}",
  },
  requires: ["MyApp.store.CpckdcwStore"],
  itemId: "CpckdmxShEdit",
  width: "90%",
  height: 500,
  minWidth: 600,
  minHeight: 400,
  layout: "fit",
  maximizable: true,
  closeAction: "destroy",
  bodyPadding: 10,
  modal: true,
  items: [
    {
      xtype: "form",
      reference: "windowFormmx",
      itemId: "windowFormmx",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      autoScroll: true,
      border: false,
      items: [
        {
          height: 86,
          margin: "0 0 0 0",
          defaults: {
            flex: 1,
            xtype: "fieldcontainer",
            msgTarget: "side",
            defaultType: "textfield",
          },
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              fieldDefaults: {
                labelWidth: 60,
                flex: 1,
                frame: true,
              },
              layout: {
                type: "hbox",
                align: "stretch",
              },
              items: [
                {
                  name: "cdmc",
                  fieldLabel: "产地名称",
                  bind: "{cdmc}",
                  flex: 1,
                  readOnly: true,
                  margin: "0 0 0 0",
                },
                {
                  name: "cpmc",
                  fieldLabel: "商品名称",
                  bind: "{cpmc}",
                  readOnly: true,
                  flex: 1,
                  margin: "0 0 0 0",
                },
                {
                  name: "bzmc",
                  fieldLabel: "包装",
                  bind: "{bzmc}",
                  flex: 1,
                  readOnly: true,
                  margin: "0 0 0 0",
                },
                {
                  name: "cpgg",
                  fieldLabel: "规格型号",
                  bind: "{cpgg}",
                  flex: 1,
                  readOnly: true,
                  margin: "0 0 0 0",
                },
              ],
            },
            {
              fieldDefaults: {
                labelWidth: 60,
                frame: true,
              },
              layout: {
                type: "hbox",
                align: "stretch",
              },
              items: [
                {
                  name: "cpph",
                  fieldLabel: "批号",
                  bind: "{cpph}",
                  width: 200,
                  readOnly: true,
                  margin: "0  10 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "mccsl",
                  fieldLabel: "未出仓数",
                  bind: "{mccsl}",
                  hideTrigger: true,
                  readOnly: true,
                  hidden: true,
                  flex: 1,
                  margin: "0 10 0 0",
                  decimalPrecision: 3,
                },
                {
                  xtype: "numberfield",
                  name: "mcczl",
                  fieldLabel: "未出仓量",
                  flex: 1,
                  bind: "{mcczl}",
                  hidden: true,
                  hideTrigger: true,
                  readOnly: true,
                  decimalPrecision: 3,
                  margin: "0 10 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "ccsl",
                  bind: "{ccsl}",
                  itemId: "ckccsl",
                  reference: "ckccsl",
                  fieldLabel: "出仓数",
                  format: "00000.000",
                  hideTrigger: true,
                  readOnly: true,
                  width: 160,
                  margin: "0 10 0 0",
                  decimalPrecision: 3,
                },
                {
                  xtype: "numberfield",
                  name: "cczl",
                  itemId: "ckcczl",
                  reference: "ckcczl",
                  bind: "{cczl}",
                  fieldLabel: "出仓重量",
                  format: "00000.000",
                  width: 160,
                  hideTrigger: true,
                  readOnly: true,
                  decimalPrecision: 3,
                  margin: "0 10 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "ccje",
                  fieldLabel: "出仓费用",
                  flex: 1,
                  hidden: true,
                  bind: "{ccje}",
                  hideTrigger: true,
                  readOnly: true,
                  enabled: false,
                  decimalPrecision: 2,
                  margin: "0 5 0 0",
                },
                {
                  xtype: "numberfield",
                  name: "xjje",
                  fieldLabel: "其中现付",
                  flex: 1,
                  hidden: true,
                  bind: "{xjje}",
                  hideTrigger: true,
                  readOnly: true,
                  decimalPrecision: 2,
                  margin: "0 5 0 0",
                },
                {
                  xtype: "textfield",
                  name: "mxid",
                  bind: "{mxid}",
                  hidden: true,
                },
              ],
            },
          ],
        },
        {
          margin: "0 0 0 0",
          height: 400,
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
              xtype: "grid",
              //flex: 1,
              height: 230,
              border: 1,
              //hidden: false,
              reference: "cpckdmxcw",
              itemId: "cpckdmxcw",
              columnLines: true,
              enableColumnHide: false,
              store: { type: "CpckdcwStore" },
              plugins: ["cellediting"],
              title: "明细仓位出仓",
              listeners: {
                celldblclick: function (grid, row) {
                  var p = this.up("#CpckdmxShEdit").getViewModel();
                  var sl = p.get("ccsl");
                  var zl = p.get("cczl");
                  var selection = grid.getSelectionModel().getSelection()[0];
                  var cwsl = selection.get("sl");
                  var cwzl = selection.get("zl");
                  mmccsl = mmccsl - selection.get("ccsl");
                  mmcczl = mmcczl - selection.get("cczl");
                  if (sl - mmccsl < cwsl || sl - mmccsl == cwsl) {
                    selection.set("ccsl", sl - mmccsl);
                    selection.set("cczl", zl - mmcczl);
                  } else {
                    selection.set("ccsl", cwsl);
                    selection.set("cczl", cwzl);
                  }
                  var store = grid.getStore();
                  mmccsl = store.sum("ccsl");
                  mmcczl = store.sum("cczl");
                  //p.set('ccsl',mmccsl);
                  //p.set('cczl',mmcczl);
                },
              },
              columns: [
                {
                  text: "区",
                  dataIndex: "area",
                  sortable: false,
                  width: 60,
                },
                {
                  text: "仓位",
                  dataIndex: "cw",
                  sortable: false,
                  flex: 1,
                },
                {
                  text: "商品批号",
                  sortable: false,
                  dataIndex: "cpph",
                  flex: 1,
                },
                {
                  text: "单位",
                  sortable: false,
                  dataIndex: "dw",
                  width: 50,
                },
                {
                  xtype: "numbercolumn",
                  text: "仓租单价",
                  flex: 1,
                  sortable: false,
                  dataIndex: "czdj",
                },
                {
                  text: "仓位说明",
                  flex: 1,
                  sortable: false,
                  dataIndex: "sm",
                },
                {
                  xtype: "numbercolumn",
                  text: "库存数量",
                  dataIndex: "sl",
                  sortable: false,
                  flex: 1,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "库存重量",
                  dataIndex: "zl",
                  sortable: false,
                  flex: 1,
                  renderer: zlrenderer,
                },
                {
                  xtype: "numbercolumn",
                  text: "出仓数量",
                  dataIndex: "ccsl",
                  flex: 1,
                  sortable: false,
                  renderer: zlrenderer,
                  editor: {
                    type: "numberfield",
                    decimalPrecision: 3,
                    align: "right",
                    allowBlank: true,
                    minValue: 0,
                    maxValue: 999999.999,
                    validator: function (value) {
                      var customerGrid = this.up("#cpckdmxcw");
                      var selection = customerGrid
                        .getSelectionModel()
                        .getSelection()[0];
                      var store = customerGrid.getStore();
                      var panel = this.up("#CpckdmxShEdit").getViewModel();
                      var sl = selection.get("sl");
                      var zl = selection.get("zl");
                      if (value > sl) {
                        selection.set("ccsl", sl);
                        selection.set("cczl", zl);
                      }
                      if (value == sl) {
                        selection.set("cczl", zl);
                      }
                      var sumsl = store.sum("ccsl");
                      var mccsl = panel.get("ccsl");
                      if (sumsl > 0 && sumsl > mccsl) {
                        Ext.MessageBox.alert(
                          "注意！",
                          "发货数量合计不能大于：" + mccsl
                        );
                        selection.set("ccsl", 0);
                        selection.set("cczl", 0);
                        return false;
                      }
                    },
                    listeners: {
                      change: function (field, value) {
                        var customerGrid = this.up("#cpckdmxcw");
                        var selection = customerGrid
                          .getSelectionModel()
                          .getSelection()[0];
                        var panel = this.up("#CpckdmxShEdit").getViewModel();
                        var store = customerGrid.getStore();
                        var sl = selection.get("sl");
                        var zl = selection.get("zl");
                        if (value == sl) {
                          //console.log(value,sl)
                          selection.set("ccsl", value);
                          selection.set("cczl", zl);
                          return true;
                        }
                        var rate = 0;
                        if (sl != 0) {
                          rate = zl / sl;
                        }
                        if (sl > 0 && value > sl) {
                          // console.log(value,sl)
                          Ext.MessageBox.alert(
                            "注意！",
                            "最大可发货数量为：" + sl
                          );
                          value = sl;
                        }
                        if (sl < 0 && value < sl) {
                          value = sl;
                        }
                        selection.set("ccsl", value);
                        selection.set("cczl", value * rate);
                      },
                    },
                  },
                },
                {
                  xtype: "numbercolumn",
                  text: "出仓重量",
                  dataIndex: "cczl",
                  sortable: false,
                  renderer: zlrenderer,
                  flex: 1,
                  editor: {
                    type: "numberfield",
                    decimalPrecision: 3,
                    align: "right",
                    allowBlank: true,
                    minValue: 0,
                    maxValue: 999999.999,
                    validator: function (value) {
                      var customerGrid = this.up("#cpckdmxcw");
                      var selection = customerGrid
                        .getSelectionModel()
                        .getSelection()[0];
                      var store = customerGrid.getStore();
                      var panel = this.up("#CpckdmxShEdit").getViewModel();
                      var zl = selection.get("zl");
                      if (value > zl) {
                        value = zl;
                        selection.set("cczl", zl);
                      }
                      var sumzl = 0; // store.sum('cczl');
                      var mcczl = panel.get("cczl");
                      var cwid = selection.get("id");
                      store.each(function (rec) {
                        if (rec.data.id != cwid) {
                          sumzl = sumzl + rec.data.cczl;
                        }
                      });
                      var sumzl0 = sumzl;
                      sumzl = sumzl + parseFloat(value);
                      //    console.log(sumzl, mcczl, cwid);
                      if (value > 0 && sumzl > mcczl) {
                        Ext.MessageBox.alert(
                          "注意！",
                          "发货重量合计不能大于：" + mcczl
                        );
                        selection.set("cczl", mcczl - sumzl0);
                        return false;
                      }
                    },
                    listeners: {
                      change: function (field, value) {
                        var customerGrid = this.up("#cpckdmxcw");
                        var selection = customerGrid
                          .getSelectionModel()
                          .getSelection()[0];
                        var panel = this.up("#CpckdmxShEdit").getViewModel();
                        var store = customerGrid.getStore();
                        var sl = selection.get("sl");
                        var zl = selection.get("zl");
                        if (sl > 0 && value > zl) {
                          Ext.MessageBox.alert(
                            "注意！",
                            "最大可发货重量为：" + zl
                          );
                          value = zl;
                        }
                        selection.set("cczl", value);
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          xtype: "panel",
          width: "100%",
          margin: "5 0 0 0",
          hidden: true,
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              fieldDefaults: {
                labelWidth: 55,
                flex: 1,
                readOnly: true,
              },
              layout: {
                type: "hbox",
                align: "stretch",
              },
              items: [
                {
                  name: "ckdh",
                  fieldLabel: "ckdh",
                  bind: "{ckdh}",
                },
                {
                  name: "czdj",
                  fieldLabel: "czdj",
                  bind: "{czdj}",
                },
                {
                  name: "phdj",
                  fieldLabel: "Phdj",
                  bind: "{phdj}",
                },
                {
                  name: "bydj",
                  fieldLabel: "bydj",
                  bind: "{bydj}",
                },
                {
                  name: "sldw",
                  fieldLabel: "sldw",
                  bind: "{sldw}",
                },
                {
                  name: "jldw",
                  fieldLabel: "jldw",
                  bind: "{jldw}",
                },
                {
                  name: "zldw",
                  fieldLabel: "Zldw",
                  bind: "{zldw}",
                },
                {
                  name: "rate",
                  fieldLabel: "rate",
                  bind: "{rate}",
                },
                {
                  name: "zljs",
                  fieldLabel: "zljs",
                  bind: "{zljs}",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  buttons: [
    "->",
    {
      text: "保存仓位出库内容",
      icon: "images/right.gif",
      handler: "onCpckdmxFormSubmit",
    },
    {
      text: "放弃",
      icon: "images/close.gif",
      handler: function () {
        this.up("#CpckdmxShEdit").close();
      },
    },
  ],
});
