var that;
var ghid;
var cpghdmxStore;
var mfhsaveCallBack = function (th) {
    //th.getView().down("#popupCpghdWindow").close();
    var win = th.lookupReference('popupCpghdWindow');
    win.close()
    that.locQuery(th);
    Ext.MessageBox.alert('提示！', '此过户单内容已作废！');
}
Ext.define('MyApp.view.main.cpghkdgl.CpghdmfhCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpghdmfhCtrl',
    requires: [
        'MyApp.view.main.cpghkdgl.CpghdmfhView'
        , 'MyApp.view.main.showView.CpghkdShowView'
        , 'MyApp.view.main.report.PrintCpghkd'
    ],
    locQuery: function (th) {
        var v = th.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        cpghdmxStore.proxy.extraParams.loc = "cpghdmxmfh";
        cpghdmxStore.proxy.extraParams.khid = khid;
        cpghdmxStore.proxy.extraParams.ckid = ckid;
        cpghdmxStore.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        return false;
    },
    onBtnCancelClick: function (button, e, options) {
        var win = this.lookupReference('popupCpghdWindow');
        win.close()
        return false;
    },

    init: function () {
        //        console.log("init");
        that = this;

        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#FilterField": {
                change: this.onFilterChange
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },

            "#btnCpghdDelete": {
                click: this.onCpghdDeleteSubmit
            },
            "#btnPrintCpghkd": {
                click: function () {
                    
                    PrintCpghkdghid(ghid);
                }

            },
            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            }
        });
        var viewname = that.getView().down("#CpghdListGrid");
        that.viewname = viewname;

        var v = viewname.getViewModel();

        v.set('PageTitleName', '未过户商品过户单明细');
        that.getView().down('#deletebz').setHidden(true);
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
            viewname.down('#QueryKhmc').setHidden(false);
            viewname.down('#QueryCkmc').setHidden(true);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
            viewname.down('#QueryKhmc').setHidden(true);
            viewname.down('#QueryCkmc').setHidden(false);
        }
        cpghdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpghdmxStore',
            model: 'MyApp.model.CpghdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cpghdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpghdmxmfh",
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

        cpghdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpghdmfh';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.reload();
        });
        this.locQuery(this);
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

    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('C_name')) || regExp.test(record.get('C_code')) || regExp.test(record.get('ghdh')) || regExp.test(record.get('Py_code')) || regExp.test(record.get('ghdh'));
        });
    },
    onCpghdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        ghid = rec.data.ghid;
        var record = rec.data;
        // console.log(record);
        record['btnButtonHidden'] = true;
        //record['deletebz'] = true;
        record['op'] = 'loc';
        record['ckop'] = false;

        record['title'] = '商品过户单-未过户';
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({

            xtype: 'cpghkdformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();


        var cpghdmx_store = this.lookupReference('CpghdmxGrid').getStore();
        cpghdmxStore.each(function (rec) {
            if (rec.data.ghid == ghid) {
                cpghdmx_store.add(rec);
            }
        })
        var p = this.lookupReference('popupCpghdWindow');
        if (sys_system_lastdel) {

            if (((sys_location_id > 0) && (rec.data.khkd == 0) && (rec.data.cdbz == 0)) || ((sys_customer_id > 0) && (rec.data.khkd == 1))) {
                
                p.down("#btnCpghdDelete").setHidden(false);
                p.down("#btnCpghdDelete").setText('作废此过户单');
            }

        }
        p.down("#btnPrintCpghkd").setHidden(false);

    },
    onGridReload: function () {
        var store = this.lookupReference('CpghdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        cpghdcw_store.clearFilter();
        cpghdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpghdmxItemSelected: function (sender, record) {
        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        var mxid = record.data.mxid
        cpghdcw_store.clearFilter();
        cpghdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });

    },
    onCpghdDeleteSubmit: function () {
        var p = this.lookupReference('popupCpghdWindow').getViewModel();
        var ghid = p.get('ghid');
        if (ghid == 0) {
            return;
        }
       //         console.log("p",p);

        var msg = "过户单：" + p.get('ghdh')+ "<br>客户名称：" + p.get('khmc');
        var title = "真的作废此过户单内容？";
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认作废",
                no: "取消"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                // console.log(btn, text);

                if (btn == "yes") {
                    var p = that.lookupReference('popupCpghdWindow');
                    p.down("#btnCpghdDelete").setHidden(true);
                    AjaxDataSave('cpghdshsave', 'lastdel', ghid, mfhsaveCallBack, that);
                }
            }
        })
    }

});






