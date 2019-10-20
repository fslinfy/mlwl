
Ext.define('MyApp.view.main.cpghkdgl.CpghdEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formshwindow',
    requires: [
        'MyApp.view.main.tree.QueryKhmc'
    ],
    reference: 'popupCpghdWindow',
    itemId: "cpghdedit",
    bind: {
        title: '{title}'
    },
    title: '商品过户开单',
    width: 1200,
    height: 500,
    minWidth: 600,
    minHeight: 400,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 5,
    plain: true,
    maximizable: true,
    modal: true,
    viewModel: {
        data: {
            'newkhmc': '', 'newkhid': 0


        }
    },
    items: [{
        xtype: 'form',
        reference: 'windowForm',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        border: false,
        items: [
            {
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
                        },
                        items: [
                            {
                                name: 'khid',
                                fieldLabel: 'id',
                                hidden: true,
                                bind: "{khid}"
                            }, {

                                name: 'ghdh',
                                fieldLabel: 'ghdh',
                                hidden: true,
                                bind: "{ghdh}"
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
                                name: 'ckid',
                                hidden: true,
                                bind: "{ckid}"
                            },
                            {
                                name: 'ckmc',
                                fieldLabel: '过户仓库',
                                flex: 1,
                                readOnly: true,
                                bind: "{ckmc}",
                                margin: '0 10 0 0',
                                allowBlank: true
                            },

                            {
                                name: 'ghdh',
                                fieldLabel: '过户单号',
                                flex: 1,
                                allowBlank: true,
                                readOnly: true,
                                bind: "{ghdh}",
                                margin: '0 10 0 0'
                            },
                            {
                                xtype: 'datefield',
                                name: 'xsrq',
                                width: 190,
                                bind: "{xsrq}",
                                format: 'Y-m-d',
                                // readOnly: true,
                                //minValue: ((new Date()).setDate((new Date()).getDate() -3)),
                                // maxValue: (new Date()).setDate((new Date()).getDate() +3),
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
                        items: [
                            {
                                name: 'newkhid',
                                bind: "{newkhid}",
                                hidden: true,
                                margin: '0 0 0 0'
                            },
                            {
                                name: 'newkhmc',
                                fieldLabel: '收货客户',
                                flex: 2,
                                readOnly: true,
                                bind: "{newkhmc}",
                                margin: '0 0 0 0'
                            },

                            {
                                xtype: 'button',
                                text: '...',
                                width: 30,
                                //bind: {
                                //    hidden: '{gsop}'
                                //},
                                margin: '0 5 0 0',
                                handler: 'onSelectNewKhbmView'
                            },
                            {
                                xtype: 'checkbox',
                                fieldLabel: '调入客户付费',
                                name: 'jebz',
                                border: 1,

                                labelWidth: 90,
                                flex: 1,
                                margin: '0 5 0 10',
                                bind: "{jebz}"
                            },
                            {
                                name: 'cphm',
                                fieldLabel: '过户车牌',
                                flex: 1,
                                bind: "{cphm}",
                                hidden: true,
                                margin: '0 10 0 0',
                                allowBlank: true
                            },
                            {
                                name: 'sfr',
                                fieldLabel: '过户人',
                                labelWidth: 50, hidden: true,
                                flex: 1,
                                bind: "{sfr}",
                                margin: '0 10 0 0',
                                allowBlank: true
                            },
                            {
                                xtype: 'datefield',
                                name: 'endrq',
                                width: 190,
                                bind: "{endrq}",
                                format: 'Y-m-d',
                                fieldLabel: '有效日期',
                                allowBlank: false
                            }]
                    }
                ]
            },
            {
                xtype: 'grid',
                flex: 1,
                border: 1,
                columnLines: true,
                enableColumnHide: false,
                plugins: ['cellediting'],
                store: { type: 'CurCpghdmxStore' },
                reference: 'CpghdmxGrid',
                itemId: 'CpghdmxGrid',
                margin: '0 0 0 0',
                columns: [{
                    text: '产地',
                    dataIndex: 'cdmc',
                    sortable: false,
                    flex: 2

                },
                {
                    text: '商品名称',
                    dataIndex: 'cpmc',
                    sortable: false,
                    flex: 4

                },
                {
                    text: '包装',
                    dataIndex: 'bzmc',
                    sortable: false,
                    flex: 3
                },
                {
                    text: '规格型号',
                    dataIndex: 'cpgg',
                    sortable: false,
                    flex: 2
                },
                {
                    text: '商品批号',
                    dataIndex: 'cpgg',
                    sortable: false,
                    flex: 2
                },
                {
                    text: '单位',
                    dataIndex: 'jldw',
                    sortable: false,
                    width: 60
                },
                {
                    xtype: 'numbercolumn',
                    text: '开单数量',

                    sortable: false,
                    dataIndex: 'xssl',
                    flex: 2,
                    format: '0.000',
                    editor: {
                        type: 'numberfield',
                        decimalPrecision: 3,
                        align: 'right',
                        allowBlank: true,
                        //minValue: 0,
                        //maxValue: 999999.999,
                        listeners: {
                            change: function (record, value) {
                                var customerGrid = this.up('#CpghdmxGrid');
                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                var sl = selection.get('sl');
                                var zl = selection.get('zl');
                                if (value == sl) {
                                    selection.set('xszl', zl);
                                    return true;

                                }

                                var rate = 0;
                                if (sl != 0) {
                                    rate = zl / sl;
                                }
                                if ((sl > 0) && (value > sl)) {
                                    Ext.MessageBox.alert('注意！', '最大可开单数量为：' + sl);
                                    return false;
                                    value = sl
                                }
                                if ((sl < 0) && (value < sl)) {
                                    value = sl
                                }
                                selection.set('xssl', value);

                                selection.set('xszl', Math.round(1000 * value * rate) / 1000);
                            }
                        }
                    }
                },

                {
                    xtype: 'numbercolumn',
                    text: '开单重量',
                    sortable: false,
                    dataIndex: 'xszl',
                    flex: 2,
                    format: '0.000',
                    editor: {
                        type: 'numberfield',
                        decimalPrecision: 3,
                        align: 'right',
                        allowBlank: true,
                        listeners: {
                            change: function (record, value) {
                                var customerGrid = this.up('#CpghdmxGrid');
                                var selection = customerGrid.getSelectionModel().getSelection()[0];
                                var sl = selection.get('sl');
                                var zl = selection.get('zl');
                                var rate = 0;
                                if (sl != 0) {
                                    rate = zl / sl;
                                }
                                if ((zl > 0) && (value > zl)) {
                                    Ext.MessageBox.alert('注意！', '最大可开单重量为：' + zl);
                                    selection.set('xszl', zl);
                                    return false;

                                }
                                if ((zl < 0) && (value < zl)) {
                                    value = zl
                                }



                            }
                        }
                    }
                    // renderer: 'zlrenderer'                                        
                },
                /*{
                    xtype: 'numbercolumn',
                    text: '过户单价',
                    flex: 2,
                    dataIndex: 'ghdj',
                  //  renderer: 'jerenderer'
                },
                {
                    xtype: 'numbercolumn',
                    text: '过户金额',
                    flex: 2,
                    dataIndex: 'xsje',
                   // renderer: 'jerenderer'
                    
                },*/
                {
                    text: '说明',
                    dataIndex: 'sm',
                    sortable: false,
                    flex: 2,
                    editor: {
                        type: 'textfield'
                    }
                }/*
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'sl',
                    hidden: true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'zl',
                    hidden: true
                }*/

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
                            fieldLabel: '仓库复核',
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

            }]
    }],
    buttons: [
        "->",
        {
            text: '保存',
            icon: "images/right.gif",
            itemId: 'CpghdFormSubmit'
        }, {
            text: '放弃',
            icon: "images/close.gif",
            handler: function () {
                this.up("#cpghdedit").close();
            }
        }]
});