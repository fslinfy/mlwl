

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
        //frame: true,
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
        //frame: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
       // items: [selecttree]
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

function change_password() {

    //    var cp1 = new Ext.state.CookieProvider();
    // console.log(' login ', sys_system_name, sys_system_id, sys_location_id, sys_customer_id);

    apploginWin = new Ext.Window({
        width: 440,
        height: 440,
        title: '密码更改',
        plain: true,
        //closable : false,
        resizable: false,
        frame: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        //modal : true,
        // init: function () {
        //    console.log("init");
        // },
        items: [apploginForm = new Ext.form.FormPanel({
            labelAlign: 'left',
            buttonAlign: 'center',
            bodyStyle: 'padding:5px',
            frame: true,
            //margins : '20 20 20 20',
            //padding : '20 20 0 20',    
            defaults: {
                xtype: 'textfield',
                allowBlank: false,
                anchor: '97%',
                enableKeyEvents: true,
                labelWidth: 70
            },
            items: [
                {
                    name: 'p_l_id',
                    hidden: true,
                    value: sys_location_id
                },
                {
                    name: 'p_khid',
                    hidden: true,
                    value: sys_customer_id
                },
                {
                    name: 'userid',
                    hidden: true,
                    value: sys_userInfo.userid
                },
                {
                    name: 'username',
                    id: 'username',
                    fieldLabel: '用户名称',
                    padding: '20 20 10 20',
                    readOnly: true,
                    value: sys_userInfo.username
                },
                {
                    name: 'password',
                    inputType: 'password',
                    id: 'password',
                    padding: '0 20 10 20',
                    fieldLabel: '原来旧密码',
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = apploginForm.form.findField("newpassword1");
                                if (obj) {
                                    obj.focus();
                                }

                            }
                            appchangeCode(0);
                        }
                    }
                },
                {
                    name: 'newpassword1',
                    inputType: 'password',
                    id: 'newpassword1',
                    padding: '0 20 10 20',
                    fieldLabel: '输入新密码',
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = apploginForm.form.findField("newpassword2");
                                if (obj) {
                                    obj.focus();
                                }
                            }
                            appchangeCode(0);
                        }
                    }

                },
                {
                    name: 'newpassword2',
                    inputType: 'password',
                    id: 'newpassword2',
                    padding: '0 20 10 20',
                    fieldLabel: '复核新密码',
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = apploginForm.form.findField("VerifyCode");
                                if (obj) {
                                    obj.focus();
                                }
                            }
                            appchangeCode(0);
                        }
                    }
                },
                {
                    name: 'VerifyCode',
                    id: 'VerifyCode',
                    padding: '0 20 10 20',
                    fieldLabel: '输入验证码',
                    mixLength: 6,
                    maxLength: 6,
                    value: '1234',
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = Ext.getCmp("submitButton");
                                if (obj) {
                                    appsubmit();
                                }
                            }
                        }


                    }
                },
                {
                    xtype: 'box',
                    height: 80,
                    padding: '0 20 10 20',
                    html: '<div style="margin:5px 0px 0px 65px"><a href="#"><img id="loginvcode" alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)"  id="code" height="82" width="292" src="" border="0"></a></div>',
                    border: false
                }, {
                    xtype: 'displayfield',
                    height: 30,
                    padding: '0 20 10 20',
                    value: '<div style="margin:5px 0px 0px 80px;color:red">(如果图片不清晰请单击图片更换图片)</div>'

                }],
            buttons: [{
                id: "submitButton",
                text: '确认更改',
                cls: "x-btn-text-icon",
                icon: "images/right.gif",
                scope: this,
                handler: function () {
                    appsubmit();
                }
            }, {
                text: '重  置',
                cls: 'x-btn-text-icon details',
                icon: "images/close.gif",
                scope: this,
                handler: function () {
                    apploginForm.form.reset()
                }
            }]
        })]
    }).show();
    appsubmit = function () {
        if (apploginForm.form.isValid()) {
            var loginname = Ext.getCmp("username").getValue();
            var psw1 = Ext.getCmp("newpassword1").getValue();
            var psw2 = Ext.getCmp("newpassword2").getValue();
            if (psw1 != psw2) {
                
                /*Ext.toast({
                    html: "两次新密码输入不一致！",
                    closable: true,
                    title: '注意！',
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });*/
                Ext.Msg.alert('注意！', " 两次新密码输入不一致！   ");
                var obj = apploginForm.form.findField("newpassword2");
                if (obj) {
                    obj.focus();
                }
                return;

            }
            apploginForm.form.doAction('submit', {
                url:  'checkloginp.php',
                //url: sys_WebUrl + '/checkloginp.php',
                method: 'post',
                waitTitle: '请稍候',
                waitMsg: '正在保存更改内容......',

                params: {
                    act: "changepassword"
                },

                success: function (form, action) {
                    var result = action.result.data;
                    if (parseInt(result.userid) > 0) {
                        apploginWin.destroy();
                        //  console.log(result);
                        var obj = sys_userInfo;
                        obj['password'] = psw2;
                        sys_userInfo = obj;
                    } else {
                        if (parseInt(result.userid) < 0) {
                         /*   Ext.toast({
                                html: "验证码错误！",
                                closable: true,
                                title: '注意！',
                                align: 't',
                                slideInDuration: 200,
                                minWidth: 400
                            });*/
                            Ext.Msg.alert('注意！', " 验证码错误！   ");
                            var obj = apploginForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            apploginWin.destroy();
                            Ext.Msg.alert('注意！', result.username);
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.Msg.alert('注意!!', action.result.data.username);
                }
            });
        }
    }
    appchangeCode = function (obj) {
        if ((obj == 0) && (apploginWin.hasvcode)) return;

        apploginWin.hasvcode = true;
        var d = new Date();
        //document.getElementById('loginvcode').src = sys_WebUrl + "/vcode.php?d=" + d;
        document.getElementById('loginvcode').src = "vcode.php?d=" + d;
    }
    setTimeout(function () {
        //Ext.get('loading').remove();
        //	Ext.get('loading-mask').fadeOut({
        //	remove : true
        //	});
    }, 250);

}

function system_setting() {
    //    console.log("system_setting");
    var appid = 1;
    if (sys_customer_id > 0) appid = 2;
    appsettingWin = new Ext.Window({
        width: 440,
        height: 460,
        title: '系统设置',
        plain: true,

        resizable: false,
        frame: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        //    init: function () {
        //      console.log("init");
        // },
        items: [
            appsettingForm = new Ext.form.FormPanel({
                labelAlign: 'left',
                buttonAlign: 'center',
                bodyStyle: 'padding:5px',
                frame: true,
                defaults: {
                    xtype: 'textfield',
                    allowBlank: false,
                    anchor: '97%',
                    enableKeyEvents: true,
                    labelWidth: 60
                },
                items: [
                    {
                        xtype: 'combo',
                        name: "appid",
                        id: "appid",
                        fieldLabel: '选择应用',
                        padding: '20 20 10 20',
                        store: [[1, '仓储业务管理'], [2, '客户业务管理']],
                        queryMode: 'local',
                        editable: false,
                        allowBlank: false,
                        value: appid

                    },

                    {
                        name: 'systemcode',
                        id: 'asystemcode',
                        fieldLabel: '企业代码',
                        padding: '10 20 10 20',
                        value: sys_enterprise_code,
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = appsettingForm.form.findField("systemid");
                                    if (obj) {
                                        obj.focus();
                                    }
                                }
                                appchangeCode(0);
                            }
                        }

                    },


                    {
                        name: 'systemid',
                        id: 'systemid',
                        fieldLabel: '应用ID',
                        padding: '0 20 10 20',
                        value: sys_system_id,
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = appsettingForm.form.findField("VerifyCode");
                                    if (obj) {
                                        obj.focus();
                                    }
                                }
                                appchangeCode(0);
                            }
                        }

                    },
                    {
                        name: 'VerifyCode',
                        id: 'VerifyCode',
                        padding: '0 20 10 20',
                        fieldLabel: '验证码 ',
                        mixLength: 6,
                        maxLength: 6,
                        value: '1234',
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = Ext.getCmp("syssubmitButton");
                                    if (obj) {
                                        settingsubmit();
                                    }
                                }
                            }


                        }
                    },
                    {
                        xtype: 'box',
                        height: 80,
                        padding: '0 20 10 20',
                        html: '<div style="margin:5px 0px 0px 65px"><a href="#"><img  id="loginvcode"  alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)" id="code" height="82" width="292" src="vcode.php" border="0" ></a></div>',
                        border: false
                    }, {
                        xtype: 'displayfield',
                        height: 30,
                        padding: '0 20 10 20',
                        value: '<div style="margin:5px 0px 0px 80px;color:red">(如果图片不清晰请单击图片更换图片)</div>'
                    }],
                buttons: [{
                    id: "syssubmitButton",
                    text: '确认',
                    cls: "x-btn-text-icon",
                    icon: "images/right.gif",
                    scope: this,
                    handler: function () {
                        settingsubmit();
                    }
                }, {
                    text: '放弃',
                    cls: 'x-btn-text-icon details',
                    icon: "images/close.gif",
                    scope: this,
                    handler: function () {

                        appsettingWin.destroy();
                    }
                }]
            })]
    }).show();

    settingsubmit = function () {
        if (appsettingForm.form.isValid()) {

            var systemid = Ext.getCmp("systemid").getValue();
            var appid = Ext.getCmp("appid").getValue();
            //  console.log(appid, systemid);
            // return;

            appsettingForm.form.doAction('submit', {
                url:  'checkloginp.php',
                method: 'post',
                waitTitle: '请稍候',
                waitMsg: '正在保存设置......',
                params: {
                    act: "systemsetting"
                },
                success: function (form, action) {
                    var result = action.result.data;
                    //  console.log(result);
                    if (parseInt(result.userid) > 0) {

                        sys_system_name = result.username;
                        sys_system_id = parseInt(result.userid);
                        sys_location_areas = parseInt(result.areas);
                        appid = result.appid;
                        sys_enterprise_name = result.E_name;
                        sys_enterprise_code = result.E_code;

                        if (appid == "1") {

                            sys_location_name = sys_system_name;
                            sys_location_id = sys_system_id;
                            sys_customer_name = "";
                            sys_customer_id = 0;

                        } else {
                            sys_location_name = "";
                            sys_location_id = 0;
                            sys_customer_name = sys_system_name;
                            sys_customer_id = sys_system_id;

                        }
                        var Cookiecpsave = new Ext.state.CookieProvider({
                            expires: new Date(new Date().getTime() + 120 * (1000 * 60 * 60 * 24 * 30))
                        });

                        Cookiecpsave.set('sys_enterprise_name', sys_enterprise_name);
                        Cookiecpsave.set('sys_enterprise_code', sys_enterprise_code);
                        Cookiecpsave.set('sys_system_name', sys_system_name);
                        Cookiecpsave.set('sys_system_id', sys_system_id);
                        Cookiecpsave.set('apptypeid', appid);
                        Cookiecpsave.set('sys_customer_name', sys_customer_name);
                        Cookiecpsave.set('sys_customer_id', sys_customer_id);
                        Cookiecpsave.set('sys_location_name', sys_location_name);
                        Cookiecpsave.set('sys_location_id', sys_location_id);
                        Cookiecpsave.set('sys_location_areas', sys_location_areas);
                        appsettingWin.destroy();

                        user_login();

                    } else {
                        if (parseInt(result.userid) < 0) {
                          /*  Ext.toast({
                                html: "验证码错误！",
                                closable: true,
                                title: '注意！',
                                align: 't',
                                slideInDuration: 200,
                                minWidth: 400
                            });*/
                            Ext.Msg.alert('注意！', " 验证码错误！   ");
                            var obj = appsettingForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            appsettingWin.destroy();

                            Ext.Msg.alert('注意！', result.username);
                            //  Ext.getCmp('main_north').removeAll();
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.Msg.alert('注意!!', action.result.data.username);
                }
            });
        }
    }
    appchangeCode = function (obj) {
        if ((obj == 0) && (appsettingWin.hasvcode)) return;

        appsettingWin.hasvcode = true;
        var d = new Date();
        //document.getElementById('loginvcode').src = sys_WebUrl + "/vcode.php?d=" + d;
        document.getElementById('loginvcode').src = "vcode.php?d=" + d;
    }
    setTimeout(function () {
        //Ext.get('loading').remove();
        //	Ext.get('loading-mask').fadeOut({
        //	remove : true
        //	});
    }, 250);

}

function user_login() {



    getcookie();
    console.log("user_login", sys_enterprise_name, sys_location_name, sys_customer_name);
    console.log("user_login", sys_location_id, sys_customer_id);

    console.log("user_login", sys_enterprise_code);
    console.log("userInfo", sys_userInfo);

 apploginForm = new Ext.form.FormPanel({
            labelAlign: 'left',
            buttonAlign: 'center',
            bodyStyle: 'padding:5px',
            frame: true,
            defaults: {
                xtype: 'textfield',
                allowBlank: false,
                anchor: '97%',
                enableKeyEvents: true,
                labelWidth: 60
            },
            items: [
                {
                    name: 'p_l_id',
                    hidden: true,
                    value: sys_location_id
                },
                {
                    name: 'p_khid',
                    hidden: true,
                    value: sys_customer_id
                },
                {
                    name: 'username',
                    id: 'username',
                    fieldLabel: '用户名称',
                    padding: '20 20 10 20',
                    value: sys_userInfo.username,
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = apploginForm.form.findField("password");
                                if (obj) {
                                    obj.focus();
                                }
                            }
                            appchangeCode(0);
                        }
                    }

                }, {
                    name: 'password',
                    inputType: 'password',
                    id: 'password',
                    validationOnChange: false,
                    padding: '0 20 10 20',
                    fieldLabel: '登录密码',
                    value: "8888",
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = apploginForm.form.findField("VerifyCode");
                                if (obj) {
                                    obj.focus();

                                }
                            }
                            appchangeCode(0);
                        }
                    }
                }, {
                    name: 'VerifyCode',
                    id: 'VerifyCode',
                    padding: '0 20 10 20',
                    fieldLabel: '验证码 ',
                    mixLength: 6,
                    maxLength: 6,
                    value: '1234',
                    listeners: {
                        keypress: function (field, e) {
                            if (e.getKey() == 13) {
                                var obj = Ext.getCmp("submitButton");
                                if (obj) {
                                    appsubmit();
                                }
                            }
                        }
                    }
                },
                {
                    xtype: 'box',
                    height: 80,
                    padding: '0 20 10 20',
                    html: '<div  style="margin:5px 0px 0px 65px"><a href="#"><img id="loginvcode" alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)" onload="javascript:appchangeCode(0)"   id="code" height="82" width="292" src="vcode.php" border="0"></a></div>',
                    border: false
                }, {
                    xtype: 'displayfield',
                    height: 30,
                    padding: '0 20 10 20',
                    value: '<div style="margin:5px 0px 0px 80px;color:red">(如果图片不清晰请单击图片更换图片)</div>'

                }],
            buttons: [{
                id: "submitButton",
                text: '登录',
                cls: "x-btn-text-icon",
                icon: "images/right.gif",
                scope: this,
                handler: function () {
                    appsubmit();
                }
            }, {
                text: '重置',
                cls: 'x-btn-text-icon details',
                icon: "images/close.gif",
                scope: this,
                handler: function () {
                    apploginForm.form.reset()
                }
            }
            ]
        })
    console.log("111111111 0");
     apploginWin = new Ext.Window({
        width: 440,
        height: 400,
        title: sys_system_name + '(用户登录）',
        plain: true,
        resizable: false,
        frame: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        items: [apploginForm
        ]
    }
    ).show();

    console.log("111111111 1");
    appsubmit = function () {
        if (apploginForm.form.isValid()) {
            var loginname = Ext.getCmp("username").getValue();
            var psw = Ext.getCmp("password").getValue();
            apploginForm.form.doAction('submit', {
                url: 'checkloginp.php',
                method: 'post',
                waitTitle: '请稍候',
                waitMsg: '正在登录......',

                params: {
                    act: "systemlogin",
                    sys_guid: sys_guid
                },

                success: function (form, action) {
                    var result = action.result.data;
                    if (parseInt(result.userid) > 0) {
                        apploginWin.destroy();
                        var obj = { username: result.username, password: psw, userid: result.userid };
                        sys_userInfo = obj;
                        var cp0 = new Ext.state.CookieProvider({
                            expires: new Date(new Date().getTime() + 120 * (1000 * 60 * 60 * 24 * 30))
                        });

                        sys_system_cwsh = parseInt(result.cwsh);
                        sys_system_sh = parseInt(result.sh);
                        sys_system_edit = parseInt(result.edit);
                        sys_system_del = parseInt(result.del);
                        sys_system_new = parseInt(result.new);
                        // sys_location_areas=parseInt(result.areas);
                        //sys_system_system = result.system;

                        cp0.set('userid', result.userid);
                        cp0.set('username', result.username);

                        createmenu();
                    } else {
                        if (parseInt(result.userid) < 0) {

                           /* Ext.toast({
                                html: "验证码错误！",
                                closable: true,
                                title: '注意！',
                                align: 't',
                                slideInDuration: 200,
                                minWidth: 400
                            });*/
                            Ext.Msg.alert('注意！', " 验证码错误！   ");
                            var obj = apploginForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            apploginWin.destroy();
                            Ext.Msg.alert('注意！', " 用户登录失败！   ");
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.Msg.alert('注意!!', action.result.data.username);
                }
            });
        }
    }
   // console.log("111111111 2");
    appchangeCode = function (obj) {
        if ((obj == 0) && (apploginWin.hasvcode)) return;

        apploginWin.hasvcode = true;
        var d = new Date();
        //document.getElementById('loginvcode').src = sys_WebUrl + "/vcode.php?d=" + d;
        document.getElementById('loginvcode').src = "vcode.php?d=" + d;



    }
    setTimeout(function () {
        //Ext.get('loading').remove();
        //	Ext.get('loading-mask').fadeOut({
        //	remove : true
        //	});
    }, 250);
    console.log("111111111 3");

}
function pagereset() {


    Ext.getCmp('main_north').removeAll();
    var items = [{
        xtype: "displayfield",
        value: sys_enterprise_name + "->" + sys_system_name// + "(操作员：" + sys_userInfo.username + ")"
    }, "->",
    {
        xtype: "button",
        text: '登录',
        cls: "x-btn-text-icon",
        scope: this,
        handler: function () {
            // uploadFile();
            console.log("login", sys_system_name, sys_location_name);
            if (sys_system_name == "" || sys_system_name == undefined) {
                system_setting();
            } else {
                user_login();
            }
        }
    }

    ];
    items.push();
    Ext.getCmp('main_north').add(
        Ext.getCmp('main_north').add({ xtype: 'panel', tbar: items })
    )

}

function createmenu() {
    var oldmenu = "";

    mainTabPanel = Ext.getCmp("maintabpanel");
    mainTabPanel.removeAll();
    var cp = Ext.create('Ext.state.CookieProvider');
    var appid = cp.get('apptypeid');
    //if (!appid)
    //   {
    //     return;
    // }

    //var URL = sys_ActionPHP + '?act=menusystemlist&termtype=classic&appid=' + appid;
    var URL =  'mysql_action.php?act=menusystemlist&termtype=classic&appid=' + appid;
    
    console.log(URL);
    Ext.Ajax.request({
        url: URL,
        scriptTag: true,
        method: 'GET',
        scope: this,
        dataType: 'JSONP',
        success: function (req) {
            var data = req.responseText;
            data = data.substring(1);
            var obj = JSON.parse(data);
            var menu0 = obj.rows;
            var menu1 = menu0;
            var cbarmenu = '';
            var items = [{
                xtype: "displayfield",
                value: sys_enterprise_name + "->" + sys_system_name + "(操作员：" + sys_userInfo.username + ")"
            }, "->"];
            var submenu = [];
            var m = 0;
            menu0.forEach(function (value, index, array) {
                if (cbarmenu != value.menu) {
                    cbarmenu = value.menu;
                    submenu = [];
                    //*************************************	  
                    m = 0;
                    oldmenu = "";
                    menu1.forEach(function (value, index, array) {
                        if (cbarmenu == value.menu) {
                            m++;
                            if (value.name != oldmenu) {
                                oldmenu = value.name;
                                if (value.name == "-") {
                                    submenu.push("-");
                                } else {
                                    var lcviewpath = value.viewpath;
                                    var lcwidgetName = value.widgetName;
                                    var pre = "";
                                    if (lcwidgetName == "") {
                                        pre = "-";
                                    }

                                    submenu.push({
                                        text: pre + value.name,
                                        viewpath: lcviewpath,
                                        widgetName: lcwidgetName,
                                        menu_id: value.menu_id,
                                        handler: function (ee) {
                                            console.log(ee.text, ee.viewpath)
                                            if (ee.widgetName == "systemlogin") {
                                                user_login();
                                                return;
                                            }
                                            if (ee.widgetName == "systemreset") {

                                                system_setting();
                                                return;
                                            }
                                            if (ee.widgetName == "changepassword") {

                                                change_password();
                                                return;
                                            }


                                            if (ee.viewpath) {
                                                Ext.getCmp("maintabpanel").removeAll();
                                                mainApp.widget(ee.viewpath, ee.widgetName, ee.text);
                                            }
                                        }
                                    })
                                }
                            }
                        }

                    });
                    //**********************************
                    if (m > 0) {
                        items.push({
                            text: cbarmenu,
                            menu: submenu
                        });
                    }


                }

            });
            //mainApp
            Ext.getCmp('main_north').removeAll();
            Ext.getCmp('main_north').add({ xtype: 'panel', tbar: items })
            //mainapp.down('#menubar').removeAll();
            //mainapp.down('#menubar').add({xtype: 'panel',tbar: items})
        },
        failure: function (req) {
            alert("failure:" + req.responseText);
        }
    });

}



function fndisplayhelp(lctitle) {
    app_helptitle = lctitle;
    app_admin = 1;
    if (app_admin == 1) {
        LoadJS('js/displayedithelp.js');
        return;
    } else {
        LoadJS('js/displayhelp.js');
    }
}

function loadModel(url, tab, id) {
    var model;

    Ext.Ajax.request({
        method: 'GET',
        url: url,
        scope: this,
        success: function (response) {
            //	this[id] = eval(response.responseText);
            current_tab = tab;
            current_newid = id;
            eval(response.responseText);
            //test(tab,id);
            return 1;
        },
        //  this.loadMask.hide();
        failure: function (response, opt) {
            //	console.log(opt);
            //	console.log(response);
            Ext.Msg.alert('错误', '发生错误！');
            return 0;
        }

    });
    //Ext.Msg.alert(url, id);
    //}
    return 0;
}

function addTab(url, id, id0, mid) {

    var tabid = "tab_" + mid;
    var tab = Ext.getCmp(tabid);

    url = trim(url);
    if (!tab) {

        tab = id0.add(Ext.create('Ext.panel.Panel', {
            id: tabid,
            closeAction: 'close',
            title: id
        }));
        id0.setActiveTab(tab);
        //加载模块
        return loadModel(url, tab, id);
    } else {
        id0.setActiveTab(tab);
        return 1;
    }

};


trim = function (str) {
    if (str == "")
        return ""
    for (var i = 0; i < str.length && str.charAt(i) == " "; i++);
    for (var j = str.length; j > 0 && str.charAt(j - 1) == " "; j--);
    if (i > j)
        return "";
    return str.substring(i, j);
};

function jsonPCallback() {
    alert("jsonPCallback");
};

lfy = function (str) {
    console.log("lfy");
};
function linfuyang(str) {
    console.log("linfuyang");
};
storeBtnDeleteClick = function (that, grid, store) {
    var rs = grid.getSelectionModel().getSelection();
    console.log(rs[0]);
    store.remove(rs[0]);
    return;

}

//tbar 公共函数
storeFilter = function (store, fieldarray, filter) {
    var regExp = new RegExp(".*" + filter + ".*");
    store.clearFilter();
    store.filterBy(function (record, id) {
        return regExp.test(record.get(fieldarray));
    });
    return false;
}

onStoreSync = function (that, store, ops) {
    //   console.log('onStoreSync');
    store.sync({
        success: function (batch, options) {
            if (ops > 0) {
                store.load();
            }
        },
        failure: function (batch, options) {
            Ext.Msg.alert('提示信息', '添加失败!');
        },
        scope: that
    });
    return false;


}

storeBtnSaveClick = function (that, store) {
    var rs = store.getNewRecords();
    var removers = store.getRemovedRecords();
    oldthis = that;
    if (removers.length > 0) {
        Ext.Msg.confirm('注意', '有记录被删除，继续进行数据保存处理?',
            function (choice) {
                if (choice == 'yes') {
                    //oldthis.onStoreSync(1);
                    onStoreSync(that, store, 1);
                }
            }
        );
    } else {
        onStoreSync(that, store, 0);
    }
    return false;


}

generateGUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
storeBeforeReload = function (that, store) {
    //var store = this.getView().getStore();
    var rs = store.getUpdatedRecords();
    var newrs = store.getNewRecords();
    var removers = store.getRemovedRecords();
    if ((removers.length > 0) || (newrs.length > 0) || (rs.length > 0)) {
        oldthis = that;
        Ext.Msg.confirm('注意', '记录已发生更改，是否先进行数据保存处理?',
            function (choice) {
                if (choice === 'yes') {
                    //oldthis.onStoreSync(store, 1);
                    onStoreSync(that, store, 1);
                    return true;
                }
                else {
                    oldthis.onBtnUndoClick();
                }
            }
        );
        return false;
    } else {
        return true;
    }
}
getcookie = function () {


    var Cookiecp = Ext.create('Ext.state.CookieProvider');
    sys_enterprise_code = Cookiecp.get('sys_enterprise_code');
    if (!loginusername) {
        sys_enterprise_code = "1";
    }





    var Cookiecp = Ext.create('Ext.state.CookieProvider');
    var loginusername = Cookiecp.get('username');
    if (!loginusername) {
        loginusername = "";
    }
    var obj = { username: loginusername, password: "" };
    sys_userInfo = obj;// base64encode(Ext.encode( obj2str(obj)));
    //console.log(sys_userInfo);
    sys_guid = Cookiecp.get('system_guid');
    if (!sys_guid) {
        sys_guid = generateGUID();
        var Cookiecpsave = new Ext.state.CookieProvider({
            expires: new Date(new Date().getTime() + 120 * (1000 * 60 * 60 * 24 * 30))
        });
        Cookiecpsave.set('system_guid', sys_guid);
    }

    sys_system_id = parseInt(Cookiecp.get('sys_system_id'));
    sys_system_name = Cookiecp.get('sys_system_name');
    if (sys_system_id == undefined) {
        sys_system_id = 0;
        sys_system_name = '';
    }


    sys_location_id = parseInt(Cookiecp.get('sys_location_id'));//1
    sys_location_name = Cookiecp.get('sys_location_name');
    sys_location_areas = parseInt(Cookiecp.get('sys_location_areas'));
    if (sys_location_id == undefined) {
        sys_location_id = 0;
        sys_location_name = '';
    }
    if (sys_location_areas == 0) {
        sys_location_areas = 1;
    }


    sys_customer_id = parseInt(Cookiecp.get('sys_customer_id'));//4
    sys_customer_name = Cookiecp.get('sys_customer_name');
    if (sys_customer_id == undefined) {
        sys_customer_id = 0;
        sys_customer_name = '';
    }
    sys_enterprise_code = Cookiecp.get('sys_enterprise_code');//4
    sys_enterprise_name = Cookiecp.get('sys_enterprise_name');
    if (sys_enterprise_name == undefined) {
        sys_enterprise_code = '';
        sys_enterprise_name = '';
    }

    // console.log('location:',sys_location_id,sys_location_name,sys_location_areas);
    //console.log('khbm:',sys_customer_id,sys_customer_name);

}

/*

Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'layout-border',
    requires: [
        'MyApp.view.main.MainController'
       // , 'Ext.window.Window'
    ],
    title: 'system',
    controller: "main",
    layout: 'border',
    defaults: {
        collapsible: false,
        border: 1,
        margin: '0 0 0 0'
    },
    items: [
    {
        xtype: "tabpanel",
        region: 'center',
        autoDestroy: false,
        id: "maintabpanel",
        defaults: {
            layout: 'fit',
            border: 1,
            closeAction: 'destroy',
            closable: true
        },
        items: [
            {
                xtype: 'panel',
                title: "主页",
                closable: false
            }
        ]
    }

    ]


});


*/


Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel'
    ],
    controller: 'main',
    viewModel: 'main',
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    layout: 'fit',
    /*header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },
    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },*/
    /*
        responsiveConfig: {
            tall: {
                headerPosition: 'top'
            },
            wide: {
                headerPosition: 'left'
            }
        },
    
        defaults: {
            bodyPadding: 20,
            tabConfig: {
                plugins: 'responsive',
                responsiveConfig: {
                    ////  wide: {
                    //     iconAlign: 'left',
                    //     textAlign: 'left'
                    // },
                    tall: {
                        iconAlign: 'top',
                        textAlign: 'center',
                        width: 120
                    }
                }
            }
        },
    */
    layout: 'border',
    items: [
        {
            xtype: 'panel',
            region: 'north',
            id: 'main_north',
            height: 45,
            resize: false,
            border: 0
        },
        {
            xtype: "tabpanel",
            region: 'center',
            autoDestroy: false,
            id: "maintabpanel",
            defaults: {
                layout: 'fit',
                border: 1,
                closeAction: 'destroy',
                closable: true
            },
            items: [
                {
                    xtype: 'panel',
                    title: "主页",
                    closable: false
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'south',
            height: 40,
            html: '<p>Footer content</p>'
        }


    ]

});
