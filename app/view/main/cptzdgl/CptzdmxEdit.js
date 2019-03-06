
Ext.define('MyApp.view.main.cptzdgl.CptzdmxEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formcptzdeditwindow',
    reference: 'popupcptzdwindow',
    bind: {
        title: '{title}'
    },
    title: '商品调账单',
    itemId: "cptzdmxedit",
    width: "90%",
    height: 650,
    minWidth: 600,
    minHeight: 500,
    layout: 'fit',
    maximizable: true,
    closeAction: 'destroy',
    bodyPadding: 10,
    modal: true,
    frame: true,
    items: [
        {
            xtype: 'form',
            reference: 'windowFormmx',
            itemId: 'windowFormmx',
            layout: {
                type: 'vbox', align: 'stretch'
            },
            autoScroll: true,
            border: false,
            items: [
                {
                    height: 86,
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
                                {
                                    xtype: 'numberfield',
                                    name: 'khid',
                                    fieldLabel: 'id',
                                    hidden: true,
                                    bind: "{khid}"
                                },
                                {
                                    name: 'khmc',
                                    fieldLabel: '客户名称',
                                    flex: 3,
                                    readOnly: true,
                                    bind: "{khmc}",
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'numberfield',
                                    name: 'ckid',
                                    fieldLabel: 'id',
                                    hidden: true,
                                    bind: "{ckid}"
                                },
                                {
                                    name: 'ckmc',
                                    fieldLabel: '调账仓库',
                                    flex: 3,
                                    readOnly: true,
                                    bind: "{ckmc}",
                                    margin: '0 10 0 0'
                                },
                                {
                                    name: 'tzdh',
                                    fieldLabel: '调账单号',
                                    //width: 200,
                                    flex: 2,
                                    readOnly: true,
                                    bind: "{tzdh}"
                                },
                                {
                                    xtype: 'datefield',
                                    //width: 240,
                                    name: 'tzrq',
                                    flex: 2,


                                    bind: "{tzrq}",
                                    format: 'Y-m-d',
                                    fieldLabel: '调账日期',
                                    allowBlank: false
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
                                    xtype: 'numberfield',
                                    name: 'newkhid',
                                    fieldLabel: 'id',
                                    hidden: true,
                                    bind: "{newkhid}"
                                },
                                {
                                    name: 'newkhmc',
                                    fieldLabel: '调入客户',
                                    flex: 2,
                                    readOnly: true,
                                    bind: "{newkhmc}",
                                    margin: '0 0 0 0'
                                },
                                {
                                    xtype: 'button',
                                    text: '...',
                                    width: 30,
                                    margin: '0 10 0 0',
                                    handler: 'onSelectNewKhbmView'
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'tzsl',
                                    fieldLabel: '调账数量',
                                    bind: "{tzsl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3

                                }, {
                                    xtype: "numberfield",
                                    name: 'tzzl',
                                    fieldLabel: '调账重量',
                                    flex: 1,
                                    bind: "{tzzl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0'
                                }, {
                                    xtype: "numberfield",
                                    name: 'tzje',
                                    fieldLabel: '调账费用',
                                    flex: 1,
                                    bind: "{tzje}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    enabled: false,
                                    decimalPrecision: 2,
                                    margin: '0 5 0 0'
                                },

                                {
                                    xtype: 'checkbox',
                                    fieldLabel: '调入客户付费',
                                    name: 'jekh',
                                    border: 1,

                                    labelWidth: 90,
                                    flex: 1,
                                    margin: '0 5 0 10',
                                    bind: "{jekh}"
                                }
                                /*{
                                    xtype: "numberfield",
                                    name: 'xjje',
                                    fieldLabel: '其中现付',
                                    flex: 1,
                                    bind: "{xjje}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 2,
                                    margin: '0 5 0 0'
                                }*/

                            ]
                        }
                    ]

                },
                {
                    margin: '0 0 0 0',
                    // height: 400,
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
                            xtype: 'grid',
                            //flex: 1,
                            border: 1,
                            height: 220,
                            reference: 'cptzdmxGrid',
                            itemId: 'cptzdmxGrid',
                            columnLines: true,
                            enableColumnHide: false,
                            store: { type: 'CurCptzdmxStore' },

                            plugins: ['cellediting'],
                            //title: '明细仓位出仓',
                            columns: [

                                {
                                    text: '商品名称',
                                    dataIndex: 'cpmc',
                                    locked: true, sortable: false,
                                    width: 180
                                },
                                {
                                    text: '产地名称',
                                    dataIndex: 'cdmc', sortable: false,
                                    width: 100
                                }
                                ,
                                {
                                    text: '包装',
                                    dataIndex: 'bzmc', sortable: false,
                                    width: 170
                                },
                                {
                                    text: '规格型号',
                                    dataIndex: 'cpgg', sortable: false,
                                    width: 80
                                },
                                {
                                    text: '单位',
                                    dataIndex: 'jldw', sortable: false,
                                    width: 60
                                },
                                /* {
                                     xtype: 'numbercolumn', sortable: false,
                                     text: '仓租单价',
                                     width: 80,
                                     hidden:true,
                                     dataIndex: 'czdj',
                                     //   renderer: jerenderer
                                 },*/
                                {
                                    xtype: 'datecolumn',
                                    text: '进库日期',
                                    width: 90, sortable: false,
                                    format: 'Y-m-d',
                                    dataIndex: 'czrq'
                                },
                                {
                                    text: '区', sortable: false,
                                    hidden: ((sys_location_areas < 2) || (sys_location_id == 0)),
                                    dataIndex: 'area',
                                    width: 60
                                },
                                {
                                    text: '仓位', sortable: false,
                                    dataIndex: 'cw',
                                    width: 60
                                },
                                {
                                    text: '商品批号',
                                    dataIndex: 'cpph', sortable: false,
                                    width: 100
                                },
                                {
                                    text: '仓位说明',
                                    sortable: false,
                                    dataIndex: 'sm',
                                    width: 100
                                },
                                /*{
                                    xtype: 'numbercolumn',
                                    text: '库存数量',
                                    dataIndex: 'kcsl',
                                    width: 100
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '库存重量',
                                    dataIndex: 'kczl',
                                    width: 100
                                },*/
                                {
                                    text: '调入内容',
                                    //    flex: 4,
                                    columns: [

                                        {
                                            xtype: 'numbercolumn',
                                            text: '调账数量',
                                            sortable: false,
                                            dataIndex: 'tzsl',
                                            width: 100,
                                            format: '0.000',
                                            // renderer: zlrenderer,
                                            editor: {
                                                type: 'numberfield',
                                                decimalPrecision: 3,
                                                align: 'right',
                                                allowBlank: true,
                                                minValue: 0,
                                                maxValue: 999999.999,
                                                validator: function (value) {
                                                    var customerGrid = this.up('#cptzdmxGrid');
                                                    var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                    var store = customerGrid.getStore();
                                                    var panel = this.up('#cptzdmxedit').getViewModel();
                                                    var sl = selection.get('kcsl');
                                                    var zl = selection.get('kczl');
                                                    if (value > sl) {
                                                        selection.set('tzsl', sl);
                                                        selection.set('tzzl', zl);
                                                    }
                                                    return that.sumjs(store, null, this.up('#cptzdmxedit').getViewModel());
                                                },
                                                listeners: {
                                                    change: function (field, value) {

                                                        var customerGrid = this.up('#cptzdmxGrid');
                                                        var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                        var panel = this.up('#cptzdmxedit').getViewModel();
                                                        var store = customerGrid.getStore();

                                                        var sl = selection.get('kcsl');
                                                        var zl = selection.get('kczl');

                                                        // console.log(value, sl, zl, selection);
                                                        // if (value == sl) {
                                                        //    selection.set('tczl', zl);
                                                        //  return true;
                                                        //}
                                                        var rate = 0;
                                                        if (sl != 0) {
                                                            rate = zl / sl;
                                                        }

                                                        if ((sl > 0) && (value > sl)) {
                                                            Ext.MessageBox.alert('注意！', '最大调账数量为：' + sl);
                                                            value = sl;
                                                        }
                                                        if ((sl < 0) && (value < sl)) {
                                                            value = sl
                                                        }
                                                        // console.log(value, sl, zl, value * rate);
                                                        selection.set('tzsl', value);
                                                        selection.set('tzzl',Math.round(1000* value * rate)/1000);
                                                        return that.sumjs(store, null, panel);

                                                        // return true;

                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            text: '调账重量', sortable: false,
                                            dataIndex: 'tzzl',
                                            width: 100,
                                            format: '0.000',
                                            // renderer: zlrenderer,
                                            editor: {
                                                type: 'numberfield',
                                                decimalPrecision: 3,
                                                align: 'right',
                                                allowBlank: true,
                                                minValue: 0,
                                                maxValue: 999999.999,
                                                validator: function (value) {
                                                    var customerGrid = this.up('#cptzdmxGrid');
                                                    var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                    var store = customerGrid.getStore();
                                                    var panel = this.up('#cptzdmxedit').getViewModel();
                                                    var zl = selection.get('kczl');
                                                    if (value > zl) {
                                                        value = zl;
                                                        selection.set('tzzl', zl);
                                                    }
                                                    var sumzl = 0;
                                                    return that.sumjs(store, null, this.up('#cptzdmxedit').getViewModel());
                                                },

                                                listeners: {
                                                    change: function (field, value) {
                                                        var customerGrid = this.up('#cptzdmxGrid');
                                                        var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                        var panel = this.up('#cptzdmxedit').getViewModel();
                                                        var store = customerGrid.getStore();
                                                        var sl = selection.get('kcsl');
                                                        var zl = selection.get('kczl');

                                                        if ((sl > 0) && (value > zl)) {
                                                            Ext.MessageBox.alert('注意！', '最大调账重量为：' + zl);
                                                            value = zl
                                                        }
                                                        selection.set('tzzl', value);
                                                        return that.sumjs(store, null, panel);
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            text: '仓位',
                                            dataIndex: 'newcw',
                                            width: 60, sortable: false,
                                            editor: {
                                                type: 'textfield',
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            text: '批号',
                                            dataIndex: 'newcpph',
                                            width: 80, sortable: false,
                                            editor: {
                                                type: 'textfield',
                                                allowBlank: true
                                            }
                                        },
                                        /* {
                                             xtype: 'numbercolumn',
                                             text: '仓租单价',
                                             dataIndex: 'czdj', sortable: false,
                                             width: 80,
                                             hidden:true,
                                             editor: {
                                                 type: 'numberfield',
                                                 decimalPrecision: 2,
                                                 align: 'right',
                                                 allowBlank: true,
                                                 minValue: 0,
                                                 maxValue: 999999.99
                                             }
                                         },*/
                                        {
                                            xtype: 'datecolumn',
                                            text: '调入日期', sortable: false,
                                            dataIndex: 'newczrq',
                                            width: 90,
                                            //formatter: 'date("Y-m-d")',
                                            format: 'Y-m-d',
                                            editor: {
                                                xtype: 'datefield',
                                                format: 'y-m-d',
                                                disabledDays: [0, 6],
                                                disabledDaysText: 'Plants are not available on the weekends'
                                            }
                                        },
                                        {
                                            text: '说明', sortable: false,
                                            dataIndex: 'newsm',
                                            width: 100,
                                            editor: {
                                                type: 'textfield',
                                                allowBlank: true
                                            }
                                        }

                                    ]
                                }


                            ]
                        },

                        {
                            xtype: 'grid',
                            height: 160, border: 1,
                            reference: 'cptzdmxje',
                            itemId: 'cptzdmxje',
                            columnLines: true,
                            enableColumnHide: false,
                            plugins: ['cellediting'],
                            store: { type: 'CurCptzdjeStore' },
                            margin: '5 0 0 0',
                            title: '作业费用明细',
                            tools: [
                                {
                                    xtype: "button", text: '新增行', icon: "images/add.gif",
                                    itemId: 'btnCptzdjeAddClick'
                                },
                                {
                                    xtype: "button", text: '删除行', icon: "images/delete.gif",
                                    itemId: 'btnCptzdjeDeleteClick',
                                    bind: {
                                        disabled: '{!cptzdmxje.selection}'
                                    }
                                }
                            ],
                            columns: [
                                {
                                    text: '收费项目',
                                    dataIndex: 'work',
                                    sortable: false,
                                    flex: 1
                                },
                                {
                                    text: '单位',
                                    dataIndex: 'dw',
                                    sortable: false,
                                    width: 50,
                                    editor: {
                                        type: 'textfield',
                                        allowBlank: true
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '数量',
                                    dataIndex: 'sl',
                                    sortable: false,
                                    renderer: zlrenderer,
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

                                                var customerGrid = this.up('#cptzdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var dj = selection.get('dj');
                                                selection.set('je', Math.ceil(value * dj));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cptzdmxje').up('#cptzdmxedit').getViewModel());

                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '单价',
                                    dataIndex: 'dj',
                                    flex: 1,
                                    sortable: false,
                                    renderer: jerenderer,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 2,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.99,
                                        listeners: {
                                            change: function (field, value) {
                                                var customerGrid = this.up('#cptzdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var sl = selection.get('sl');
                                                selection.set('je', Math.ceil(value * sl));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cptzdmxedit').getViewModel());
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '金额',
                                    dataIndex: 'je',
                                    sortable: false,
                                    flex: 1,
                                    decimalPrecision: 0
                                },
                                {
                                    xtype: 'checkcolumn',
                                    width: 60,
                                    text: '现付',
                                    sortable: false,
                                    dataIndex: 'xjbz',
                                    listeners: {
                                        checkChange: function () {
                                            var customerGrid = this.up('#cptzdmxje');
                                            var store = customerGrid.getStore();
                                            that.sumjs(null, store, this.up('#cptzdmxedit').getViewModel());

                                        }
                                    }

                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'fieldcontainer',
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
                                fieldLabel: '审核员',
                                bind: "{shr}"
                            }, {
                                name: 'cwr',
                                fieldLabel: '财务出纳',
                                bind: "{cwr}"
                            }, {
                                name: 'cgy',
                                fieldLabel: '仓库管理',
                                bind: "{cgy}",
                                margin: '3 0 0 0'
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
                                flex: 1,
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

                }

            ]
        }],
    buttons: [
        "->",
        {
            text: '保存',
            icon: "images/right.gif",
            itemId: 'btnCptzdmxFormSubmit'

        }, {
            text: '放弃',
            icon: "images/close.gif",
            handler: function () {

                this.up("window").close();

            }
        }
    ]
});