var that;
var cptzdmxStore;
var TzdshsaveCallBack = function (the) {
    var p = the.lookupReference('popupmxShowWindow').getViewModel();
    var mtzid = p.get('tzid');

    if (that.loc == "ok") {
        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品调账单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCptzdtzid(mtzid);
                }
                the.getView().down("#cptzdshowview").close();
                the.locQuery(the);

                //                p.close();
                //              that.locQuery();
            }
        });
    } else {
        the.getView().down("#cptzdshowview").close();
        the.locQuery(the);

        //        p.close();
        //      that.locQuery();
    }

}
Ext.define('MyApp.view.main.cptzdgl.CptzdshCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CptzdshCtrl',
    requires: [
        'MyApp.view.main.cptzdgl.CptzdshView',
        'MyApp.view.main.tree.WorkerSelectTree'
    ],
    locQuery: function (the) {
        var v = the.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        var store = cptzdmxStore;
        store.clearFilter();
        store.proxy.extraParams.loc = "cptzdmxsh";
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.ckid = ckid;
        store.load();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        console.log(" help");
        return false;
    },

    init: function () {
        that = this;
        that.viewname = that.getView().down("#CptzdListGrid");
        var v = that.viewname.getViewModel();

        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
        cptzdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cptzdmxStore',
            model: 'MyApp.model.CptzdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cptzdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cptzdmxsh",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cptzdmxStore.on("load", function () {

            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.loc = 'cptzdsh';
            store.reload();
        });
        that.listmxstore = cptzdmxStore;
        that.liststore = that.viewname.getStore();
        this.locQuery(this);

        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            // "#btnQueryKhmc": {
            //     click: this.onSelectKhbmView
            // },
            "#btnQueryKhmc": {
                click: function () { SelectKhbmView(); }
            },
            "#btnQueryCkmc": {
                click: function () { SelectCkbmView(); }
            },
            "#btnPrintCptzd": {
                click: function () {
                    onPrintCptzd();
                }
            },
            "#btnCptzdOkSave": {
                click: this.onCptzdOkSave
            }
            ,
            "#btnCptzdDeleteSave": {
                click: this.onCptzdDeleteSave
            },
            "#FilterField": {
                change: that.onFilterChange
            }
            ,
            "#btnCptzdmxShowView": {
                click: this.onCptzdshShowView
            }

        });

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
    },
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('tzdh'));
        });
    },



    onCptzdshShowView: function (button) {
        var rec = button.getWidgetRecord();
      //  console.log(rec.data);
        var tzid = rec.data.tzid;
        var record = rec.data;
        record['btnButtonHidden'] = false;
        record['op'] = 'ywsh';
        record['title'] = '商品调账单-审核';
        record["w"] = 40;
        var view = this.getView();
        this.isEdit = false;
        this.dialog = view.add({
            xtype: 'formcptzdwindow',
            viewModel: {
                data: record
            },
            session: true
        });

        this.dialog.show();


        var cptzdmx_store = this.lookupReference('cptzdmxShowGrid').getStore();
        // cptzdmx_store.proxy.extraParams.loc = "cptzdmxsh";
        // cptzdmx_store.proxy.extraParams.tzid = tzid;
        // cptzdmx_store.load();



        var store = this.listmxstore;
        store.each(function (rec) {
            if (rec.data.tzid == tzid) {
                cptzdmx_store.add(rec);
            }
        })

        var p = this.lookupReference('popupmxShowWindow');
        p.down("#btnCptzdOkSave").setHidden(!sys_system_sh);
        p.down("#btnCptzdDeleteSave").setHidden(!sys_system_del);
        p.down("#btnPrintCptzd").setHidden(true);
    },

    SelectWorkerView: function (button) {
        var rec = button.getWidgetRecord();
        if (rec.data.jeid == 0) {
            return;
        }
       // console.log("rec", rec);
        that.recordID = rec;
        var view = that.getView();
        that.dialog = view.add({
            xtype: 'selectWorkerWindow',
            session: true
        });
        that.dialog.show();
    },
    WorkerSelectOkClick: function () {
        var records = that.getView().down("#selectWorkerTreePanel").getChecked();
        var names = [];
        var by = [];
        var gs = [];
        var cg = [];
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

    /*    WorkerSelectOkClick: function () {
            var records = that.getView().down("#selectWorkerTreePanel").getChecked();
            var names = [];
            var by = [];
            var gs = [];
            var cg = [];
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
    */
    onSelectWorkerView: function (button) {

        //  var rec = button.getWidgetRecord();
        //  console.log(rec);
        this.SelectWorkerView(button);
    },
    onWorkerSelectOkClick: function () {
        this.WorkerSelectOkClick();
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    /*
        onSelectCkbmView: function (record) {
            treeSelect('ckmc', that, '', that.viewname, true);
            return false;
        },
        */
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },


    /*   onSelectKhbmView: function (record) {
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

    onCptzdOkSave: function () {
        this.CptzdshSave('ok', this);
    },
    onCptzdDeleteSave: function () {
        this.CptzdshSave('delete', this);
    },
    CptzdshSave: function (loc, the) {
        var p = the.lookupReference('popupmxShowWindow').getViewModel();
        var tzid = p.get('tzid');
        if (tzid == 0) {
            return;
        }

        /*   var msg = "调账单号：" + p.get('tzdh') + "<br>客户名称：" + p.get('khmc');// + "<br>进库日期：" + p.get('tzrq');
           var title = "真的删除此调账单内容？";
           if (loc == 'ok') {
               title = "真的审核通过此调账单内容？";
           }
           var abc = Ext.Msg.confirm(title, msg, function (e) {
               if (e == 'yes') {
                   AjaxDataSave('cptzdshsave', loc, tzid, TzdshsaveCallBack, the);
               }
           })*/

        var cptzdmx_store = that.lookupReference('cptzdmxShowGrid').getStore();
        var gsby = [];
        var gsbyrec = {};
        cptzdmx_store.each(function (rec) {
            //   console.log("rec",rec);    
            if (rec.data.mxdh == "2") {
                gsbyrec = {};
                gsbyrec["jeid"] = rec.data.mxid;
                gsbyrec["gs"] = rec.data.gs;
                gsbyrec["byg"] = rec.data.byg;
                gsbyrec["cg"] = rec.data.cg;
                gsby.push(gsbyrec);
            }
        })
        var cksh = {};
        cksh["tzid"] = tzid;
        cksh["gsby"] = gsby;
        //  console.log(cksh);
        //  return 
        var msg = "调账单号：" + p.get('tzdh') + "<br>客户名称：" + p.get('khmc');// + "<br>进库日期：" + p.get('tzrq');
        var title = "真的删除此调账单内容？";
        if (loc == 'ok') {
            title = "真的审核通过此调账单内容？";
        }
        else
        {
            var  rq= Ext.decode(Ext.encode(p.get('tzrq'))).substr(0,10);
            var ctoday=Ext.Date.format(new Date(), 'Y-m-d' );
             if ((rq<sys_option_min_date) && (ctoday>=sys_option_min_date)) {
                Ext.MessageBox.alert('注意！', '此单是上月调帐单，不能作删除处理！');
                return false
            }
        }
         that.loc=loc;
        Ext.Msg.confirm(title, msg, function (e) {
            if (e == 'yes') {

                var str = obj2str(cksh);
                var encodedString = base64encode(Ext.encode(str));
                AjaxDataSave('cptzdywshsave', loc, encodedString, TzdshsaveCallBack, the);
            }
        })

    }
});



