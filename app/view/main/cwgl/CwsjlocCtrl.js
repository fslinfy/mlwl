var that;
/*
var cwsjsaveCallBack=function(th)
{
  th.onBtnQueryClick()
};*/
Ext.define('MyApp.view.main.cwgl.CwsjlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CwsjlocCtrl',
    requires: [
        'MyApp.view.main.cwgl.CwsjlocView'
       //'MyApp.view.main.cwgl.CwsjEdit'
    ],
    locQuery: function (th) {
        var v = that.viewname.getViewModel();
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');
        var store =that.viewname.getStore();
        store.proxy.extraParams.shzt =1;
        store.proxy.extraParams.startdate = d1;
        store.proxy.extraParams.enddate = d2;
        store.proxy.extraParams.p_l_id =sys_location_id;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
      //  this.getView().getStore().load();
        this.locQuery(this)
        return false;
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);

        return false;
    },
    /*onBtnNewClick: function (rs) {
        //this.getView().getStore().addSorted([{ E_code: sys_enterprise_code }]);

        var rec = {};
        rec["sjrq"] = new Date();
        rec["srje"] = 0;
        rec["jcje"] = 0;
        rec["czy"] = sys_userInfo.username;

        var view = this.getView();
        this.view = view;
        this.dialog = view.add({
            xtype: 'formcwsjwindow',
            viewModel: {
                data: rec
            },
            session: true
        });
        this.dialog.show();
    },*/
    onBtnHelpClick: function (button, e, options) {
        return false;
    },
    onBeforeReload: function (store, records, options) {
        var store = this.getView().getStore();
        return storeBeforeReload(this, store);
    },

    init: function () {
        that = this;
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnNew').setHidden(true);
        tool.down('#btnSave').setHidden(true);
        tool.down('#btnDelete').setHidden(true);
        tool.down('#btnUndo').setHidden(true);
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            /*"#btnNew": {
                click: this.onBtnNewClick
            },*/
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            /*"#btnFormSubmit": {
                click: this.onFormSubmit
            },*/

            "#FilterField": {
                change: this.onFilterChange
            }
        });
        that.viewname = that.getView();
        var v = that.viewname.getViewModel();
        v.set('start_date', start_date);
        v.set('end_date', end_date);
        that.viewname.down('#QueryDate').setHidden(false);
        this.locQuery(this)
        
       // store.on('beforeload', this.onBeforeReload, this);
    },
    onFilterChange: function (v) {
        var store = this.getView().getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cwzy'));
        });

    }/*,
    onCwsjshcl: function (button) {
        var rec = button.getWidgetRecord();
        var sjid = rec.data.sjid;
//console.log(rec.data);


   
        if (sjid == 0) {
            return;
        }
        var msg = "<br>流水号：" + rec.get('sjdh') + "<br><br>日期：" +Ext.util.Format.date( rec.get('sjrq'), 'Y-m-d') ;
        msg =msg+ "<br><br>客户：" + rec.get('khmc') + "<br><br>摘要：" + rec.get('cwzy');
        if (rec.data.srje>0)
            {
            msg =msg+ "<br><br>收入金额：" + rec.get('srje') 
            }
        if (rec.data.jcje>0)
            {
            msg =msg+ "<br><br>支出金额：" + rec.get('jcje') 
            }
        
        
        msg =msg+ "<br><br>备注：" + rec.get('cnote') + "<br><br>操作：" + rec.get('czy')+"<br>";
        
        
        

        Ext.MessageBox.show({
            title: "注意！",
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "审核确认",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                console.log(btn, text);
                if (btn == "yes") {
                    AjaxDataSave('cwsjupdate', "sjsh", sjid, cwsjsaveCallBack, that);
                }
            }
        });

    },

    onFormSubmit: function () {

        var formPanel = that.lookupReference('popupWindow');
        //    form = formPanel.getForm();
        var form = that.lookupReference('windowForm');




        if (form.isValid()) {

            var p = that.lookupReference('popupWindow').getViewModel();
            var record = form.getValues();
            record["E_code"] = sys_enterprise_code;
            var obj = record;
            obj["id"] = record['id'];
            obj["update"] = "";
            obj['sjrq'] = Ext.decode(Ext.encode(p.get('sjrq')));
            console.log(obj);
            Ext.Ajax.request({
                method: 'POST',
                url: sys_ActionPHP + '?act=cwsjupdate',
                scope: this,
                params: obj,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        that.lookupReference('popupWindow').close();
                        //that.onBtnQueryClick;  
                        var store = that.view.getStore();
                        store.load();
                        Ext.MessageBox.alert('提示!', '收支数据保存成功！');

                    }
                    else {
                        console.log('错误', '数据保存失败！');
                    }
                },
                failure: function () {
                    console.log('错误', '发生错误！');
                }
            });

            // this.dataSave(obj);
            //form.reset();
            //this.lookupReference('popupWindow').close();
        }
    }
*/


})
