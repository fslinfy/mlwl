var mmccsl = 0;
var mmcczl = 0;

Ext.define('MyApp.view.main.cpckgl.CpckdmxEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formmxwindow',
    reference: 'popupmxWindow',
    bind: {
        title: '{title}'
    },
    itemId: "cpckdmxedit",
    width: "90%",
    height: 600,
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
                                    name: 'cpmc',
                                    fieldLabel: '商品名称',
                                    bind: '{cpmc}',
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
                                },
                                {
                                    name: 'cpgg',
                                    fieldLabel: '规格型号',
                                    bind: '{cpgg}',
                                    flex: 1,
                                    readOnly: true,
                                    margin: '0 0 0 0'
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
                                    name: 'cpph',
                                    fieldLabel: '批号',
                                    bind: "{cpph}",
                                    width: 200,
                                    readOnly: true,
                                    margin: '0 10 0 0'

                                },
                                {
                                    xtype: "numberfield",
                                    name: 'mccsl',
                                    fieldLabel: '未出仓数',
                                    bind: "{mccsl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3

                                }, {
                                    xtype: "numberfield",
                                    name: 'mcczl',
                                    fieldLabel: '未出仓量',
                                    flex: 1,
                                    bind: "{mcczl}",
                                    hideTrigger: true,
                                    readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'ccsl',
                                    bind: "{ccsl}",
                                    itemId: 'ckccsl',
                                    reference: "ckccsl",
                                    fieldLabel: '出仓数',


                                    format: '0.000',
                                    hideTrigger: true,
                                    // readOnly: true,
                                    //flex: 1,

                                    width: 160,
                                    margin: '0 10 0 0',
                                    decimalPrecision: 3,
                                    validator: function (value) {
                                        var panel = this.up('#cpckdmxedit').getViewModel();
                                        var sl = panel.get('mccsl');
                                        var zl = panel.get('mcczl');
                                        // console.log(sl,zl);
                                        if (value < sl) {
                                            panel.set('cczl',Math.round(1000* value * zl / sl)/1000);

                                        } else {
                                            if (value == sl) {
                                                panel.set('cczl', zl);
                                            } else {

                                                //value=sl;
                                                panel.set('ccsl', sl);
                                                panel.set('cczl', zl);
                                                return false
                                            }
                                        }
                                        return true;
                                    }
                                }, {
                                    xtype: "numberfield",
                                    name: 'cczl',
                                    itemId: 'ckcczl',
                                    reference: "ckcczl",
                                    bind: "{cczl}",

                                    fieldLabel: '出仓重量',
                                    format: '0.000',
                                    width: 160,

                                    //bind: {
                                    // readOnly: '{cpckdmxje.selection}'
                                    //},

                                    hideTrigger: true,
                                    // readOnly: true,
                                    decimalPrecision: 3,
                                    margin: '0 10 0 0',
                                    validator: function (value) {
                                        var panel = this.up('#cpckdmxedit').getViewModel();
                                        var zl = panel.get('mcczl');
                                        if (value > zl) {
                                            panel.set('cczl', zl);
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'ccje',
                                    fieldLabel: '出仓费用',
                                    flex: 1,
                                    bind: "{ccje}",
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
                            height: 230,
                            border: 1,
                            //hidden: false,
                            reference: 'cpckdmxcw',
                            itemId: 'cpckdmxcw',
                            columnLines: true,
                            enableColumnHide: false,
                            store: { type: 'CurCpckdcwStore' },

                            plugins: ['cellediting', 'gridfilters'],
                            title: '明细仓位出仓',
                            listeners: {
                                celldblclick: function (grid, row) {
                                    // if ((row.cellIndex == 8) || (row.cellIndex == 9)) return;
                                    var store = grid.getStore();
                                    var p = this.up('#cpckdmxedit').getViewModel();
                                    var sl = p.get('mccsl');
                                    var zl = p.get('mcczl');
                                    mmccsl = store.sum('ccsl');
                                    mmcczl = store.sum('cczl');

                                    /* if (p.get('mccsl')>=p.get('ccsl'))
                                        {
                                         mmccsl=p.get('ccsl');
                                         mmcczl=p.get('cczl');

                                        }
                                        */

                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    var cwsl = selection.get('sl');
                                    var cwzl = selection.get('zl');
                                    //console.log('mccsl,mcczl,ccsl,cczl',sl,zl,selection.get('ccsl'),selection.get('cczl'));  
                                    //console.log('cwsl,cwzl',cwsl,cwzl);  
                                    mmccsl = mmccsl - selection.get('ccsl');
                                    mmcczl = mmcczl - selection.get('cczl');

                                    //   console.log('cwsl,cwzl,mmccsl,mmcczl,sl,zl',cwsl,cwzl,mmccsl,mmcczl,sl,zl,selection.get('ccsl'));
                                    if ((sl - mmccsl < cwsl) || (sl - mmccsl == cwsl)) {
                                        selection.set('ccsl', sl - mmccsl);
                                        selection.set('cczl', zl - mmcczl);
                                    }
                                    else {
                                        selection.set('ccsl', cwsl);
                                        selection.set('cczl', cwzl);
                                    }

                                    mmccsl = store.sum('ccsl');
                                    mmcczl = store.sum('cczl');
                                    p.set('ccsl', mmccsl);
                                    p.set('cczl', mmcczl);
                                }

                            },
                            columns: [
                                {
                                    text: '区',
                                    dataIndex: 'area',
                                    sortable: false,
                                    width: 80,
                                    editor: {
                                        type: 'textfield',
                                        
                                        
                                        allowBlank: true
                                    }
                                },
                                {
                                    text: '仓位',
                                    dataIndex: 'cw',
                                    sortable: false,
                                    flex: 1
                                },
                                {
                                    text: '商品批号',
                                    sortable: false,
                                    dataIndex: 'cpph',
                                    flex: 1
                                },
                                {
                                    text: '单位',
                                    sortable: false,
                                    dataIndex: 'dw',
                                    width: 50
                                },
                                {
                                    text: 'mints',
                                    sortable: false,
                                    hidden: true,
                                    dataIndex: 'mints',
                                    width: 50
                                },
                                {
                                    xtype: 'datecolumn',
                                    text: '入库日期',
                                    width: 120,
                                    formatter: 'date("Y-m-d")',
                                    sortable: false,

                                    dataIndex: 'czrq'
                                },

                                {
                                    text: '仓位说明',
                                    flex: 1,
                                    sortable: false,
                                    dataIndex: 'sm'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '库存数量',
                                    dataIndex: 'sl',
                                    sortable: false,
                                    width: 80,
                                    renderer: zlrenderer
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '库存重量',
                                    dataIndex: 'zl',
                                    sortable: false,
                                    flex: 1,
                                    renderer: zlrenderer
                                },

                                {
                                    xtype: 'numbercolumn',
                                    text: '出仓数量',
                                    dataIndex: 'ccsl',
                                    flex: 1,
                                     format:'0.000' ,
                                    sortable: false,
                                    renderer: zlrenderer,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 3,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.999,
                                        validator: function (value) {

                                            var customerGrid = this.up('#cpckdmxcw');
                                            var selection = customerGrid.getSelectionModel().getSelection()[0];
                                            var store = customerGrid.getStore();
                                            var panel = this.up('#cpckdmxedit').getViewModel();

                                            var sl = selection.get('sl');
                                            var zl = selection.get('zl');
                                            if (value > sl) {
                                                selection.set('ccsl', sl);
                                                selection.set('cczl', zl);
                                            }
                                            if (value == sl) {

                                                selection.set('cczl', zl);
                                            }
                                            var sumsl = store.sum('ccsl');

                                            var mccsl = panel.get('ccsl');

                                            if ((sumsl > 0) && (sumsl > mccsl)) {
                                                Ext.MessageBox.alert('注意！', '发货数量合计不能大于：' + mccsl);
                                                selection.set('ccsl', 0);
                                                selection.set('cczl', 0);
                                                return false;
                                            }

                                            return that.sumjs(store, null, this.up('#cpckdmxedit').getViewModel());
                                        },
                                        listeners: {
                                            dblclick: function (field, value) {
                                                console.log("dblclick")
                                            },

                                            change: function (field, value) {

                                                var customerGrid = this.up('#cpckdmxcw');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var panel = this.up('#cpckdmxedit').getViewModel();
                                                var store = customerGrid.getStore();

                                                var sl = selection.get('sl');
                                                var zl = selection.get('zl');
                                                if (value == sl) {
                                                    //console.log(value,sl)
                                                    selection.set('ccsl', value);
                                                    selection.set('cczl', zl);
                                                    return true;
                                                }

                                                var rate = 0;
                                                if (sl != 0) {
                                                    rate = zl / sl;
                                                }

                                                if ((sl > 0) && (value > sl)) {
                                                    // console.log(value,sl)
                                                    Ext.MessageBox.alert('注意！', '最大可发货数量为：' + sl);
                                                    value = sl;
                                                }
                                                if ((sl < 0) && (value < sl)) {
                                                    value = sl
                                                }
                                                selection.set('ccsl', value);
                                                // console.log(value,selection.get('ccsl'))

                                                selection.set('cczl',Math.round(1000* value * rate)/1000);
                                                 that.sumjs(store, null, panel);
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'numbercolumn',
                                    text: '出仓重量',
                                    dataIndex: 'cczl',
                                    sortable: false,
                                     format:'0.000' ,
                                    renderer: zlrenderer,
                                    flex: 1,
                                    editor: {
                                        type: 'numberfield',
                                        decimalPrecision: 3,
                                        align: 'right',
                                        allowBlank: true,
                                        minValue: 0,
                                        maxValue: 999999.999,
                                        validator: function (value) {
                                            var customerGrid = this.up('#cpckdmxcw');
                                            var selection = customerGrid.getSelectionModel().getSelection()[0];
                                            var store = customerGrid.getStore();
                                            var panel = this.up('#cpckdmxedit').getViewModel();
                                            var zl = selection.get('zl');
                                            if (value > zl) {
                                                value = zl;
                                                selection.set('cczl', zl);
                                            }
                                            var sumzl = 0;// store.sum('cczl');
                                            var mcczl = panel.get('cczl');
                                            var cwid = selection.get('id');
                                            store.each(function (rec) {
                                                if (rec.data.id != cwid) {
                                                    sumzl = sumzl + rec.data.cczl;
                                                }
                                            })
                                            var sumzl0 = sumzl;
                                            sumzl = sumzl + parseFloat(value);
                                            // console.log(sumzl, mcczl, cwid);
                                            if ((value > 0) && (sumzl > mcczl)) {
                                                Ext.MessageBox.alert('注意！', '发货重量合计不能大于：' + mcczl);
                                                selection.set('cczl', mcczl - sumzl0);
                                                return false;
                                            }
                                            return that.sumjs(store, null, this.up('#cpckdmxedit').getViewModel());
                                        },
                                        listeners: {
                                            change: function (field, value) {
                                                var customerGrid = this.up('#cpckdmxcw');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var panel = this.up('#cpckdmxedit').getViewModel();
                                                var store = customerGrid.getStore();
                                                var sl = selection.get('sl');
                                                var zl = selection.get('zl');

                                                if ((sl > 0) && (value > zl)) {
                                                    Ext.MessageBox.alert('注意！', '最大可发货重量为：' + zl);
                                                    value = zl
                                                }
                                                selection.set('cczl', value);
                                                 return that.sumjs(store, null, panel);
                                            }
                                        }
                                    }
                                }
                            ]
                        },

                        {
                            xtype: 'grid',
                            flex: 1,
                            border: 1,
                            reference: 'cpckdmxje',
                            itemId: 'cpckdmxje',
                            columnLines: true,
                            enableColumnHide: false,
                            plugins: ['cellediting', 'gridfilters'],
                            store: { type: 'CurCpckdjeStore' },
                            margin: '5 0 0 0',
                            title: '作业费用明细',
                            tools: [
                                {
                                    xtype: "button", text: '新增行', icon: "images/add.gif",
                                    handler: 'onCpckdjeAddClick'
                                },
                                {
                                    xtype: "button", text: '删除行', icon: "images/delete.gif",
                                    handler: 'onCpckdjeDeleteClick',
                                    bind: {
                                        disabled: '{!cpckdmxje.selection}'
                                    }
                                }
                            ],
                            columns: [
                                {
                                    text: '区',
                                    dataIndex: 'area',
                                    sortable: false,
                                    
                                    width: 80
                                },
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

                                                var customerGrid = this.up('#cpckdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var dj = selection.get('dj');
                                                selection.set('je', Math.ceil(value * dj));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cpckdmxje').up('#cpckdmxedit').getViewModel());

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
                                                var customerGrid = this.up('#cpckdmxje');
                                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                                var sl = selection.get('sl');
                                                selection.set('je', Math.ceil(value * sl));
                                                var store = customerGrid.getStore();
                                                return that.sumjs(null, store, this.up('#cpckdmxedit').getViewModel());

                                                //var je = store.sum('je');
                                                //this.up('#cpckdmxedit').getViewModel().set('ccje', je);


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
                                            var customerGrid = this.up('#cpckdmxje');
                                            var store = customerGrid.getStore();
                                            that.sumjs(null, store, this.up('#cpckdmxedit').getViewModel());

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
                                { name: 'ckdh', bind: '{ckdh}' },
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
            handler: 'onCpckdmxFormSubmit'
        }, {
            text: '放弃',
            icon: "images/close.gif",
            handler: function () {
                this.up("#cpckdmxedit").close();
            }
        }
    ]
});