
Ext.define('MyApp.view.main.users.UserTypeEdit', {
    extend: 'Ext.window.Window',
    xtype: 'usertypeformwindow',
    reference: 'popupWindow',
    itemId: 'UserTypeEdit',
    bind: {
        title: '{title}'
    },
    title: '编辑资料',
    width: 900,
    height: 500,
    minWidth: 200,
    minHeight: 120,
    layout: 'fit',
    closeAction: 'destroy',
    bodyPadding: 20,
    plain: true,
     modal: true,
    items: [{
        xtype: 'form',
        reference: 'windowForm',


        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        bodyPadding: 5,
        border: 0,
        items: [
            {
                xtype: 'panel',
                //title: 'edit',
                defaultType: 'textfield',
                flex: 1,
                border: 0,
                fieldDefaults: {
                    labelWidth: 70,
                    frame: true
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                border: false,
                items: [
                    {
                        fieldLabel: 'E_code',
                        name: 'E_code',
                        hidden: true,
                        bind: '{E_code}'
                    },

                    {
                        fieldLabel: 'id',
                        // visiable: false,
                        name: 'id',
                        hidden: true,
                        bind: '{id}'
                    }
                    ,
                    {
                        xtype: 'textarea',
                        width: '90%', height: 'auto',
                        fieldLabel: 'menustring',

                        name: 'menustring',
                         hidden: true,
                        bind: '{menustring}'
                    }
                    ,
                    {
                        xtype: 'textarea',
                        width: '90%', height: 'auto',
                        fieldLabel: 'wxmenustring',

                        name: 'wxmenustring',
                        hidden: true,
                        bind: '{wxmenustring}'
                    }
,


                    {
                        fieldLabel: '代码',
                        regex: /(^[0-9A-Z]{1,5}$)/,
                        width: 20,
                        maxLength: 5,
                        allowBank: false,
                        name: 'code',
                        // reference: 'T_code',
                        // msgTarget: 'side',
                        bind: '{code}'
                    }, {
                        fieldLabel: '名称',
                        allowBank: false,
                        name: 'typename',
                        bind: '{typename}'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: '新增权限',
                        name: 'new',
                        bind: '{new}'

                    },
                    
                    {
                        xtype: 'checkbox',
                        fieldLabel: '删除权限',
                        name: 'del',
                        bind: '{del}'

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: '仓管审核权',
                        name: 'edit',
                        bind: '{edit}'

                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: '业务审核权',
                        name: 'sh',
                        bind: '{sh}'

                    }
                    ,
                    {
                        xtype: 'checkbox',
                        fieldLabel: '财务审核权',
                        name: 'cwsh',
                        bind: '{cwsh}'

                    }
                ]
            },
            {
                xtype: "treepanel",
                title: '仓库系统功能权限设置',
                reference: "selectWorkerTreePanel",
                itemId: "selectWorkerTreePanel",
                singleExpand: false,
                rootVisible: false,
                draggable: false,
                
                useArrows: true,
                border: 1,
                lines: true,
                flex: 1,
                expanded: true,
                store: {
                    itemId: "selectWorkerTreeStore",
                    type: 'tree',

                    proxy: {
                        type: 'ajax',
                        api: {
                            read: sys_ActionPHP + '?act=systemmenutreelist'
                        },
                        actionMethods: {
                            read: 'GET'
                        },
                        extraParams: {
                            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                            p_e_code: sys_enterprise_code,
                            p_l_id: sys_location_id,
                            displayall: sys_DisplayAll
                        }
                    },
                    root: {
                        text: '全部',
                        id: 'ALL',
                        code: "",
                        checked: false,
                        expanded: true,
                        draggable: false
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store) {
                            var p = that.lookupReference('popupWindow').getViewModel();
                            var str = p.get('menustring');
                            if (str==undefined) str='';
                            var tree = that.getView().down("#selectWorkerTreePanel") ;
                            var nodes = tree.getRootNode().childNodes;
                            for (var j = 0; j < nodes.length; j++) {
                                var node = tree.getRootNode().childNodes[j];
                                    if (str.indexOf(";"+node.data.id+";")>-1)
                                            {
                                                node.data.checked=true;
                                            }
                                if (node.hasChildNodes()) {
                                    for (var i = 0; i < node.childNodes.length; i++) {
                                          var node1=node.childNodes[i];             
                                        if (str.indexOf(";"+node1.data.id+";")>-1)
                                            {
                                                node1.data.checked=true;
                                            }
                                    }
                                        node.expand(true,true);

                                }
                            }
                        }
                    }

                },
                listeners: {
                    checkchange: function (node, checked) {
                        
                        node.expand();
                        node.checked = checked;
                        node.eachChild(function (child) {
                            child.set('checked', checked);
                            this.fireEvent('checkchange', child, checked);
                        });
                        

                    }
                }
            },
            {
                xtype: "treepanel",
                title: '小程序功能权限设置',
                reference: "selectWorkerTreePanel1",
                itemId: "selectWorkerTreePanel1",
                singleExpand: false,
                rootVisible: false,
                draggable: false,
                
                useArrows: true,
                border: 1,
                lines: true,
                flex: 1,
                expanded: true,
                store: {
                    itemId: "selectWorkerTreeStore",
                    type: 'tree',

                    proxy: {
                        type: 'ajax',
                        api: {
                            read: sys_ActionPHP + '?act=wxsystemmenutreelist'
                        },
                        actionMethods: {
                            read: 'GET'
                        },
                        extraParams: {
                            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                            p_e_code: sys_enterprise_code,
                            p_l_id: sys_location_id,
                            displayall: sys_DisplayAll
                        }
                    },
                    root: {
                        text: '全部',
                        id: 'ALL',
                        code: "",
                        checked: false,
                        expanded: true,
                        draggable: false
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store) {
                            var p = that.lookupReference('popupWindow').getViewModel();
                            var str = p.get('wxmenustring');
                            console.log(str);
                            if (str==undefined) str='';
                            var tree = that.getView().down("#selectWorkerTreePanel1") ;
                            var nodes = tree.getRootNode().childNodes;
                            for (var j = 0; j < nodes.length; j++) {
                                var node = tree.getRootNode().childNodes[j];
                                    if (str.indexOf("|"+node.data.id+"|")>-1)
                                            {
                                                node.data.checked=true;
                                            }
                                if (node.hasChildNodes()) {
                                    for (var i = 0; i < node.childNodes.length; i++) {
                                          var node1=node.childNodes[i];             
                                        if (str.indexOf("|"+node1.data.id+"|")>-1)
                                            {
                                                node1.data.checked=true;
                                            }
                                    }
                                        node.expand(true,true);

                                }
                            }
                        }
                    }

                },
                listeners: {
                    checkchange: function (node, checked) {
                        
                        node.expand();
                        node.checked = checked;
                        node.eachChild(function (child) {
                            child.set('checked', checked);
                            this.fireEvent('checkchange', child, checked);
                        });
                        

                    }
                }
            }
        ]

    }],
    buttons: [{
        text: '保存',
        // itemId:'Send',
        icon: "images/right.gif",
        handler: 'onFormSubmit'
    }, {
        text: '放弃',
        icon: "images/close.gif",
        // itemId: 'Cancel',
        //handler: 'onFormCancel'
        handler: function () {
            this.up("window").close();

        }
    }]
});