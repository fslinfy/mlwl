var gfid = 0;
var that;
var curcpgfdjeStore;
var khmcCallBack = function (node) {
    that.popupmx.getViewModel().set('khid', node.data.id);
    that.popupmx.getViewModel().set('khmc', node.data.text);
}
/*var cdmcCallBack = function (node) {
   ////console.log('node');
   ////console.log(node.data.text);
    var customerGrid = that.lookupReference('wxCpgfdmxGrid');
    var selection = customerGrid.getSelectionModel().getSelection()[0];
    
    selection.set('cdmc', node.data.text);
   
}
*/
var gfdworkCallBack = function (node) {
    var rec = node.data;
    //console.log('gfdworkCallBack',rec);
    var p = that.popupmx;
    var xjbz = p.getViewModel().get('xjbz');
    var mxid = p.getViewModel().get('mxid');
    var dw = '吨';
    var kcid = p.getViewModel().get('kcid');
    if (rec.zljs == '1') {
        //dw = p.getViewModel().get('zldw');
        dw=rec.zldw;
        var sl = p.getViewModel().get('zl');
    }
    else {

        //dw = p.getViewModel().get('sldw');
        dw=rec.sldw;
        var sl = p.getViewModel().get('sl');
    }
    //if ((sl < 1) && (sl > 0)) {
    //    sl = 1;
    //}
    var i = 0;
    var sumzl = 0;
    var newarray = [];
   



   
    var cpgfdmxje = that.lookupReference('cpgfdmxje').getStore();// that.down('#cpgfdmxje').getStore();
   
        cpgfdmxje.add({
            dw: dw,
            mxid: mxid,
            gfid: gfid,
            workid: rec.id,
            work: rec.text,
            //area: item.area,
            sl: sl,
           
            xjbz: xjbz,
            dj: rec.bydj,
            je: Math.ceil(sl * rec.bydj),
            sm: '',
            zljs: rec.zljs,
            inbz: rec.inbz,
            indj: rec.indj
        })
   
       
    that.sumjs(null, cpgfdmxje, p.getViewModel());

}

