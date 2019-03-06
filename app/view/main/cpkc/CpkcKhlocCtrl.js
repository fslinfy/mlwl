sys_DisplayAll = "cpkc";
var that;
Ext.define('MyApp.view.main.cpkc.CpkcKhlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpkcKhlocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpkcKhlocView'
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
        store.proxy.extraParams.loc = "cpkckhloc";
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery();
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
        this.locQuery()
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

