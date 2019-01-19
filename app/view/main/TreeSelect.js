
Ext.define('MyApp.view.main.TreeSelect', {
    extend: 'Ext.Mixin'
});
function treeSelect(mc, the, kcbz, viewname, resh, callback) {
    this.callback = callback;
    this.mc = mc;
    this.viewname = viewname;
    var url = '';
    switch (mc) {
        case "ckmc":
            url = sys_ActionPHP + '?act=locationselecttreelist';
            this.f_id = 'ckid';
            this.f_mc = 'ckmc';
            break;
        case "khmc":
            url = sys_ActionPHP + '?act=customerselecttreelist';
            this.f_id = 'khid';
            this.f_mc = 'khmc';
            break;
        case "cpmc":
            url = sys_ActionPHP + '?act=commodityselecttreelist';
            this.f_id = 'cpid';
            this.f_mc = 'cpmc';
            break;
        case "cdmc":
            url = sys_ActionPHP + '?act=producesselecttreelist';
            this.f_id = 'cdid';
            this.f_mc = 'cdmc';
            break;
        case "bzmc":
            url = sys_ActionPHP + '?act=packingselecttreelist';
            this.f_id = 'bzid';
            this.f_mc = 'bzmc';
            break;
        case "work":
            url = sys_ActionPHP + '?act=workselecttreelist';
            this.f_id = 'workid';
            this.f_mc = 'workmc';
            break;

        default:
            return;
            break;
    }
    var treestore = Ext.create('Ext.data.TreeStore', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            api: {
                read: url
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_e_code: sys_enterprise_code,
                p_l_id: sys_location_id,
                p_c_id: sys_customer_id,
                displayall: kcbz
            }
        },

        root: {
            id: "",
            code: "",
            py_code: "",
            text: '全部',
            expanded: true

        }//,

        //  listeners: {

        //注意beforeload的参数。与3.x中的不同
        // beforeload: function (ds, opration, opt) {

        //opration.params.nodeid = opration.node.data.id;
        //获得节点的相应属性，也有所不同

        //opration.params.name = opration.node.data.text;

        // }
        //  },

    });

    var selecttree = Ext.create('Ext.tree.Panel', {
        singleExpand: true,
        rootVisible: false,
        draggable: false,
        useArrows: true,
        lines: true,
        expanded: true,
        //  mc:mc,
        //  viewname:viewname,
        frame: true,
        border: true,
        itemId: "selectTreePanel",
        reference: "selectTreePanel",
        store: treestore,
        tbar: [{
            labelWidth: 40,
            xtype: 'triggerfield',
            fieldLabel: '过滤',
            flex: 1,
            triggerCls: 'x-form-clear-trigger',
            onTriggerClick: function () {
                // Will trigger the change listener
                this.reset();
            },
            listeners: {
                change: function () {
                    var tree = this.up('treepanel'),
                        v,
                        matches = 0,
                        v = new RegExp(this.getValue(), 'i');
                    Ext.suspendLayouts();
                    tree.store.filter({
                        filterFn: function (node) {
                            var children = node.childNodes,
                                len = children && children.length,
                                visible = node.isLeaf() ? (v.test(node.get('text')) || v.test(node.get('py_code')) || v.test(node.get('code'))) : false,
                                i;
                            for (i = 0; i < len && !(visible = children[i].get('visible')); i++);
                            return visible;
                        },
                        id: 'titleFilter'
                    });
                    Ext.resumeLayouts(true);
                },
                buffer: 250
            }
        }],
        bbar: {
            reference: 'bbar',
            items: ['->', {
                text: '确认',
                itemId: "btnTreeSelect",
                icon: "images/right.gif",
                disabled: true,
                handler: function () {
                    //this.up("window").hide();
                    onSelectOkClick();
                }

            }, {
                    text: '放弃',
                    itemId: "btnCkbmTreeEdit",
                    icon: "images/close.gif",
                    handler: function () {
                        //this.up("window").destroy();
                        selecttreeWin.destroy();
                    }

                }]

        },
        listeners: {
            select: function (node, event) {
                if (event.data.leaf) {
                    this.down("#btnTreeSelect").setDisabled(false);
                }
                else {
                    this.down("#btnTreeSelect").setDisabled(true);
                }

            }
        }



    });



    selecttreeWin = new Ext.Window({
        width: 440,
        height: 440,
        title: '请选择：',
        plain: true,
        resizable: false,
        frame: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        items: [selecttree]
    }).show();


    onSelectOkClick = function () {
        var mc = this.mc;
        var viewname = this.viewname;
        var sm = selecttree.getSelectionModel();
        if (sm.hasSelection()) {
            node = sm.getSelection()[0];
            selecttreeWin.destroy();
            //  console.log("callback",callback)
            if (callback == undefined) {
                viewname.getViewModel().set(this.f_mc, node.data.text);
                viewname.getViewModel().set(this.f_id, node.data.id);
                if (resh) {
                    that.onBtnQueryClick();

                }
                return;

            }
            if (callback.length > 0) {
                callback(node);
            }
        }
    };
}


