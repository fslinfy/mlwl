var that;
var typeid = 0;

Ext.define('MyApp.view.main.work.WorkCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WorkCtrl',
    requires: [
        'MyApp.store.WorkStore',
	    'MyApp.view.main.QueryToolbarView'
        ,'MyApp.view.main.work.WorkView'
        ,'MyApp.view.main.tree.CkmcSelectTree'
    ],
    onBtnQueryClick: function (button, e, options) {
        this.getView().getStore().load();
        return false;
    },
    onSelectckmcView:function(button, e, options)
    {
        console.log("help");
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);
        return false;
    },
    onBtnNewClick: function (rs) {
        this.getView().getStore().addSorted([{ E_code: sys_enterprise_code, L_id:sys_location_id,Weight_status:1,Active:1}]);
        return false;
    },
    onBtnDeleteClick: function (button, e, options) {
        var store = this.getView().getStore();
        var grid = Ext.getCmp('WorkGrid');
        return storeBtnDeleteClick(this, grid, store);
    },
    onBtnHelpClick: function (button, e, options) {
        console.log("help")
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
            },
            "#btnCkmcTreeAdd": {
                click: this.onCkmcSelectOkClick
            }
        });
        var store = this.getView().getStore();
        store.on('beforeload', this.onBeforeReload, this);
    },
    onCkmcSelectOkClick: function (b) {

        var records = that.getView().down("#selectCkmcTreePanel").getChecked();
        var names = [];

        var ckstr = [];

        Ext.Array.each(records, function (rec) {
            names.push(rec.get('text'));
            ckstr.push(rec.get('id'));

        });
        // console.log(ckstr, names)
        var selection = that.recordID;
        if (selection != undefined) {
            var str = "," + ckstr.join(',') + ","
            if (str == ",,") str = "";
            selection.set('lidstring', str);
            that.getView().down("#selectCkmcWindow").close();
        }
    },

/*    onSelectckmcView: function (button) {
        console.log("rec.data.lidstring");
        var rec = button.getWidgetRecord();
        console.log(rec.data.lidstring);
        var record = [];
        record['lidstring'] = rec.data.lidstring;
        that.recordID = rec;
        that.checkedidstring = rec.data.lidstring;
        var view = that.getView();
        that.dialog = view.add({
            xtype: 'selectCkmcWindow',
            viewModel: {
                data: record
            },
            session: true
        });
        that.dialog.show();
    },
*/

    onFilterChange: function (v) {
        return storeFilter(this.getView().getStore(), 'Jobsname', v.rawValue);
    }



})
