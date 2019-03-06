var that;
var xsid;
var cpxsdmxStore;

Ext.define('MyApp.view.main.xsdgl.CpxsdlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpxsdlocCtrl',
    requires: [
        'MyApp.view.main.xsdgl.CpxsdlocView'
        , 'MyApp.view.main.report.PrintCpxsd'
    ],
    locQuery: function (that) {
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');
        var bz = v.get('deletebz');
        if (bz) {
            bz = 1;
        }
        else {
            bz = 0;
        }
        cpxsdmxStore.proxy.extraParams.deletebz = bz;
        cpxsdmxStore.proxy.extraParams.loc = "cpxsdmxloc";
        cpxsdmxStore.proxy.extraParams.khid = khid;
        cpxsdmxStore.proxy.extraParams.ckid = ckid;
        cpxsdmxStore.proxy.extraParams.startdate = d1;
        cpxsdmxStore.proxy.extraParams.enddate = d2;
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
        var viewname = that.getView().down("#CpxsdListGrid");
        that.viewname = viewname;
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
            "#btnPrintCpxsd": {
                click: function () {
                    onPrintCpxsd();
                }

            },
            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            }
        });
        var v = viewname.getViewModel();
        v.set('start_date', start_date);
        v.set('end_date', end_date);
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
        viewname.down('#QueryDate').setHidden(false);
        that.viewname.down('#deletebz').setHidden(false);

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
                    loc: "cpxsdmxloc",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    p_l_id: sys_location_id,
                    deletebz: 0
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
            start_date = v.get('start_date');
            end_date = v.get('end_date');
            var d1 = Ext.Date.format(start_date, 'Y-m-d');
            var d2 = Ext.Date.format(end_date, 'Y-m-d');
            var store = that.viewname.getStore();
            var bz = v.get('deletebz');
            if (bz) {
                bz = 1;
            }
            else {
                bz = 0;
            }
            store.proxy.extraParams.deletebz = bz;
            store.proxy.extraParams.loc = 'cpxsdloc';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.startdate = d1;
            store.proxy.extraParams.enddate = d2;
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
            return regExp.test(record.get('C_name')) || regExp.test(record.get('C_code')) || regExp.test(record.get('Py_code')) || regExp.test(record.get('xsdh'));
        });
    },
    onCpxsdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        xsid = rec.data.xsid;
        var record = rec.data;
        record['btnButtonHidden'] = true;
        record['op'] = 'loc';
        record['ckop'] = false;
        record['title'] = '商品销售单';
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
        var p = this.lookupReference('popupCpxsdWindow');
        if (((sys_location_id > 0) && (rec.data.khkd == 0)) || ((sys_customer_id > 0) && (rec.data.khkd == 1))) {

            p.down("#btnPrintCpxsd").setHidden(false);

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

    }
});






