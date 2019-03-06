
Ext.define('MyApp.view.main.cpkc.CpkccwEdit', {
    extend: 'Ext.window.Window',
    xtype: 'formcweditwindow',
    reference: 'popupcweditWindow',
    title: '仓位变更',
    width: 600,
    height: 520,
    minWidth: 200,

    minHeight: 120,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 10,
    plain: true,
    modal: true,
    items: [
        {
            xtype: 'form',
            reference: 'windowcweditForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: true,
            items: [
                {
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelWidth: 60,
                        frame: true
                    },
                    margin: '5 10 0 10',
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
                                labelWidth: 35
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'rq',
                                    width: 200,
                                    bind: "{rq}",
                                    format: 'Y-m-d',
                                    fieldStyle: 'background-color:#ddd; background-image: none;',
                                    fieldLabel: '日期',
                                    readOnly: true,
                                    margin: '5 0 0 0'
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
                                labelWidth: 60,
                                fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [
                                {
                                    name: 'khmc',
                                    fieldLabel: '客户名称',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{khmc}"
                                },
                                {
                                    name: 'cpmc',
                                    fieldLabel: '商品名称',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{cpmc}"
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
                                labelWidth: 60,
                                fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [

                                
                                {
                                    name: 'cdmc',
                                    fieldLabel: '产地名称',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{cdmc}"
                                }
                                ,
                                {
                                    name: 'cbzmc',
                                    fieldLabel: '包装规格',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{bzmc}",
                                    margin: '0 0 0 10'
                                }
                          ]},

                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'side',
                            defaultType: 'textfield',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            defaults: {
                                labelWidth: 60,
                                fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [
                                {

                                    name: 'cpph',
                                    fieldLabel: '商品批次',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{cpph}"
                                },
                                {

                                    name: 'jldw',
                                    fieldLabel: '计量单位',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{jldw}",
                                    margin: '0 0 0 10'
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
                                labelWidth: 60,
                                fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [
                                {
                                    name: 'oldArea',
                                    fieldLabel: '原区',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    hidden: ((sys_location_areas < 2) || (sys_location_id == 0)),
                                    readOnly: true,
                                    bind: "{oldArea}"
                                },
                                {
                                    name: 'cw',
                                    fieldLabel: '原仓位',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{cw}"
                                },


                                {
                                    name: 'sm',
                                    fieldLabel: '原说明',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{sm}",
                                    margin: '0 0 0 10'
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
                                labelWidth: 60,
                                fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [

                                {
                                    xtype: "numberfield",
                                    name: 'sl',
                                    fieldLabel: '库存数量',
                                    flex: 1,
                                    readOnly: true,
                                    bind: "{sl}",
                                    hideTrigger: true,
                                    decimalPrecision: 3
                                },
                                {
                                    xtype: "numberfield",
                                    name: 'zl',
                                    fieldLabel: '库存重量',
                                    flex: 1,
                                    readOnly: true,
                                    hideTrigger: true,
                                    bind: "{zl}",
                                    decimalPrecision: 3,
                                    margin: '0 0 0 10'
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
                                labelWidth: 60//,
                                // fieldStyle: 'background-color:#ddd; background-image: none;'
                            },
                            items: [

                                {
                                    xtype: "combo",
                                    fieldLabel: '新区',
                                    // labelWidth: 40,
                                    store: sys_area_store,
                                    width: 150,
                                    margin: '0 10 0 0',
                                    queryMode: 'local',
                                    displayField: 'area',
                                    valueField: 'area',
                                    name: 'area',

                                    hidden: ((sys_location_areas < 2) || (sys_location_id == 0)),
                                    itemId: 'combo_area',
                                    bind: "{area}",
                                    listeners: {
                                        afterrender: function () {
                                            this.setHidden(((this.getStore().getCount() < 2) || (sys_location_id == 0)));
                                        }
                                    }
                                },
                                {
                                    name: 'newcw',
                                    fieldLabel: '新仓位',
                                    flex: 1,
                                    //readOnly: true,
                                    bind: "{newcw}"
                                },
                                // { xtype: "QueryArea" },



                                {
                                    name: 'newsm',
                                    fieldLabel: '新说明',
                                    flex: 1,
                                    //readOnly: true,
                                    bind: "{newsm}",
                                    margin: '0 0 0 10'
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
                                    name: 'newsl',
                                    fieldLabel: '变更数量',
                                    flex: 1,
                                    bind: "{newsl}",
                                    hideTrigger: true,
                                    decimalPrecision: 3,
                                    validator: function (value) {
                                        var panel = this.up('window').getViewModel();
                                        var sl = panel.get('sl');
                                        var zl = panel.get('zl');
                                        if (value < 0) {
                                            panel.set('newsl', 0);
                                            panel.set('newzl', 0);
                                            return false;
                                        }
                                        if (value < sl) {
                                            panel.set('newzl', Math.round(1000 * value * zl / sl) / 1000);
                                        } else {
                                            if (value == sl) {
                                                panel.set('newzl', zl);
                                            } else {
                                                panel.set('newsl', sl);
                                                panel.set('newzl', zl);
                                                return false;
                                            }
                                        }
                                        return true;
                                    }

                                },
                                {
                                    xtype: "numberfield",
                                    name: 'newzl',
                                    fieldLabel: '变更重量',
                                    flex: 1,
                                    hideTrigger: true,
                                    bind: "{newzl}",
                                    decimalPrecision: 3,
                                    margin: '0 0 0 10',
                                    validator: function (value) {
                                        var panel = this.up('window').getViewModel();
                                        var zl = panel.get('zl');
                                        if (panel.get('newsl') == panel.get('sl')) {
                                            if (panel.get('newzl') != panel.get('zl')) {
                                                //panel.set('newzl', zl);
                                                return false;
                                            } else { return true; }

                                        }

                                        if (value > zl) {
                                            panel.set('newzl', zl);
                                            return true;
                                        }
                                        if (value < 0) {
                                            panel.set('newzl', 0);
                                            return false;
                                        }
                                        return true;
                                    }
                                },
                                {
                                    name: 'kcmxid',
                                    bind: "{kcmxid}",
                                    hidden: true
                                }
                            ]
                        }

                    ]
                }
            ]
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