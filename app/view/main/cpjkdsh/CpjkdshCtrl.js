

var  issave=false;
var that;
var jkdshsaveCallBack = function (th) {
    var p = th.lookupReference('popupCpjkdWindow');
    var mjkid = p.getViewModel().get('jkid');
    if (that.loc == "ok") {

        // 发信息

        Ext.Ajax.request({
            method: 'GET',
            url: "qcloudsmssend.php",
            params: {
                act: 'cpjkd',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                id:mjkid
            },
            scope: this,
            success: function (response) {
               /* console.log('response',response.responseText);
                var result = Ext.decode(response.responseText);
                result=response.responseText;
                console.log('result',result);
                if (result.result == 'success') {
                   // Ext.MessageBox.alert('错误!', '数据保存失败！');
                  //  that.getView().down("#cpxsdshowview").close();
                  //  that.locQuery(that);
                }
                else {
                    Ext.MessageBox.alert('提示!',result.msg);
                }*/
            }
        });




         


        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品进仓单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCpjkdJkid(mjkid);
                }
                p.close();
                that.locQuery();
            }
        });
    } else {
        p.close();
        that.locQuery();
    }

};
var cpjkdmxStore;
Ext.define('MyApp.view.main.cpjkdsh.CpjkdshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpjkdshCtrl',
    requires: [
        'MyApp.view.main.cpjkdsh.CpjkdshView'
        , 'MyApp.view.main.cpckgl.CpckdCtrlFunction'
        , 'MyApp.view.main.tree.WorkerSelectTree'
        , 'MyApp.view.main.UploadFiles'

    ],
    locQuery: function (the) {
        console.log('sh locquery');
        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        cpjkdmxStore.proxy.extraParams.loc = "cpjkdmxsh";
        cpjkdmxStore.proxy.extraParams.khid = khid;
        cpjkdmxStore.proxy.extraParams.ckid = ckid;
        cpjkdmxStore.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(that);
        return false;
    },
    init: function () {
        that = this;
        that.viewname = that.getView().down("#CpjkdListGrid");
        var v = that.viewname.getViewModel();
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
        cpjkdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpjkdmxStore',
            model: 'MyApp.model.CpjkdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpjkdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpjkdmxsh",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    jkdh: "09dc00d8-8837-417c-b38b-53f108a1b2c4",
                    p_e_code: sys_enterprise_code,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cpjkdmxStore.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.loc = 'cpjkdsh';
            store.reload();
        });
        that.listmxstore = cpjkdmxStore;
        that.liststore = that.viewname.getStore();

       

        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },

            "#btnCpjkdSave": {
                click: that.onCpjkdshOkSubmit
            },
            "#btnQueryKhmc": {
                 click:this.onSelectKhbmView
                /*click: function () {
                    SelectKhbmView();
                }*/
            },
            "#btnPrintCpjkd":{
                click: this.onPrintCpjkd
            }
            ,
            "#btnImagesAdd": {
                click: function () {
                    onImagesAdd();
                }
            },

            "#btnCpjkdDelete": {
                click: that.onCpjkdshDeleteSubmit
            },
            "#FilterField": {
                change: this.onFilterChange
            }
        });

