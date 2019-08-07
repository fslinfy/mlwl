var that;
var khid = 0;
var dh ='';
var cpghdcwStore;
var cpghdjeStore;
var curcpghdcwStore;
var curcpghdjeStore;
var cpghdmxStore;
var ghid=0;
var saveCallBack = function (th) {
    that.getView().down("#cpghdshowview").close();
    that.locQuery(th);//onBtnQueryClick();
}
var ghckdworkCallBack = function (node) {
    var rec = node.data;
    
    var p = that.popupmx;
    //console.log('rec',rec,p);
    var xjbz = p.getViewModel().get('xjbz');
    var mxid = p.getViewModel().get('mxid');
    var dw = '吨';
    var kcid = p.getViewModel().get('kcid');
    if (rec.zljs == '1') {
        dw = p.getViewModel().get('zldw');
        var sl = p.getViewModel().get('cczl');
    }
    else {
        dw = p.getViewModel().get('sldw');
        var sl = p.getViewModel().get('ccsl');
    }
    if ((sl < 1) && (sl > 0)) {
        sl = 1;
    }
    var i = 0;
    var sumzl = 0;
    var newarray = [];
    var cpghdcw_store = that.lookupReference('cpghdmxcw').getStore();
    cpghdcw_store.each(function (reccw) {
        i = 0;
        sumzl = sumzl + reccw.data.cczl;
        newarray.forEach(function (item, index) {
            if (item.area == reccw.data.area) {
                item.sl = item.sl + reccw.data.ccsl;
                item.zl = item.zl + reccw.data.cczl;

                i = 1;

            }
        });
        if (i == 0) {
            var rec1 = {
                mxid: mxid,
                area: reccw.data.area,
                sl: reccw.data.ccsl,
                zl: reccw.data.cczl,
            };
            newarray.push(rec1)
        }
    })

    //console.log("newarray", newarray);



    //var cpghdmxje = p.getStore();
    var cpghdmxje = that.lookupReference('cpghdmxje').getStore();// that.down('#cpghdmxje').getStore();
    // console.log('work------CallBack', node.data);


    newarray.forEach(function (item, index) {

         
        if (rec.zljs == '1') {
           var      sl = item.zl;
          //dw = p.getViewModel().get('zldw');
        }
        else {
           var  sl = item.sl;
            //dw = p.getViewModel().get('zldw');
        }
        if (sl>0){
        cpghdmxje.add({
            dw: dw,
            mxid: mxid,
            ghid: ghid,
            workid: rec.id,
            work: rec.text,
            area: item.area,
            sl: sl,
           
            xjbz: xjbz,
            dj: rec.dj,
            je: Math.ceil(sl * rec.dj),
            sm: '',
            zljs: rec.zljs,
            inbz: rec.inbz,
            indj: rec.indj
        })
    }

    });

    that.sumjs(null, cpghdmxje, p.getViewModel());

}


