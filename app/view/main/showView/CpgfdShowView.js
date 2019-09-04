
Ext.define('MyApp.view.main.showView.CpgfdShowView', {
    extend: 'Ext.window.Window',
    xtype: 'cpgfdformwindow',
    reference: 'popupCpgfdWindow',
    itemId: "cpgfdshowview",
    
    bind: {
        title: '{title}'
    },
    requires: [
         'MyApp.view.main.DataSave'
       // , 'MyApp.store.CpgfdmxStore'
        , 'MyApp.store.CurCpgfdjeStore'
        
    ],
    title: '过车通知单',
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
                            xtype: 'datefield',
                            name: 'gfrq',
                            itemId: 'field_gfrq',
                            width: 190,
                            bind: "{gfrq}",
                            format: 'Y-m-d',
                            fieldLabel: '过车日期',
                            bind: {
                                hidden: "{!ckop}"
                            },
                            allowBlank: true
                        },
                        {
                            xtype: 'datefield',
                            name: 'kdrq',
                            itemId: 'field_kdrq',
                            width: 160,
                            bind: "{kdrq}",
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
                            fieldLabel: '过车仓库',
                            bind: "{ckmc}",
                            flex: 2,
                            readOnly: true,
                            margin: '0 10 0 0',
                            allowBlank: true
                        }, 
                        {
                            name: 'gfdh',
                            fieldLabel: '通知单号',
                            flex: 1,
                            readOnly: true,
                            bind: "{gfdh}",
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: '费用付现',
                            width: 90,
                            align: 'right',
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
                        reference: 'cpgfdmxje0',
                        itemId: 'cpgfdmxje0',
                        height: 100,
                        store: { type: 'CurCpgfdjeStore' }
                    }

                ]
            },
            {
                xtype: 'grid',
                height: 200,
                border: 1,
                columnLines: true,
                enableColumnHide: false,
                store: { type: 'CpgfdmxStore' },
                reference: 'CpgfdmxGrid',
                itemId: 'CpgfdmxGrid',
                margin: '0 0 0 0',
                columns: [{
                    text: '产地',
                    dataIndex: 'cdmc',
                    sortable: false,
                    flex: 1
                },
                {
                    text: '商品名称',
                    dataIndex: 'xmmc', sortable: false,
                    flex: 2
                }, {
                    text: '包装',
                    dataIndex: 'bzmc', sortable: false,
                    flex: 2
                },
                /*{
                    text: '规格型号',
                    dataIndex: 'cpgg', sortable: false,
                    flex: 1
                }, {
                    text: '批号',
                    dataIndex: 'cpph', sortable: false,
                    flex: 1
                },*/
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
                            dataIndex: 'khsl',
                            width: 80,//flex: 1,
                            renderer: slrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量', sortable: false,
                            dataIndex: 'khzl', align: 'right',
                            width: 80,//flex: 1,
                            renderer: slrenderer

                        }]
                },
                {
                    text: '过车内容',
                    columns: [
                        {
                            xtype: 'numbercolumn',
                            text: '数量', align: 'right',
                            sortable: false,
                            dataIndex: 'sl',
                            width: 80,
                            renderer: slrenderer
                        },
                        {
                            xtype: 'numbercolumn',
                            text: '重量', align: 'right',
                            sortable: false,
                            dataIndex: 'zl',
                            width: 80,
                            renderer: slrenderer

                        }
                        ,
                        {
                            xtype: 'numbercolumn',
                            text: '金额', align: 'right',
                            sortable: false,
                            dataIndex: 'je',
                            width: 80,
                            renderer: slrenderer

                        }
                    ]
                },
                {
                    text: '分区', sortable: false,
                    dataIndex: 'area',
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
                        text: '过车',
                        handler: 'onCpgfdmxgheditView'
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
                            name: 'gfid',
                            fieldLabel: 'gfid',
                            bind: "{gfid}",
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

            }
        ]
    }
    
],
    buttons: [
        {
            text: '删除此单',
            itemId: 'btnCpgfdDelete',
            icon: "images/delete.gif",
            hidden: true//,
            //handler: 'onCpgfdDeleteSubmit'
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
            itemId: 'btnCpgfdSave',
            hidden: true,
            icon: "images/right.gif",
            handler: 'onCpgfdSaveSubmit'
            // handler: function () {
            //  console.log('save');
            // }
        },
        {
            text: '打印此过车单',
            icon: "images/print.gif",
            // hidden:sys_location_id=0 ,
            disabled: (!LODOP),
            hidden: true,
            itemId: 'btnPrintCpgfd'

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
          

             //curcpgfdcwStore.clearFilter();
             curcpgfdjeStore.clearFilter();
             //curcpgfdcwStore.removeAll();
             curcpgfdjeStore.removeAll();
             //curcpgfdcwStore.sync();
             curcpgfdjeStore.sync();

             //that.getView().down("#cpgfdshowview").close();
             that.locQuery(that);
             console.log("beforedestroy");

   
        }
    }
});