console.log(sys_location_id,sys_customer_id);

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
        that.viewname.getViewModel().set('PageTitleName', '商品进仓单业务审核');
     that.locQuery(that);
    },
    /*
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc'))  || regExp.test(record.get('jkdh'));
        });
    },
    */

    //onSelectWorkerView: function (button) {

    //  SelectWorkerView(button);

    //},
    // onWorkerSelectOkClick: function () {
    //   WorkerSelectOkClick();
    // },
    onCpjkdmxShowView: function (button) {
        var rec = button.getWidgetRecord();
        var jkid = rec.data.jkid;
        var record = rec.data;

              
        issave=false;
        record['btnButtonHidden'] = false;
        record['op'] = 'ywsh';
        record['gsop'] = false;
        record['title'] = '商品进库单-复核';
        record['w'] = 40;
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({
            xtype: 'formcpjkdwindow',
            viewModel: {
                data: record
            },
            session: true
        });

        this.dialog.show();


        var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.jkid == jkid) {
                cpjkdmx_store.add(rec);
            }
        })
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        cpjkdcw_store.proxy.extraParams.jkid = jkid;
        cpjkdcw_store.proxy.extraParams.loc = 'cpjkdmxsh';
        cpjkdcw_store.reload();
        imagesload(jkid);
        var p = this.lookupReference('popupCpjkdWindow');
        p.down("#btnCpjkdSave").setHidden(!sys_system_sh);
        p.down("#btnImagesAdd").setHidden(!sys_system_sh);
        p.down("#btnPrintCpjkd").setHidden(true);
        p.down("#btnCpjkdDelete").setHidden(!sys_system_del);
    },
    onGridReload: function () {
        var store = this.lookupReference('CpjkdmxGrid').getStore();
        var mxid = store.getAt(0).get('mxid');
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        cpjkdcw_store.clearFilter();
        cpjkdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    onCpjkdmxItemSelected: function (sender, record) {
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        var mxid = record.data.mxid
        cpjkdcw_store.clearFilter();
        cpjkdcw_store.filterBy(function (record, id) {
            return record.get('mxid') == mxid;
        });
    },
    /*
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
     */
    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('jkdh'));
        });
    },
    onCpjkdshOkSubmit: function () {

        this.CpjkdshSave('ok', this);
    },
    onCpjkdshDeleteSubmit: function () {
        this.CpjkdshSave('delete', this);
    },
    CpjkdshSave: function (loc, the) {

        var p = the.lookupReference('popupCpjkdWindow').getViewModel();
        var jkid = p.get('jkid');
        if (jkid == 0) {
            return;
        }

      if (issave) return ;
      issave=true;
       the.lookupReference('popupCpjkdWindow').down("#btnCpjkdSave").setHidden(true);
        var cpjkdmx_store = that.lookupReference('CpjkdmxGrid').getStore();
        var gsby = [];
        var gsbyrec = {};
        cpjkdmx_store.each(function (rec) {
            if (rec.data.jeid > 0) {
                gsbyrec = {};
                gsbyrec["jeid"] = rec.data.jeid;
                gsbyrec["gs"] = rec.data.gs;
                gsbyrec["byg"] = rec.data.byg;
                gsbyrec["cg"] = rec.data.cg;
                gsby.push(gsbyrec);
            }
        })
        var ywsh = {};
        ywsh["jkid"] = jkid;
        ywsh["gsby"] = gsby;
        //  ywsh["shr"] =userInfo.username;
        //console.log(ywsh)
        //return;
        var msg = "进库单号：" + p.get('jkdh') + "<br>客户名称：" + p.get('khmc');// + "<br>进库日期：" + p.get('jkrq');
        var title = "真的删除此进库单内容？";
        if (loc == 'ok') {
            title = "真的审核通过此进库单内容？";
        }
        else
        {
            var  rq= Ext.decode(Ext.encode(p.get('czrq'))).substr(0,10);
            var ctoday=Ext.Date.format(new Date(), 'Y-m-d' );
             if ((rq<sys_option_min_date) && (ctoday>=sys_option_min_date)) {
                Ext.MessageBox.alert('注意！', '此单是上月入库单，不能作删除处理！');
                return false
            }

        }


        that.loc = loc;
        var abc = Ext.Msg.confirm(title, msg, function (e) {
            if (e == 'yes') {
                if (loc == "delete") {
                    var encodedString = jkid;
                } else {
                    var str = obj2str(ywsh);
                    var encodedString = base64encode(Ext.encode(str));
                }
                AjaxDataSave('cpjkdshsave', loc, encodedString, jkdshsaveCallBack, the);
            }
        })
    },

    //SelectWorkerView: function (button) {
    onSelectWorkerView: function (button) {
        var rec = button.getWidgetRecord();
        if (rec.data.jeid == 0) {
            return;
        }
        that.recordID = rec;
        var view = that.getView();
        that.dialog = view.add({
            xtype: 'selectWorkerWindow',
            session: true
        });
        that.dialog.show();
    },
    onWorkerSelectOkClick: function () {
        var names = [];
        var by = [];
        var gs = [];
        var cg = [];
        var records = that.getView().down("#selectWorkerTreePanel").getChecked();
        Ext.Array.each(records, function (rec) {
            names.push(rec.get('text'));
            switch (rec.get('pname')) {
                case '机械':
                    gs.push(rec.get('text'));
                    break;
                case '搬运':
                    by.push(rec.get('text'));
                    break;
                default:
                    cg.push(rec.get('text'));
                    break;
            }
        });
        records = that.getView().down("#selectWorkerTreePanel1").getChecked();
        Ext.Array.each(records, function (rec) {
            names.push(rec.get('text'));
            switch (rec.get('pname')) {
                case '机械':
                    gs.push(rec.get('text'));
                    break;
                case '搬运':
                    by.push(rec.get('text'));
                    break;
                default:
                    cg.push(rec.get('text'));
                    break;
            }
        });
        records = that.getView().down("#selectWorkerTreePanel2").getChecked();
        Ext.Array.each(records, function (rec) {
            names.push(rec.get('text'));
            switch (rec.get('pname')) {
                case '机械':
                    gs.push(rec.get('text'));
                    break;
                case '搬运':
                    by.push(rec.get('text'));
                    break;
                default:
                    cg.push(rec.get('text'));
                    break;
            }
        });
        var selection = that.recordID;
        if (selection != undefined) {
            selection.set('gs', gs.join(';'));
            selection.set('byg', by.join(';'));
            selection.set('cg', cg.join(';'));

            that.getView().down("#selectWorkerWindow").close();
        }
    },
    SelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.viewname, true);
        return false;
    }
    ,
    onPrintCpjkd: function () {
        var p = that.lookupReference('popupCpjkdWindow').getViewModel();
        PrintCpjkdJkid(p.get('jkid'));
        return;
    }
});

