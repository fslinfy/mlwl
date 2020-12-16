var cztsfl=360;
Ext.Ajax.request( {
    url:"mysql_action.PHP?act=getsqlselect&sql=select * from sys_ini where varmc='CZTSFL' ", //跨域请求的URL
    method : 'GET',
    dataType:'json',
    headers: {'Content-Type':'application/json'},
    async: false,
    //jsonData:Ext.util.JSON.decode(paraMap),
   success : function(response, options) {
       var o = Ext.util.JSON.decode(response.responseText);
       var rs=o['rows'] ;
       var oj=rs[0];
      cztsfl=oj['VARVALUE'];
   },
   failure : function() {
    console.log("failure")
   }
});


Ext.define("MyApp.view.main.packing.PackingCtrl", {
    extend: "Ext.app.ViewController",
    alias: "controller.PackingCtrl",
    requires: ["MyApp.view.main.packing.PackingView"],
    onBtnQueryClick: function(button, e, options) {
        this.getView().getStore().load();
        return false
    },
    onItemSelected: function(sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down("#btnEdit").setDisabled(false);
        tool.down("#btnDelete").setDisabled(false);
        return false
    },
    onBtnNewClick: function(rs) {
        this.getView().getStore().addSorted([{
            E_code: sys_enterprise_code
        }]);
        return false
    },
    onBtnDeleteClick: function(button, e, options) {
        var store = this.getView().getStore();
        var grid = Ext.getCmp("PackingGrid");
        return storeBtnDeleteClick(this, grid, store)
    },
    onBtnHelpClick: function(button, e, options) {
        console.log("Packing help");
        return false
    },
    onBtnSaveClick: function(button, e, options) {
        var store = this.getView().getStore();
        return storeBtnSaveClick(this, store)
    },
    onBtnUndoClick: function(button, e, options) {
        this.getView().getStore().rejectChanges();
        return false
    },
    onBeforeReload: function(store, records, options) {
        var store = this.getView().getStore();
        return storeBeforeReload(this, store)
    },
    onBtnCancelClick: function(button, e, options) {
        var win = this.lookupReference("popupWindow");
        win.close();
        return false
    },
    init: function() {
        var that=this;
        var tool = this.getView().down("#QueryToolbarView");
        tool.down("#btnNew").setHidden(false);
        tool.down("#btnSave").setHidden(false);
        tool.down("#btnDelete").setHidden(false);
        tool.down("#btnUndo").setHidden(false);
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
            },
            "#Cancel": {
                click: this.onBtnCancelClick
            },
            "#FilterField": {
                change: this.onFilterChange
            }
        });
        console.log("test");
        /*$.ajax({
            //dataType:"jsonp",
            //jsonp: "jsoncallback",//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            url:"http://localhost:8080/mysql_action?act=getsqlselect&sql=select * from sys_ini where varmc='CZTSFL' ", //跨域请求的URL
            method:"GET",  // jquey是不支持post方式跨域的
            success:function(data){
             Console.log(data);

            }//成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        });
*/
  /*      Ext.Ajax.request( {
            url:"mysql_action.PHP?act=getsqlselect&sql=select * from sys_ini where varmc='CZTSFL' ", //跨域请求的URL
            method : 'GET',
            dataType:'json',
            headers: {'Content-Type':'application/json'},
            //jsonData:Ext.util.JSON.decode(paraMap),
           success : function(response, options) {
               var o = Ext.util.JSON.decode(response.responseText);
               var rs=o['rows'] ;
               var oj=rs[0];
               cztsfl=oj['VARVALUE'];

                //console.log(o,rs,oj,cztsfl,oj.VARVALUE);
                var store = that.getView().getStore();
                store.on("beforeload", that.onBeforeReload, that)
           },
           failure : function() {
            console.log("failure")
           }
        });
           
    */

     var store = that.getView().getStore();
      store.on("beforeload", that.onBeforeReload, that)
    },

    


    onFilterChange: function(v) {
        var store = this.getView().getStore();
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function(record, id) {
            return regExp.test(record.get("PS_name")) || regExp.test(record.get("PS_code"))
        })
    },
    onEditCustomerClick: function(button) {
        this.createDialog(button.getWidgetRecord())
    },
    createDialog: function(record) {
        var view = this.getView();
        this.isEdit = !!record;
  //      console.log("record");
    //    console.log(record);
        this.dialog = view.add({
            xtype: "formwindow",
            viewModel: {
                data: record.data
            },
            session: true
        });
        this.dialog.show()
    },
    onSaveClick: function() {
//        console.log("save");
        var dialog = this.dialog,
        form = this.lookupReference("windowForm"),
        isEdit = this.isEdit,
        id;
        if (form.isValid()) {
            if (!isEdit);
            dialog.getSession().save();
            if (!isEdit);
            this.onCancelClick()
        }
    },
    onCancelClick: function() {
        this.dialog = Ext.destroy(this.dialog)
    }
});