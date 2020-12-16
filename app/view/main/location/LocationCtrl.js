﻿ var that;
 Ext.define("MyApp.view.main.location.LocationCtrl",{extend:"Ext.app.ViewController",alias:"controller.LocationCtrl",
requires:["MyApp.view.main.location.LocationView"],onBtnQueryClick:function(button,e,options){this.getView().getStore().load();
    return false},onItemSelected:function(sender,record){var tool=this.getView().down("#QueryToolbarView");
    tool.down("#btnEdit").setDisabled(false);tool.down("#btnDelete").setDisabled(false);return false},
    onBtnNewClick:function(rs){this.getView().getStore().addSorted([{E_code:sys_enterprise_code}]);return false},
    onBtnDeleteClick:function(button,e,options){var store=this.getView().getStore();var grid=Ext.getCmp("LocationGrid");
    return storeBtnDeleteClick(this,grid,store)},onBtnHelpClick:function(button,e,options){console.log(" help");return false},
    onBtnSaveClick:function(button,e,options){var store=this.getView().getStore();return storeBtnSaveClick(this,store)},
    onBtnUndoClick:function(button,e,options){this.getView().getStore().rejectChanges();return false},
    onBeforeReload:function(store,records,options){var store=this.getView().getStore();return storeBeforeReload(this,store)},
    onBtnCancelClick:function(button,e,options){var win=this.lookupReference("popupWindow");win.close();return false},
    init:function(){
        that = this;
        var tool=this.getView().down("#QueryToolbarView");tool.down("#btnNew").setHidden(false);
    tool.down("#btnSave").setHidden(false);tool.down("#btnDelete").setHidden(false);
    tool.down("#btnUndo").setHidden(false);
    this.control(
        {"#btnQuery":{click:this.onBtnQueryClick},
    "#button1":{click:this.onButtonAddClick},
    "#btnNew":{click:this.onBtnNewClick},
    "#btnSave":{click:this.onBtnSaveClick},
    "#btnDelete":{click:this.onBtnDeleteClick},
    "#btnHelp":{click:this.onBtnHelpClick},
    "#btnUndo":{click:this.onBtnUndoClick},
    "#Cancel":{click:this.onBtnCancelClick},
    "#btnpackingSave": {
        click: this.onBtnPackingSaveClick
    },
    "#FilterField":{change:this.onFilterChange}
    }
    );
    
   

    var store=this.getView().getStore();store.on("beforeload",this.onBeforeReload,this)},
    onFilterChange:function(v)
    {var store=this.getView().getStore();var regExp=new RegExp(".*"+v.rawValue+".*");
    store.clearFilter();
    store.filterBy(function(record,id)
    {return regExp.test(record.get("L_name"))||regExp.test(record.get("L_code"))}
    )
    },


    onBtnPackingSaveClick: function () {
        var store = that.lookupReference('packingmxGrid').getStore();
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

//        if (sys_location_id == 0)
  //          return;
        var rec = button.getWidgetRecord();
        var Lid = parseInt(rec.id);
        var mc = rec.data.L_name;
        if (Lid == NaN) {
            return;
        }

//console.log("khid=",khid);
        if (Lid > 0) {
            var record = {};
            record['L_id'] = Lid;
            
            record['title'] = mc + "  单价维护";
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

            packing_store.proxy.extraParams.khid = 0;
            packing_store.proxy.extraParams.p_l_id = Lid;
            packing_store.proxy.extraParams.p_e_code = sys_enterprise_code;
            packing_store.proxy.extraParams.optype ="location";
            packing_store.on('load', function (store, records, options) {
                store.each(function (rec) {
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



});