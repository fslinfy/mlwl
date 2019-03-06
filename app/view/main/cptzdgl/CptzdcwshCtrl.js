var that;
var cptzdmxStore;
var saveCallBack = function (the) {
    var p = the.lookupReference('popupmxShowWindow').getViewModel();
    var mtzid = p.get('tzid');
    the.getView().down("#cptzdshowview").close();
    that.locQuery(the);
}
var tzcwshsaveCallBack = function (th) {
    that.getView().down("#cptzdshowview").close();
    that.locQuery(th);
}

Ext.define('MyApp.view.main.cptzdgl.CptzdcwshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CptzdcwshCtrl',
    requires: [
        'MyApp.view.main.cptzdgl.CptzdcwshView'
    ],
    locQuery: function (the) {
        var v = the.getView().down("#CptzdListGrid").getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        var store = cptzdmxStore;
        store.clearFilter();
        store.proxy.extraParams.loc = "cptzdmxcwsh";
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.ckid = ckid;
        store.load();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        console.log(" help");
        return false;
    },

    init: function () {
        that = this;
        that.viewname = that.getView().down("#CptzdListGrid");
        var v = that.viewname.getViewModel();

        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
        cptzdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cptzdmxStore',
            model: 'MyApp.model.CptzdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cptzdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cptzdmxcwsh",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cptzdmxStore.on("load", function () {

            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.loc = 'cptzdcwsh';
            store.reload();
        });
        that.listmxstore = cptzdmxStore;
        that.liststore = that.viewname.getStore();
        this.locQuery(this);

        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#btnPrintCptzd": {
                click: function () {
                    onPrintCptzd();
                }
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnCptzdOkSave": {
                click: this.onCptzdOkSave
            },
            "#FilterField": {
                change: that.onFilterChange
            }
            ,
            "#btnCptzdmxShowView": {
                click: this.onCptzdshShowView
            },

            "#btnCptzdCancel": {
                click: this.onCptzdcwshCancel
            }

        });

 if (sys_customer_id > 0) {
            that.getView().down('#QueryKhmc').setHidden(true);
            that.getView().down('#QueryCkmc').setHidden(false);
        }else
        {
            that.getView().down('#QueryKhmc').setHidden(false);
            that.getView().down('#QueryCkmc').setHidden(true);
        if (sys_location_id > 0) {
            that.getView().down('#QueryKhmc').setHidden(false);
            that.getView().down('#QueryCkmc').setHidden(true);
        }
        else
        {
            that.getView().down('#QueryKhmc').setHidden(true);
            that.getView().down('#QueryCkmc').setHidden(false);
        }
        }
    },
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('tzdh'));
        });
    },



    onCptzdshShowView: function (button) {
        var rec = button.getWidgetRecord();
       // console.log(rec.data);
        var tzid = rec.data.tzid;
        var record = rec.data;
        record['btnButtonHidden'] = false;
        record['op'] = 'cwsh';
        record['title'] = '商品调账单-财务审核';
        record["w"] = 0;
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({
            xtype: 'formcptzdwindow',
            viewModel: {
                data: record
            },
            session: true
        });

        this.dialog.show();


        var cptzdmx_store = this.lookupReference('cptzdmxShowGrid').getStore();
        // cptzdmx_store.proxy.extraParams.loc = "cptzdmxsh";
        // cptzdmx_store.proxy.extraParams.tzid = tzid;
        // cptzdmx_store.load();



        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.tzid == tzid) {
                cptzdmx_store.add(rec);
            }
        })

        var p = this.lookupReference('popupmxShowWindow');
        p.down("#btnCptzdOkSave").setHidden(!sys_system_cwsh);
        //p.down("#btnCptzdDeleteSave").setHidden(false);
        if (sys_system_cwsh > 0) {

            p.down("#btnCptzdCancel").setHidden(false);
        }
    },

    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    onSelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.viewname, true);
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    onCptzdOkSave: function () {
        this.CptzdshSave('ok', this);
    },
    CptzdshSave: function (loc, the) {
        var p = the.lookupReference('popupmxShowWindow').getViewModel();
        var tzid = p.get('tzid');
        if (tzid == 0) {
            return;
        }

        var msg = "调账单号：" + p.get('tzdh') + "<br>客户名称：" + p.get('khmc');// + "<br>进库日期：" + p.get('tzrq');
        var title = "真的删除此调账单内容？";
        if (loc == 'ok') {
            title = "真的审财务核通过此调账单内容？";
        }
        var abc = Ext.Msg.confirm(title, msg, function (e) {
            if (e == 'yes') {
                AjaxDataSave('cptzdcwshsave', loc, tzid, saveCallBack, the);
            }
        })
    },
    onCptzdcwshCancel: function () {
        var the = this;
        var p = the.lookupReference('popupmxShowWindow').getViewModel();
        var tzid = p.get('tzid');
        if (tzid == 0) {
            return;
        }
        var msg = "调账库单号：" + p.get('tzdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此调账单业务审核内容？";
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "业务审核取消",
                no: "关 闭"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupmxShowWindow').down("#btnCptzdCancel").setDisabled(true);
                    //console.log(tzid,msg);
                    AjaxDataSave('cptzdywshsave', "cancel", tzid, tzcwshsaveCallBack, the);
                }
            }
        });
    }


});



