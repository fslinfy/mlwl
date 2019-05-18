var that;
var cpxsdmxStore;
var mfhsaveCallBack = function (th) {
    that.getView().down("#cpxsdshowview").close();
    that.locQuery(th);

}
Ext.define('MyApp.view.main.xsdgl.CpxsdmfhCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpxsdmfhCtrl',
    requires: [
        'MyApp.view.main.xsdgl.CpxsdmfhView'
    ],
    locQuery: function (that) {
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        cpxsdmxStore.proxy.extraParams.loc = "cpxsdmxmfh";
        cpxsdmxStore.proxy.extraParams.khid = khid;
        cpxsdmxStore.proxy.extraParams.ckid = ckid;
        cpxsdmxStore.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        return false;
    },
    onBtnCancelClick: function (button, e, options) {
        var win = this.lookupReference('popupCpxsdWindow');
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

            "#btnCpxsdDelete": {
                click: this.onCpxsdDeleteSubmit
            },

            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            }
        });
        var viewname = that.getView().down("#CpxsdListGrid");
        that.viewname = viewname;

        var v = viewname.getViewModel();
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
        cpxsdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpxsdmxStore',
            model: 'MyApp.model.CpxsdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cpxsdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpxsdmxmfh",
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

        cpxsdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpxsdmfh';
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
            return regExp.test(record.get('C_name')) || regExp.test(record.get('C_code')) || regExp.test(record.get('xsdh')) || regExp.test(record.get('Py_code')) || regExp.test(record.get('xsdh'));
        });
    },
    onCpxsdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        var xsid = rec.data.xsid;
        var record = rec.data;
       // console.log(record);
        record['btnButtonHidden'] = true;
        record['op'] = 'loc';
        record['ckop'] = false;

        record['title'] = '商品销售单-未提货';
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({

            xtype: 'cpxsdformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();


        var cpxsdmx_store = this.lookupReference('CpxsdmxGrid').getStore();
        cpxsdmxStore.each(function (rec) {
            if (rec.data.xsid == xsid) {
                cpxsdmx_store.add(rec);
            }
        })

        if (sys_system_lastdel) {

            if (((sys_location_id > 0) && (rec.data.khkd == 0) && (rec.data.cdbz == 0)) || ((sys_customer_id > 0) && (rec.data.khkd == 1))) {
                var p = this.lookupReference('popupCpxsdWindow');
                p.down("#btnCpxsdDelete").setHidden(false);
                   p.down("#btnCpxsdDelete").setText('作废此提货单');
            }

        }

    },
    onGridReload: function () {
        var store = this.lookupReference('CpxsdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpxsdcw_store = this.lookupReference('cpxsdmxcw0').getStore();
        cpxsdcw_store.clearFilter();
        cpxsdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpxsdmxItemSelected: function (sender, record) {
        var cpxsdcw_store = this.lookupReference('cpxsdmxcw0').getStore();
        var mxid = record.data.mxid
        cpxsdcw_store.clearFilter();
        cpxsdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });

    },
    onCpxsdDeleteSubmit: function () {
        var p = this.lookupReference('popupCpxsdWindow').getViewModel();
        var xsid = p.get('xsid');
        if (xsid == 0) {
            return;
        }
//        console.log("khid",p.get('khid'),xsid);

        var msg = "销售提货单：" + "<br>客户名称：" + p.get('khmc');
        var title = "真的作废此提货单内容？";
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
                    var p = that.lookupReference('popupCpxsdWindow');
                    p.down("#btnCpxsdDelete").setHidden(true);
                    AjaxDataSave('cpxsdshsave', 'lastdel', xsid, mfhsaveCallBack, that);
                }
            }
        })
    }

});






