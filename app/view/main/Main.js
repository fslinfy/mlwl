function treeSelect(mc, the, kcbz, viewname, resh, callback) {
    this.callback = callback;
    this.mc = mc;
    var khid=sys_customer_id
    this.viewname = viewname;
    var height = 440;
    var url = '';
    switch (mc) {
        case "ckmc":
            url = sys_ActionPHP + '?act=locationselecttreelist';
            this.f_id = 'ckid';
            this.f_mc = 'ckmc';
            height = 300;
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
            url = sys_ActionPHP + '?act=packingselecttreelist&gfbz=0';
            this.f_id = 'bzid';
            khid=sys_current_khid;
            this.f_mc = 'bzmc';
            break;
        case "bzmc1":
            url = sys_ActionPHP + '?act=packingselecttreelist&gfbz=1';
            this.f_id = 'bzid';
            this.f_mc = 'bzmc';
            khid=sys_current_khid
            break;            
        case "work":
            var khid = kcbz.khid;
            var bzid = kcbz.bzid;
            url = sys_ActionPHP + '?act=khworkselecttreelist&khid=' + khid + '&bzid=' + bzid;
            this.f_id = 'workid';
            this.f_mc = 'workmc';
            kcbz = '';
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
                p_c_id: khid,
                displayall: kcbz
            }
        },

        root: {
            id: "",
            code: "",
            py_code: "",
            text: '全部',
            expanded: true

        }

    });

    var selecttree = Ext.create('Ext.tree.Panel', {
        singleExpand: true,
        rootVisible: false,
        draggable: false,
        useArrows: true,
        lines: true,
        expanded: true,
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
        height: height,
        title: '请选择：',
        plain: true,
        resizable: false,
        frame: true,
        modal: true,
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
            //  console.log("viewname",viewname,viewname.length)
            if (viewname.id) {
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
            } else {

                //   console.log(node.data.id, node.data.text);
                sys_location_id = node.data.id;

                logingl();


            }

        }

    };
}

