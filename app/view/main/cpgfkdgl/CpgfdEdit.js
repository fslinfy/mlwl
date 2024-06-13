Ext.define("MyApp.view.main.cpgfkdgl.CpgfdEdit", {
  extend: "Ext.window.Window",
  xtype: "formgfdwindow",
  reference: "gfdpopupWindow",
  itemId: "cpgfdedit",
  title: "商品过车单",
  bind: {
    title: "{title}",
  },
  requires: ["MyApp.view.main.tree.QueryArea"],
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
  modal: true,
  ////////////////**************************************** */
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
        /*********************** */
        {
          height: 90,
          border: false,
          margin: "5 2 5 2",
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
              height: 35,
              margin: "5 0 5 0",
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
                  xtype: "numberfield",
                  name: "gfid",
                  fieldLabel: "",
                  hidden: true,
                  bind: "{gfid}",
                },
                {
                  xtype: "numberfield",
                  name: "khid",
                  fieldLabel: "khid",
                  hidden: true,
                  bind: "{khid}",
                },
                {
                  name: "khmc",
                  fieldLabel: "客户名称",
                  flex: 3,
                  readOnly: true,
                  bind: "{khmc}",
                  margin: "0 0 0 0",
                },
                /*{
                  xtype: "button",
                  text: "...",
                  width: 30,
                  bind: {
                    hidden: "{gsop}",
                  },
                  margin: "0 5 0 0",
                  handler: "onSelectNewKhbmView",
                },*/
                {
                  xtype: "QueryArea",
                  //,bind: {
                  //    readOnly: '{gsop}'
                  //}
                },
                {
                  xtype: "displayfield",
                  name: "displayname",
                  bind: {
                    hidden: "{!delbz}",
                  },
                  //itemId:
                  hideLabel: true,
                  hidden: true,
                  value: "此单已经作废!",
                  margin: "0 50 0 50",
                  //width: 150,
                  flex: 1,
                  //color:red,
                  fieldLabel: "此单已经作废！",
                },
                {
                  name: "gfdh",
                  flex: 1,
                  //width: 170,
                  labelWidth: 30,
                  bind: "{gfdh}",
                  readOnly: true,
                  fieldLabel: "No",
                  allowBlank: true,
                },
                {
                  xtype: "datefield",
                  name: "kdrq",
                  width: 200,
                  bind: "{kdrq}",
                  //    bind: {
                  //      readOnly: '{gsop}'
                  //   },
                  format: "Y-m-d",
                  fieldLabel: "开单日期",
                  allowBlank: false,
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              height: 35,
              //  border:1,
              margin: "5 0 5 0",
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
                  xtype: "numberfield",
                  name: "ckid",
                  fieldLabel: "ckid",
                  hidden: true,
                  bind: "{ckid}",
                },
                {
                  name: "ckmc",
                  fieldLabel: "仓库名称",
                  flex: 2,
                  readOnly: true,
                  bind: "{ckmc}",
                  margin: "0 0 0 0",
                },
                {
                  name: "khsl",
                  fieldLabel: "合计数量",
                  bind: "{khsl}",
                  //hidden: true,
                  readOnly: true,
                  flex: 1,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "khzl",
                  fieldLabel: "重量",
                  labelWidth: 40,
                  flex: 1,
                  readOnly: true,
                  bind: "{khzl}",
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "cphm",
                  fieldLabel: "车牌号",
                  labelWidth: 50,
                  bind: "{cphm}",
                  flex: 1,
                  margin: "0 10 0 0",
                  allowBlank: true,
                },
                {
                  name: "sfr",
                  fieldLabel: "司机",
                  labelWidth: 40,
                  bind: "{sfr}",
                  flex: 1,
                  margin: "0 30 0 0",
                  allowBlank: true,
                },
                /*, {
                                    name: 'je',
                                    fieldLabel: '费用金额',
                                    bind: "{je}",
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    allowBlank: true
                                },
                                {
                                    name: 'xjje',
                                    fieldLabel: '现付金额',
                                    flex: 1,
                                    // hidden:true,
                                    readOnly: true,
                                    bind: "{xjje}",
                                    margin: '0 10 0 0',
                                    allowBlank: true
                                },*/
                {
                  xtype: "checkbox",
                  fieldLabel: "费用付现",
                  width: 90,
                  align: "right",
                  name: "xjbz",
                  margin: "0 10 0 10",
                  readOnly: true,
                  bind: "{xjbz}",
                  /*,
                                    handler: function (e) {
                                        // console.log(e.value);
                                        if (e.value) {
                                            this.up('#cpgfdedit').getViewModel().set('xjje', this.up('#cpgfdedit').getViewModel().get('je'));
                                        }
                                        else {
                                            this.up('#cpgfdedit').getViewModel().set('xjje', 0);
                                        }
                                    }*/
                },
                {
                  xtype: "datefield",
                  name: "endrq",
                  width: 200,
                  bind: "{endrq}",
                  // bind: {
                  //       readOnly: '{gsop}'
                  //  },
                  format: "Y-m-d",
                  fieldLabel: "有效日期",
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
          store: { type: "CpgfdmxStore" },
          plugins: ["cellediting"],
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
              text: "产地名称",
              name: "cdmc",
              dataIndex: "cdmc",
              sortable: false,
              flex: 1,
              editor: {
                allowBlank: false,
                type: "string",
              },
            },
            {
              text: "商品名称",
              name: "xmmc",
              dataIndex: "xmmc",
              sortable: false,
              flex: 3,
              editor: {
                allowBlank: false,
                type: "string",
              },
            },
            {
              text: "包装",
              name: "bzmc",
              dataIndex: "bzmc",
              sortable: false,
              flex: 2,
              editor: {
                allowBlank: false,
                type: "string",
              },
            },
            /*  {
                            text: '包装id',
                            name: 'bzid',
                            dataIndex: 'bzid',
                            sortable: false,
                            flex: 1,
                            editor: {
                                allowBlank: false,
                                type: 'string'
                            }
                        },*/
            {
              text: "单位",
              dataIndex: "jldw",
              sortable: false,
              width: 50,
              editor: {
                allowBlank: false,
                type: "string",
              },
            },
            /*                         {
                             xtype: 'numbercolumn',
                             text: 'rate',
                             format: '0.00',
                             dataIndex: 'rate', sortable: false,
                             flex: 1
                             
 
                         },
 */
            {
              xtype: "numbercolumn",
              text: "数量",
              format: "0.000",
              //hidden: true,
              dataIndex: "khsl",
              sortable: false,
              flex: 1,
              editor: {
                type: "numberfield",
                decimalPrecision: 3,
                align: "right",
                allowBlank: true,
                listeners: {
                  //  validator: function (value) {
                  //        console.log(" validator sl",value);
                  //    that.sumje();
                  //},
                  change: function (field, value) {
                    //    console.log("sl",value);
                    var customerGrid = this.up("#CpgfdmxGrid");
                    var selection = customerGrid
                      .getSelectionModel()
                      .getSelection()[0];
                    selection.set("khsl", value);
                    var dj = selection.get("dj");
                    var rate = selection.get("rate");
                    selection.set("khzl", value * rate);
                    if (dj == undefined) dj = 0;
                    if (value * dj * rate < 1 && value * dj * rate > 0) {
                      selection.set("je", 1);
                    } else {
                      selection.set("je", (value * dj * rate).toFixed(0));
                    }
                    that.sumje();
                  },
                },
              },
            },
            {
              xtype: "numbercolumn",
              text: "重量",
              format: "0.000",
              dataIndex: "khzl",
              sortable: false,
              flex: 1,
              editor: {
                type: "numberfield",
                decimalPrecision: 3,
                align: "right",
                allowBlank: true,
                listeners: {
                  change: function (field, value) {
                    var customerGrid = this.up("#CpgfdmxGrid");
                    var selection = customerGrid
                      .getSelectionModel()
                      .getSelection()[0];
                    var dj = selection.get("dj");
                    selection.set("khzl", value);
                    if (dj == undefined) dj = 0;
                    if (value * dj < 1 && value * dj > 0) {
                      selection.set("je", 1);
                    } else {
                      selection.set("je", (value * dj).toFixed(0));
                    }
                    //var store = customerGrid.getStore();
                    //                                           return sumjs(store, null, this.up('#cpgfdedit').getViewModel());
                    that.sumje();
                  },
                },
              },
            },
            /*{
                            xtype: 'numbercolumn',
                            text: '单价',
                            format: '0.00',
                            dataIndex: 'dj', sortable: false,
                            flex: 1,
                            editor: {
                                type: 'numberfield',
                                decimalPrecision: 2,
                                align: 'right',
                                allowBlank: true,
                                listeners: {
                                    change: function (field, value) {
                                        var customerGrid = this.up('#CpgfdmxGrid');
                                        var selection = customerGrid.getSelectionModel().getSelection()[0];
                                        var dj = selection.get('zl');
                                        if ((value * dj < 1) && (value * dj > 0)) {
                                            selection.set('je', 1);
                                        } else {
                                            selection.set('je', (value * dj).toFixed(0));
                                        }
                                        that.sumje();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '金额',
                            format: '0.00',
                            dataIndex: 'je', sortable: false,
                            flex: 1,
                            renderer: jerenderer
                        }
                        ,
                        {
                            text: '作业资料',
                            columns: [
                                {
                                    text: '机械',
                                    width: 100,
                                    dataIndex: 'gs'
                                }
                                ,
                                {
                                    text: '搬运',
                                    sortable: false,
                                    width: 100,
                                    dataIndex: 'byg'
                                }
                                ,
                                {
                                    text: '仓管',
                                    sortable: false,
                                    width: 100,
                                    dataIndex: 'cg'
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    width: 0,
                                    bind: {
                                        width: "{w}"
                                    },
                                    sortable: false,
                                    widget: {
                                        xtype: 'button',
                                        text: '',
                                        bind: {
                                            hidden: "{gsop}"
                                        },
                                        handler: 'onSelectWorkerView'
                                    }
                                }
                            ]
                        }*/
          ],
          listeners: {
            celldblclick: function (
              ctx,
              td,
              cellIndex,
              record,
              tr,
              rowIndex,
              e,
              eOpts
            ) {
              console.log('You have clicked cell in the ' + cellIndex + ' column and ' + rowIndex + ' row')
              that.popupmx = that.lookupReference("gfdpopupWindow");
              console.log("that.popupmx",that.popupmx)
              if (gfid == 0) {
                if (cellIndex == 0) {
                  // console.log(that.popupmx);
                  treeSelect(
                    "cdmc",
                    that,
                    "",
                    that.popupmx,
                    false,
                    cdmcCallBack
                  );
                  return false;
                } else {
                  if (cellIndex == 1) {
                    treeSelect(
                      "cpmc",
                      that,
                      "",
                      that.popupmx,
                      false,
                      cpmcCallBack
                    );
                    return false;
                  } else {
                    if (cellIndex == 2) {


                      treeSelect(
                        "bzmc",
                        that,
                        "",
                        that.popupmx,
                        false,
                        bzmcCallBack
                      );

                      /*var p = that.lookupReference("gfdpopupWindow");
                      sys_current_khid = p.getViewModel().get("khid");
                      
                      sys_current_ckid = p.getViewModel().get("ckid");
                      console.log("treeSelect sys_current_khid sys_current_ckid",sys_current_khid,sys_current_ckid);
                      console.log("viewname ",that.viewname.down("#selectTreePanel"));
                     // console.log("viewname1",that.viewname.down("#selectTreePanel"));
                     // var s = that.getView().down("#selectTreePanel").getStore();
                     //var s = that.viewname.down("#selectTreePanel").getStore(); //down("#QueryToolbarView");
                      // console.log("selectTreePanel store",s);
                       //s.proxy.extraParams.p_c_id = sys_current_khid;
                       //s.proxy.extraParams.p_l_id = sys_current_ckid;
                       //s.reload();
                       */

                      return false;
                    }
                  }
                }
              }
            },
          },
        },
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
              height: 35,
              margin: "5 0 5 0",
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
                  name: "khshr",
                  fieldLabel: "审核员",
                  bind: "{khshr}",
                },
                {
                  name: "cwr",
                  fieldLabel: "财务出纳",
                  bind: "{cwr}",
                },
              ],
            },
            {
              xtype: "fieldcontainer",
              msgTarget: "side",
              height: 35,
              margin: "5 0 5 0",
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
        /***********************************/
      ],
    },
  ],
  /*********************************** */
  buttons: [
    {
      text: "增加商品",
      icon: "images/add.gif",
      itemId: "btnAddCpmc",
    },
    {
      text: "删除当前行",
      icon: "images/delete.gif",
      itemId: "btnDeleteCpmc",
    },
    {
      text: "此单已删除!!",
      bind: {
        hidden: "{!delbz}",
      },
    },
    "->",
    {
      text: "打印此单",
      icon: "images/print.gif",
      hidden: true,
      disabled: !LODOP,
      itemId: "btnPrintCpgfd",
    },
    {
      text: "保存",
      icon: "images/right.gif",
      itemId: "CpgfdFormSubmit",
      handler: "onCpgfdFormSubmit",
    },
    {
      text: "放弃",
      icon: "images/close.gif",
      handler: function () {
        // this.up("#cpgfdedit").close();
        this.up("window").close();
      },
    },
  ],
});
