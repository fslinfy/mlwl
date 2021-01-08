
Ext.define('MyApp.view.main.xsdgl.CpxsdEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formshwindow',
    reference: 'popupCpxsdWindow',
    itemId: "cpxsdedit",
    bind: {
        title: '{title}'
    },
    title: '商品销售开单',
    width: "90%",
    height: 500,
    minWidth: 600,
    minHeight: 400,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 5,
    plain: true,
    maximizable: true,
    modal: true,
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

                                name: 'xsdh',
                                fieldLabel: 'xsdh',
                                hidden: true,
                                bind: "{xsdh}"
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
                                allowBlank: true,
                                readOnly: true,
                                bind: "{xsdh}",
                                margin: '0 10 0 0'
                            },
                            {
                                xtype: 'datefield',
                                name: 'xsrq',
                                width: 200,
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
                        items: [
                            {
                                name: 'ckid',
                                hidden: true,
                                bind: "{ckid}"
                            },
                            {
                                name: 'ckmc',
                                fieldLabel: '提货仓库',
                                flex: 1,
                                readOnly: true,
                                bind: "{ckmc}",
                                margin: '0 10 0 0',
                                allowBlank: true
                            },
                            {
                                name: 'cphm',
                                fieldLabel: '提货车牌',
                                flex: 1,
                                bind: "{cphm}",

                                margin: '0 10 0 0',
                                allowBlank: true
                            },
                            {
                                name: 'sfr',
                                fieldLabel: '提货人',
                                labelWidth: 50,
                                flex: 1,
                                bind: "{sfr}",
                                margin: '0 10 0 0',
                                allowBlank: true
                            }, {
                                xtype: 'datefield',
                                name: 'endrq',
                                width: 200,
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
                flex: 1, border: 1,
                columnLines: true,
                enableColumnHide: false,
                plugins: ['cellediting'],
                store: { type: 'CurCpxsdmxStore' },
                reference: 'CpxsdmxGrid',
                itemId: 'CpxsdmxGrid',
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
                    dataIndex: 'xssl',
                    sortable: false,
                    renderer: zlrenderer,
                    flex: 2,
                    format: '000000.000',
                    editor: {
                        type: 'numberfield',
                        decimalPrecision: 3,
                        align: 'right',
                        allowBlank: true,
                        //minValue: 0,
                        //maxValue: 999999.999,
                        listeners: {
                            change: function (record, value) {
                                var customerGrid = this.up('#CpxsdmxGrid');
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

                                selection.set('xszl', value * rate);
                            }
                        }
                    }
                },

                {
                    xtype: 'numbercolumn',
                    text: '开单重量',
                    dataIndex: 'xszl',
                    sortable: false,
                    flex: 2,
                    renderer: zlrenderer,
                    format: '000000.000',
                    editor: {
                        type: 'numberfield',
                        decimalPrecision: 3,
                        align: 'right',
                        allowBlank: true,
                        listeners: {
                            change: function (record, value) {
                                var customerGrid = this.up('#CpxsdmxGrid');
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
                    text: '销售单价',
                    flex: 2,
                    dataIndex: 'xsdj',
                  //  renderer: 'jerenderer'
                },
                {
                    xtype: 'numbercolumn',
                    text: '销售金额',
                    flex: 2,
                    dataIndex: 'xsje',
                   // renderer: 'jerenderer'
                    
                },*/
                {
                    text: '说明',
                    dataIndex: 'sm',
                    flex: 2,
                    sortable: false,
                    editor: {
                        type: 'textfield'
                    }
                }/*,
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
            handler: 'onCpxsdFormSubmit'
        }, {
            text: '放弃',
            icon: "images/close.gif",
            handler: function () {

                this.up("#cpxsdedit").close();
            }
        }]
});