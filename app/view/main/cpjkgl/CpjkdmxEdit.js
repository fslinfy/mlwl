
Ext.define('MyApp.view.main.cpjkgl.CpjkdmxEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formcpjkwindow',
    reference: 'popupcpjkWindow',
    bind: {
        title: '{title}'
    },
    itemId: "cpjkdmxedit",
    width: "95%",
    height: 600,
    minWidth: 600,
    minHeight: 500,
    layout: 'fit',

    maximizable: true,
    closeAction: 'destroy',
    bodyPadding: 10,
    modal: true,
    items: [
        {
            xtype: 'form',
            reference: 'windowFormmx',
            itemId: 'windowFormmx',
            layout: {
                type: 'vbox', align: 'stretch'
            },
            autoScroll: true,
            //bodyPadding: 5,
            border: false,
            items: [
                {

                    // xtype: 'fieldcontainer',
                    height: 86,
                    //width: "100%",
                    margin: '0 0 0 0',
                    defaults: {
                        flex: 1,
                        xtype: 'fieldcontainer',
                        msgTarget: 'side',
                        defaultType: 'textfield'
                    },
                    layout: {
                        type: 'vbox', align: 'stretch'
                    },
                    items: [
                        {
                            fieldDefaults: {
                                labelWidth: 60,
                                flex: 1,
                                frame: true
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [


                                //  { xtype: 'QueryCdmc', flex: 1 },
                                //  { xtype: 'QueryCpmc', flex: 1 },

                                { name: 'cdid', bind: "{cdid}", hidden: true },
                                {
                                    name: 'cdmc',
                                    fieldLabel: '产地名称',
                                    bind: '{cdmc}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 10 0 0'
                                },
/*
                                {
                                    xtype: 'button',
                                    text: '...',
                                    width: 30,
                                    hidden:true,
                                    margin: '0 10 0 0',
                                    handler: 'onSelectCdbmView'
                                },
*/

                                {
                                    name: 'cpmc',
                                    fieldLabel: '商品名称',
                                    bind: '{cpmc}',
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 10 0 0'
                                },
                                /*
                                {
                                    xtype: 'button',
                                    text: '...',
                                    margin: '0 10 0 0',
                                    width: 30,
                                    hidden:true,
                                    handler: 'onSelectCpbmView'
                                },*/
                                { name: 'cpid', bind: "{cpid}", hidden: true },
                                { name: 'khid', bind: "{khid}",hidden: true },
                                { name: 'bzid', bind: "{bzid}", hidden: true },
                                {
                                    name: 'bzmc',
                                    fieldLabel: '包装规格',
                                    bind: '{bzmc}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 0 0 0'
                                },
                                {
                                    xtype: 'button',
                                    text: '...',
                                    width: 30,
                                    margin: '0 5 0 0',
                                    handler: 'onSelectPackingView'
                                }

                            ]
                        },
                        {
                            fieldDefaults: {
                                labelWidth: 60,
                                frame: true
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    name: 'cpgg',
                                    fieldLabel: '商品型号',
                                    bind: "{cpgg}",
                                    width: 200,
                                    margin: '0  10 0 0',
                                    allowBlank: true
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'mints',
                                    fieldLabel: '最小天数',
                                    bind: "{mints}",
                                    width: 100,
                                    // hidden:true,
                                    hideTrigger: true,
                                    decimalPrecision: 0,
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: "numberfield",
                                    name: 'jcsl',
                                    fieldLabel: '进仓数量',
                                    bind: "{jcsl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3

                                }, {
                                    xtype: "numberfield",
                                    name: 'jczl',
                                    fieldLabel: '进仓重量',
                                    flex: 1,
                                    bind: "{jczl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: "numberfield",
                                    name: 'jcje',
                                    fieldLabel: '进仓费用',
                                    flex: 1,
                                    bind: "{jcje}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    enabled: false,
                                    decimalPrecision: 0,
                                    margin: '0 5 0 0'
                                }, {
                                    xtype: "numberfield",
                                    name: 'xjje',
                                    fieldLabel: '其中现付',
                                    flex: 1,
                                    hidden: true,
                                    bind: "{xjje}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 0,
                                    margin: '0 5 0 0'
                                },



                                {
                                    xtype: "textfield",
                                    name: 'mxdh',
                                    bind: "{mxdh}",
                                    hidden: true
                                }

                            ]
                        }
                    ]

                },
                {
                    //xtype: 'container',
                    //width: "100%",
                    margin: '0 0 0 0',
                    height: 400,
                    defaultType: 'textfield',
                    defaults: {
                        labelWidth: 40,
                        enableHdMenu: false,
                        enableColumnHide: false,
                        //  collapsible: false,
                        columnLines: true,
                        // animCollapse: false,
                        frame: true
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [

                        {
                            xtype: 'grid',
                            flex: 1,
                            border: 0,
                            reference: 'cpjkdmxcw',
                            itemId: 'cpjkdmxcw',

                            store: { type: 'CurCpjkdcwStore' },

                            plugins: ['cellediting', 'gridfilters'],
                            //      margin: '10 0 0 0',
                            tools: [
                                {
                                    xtype: "button", text: '新增行', icon: "images/add.gif",
                                    handler: 'onCpjkdmxcwAddClick'
                                },
                                {
                                    xtype: "button", text: '删除行', icon: "images/delete.gif",
                                    handler: 'onCpjkdcwDeleteClick',
                                    bind: {
                                        disabled: '{!cpjkdmxcw.selection}'
                                    }
                                }
                            ],
                            title: '仓位明细',
                            columns: [
                                {
                                    text: '仓位',
                                    dataIndex: 'cw',
                                    flex: 1, sortable: false,
                                    editor: {
                                        allowBlank: false,
                                        type: 'string'
                                    }
                                },
                                {
                                    text: '商品批号',
                                    dataIndex: 'cpph',
                                    flex: 1, sortable: false,
                                    editor: {
                                        allowBlank: true,
                                        type: 'string'
                                        ,
                                        listeners: {
                                            change: function (field, value) {
                                                var customerGrid = this.up('#cpjkdmxcw');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                if (value == "") {
                                                    selection.set('czdj', this.up('#cpjkdmxedit').getViewModel().get('czdj'));
                                                } else {
                                                    selection.set('czdj', this.up('#cpjkdmxedit').getViewModel().get('phdj'));

                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    text: '单位',
                                    dataIndex: 'dw',
                                    sortable: false,
                                    flex: 1
                                },

                                {
                                    xtype: 'numbercolumn',
                                    text: '数量',
                                    format:'0.000' ,
                                    dataIndex: 'sl', sortable: false,
                                    flex: 1,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 3,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.999,
                                        /* validator: function (value) {
                                             var rate = this.up('#cpjkdmxedit').getViewModel().get('rate');
                                             var customerGrid = this.up('#cpjkdmxcw');
                                             var selection = customerGrid.getSelectionModel().getSelection()[0];
                                             selection.set('zl', value * rate);
                                             var store = customerGrid.getStore();
                                             sumjs(store, null, this.up('#cpjkdmxedit').getViewModel());
 
                                             //  var sl = store.sum('sl');
                                             //  var zl = store.sum('zl');
                                             //  this.up('#cpjkdmxedit').getViewModel().set('jcsl', sl);
                                             //  this.up('#cpjkdmxedit').getViewModel().set('jczl', zl);
                                             // return true;
                                         },*/
                                        listeners: {
                                            change: function (field, value) {
                                                var rate = this.up('#cpjkdmxedit').getViewModel().get('rate');
                                                var customerGrid = this.up('#cpjkdmxcw');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                selection.set('sl', value);
                                                selection.set('zl', parseFloat(value * rate).toFixed(3));
                                                var store = customerGrid.getStore();
                                                return sumjs(store, null, this.up('#cpjkdmxedit').getViewModel());
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '重量',
                                    format:'0.000' ,
                                    dataIndex: 'zl', sortable: false,
                                    flex: 1,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 3,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.999,
                                        /*
                                                                                validator: function (value) {
                                                                                    var customerGrid = this.up('#cpjkdmxcw');
                                                                                    var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                                                    var store = customerGrid.getStore();
                                                                                    var zl = store.sum('zl');
                                                                                    console.log(zl);
                                                                                    this.up('#cpjkdmxedit').getViewModel().set('jczl', zl);
                                        
                                                                                },*/
                                        listeners: {
                                            change: function (field, value) {
                                                var customerGrid = this.up('#cpjkdmxcw');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                selection.set('zl', value);
                                                var store = customerGrid.getStore();


                                                return sumjs(store, null, this.up('#cpjkdmxedit').getViewModel());
                                                //var zl = store.sum('zl');
                                                //console.log(zl);
                                                //this.up('#cpjkdmxedit').getViewModel().set('jczl', zl);

                                            }
                                        }
                                    }

                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '仓租单价',
                                    flex: 1,
                                    format:'0.00' ,
                                    hidden: true,
                                    dataIndex: 'czdj', sortable: false,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 2,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 99999.99
                                    }
                                },
                                {
                                    text: '仓位说明',
                                    flex: 1,
                                    dataIndex: 'sm', sortable: false,
                                    editor: {
                                        allowBlank: true,
                                        type: 'string'
                                    }
                                }/*,
                                {
                                    xtype: 'widgetcolumn',
                                    width: 70,
                                    widget: {
                                        xtype: 'button',
                                        text: '删除',
                                        handler: 'onRemoveCpjkdcwClick'
                                    }
                                }*/
                            ]
                        },

                        {
                            xtype: 'grid',
                            flex: 1, border: 0,
                            reference: 'cpjkdmxje',
                            itemId: 'cpjkdmxje',

                            plugins: ['cellediting', 'gridfilters'],
                            store: { type: 'CurCpjkdjeStore' },
                            margin: '5 0 0 0',
                            title: '作业费用明细',
                            tools: [
                                {
                                    xtype: "button", text: '新增行', icon: "images/add.gif",
                                    handler: 'onCpjkdjeAddClick'
                                },
                                {
                                    xtype: "button", text: '删除行', icon: "images/delete.gif",
                                    handler: 'onCpjkdjeDeleteClick',
                                    bind: {
                                        disabled: '{!cpjkdmxje.selection}'
                                    }
                                }
                            ],
                            columns: [
                                {
                                    text: '收费项目',
                                    dataIndex: 'work', sortable: false,
                                    flex: 1
                                },
                                {
                                    text: '单位',
                                    dataIndex: 'dw',
                                    sortable: false,
                                    width: 50
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '数量',
                                    format:'0.000' ,
                                    dataIndex: 'sl', sortable: false,
                                    flex: 1,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 3,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.999,
                                        listeners: {
                                            change: function (field, value) {

                                                var customerGrid = this.up('#cpjkdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var dj = selection.get('dj');
                                                selection.set('je', Math.ceil(value * dj));

                                                var store = customerGrid.getStore();
                                                sumjs(null, store, this.up('#cpjkdmxedit').getViewModel());

                                                //var je = store.sum('je');
                                                //this.up('#cpjkdmxedit').getViewModel().set('jcje', je);
                                                //controller.sumjs();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '单价',
                                    format:'0.00' ,
                                    dataIndex: 'dj', sortable: false,
                                    flex: 1,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 2,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.99,
                                        listeners: {
                                            change: function (field, value) {
                                                var customerGrid = this.up('#cpjkdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var sl = selection.get('sl');
                                                selection.set('je', Math.ceil(value * sl));
                                                var store = customerGrid.getStore();
                                                sumjs(null, store, this.up('#cpjkdmxedit').getViewModel());



                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '金额',
                                    format:'0,000' ,
                                    dataIndex: 'je',
                                    sortable: false,
                                    flex: 1,
                                    decimalPrecision: 0
                                },


                                {
                                    xtype: 'checkcolumn',

                                    width: 60,
                                    height: 22,
                                    text: '现付',
                                    hidden: true,

                                    sortable: false,
                                    dataIndex: 'xjbz',
                                    listeners: {
                                        checkChange: function () {
                                            var customerGrid = this.up('#cpjkdmxje');
                                            var store = customerGrid.getStore();
                                            sumjs(null, store, this.up('#cpjkdmxedit').getViewModel());

                                        }
                                    }

                                },
                                {
                                    text: '机械',
                                    //width: 100,
                                    flex: 1,
                                    dataIndex: 'gs'
                                }
                                ,
                                {
                                    text: '搬运',
                                    sortable: false,
                                    //width: 100,
                                    flex: 1,
                                    dataIndex: 'byg'
                                }
                                ,
                                {
                                    text: '仓管',
                                    sortable: false,
                                    //width: 100,
                                    flex: 1,
                                    dataIndex: 'cg'
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    width: 50,
                                    // bind: {
                                    //     width: "{w}"
                                    // },

                                    sortable: false,
                                    widget: {
                                        xtype: 'button',
                                        text: '',
                                        // bind: {
                                        //      hidden: "{gsop}"
                                        // },
                                        handler: 'onSelectWorkerView'
                                    }
                                }
                                /*,
                                
                                {
                                    text: '作业人员',
                                    dataIndex: 'worker',
                                    width: 150
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    width: 40,
                                    widget: {
                                        xtype: 'button',
                                        text: '...',
                                        handler: 'onSelectWorkerView'
                                    }
                                }*/
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    width: "100%",
                    margin: '5 0 0 0',
                    hidden: true,
                    layout: {
                        type: 'vbox', align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'side',
                            defaultType: 'textfield',
                            fieldDefaults: {
                                labelWidth: 55,
                                flex: 1,
                                readOnly: true
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [{
                                name: 'jkdh',
                                fieldLabel: 'jkdh',
                                bind: '{jkdh}'

                            }, {
                                name: 'czdj',
                                fieldLabel: 'czdj',
                                bind: '{czdj}'

                            },
                            {
                                name: 'phdj',
                                fieldLabel: 'Phdj',
                                bind: '{phdj}'
                            },

                            {
                                name: 'bydj',
                                fieldLabel: 'bydj',
                                bind: '{bydj}'
                            },
                            {
                                name: 'sldw',
                                fieldLabel: 'sldw',
                                bind: '{sldw}'
                            },
                            {
                                name: 'jldw',
                                fieldLabel: 'jldw',
                                bind: '{jldw}'
                            },
                            {
                                name: 'zldw',
                                fieldLabel: 'Zldw',
                                bind: '{zldw}'
                            }, {
                                name: 'rate',
                                fieldLabel: 'rate',
                                bind: '{rate}'
                            },
                            {
                                name: 'zljs',
                                fieldLabel: 'zljs',
                                bind: '{zljs}'
                            }
                            ]
                        }

                    ]

                }
            ]
        }],
    buttons: [
        /*{
            text: 'show',
            // itemId:'Send',
            handler: 'onSelectCpbmView'
        },*/
        {
            text: '删除此入库记录',
            handler: 'onCpjkdmxDeleteClick',
            icon: "images/delete.gif",
            bind: {
                disabled: "{newrecord}"
            }
        },
        "->",
        {
            text: '确认',
            // itemId:'Send',
            icon: "images/right.gif",
            handler: 'onCpjkdmxFormSubmit'
        },/* {
            text: '删除',
            reference: 'btnDeleteButton',
            bind: {
                hidden: '{hidden}'
            },
            handler: 'onFormDelete'
        },*/ {
            text: '放弃',
            icon: "images/close.gif",
            // handler: 'onFormCancel'
            handler: function () {
                this.up("#cpjkdmxedit").close();
                // this.lookupReference('popupcpjkWindow').setDisabled(true);                   
            }
        }
    ]
});