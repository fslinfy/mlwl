var mkhsl = 0;
var mkhzl = 0;

Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdmxEdit', {
    extend: 'Ext.window.Window',
    xtype: 'gfdformmxwindow',
    reference: 'popupgfdmxWindow',
    bind: {
        title: '{title}'
    },
    requires: [
        'MyApp.view.main.tree.QueryArea'
    ],

    itemId: "cpgfdmxedit",
    width: "90%",
    height: 500,
    minWidth: 600,
    minHeight: 400,
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
                                    name: 'cdmc',
                                    fieldLabel: '产地名称',
                                    bind: '{cdmc}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 0 0 0'
                                },
                                {
                                    name: 'xmmc',
                                    fieldLabel: '商品名称',
                                    bind: '{xmmc}',
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 0 0 0'
                                },
                                {
                                    name: 'bzmc',
                                    fieldLabel: '包装',
                                    bind: '{bzmc}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 0 0 0'
                                }/*,
                                {
                                    name: 'cpgg',
                                    fieldLabel: '规格型号',
                                    bind: '{cpgg}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 0 0 0'
                                }*/
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
                               /* {
                                    name: 'cpph',
                                    fieldLabel: '批号',
                                    bind: "{cpph}",
                                    width: 200,
                                    readOnly: true,
                                    margin: '0 10 0 0'

                                },*/
                                {
                                    xtype: "numberfield",
                                    name: 'khsl',
                                    fieldLabel: '通知数量',
                                    bind: "{khsl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3

                                }, {
                                    xtype: "numberfield",
                                    name: 'khzl',
                                    fieldLabel: '通知重量',
                                    flex: 1,
                                    bind: "{khzl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'sl',
                                    bind: "{sl}",
                                    itemId: 'cksl',
                                    reference: "cksl",
                                    fieldLabel: '过车数',


                                    format: '0.000',
                                    hideTrigger: true,
                                    // readOnly: true,
                                    //flex: 1,

                                    width: 160,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3,
                                    validator: function (value) {
                                        var panel = this.up('#cpgfdmxedit').getViewModel();
                                        var sl = panel.get('khsl');
                                        var zl = panel.get('khzl');
                                        // //console.log(sl,zl);
                                        if (value < sl) {
                                            panel.set('zl',Math.round(1000* value * zl / sl)/1000);

                                        } else {
                                            if (value == sl) {
                                                panel.set('zl', zl);
                                            } else {

                                                //value=sl;
                                                panel.set('sl', sl);
                                                panel.set('zl', zl);
                                                return false
                                            }
                                        }
                                        return true;
                                    }
                                }, {
                                    xtype: "numberfield",
                                    name: 'zl',
                                    itemId: 'ckzl',
                                    reference: "ckzl",
                                    bind: "{zl}",

                                    fieldLabel: '过车重量',
                                    format: '0.000',
                                    width: 160,

                                    //bind: {
                                    // readOnly: '{cpgfdmxje.selection}'
                                    //},

                                    hideTrigger: true,
                                    // readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0',
                                    validator: function (value) {
                                        var panel = this.up('#cpgfdmxedit').getViewModel();
                                        var zl = panel.get('khzl');
                                        if (value > zl) {
                                            panel.set('zl', zl);
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'je',
                                    fieldLabel: '过车费用',
                                    flex: 1,
                                    bind: "{je}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    enabled: false,
                                    decimalPrecision: 2,
                                    margin: '0 5 0 0'
                                }, {
                                    xtype: "numberfield",
                                    name: 'xjje',
                                    fieldLabel: '其中现付',
                                    flex: 1,
                                    bind: "{xjje}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 2,
                                    margin: '0 5 0 0'
                                },
                                {
                                    xtype: "textfield",
                                    name: 'mxid',
                                    bind: "{mxid}",
                                    hidden: true
                                },
                                { xtype: "QueryArea" }
                            ]
                        }
                    ]

                },
                {
                    //xtype: 'container',
                    //width: "100%",
                    margin: '0 0 0 0',
                    height: 300,
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
                            flex: 1,
                            border: 1,
                            reference: 'cpgfdmxje',
                            itemId: 'cpgfdmxje',
                            columnLines: true,
                            enableColumnHide: false,
                            plugins: ['cellediting', 'gridfilters'],
                            store: { type: 'CurCpgfdjeStore' },
                            margin: '5 0 0 0',
                            title: '作业费用明细',
                            tools: [
                                {
                                    xtype: "button", text: '新增行', icon: "images/add.gif",
                                    handler: 'onCpgfdjeAddClick'
                                },
                                {
                                    xtype: "button", text: '删除行', icon: "images/delete.gif",
                                    handler: 'onCpgfdjeDeleteClick',
                                    bind: {
                                        disabled: '{!cpgfdmxje.selection}'
                                    }
                                }
                            ],
                            columns: [
                              /*  {
                                    text: '区',
                                    dataIndex: 'area',
                                    sortable: false,
                                    
                                    width: 80
                                },*/
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
                                    width: 50
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

                                                var customerGrid = this.up('#cpgfdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var dj = selection.get('dj');
                                                selection.set('je', Math.ceil(value * dj));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cpgfdmxje').up('#cpgfdmxedit').getViewModel());

                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '单价',
                                    dataIndex: 'dj',
                                    sortable: false,
                                    flex: 1,
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
                                                var customerGrid = this.up('#cpgfdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var sl = selection.get('sl');
                                                selection.set('je', Math.ceil(value * sl));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cpgfdmxedit').getViewModel());

                                                //var je = store.sum('je');
                                                //this.up('#cpgfdmxedit').getViewModel().set('je', je);


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
                                    renderer: jerenderer,
                                    decimalPrecision: 0
                                },
                                {
                                    xtype: 'checkcolumn',

                                    width: 60,
                                    text: '现付',
                                    sortable: false,
                                    dataIndex: 'xjbz',
                                    // renderer: jerenderer,
                                    listeners: {
                                        checkChange: function () {
                                            var customerGrid = this.up('#cpgfdmxje');
                                            var store = customerGrid.getStore();
                                            that.sumjs(null, store, this.up('#cpgfdmxedit').getViewModel());

                                        }
                                    }

                                }
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
                            items: [
                                { name: 'gfdh', bind: '{gfdh}' },
                                { name: 'bzid', bind: '{bzid}' },
                                { name: 'czdj', bind: '{czdj}' },
                                { name: 'phdj', bind: '{phdj}' },
                                { name: 'bydj', bind: '{bydj}' },
                                { name: 'sldw', bind: '{sldw}' },
                                { name: 'jldw', bind: '{jldw}' },
                                { name: 'zldw', bind: '{zldw}' },
                                { name: 'rate', bind: '{rate}' },
                                { name: 'xjbz', bind: '{xjbz}' },
                                { name: 'zljs', bind: '{zljs}' }
                            ]
                        }

                    ]

                }
            ]
        }],
    buttons: [
        "->",
        {
            text: '确认',
            icon: "images/right.gif",
            handler: 'onCpgfdmxFormSubmit'
        }, {
            text: '放弃',
            icon: "images/close.gif",
            handler: function () {
                this.up("#cpgfdmxedit").close();
            }
        }
    ]
});