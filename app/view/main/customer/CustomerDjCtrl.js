var PageTitleName ='客户独立仓租单价定义';
var that;
Ext.define('MyApp.view.main.customer.CustomerDjCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomerDjCtrl',
    requires: [
        'MyApp.view.main.tree.PageTitle',
        "MyApp.model.CustomerModel",
        'MyApp.store.PackingStore',
        'MyApp.model.PackingModel',
        'MyApp.view.main.customer.PackingEditView',
        'MyApp.view.main.QueryToolbarView',
        'MyApp.view.main.customer.CustomerDjView'
    ],
    onBtnQueryClick: function (button, e, options) {
        this.getView().getStore().load();
        return false;
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        var changes = this.getView().getSession().getChanges();

        console.log(" help", changes)
        return false;
    },
    onBeforeReload: function (store, records, options) {
        var store = this.getView().getStore();
        return storeBeforeReload(this, store);
    },
    onBtnCancelClick: function (button, e, options) {
        var win = this.lookupReference('popupWindow');
        win.close()
        return false;
    },

    init: function () {
        that = this;
        var tool = this.getView().down("#QueryToolbarView");
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnpackingSave": {
                click: this.onBtnPackingSaveClick
            },


            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            
            "#Cancel": {
                click: this.onBtnCancelClick
            },
            "#FilterField": {
                change: this.onFilterChange
            }
        });



        var store = this.getView().getStore();
        store.on('beforeload', this.onBeforeReload, this);
    },



    onFilterChange: function (v) {
        //return storeFilter(this.getView().getStore(),'C_name',v.rawValue);
        var store = this.getView().getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('C_name')) || regExp.test(record.get('C_code')) || regExp.test(record.get('Py_code'));
        });
    },
    onBtnPackingSaveClick: function () {
        var store = that.lookupReference('packingmxGrid').getStore();
        // store.proxy.extraParams.khid = khid;
        // store.proxy.extraParams.p_l_id =sys_location_id;
        // store.proxy.extraParams.p_e_code=sys_enterprise_code;
        store.sync({
            success: function (batch, options) {
                var p = this.lookupReference('popuppackingWindow');
                p.close();
            },
            failure: function (batch, options) {
                Ext.Msg.alert('提示信息', '添加失败!');
            },
            scope: that
        });
    },
    onPackingEdit: function (button) {

        if (sys_location_id == 0)
            return;
        var rec = button.getWidgetRecord();
        var khid = parseInt(rec.id);
        var khmc = rec.data.C_name;
        if (khid == NaN) {
            return;
        }

//console.log("khid=",khid);
        if (khid > 0) {
            var record = {};
            record['khid'] = khid;
            record['L_id'] =sys_location_id ;
            record['khmc'] = khmc;
            record['title'] = khmc + "  单价维护";
            var view = this.getView();
            this.isEdit = false;
            this.dialog = view.add({
                xtype: 'formpackingwindow',
                viewModel: {
                    data: record
                },
                session: true
            });
            this.dialog.show();


            var packing_store = this.lookupReference('packingmxGrid').getStore();
            packing_store.proxy.extraParams.khid = khid;
            packing_store.proxy.extraParams.p_l_id = sys_location_id;
            packing_store.proxy.extraParams.p_e_code = sys_enterprise_code;
            packing_store.proxy.extraParams.optype ="customer";
            packing_store.on('load', function (store, records, options) {
                store.each(function (rec) {
                  //  console.log("rec",rec.data)
                    var Pid = parseInt(rec.data.id);
                    if (Pid > 0) {
                        //console.log(Pid,rec.data.id)
                    }
                    else {
                        //console.log(rec.data, rec.data.PS_name)
                        rec.set('Pid', rec.data.PS_id);
                        rec.set('Czdj', rec.data.Czdj0);
                        rec.set('Phdj', rec.data.Phdj0);
                        rec.set('Czdj2', rec.data.Czdj20);
                        rec.set('Phdj2', rec.data.Phdj20);
                        rec.set('Bydj', rec.data.Bydj0);
                        rec.set('Pbdj', rec.data.Pbdj0);
                        rec.set('Ghdj', rec.data.Ghdj0);
                        rec.set('Pfdj', rec.data.Pfdj0);
                        rec.set('mints', rec.data.mints0);
                        rec.set('czts', rec.data.czts0);
                    }
                })
            }, this);
            packing_store.reload();

        }

    }

})