/*
var bzmcCallBack = function (node) {
   //console.log('node',node);
   ////console.log(node.data.bydj);
    var customerGrid = that.lookupReference('wxCpgfdmxGrid');
    var selection = customerGrid.getSelectionModel().getSelection()[0];
    
    selection.set('bzmc', node.data.text);
    selection.set('dj', node.data.bydj);
    selection.set('rate', node.data.rate);
}
var cpmcCallBack = function (node) {
  //  //console.log(node.data);
    var customerGrid = that.lookupReference('wxCpgfdmxGrid');
    var selection = customerGrid.getSelectionModel().getSelection()[0];
    selection.set('xmmc', node.data.text);
}*/
var gfdDeleteCallBack = function (th) {
    var p = th.lookupReference('gfdpopupWindow');
    p.close();
    th.locQuery();
    Ext.MessageBox.alert('提示！', '此过车单内容已作废！');

};
/*
var addCpmcCallBack = function (node) {
    var rec = node.data;
    var p = that.popupmx;
    var wxcpgfdmx = that.lookupReference('wxCpgfdmxGrid').getStore();
    wxcpgfdmx.add({
        xmmc: rec.text, jldw: '吨', sl: 0, zl: 0, je: 0, dj: 0, byg: '', cg: '', gs: ''
    })

}
var gfdshsaveCallBack = function (th) {
    var p = th.lookupReference('popupwxCpgfdWindow');
    var mgfid = p.getViewModel().get('gfid');
    if (that.loc == "ok") {
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
                    PrintwxCpgfdgfid(p.get('gfid'));
                }
                p.close();
                that.locQuery();
            }
        });
    } else {
        p.close();
        that.locQuery();
    }

};*/
var cpgfdmxStore0;
Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wxCpgfdCtrl',
    requires: [
        'MyApp.view.main.wxcpgfgl.wxCpgfdView'
        , 'MyApp.view.main.wxcpgfgl.wxCpgfdmxEdit'
        , 'MyApp.view.main.tree.WorkerSelectTree'
        ,'MyApp.view.main.report.PrintwxCpgfd'
    ],
    locQuery: function (the) {
        console.log(this,the);
        var v = the.viewname.getViewModel();
        var khid = v.get('khid');
        cpgfdmxStore0.proxy.extraParams.loc = "wxcpgfdfhck";
        
        cpgfdmxStore0.proxy.extraParams.khid = khid;
        cpgfdmxStore0.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(that);
        return false;
    },
    init: function () {
        that = this;
        that.viewname = that.getView().down("#CpgfdListGrid");
        var v = that.viewname.getViewModel();
        v.set('PageTitleName', '商品过车处理');
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }
        cpgfdmxStore0 = Ext.create('Ext.data.Store', {
            alias: 'store.cpgfdmxStore',
            model: 'MyApp.model.CpgfdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=wxCpgfdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "wxcpgfdmxfhck",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_e_code: sys_enterprise_code,
                    gfid: 0,
                    p_l_id: sys_location_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        curcpgfdjeStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpgfdjeModel',
           
            proxy: {
                type: 'sessionstorage',
                id: 'CurCpgfdjeModel'
            }
        });

        cpgfdmxStore0.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            // var ckid = v.get('ckid');
            var store = that.viewname.getStore();
            store.proxy.extraParams.khid = khid;
           store.proxy.extraParams.act ="wxCpgfdlist_pc";
            // store.proxy.extraParams.ckid = ckid;
            store.proxy.extraParams.loc = 'wxcpgfdfhck';
            store.reload();
        });
        that.listmxstore = cpgfdmxStore0;
        that.liststore = that.viewname.getStore();



        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },
     
      

         ////   "#btnwxCpgfdSave": {
          //      click: that.onwxCpgfdshOkSubmit
          //  },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnPrintwxCpgfd": {
                click: this.onPrintwxCpgfd
            }
            ,

            "#btnCpgfdDelete": {
                click: this.onwxCpgfdshDeleteSubmit
            },
            "#FilterField": {
                change: this.onFilterChange
            }
        });


        that.getView().down('#QueryKhmc').setHidden(false);
        if (sys_location_id > 0) {
            that.getView().down('#QueryKhmc').setHidden(false);
        }
        else {
            that.getView().down('#QueryKhmc').setHidden(true);
        }
        console.log('sys_location_areas',sys_location_areas,sys_location_id);
        that.locQuery(that);

    },

    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('khmc')) || regExp.test(record.get('xmmc')) || regExp.test(record.get('gfdh'));
        });
    },




    onCpgfdmxShowView: function (button) {
        var  rec = button.getWidgetRecord();
              dh = generateGUID();
          
            gfid = rec.data.gfid;
            var record = rec.data;
            khid = rec.data.khid;
            // that.ghmxid=rec.data.mxid;
            //console.log("onCpgfdmxShowView", record);
            var endrq =rec.data.endrq;// Ext.Date.format(rec.data.endrq, 'Y-m-d');
            var today = Ext.Date.format(new Date(), 'Y-m-d');
            //console.log("date", today,'  end:', endrq);
            record['btnButtonHidden'] = true;
            record['gfrq'] = new Date();
            record['cwr'] = '';
            record['op'] = 'ck';
            record['ckop'] = true;
            record['title'] = "过车通知单-过车处理";
            if (today > endrq) {
                Ext.MessageBox.show({
                    title: '注意！',
                    msg: '<br><br>此过车通知单已超过有效期，还要继续过车处理吗？<br><br>',
                    buttons: Ext.MessageBox.YESNO,
                    buttonText: {
                        yes: "继 续",
                        no: "关  闭"
                    },
                    icon: Ext.MessageBox["WARNING"],
                    scope: this,
                    fn: function (btn, text) {
                        if (btn == "yes") {
                            that.createdialog(record);
                        }
                    }
                });
                return;
            }
            that.createdialog(record);
        },
        createdialog: function (record) {
            var view = this.getView();
            this.isEdit = false;// !!record;
            this.dialog = view.add({
                xtype: 'cpgfdformwindow',
                viewModel: {
                    data: record
                },
                session: true
            });
            this.dialog.show();
    
            var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
            cpgfdmxStore0.each(function (rec) {
                //console.log(rec.data);
                if (rec.data.gfid == record.gfid) {
                    rec.data.sl = 0;
                    rec.data.zl = 0;
                    rec.data.je = 0;
                    rec.data.xjje = 0;
             
                    cpgfdmx_store.add(rec);
                }
            })
    
            var p = this.lookupReference('popupCpgfdWindow');
            p.down("#btnCpgfdDelete").setHidden(!sys_system_del);
            p.down("#field_gfrq").setValue(new Date());
            p.down("#btnCpgfdSave").setHidden(false);
    
            //console.log('cpgfdmx_store',cpgfdmx_store,record);
            
            var cpgfdje_store = this.lookupReference('cpgfdmxje0').getStore();
            cpgfdje_store.removeAll();
            
            
        },


        onCpgfdmxgheditView: function (button) {

            var rec = button.getWidgetRecord();
            //console.log("onCpgfdmxgheditView 商品过车处理",rec.data);
            if ((rec.data.mccsl == 0) && (rec.data.mcczl == 0)) {
                return;
    
            }
            mmccsl = 0;
            mmcczl = 0;
            var rec0 = that.lookupReference('popupCpgfdWindow').getViewModel();
    
            
    
            var mxid = rec.data.mxid;
            var kcid = rec.data.kcid;
            var record = rec.data;
    
            record['btnButtonHidden'] = true;
            var view = this.getView();
            this.isEdit_mx = !!record;
            that.ghmxid = mxid;
            //console.log("rec0", rec0);
    
            that.recordID = record['id'];
            record['newrecord'] = false;
            record['xjbz'] = rec0.data.xjbz;
            record['area'] = rec0.data.area;
            record['title'] = "商品过车处理";
    
            if (record['sl'] == 0 && record['zl'] == 0) {
                record['sl'] = record['khsl'];
                record['zl'] = record['khzl'];
            }
    
    
            //  //console.log("onCpgfdmxShowView", record['ccsl'], record['cczl'], record['bzid']);
            this.dialog_mx = view.add({
                xtype: 'gfdformmxwindow',
    
                viewModel: {
                    data: record
                },
                session: true
            });
    
            this.dialog_mx.show();
    
    
            var cpgfdje_store = this.lookupReference('cpgfdmxje').getStore();
            cpgfdje_store.filter(
                { filterFn: function (item) { return item.get("mxid") == mxid && (item.get("gfid") == gfid); } }
            );
    
          //  //console.log("cpgfdcw_store", cpghdcw_store, 'cpghdje_store', cpghdje_store);
        },
    
        onCpgfdjeAddClick: function (record) {
            that.popupmx = that.getView().down('#cpgfdmxedit');// this.lookupReference('popupgfdmxWindow');
            var rec = that.lookupReference('popupgfdmxWindow').getViewModel();
            var obj = [];
            obj['xjbz'] = rec.data.xjbx;
            obj['khid'] = khid;
            obj['gfbz'] = 1;
        //    obj['bzid'] = rec.data.bzid;
    
            ////console.log('bzid', rec, obj);
            treeSelect('work', that, obj, that.popupmx, false, gfdworkCallBack);
            return false;
        },
    
        onCpgfdjeDeleteClick: function (button) {
    
            var customerGrid = this.lookupReference('cpgfdmxje'),
                selection = customerGrid.getSelectionModel().getSelection()[0];
            var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
            var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
                if (e == 'yes') {
                    selection.drop();
                    var panel = that.lookupReference('popupgfdmxWindow').getViewModel();
                    var store = customerGrid.getStore();
                    that.sumjs(null, store, panel);
                }
            }
            );
    
        },

        

    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;

    },





    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

   /*
    onwxCpgfdFormSubmit: function () {

        this.wxCpgfdshSave('ok', that);
    },
    */
    onwxCpgfdshDeleteSubmit: function () {
        
        var abc = Ext.Msg.confirm('注意！','真的删除此货物过车内容？', function (e) {
            if (e == 'yes') {
                that.wxCpgfddelSave('delete', that);
              
                //alert("btnCpgfdDelete")
            }
        });


       
    },
    wxCpgfddelSave: function (loc, the) {
       
       /* var gfd={};
        gfd.gfid=gfid;
       var str = obj2str(gfd);
        var encodedString = base64encode(Ext.encode(str));
        */
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'wxcpgfddeletesave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                data: gfid
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                //  //console.log("result", result);
                if (result.result == 'success') {
                           that.getView().down("#cpgfdshowview").close();
                            that.locQuery(that);
                }
                else {
                    Ext.MessageBox.alert('错误!', result.msg);
                }
            },
            failure: function () {
                Ext.MessageBox.alert('错误!', '发生错误！');
            }
        });
        return;
    },




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
    /*
    SelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },*/

    onPrintwxCpgfd: function () {
        var p = that.lookupReference('gfdpopupWindow').getViewModel();
        PrintwxCpgfdgfid(p.get('gfid'));
        return;
    },
    sumje: function () {
        
        var customerGrid = that.lookupReference('wxCpgfdmxGrid');
        var store = customerGrid.getStore();
        var v = that.lookupReference('gfdpopupWindow').getViewModel();
        v.set('sl', store.sum('sl'));
        v.set('zl', store.sum('zl'));
        v.set('je', store.sum('je'));

        //console.log(v.get('sl'),v.get('zl'),v.get('je'));
        if (v.get('xjbz')) {
            v.set('xjje', v.get('je'));
        }
        else {
            v.set('xjje', 0);
        }
    },
    onCpgfdmxFormSubmit: function () {
        var dialog = this.dialog_mx,
            form = this.lookupReference('windowFormmx'),
            isEdit = this.isEdit_mx,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }

        var rec = form.getValues();
 

        //   //console.log('onCpgfdmxFormSubmit', rec);
        var p = this.lookupReference('popupgfdmxWindow').getViewModel();



        
        
        var cpgfdje_store = this.lookupReference('cpgfdmxje').getStore();
        var i = 0;
        var sumje = 0;
        var sumxjje = 0;
        var area="";
        if (sys_location_areas>1) {
            if ((p.get('area')=="")||(p.get('area')==null)) {
                Ext.MessageBox.alert('注意！', '请选择分区！');
                return false;
            }
           area= p.get('area');
        }



        cpgfdje_store.each(function (recje) {
            if (recje.data.je != 0) {
                sumje = sumje + recje.data.je;
                if (recje.data.xjbz) {
                    sumxjje = sumxjje + recje.data.je;
                }
                recje.data.area=area;
                i=i+1;
            }
        })
        sumje = sumje + 1 - 1;
        sumxjje = sumxjje + 1 - 1;



        cpgfdje_store.sync();
        var cpgfdmx_store = that.lookupReference('CpgfdmxGrid').getStore();
        var r = that.recordID;
        var recmx = cpgfdmx_store.getById(r);
        
        var sl=parseFloat(p.get('sl'));
        var zl=parseFloat(p.get('zl'));
        var je=parseFloat(p.get('je'));
        var xjje=parseFloat(p.get('xjje'));
        recmx.set("sl", 0);
        recmx.set("zl", 0);
        
        recmx.set("sl", Math.round(1000 *sl ) / 1000);
        recmx.set("zl", Math.round(1000 * zl) / 1000);
        recmx.set("je", Math.round(100 * je) / 100);
        recmx.set("xjje",Math.round(100 *xjje) / 100);
        recmx.set("area", area);

       
        
        //cpgfdje_store.sync();
        //console.log("recmx",recmx);
        if (i==0)
        {
            Ext.MessageBox.show({
                title: "继续吗？",
                msg:  "你还没有输入机械作业记录！",
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: "继 续",
                    no: "放  弃"
                },
                icon: Ext.MessageBox["WARNING"],
                scope: this,
                fn: function (btn, text) {

                    if (btn == "yes") {
                        that.getView().down("#cpgfdmxedit").close();                        
                    }
                }
            });

        }else{
            that.getView().down("#cpgfdmxedit").close();                          
        }

    },

    sumjs: function (store1, store2, panel) {
        if (store2) {
            var ccje = 0;
            var xjje = 0;
            store2.each(function (rec) {
                ccje = ccje + rec.data.je;
                if (rec.data.xjbz) {
                    xjje = xjje + rec.data.je;
                }
            })
            panel.set('je', ccje);
            panel.set('xjje', xjje);
        }
    
       // that.lookupReference('ckccsl').setReadOnly(panel.get('ccje') > 0);
       // that.lookupReference('ckcczl').setReadOnly(panel.get('ccje') > 0);
        //panel.down('#ckcczl').setReadOnly(panel.get('ccje')>0);
    
        if (store1) {
            var sl = store1.sum('sl');
            var zl = store1.sum('zl');
    
            if ((sl > panel.get('khsl')) || (zl > panel.get('khzl'))) {
                // //console.log(sl,zl);
                return false;
            };
            panel.set('sl', sl);
            panel.set('zl', zl);
        }
    
        ////console.log('sumje');
        return true;
    
    },
    

    onCpgfdSaveSubmit: function () {
        // //console.log('onCpgfdFormSubmit');
        var dialog = this.dialog,
            form = this.lookupReference('windowForm'),
            isEdit = this.isEdit,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }
        var ckdrec = form.getValues();
        var rec = ckdrec;
        // //console.log("rec", rec);
        var p = this.lookupReference('popupCpgfdWindow').getViewModel();
       
        var rq=rec.gfrq;//Ext.decode(Ext.encode(p.get('gfrq')));
        //console.log(rq,sys_option_min_date);
        if (rq<sys_option_min_date) {
            Ext.MessageBox.alert('注意！', '输入过车日期不能小于：'+sys_option_min_date);
            return false
        }

        gfid = rec.gfid;
        var cpgfd = {};
        cpgfd['cnote'] = rec.cnote;
        cpgfd['gfid'] = gfid;
        cpgfd['czy'] = sys_userInfo.username;
        cpgfd['gfrq'] = rec.gfrq;

        var cpgfdje_store = this.lookupReference('cpgfdmxje0').getStore();
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();

        cpgfdje_store.load();
        cpgfdje_store.clearFilter();

        var i = 0, mxdh = '';
        var arraymx = [];
        
        var arrayje = [];
        
        var cwrec = 0;
        cpgfd['fhbz'] = 1;
        var sumccsl = Math.round(cpgfdmx_store.sum('sl') * 1000) / 1000;
        var sumcczl = Math.round(cpgfdmx_store.sum('zl') * 1000) / 1000;
        var summccsl = Math.round(cpgfdmx_store.sum('khsl') * 1000) / 1000;
        var summcczl = Math.round(cpgfdmx_store.sum('khzl') * 1000) / 1000;

        var sumjesl = Math.round(cpgfdje_store.sum('sl') * 1000) / 1000;
        //console.log('sumjesl=',sumjesl);

        if ((summccsl == sumccsl) && (summcczl == sumcczl) && ((sumccsl != 0) || (sumcczl != 0))) {
            cpgfd['fhbz'] = 2;
        }
        var msg = "";
        cpgfdmx_store.each(function (reccw) {
         
            if (reccw.get('gfid') == gfid) {
                if ((reccw.get('sl') != 0) || (reccw.get('zl') != 0)) {
                    var obj = {};
                    obj['gfid'] = reccw.data.gfid;
                    obj['mxid'] = reccw.data.mxid;
                    obj['sl'] = reccw.data.sl;
                    obj['zl'] = reccw.data.zl;
                    obj['je'] = reccw.data.je;
                    obj['xjje'] = reccw.data.xjje;
                    obj['area'] = reccw.data.area;
                    arraymx.push(obj);
                    cwrec++;
                }
            }
            if (reccw.get('sl') < reccw.get('khsl')) {
                msg = msg + '<br><br>商品：' + reccw.get('xmmc') + '过车数量小于过车通知单数量';
            }
        })
        if (cwrec == 0) {
            Ext.MessageBox.alert('注意！', '请输入过车内容！');
            return false
        }
        cwrec == 0;
         

       var s=0;
        cpgfdje_store.each(function (recje) {
            if (recje.get('gfid') == gfid) {
                console.log("recje ",recje.data);
                if (recje.get('sl')!=0){
                    if ((sumjesl<1) && (s==0)) {  //重不够吨按一吨计
                        recje.data.sl=recje.data.sl+(1-sumjesl);
                        recje.data.je= Math.ceil(recje.data.dj*recje.data.sl);
                        s=1;
                    }
                   arrayje.push(recje.data);
                }
            }
        })
