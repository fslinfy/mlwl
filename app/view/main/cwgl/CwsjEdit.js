
Ext.define('MyApp.view.main.cwgl.CwsjEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formcwsjwindow',
    reference: 'popupWindow',

    title: '收支录入',
    width: 600,
    height: 400,
    minWidth: 200,
    minHeight: 120,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 20,
    plain: true,
    modal: true,
    items: [
        {
            xtype: 'form',
            reference: 'windowForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: true,
            items: [
                {
                    margin: '0 0 0 0',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelWidth: 60,
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
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'sjrq',
                                    width: 200,
                                    bind: "{sjrq}",

                                    format: 'Y-m-d',
                                    fieldLabel: '收支日期',
                                    //readOnly:true,
                                    allowBlank: false,
                                    margin: '0 10 0 0'

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'side',
                            defaultType: 'textfield',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 60

                            },
                            items: [
                                {
                                    name: 'khmc',
                                    fieldLabel: '客户名称',
                                    flex: 1,

                                    bind: "{khmc}",
                                    margin: '0 10 0 0'
                                },
                                {
                                    name: 'cwzy',
                                    fieldLabel: '财务摘要',
                                    flex: 1,

                                    bind: "{cwzy}",
                                    margin: '5 10 0 0'
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
                            defaults: {
                                labelWidth: 60
                            },
                            items: [
                                {
                                    xtype: "numberfield",
                                    name: 'srje',
                                    fieldLabel: '收入金额',
                                    flex: 1,
                                    bind: "{srje}",
                                    hideTrigger: true,
                                    format: '0.00',
                                    decimalPrecision: 2,
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'jcje',
                                    fieldLabel: '支出金额',
                                    flex: 1,
                                    hideTrigger: true,
                                    format: '0.00',
                                    bind: "{jcje}",
                                    decimalPrecision: 2,
                                    margin: '0 10 0 5'
                                }

                            ]
                        }
                    ]
                },

                {
                    xtype: 'fieldcontainer',
                    height: 130,
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
                                type: 'vbox',
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
                            defaults: {
                                labelWidth: 60
                                //hideLabel: true
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {

                                    name: 'czy',
                                    width: 200,
                                    bind: "{czy}",
                                    fieldLabel: '操作员',
                                    readOnly: true,
                                    allowBlank: false,
                                    margin: '0 10 0 0'

                                }
                            ]
                        },

                    ]

                }
            ],
        }],
    buttons: [{
        text: '保存',
        icon: "images/right.gif",
        itemId: 'btnFormSubmit'
    }, {
        text: '放弃',
        icon: "images/close.gif",
        handler: function () {
            this.up("window").close();
        }
    }]
});