Ext.define('MyApp.view.main.cpghgl.CpghdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpghdCtrl',
    requires: [
        'MyApp.view.main.cpghgl.CpghdView'
        , 'MyApp.view.main.cpghgl.CpghdCtrlFunction'
        , 'MyApp.view.main.report.PrintCpghd'
    ],
    locQuery: function (that) {
         //console.log("locQuery cpghdctrl");
        var v = that.getView().down("#CpghdListGrid").getViewModel();
        khid = v.get('khid');
        var ckid = v.get('ckid');
        cpghdmxStore.proxy.extraParams.loc = "cpghdmxmfhck";
      //  cpghdmxStore.proxy.extraParams.loc = "ck";
        cpghdmxStore.proxy.extraParams.khid = khid;
        cpghdmxStore.proxy.extraParams.ckid = ckid;
        cpghdmxStore.reload();


    },
    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        Ext.Ajax.request({
            method: 'GET',
            url: "qcloudsmssend.php",
            params: {
                act: 'cpghd',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo)))//,
                //p_l_id: sys_location_id,
                //loc: loc,
                //data: dataStr
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                // console.log(result);

                if (result.result == 'success') {
                    // Ext.MessageBox.alert('错误!', '数据保存失败！');
                    //  that.getView().down("#cpghdshowview").close();
                    //  that.locQuery(that);
                }
                else {
                    Ext.MessageBox.alert('错误!', '数据保存失败！');
                }
            },
            failure: function () {
                Ext.MessageBox.alert('错误!', '发生错误！');
            }
        });



        return false;
    },
    onBtnCancelClick: function (button, e, options) {
        //   var win = this.lookupReference('popupCpghdWindow');
        //  win.close()
        //  return false;
    },

    init: function () {
         //console.log("init 111111111111");
      
        that = this;
  
  
        this.control({            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#FilterField": {
                change: this.onFilterChange
            },
            "#btnCpghdSave": {
                click: this.onCpghdFormSubmit
            },

            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        
        var v = that.getView().down("#CpghdListGrid").getViewModel();
        if (sys_location_id > 0) {
            v.set('ckmc', sys_location_name);
            v.set('ckid', sys_location_id);
        }
        if (sys_customer_id > 0) {
            v.set('khmc', sys_customer_name);
            v.set('khid', sys_customer_id);
        }

        if (sys_customer_id > 0) {
            that.getView().down('#QueryKhmc').setHidden(true);
            that.getView().down('#QueryCkmc').setHidden(false);
        } else {
            that.getView().down('#QueryKhmc').setHidden(false);
            that.getView().down('#QueryCkmc').setHidden(true);
            if (sys_location_id > 0) {
                that.getView().down('#QueryKhmc').setHidden(false);
                that.getView().down('#QueryCkmc').setHidden(true);
            }
            else {
                that.getView().down('#QueryKhmc').setHidden(true);
                that.getView().down('#QueryCkmc').setHidden(false);
            }
        }
 



        cpghdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpghdmxStore',
            model: 'MyApp.model.CpghdmxModel' ,
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cpghdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpghdmxmfhck",
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
        cpghdmxStore.on("load", function () {
            //console.log('cpghdmxStoreonload');
            var v = that.getView().down("#CpghdListGrid").getViewModel();
            khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.getView().down("#CpghdListGrid").getStore();
            store.proxy.extraParams.loc = 'cpghdmfhck';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.reload();

            cpghdmxStore.each(function (reccw) {
                reccw['ccsl'] = reccw['mccsl'];
                reccw['cczl'] = reccw['mcczl'];
                //reccw['ccje'] = 0;
                //reccw['ccxjje'] =0;
                //console.log(reccw);
            })
        });


        this.locQuery(this);
        var v = that.getView().down("#CpghdListGrid");
        v.down('#QueryDate').setHidden(true);
        
      

        //*************************************** *

        curcpghdcwStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpghdcwModel',
           // autoLoad: true,
            proxy: {
                type: 'localstorage',
                id: 'CurCpghdcwModel'
            }
        });
        //console.log("init 2222222");
        

        curcpghdjeStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpghdjeModel',
           // autoLoad: true,
            proxy: {
                type: 'localstorage',
                id: 'CurCpghdjeModel'
            }
        });


        //console.log("init 333333333");
        


        cpghdcwStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpghdcwStore',
            model: 'MyApp.model.CpghdcwModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpghdcwlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpghdcwkcmx",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    ckid:0,
                    ghid: 0
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });



        cpghdcwStore.on("load", function () {
             //console.log('cpghdcwStore load');
            curcpghdjeStore.clearFilter();
            curcpghdjeStore.removeAll();

            
            curcpghdjeStore.sync();
            curcpghdcwStore.clearFilter();
            curcpghdcwStore.removeAll();
            
            
            curcpghdcwStore.sync();

            curcpghdcwStore.reload();

            curcpghdjeStore.reload();
            var i = 0;
            var rec = {};
            //console.log('cpghdcwStore load',cpghdcwStore);
            cpghdcwStore.each(function (reccw) {
                i++;
                rec = {
                    kcmxid: reccw.data.id,
                    area: reccw.data.area,
            
                    cw: reccw.data.cw,
                    dw: reccw.data.dw,
                    sm: reccw.data.sm,
                    sl: reccw.data.sl,
                    zl: reccw.data.zl,
                    mints: reccw.data.mints,
                    czrq: Ext.Date.format(reccw.data.czrq, 'Y-m-d'),
                    //czrq: reccw.data.czrq,
                    czdj: reccw.data.czdj,
                    cpph: reccw.data.cpph,
                    kcid: reccw.data.kcid,
                    mxid: reccw.data.mxid,
                    ghid: reccw.data.ghid
                };

                curcpghdcwStore.add(rec);
            })
            curcpghdcwStore.sync();
        });

        //console.log("init 333333333  end");




    },
    onSelectKhbmView: function (record) {
        //showSelectKhbmView(record,this,that.getView().down("#CpghdListGrid"),true)
        treeSelect('khmc', that, '', that.getView().down("#CpghdListGrid"), true);
        return false;
    },
    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.getView().down("#CpghdListGrid"), true);
        return false;
    },

    onFilterChange: function (v) {
        var store = that.getView().down("#CpghdListGrid").getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('ghdh')) || regExp.test(record.get('newkhmc')) || regExp.test(record.get('khmc')) || regExp.test(record.get('Ckmc')) || regExp.test(record.get('cphm'));
        });
    },
    onGridReload: function () {
        var store = this.lookupReference('CpghdmxGrid').getStore();
        var mxid = store.getAt(0).get('ckmxid');

        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        cpghdcw_store.clearFilter();
        cpghdcw_store.filterBy(function (record, id) {
            //// return true;
          //  return record.get('ckmxid') == mxid;
        });
    },
    onCpghdmxItemSelected: function (sender, record) {
        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        var mxid = record.data.ckmxid
        // console.log("ckmxid",mxid);
        cpghdcw_store.clearFilter();
        cpghdcw_store.filterBy(function (record, id) {
            // return true;
           // return record.get('ckmxid') == mxid;
        });

    },
    //*********************************************** */

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
            panel.set('ccje', ccje);
            panel.set('xjje', xjje);
        }

        that.lookupReference('ckccsl').setReadOnly(panel.get('ccje') > 0);
        that.lookupReference('ckcczl').setReadOnly(panel.get('ccje') > 0);
        //panel.down('#ckcczl').setReadOnly(panel.get('ccje')>0);

        if (store1) {
            var sl = store1.sum('ccsl');
            var zl = store1.sum('cczl');

            if ((sl > panel.get('mccsl')) || (zl > panel.get('mcczl'))) {
                // console.log(sl,zl);
                return false;
            };
            panel.set('ccsl', sl);
            panel.set('cczl', zl);
        }

        //console.log('sumje');
        return true;

    },

    onCpghdmxgheditView: function (button) {

        var rec = button.getWidgetRecord();
        //console.log("onCpghdmxgheditView 商品过户处理",rec.data);
        if ((rec.data.mccsl == 0) && (rec.data.mcczl == 0)) {
            return;

        }
        mmccsl = 0;
        mmcczl = 0;
        var rec0 = that.lookupReference('popupCpghdWindow').getViewModel();

        

        var mxid = rec.data.mxid;
        var kcid = rec.data.kcid;
        var record = rec.data;

        record['btnButtonHidden'] = true;
        var view = this.getView();
        this.isEdit_mx = !!record;
        that.ghmxid = mxid;
        //console.log("endrq", record);

        that.recordID = record['id'];
        record['newrecord'] = false;
        record['xjbz'] = rec0.data.xjbz;
        record['title'] = "商品过户处理";

        if (record['ccsl'] == 0 && record['cczl'] == 0) {
            record['ccsl'] = record['mccsl'];
            record['cczl'] = record['mcczl'];
        }


        //  console.log("onCpghdmxShowView", record['ccsl'], record['cczl'], record['bzid']);
        this.dialog_mx = view.add({
            xtype: 'cpghdformmxwindow',

            viewModel: {
                data: record
            },
            session: true
        });

        this.dialog_mx.show();

        var cpghdcw_store = this.lookupReference('cpghdmxcw').getStore();
        cpghdcw_store.filter(
            { filterFn: function (item) { return item.get("kcid") == kcid && (item.get("ghid") ==ghid) && ((item.get("sl") != 0) || (item.get("zl") != 0)); } }
        );
        var cpghdmxcw = this.lookupReference('cpghdmxcw').getStore();
        cpghdmxcw.filter(
            {
                filterFn: function (item) {
                    return item.get("kcid") == kcid && (item.get("ghid") == ghid) && ((item.get("sl") != 0) || (item.get("zl") != 0));
                }
            }
        );


        var cpghdje_store = this.lookupReference('cpghdmxje').getStore();
        cpghdje_store.filter(
            { filterFn: function (item) { return item.get("mxid") == mxid && (item.get("ghid") == ghid); } }
        );

        //console.log("cpghdcw_store", cpghdcw_store, 'cpghdje_store', cpghdje_store);
    },
    queryfromrow: function (thisp, row, col) {
        //仔细观察参数和api里面的参数
        // var record = thisp.getStore().getAt(row);
        // console.log(row, col);
        //if (col == 0) {
        //获得记录 
        // var record = thisp.getStore().getAt(row);
        // var service_id = record.get('service_id');

        // }
    },
    onCpghdmxShowView: function (button) {
    var  rec = button.getWidgetRecord();
          dh = generateGUID();
      
        ghid = rec.data.ghid;
        var record = rec.data;
        khid = rec.data.khid;
        // that.ghmxid=rec.data.mxid;
        //console.log("onCpghdmxShowView", record);
        var endrq =rec.data.endrq;// Ext.Date.format(rec.data.endrq, 'Y-m-d');
        var today = Ext.Date.format(new Date(), 'Y-m-d');
        //console.log("date", today, endrq);
        record['btnButtonHidden'] = true;
        record['ckrq'] = new Date();
        record['cwr'] = '';
        record['op'] = 'ck';
        record['ckop'] = true;
        record['title'] = "过户通知单-过户处理";
        if (today > endrq) {
            Ext.MessageBox.show({
                title: '注意！',
                msg: '<br><br>此过户通知单已超过有效期，还要继续过户处理吗？<br><br>',
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
            xtype: 'cpghdformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();

        var cpghdmx_store = this.lookupReference('CpghdmxGrid').getStore();
        cpghdmxStore.each(function (rec) {
            if (rec.data.ghid == record.ghid) {
                rec.data.ccsl = 0;
                rec.data.cczl = 0;
                rec.data.ccje = 0;
                rec.data.xjje = 0;
             //   rec.data.dh = dh;
                cpghdmx_store.add(rec);
            }
        })

        var p = this.lookupReference('popupCpghdWindow');
        p.down("#btnCpghdDelete").setHidden(true);
        p.down("#field_ckrq").setValue(new Date());
        p.down("#btnCpghdSave").setHidden(false);

        //console.log('cpghdmx_store',cpghdmx_store,record);
        
        var cpghdje_store = this.lookupReference('cpghdmxje0').getStore();
        cpghdje_store.removeAll();
        
        cpghdcwStore.proxy.extraParams.ghid = record.ghid;
        cpghdcwStore.proxy.extraParams.loc = 'ghid';
        cpghdcwStore.load();
    },
    onCpghdjeAddClick: function (record) {
        that.popupmx = that.getView().down('#cpghdmxedit');// this.lookupReference('popupghdmxWindow');
        var rec = that.lookupReference('popupghdmxWindow').getViewModel();
        var obj = [];
        obj['xjbz'] = rec.data.xjbx;
        obj['khid'] = khid;
        obj['bzid'] = rec.data.bzid;

        //console.log('bzid', rec, obj);
        treeSelect('work', that, obj, that.popupmx, false, ghckdworkCallBack);
        return false;
    },

    onCpghdjeDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpghdmxje'),
            selection = customerGrid.getSelectionModel().getSelection()[0];
        var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
        var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupghdmxWindow').getViewModel();
                var store = customerGrid.getStore();
                that.sumjs(null, store, panel);
            }
        }
        );

    },
    onCpghdmxFormSubmit: function () {
        var dialog = this.dialog_mx,
            form = this.lookupReference('windowFormmx'),
            isEdit = this.isEdit_mx,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }
        var rec = form.getValues();
        //   console.log('onCpghdmxFormSubmit', rec);
        var p = this.lookupReference('popupghdmxWindow').getViewModel();


        var cpghdcw_store = this.lookupReference('cpghdmxcw').getStore();
        var i = 0, sumsl = 0, sumzl = 0;
        sumsl = Math.round(1000 * cpghdcw_store.sum("ccsl")) / 1000;
        sumzl = Math.round(1000 * cpghdcw_store.sum("cczl")) / 1000;
        /*cpghdcw_store.each(function (reccw) {
            if ((reccw.data.ccsl != 0) || (reccw.data.cczl != 0)) {
                i++;
                sumsl = sumsl + reccw.data.ccsl;
                sumzl = sumzl + reccw.data.cczl;
            }
        })
        */



        if ((sumsl != 0) || (sumzl != 0)) {
            if ((sumsl != Math.round(1000 * p.get('ccsl')) / 1000) || (sumzl != Math.round(1000 * p.get('cczl')) / 1000)) {
                Ext.MessageBox.alert('注意！', '输入过户数量、重量与明细内容不一致！');
                return false
            }
        }
        cpghdcw_store.sync();

        var cpghdje_store = this.lookupReference('cpghdmxje').getStore();
        i = 0;

        var sumje = 0;
        var sumxjje = 0;

        cpghdje_store.each(function (recje) {
            if (recje.data.je != 0) {
                sumje = sumje + recje.data.je;
                if (recje.data.xjbz) {
                    sumxjje = sumxjje + recje.data.je;
                }
            }
        })
        sumje = sumje + 1 - 1;
        sumxjje = sumxjje + 1 - 1;

        cpghdje_store.sync();
        curcpghdcwStore.reload();
        curcpghdjeStore.reload();
        var cpghdmx_store = that.lookupReference('CpghdmxGrid').getStore();

        var r = that.recordID;

        var recmx = cpghdmx_store.getById(r);
        //recmx.set("ccsl", 0);
        //recmx.set("cczl", 0);
        recmx.set("ghsl", Math.round(1000 * p.get('ccsl')) / 1000);
        recmx.set("ghzl", Math.round(1000 * p.get('cczl')) / 1000);
        recmx.set("ghje", p.get('ccje'));
        recmx.set("xjje", p.get('xjje'));

        // recmx.set("ccsl", sumsl);
        // recmx.set("cczl", sumzl);
        // recmx.set("ccje", sumje);
        // recmx.set("xjje", sumxjje);
        //console.log('onCpghdmxFormSubmit  3 r=',r,sumsl,sumzl,sumje,sumxjje);
        that.getView().down("#cpghdmxedit").close();
        //      return;
    },



    onCpghdFormSubmit: function () {
        // console.log('onCpghdFormSubmit');
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
        // console.log("rec", rec);
        var p = this.lookupReference('popupCpghdWindow').getViewModel();


        
        var rq=rec.ckrq;//Ext.decode(Ext.encode(p.get('ckrq')));
        //console.log(rq,sys_option_min_date);
        if (rq<sys_option_min_date) {
            Ext.MessageBox.alert('注意！', '输入过户日期不能小于：'+sys_option_min_date);
            return false
        }
    
       // return;

        ghid = rec.ghid;
        var cpghd = {};

        cpghd['cnote'] = rec.cnote;
        //cpghd['cphm'] = rec.cphm;
        //cpghd['thr'] = rec.sfr;

        cpghd['ghid'] = ghid;
        cpghd['czy'] = sys_userInfo.username;
        cpghd['ghrq'] = rec.ckrq;// Ext.decode(Ext.encode(p.get('ckrq')));

        // console.log(cpghd['ckrq'],Ext.decode(Ext.encode(p.get('ckrq')))); 


        var cpghdcw_store = this.lookupReference('cpghdmxcw0').getStore();
        var cpghdje_store = this.lookupReference('cpghdmxje0').getStore();
        var cpghdmx_store = this.lookupReference('CpghdmxGrid').getStore();

        cpghdcw_store.load();
        cpghdje_store.load();
        cpghdcw_store.clearFilter();
        cpghdje_store.clearFilter();

         //console.log(cpghdcw_store,cpghdje_store,cpghdmx_store); 
        


        var i = 0, mxdh = '';
        var arraymx = [];
        var arraycw = [];
        var arrayje = [];
        var recmx0;
        var cwrec = 0;
        cpghd['fhbz'] = 1;
        var sumccsl = Math.round(cpghdmx_store.sum('ccsl') * 1000) / 1000;
        var sumcczl = Math.round(cpghdmx_store.sum('cczl') * 1000) / 1000;
        var summccsl = Math.round(cpghdmx_store.sum('mccsl') * 1000) / 1000;
        var summcczl = Math.round(cpghdmx_store.sum('mcczl') * 1000) / 1000;

        var sumjesl = Math.round(cpghdje_store.sum('sl') * 1000) / 1000;
        //console.log('sumjesl=',sumjesl);

        if ((summccsl == sumccsl) && (summcczl == sumcczl) && ((sumccsl != 0) || (sumcczl != 0))) {
            cpghd['fhbz'] = 2;
        }
        var msg = "";
        cpghdmx_store.each(function (reccw) {
         
            if (reccw.get('ghid') == ghid) {
                if ((reccw.get('ccsl') != 0) || (reccw.get('cczl') != 0)) {
                    var obj = {};
                    obj['ghid'] = reccw.data.ghid;
                    obj['mxid'] = reccw.data.mxid;
                    obj['ghsl'] = reccw.data.ghsl;
                    obj['ghzl'] = reccw.data.ghzl;
                    obj['ghje'] = reccw.data.ghje;
                    obj['xjje'] = reccw.data.xjje;
                    
                    arraymx.push(obj);
                    cwrec++;
                }
            }
            if (reccw.get('ccsl') < reccw.get('mccsl')) {
                msg = msg + '<br><br>商品：' + reccw.get('cpmc') + '过户数量小于过户单开单数量';
            }
        })
        if (cwrec == 0) {
            Ext.MessageBox.alert('注意！', '请输入过户内容！');
            return false
        }
        cwrec == 0;
         
////console.log(cpghd,arraymx);
  //      return ;

        cpghdcw_store.each(function (reccw) {
            if (reccw.get('ghid') == ghid) {
                if ((reccw.get('ccsl') != 0) || (reccw.get('cczl') != 0)) {
                
                    reccw.data.czrq = Ext.Date.format(reccw.data.czrq, 'Y-m-d');
                    arraycw.push(reccw.data);
                    
                    cwrec++;
                }
            }
        })
         //console.log("reccw len",arraycw);
       if (arraycw.length==0)
        {
            msg = msg + '<br><br>没有仓位过户内容！';
        }
       var s=0;
        cpghdje_store.each(function (recje) {
            if (recje.get('ghid') == ghid) {
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
        //console.log("recje len",arrayje);
        cpghd['cpghdmx'] = arraymx;
        cpghd['cpghdje'] = arrayje;
        cpghd['cpghdcw'] = arraycw;
        //console.log('cpghd', cpghd,msg);
      //  //console.log('msg',msg);
      // return;
        var str = obj2str(cpghd);
        //console.log('cpghd str', str);

        var encodedString = base64encode(Ext.encode(str));
        //var that = this;
        // AjaxDataSave('cpghdmxcksave', ghid, encodedString, saveCallBack,that);

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
                    //console.log(btn, text);
                    if (btn == "yes") {
                        that.data_save(ghid, encodedString);
                    }
                }
            });
            return;
        }

        that.data_save(ghid, encodedString);
        //-------------------------------------
    },

    data_save: function (loc, dataStr) {

         //console.log("id",loc);
        // return ;
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'cpghdmxcksave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                loc: loc,
                data: dataStr
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                    that.getView().down("#cpghdshowview").close();
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

