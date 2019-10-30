
Ext.define('MyApp.view.main.showView.CpxsdShowView', {
    extend: 'Ext.window.Window',
    xtype: 'cpxsdformwindow',
    reference: 'popupCpxsdWindow',
    itemId: "cpxsdshowview",
    bind: {
        title: '{title}'
    },
    title: '商品销售单',
    width: '85%',
    height: 500,
    minWidth: 600,
    minHeight: 400,
    closeAction: 'destroy',
    layout: 'fit',
    closeAction: 'destroy',

    bodyPadding: 5,
    plain: true,
    maximizable: true,
    border: 1,
    modal: true,
    items: [{
        xtype: 'form',
        reference: 'windowForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        autoScroll: true,
        border: false,
        items: [
            {
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
                            name: 'xsdh',
                            fieldLabel: '销售单号',
                            flex: 1,
                            readOnly: true,
                            bind: "{xsdh}",
                            margin: '0 10 0 0'
                        }, {
                            xtype: 'datefield',
                            name: 'ckrq',
                            itemId: 'field_ckrq',
                            width: 190,
                            bind: "{ckrq}",
                            format: 'Y-m-d',
                            fieldLabel: '出仓日期',
                            bind: {
                                hidden: "{!ckop}"
                            },
                            allowBlank: true
                        },
                        {
                            xtype: 'datefield',
                            name: 'xsrq',
                            itemId: 'field_xsrq',
                            width: 160,
                            bind: "{xsrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '销售日期',
                            allowBlank: false
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
                            name: 'ckmc',
                            fieldLabel: '提货仓库',
                            bind: "{ckmc}",
                            flex: 1,
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        }, {
                            name: 'cphm',
                            fieldLabel: '提货车牌',
                            flex: 1,
                            bind: {
                                readOnly: "{!ckop}"
                            },
                            bind: "{cphm}",
                            itemId: 'field_cphm',

                            margin: '0 10 0 0',
                            allowBlank: true
                        }, {
                            name: 'sfr',
                            fieldLabel: '提货人',
                            itemId: 'field_sfr',
                            flex: 1,
                            bind: {
                                readOnly: "{!ckop}"
                            },
                            bind: "{sfr}",

                            margin: '0 10 0 0',
                            allowBlank: true
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: '费用付现',
                            width: 90, align: 'right',
                            name: 'xjbz',
                            readOnly: true,
                            bind: '{xjbz}'

                        },

                        {
                            xtype: 'datefield',
                            name: 'endrq',
                            itemId: 'field_endrq',
                            width: 160,
                            bind: "{endrq}",
                            format: 'Y-m-d',
                            readOnly: true,
                            fieldLabel: '有效日期',
                            allowBlank: false
                        }]
                    }
                ]
            },

            {
                hidden: true,
                items: [

                    {
                        xtype: 'grid',
                        reference: 'cpckdmxcw0',
                        itemId: 'cpckdmxcw0',
                        height: 100,
                        store: { type: 'CurCpckdcwStore' }

                    },
                    {
                        xtype: 'grid',
                        reference: 'cpckdmxje0',
                        itemId: 'cpckdmxje0',
                        store: { type: 'CurCpckdjeStore' }

                    }

                ]
            },
            {
                xtype: 'grid',
                height: 200,
                border: 1,
                columnLines: true,
                enableColumnHide: false,
                store: { type: 'CpxsdmxStore' },
                reference: 'CpxsdmxGrid',
                itemId: 'CpxsdmxGrid',
                margin: '0 0 0 0',
                columns: [{
                    text: '产地',
                    dataIndex: 'cdmc',
                    sortable: false,
                    flex: 1
                },
                {
                    text: '商品名称',
                    dataIndex: 'cpmc', sortable: false,
                    flex: 2
                }, {
                    text: '包装',
                    dataIndex: 'bzmc', sortable: false,
                    flex: 2
                },
                /* {
                    text: '包装ID',
                    dataIndex: 'bzid', sortable: false,
                    flex: 1
                },*/ {
                    text: '规格型号',
                    dataIndex: 'cpgg', sortable: false,
                    flex: 1
                }, {
                    text: '批号',
                    dataIndex: 'cpph', sortable: false,
                    flex: 1
                },
                {
                    text: '单位',
                    dataIndex: 'jldw', sortable: false,
                    width: 50

                },
                {
                    text: '销售内容',
                    //    flex: 4,
                    columns: [

                        {
                            xtype: 'numbercolumn', sortable: false,
                            text: '数量', align: 'right',
                            dataIndex: 'xssl',
                            width: 80,//flex: 1,
                            renderer: slrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量', sortable: false,
                            dataIndex: 'xszl', align: 'right',
                            width: 80,//flex: 1,
                            renderer: slrenderer

                        }]
                },
                {
                    text: '发货内容',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量', align: 'right',
                            sortable: false,
                            dataIndex: 'ccsl',
                            width: 80,
                            renderer: slrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量', align: 'right',
                            sortable: false,
                            dataIndex: 'cczl',
                            width: 80,
                            renderer: slrenderer

                        }]
                },
                {
                    text: '说明', sortable: false,
                    dataIndex: 'sm',
                    flex: 1
                },
                /*
                                { xtype: 'numbercolumn',
                                    text: 'ccsl', 
                                    dataIndex: 'ccsl',
                                    flex: 1,
                                    renderer: slrenderer
                                },
                                { xtype: 'numbercolumn',
                                    text: 'cczl', 
                                    dataIndex: 'cczl',
                                    flex: 1,
                                    renderer: slrenderer
                                },
                                { xtype: 'numbercolumn',
                                    text: 'ccje', 
                                    dataIndex: 'ccje',
                                    flex: 1,
                                    renderer: slrenderer
                                },
                                */
                {
                    xtype: 'widgetcolumn',
                    width: 70, sortable: false,
                    bind: {
                        hidden: "{!ckop}"
                    },
                    widget: {
                        xtype: 'button',
                        text: '出仓',
                        handler: 'onCpckdmxShowView'
                    }
                }
                ]

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
                            name: 'cwsh',
                            fieldLabel: '财务审核',
                            // bind: "{cwsh}"
                        }, {
                            name: 'cgy',
                            fieldLabel: '销售',
                            //bind: "{cgy}",
                            margin: '3 0 0 0'
                        }, {
                            name: 'xsid',
                            fieldLabel: 'xsid',
                            bind: "{xsid}",
                            hidden: true
                        }
                        ]
                    },

                    {
                        xtype: 'fieldcontainer',
                        msgTarget: 'side',
                        defaultType: 'textfield',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [{
                            // xtype: "textarea",


                            //  labelSepartor: "：",
                            labelWidth: 60,
                            //width: 230,
                            //   height: 40,



                            name: 'cnote',
                            itemId: "field_cnote",
                            flex: 1,
                            bind: "{cnote}",
                            labelWidth: 60,
                            margin: '3 10 0 0',
                            //bind: {
                            //     readOnly: "{!ckop}"
                            //  },
                            fieldLabel: '备注'

                        }]
                    }
                ]

            }]
    }],
    buttons: [
        {
            text: '删除此单',
            itemId: 'btnCpxsdDelete',
            icon: "images/delete.gif",
            hidden: true//,
            //handler: 'onCpxsdDeleteSubmit'
        },
        {
            text: '此单已删除!!',
            bind: {
                hidden: "{!delbz}"
            }
        },
        "->",
        {
            text: '保存',
            itemId: 'btnCpxsdSave',
            hidden: true,
            icon: "images/right.gif"//,
            //handler: 'onCpxsdSaveSubmit'
            // handler: function () {
            //  console.log('save');
            // }
        },
        {
            text: '打印此提货单',
            icon: "images/print.gif",
            // hidden:sys_location_id=0 ,
            disabled: (!LODOP),
            hidden: true,
            itemId: 'btnPrintCpxsd'

        },
        {
            text: '返回',
            icon: "images/close.gif",
            handler: function () {
                //this.up("window").hide();
                this.up("window").close();
            }
        }],
    listeners: {
        beforedestroy: function (obj) {
          

        /*     curcpckdcwStore.clearFilter();
             curcpckdjeStore.clearFilter();
             curcpckdcwStore.removeAll();
             curcpckdjeStore.removeAll();
             curcpckdcwStore.sync();
             curcpckdjeStore.sync();
*/
             //that.getView().down("#cpxsdshowview").close();
             that.locQuery(that);
             console.log("beforedestroy");

   
        }
    }
});