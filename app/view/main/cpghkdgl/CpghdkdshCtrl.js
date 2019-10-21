var that;
var ghid;

var cpghdmxStore;
var ghdshsaveCallBack = function (th) {
    // that.getView().down("#cpghdshowview").close();
    // that.locQuery(th);

    var p = th.lookupReference('popupCpghdWindow');
    var mghid = p.getViewModel().get('ghid');
    if (that.loc == "ok") {
        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品过户单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCpghkdghid(mghid);
                }
                p.close();
                that.locQuery(th);
            }
        });
    } else {
        p.close();
        that.locQuery(th);
        Ext.MessageBox.alert('提示！', '此过户单内容已作废！');
    }
}
Ext.define('MyApp.view.main.cpghkdgl.CpghdkdshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpghdkdshCtrl',
    requires: [
        'MyApp.view.main.cpghkdgl.CpghdkdshView'
        , 'MyApp.view.main.showView.CpghkdShowView'
        ,'MyApp.view.main.report.PrintCpghkd'
    ],
    locQuery: function (th) {
        //  console.log("locQuery cpghdshctrl");
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        cpghdmxStore.proxy.extraParams.loc = "cpghdmxkdsh";
        cpghdmxStore.proxy.extraParams.khid = khid;
        cpghdmxStore.proxy.extraParams.ckid = ckid;
        var khkd = 0;
        if (sys_customer_id > 0) {
            khkd = 1;
        }
        cpghdmxStore.proxy.extraParams.khkd = khkd;
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
            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            },
            "#btnPrintCpghkd": {
                click: function () {
                   // onPrintCpghkd();
                   PrintCpghkdghid(ghid);
                }

            },
            "#btnCpghdSave": {
                click: this.onCpghdSaveSubmit
            },

            "#btnCpghdDelete": {
                click: this.onCpghdDeleteSubmit
            }
        });
        var viewname = that.getView().down("#CpghdListGrid");
        that.viewname = viewname;
        var v = viewname.getViewModel();
        //v.set('start_date', start_date);
        //v.set('end_date', end_date);
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
        //viewname.down('#QueryDate').setHidden(true);

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
                    loc: "cpghdmxkdsh",
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
            var khkd = 0;
            if (sys_customer_id > 0) {
                khkd = 1;
            }

            //  start_date= v.get('start_date');
            //  end_date = v.get('end_date');
            //  var  d1 = Ext.Date.format(start_date, 'Y-m-d');
            //  var  d2 = Ext.Date.format(end_date, 'Y-m-d');
            var store = that.viewname.getStore();
            store.proxy.extraParams.act = 'cpghdlist_pc';
            store.proxy.extraParams.loc = 'cpghdkdsh';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.khkd = khkd;
            // store.proxy.extraParams.startdate = d1;
            // store.proxy.extraParams.enddate = d2;
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
            return regExp.test(record.get('C_name')) || regExp.test(record.get('C_code')) || regExp.test(record.get('Py_code')) || regExp.test(record.get('ghdh'));
        });
    },
    onCpghdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        ghid = rec.data.ghid;
        var record = rec.data;
        record['btnButtonHidden'] = true;
        record['op'] = 'loc';
        record['ckop'] = false;
        record['title'] = '商品过户单-审核处理';
        console.log(record);
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
        p.down("#btnCpghdSave").setText("审核通过此单");
        p.down("#btnCpghdSave").setHidden(!sys_system_sh);
        p.down("#btnCpghdDelete").setHidden(!sys_system_del);
        p.down("#btnPrintCpghkd").setHidden(true);



        //var p = this.lookupReference('popupCpghdWindow');
        //p.down("#btncpghdsave").setHidden(false);
        //p.down("#btncpghddelete").setHidden(false);
        //p.down("#field_cnote").setReadOnly(false);

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
    onCpghdSaveSubmit: function () {
        this.CpghdshSave('ok', this);
    },
    onCpghdDeleteSubmit: function () {
        this.CpghdshSave('delete', this);
    },
    CpghdshSave: function (loc, th) {
        var p = th.lookupReference('popupCpghdWindow').getViewModel();
        ghid = p.get('ghid');
        // console.log("khkd",p.get('khkd'));
        if (ghid == 0) {
            return;
        }

        var msg = "过户单：" +p.get('ghdh')+ "<br>客户名称：" + p.get('khmc') ;
        var title = "真的取消此过户单内容？";
        if (loc == 'ok') {
            title = "真的审核通过此过户单内容？";
        }
        that.loc = loc;
        var abc = Ext.Msg.confirm(title, msg, function (e) {
            if (e == 'yes') {
                var p = that.lookupReference('popupCpghdWindow');
                p.down("#btnCpghdSave").setHidden(true);

                AjaxDataSave('cpghdshsave', loc, ghid, ghdshsaveCallBack, th);
                // console.log("cpghdshsave");
            }
        })
    }


});




