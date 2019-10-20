

var that;
var cpckdmxStore;
var ckcwshsaveCallBack = function (th) {


    console.log('saveCallBack');

    that.getView().down("#cpckdshowview").close();
    that.locQuery(th);


}

Ext.define('MyApp.view.main.cpckgl.CpckdcwshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpckdcwshCtrl',
    requires: [
        'MyApp.view.main.cpckgl.CpckdcwshView',
         'MyApp.view.main.tree.WorkerSelectTree'
    ],
    locQuery: function (that) {
        console.log(" cwsh locQuery");
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');


        cpckdmxStore.proxy.extraParams.loc = "cpckdmxcwsh";
        cpckdmxStore.proxy.extraParams.khid = khid;
        cpckdmxStore.proxy.extraParams.l_id = ckid;
        cpckdmxStore.reload();
        //console.log("locQuery",khid,ckid);
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
    },

    onItemSelected: function (sender, record) {
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        console.log(" help");
        return false;
    },

    init: function () {
        that = this;
        that.viewname = that.getView().down("#CpckdListGrid");
        var v = that.viewname.getViewModel();
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }

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
                    loc: "cpckdmxcwsh",
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

        cpckdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpckdcwsh';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.l_id = ckid;
            store.reload();


        });
        that.listmxstore = cpckdmxStore;
        that.liststore = that.viewname.getStore();
        this.locQuery(this);
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#btnCpckdSave": {
                click: this.onCpckdshOkSubmit
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnPrintCpckd": {
                click: function () {
                    onPrintCpckd();
                }
            },
            "#btnCpckdDelete": {
                click: this.onCpckdshDeleteSubmit
            },

            "#FilterField": {
                change: this.onFilterChange
            }
            ,
            "#btnCpckdCancel": {
                click: this.onCpckdCancel
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
        //return storeFilter(this.getView().getStore(),'C_name',v.rawValue);
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('xsdh')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('ckdh'));
        });
    },

 onSelectWorkerView: function (button) {
        var rec = button.getWidgetRecord();
        //console.log("SelectWorkerView",rec);
        if (rec.data.jeid > 0) {
            //console.log("SelectWorkerView");
            SelectWorkerView(button);
        } else {
            if (rec.data.cwsl < rec.data.ccsl) {
                this.onCpckdmxShEdit(button);
            }
        }

    },
    onWorkerSelectOkClick: function () {
        WorkerSelectOkClick();
    },

    onCpckdmxShowView: function (button) {
        var rec = button.getWidgetRecord();

        var ckid = rec.data.ckid;
        var record = rec.data;
        record['btnButtonHidden'] = false;
        record['op'] = 'cwsh';
        record['gsop'] = false;
        record["w"] = 40;
        record['title'] = '商品出库单-，财务审核';
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({
            xtype: 'cpckformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();


       /* var cpckdmx_store = this.lookupReference('CpckdmxGrid').getStore();
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.proxy.extraParams.ckid = ckid;
        cpckdcw_store.proxy.extraParams.loc = 'ckid';
        cpckdcw_store.load();
        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.ckid == ckid) {
                cpckdmx_store.add(rec);
            }
        })

        this.onGridReload();
        */
        var p = this.lookupReference('popupCpckdWindow');
        p.down("#btnCpckdSave").setHidden(!sys_system_cwsh);
        //if (sys_system_lastdel>0) {
        p.down("#btnCpckdCancel").setHidden(!sys_system_cwsh);


        //}


        //   p.down("#btnCpckdDelete").setHidden(false);

        p.down("#btnCpckdDelete").setHidden(!sys_system_del);

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
    },
    onGridReload: function () {

        var store = this.lookupReference('CpckdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('ckmxid') == mxid;
        });
    },
    onCpckdmxItemSelected: function (sender, record) {
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        var mxid = record.data.mxid
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('ckmxid') == mxid;
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


    onCpckdshOkSubmit: function () {
        that.CpckdshSave('ok', this);
    },
    onCpckdshDeleteSubmit: function () {
        that.CpckdshSave('delete', this);
    },


        CpckdshSave: function (loc, the) {
        var p = the.lookupReference('popupCpckdWindow').getViewModel();
        var ckid = p.get('ckid');
        if (ckid == 0) {
            return;
        }

        var gsby = [];
        
        var cpckdmx_store = that.lookupReference('CpckdmxGrid').getStore();
        
        var gsbyrec = {};
        cpckdmx_store.each(function (rec) {
            if (rec.data.jeid > 0) {
                gsbyrec = {};
                gsbyrec["jeid"] = rec.data.jeid;
                gsbyrec["gs"] = rec.data.gs;
                gsbyrec["byg"] = rec.data.byg;
                gsbyrec["cg"] = rec.data.cg;
                gsby.push(gsbyrec);
            }
        })
        var cksh = {};
        cksh["ckid"] = ckid;
        cksh["gsby"] = gsby;

        var msg = "出库单号：" + p.get('ckdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此出库单内容？";
        if (loc == 'ok') {
            title = "真的财务审核确认此出库单内容？";
        }
        else
        {
            var  rq= Ext.decode(Ext.encode(p.get('ckrq'))).substr(0,10);
            var ctoday=Ext.Date.format(new Date(), 'Y-m-d' );
             if ((rq<sys_option_min_date) && (ctoday>=sys_option_min_date)) {
                Ext.MessageBox.alert('注意！', '此单是上月出库单，不能作删除处理！');
                return false
            }

        }

        Ext.MessageBox.show({
            title: title,
            msg:msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes:"确 认",
                no: "关 闭"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupCpckdWindow').down("#btnCpckdSave").setHidden(true);
                    var str = obj2str(cksh);
                    var encodedString = base64encode(Ext.encode(str));
                    AjaxDataSave('cpckdcwshsave', loc, encodedString, ckcwshsaveCallBack, the);
                }
            }
        });
    },
    onCpckdCancel: function () {
        var the=this;
        var p = the.lookupReference('popupCpckdWindow').getViewModel();
        var ckid = p.get('ckid');
        if (ckid == 0) {
            return;
        }
        var msg = "出库单号：" + p.get('ckdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此出库单仓管复核内容？";
        Ext.MessageBox.show({
            title: title,
            msg:msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "仓管复核取消",
                no: "关 闭"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                   that.lookupReference('popupCpckdWindow').down("#btnCpckdCancel").setDisabled(true);
                   //console.log(ckid,msg);
                    AjaxDataSave('cpckdckshsave', "cancel", ckid, ckcwshsaveCallBack, the);
                }
            }
        });
    },


});

