
Ext.define('MyApp.view.main.showView.CpghdShowView', {
    extend: 'Ext.window.Window',
    xtype: 'cpghdformwindow',
    reference: 'popupCpghdWindow',
    itemId: "cpghdshowview",
    
    bind: {
        title: '{title}'
    },
    /*requires: [
         'MyApp.view.main.DataSave'
        , 'MyApp.store.CpghdmxStore'
        , 'MyApp.view.main.showView.CpghdShowView'
        , 'MyApp.store.CurCpghdcwStore'
        , 'MyApp.store.CurCpghdjeStore'
        
    ],
    */
    title: '过户通知单',
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
    items: [
        {
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
                            name: 'ghdh',
                            fieldLabel: '通知单号',
                            flex: 1,
                            readOnly: true,
                            bind: "{ghdh}",
                            margin: '0 10 0 0'
                        }, {
                            xtype: 'datefield',
                            name: 'ckrq',
                            itemId: 'field_ckrq',
                            width: 190,
                            bind: "{ckrq}",
                            format: 'Y-m-d',
                            fieldLabel: '过户日期',
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
                            fieldLabel: '开单日期',
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
                            fieldLabel: '过户仓库',
                            bind: "{ckmc}",
                            flex: 3,
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        }, {
                            name: 'newkhmc',
                            fieldLabel: '新客户',
                            flex: 3,
                            bind: {
                                readOnly: "{!ckop}"
                            },
                            bind: "{newkhmc}",
                            itemId: 'field_cphm',

                            margin: '0 10 0 0',
                            allowBlank: true
                        }, 
                        {
                            xtype: 'checkbox',
                            fieldLabel: '新客户付费用',
                            labelWidth: 100,
                            //width: 90, 
                            flex: 1,
                            align: 'right',
                            name: 'jebz',
                            //hidden:'{!jebz}',
                            readOnly: true,
                            bind: '{jebz}'

                        },

                        {
                            xtype: 'checkbox',
                            fieldLabel: '费用付现',
                            //width: 90,
                            flex: 1,
                            align: 'right',
                            name: 'xjbz',
                            //hidden:'{jebz}',
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
                        reference: 'cpghdmxcw0',
                        itemId: 'cpghdmxcw0',
                        height: 100,
                        store: { type: 'CurCpghdcwStore' }

                    },
                    {
                        xtype: 'grid',
                        reference: 'cpghdmxje0',
                        itemId: 'cpghdmxje0',
                        height: 100,
                        store: { type: 'CurCpghdjeStore' }
                    }

                ]
            },
            {
                xtype: 'grid',
                height: 200,
                border: 1,
                columnLines: true,
                enableColumnHide: false,
                store: { type: 'CpghdmxStore' },
                reference: 'CpghdmxGrid',
                itemId: 'CpghdmxGrid',
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
                {
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
                    text: '通知内容',
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
                    text: '过户内容',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量', align: 'right',
                            sortable: false,
                            dataIndex: 'ghsl',
                            width: 80,
                            renderer: slrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量', align: 'right',
                            sortable: false,
                            dataIndex: 'ghzl',
                            width: 80,
                            renderer: slrenderer

                        }]
                },
                {
                    text: '说明', sortable: false,
                    dataIndex: 'sm',
                    flex: 1
                },
                {
                    xtype: 'widgetcolumn',
                    width: 70, sortable: false,
                    bind: {
                        hidden: "{!ckop}"
                    },
                    widget: {
                        xtype: 'button',
                        text: '过户',
                        handler: 'onCpghdmxgheditView'
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
                            name: 'ghid',
                            fieldLabel: 'ghid',
                            bind: "{ghid}",
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
    }
],
    buttons: [
        {
            text: '删除此单',
            itemId: 'btnCpghdDelete',
            icon: "images/delete.gif",
            hidden: true//,
            //handler: 'onCpghdDeleteSubmit'
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
            itemId: 'btnCpghdSave',
            hidden: true,
            icon: "images/right.gif"//,
            //handler: 'onCpghdSaveSubmit'
            // handler: function () {
            //  console.log('save');
            // }
        },
        {
            text: '打印此过户单',
            icon: "images/print.gif",
            // hidden:sys_location_id=0 ,
            disabled: (!LODOP),
            hidden: true,
            itemId: 'btnPrintCpghd'

        },
        {
            text: '返回',
            icon: "images/close.gif",
            handler: function () {
                //this.up("window").hide();
                this.up("window").close();
            }
        }
    ],
    listeners: {
        beforedestroy: function (obj) {
          

             curcpghdcwStore.clearFilter();
             curcpghdjeStore.clearFilter();
             curcpghdcwStore.removeAll();
             curcpghdjeStore.removeAll();
             curcpghdcwStore.sync();
             curcpghdjeStore.sync();

             //that.getView().down("#cpghdshowview").close();
             that.locQuery(that);
             console.log("beforedestroy");

   
        }
    }
});