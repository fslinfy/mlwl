var that;
Ext.define('MyApp.view.main.customer.CustomerCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CustomerCtrl',
    requires: [
        'MyApp.view.main.customer.CustomerView'
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
    onBtnNewClick: function (rs) {
        this.getView().getStore().addSorted([{ L_id: sys_location_id, password: base64encode('8888') }]);
        return false;
    },
    onBtnDeleteClick: function (button, e, options) {
        var store = this.getView().getStore();
        var grid = Ext.getCmp('CustomerGrid');
        return storeBtnDeleteClick(this, grid, store);
    },
    onBtnHelpClick: function (button, e, options) {
        var changes = this.getView().getSession().getChanges();

        console.log(" help", changes)
        return false;
    },
    onBtnSaveClick: function (button, e, options) {
        var store = this.getView().getStore();
        return storeBtnSaveClick(this, store);
    },
    onBtnUndoClick: function (button, e, options) {
        this.getView().getStore().rejectChanges();
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
        tool.down('#btnNew').setHidden(false);
        tool.down('#btnSave').setHidden(false);
        tool.down('#btnDelete').setHidden(false);
        tool.down('#btnUndo').setHidden(false);
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#button1": {
                click: this.onButtonAddClick
            },
            "#btnNew": {
                click: this.onBtnNewClick
            },
            "#btnSave": {
                click: this.onBtnSaveClick
            },
            "#btnpackingSave": {
                click: this.onBtnPackingSaveClick
            },



            "#btnDelete": {
                click: this.onBtnDeleteClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#btnUndo": {
                click: this.onBtnUndoClick
            }
            ,
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


        if (khid > 0) {
            var record = {};
            record['khid'] = khid;
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

            packing_store.on('load', function (store, records, options) {
                store.each(function (rec) {
                    var Pid = parseInt(rec.data.id);
                    if (Pid > 0) {
                        //  console.log(Pid,rec.data.id)
                    }
                    else {
                        // console.log(rec.data, rec.data.PS_name)
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
                    }
                })
            }, this);
            packing_store.reload();

            /*
            var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
            var store = this.listmxstore;
            store.each(function (rec) {
                if (rec.data.jkid == jkid) {
                    cpjkdmx_store.add(rec);
                }
            })
            var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
            cpjkdcw_store.proxy.extraParams.jkid = jkid;
            cpjkdcw_store.proxy.extraParams.loc = 'cpjkdmxcksh';
            cpjkdcw_store.reload();
            imagesload(jkid);
            var p = this.lookupReference('popupCpjkdWindow');
            p.down("#btnCpjkdSave").setHidden(false);
            p.down("#btnImagesAdd").setHidden(false);
    
            p.down("#btnCpjkdSave").setText("复核确认");*/
        }

    }

})

