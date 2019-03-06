﻿sys_DisplayAll = "";
var that;
Ext.define('MyApp.view.main.cpkc.CpjxcmxlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpjxcmxlocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpjxcmxlocView'
    ],
    locQuery: function (the) {

        var v = the.getView().getViewModel();
        var ckid = v.get('ckid');
        var khid = v.get('khid');
        var cpid = v.get('cpid');
        var cdid = v.get('cdid');

        var ny = v.get('ny');
        var yu = v.get('yu');
        console.log(khid,ckid,cdid,cpid);
       if (khid==0)
        {
            Ext.MessageBox.alert('注意！', '请选择客户名称！');
            return false

        }

        if (khid==0)
        {
            Ext.MessageBox.alert('注意！', '请选择商品名称！');
            return false

        }
        CpjxcmxlocStore.proxy.extraParams.p_l_id = ckid;
        CpjxcmxlocStore.proxy.extraParams.khid = khid;
        CpjxcmxlocStore.proxy.extraParams.cpid = cpid;
        CpjxcmxlocStore.proxy.extraParams.cdid = cdid;
        CpjxcmxlocStore.proxy.extraParams.ny = ny;
        CpjxcmxlocStore.proxy.extraParams.yu = yu;
        CpjxcmxlocStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        return false;
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
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
             "#btnQueryCdmc": {
                click: this.SelectCdbmView
            },

            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnQueryCpmc": {
                click: this.SelectCpbmView
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        var v = this.getView().getViewModel();
        
       // this.locQuery(this);
    },



    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },



    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.viewname, true);
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },



    SelectCpbmView: function (record) {
        treeSelect('cpmc', that, '', that.viewname, true);
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    SelectCdbmView: function (record) {
        treeSelect('cdmc', that, '', that.viewname, true);
        return false;
    },
    cdmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    }
});