//        //console.log("recje len",arrayje);
        cpgfd['cpgfdmx'] = arraymx;
        cpgfd['cpgfdje'] = arrayje;
       // console.log('cpgfd', cpgfd,msg);
      //  //console.log('msg',msg);
      // return;
        var str = obj2str(cpgfd);
        ////console.log('cpgfd str', str);

        var encodedString = base64encode(Ext.encode(str));
        //var that = this;
        // AjaxDataSave('cpgfdmxcksave', gfid, encodedString, saveCallBack,that);

        //------------------------------------

        if (msg != "") {
            Ext.MessageBox.show({
                title: "还继续保存操作吗？",
                msg: msg + "<br><br>",
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: "继 续",
                    no: "放  弃"
                },
                icon: Ext.MessageBox["WARNING"],
                scope: this,
                fn: function (btn, text) {
                    ////console.log(btn, text);
                    if (btn == "yes") {
                        that.data_save(gfid, encodedString);
                    }
                }
            });
            return;
        }

        that.data_save(gfid, encodedString);
        //-------------------------------------
    },

    data_save: function (loc, dataStr) {

         ////console.log("id",loc);
        // return ;
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'wxcpgfdmxcksave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                loc: loc,
                data: dataStr
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                    that.getView().down("#cpgfdshowview").close();
                    that.locQuery(that);

                }
                else {
                    that.locQuery(that);
                    Ext.MessageBox.alert('错误!', result.msg);
                }




            },
            failure: function () {
                Ext.MessageBox.alert('错误!', '发生错误！');
            }
        });
    }


});

