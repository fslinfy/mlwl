
Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdshShowView', {
    extend: 'Ext.window.Window',
    xtype: 'cpgfshformwindow',
    reference: 'popupCpgfdWindow',
    itemId: "cpgfdshowview",
    bind: {
        title: '{title}'
    },

    width: '95%',
    height: 500,
    minWidth: 600,
    requires: [
       'MyApp.view.main.report.PrintwxCpgfd'
       ,'MyApp.view.main.wxcpgfgl.wxCpgfdCtrlFunction'
       , 'MyApp.view.main.wxcpgfgl.wxCpgfdshStore'
    ],
    minHeight: 400,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 5,
    plain: true,
    maximizable: true,
    //viewModel: {
    //    type: 'CpgfdViewModel'
    //},

    modal: true,
    items: [
        {
        xtype: 'form',
        reference: 'windowForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
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
                margin: '0 0 0 0',
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth: 40,
                    frame: true
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        msgTarget: 'side',
                        defaultType: 'textfield',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            labelWidth: 60
                            //hideLabel: true
                        },
                        items: [{

                            name: 'khid',
                            fieldLabel: 'id',
                            hidden: true,
                            bind: "{khid}"
                        },
                        {
                            name: 'khmc',
                            fieldLabel: '客户名称',
                            flex: 2,
                            readOnly: true,
                            bind: "{khmc}",
                            margin: '0 10 0 0'
                        },
                         {
                            xtype: 'datefield',
                            name: 'kdrq',
                            width: 160,
                            bind: "{kdrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '开单日期',
                            allowBlank: false,
                              margin: '0 10 0 0'
                        },
                        {
                            name: 'gfdh',
                            labelWidth: 30,
                            fieldLabel: 'No',
                            width: 160,
                            readOnly: true,
                            bind: "{gfdh}"
                          
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        msgTarget: 'side',
                        defaultType: 'textfield',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            //                           flex: 1,
                            labelWidth: 60
                        },
                        items: [{
                            name: 'sfdh',
                            fieldLabel: '仓库名称',
                            bind: "{ckmc}",
                            flex: 1,
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        }, {
                            name: 'cphm',
                            fieldLabel: '车牌号码',
                            flex: 1,
                            bind: "{cphm}",
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        },
                        {
                            name: 'sfr',
                            fieldLabel: '送货人',
                            flex: 1,
                            bind: "{sfr}",
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        },
                        {
                            xtype: 'datefield',
                            name: 'gfrq',
                            width: 160,
                            bind: "{gfrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '过户日期',
                            allowBlank: false
                        }]
                    }
                ]
            },
            
            {
                xtype: 'grid',
                height: 220, border: 1,
                columnLines: true,
                enableColumnHide: false,
                store: { type: 'wxCpgfdshStore' },
                //bind: "{cpgfdmxStore}",
                //store:cpgfdmxStore,
                reference: 'CpgfdmxGrid',
                itemId: 'CpgfdmxGrid',
                margin: '0 0 0 0',
                //title: 'Orders',
                //   bind: '{theCustomer.orders}',
                //  tbar: [{
                //     text: 'Add Order',
                //     handler: 'onAddOrderClick'
                // }],
                columns: [
                {
                    text: '产地',
                    dataIndex: 'cdmc',
                    //flex: 1,
                    width: 80,
                    sortable: false
                    // renderer: 'renderOrderId'
                },
                {
                    text: '商品名称',
                    dataIndex: 'cpmc',
                    sortable: false,
                    width: 150
                    //flex: 2

                }, {
                    text: '包装',
                    sortable: false,
                    dataIndex: 'bzmc',
                    width: 140
                    //flex: 2

                }, {
                    text: '规格型号',
                    sortable: false,
                    dataIndex: 'cpgg',
                    width: 120

                },
                {
                    text: '批号',
                    sortable: false,
                    dataIndex: 'cpph',
                    width: 70

                },
                {
                    text: '单位',
                    sortable: false,
                    dataIndex: 'jldw',
                    width: 50

                },
                {
                    text: '计划过户数量',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量',
                            sortable: false,
                            dataIndex: 'khsl',
                            width: 80,
                            renderer: zlrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量',
                            sortable: false,
                            dataIndex: 'khzl',
                            width: 80,
                            renderer: zlrenderer

                        }]
                },
                {
                    text: '实际已过户数量',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量',
                            sortable: false,
                            dataIndex: 'sl',
                            width: 80,
                            renderer: zlrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量',
                            sortable: false,
                            dataIndex: 'zl',
                            width: 80,
                            renderer: zlrenderer

                        }]
                },
                {
                    text: '过户费用',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '单价',
                            width: 64,
                            sortable: false,
                            dataIndex: 'dj',
                            renderer: jerenderer

                        },
                        {
                            xtype: 'numbercolumn',
                            text: '金额',
                            width: 70,
                            sortable: false,
                            dataIndex: 'je',
                            renderer: jerenderer

                        },
                        {
                            xtype: 'numbercolumn',
                            text: '现付',
                            width: 70, sortable: false,
                            dataIndex: 'xjje',
                            renderer: jerenderer

                        }]
                }
                    ,
                {
                    text: '过户作业资料',

                    columns: [
                        {

                            text: '搬运',
                            width: 70, sortable: false,
                            dataIndex: 'byg'

                        }
                        ,
                        {

                            text: '机械',
                            width: 70, sortable: false,
                            dataIndex: 'gs'

                        }
                        ,
                        {

                            text: '仓管',
                            width: 70, sortable: false,
                            dataIndex: 'cg'

                        },
                        {
                            xtype: 'widgetcolumn', sortable: false,
                            width: 0,
                            bind: {
                                width:"{w}"
                            },
                            widget: {
                                xtype: 'button',
                                text: '...',
                                bind: {
                                    hidden: "{gsop}"
                                },
                                handler: 'onSelectWorkerView'
                            }
                        }
                    ]
                }
                ]
                //,
               // listeners: {
               //     select: 'onCpgfdmxItemSelected'
               // }
            },
            
            

           
            {
                xtype: 'fieldcontainer',
                //title:'NORTH',
                height: 100,
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth: 40,
                    frame: true
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        //  fieldLabel: 'Availability',
                        //combineErrors: true,
                        msgTarget: 'side',
                        defaultType: 'textfield',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },

                        defaults: {
                            flex: 1,
                            labelWidth: 60,
                            readOnly: true,
                            margin: '3 10 0 0'
                        },
                        items: [{
                            name: 'czy',
                            fieldLabel: '操作员',
                            bind: "{czy}"

                        }, {
                            name: 'shr',
                            fieldLabel: '业务审核',
                            bind: "{shr}"
                        }, {
                            name: 'cwshr',
                            fieldLabel: '财务审核',
                            bind: "{cwshr}"
                        }, {
                            name: 'ckshr',
                            fieldLabel: '仓库复核',
                            bind: "{ckshr}"
                        }, {
                            name: 'ckid',
                            fieldLabel: 'ckid',
                            bind: "{ckid}",
                            hidden: true
                        }
                        ]
                    },
                    ,
                    {
                        xtype: 'fieldcontainer',
                        msgTarget: 'side',
                        defaultType: 'textfield',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            flex: 1,
                            readOnly: true,
                            labelWidth: 60,
                            margin: '3 10 0 0'
                        },
                        items: [{
                            name: 'cnote',
                            fieldLabel: '备注',
                            bind: "{cnote}"

                        }]
                    }
                ]

            }]
    }
],
    buttons: [
       /* {
            text: '取消此过车内容',
            icon: "images/delete.gif",
            hidden: true,
            bind: {
                 hidden: "{btnButtonHidden}"
            },
            itemId: 'btnCpgfdDelete'
        },*/
        "->",
        {
            text: '审核通过此单',
            icon: "images/right.gif",
            hidden: true,
            itemId: 'btnCpgfdSave'
        },
        {
            text: '打印此单',
            icon: "images/print.gif",
            disabled:(!LODOP), 
            itemId: 'btnPrintCpgfd'
        },
        {
            text: '取消上步审核',
            icon: "images/unDo.gif",
            hidden: true,
            itemId: 'btnCpgfdCancel'
        },
        {
            text: '返回',
            icon: "images/close.gif",
            handler: function () {

                //this.up("#cpgfdshowview").close();
                this.up("window").close();
                //this.up("window").close();

            }
        }]
});