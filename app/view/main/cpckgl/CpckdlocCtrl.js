var that;
var cpckdmxStore;
var cklocsaveCallBack = function (th) {
    that.getView().down("#cpckdshowview").close();
    that.locQuery(th);
}

Ext.define('MyApp.view.main.cpckgl.CpckdlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpckdlocCtrl',
    requires: [
        'MyApp.view.main.cpckgl.CpckdlocView'
    ],
    locQuery: function (that) {
        console.log("locQuery");
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        var bz = v.get('deletebz');
        if (bz) {
            bz = 1;
        }
        else {
            bz = 0;
        }
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');
        cpckdmxStore.proxy.extraParams.khid = khid;
        cpckdmxStore.proxy.extraParams.l_id = ckid;
        cpckdmxStore.proxy.extraParams.deletebz = bz;
        cpckdmxStore.proxy.extraParams.startdate = d1;
        cpckdmxStore.proxy.extraParams.enddate = d2;
        cpckdmxStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        console.log(" help");
        return false;
    },

    init: function () {
        //console.log("mainTabPanel",mainTabPanel,Ext.getCmp("maintabpanel"));
        // console.log(Math.round(135.25),Math.round(135.25+0.5));

        that = this;
        that.viewname = that.getView().down("#CpckdListGrid");

        var v = that.viewname.getViewModel();
        v.set('start_date', start_date);
        v.set('end_date', end_date);
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
            that.viewname.down('#QueryKhmc').setHidden(false);
            that.viewname.down('#QueryCkmc').setHidden(true);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
            that.viewname.down('#QueryKhmc').setHidden(true);
            that.viewname.down('#QueryCkmc').setHidden(false);
        }
        that.viewname.down('#deletebz').setHidden(false);
        that.viewname.down('#QueryDate').setHidden(false);



        cpckdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpckdmxStore',
            model: 'MyApp.model.CpckdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cpckdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpckdmxloc",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    deletebz: 0,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }

        });

        cpckdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var bz = v.get('deletebz');
            if (bz) {
                bz = 1;
            }
            else {
                bz = 0;
            }

            start_date = v.get('start_date');
            end_date = v.get('end_date');
            var d1 = Ext.Date.format(start_date, 'Y-m-d');
            var d2 = Ext.Date.format(end_date, 'Y-m-d');


            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpckdloc';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.l_id = ckid;
            store.proxy.extraParams.deletebz = bz;
            store.proxy.extraParams.startdate = d1;
            store.proxy.extraParams.enddate = d2;
            store.reload();

        });
        that.listmxstore = cpckdmxStore;
        that.liststore = that.viewname.getStore();
        that.locQuery(this);

        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },
            "#btnHelp": {
                click: that.onBtnHelpClick
            },
            "#FilterField": {
                change: that.onFilterChange
            },
            "#btnQueryKhmc": {
                click: that.onSelectKhbmView
            },
            "#btnPrintCpckd": {
                click: function () {
                    onPrintCpckd();
                }
            },
            "#btnQueryCkmc": {
                click: that.onSelectCkbmView
            },
            "#btnCpckdCancel": {
                click: that.onCpckdlocCancel
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
        that.onBtnQueryClick();
    },
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('ckmc')) || regExp.test(record.get('ckdh')) || regExp.test(record.get('xsdh'));
        });
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

    onCpckdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        var ckid = rec.data.ckid;
        var record = rec.data;
        record['btnButtonHidden'] = true;
        record['title'] = '商品出库单';
        record['op'] = 'loc';
        record['gsop'] = true;
        record["w"] = 0;
        var view = that.getView();
        that.isEdit = false;
        that.dialog = view.add({
            xtype: 'cpckformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        that.dialog.show();

        var p = that.lookupReference('popupCpckdWindow');
        if (sys_customer_id > 0) {
            p.down("#btnPrintCpckd").setHidden(true);
        }
        if ((sys_system_lastdel > 0) && (sys_customer_id == 0)) {
            p.down("#btnCpckdCancel").setHidden(false);
        }
        var cpckdcw_store = that.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.proxy.extraParams.ckid = ckid;
        cpckdcw_store.proxy.extraParams.loc = 'ckid';
        cpckdcw_store.load();
        var cpckdmx_store = that.lookupReference('CpckdmxGrid').getStore();
        cpckdmx_store.on("load", function () {
            var mxid = cpckdmx_store.getAt(0).get('mxid');
            cpckdcw_store.clearFilter();
            cpckdcw_store.filterBy(function (record, id) {
                return record.get('ckmxid') == mxid;
            });
        }
        )
        cpckdmx_store.proxy.extraParams.ckid = ckid;
        cpckdmx_store.load();
        return;
    },
    onCpckdmxItemSelected: function (sender, record) {
        var cpckdcw_store = that.lookupReference('cpckdmxcw0').getStore();
        var mxid = record.data.mxid
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('ckmxid') == mxid;
        });
    },
    onCpckdlocCancel: function () {
        var the = that;
        var p = the.lookupReference('popupCpckdWindow').getViewModel();
        var ckid = p.get('ckid');
        if (ckid == 0) {
            return;
        }
        var msg = "出库单号：" + p.get('ckdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此出库单审核内容？";
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "财务审核取消",
                no: "关 闭"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupCpckdWindow').down("#btnCpckdCancel").setDisabled(true);
                    //console.log(ckid,msg);
                    AjaxDataSave('cpckdcwshsave', "cancel", ckid, cklocsaveCallBack, the);
                }
            }
        });
    }


});


