var that;
var cpckdmxStore;
var issave=false;

var ckshsaveCallBack = function (th) {
    // if (issave) return ;

      var p = th.lookupReference('popupCpckdWindow');
    //  var mckid = p.getViewModel().get('ckid');
    var mckid = that.ckid;
   // console.log("qcloudsmssend",mckid);
    if (that.loc == "ok") {
    // 发信息
        Ext.Ajax.request({
            method: 'GET',
            url: "qcloudsmssend.php",
            params: {
                act: 'cpckd',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                id:mckid
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
              //  console.log(result);
                if (result.result == 'success') {
                   // Ext.MessageBox.alert('错误!', '数据保存失败！');
                  //  that.getView().down("#cpxsdshowview").close();
                  //  that.locQuery(that);
                }
                else {
                    Ext.MessageBox.alert('提示!',result.msg);
                }
            }
        });


        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品出仓单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCpckdckid(mckid);
                }
               // th.getView().down("#cpckdsowview").close();
               p.close();
                th.locQuery(th)
            }
        });
    } else {
        p.close();
        //th.getView().down("#cpckdsowview").close();
        th.locQuery(th)
    }


    
    //that.getView().down("#cpckdsowview").close();
    //that.locQuery(th);

}
Ext.define('MyApp.view.main.cpckgl.CpckdshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpckdshCtrl',
    requires: [
        'MyApp.view.main.cpckgl.CpckdshView',
        'MyApp.view.main.tree.WorkerSelectTree'
    ],
    locQuery: function (that) {
        console.log("sh locQuery");
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        cpckdmxStore.proxy.extraParams.loc = "cpckdmxsh";
        cpckdmxStore.proxy.extraParams.khid = khid;
        cpckdmxStore.proxy.extraParams.l_id = ckid;
        cpckdmxStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
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
                    loc: "cpckdmxsh",
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
            store.proxy.extraParams.loc = 'cpckdsh';
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
            "#btnCpckdSave": {
                click: this.onCpckdshOkSubmit
            },
            "#btnQueryKhmc": {
                click: function () { SelectKhbmView(); }
            },
            "#btnPrintCpckd": {
                click: function () {
                    onPrintCpckd();
                }
            },
            "#btnQueryCkmc": {
                click: function () { SelectCkbmView(); }
            },
            "#btnCpckdDelete": {
                click: this.onCpckdshDeleteSubmit
            },
            "#FilterField": {
                change: this.onFilterChange //function () { FilterChange(); }
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
            return regExp.test(record.get('ckdh')) || regExp.test(record.get('xsdh')) || regExp.test(record.get('khmc')) || regExp.test(record.get('cKmc'));
        });
    },



    onCpckdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        issave=false;
        var ckid = rec.data.ckid;
        var record = rec.data;
    
        record['op'] = 'sh';
        record['gsop'] = false;
        record["w"] = 0;
        record['btnButtonHidden'] = false;
        record['title'] = '商品出库单-审核';
        var view = this.getView();
        this.isEdit = false;// !!record;
        this.dialog = view.add({
            xtype: 'cpckformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        //console.log('init1');
        this.dialog.show();
        //console.log('init2'); 

        var cpckdmx_store = this.lookupReference('CpckdmxGrid').getStore();
        // console.log('init21'); 
        var p = this.lookupReference('popupCpckdWindow');
        //console.log('init22'); 
        p.down("#btnCpckdSave").setHidden(!sys_system_sh);
        p.down("#btnCpckdDelete").setHidden(!sys_system_del);

        p.down("#btnPrintCpckd").setHidden(true);
        //console.log('init3');
       
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

        /*
        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.ckid == ckid) {
                cpckdmx_store.add(rec);
            }
        })
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.proxy.extraParams.ckid = ckid;
        cpckdcw_store.proxy.extraParams.loc = 'ckid';
        cpckdcw_store.load();
        //console.log('init4');
        this.onGridReload();
        //console.log('init5');
        */

    },
    onGridReload: function () {

        var store = that.lookupReference('CpckdmxGrid').getStore();
       // console.log(store);
        var mxid = store.getAt(0).get('mxid');
        var cpckdcw_store = that.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('ckmxid') == mxid;
        });
    },
    onCpckdmxItemSelected: function (sender, record) {
        //console.log("ckmcid",record);


        var cpckdcw_store = that.lookupReference('cpckdmxcw0').getStore();
        var mxid = record.data.mxid
        //console.log("ckmcid",mxid);
        cpckdcw_store.clearFilter();
        //cpckdcw_store.each(function (rec) {
        //    console.log("ckdcw",rec);
        //})
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('ckmxid') == mxid;
        });
    },
    /*onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
 */
    onSelectWorkerView: function (button) {

        var rec = button.getWidgetRecord();
        console.log(rec);
        SelectWorkerView(button);
    },
    onWorkerSelectOkClick: function () {
        WorkerSelectOkClick();
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    /*
        onSelectCkbmView: function (record) {
            treeSelect('ckmc', that, '', that.viewname, true);
            return false;
        },
        */
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


      if (issave) return ;
      issave=true;
        
    the.lookupReference('popupCpckdWindow').down("#btnCpckdSave").setHidden(true);
        var gsby = [];
        /*
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
        })*/
        var cksh = {};
        cksh["ckid"] = ckid;
        cksh["gsby"] = gsby;
        //cksh["fhbz"] = 1;
        var msg = "出库单号：" + p.get('ckdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此出库单内容？";
        if (loc == 'ok') {
            title = "真的业务审核通过此出库单内容？";
        }
        that.loc = loc;
        that.ckid = ckid;
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "业务确认审核",
                no: "放 弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupCpckdWindow').down("#btnCpckdSave").setHidden(true);
                    var str = obj2str(cksh);
                    var encodedString = base64encode(Ext.encode(str));
                    AjaxDataSave('cpckdshsave', loc, encodedString, ckshsaveCallBack, the);


                }
            }
        });





        /*   var abc = Ext.Msg.confirm(title, msg, function (e) {
               if (e == 'yes') {
                   // AjaxDataSave('cpckdshsave', loc, ckid, saveCallBack, the);
                   var str = obj2str(cksh);
                   var encodedString = base64encode(Ext.encode(str));
                   AjaxDataSave('cpckdshsave', loc, encodedString, saveCallBack, the);
               }
           })
           */

    }
});

