var that;
var cpjkdmxStore;
var jkdlocsaveCallBack = function (th) {
    var p = th.lookupReference('popupCpjkdWindow');
    var mjkid = p.getViewModel().get('jkid');
    p.close();
    that.locQuery(th);
};

Ext.define('MyApp.view.main.cpjkdsh.CpjkdlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpjkdlocCtrl',
    requires: [
        'MyApp.view.main.cpjkdsh.CpjkdlocView'
    ],
    locQuery: function (that) {
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');
        var store = cpjkdmxStore;
        var bz = v.get('deletebz');
            if (bz)
            {
              bz=1;
            }
            else
            {
              bz=0;
            }
        store.proxy.extraParams.deletebz =bz;

        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.ckid = ckid;
        store.proxy.extraParams.startdate = d1;
        store.proxy.extraParams.enddate = d2;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnCancelClick: function (button, e, options) {
        var win = this.lookupReference('popupCpjkdWindow');
        win.close()
        return false;
    },

    init: function () {

        that = this;

        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            
            "#btnQueryKhmc": {
                click:this.onSelectKhbmView
                /* function () {
                    SelectKhbmView();
                }*/
            },
            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            },
            "#btnPrintCpjkd":{
                click:this.onPrintCpjkd
            }
            ,
            "#btnCpjkdSave": {
                click: this.onCpjkdcwshOkSubmit
            },

            "#FilterField": {
                change: this.onFilterChange
            }

        });
        that.viewname = that.getView().down("#CpjkdListGrid");
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
        that.viewname.down('#QueryDate').setHidden(false);
         that.viewname.down('#deletebz').setHidden(false);

         that.viewname.getViewModel().set('PageTitleName', '商品进仓单明细查询');


        cpjkdmxStore = Ext.create('Ext.data.Store', {
            //   extend: 'Ext.data.Store',
            alias: 'store.cpjkdmxStore',
            model: 'MyApp.model.CpjkdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpjkdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpjkdmxloc",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    p_l_id: sys_location_id,
                    deletebz:0
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cpjkdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            start_date = v.get('start_date');
            end_date = v.get('end_date');
            var d1 = Ext.Date.format(start_date, 'Y-m-d');
            var d2 = Ext.Date.format(end_date, 'Y-m-d');
            var store = that.viewname.getStore();

            var bz = v.get('deletebz');
            if (bz)
            {
              bz=1;
            }
            else
            {
              bz=0;
            }
            store.proxy.extraParams.deletebz =bz;
            store.proxy.extraParams.loc = 'cpjkdloc';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.startdate = d1;
            store.proxy.extraParams.enddate = d2;
            store.reload();
        });

        that.listmxstore = cpjkdmxStore;
        that.liststore = that.viewname.getStore();
        this.locQuery(this);


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
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('ckmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('jkdh'));
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
      //  console.log('onSelectCkbmView');
        treeSelect('ckmc', that, '', that.viewname, true);
        return false;
    },

    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    onCpjkdmxShowView: function (button) {
        // console.log("mainTabPanel",mainTabPanel,Ext.getCmp("maintabpanel"));
        var rec = button.getWidgetRecord();
        var jkid = rec.data.jkid;
        var record = rec.data;
        record['op'] = 'loc';
        record['gsop'] = true;
        record['w'] = 0;
        record['btnButtonHidden'] = true;
        record['title'] = '商品进库单';
        var view = this.getView();
        this.isEdit = false;// !!record;
        this.dialog = view.add({
            xtype: 'formcpjkdwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();
        var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.jkid == jkid) {
                cpjkdmx_store.add(rec);
            }
        })

        imagesload(jkid);
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        cpjkdcw_store.proxy.extraParams.jkid = jkid;
        cpjkdcw_store.proxy.extraParams.loc = 'cpjkdmxsh';
        cpjkdcw_store.reload();
        var p = this.lookupReference('popupCpjkdWindow');
        if (sys_customer_id > 0) {
            p.down("#btnPrintCpjkd").setHidden(true);
        }
        if ((rec.data.delbz == 0) && (sys_system_lastdel) && (sys_customer_id == 0)) {
            p.down("#btnCpjkdSave").setHidden(false);
            p.down("#btnCpjkdSave").setText('取消财务审核');
        }
    },
    onGridReload: function () {
        var store = this.lookupReference('CpjkdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        cpjkdcw_store.clearFilter();
        cpjkdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpjkdmxItemSelected: function (sender, record) {
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        var mxid = record.data.mxid
        cpjkdcw_store.clearFilter();
        cpjkdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },

    onCpjkdcwshOkSubmit: function () {
        var p = this.lookupReference('popupCpjkdWindow').getViewModel();
        var jkid = p.get('jkid');
        if (jkid == 0) {
            return;
        }
        var msg = "进库单号：" + p.get('jkdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消财务审核状态？";

        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确 认",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                console.log(btn, text);
                if (btn == "yes") {
                    AjaxDataSave('cpjkdcwshsave', "cancel", jkid, jkdlocsaveCallBack, that);
                }
            }
        });

        /*
                
                var abc = Ext.Msg.confirm(title, msg, function (e) {
                    if (e == 'yes') {
                        console.log('test', 'testing!');
                         AjaxDataSave('cpjkdcwshsave', "cancel", jkid, saveCallBack, that);
                    }
                })
                */

    },
    onPrintCpjkd: function () {
        var p = that.lookupReference('popupCpjkdWindow').getViewModel();
        PrintCpjkdJkid(p.get('jkid'));
        return;
    }


});

