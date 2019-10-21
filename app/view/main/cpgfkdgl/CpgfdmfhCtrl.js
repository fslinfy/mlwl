var gfid = 0;
var that;

var cpgfdmxStore0;
var gfdDeleteCallBack = function (th) {
    var p = th.lookupReference('gfdpopupWindow');
    p.close();
    th.locQuery();
    Ext.MessageBox.alert('提示！', '此过车单内容已作废！');

};

Ext.define('MyApp.view.main.cpgfkdgl.CpgfdmfhCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpgfdmfhCtrl',
    requires: [
        'MyApp.view.main.cpgfkdgl.CpgfdmfhView'
        , 'MyApp.view.main.cpgfkdgl.CpgfdEdit'
        , 'MyApp.view.main.tree.WorkerSelectTree'
        , 'MyApp.view.main.report.PrintCpgfkd'
    ],
    locQuery: function (the) {

        var v = that.viewname.getViewModel();
        var khid = v.get('khid');


        var store = cpgfdmxStore0;
        bz = 0;
        /*
        var bz = v.get('deletebz');
        if (bz) {
            bz = 1;
        }
        else {
            bz = 0;
        }
       */
        store.proxy.extraParams.deletebz = bz;
        store.proxy.extraParams.khid = khid;
       // store.proxy.extraParams.startdate = d1;
      //  store.proxy.extraParams.enddate = d2;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(that);
        return false;
    },
    init: function () {
        that = this;
        that.viewname = that.getView().down("#CpgfdListGrid");
        var v = that.viewname.getViewModel();
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
      //  v.set('start_date', start_date);
      //  v.set('end_date', end_date);
        cpgfdmxStore0 = Ext.create('Ext.data.Store', {
            alias: 'store.cpgfdmxStore0',
            model: 'MyApp.model.CpgfdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=wxCpgfdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "wxcpgfdmxmfh",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    gfid: 0,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cpgfdmxStore0.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            // var ckid = v.get('ckid');
            var store = that.viewname.getStore();




         //   start_date = v.get('start_date');
         //   end_date = v.get('end_date');
          //  var d1 = Ext.Date.format(start_date, 'Y-m-d');
         //   var d2 = Ext.Date.format(end_date, 'Y-m-d');
            var bz = v.get('deletebz');
            if (bz) {
                bz = 1;
            }
            else {
                bz = 0;
            }
            store.proxy.extraParams.act = "wxCpgfdlist_pc";

            store.proxy.extraParams.loc = "wxcpgfdmfh";
            store.proxy.extraParams.deletebz = bz;
            store.proxy.extraParams.khid = khid;
         //   store.proxy.extraParams.startdate = d1;
          //  store.proxy.extraParams.enddate = d2;
            store.reload();


        });
        that.listmxstore = cpgfdmxStore0;
        that.liststore = that.viewname.getStore();



        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },
            "#btnPrintCpgfd": {
                click: function () {
                    PrintCpgfkdgfid(gfid);
                }
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnDeleteCpmc": {
              //  click:function () {
               //     
                 // console.log("#btnDeleteCpmc");
              //  }  
                
                click: this.onCpgfdshDeleteSubmit
            },

            "#FilterField": {
                change: this.onFilterChange
            }
        });


        that.getView().down('#QueryDate').setHidden(true);
        that.getView().down('#QueryKhmc').setHidden(false);
        that.getView().down('#deletebz').setHidden(true);
      
        
        
        that.locQuery(that);
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setHidden(true);
    },

    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('xmmc')) || regExp.test(record.get('gfdh'));
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
    onCpgfdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        console.log(rec);
        gfid = rec.data.gfid;
        var record = rec.data;
        record['btnButtonHidden'] = false;
        record['op'] = 'ywsh';
        record['gsop'] = true;
        record['title'] = '商品过车单-查询';
        record['w'] = 0;
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({
            xtype: 'formgfdwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
        cpgfdmx_store.proxy.extraParams.gfid = gfid;
        cpgfdmx_store.proxy.extraParams.act = 'wxCpgfdmxlist_pc';
        cpgfdmx_store.proxy.extraParams.loc = 'wxcpgfdmxmfh';
        cpgfdmx_store.reload();
        var p = that.lookupReference('gfdpopupWindow');

        p.down("#btnAddCpmc").setHidden(true);

        
        p.down("#CpgfdFormSubmit").setHidden(true);
        //p.down("#CpgfdFormSubmit").setText("审核此单");
        p.down("#btnPrintCpgfd").setHidden(false);

        
        if (sys_system_lastdel) {

            if (!rec.data.delbz) {
                   p.down("#btnDeleteCpmc").setHidden(false);
                   p.down("#btnDeleteCpmc").setText("删除此单");
            }else{
                p.down("#btnDeleteCpmc").setHidden(true);

            }

        }

    },
    //onCpgfdshDeleteSubmit
    onCpgfdshDeleteSubmit: function () {
        var p = this.lookupReference('gfdpopupWindow').getViewModel();
        gfid = p.get('gfid');
        if (gfid == 0) {
            return;
        }

        var msg = "过车单："+ p.get('gfdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的作废此过车单内容？";
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
                    var p = that.lookupReference('gfdpopupWindow');
                    p.down("#btnDeleteCpmc").setHidden(true);
                    AjaxDataSave('cpgfkdmxsave', 'delete', gfid, gfdDeleteCallBack, that);
                }
            }
        })
    }//,
  //  onPrintCpgfd: function () {
    //    var p = that.lookupReference('gfdpopupWindow').getViewModel();
      //  PrintCpgfkdgfid(gfid);
      //  return;
   // }
});

