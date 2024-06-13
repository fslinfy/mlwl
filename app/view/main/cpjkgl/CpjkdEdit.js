Ext.define("MyApp.view.main.cpjkgl.CpjkdEdit", {
  extend: "Ext.window.Window",
  xtype: "formjkdwindow",
  reference: "jkdpopupWindow",
  itemId: "cpjkdedit",
  requires: ["MyApp.view.main.tree.QueryArea"],
  bind: {
    title: "{title}",
  },
  title: "商品进库单",
  top: 0,
  width: "95%",
  height: 600,
  minWidth: 600,
  minHeight: 400,
  layout: "fit",
  closeAction: "destroy",
  bodyPadding: 5,
  plain: true,
  maximizable: true,
  viewModel: {
    type: "CpjkdmxViewModel",
  },
  modal: true,
  items: [
    {
      xtype: "form",
      reference: "windowForm",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      // bodyPadding: 5,
      autoScroll: true,
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
                  name: "jkdh",
                  fieldLabel: "jkdh",
                  hidden: true,
                  bind: "{jkdh}",
                },
                {
                  name: "khmc",
                  fieldLabel: "客户名称",
                  flex: 1,
                  readOnly: true,
                  bind: "{khmc}",
                  margin: "0 10 0 0",
                },
                { xtype: "QueryArea" },
                {
                  name: "jkdh",
                  width: 200,
                  value: "",
                  readOnly: true,
                  fieldLabel: "No",
                  allowBlank: true,
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
                  fieldLabel: "送货单号",
                  bind: "{sfdh}",
                  flex: 1,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "cphm",
                  fieldLabel: "送货车牌",
                  flex: 1,
                  bind: "{cphm}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "sfr",
                  fieldLabel: "送货人员",
                  flex: 1,
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
                  fieldLabel: "进库日期",
                  allowBlank: false,
                },
              ],
            },
          ],
        },
        {
          xtype: "grid",
          //flex: 1,
          border: 1,
          height: 300,
          enableHdMenu: false,
          enableColumnHide: false,
          collapsible: false,
          columnLines: true,
          animCollapse: false,
          store: { type: "CurCpjkdmxStore" },
          //bind: "{CpjkdmxStores}",
          reference: "CpjkdmxGrid",
          itemId: "CpjkdmxGrid",
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
              sortable: false,
              flex: 1,
              // renderer: 'renderOrderId'
            },
            {
              text: "商品名称",
              dataIndex: "cpmc",
              sortable: false,
              flex: 2,
              // renderer: 'renderOrderId'
            },
            {
              text: "规格型号",
              dataIndex: "cpgg",
              sortable: false,
              flex: 1,
              //// renderer: 'renderOrderId'
            },
            {
              text: "包装",
              dataIndex: "bzmc",
              sortable: false,
              flex: 2,
              //// renderer: 'renderOrderId'
            },
            {
              xtype: "numbercolumn",
              text: "mints",
              flex: 1,
              sortable: false,
              hidden: true,
              dataIndex: "mints",
            },
            {
              xtype: "numbercolumn",
              text: "入库数量",
              dataIndex: "jcsl",
              sortable: false,
              flex: 1,
              renderer: zlrenderer,
            },
            {
              xtype: "numbercolumn",
              text: "入库重量",
              sortable: false,
              dataIndex: "jczl",
              flex: 1,
              renderer: zlrenderer,
            },
            {
              xtype: "numbercolumn",
              text: "仓租单价",
              flex: 1,
              sortable: false,
              hidden: true,
              dataIndex: "czdj",
              renderer: jerenderer,
            },
            {
              xtype: "numbercolumn",
              text: "入库费用",
              flex: 1,
              sortable: false,
              dataIndex: "jcje",
              decimalPrecision: 0,
              renderer: jerenderer,
              // renderer: 'renderOrderId'
            },
            {
              xtype: "widgetcolumn",
              width: 70,
              widget: {
                xtype: "button",
                text: "修改",
                handler: "onEditCpjkdmxClick",
              },
            } /*,
                {
                    text: 'sldw',
                    dataIndex: 'slde'
                }
                ,
                {
                    text: 'zldw',
                    dataIndex: 'zlde'
                }
                ,
                {
                    text: 'rate',
                    dataIndex: 'rate'
                }
                 ,
                {
                    text: 'zljs',
                    dataIndex: 'zljs'
                }
                 ,
                {
                    text: 'phdj',
                    dataIndex: 'phdj'
                }
 ,
                {
                    text: 'czdj',
                    dataIndex: 'czdj'
                }
                 ,
                {
                    text: 'pydj',
                    dataIndex: 'pydj'
                }
*/,
            /*,
                {
                    xtype: 'widgetcolumn',
                    width: 80,
                    widget: {
                        xtype: 'button',
                        text: '删除',
                        handler: 'onRemoveCpjkdmxClick'
                    }
                }*/
          ],
        },
        //************************************************ */
        {
          //xtype: 'container',
          //width: "100%",
          margin: "0 0 0 0",
          //  height: 400,
          hidden: true,
          layout: {
            type: "vbox",
            align: "stretch",
          },
          items: [
            {
              xtype: "grid",
              flex: 1,
              reference: "cpjkdmxcw0",
              itemId: "cpjkdmxcw0",
              columnLines: true,
              store: { type: "CurCpjkdcwStore" },
              columns: [
                {
                  text: "仓位",
                  dataIndex: "cw",
                  flex: 1,
                },
              ],
            },
            {
              xtype: "grid",
              flex: 1,
              reference: "cpjkdmxje0",
              itemId: "cpjkdmxje0",
              columnLines: true,
              store: { type: "CurCpjkdjeStore" },
              margin: "5 0 0 0",
              columns: [
                {
                  text: "收费项目",
                  dataIndex: "work",
                  flex: 1,
                },
              ],
            },
          ],
        },
        //***********************************************************/
        {
          xtype: "fieldcontainer",
          //title:'NORTH',
          height: 130,
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
                  fieldLabel: "审核员",
                  bind: "{shr}",
                },
                {
                  name: "cwr",
                  fieldLabel: "财务出纳",
                  bind: "{cwr}",
                },
                {
                  name: "cgy",
                  fieldLabel: "仓库管理",
                  bind: "{cgy}",
                  margin: "3 0 0 0",
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              defaultType: "textfield",
              layout: {
                type: "vbox",
                align: "stretch",
              },
              defaults: {
                flex: 1,
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
      text: "增加商品",
      icon: "images/add.gif",
      handler: "onshowmxEditView",
    },
    "->",
    {
      text: "保存进仓单",
      icon: "images/right.gif",
      itemId:"btnCpjkdSave",
      handler: "onCpjkdFormSubmit",
    },
    {
      text: "放弃",
      icon: "images/close.gif",
      handler: function () {
        this.up("#cpjkdedit").close();
      },
    },
  ],
  listeners: {
    beforedestroy: function (obj) {
      /* cpjkd_store.reload();
            cpjkd_store.clearFilter();
            cpjkd_store.removeAll();
            cpjkd_store.sync();
          //  CurCpjkdcwStore.reload();
            CurCpjkdcwStore.clearFilter();
            CurCpjkdcwStore.removeAll();
            CurCpjkdcwStore.sync();
           // CurCpjkdjeStore.reload();
            CurCpjkdjeStore.clearFilter();
            CurCpjkdjeStore.removeAll();
            CurCpjkdjeStore.sync();
*/
      //CurCpjkdmxStore.getProxy().clear();
      //CurCpjkdmxStore.data.clear();
      //CurCpjkdmxStore.sync();
      //CurCpjkdmxStore.clearFilter();
      //CurCpjkdmxStore.removeAll();
      cpjkd_store.getProxy().clear();
      cpjkd_store.data.clear();
      cpjkd_store.sync();
      CurCpjkdjeStore.getProxy().clear();
      CurCpjkdjeStore.data.clear();
      CurCpjkdjeStore.sync();
      CurCpjkdcwStore.getProxy().clear();
      CurCpjkdcwStore.data.clear();
      CurCpjkdcwStore.sync();
      /*CurCpjkdmxStore.reload();
                        CurCpjkdmxStore.clearFilter();
                        CurCpjkdmxStore.removeAll();
                        CurCpjkdmxStore.sync();*/
    },
  },
});
