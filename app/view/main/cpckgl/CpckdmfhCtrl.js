var that;
var cpckdmxStore;
Ext.define('MyApp.view.main.cpckgl.CpckdmfhCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpckdmfhCtrl',
    requires: [
        'MyApp.view.main.cpckgl.CpckdmfhView'
    ],
    locQuery: function (that) {
        cpckdmxStore.proxy.extraParams.loc ="cpckdmxmfh";
        cpckdmxStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
      this.locQuery(this);
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
         console.log(" help");
        return false;
    },

    init: function () {
        that = this;
          that.viewname = that.getView().down("#CpckdListGrid");
        var v=that.viewname.getViewModel();
        v.set('start_date', start_date);
        v.set('end_date', end_date);
        
        

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
                    loc: "cpckdmxmfh",
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
        
            var store = that.viewname.getStore();
            store.proxy.extraParams.loc = 'cpckdmfh';
            store.reload();

        });
        
        this.locQuery(this) ;  
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
                click: this.onSelectKhbmView1
            },
            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
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
        this.onBtnQueryClick();

    },
    onFilterChange: function (v) {
         var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('ckmc')) || regExp.test(record.get('ckdh')) || regExp.test(record.get('xsdh'));
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

    onCpckdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        var ckid = rec.data.ckid;
        var  record = rec.data;
        record['btnButtonHidden'] = true;
        record['title'] = '商品出库单';
        var view = this.getView();
        this.isEdit = false;// !!record;
        this.dialog = view.add({
            xtype: 'cpckformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();
        console.log("ckid",ckid);
        /*var cpckdcw_store = that.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.proxy.extraParams.ckid = ckid;
        cpckdcw_store.proxy.extraParams.loc = 'ckid';
        cpckdcw_store.load();*/
        var cpckdmx_store = that.lookupReference('CpckdmxGrid').getStore();
        /*cpckdmx_store.on("load", function () {
            var mxid = cpckdmx_store.getAt(0).get('mxid');
            cpckdcw_store.clearFilter();
            cpckdcw_store.filterBy(function (record, id) {
                return record.get('ckmxid') == mxid;
            });
        }
        )*/
        cpckdmx_store.proxy.extraParams.ckid = ckid;
        cpckdmx_store.load(); 
        /*
        var cpckdmx_store = this.lookupReference('CpckdmxGrid').getStore();
  
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.proxy.extraParams.ckid = ckid;
        cpckdcw_store.proxy.extraParams.loc='ckid';
        cpckdcw_store.load();

        cpckdmxStore.each(function (rec) {
            if (rec.data.ckid ==ckid) {
                cpckdmx_store.add(rec);
            }
        })
 
        this.onGridReload();
        */

    },
    onGridReload: function () {

        var store = this.lookupReference('CpckdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpckdmxItemSelected: function (sender, record) {
        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        var mxid = record.data.mxid
        cpckdcw_store.clearFilter();
        cpckdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    }
});



