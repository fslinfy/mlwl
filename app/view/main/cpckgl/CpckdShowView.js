
Ext.define('MyApp.view.main.cpckgl.CpckdShowView', {
    extend: 'Ext.window.Window',
    xtype: 'cpckformwindow',
    reference: 'popupCpckdWindow',
    itemId: "cpckdshowview",
    bind: {
        title: '{title}'
    },
    width: '95%',
    height: 600,
    minWidth: 600,
    requires: [
        'MyApp.view.main.report.PrintCpckd'
        ,'MyApp.view.main.cpckgl.CpckdCtrlFunction'
    ],
    minHeight: 400,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 5,
    plain: true,
    maximizable: true,
    //viewModel: {
    //    type: 'CpckdViewModel'
    //},

    modal: true,
    items: [{
        xtype: 'form',
        reference: 'windowForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        autoScroll: true,
        // bodyPadding: 5,
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
                            name: 'ckdh',
                            fieldLabel: '提单号',
                            flex: 1,
                            readOnly: true,
                            bind: "{xsdh}",
                            margin: '0 10 0 0'
                        },
                         {
                            xtype: 'datefield',
                            name: 'xsrq',
                            width: 160,
                            bind: "{xsrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '开单日期',
                            allowBlank: false,
                              margin: '0 10 0 0'
                        },
                        {
                            name: 'ckdh',
                            labelWidth: 30,
                            fieldLabel: 'No',
                            width: 160,
                            readOnly: true,
                            bind: "{ckdh}"
                          
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
                            fieldLabel: '提货车牌',
                            flex: 1,
                            bind: "{cphm}",
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        }, {
                            name: 'thr',
                            fieldLabel: '提货人',
                            flex: 1,
                            readOnly: true,
                            bind: "{thr}",
                            margin: '0 10 0 0',
                            allowBlank: true
                        }
                        ,
                        {
                            xtype: 'datefield',
                            name: 'ckrq',
                            width: 160,
                            bind: "{ckrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '出库日期',
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
                store: { type: 'CpckdmxStore' },
                //bind: "{cpckdmxStore}",
                //store:cpckdmxStore,
                reference: 'CpckdmxGrid',
                itemId: 'CpckdmxGrid',
                margin: '0 0 0 0',
                //title: 'Orders',
                //   bind: '{theCustomer.orders}',
                //  tbar: [{
                //     text: 'Add Order',
                //     handler: 'onAddOrderClick'
                // }],
                columns: [/*{
                    text: 'mxid',
                    dataIndex: 'mxid',
                    
                    width: 80
                    
                },*/
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
                    text: '计划出库数量',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量',
                            sortable: false,
                            dataIndex: 'ccsl',
                            width: 80,
                            renderer: zlrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量',
                            sortable: false,
                            dataIndex: 'cczl',
                            width: 80,
                            renderer: zlrenderer

                        }]
                },
                {
                    text: '实际已出库数量',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量',
                            sortable: false,
                            dataIndex: 'cwsl',
                            width: 80,
                            renderer: zlrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量',
                            sortable: false,
                            dataIndex: 'cwzl',
                            width: 80,
                            renderer: zlrenderer

                        }]
                },
                {
                    text: '出仓费',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '单价',
                            width: 64,
                            sortable: false,
                            dataIndex: 'czdj',
                            renderer: jerenderer

                        },
                        {
                            xtype: 'numbercolumn',
                            text: '金额',
                            width: 70,
                            sortable: false,
                            dataIndex: 'ccje',
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
                    text: '作业资料',

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
                                width: "{w}"
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
                ,
                listeners: {
                    select: 'onCpckdmxItemSelected'
                }
            },

            {
                xtype: 'grid',
                height: 150, border: 1,
                reference: 'cpckdmxcw0',
                itemId: 'cpckdmxcw0',
                columnLines: true,
                enableColumnHide: false,
                store: { type: 'CpckdcwStore' },
                columns: [
                    {
                       text: '区',
                       dataIndex: 'area', sortable: false,
                       width: 100
                    },
                    {
                        text: '仓位',
                        dataIndex: 'cw', sortable: false,
                        flex: 1
                    },
/*
                    {
                        text: '商品批号',
                        dataIndex: 'cpph', sortable: false,
                        flex: 1
                    },
*/
                    {
                        xtype: 'numbercolumn',
                        text: '数量', sortable: false,
                        dataIndex: 'sl',
                        flex: 1,
                        renderer: zlrenderer
                    },
                    {
                        text: '单位',
                        dataIndex: 'dw', sortable: false,
                        width: 50
                    },
                    {
                        xtype: 'numbercolumn',
                        text: '重量', sortable: false,
                        dataIndex: 'zl',
                        flex: 1,
                        renderer: zlrenderer
                    },

                    {
                        xtype: 'datecolumn',
                        text: '进库日期',
                        width: 120,
                        formatter: 'date("Y-m-d")',
                        sortable: false,
                        hideable: false,
                        dataIndex: 'czrq'
                    },
                    /*{
                        xtype: 'numbercolumn',
                        text: '仓租单价', sortable: false,
                        flex: 1,
                        dataIndex: 'czdj',
                        renderer: jerenderer
                    },*/
                    {
                        text: '仓位说明',
                        flex: 1, sortable: false,
                        dataIndex: 'sm'
                    }

                ]
            },



            //***********************************************************/
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
                            name: 'cwsh',
                            fieldLabel: '财务审核',
                            bind: "{cwsh}"
                        }, {
                            name: 'cgy',
                            fieldLabel: '仓库复核',
                            bind: "{cgy}"
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
    }],
    buttons: [
        {
            text: '取消此出仓内容',
            icon: "images/delete.gif",
            hidden: true,
            // bind: {
            //     hidden: "{btnButtonHidden}"
            // },
            itemId: 'btnCpckdDelete'
        },
        {
            text: '此出仓单已取消!!',
            bind: {
                hidden: "{!delbz}"
            }
        },
        "->",
        {
            text: '审核通过此单',
            icon: "images/right.gif",
            hidden: true,
            itemId: 'btnCpckdSave'
        },
        {
            text: '打印此单',
            icon: "images/print.gif",
            disabled:(!LODOP), 
            itemId: 'btnPrintCpckd'
        },
        {
            text: '取消上步审核',
            icon: "images/unDo.gif",
            hidden: true,
            itemId: 'btnCpckdCancel'
        },
        {
            text: '返回',
            icon: "images/close.gif",
            handler: function () {

                //this.up("#cpckdshowview").close();
                this.up("window").close();
                //this.up("window").close();

            }
        }]
});