function change_password() {

    apploginWin = new Ext.Window({
        width: 360,
        height: 420,
        title: '密码更改',
        plain: true,
        resizable: false,
        frame: true,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        items: [apploginForm = new Ext.form.FormPanel({
            labelAlign: 'left',
            buttonAlign: 'center',
            bodyStyle: 'padding:5px',
            frame: true,
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
                    hidden: true,
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
                    mixLength: 4,
                    maxLength: 20,
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
                    mixLength: 4,
                    maxLength: 20,
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
                    mixLength: 4,
                    maxLength: 20,
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
                    regex: /^[A-Za-z0-9]+$/,
                    mixLength: 4,
                    maxLength: 6,
                    //  value: '1234',
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
                    padding: '0 5 10 5',
                    html: '<div style="margin:5px 0px 0px 65px"><a href="#"><img id="loginvcode" alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)"  id="code" height="82" width="292" src="vcode.php" border="0"></a></div>',
                    border: false
                }, {
                    xtype: 'displayfield',
                    height: 30,
                    padding: '0 5 10 5',
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

                /*   Ext.toast({
                       html: "两次新密码输入不一致！",
                       closable: true,
                       title: '注意！',
                       align: 't',
                       slideInDuration: 200,
                       minWidth: 400
                   });
                   */
                //Ext.Msg.alert('注意！', "两次新密码输入不一致！");
                Ext.toast.msg('注意！', '两次新密码输入不一致！');
                //  Ext.MessageBox.alert('注意！', '两次新密码输入不一致！');
                var obj = apploginForm.form.findField("newpassword2");
                if (obj) {
                    obj.focus();
                }
                return;

            }
            apploginForm.form.doAction('submit', {
                url: 'checkloginp.php',
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
                        obj['password'] = base64encode(psw2);
                        sys_userInfo = obj;
                    } else {
                        if (parseInt(result.userid) < 0) {
                            Ext.toast.msg('注意！', result.username);
                            var obj = apploginForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            apploginWin.destroy();
                            Ext.MessageBox.alert('注意！', result.username);
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.MessageBox.alert('注意！', action.result.data.username);
                }
            });
        }
    }
    appchangeCode = function (obj) {
        if ((obj == 0) && (apploginWin.hasvcode)) return;

        apploginWin.hasvcode = true;
        var d = new Date();
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
    Ext.getCmp("maintabpanel").removeAll();
    pagereset();
    var appid = 1;
    if ((sys_system_id == 'NaN') || (!sys_system_id)) sys_system_id = '1'
    //  console.log("system_setting", sys_system_id);
    if (sys_customer_id > 0) appid = 2;
    appsettingWin = new Ext.Window({
        width: 360,
        height: 400,
        title: '系统设置',
        plain: true,
        modal: true,
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
                        id: "_appid",
                        fieldLabel: '选择应用',
                        padding: '20 20 10 20',
                        store: [[1, '仓储业务管理'], [2, '客户业务管理']],
                        queryMode: 'local',
                        editable: false,
                        allowBlank: false,
                        value: appid,
                        listeners: {
                            'change': function (me, newValue, oldValue) {
                                // console.log(newValue);
                                if (newValue == 1) {
                                    Ext.getCmp("_systemid").setFieldLabel("仓库ID")
                                }
                                else {
                                    Ext.getCmp("_systemid").setFieldLabel("客户ID")
                                }


                            }

                        }

                    },

                    {
                        name: 'systemcode',
                        id: '_systemcode',
                        fieldLabel: '企业代码',
                        padding: '10 20 10 20',
                        hidden: true,
                        allowBlank: true,
                        value: sys_enterprise_code,
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = appsettingForm.form.findField("_systemid");
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
                        id: '_systemid',
                        fieldLabel: '仓库ID',
                        padding: '0 20 10 20',
                        value: sys_system_id,
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = appsettingForm.form.findField("_VerifyCode");
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
                        id: '_VerifyCode',
                        padding: '0 20 10 20',
                        fieldLabel: '验证码 ',
                        regex: /^[A-Za-z0-9]+$/,
                        mixLength: 4,

                        maxLength: 6,
                        // value: '1234',
                        listeners: {
                            keypress: function (field, e) {
                                if (e.getKey() == 13) {
                                    var obj = Ext.getCmp("_syssubmitButton");
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
                        padding: '0 5 10 5',
                        html: '<div style="margin:5px 0px 0px 65px"><a href="#"><img  id="_loginvcode"  alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)" id="code" height="82" width="292" src="vcode.php" border="0" ></a></div>',
                        border: false
                    }, {
                        xtype: 'displayfield',
                        height: 30,
                        padding: '0 5 10 5',
                        value: '<div style="margin:5px 0px 0px 80px;color:red">(如果图片不清晰请单击图片更换图片)</div>'
                    }],
                buttons: [{
                    id: "_syssubmitButton",
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

            var systemid = Ext.getCmp("_systemid").getValue();
            var appid = Ext.getCmp("_appid").getValue();
            //  console.log(appid, systemid,Ext.getCmp("systemcode").getValue());
            // return;

            appsettingForm.form.doAction('submit', {
                url: 'checkloginp.php',
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
                        // CheckIsInstall();
                        user_login();

                    } else {
                        if (parseInt(result.userid) < 0) {
                            /* Ext.toast({
                                 html: "验证码错误！",
                                 closable: true,
                                 title: '注意！',
                                 align: 't',
                                 slideInDuration: 200,
                                 minWidth: 400
                             });
                             */
                            Ext.toast.msg('注意！', ' 验证码错误！');
                            //Ext.MessageBox.alert('注意！', ' 验证码错误！');
                            var obj = appsettingForm.form.findField("_VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            appsettingWin.destroy();

                            Ext.MessageBox.alert('注意！', result.username);


                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.MessageBox.alert('注意!!', action.result.data.username);
                }
            });
        }
    }
    appchangeCode = function (obj) {
        if ((obj == 0) && (appsettingWin.hasvcode)) return;

        appsettingWin.hasvcode = true;
        var d = new Date();
        //document.getElementById('loginvcode').src = sys_WebUrl + "/vcode.php?d=" + d;
        document.getElementById('_loginvcode').src = "vcode.php?d=" + d;
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
                fieldLabel: '用户ID',
                padding: '20 20 10 20',
                allowBlank: false,
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
                mixLength: 4,
                maxLength: 20,
                //  value: "8888",
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
                mixLength: 4,
                maxLength: 6,
                regex: /^[A-Za-z0-9]+$/,
                // value: '1234',
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
                //border:1,
                padding: '0 5 10 5',
                html: '<div  style="margin:5px 0px 0px 65px"><a href="#"><img id="loginvcode" alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)" onload="javascript:appchangeCode(0)"   id="code" height="82" width="292" src="vcode.php" border="0"></a></div>',
                border: false
            }, {
                xtype: 'displayfield',
                height: 30,
                padding: '0 5 10 5',
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
    //  console.log("111111111 0");
    apploginWin = new Ext.Window({
        width: 360,
        height: 400,
        title: sys_system_name + '(用户登录）',
        plain: true,
        resizable: false,
        frame: true,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        /*
        tools: [{
            type: 'refresh',
            tooltip: 'system setting',
            handler: function () {
                //this.up("#LeftTree").getStore().reload();
                //console.log('system setting');
                system_setting();
            }
        }],*/
        items: [apploginForm]
    }
    ).show();

    // console.log("111111111 1");
    appsubmit = function () {
        if (apploginForm.form.isValid()) {
            var loginname = Ext.getCmp("username").getValue();
            if ((sys_customer_id == 0) && (loginname.length == 0)) {

                Ext.MessageBox.alert('注意！', " 请输入用户名称或用户ID！");
                return;
            }


            var psw = base64encode(Ext.getCmp("password").getValue());
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
                    console.log(result);
                    if (parseInt(result.userid) > 0) {
                        var lidstring = result.lidstring;
                        sys_system_menustring = lidstring;
                        var obj = { username: result.username, password: psw, userid: result.userid, khsystem: result.khsystem };
                        sys_userInfo = obj;
                        var cp0 = new Ext.state.CookieProvider({
                            expires: new Date(new Date().getTime() + 120 * (1000 * 60 * 60 * 24 * 30))
                        });
                        sys_system_cwsh = parseInt(result.cwsh);
                        sys_system_sh = parseInt(result.sh);
                        sys_system_edit = parseInt(result.edit);
                        sys_system_del = parseInt(result.del);
                        sys_system_new = parseInt(result.new);
                        sys_system_lastdel = parseInt(result.lastdel);
                        // sys_location_areas=parseInt(result.areas);
                        //sys_system_system = result.system;
                        cp0.set('userid', result.userid);
                        cp0.set('username', result.username);
                        apploginWin.destroy();
                        //   console.log(Tongji(lidstring, ','), lidstring, Tongji('', ','));
                        if ((loginname.length > 0) && (sys_customer_id == 0)) {
                            if (Tongji(lidstring, ',') != 2) {
                                treeSelect('ckmc', this, lidstring, '', true);
                                return;
                            }
                            sys_location_id = lidstring.replace(",", "");
                            sys_location_id = sys_location_id.replace(",", "");
                            cp0.set('sys_location_id', sys_location_id);
                            logingl()
                        } else {
                            // console.log("createmenu");
                            createmenu();
                        }
                    } else {
                        if (parseInt(result.userid) < 0) {
                            Ext.toast.msg('注意！', ' 验证码错误！');

                            /* Ext.toast({
                                 html: "验证码错误！",
                                 closable: true,
                                 title: '注意！',
                                 align: 't',
                                 slideInDuration: 200,
                                 minWidth: 400
                             });*/

                            // Ext.Msg.alert('注意！', ' 验证码错误！');

                            var obj = apploginForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            apploginWin.destroy();
                            Ext.MessageBox.alert('注意！',result.username );
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.MessageBox.alert('注意!!', "用户登录失败！！");
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


}

function vip_login() {


    getcookie();

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
                fieldLabel: '客户ID',
                padding: '20 20 10 20',
                allowBlank: true,
                // value: sys_userInfo.username,
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
                name: 'smsphone',
                //inputType: 'password',
                id: 'smsphone',
                validationOnChange: false,
                padding: '0 20 10 20',
                fieldLabel: '手机号码',
                mixLength: 4,
                maxLength: 20
            },
            {
                name: 'smsbutton',
                xtype: 'button',
                //inputType: 'password',
                id: 'smsbutton',
                validationOnChange: false,
                margin: '0 20 5 80',

                text: '发送验证码',
                handler: function () {
                    var id = Ext.getCmp("username").value;
                    var sms = Ext.getCmp("smsphone").value;
                    console.log('发送验证码', id, sms);

                    Ext.Ajax.request({
                        url: 'smsvcode.php',
                        method: 'GET',
                        waitTitle: '请稍候',
                        waitMsg: '正在发送短信......',
                        params: {
                            username: id,
                            smsphone: sms
                        },
                        success: function (response) {

                            //console.log(response);
                            var result = Ext.util.JSON.decode(response.responseText);
                            //console.log(result1);
                            //var result = result1.data;
                            //console.log(result,result["result"],result.result);
                            if (result["result"] == "success") {
                                //Ext.MessageBox.alert('注意！', "</br></br>验证码已发到你的手机上，请在下面输入验证码再提交！</br></br>");
                                Ext.getCmp("smsbutton").setText("重发送验证码");
                                Ext.getCmp("VerifyCode").setDisabled(false);
                            } else {
                                Ext.MessageBox.alert('注意！', result["result"]);
                            }


                        },
                        failure: function (req) {
                            console.log(req);
                            //alert("failure:" + req.responseText);
                        }
                    }
                    )




                }
            }, {
                name: 'VerifyCode',
                id: 'VerifyCode',
                padding: '20 20 10 20',
                fieldLabel: '验证码 ',
                disabled: true,
                mixLength: 4,
                maxLength: 6,
                regex: /^[A-Za-z0-9]+$/,
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
            }/*,
            {
                xtype: 'box',
                height: 80,
                //border:1,
                padding: '0 5 10 5',
                html: '<div  style="margin:5px 0px 0px 65px"><a href="#"><img id="loginvcode" alt="如果图片不清晰请单击图片更换图片。" onclick="javascript:appchangeCode(1)" onload="javascript:appchangeCode(0)"   id="code" height="82" width="292" src="vcode.php" border="0"></a></div>',
                border: false
            }, {
                xtype: 'displayfield',
                height: 30,
                padding: '0 5 10 5',
                value: '<div style="margin:5px 0px 0px 80px;color:red">(如果图片不清晰请单击图片更换图片)</div>'

            }*/
        ],
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
    //  console.log("111111111 0");
    apploginWin = new Ext.Window({
        width: 360,
        height: 400,
        title: '客户维护登录',
        plain: true,
        resizable: false,
        frame: true,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        items: [apploginForm]
    }
    ).show();
    appsubmit = function () {
        if (apploginForm.form.isValid()) {
            var loginname = Ext.getCmp("username").getValue();
            var smsphone = Ext.getCmp("smsphone").getValue();

            if ((smsphone.length == 0) && (loginname.length == 0)) {
                Ext.MessageBox.alert('注意！', " 请输入用客户ID及电话号码！");
                return;
            }
            var psw = base64encode(Ext.getCmp("smsphone").getValue());
            apploginForm.form.doAction('submit', {
                url: 'checkloginp.php',
                method: 'post',
                waitTitle: '请稍候',
                waitMsg: '正在登录......',

                params: {
                    act: "vipsystemlogin",
                    sys_guid: sys_guid
                },

                success: function (form, action) {
                    var result = action.result.data;

                    if (parseInt(result.userid) > 0) {

                        var obj = { username: "", password: psw, userid: result.userid, khsystem: "1" };
                        sys_userInfo = obj;

                        sys_customer_id = result.userid;
                        apploginWin.destroy();

                        // if (loginname.length > 0)  {
                        //   logingl()
                        // } else {
                        createmenu();
                        // }
                    } else {
                        if (parseInt(result.userid) < 0) {
                            Ext.toast.msg('注意！', ' 验证码错误！');
                            var obj = apploginForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            apploginWin.destroy();
                            Ext.MessageBox.alert('注意！', result.username);
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.MessageBox.alert('注意!!', action.result.data.username);
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
        //  document.getElementById('loginvcode').src = "vcode.php?d=" + d;



    }
    setTimeout(function () {
        //Ext.get('loading').remove();
        //	Ext.get('loading-mask').fadeOut({
        //	remove : true
        //	});
    }, 250);


}

function useractive() {



    appuseractiveForm = new Ext.form.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px',
        frame: true,

        defaults: {
            xtype: 'textfield',
            allowBlank: false,
            anchor: '97%',
            enableKeyEvents: true,
            labelWidth: 80
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
                name: 'khid',
                id: 'khid',
                fieldLabel: '客户ID',
                padding: '20 20 10 20',
                allowBlank: true,
                // value: sys_userInfo.username,
                listeners: {
                    keypress: function (field, e) {
                        if (e.getKey() == 13) {
                            var obj = appuseractiveForm.form.findField("userid");
                            if (obj) {
                                obj.focus();
                            }
                        }
                        //appchangeCode(0);
                    }
                }

            },
            {
                name: 'useri',
                id: 'userid',
                fieldLabel: '用户ID',
                padding: '20 20 10 20',
                allowBlank: false,
                listeners: {
                    keypress: function (field, e) {
                        if (e.getKey() == 13) {
                            var obj = appuseractiveForm.form.findField("smsphone");
                            if (obj) {
                                obj.focus();
                            }
                        }
                        //  appchangeCode(0);
                    }
                }

            }, {
                name: 'smsphone',
                //inputType: 'password',
                id: 'smsphone',
                validationOnChange: false,
                allowBlank: false,
                padding: '0 20 10 20',
                fieldLabel: '手机号码',
                value:'',
                mixLength: 4,
                maxLength: 20
            },
            {
                name: 'smsbutton',
                xtype: 'button',
                //inputType: 'password',
                id: 'smsbutton',
                validationOnChange: false,
                margin: '0 20 5 100',

                text: '发送验证码',
                handler: function () {
                    var userid = Ext.getCmp("userid").value;
                    var khid = Ext.getCmp("khid").value;
                    var sms = Ext.getCmp("smsphone").value;
                    Ext.Ajax.request({
                        url: 'smsactivevcode.php',
                        method: 'GET',
                        waitTitle: '请稍候',
                        waitMsg: '正在发送短信......',
                        params: {
                            khid: khid,
                            userid: userid,
                            smsphone: sms
                        },
                        success: function (response) {
                            var result = Ext.util.JSON.decode(response.responseText);
                            console.log(result);
                            if (result["result"] == "success") {
                                //Ext.MessageBox.alert('注意！', "</br></br>验证码已发到你的手机上，请在下面输入验证码再提交！</br></br>");
                                Ext.getCmp("smsbutton").setText("重发送验证码");
                                Ext.getCmp("VerifyCode").setDisabled(false);
                                Ext.getCmp("newpassword1").setDisabled(false);
                                Ext.getCmp("submitButton").setDisabled(false);
                                Ext.getCmp("newpassword2").setDisabled(false);
                            } else {
                                Ext.MessageBox.alert('注意！', result["result"]);
                            }

                        },
                        failure: function (req) {
                            console.log(req);
                            //alert("failure:" + req.responseText);
                        }
                    }
                    )
                }
            }, {
                name: 'VerifyCode',
                id: 'VerifyCode',
                padding: '20 20 10 20',
                fieldLabel: '验证码 ',
                disabled: true,
                allowBlank: false,
                mixLength: 4,
                maxLength: 6,
                regex: /^[A-Za-z0-9]+$/,
                listeners: {
                    keypress: function (field, e) {
                        if (e.getKey() == 13) {
                            var obj = Ext.getCmp("newpassword2");
                            if (obj) {
                                obj.focus();
                                // appsubmit();
                            }
                        }
                    }
                }
            },
            {
                name: 'newpassword1',
                inputType: 'password',
                id: 'newpassword1',
                padding: '0 20 10 20',
                fieldLabel: '输入新密码',
                disabled: true,
                allowBlank: false,
                mixLength: 4,
                maxLength: 20,
                listeners: {
                    keypress: function (field, e) {
                        if (e.getKey() == 13) {
                            var obj = apploginForm.form.findField("newpassword2");
                            if (obj) {
                                obj.focus();
                            }
                        }
                        //  appchangeCode(0);
                    }
                }

            },
            {
                name: 'newpassword2',
                inputType: 'password',
                id: 'newpassword2',
                padding: '0 20 10 20',
                fieldLabel: '复核新密码',
                disabled: true,
                allowBlank: false,
                mixLength: 4,
                maxLength: 20,
                listeners: {
                    keypress: function (field, e) {
                        if (e.getKey() == 13) {
                            var obj = apploginForm.form.findField("submitButton");
                            if (obj) {
                                appsubmit();
                            }
                        }
                        //   appchangeCode(0);
                    }
                }
            },
        ],
        buttons: [{
            id: "submitButton",
            text: '确认',
            disabled: true,
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
                appuseractiveForm.form.reset()
            }
        }
        ]
    })
    //  console.log("111111111 0");
    appuseractiveWin = new Ext.Window({
        width: 400,
        height: 500,
        title: '用户密码设置',
        plain: true,
        resizable: false,
        frame: true,
        modal: true,
        layout: 'fit',
        closeAction: 'destroy',
        border: false,
        hasvcode: false,
        items: [appuseractiveForm]
    }
    ).show();
    appsubmit = function () {
        if (appuseractiveForm.form.isValid()) {
            var khid = Ext.getCmp("khid").getValue();
            var userid = Ext.getCmp("userid").getValue();
            var smsphone = Ext.getCmp("smsphone").getValue();

            if ((smsphone.length == 0) && (useractivename.length == 0)) {
                Ext.MessageBox.alert('注意！', " 请输入用用户ID及电话号码！");
                return;
            }

            var psw1 = Ext.getCmp("newpassword1").getValue();
            var psw = Ext.getCmp("newpassword2").getValue();

            if (psw1 == psw) { } else {
                Ext.MessageBox.alert('注意！', " 前后两次输入密码不一致！");
                return;
            }



            appuseractiveForm.form.doAction('submit', {
                url: 'checkloginp.php',
                method: 'post',
                waitTitle: '请稍候',
                waitMsg: '正在登录......',

                params: {
                    act: "vipuseractive",
                    sys_guid: sys_guid,
                    userid: userid,
                    khid: khid,
                    psw: psw1
                },

                success: function (form, action) {
                    var result = action.result.data;
                   //  console.log(result);

                    if (parseInt(result.userid) > 0) {

                        window.location=window.location.href;

                       // appuseractiveWin.destroy();
                       // if (sys_system_name == "" || sys_system_name == undefined) {
                       //     system_setting();
                       // } else {
                       //     user_login();
                       // }
                    } else {
                        if (parseInt(result.userid) < 0) {
                            Ext.toast.msg('注意！', ' 验证码错误！');
                            var obj = appuseractiveForm.form.findField("VerifyCode");
                            if (obj) {
                                obj.focus();
                            }
                        } else {
                            appuseractiveWin.destroy();
                            Ext.MessageBox.alert('注意！',result.username);
                            pagereset();
                        }
                    }

                },
                failure: function (form, action) {
                    var result = action.result.data;
                    Ext.MessageBox.alert('注意!!', action.result.data.username);
                }
            });
        }
    }
    // console.log("111111111 2");
    appchangeCode = function (obj) {
        if ((obj == 0) && (appuseractiveWin.hasvcode)) return;

        appuseractiveWin.hasvcode = true;
        var d = new Date();
        //document.getElementById('useractivevcode').src = sys_WebUrl + "/vcode.php?d=" + d;
        //  document.getElementById('useractivevcode').src = "vcode.php?d=" + d;



    }
    setTimeout(function () {
        //Ext.get('loading').remove();
        //	Ext.get('loading-mask').fadeOut({
        //	remove : true
        //	});
    }, 250);


}





function logingl() {

    // console.log("logingl", sys_location_id, sys_customer_id);

    if (sys_location_id > 0) {
        Ext.Ajax.request({
            url: sys_ActionPHP,
            method: 'GET',
            waitTitle: '请稍候',
            waitMsg: '正在保存设置......',
            params: {
                act: "systemsetting",
                sys_guid: sys_guid,
                appid: 1,
                systemcode: sys_enterprise_code,
                p_l_id: sys_location_id,
                systemid: sys_location_id
            },
            success: function (response) {
                var result1 = Ext.util.JSON.decode(response.responseText);

                var result = result1.data;

                sys_location_name = result.username;
                sys_area_store.removeAll();


                var str = result.L_area;
                sys_location_area = "";
                if (str.length == 0) str = "";
                var arr = str.split(",")
                sys_location_areas = arr.length;

                Ext.Array.forEach(arr, function (str, index, array) {
                    if (index == 0) {
                        sys_location_area = str;
                    }
                    var area = {};
                    area["area"] = str;
                    sys_area_store.add(area);

                })
                sys_system_name = sys_location_name;
                var Cookiecp = Ext.create('Ext.state.CookieProvider');
                var Cookiecpsave = new Ext.state.CookieProvider({
                    expires: new Date(new Date().getTime() + 120 * (1000 * 60 * 60 * 24 * 30))
                });
                Cookiecpsave.set('sys_location_name', sys_location_name);
                Cookiecpsave.set('sys_location_id', sys_location_id);
                Cookiecpsave.set('sys_location_area', sys_location_area);
                Cookiecpsave.set('sys_system_name', sys_system_name);
                createmenu();
            },
            failure: function (req) {
                Console.LOG(req.responseText);
                //alert("failure:" + req.responseText);
            }
        }
        )

    }
    else {
        createmenu();

    }
}
function pagereset() {


    Ext.getCmp('main_north').removeAll();
    var items = [{
        xtype: "displayfield",
        value: sys_enterprise_name + "->" + sys_system_name
    }, "->",
    {
        xtype: "button",
        text: '登录',
        cls: "x-btn-text-icon",
        scope: this,
        handler: function () {
            if (sys_system_name == "" || sys_system_name == undefined) {
                system_setting();
            } else {
                user_login();
            }
        }
    },
    {
        xtype: "button",
        text: '设置',
        cls: "x-btn-text-icon",
        scope: this,
        handler: function () {
            system_setting();
        }
    },
    {
        xtype: "button",
        text: '用户激活',
        cls: "x-btn-text-icon",
        scope: this,
        handler: function () {
            useractive();
        }
    },
    {
        xtype: "button",
        text: 'VIP',
        cls: "x-btn-text-icon",
        scope: this,
        handler: function () {
            vip_login();
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

    var cp = Ext.create('Ext.state.CookieProvider');
    var appid = cp.get('apptypeid');
    //if (!appid)
    //   {
    //     return;
    // }

    var URL = sys_ActionPHP + '?act=menusystemlist&termtype=classic&appid=' + appid + "&userInfo=" + base64encode(Ext.encode(obj2str(sys_userInfo)));//+"&khsystem="+sys_userInfo.khsystem;
    //  console.log("url",URL);
    Ext.Ajax.request({
        url: URL,
        scriptTag: true,
        method: 'GET',
        // extraParams: {
        //  act:'menusystemlist',
        //  userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        //  appid:appid,
        //  termtype:'classic'
        // khsystem:userInfo.khsystem
        //},
        scope: this,
        dataType: 'JSONP',
        success: function (req) {
            var data = req.responseText;
            data = data.substring(1);
            // console.log(data,URL);
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
                                            //   console.log(ee.text, ee.viewpath)
                                            if (ee.widgetName == "systemlogin") {
                                                var arr = Ext.getCmp("maintabpanel").items.items;

                                                Ext.Array.forEach(arr, function (obj, index, array) {
                                                    if (obj.id != "mainhtml") {
                                                        //     console.log(obj.id,Ext.getCmp(obj.id));
                                                        if (Ext.getCmp(obj.id)) {
                                                            Ext.getCmp(obj.id).destroy();
                                                        }
                                                    }
                                                });
                                                // pagereset();
                                                user_login();
                                                return;
                                            }
                                            if (ee.widgetName == "systemreset") {
                                                var arr = Ext.getCmp("maintabpanel").items.items;

                                                Ext.Array.forEach(arr, function (obj, index, array) {
                                                    if (obj.id != "mainhtml") {
                                                        //    console.log(obj.id, Ext.getCmp(obj.id));
                                                        if (Ext.getCmp(obj.id)) {
                                                            Ext.getCmp(obj.id).destroy();
                                                        }
                                                    }
                                                });

                                                // pagereset();
                                                system_setting();
                                                return;
                                            }
                                            if (ee.widgetName == "changepassword") {

                                                change_password();
                                                return;
                                            }


                                            if (ee.viewpath) {
                                                var arr = Ext.getCmp("maintabpanel").items.items;

                                                Ext.Array.forEach(arr, function (obj, index, array) {
                                                    if (obj.id != "mainhtml") {
                                                        /// Ext.getCmp(obj.id).destroy();
                                                        // console.log(obj.id, Ext.getCmp(obj.id));
                                                        if (Ext.getCmp(obj.id)) {
                                                            Ext.getCmp(obj.id).destroy();
                                                        }
                                                    }
                                                });

                                                //  Ext.getCmp("maintabpanel").removeAll();
                                                console.log(ee.viewpath, ee.widgetName, ee.text);
                                                mainApp.widget(ee.viewpath, ee.widgetName, ee.text);
                                            } else {
                                                Ext.MessageBox.alert('提示', '页面在建中.....');
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
            Ext.getCmp('main_north').add({ xtype: 'panel', tbar: items });

            Ext.getCmp('maintabpanel').removeAll();
            Ext.getCmp('maintabpanel').add(
                {
                    xtype: 'panel',
                    title: "主页",
                    id: "mainhtml",
                    closable: false,
                    loader: {
                        url: 'page/main.htm',
                        autoLoad: true
                    }
                }
            );
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
            Ext.MessageBox.alert('错误', '发生错误！');
            return 0;
        }

    });
    //Ext.MessageBox.alert(url, id);
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
            closeAction: 'destroy',
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
printsl = function (sl) {
    if (sl == 0) {
        return "";
    } else {
        return sl;
    }
};

trim = function (str) {
    if ((str == "") || (str == null) || (str == undefined))
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
    // console.log("lfy");
};
function linfuyang(str) {
    // console.log("linfuyang");
};
storeBtnDeleteClick = function (that, grid, store) {
    var rs = grid.getSelectionModel().getSelection();
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
            Ext.MessageBox.alert('提示信息', '添加失败!');
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
        Ext.MessageBox.confirm('注意', '有记录被删除，继续进行数据保存处理?',
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
        Ext.MessageBox.confirm('注意', '记录已发生更改，是否先进行数据保存处理?',
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
testlodop = function () {
    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_名片");
    LODOP.ADD_PRINT_RECT(10, 55, 360, 220, 0, 1);
    LODOP.SET_PRINT_STYLE("FontSize", 11);
    LODOP.ADD_PRINT_TEXT(20, 180, 100, 25, "郭德强");
    LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书");
    LODOP.SET_PRINT_STYLEA(2, "FontSize", 15);
    LODOP.ADD_PRINT_TEXT(53, 187, 75, 20, "科学家");
    LODOP.ADD_PRINT_TEXT(100, 131, 272, 20, "地址：中国北京社会科学院附近东大街西胡同");
    LODOP.ADD_PRINT_TEXT(138, 132, 166, 20, "电话：010-88811888");
    LODOP.PREVIEW();
}

Tongji = function (string1, str) {

    var index = 0, index1 = 0, counts = 0;

    for (var i = 0; i < string1.length && (index1 != -1); i++) {

        index1 = string1.indexOf(str, index);

        index = index1 + 1;

        counts = i;

    }

    return counts;

}


lowMoneyToUp = function (money) {//小写数字金额
    //var u = App.base.Utils,
    //var IntegerNum=0; 
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"),
        cnIntRadice = new Array("", "拾", "佰", "仟"), //基本单位
        cnIntUnits = new Array("", "万", "亿", "兆"), //对应整数部分扩展单位
        cnDecUnits = new Array("角", "分", "毫", "厘"), //对应小数部分单位
        cnInteger = "整", //整数金额时后面跟的字符
        cnIntLast = "圆", //整型完以后的单位
        maxNum = 999999999999999.9999, //最大处理的数字
        IntegerNum, //金额整数部分
        DecimalNum,//金额小数部分
        ChineseStr = "", //输出的中文金额字符串
        parts; //分离金额后用的数组，预定义
    if (!!money)
        money = parseFloat(money);
    else
        return "";
    if (money >= maxNum) {
        //  u.toast('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
        var zeroCount = 0,
            IntLen = IntegerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = IntegerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
        var decLen = DecimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    return ChineseStr;//返回大写人民币金额
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
    //console.log("sys_enterprise_code="+sys_enterprise_code);
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
        sys_enterprise_code = '1';
        sys_enterprise_name = '';
    }


}



Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        // 'Ext.grid.plugin.Exporter',
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
                    //                 id: "mainhtml",
                    closable: false,
                    // html:"dsfjdshfkljdsfkl"
                    loader: {
                        url: 'html/main.htm',
                        autoLoad: true
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'south',
            id: 'main_south',
            //hidden: true,
            //margin: '-20 0 0 0',
            // padding:-20, 
            border: 1,
            height: 35,
            loader: {
                url: 'page/footer.htm',
                autoLoad: true
            }
            //html: '<p>Footer content</p>'
        }


    ]

});
