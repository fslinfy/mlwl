sys_DisplayAll = "cpkc";
var LODOP;
var that;
var cpkcmxStore;



Ext.define('MyApp.view.main.cpkc.CpkclocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpkclocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpkclocView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCdmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],
    locQuery: function () {
        var ckid = that.viewname.getViewModel().get('ckid');
        var khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var store = that.viewname.getStore();
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        var ckid = that.viewname.getViewModel().get('ckid');
        var khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var store =this.getView().getStore();
        cpkcmxStore.proxy.extraParams.p_l_id = ckid;
        cpkcmxStore.proxy.extraParams.khid = khid;
        cpkcmxStore.proxy.extraParams.cdid = cdid;
        cpkcmxStore.proxy.extraParams.cpid = cpid;
        cpkcmxStore.reload();
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
   //     this.printtest();
        return;
    },
    init: function () {
        that = this;
        that.viewname = that.getView();
        if (sys_customer_id > 0) {
            that.viewname.getViewModel().set('khid', sys_customer_id);
            that.viewname.getViewModel().set('khmc', sys_customer_name);
        }
        if (sys_location_id > 0) {
            that.viewname.getViewModel().set('ckid', sys_location_id);
            that.viewname.getViewModel().set('ckmc', sys_location_name);
        }


        cpkcmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpkcmxStore',
            model: 'MyApp.model.CpkcmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpkcmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_l_id: sys_location_id,
                    khid: sys_customer_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            autoLoad: false
        });
        cpkcmxStore.on("load", function () {
            that.locQuery();
        });
        that.onBtnQueryClick();
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
            "#btnQueryCdmc": {
                click: this.onSelectCdbmView
            },
            "#btnQueryCpmc": {
                click: this.SelectCpbmView
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        var store = that.viewname.getStore();
    },


    cdmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },



    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, 'cpkc', that.viewname, true);
        return false;
    },

    onSelectCdbmView: function (record) {
        treeSelect('cdmc', that, 'cpkc', that.viewname, true);

        return false;
    },
    SelectCpbmView: function (record) {
        treeSelect('cpmc', that, 'cpkc', that.viewname, true);
        return false;
    },


    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('khmc')) || regExp.test(record.get('cpgg')) || regExp.test(record.get('cpph'));
        });
    }
});

