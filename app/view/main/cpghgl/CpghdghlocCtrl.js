﻿var ghid=0;
var mxid=0;
var that;
var cpghdmxStore;
var issave=false;
var ghshsaveCallBack = function (th) {

      var p = th.lookupReference('popupCpghdWindow');
    //  var mckid = p.getViewModel().get('ckid');
    var mghid = that.ghid;
   // console.log("qcloudsmssend",mghid);
    if (that.loc == "ok") {
    // 发信息
        
       /*Ext.Ajax.request({
            method: 'GET',
            url: "qcloudsmssend.php",
            params: {
                act: 'cpghd',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                id:mghid
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                }
                else {
                    Ext.MessageBox.alert('提示!',result.msg);
                }
            }
        });
        */
        


        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品过户过货单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCpghdghid(mghid);
                }
               // th.getView().down("#cpghdsowview").close();
               p.close();
               th.locQuery(th)
            }
        });
        //p.close();
        //th.locQuery(th)
    } else {
        p.close();
        th.locQuery(th)
    }


    
    //that.getView().down("#cpghdsowview").close();
    //that.locQuery(th);

}
Ext.define('MyApp.view.main.cpghgl.CpghdghlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpghdghlocCtrl',
    requires: [
        'MyApp.view.main.cpghgl.CpghdghlocView'
        ,'MyApp.view.main.tree.WorkerSelectTree'
        ,'MyApp.view.main.cpghgl.CpghdCtrlFunction'
        ,'MyApp.view.main.report.PrintCpghdgh'
    ],
    locQuery: function (that) {

        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');

        
        cpghdmxStore.proxy.extraParams.loc = "cpghdmxghloc";
        cpghdmxStore.proxy.extraParams.khid = khid;
        cpghdmxStore.proxy.extraParams.l_id = ckid;
        cpghdmxStore.proxy.extraParams.startdate=d1;
        cpghdmxStore.proxy.extraParams.enddate=d2;

        cpghdmxStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
    },

    init: function () {
        that = this;
        that.viewname = that.getView().down("#CpghdListGrid");
        var v = that.viewname.getViewModel();
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
/*
        var prtmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpghdmxStore',
            model: 'MyApp.model.CpghdmxModel',
            proxy: {
              type: 'ajax',
              api: {
                read: sys_ActionPHP + '?act=cpghdmxlist_prt'
              },
              actionMethods: {
                read: 'GET'
              },
              extraParams: {
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                ghid: 4
              },
              reader: {
                type: 'json',
                rootProperty: 'rows'
              }
            }
          });
       */
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
                    loc: "cpghdmxghloc",
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
            start_date = v.get('start_date');
            end_date = v.get('end_date');
            var d1 = Ext.Date.format(start_date, 'Y-m-d');
            var d2 = Ext.Date.format(end_date, 'Y-m-d');

            
            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpghdghloc';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.l_id = ckid;
            store.proxy.extraParams.startdate=d1;
            store.proxy.extraParams.enddate=d2;
            store.reload();


        });
        that.listmxstore = cpghdmxStore;
        that.liststore = that.viewname.getStore();
        this.locQuery(this);
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnCpghdSave": {
                click: this.onCpghdshOkSubmit
            },
            "#btnQueryKhmc": {
                click: function () { SelectKhbmView(); }
            },

          
          //"#btnQueryKhmc": {
          //  click: this.onSelectKhbmView
        //},

        "#btnQueryCKmc": {
            click: this.onSelectCKbmView
        },
            "#btnPrintCpghd": {
                click: function () {
                    onPrintCpghd();
                   // Printcpghdghid(mghid);
                   //console.log('printcpghd');
                }
            },
        //    "#btnQueryCkmc": {
          //      click: function () { SelectCkbmView(); }
         //   },
            "#btnCpghdDelete": {
                click: this.onCpghdshDeleteSubmit
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
       that.viewname.down('#QueryDate').setHidden(false);


    },
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('ghdh')) || regExp.test(record.get('newkhmc')) || regExp.test(record.get('khmc')) || regExp.test(record.get('cKmc'));
        });
    },



    onCpghdmxShowView: function (button) {
        
        var rec = button.getWidgetRecord();
        issave=false;
        ghid = rec.data.ghid;
        mghid=ghid;
        var record = rec.data;
        console.log('CpghshShowView',record);
        record['op'] = 'sh';
        record['gsop'] = true;
        record["w"] = 0;
        record['btnButtonHidden'] = true;
        record['title'] = '商品过户单-查询';
        var view = this.getView();
        this.isEdit = false;// !!record;
        
        this.dialog = view.add({
            xtype: 'cpghshformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();
        //return;  
        var cpghdmx_store = this.lookupReference('CpghdmxGrid').getStore();
        var p = this.lookupReference('popupCpghdWindow');
        p.down("#btnCpghdSave").setHidden(true);

       // p.down("#btnCpghdDelete").setHidden(!sys_system_del);

        //p.down("#btnPrintCpghd").setHidden(true);
       
        var cpghdcw_store = that.lookupReference('cpghdmxcw0').getStore();
        cpghdcw_store.proxy.extraParams.ghid = ghid;
        cpghdcw_store.proxy.extraParams.loc = '';
        cpghdcw_store.proxy.extraParams.act = 'Cpghdcwlist_pc';
        cpghdcw_store.load();
        var cpghdmx_store = that.lookupReference('CpghdmxGrid').getStore();
        cpghdmx_store.on("load", function () {

            //cpghdmx_store.each(function (rec) {
            //    console.log('rec',rec); 
            //})

            
            mxid = cpghdmx_store.getAt(0).get('mxid');
            cpghdcw_store.clearFilter();
            cpghdcw_store.filterBy(function (record, id) {
                return record.get('mxid') == mxid;
            });
        }
        )
        cpghdmx_store.proxy.extraParams.ghid = ghid;
        cpghdmx_store.proxy.extraParams.act='Cpghdghmxlist_pc';
        cpghdmx_store.load();

        /*
        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.ckid == ckid) {
                cpghdmx_store.add(rec);
            }
        })
        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        cpghdcw_store.proxy.extraParams.ckid = ckid;
        cpghdcw_store.proxy.extraParams.loc = 'ckid';
        cpghdcw_store.load();
        //console.log('init4');
        this.onGridReload();
        //console.log('init5');
        */

    },
    onGridReload: function () {

        var store = that.lookupReference('CpghdmxGrid').getStore();
       // console.log(store);
        var mxid = store.getAt(0).get('mxid');
        var cpghdcw_store = that.lookupReference('cpghdmxcw0').getStore();
        cpghdcw_store.clearFilter();
        cpghdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpghdmxItemSelected: function (sender, record) {
        //console.log("ckmcid",record);


        var cpghdcw_store = that.lookupReference('cpghdmxcw0').getStore();
        var mxid = record.data.mxid
        //console.log("ckmcid",mxid);
        cpghdcw_store.clearFilter();
        //cpghdcw_store.each(function (rec) {
        //    console.log("ckdcw",rec);
        //})
        cpghdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    /*
    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },*/
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
    
    onSelectCkbmView: function (record) {
            treeSelect('ckmc', that, '', that.viewname, true);
            return false;
    },
        
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    onCpghdshOkSubmit: function () {

        that.CpghdshSave('ok', this);
    },
    onCpghdshDeleteSubmit: function () {
        that.CpghdshSave('delete', this);
    },
    CpghdshSave: function (loc, the) {
        return ;
        var p = the.lookupReference('popupCpghdWindow').getViewModel();
        var ghid = p.get('ghid');
        if (ghid == 0) {
            return;
        }


      if (issave) return ;
      issave=true;
        
    the.lookupReference('popupCpghdWindow').down("#btnCpghdSave").setHidden(true);
        var gsby = [];
        
        var cpghdmx_store = that.lookupReference('CpghdmxGrid').getStore();
        
        var gsbyrec = {};
        cpghdmx_store.each(function (rec) {
            if (rec.data.jeid > 0) {
                gsbyrec = {};
                gsbyrec["jeid"] = rec.data.jeid;
                gsbyrec["gs"] = rec.data.gs;
                gsbyrec["byg"] = rec.data.byg;
                gsbyrec["cg"] = rec.data.cg;
                gsby.push(gsbyrec);
            }
        })
        var ghsh = {};
        ghsh["ghid"] = ghid;
        ghsh["gsby"] = gsby;
        //ghsh["fhbz"] = 1;
        var msg = "过户单号：" + p.get('ghdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此过户单内容？";
        if (loc == 'ok') {
            title = "真的财务审核通过此过户单内容？";
        }
        that.loc = loc;
        that.ghid = ghid;
//        console.log(ghsh);
//        return ;
        

        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "过户单财务审核",
                no: "放 弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupCpghdWindow').down("#btnCpghdSave").setHidden(true);
                    var str = obj2str(ghsh);
                    var encodedString = base64encode(Ext.encode(str));
                    AjaxDataSave('cpghdghlocsave', loc, encodedString, ghshsaveCallBack, the);


                }
            }
        });





        /*   var abc = Ext.Msg.confirm(title, msg, function (e) {
               if (e == 'yes') {
                   // AjaxDataSave('cpghdshsave', loc, ckid, saveCallBack, the);
                   var str = obj2str(ghsh);
                   var encodedString = base64encode(Ext.encode(str));
                   AjaxDataSave('cpghdshsave', loc, encodedString, saveCallBack, the);
               }
           })
           */

    }
});

