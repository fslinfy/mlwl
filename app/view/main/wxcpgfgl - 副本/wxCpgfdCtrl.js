var gfid = 0;
var that;

var wxcpgfdmxStore;
Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wxCpgfdCtrl',
    requires: [
        'MyApp.view.main.wxcpgfgl.wxCpgfdView'
        //, 'MyApp.view.main.wxcpgfgl.wxCpgfdEdit'
        //, 'MyApp.view.main.tree.WorkerSelectTree'
        //, 'MyApp.view.main.report.PrintwxCpgfd'
    ],
    locQuery: function (the) {

        var v = that.viewname.getViewModel();
        var khid = v.get('khid');

        //start_date = v.get('start_date');
        //end_date = v.get('end_date');
        //var d1 = Ext.Date.format(start_date, 'Y-m-d');
        //var d2 = Ext.Date.format(end_date, 'Y-m-d');
        var store = wxcpgfdmxStore;
       // var bz = v.get('deletebz');
      //  if (bz) {
       ///     bz = 1;
       // }
       // else {
       //     bz = 0;
       // }
       // store.proxy.extraParams.deletebz = bz;
        store.proxy.extraParams.khid = khid;
        //store.proxy.extraParams.startdate = d1;
        //store.proxy.extraParams.enddate = d2;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(that);
        return false;
    },
    init: function () {
        that = this;
        that.viewname = that.getView().down("#wxCpgfdListGrid");
        var v = that.viewname.getViewModel();
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
        wxcpgfdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.wxCpgfdmxStore0',
            model: 'MyApp.model.wxCpgfdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=wxCpgfdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "wxcpgfdmxfhck",
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

        wxcpgfdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            // var ckid = v.get('ckid');
            var store = that.viewname.getStore();




          //  start_date = v.get('start_date');
          //  end_date = v.get('end_date');
          //  var d1 = Ext.Date.format(start_date, 'Y-m-d');
          //  var d2 = Ext.Date.format(end_date, 'Y-m-d');
          //  var bz = v.get('deletebz');
         //   if (bz) {
          //      bz = 1;
          //  }
          //  else {
          //      bz = 0;
          //  }
           // store.proxy.extraParams.deletebz = bz;
            store.proxy.extraParams.khid = khid;
            //store.proxy.extraParams.startdate = d1;
           // store.proxy.extraParams.enddate = d2;
            //store.reload();



            store.proxy.extraParams.loc = 'wxcpgfdfhck';
            store.reload();
        });
        that.listmxstore = wxcpgfdmxStore;
        that.liststore = that.viewname.getStore();



        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },
            "#btnPrintwxCpgfd": {
                click: this.onPrintwxCpgfd
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },

            "#FilterField": {
                change: this.onFilterChange
            }
        });


     //   that.getView().down('#QueryDate').setHidden(false);
        that.getView().down('#QueryKhmc').setHidden(false);
       // that.getView().down('#deletebz').setHidden(false);
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
    onwxCpgfdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        gfid = rec.data.gfid;
        var record = rec.data;
        record['btnButtonHidden'] = false;
        record['op'] = 'ywsh';
        record['gsop'] = true;
        record['title'] = '商品过车单-边车处理';
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
        var cpgfdmx_store = this.lookupReference('wxCpgfdmxGrid').getStore();
        cpgfdmx_store.proxy.extraParams.gfid = gfid;
        cpgfdmx_store.proxy.extraParams.loc = 'wxcpgfdmfhck';
        cpgfdmx_store.reload();
        var p = that.lookupReference('gfdpopupWindow');

        p.down("#btnAddCpmc").setHidden(true);

        p.down("#btnDeleteCpmc").setHidden(true);
        //p.down("#btnDeleteCpmc").setText("删除此单");
        p.down("#wxCpgfdFormSubmit").setHidden(true);
        //p.down("#wxCpgfdFormSubmit").setText("审核此单");
        p.down("#btnPrintwxCpgfd").setHidden(false);

    },


    onPrintwxCpgfd: function () {
        var p = that.lookupReference('gfdpopupWindow').getViewModel();
        PrintwxCpgfdgfid(p.get('gfid'));
        return;
    }
});

