var that;
var khid = 0;
var       dh ='';
var cpckdcwStore;
var curcpckdcwStore;
var curcpckdjeStore;
var cpxsdmxStore;
var xsid=0;
var saveCallBack = function (th) {
    that.getView().down("#cpxsdshowview").close();
    that.locQuery(th);//onBtnQueryClick();
}
var ckdworkCallBack = function (node) {
    var rec = node.data;
    //console.log(rec.data);
    var p = that.popupmx;
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
    //if ((sl < 1) && (sl > 0)) {
      //  sl = 1;
    //}
    var i = 0;
    var sumzl = 0;
    var newarray = [];
    var cpckdcw_store = that.lookupReference('cpckdmxcw').getStore();
    cpckdcw_store.each(function (reccw) {

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



    //var cpckdmxje = p.getStore();
    var cpckdmxje = that.lookupReference('cpckdmxje').getStore();// that.down('#cpckdmxje').getStore();
    // console.log('work------CallBack', node.data);


    newarray.forEach(function (item, index) {


        if (rec.zljs == '1') {
            sl = item.zl;
        }
        else {
            sl = item.sl;
        }
        if (sl>0){
        cpckdmxje.add({
            dw: dw,
            mxid: mxid,
            workid: rec.id,
            work: rec.text,
            area: item.area,
            sl: sl,
            dh: dh,
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

    that.sumjs(null, cpckdmxje, p.getViewModel());

}


Ext.define('MyApp.view.main.cpckgl.CpckdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpckdCtrl',
    requires: [
        'MyApp.view.main.cpckgl.CpckdView'
        , 'MyApp.view.main.cpckgl.CpckdCtrlFunction'
        , 'MyApp.view.main.report.PrintCpckd'
    ],
    locQuery: function (that) {
         //console.log("locQuery cpckdctrl");
        var v = that.getView().down("#CpxsdListGrid").getViewModel();
        khid = v.get('khid');
        var ckid = v.get('ckid');
        cpxsdmxStore.proxy.extraParams.loc = "cpxsdmxmfhck";
      //  cpxsdmxStore.proxy.extraParams.loc = "ck";
        cpxsdmxStore.proxy.extraParams.khid = khid;
        cpxsdmxStore.proxy.extraParams.ckid = ckid;
        cpxsdmxStore.reload();


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
                act: 'cpckd',
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
                    //  that.getView().down("#cpxsdshowview").close();
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
        //   var win = this.lookupReference('popupCpckdWindow');
        //  win.close()
        //  return false;
    },

    init: function () {
        // console.log("init");
        // return ;
        that = this;
  
      //  console.log(" init dh", dh);
        this.control({            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#FilterField": {
                change: this.onFilterChange
            },
            "#btnCpxsdSave": {
                click: this.onCpckdFormSubmit
            },

            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        var v = that.getView().down("#CpxsdListGrid").getViewModel();
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


        cpxsdmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpxsdmxStore',
            model: 'MyApp.model.CpxsdmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=cpxsdmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpxsdmxmfhck",
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
        cpxsdmxStore.on("load", function () {
            //console.log('cpxsdmxStoreonload');
            var v = that.getView().down("#CpxsdListGrid").getViewModel();
            khid = v.get('khid');
            var ckid = v.get('ckid');
            var store = that.getView().down("#CpxsdListGrid").getStore();
            store.proxy.extraParams.loc = 'cpxsdmfhck';
            store.proxy.extraParams.khid = khid;
            store.proxy.extraParams.ckid = ckid;
            store.reload();

            cpxsdmxStore.each(function (reccw) {
                reccw['ccsl'] = reccw['mccsl'];
                reccw['cczl'] = reccw['mcczl'];
                //reccw['ccje'] = 0;
                //reccw['ccxjje'] =0;
                //console.log(reccw);
            })
        });
        this.locQuery(this);
        var v = that.getView().down("#CpxsdListGrid");
        v.down('#QueryDate').setHidden(true);
        //*************************************** *

        curcpckdcwStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpckdcwModel',
           // autoLoad: true,
            proxy: {
                type: 'localstorage',
                id: 'CurCpckdcwModel'
            }
        });

        curcpckdjeStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpckdjeModel',
           // autoLoad: true,
            proxy: {
                type: 'localstorage',
                id: 'CurCpckdjeModel'
            }
        });



        cpckdcwStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpckdcwStore',
            model: 'MyApp.model.CpckdcwModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpckdcwlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    loc: "cpckdcwkcmx",
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    xsid: 0
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });



        cpckdcwStore.on("load", function () {
            // console.log('cpckdcwStore load');
            curcpckdjeStore.clearFilter();
            curcpckdjeStore.removeAll();

            /*curcpckdjeStore.each(function (rec) {
                if (rec.data.dh == dh) {
                    curcpckdjeStore.remove(rec);
                }

            })*/

            curcpckdjeStore.sync();
            curcpckdcwStore.clearFilter();
            curcpckdcwStore.removeAll();
            /*curcpckdcwStore.each(function (rec) {
                if (rec.data.dh == dh) {
                    curcpckdcwStore.remove(rec);
                }

            })*/

            
            curcpckdcwStore.sync();
            curcpckdcwStore.reload();
            curcpckdjeStore.reload();
            var i = 0;
            var rec = {};
            cpckdcwStore.each(function (reccw) {
                i++;
                rec = {
                    kcmxid: reccw.data.id,
                    area: reccw.data.area,
                    dh: dh,
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
                    mxid: reccw.data.mxid
                };

                ////  console.log(reccw.data.czrq,rec.czrq,Ext.Date.format(rec.czrq, 'Y-m-d'),rec);
                //curcpckdcwStore.add(reccw.data);
              //  console.log("dh", dh);
                curcpckdcwStore.add(rec);
            })
            curcpckdcwStore.sync();
        });








    },
    onSelectKhbmView: function (record) {
        //showSelectKhbmView(record,this,that.getView().down("#CpxsdListGrid"),true)
        treeSelect('khmc', that, '', that.getView().down("#CpxsdListGrid"), true);
        return false;
    },
    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.getView().down("#CpxsdListGrid"), true);
        return false;
    },

    onFilterChange: function (v) {
        var store = that.getView().down("#CpxsdListGrid").getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('xsdh')) || regExp.test(record.get('ckdh')) || regExp.test(record.get('khmc')) || regExp.test(record.get('Ckmc')) || regExp.test(record.get('cphm'));
        });
    },
    onGridReload: function () {
        var store = this.lookupReference('CpxsdmxGrid').getStore();
        var mxid = store.getAt(0).get('ckmxid');

        var cpxsdcw_store = this.lookupReference('cpxsdmxcw0').getStore();
        cpxsdcw_store.clearFilter();
        cpxsdcw_store.filterBy(function (record, id) {
            //// return true;
          //  return record.get('ckmxid') == mxid;
        });
    },
    onCpxsdmxItemSelected: function (sender, record) {
        var cpxsdcw_store = this.lookupReference('cpxsdmxcw0').getStore();
        var mxid = record.data.ckmxid
        // console.log("ckmxid",mxid);
        cpxsdcw_store.clearFilter();
        cpxsdcw_store.filterBy(function (record, id) {
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

    onCpckdmxShowView: function (button) {

        var rec = button.getWidgetRecord();
        if ((rec.data.mccsl == 0) && (rec.data.mcczl == 0)) {
            return;

        }
      
        mmccsl = 0;
        mmcczl = 0;
        var rec0 = that.lookupReference('popupCpxsdWindow').getViewModel();

        // console.log("onCpckdmxShowView",rec.data, rec0.data);

        var mxid = rec.data.mxid;
        var kcid = rec.data.kcid;
        var record = rec.data;

        record['btnButtonHidden'] = true;
        var view = this.getView();
        this.isEdit_mx = !!record;
        that.xsmxid = mxid;
        // console.log("endrq", record);

        that.recordID = record['id'];
        record['newrecord'] = false;
        record['xjbz'] = rec0.data.xjbz;
        record['title'] = "商品出仓处理";
        if (record['ccsl'] == 0 && record['cczl'] == 0) {
            record['ccsl'] = record['mccsl'];
            record['cczl'] = record['mcczl'];
        }


        //  console.log("onCpckdmxShowView", record['ccsl'], record['cczl'], record['bzid']);
        this.dialog_mx = view.add({
            xtype: 'formmxwindow',

            viewModel: {
                data: record
            },
            session: true
        });

        this.dialog_mx.show();

        var cpckdje_store = this.lookupReference('cpckdmxje').getStore();
        cpckdje_store.filter(
            { filterFn: function (item) { return item.get("mxid") == mxid && (item.get("dh") == dh); } }
        );
        var cpckdcw_store = this.lookupReference('cpckdmxcw').getStore();
        cpckdcw_store.filter(
            { filterFn: function (item) { return item.get("kcid") == kcid && (item.get("dh") == dh) && ((item.get("sl") != 0) || (item.get("zl") != 0)); } }
        );
        var cpckdmxcw = this.lookupReference('cpckdmxcw').getStore();
        cpckdmxcw.filter(
            {
                filterFn: function (item) {
                    return item.get("kcid") == kcid && (item.get("dh") == dh) && ((item.get("sl") != 0) || (item.get("zl") != 0));
                }
            }
        );

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
    onCpxsdmxShowView: function (button) {
    var  rec = button.getWidgetRecord();
          dh = generateGUID();
      //  console.log("dh=",dh);
        xsid = rec.data.xsid;
        var record = rec.data;
        khid = rec.data.khid;
        // that.xsmxid=rec.data.mxid;
        //console.log("onCpxsdmxShowView", record);
        var endrq = Ext.Date.format(rec.data.endrq, 'Y-m-d');
        var today = Ext.Date.format(new Date(), 'Y-m-d');
        //console.log("date", today, endrq);
        record['btnButtonHidden'] = true;
        record['ckrq'] = new Date();
        record['cwr'] = '';
        record['op'] = 'ck';
        record['ckop'] = true;
        record['title'] = "商品销售单-出仓处理";
        if (today > endrq) {
            Ext.MessageBox.show({
                title: '注意！',
                msg: '<br><br>此提货单已超过有效期，还要继续发货处理吗？<br><br>',
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
            xtype: 'cpxsdformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();

        var cpxsdmx_store = this.lookupReference('CpxsdmxGrid').getStore();
        cpxsdmxStore.each(function (rec) {
            if (rec.data.xsid == record.xsid) {
                rec.data.ccsl = 0;
                rec.data.cczl = 0;
                rec.data.ccje = 0;
                rec.data.xjje = 0;
                rec.data.dh = dh;
                cpxsdmx_store.add(rec);
            }
        })

        var p = this.lookupReference('popupCpxsdWindow');
        p.down("#btnCpxsdDelete").setHidden(true);
        p.down("#field_ckrq").setValue(new Date());
        p.down("#btnCpxsdSave").setHidden(false);
        var cpckdje_store = this.lookupReference('cpckdmxje0').getStore();
        cpckdje_store.removeAll();
        cpckdcwStore.proxy.extraParams.xsid = record.xsid;
        cpckdcwStore.proxy.extraParams.loc = 'xsid';
        cpckdcwStore.load();
    },
    onCpckdjeAddClick: function (record) {
        that.popupmx = that.getView().down('#cpckdmxedit');// this.lookupReference('popupmxWindow');
        var rec = that.lookupReference('popupmxWindow').getViewModel();
        var obj = [];
        obj['xjbz'] = rec.data.xjbx;
        obj['khid'] = khid;
        obj['bzid'] = rec.data.bzid;

        //console.log('bzid', rec, obj);
        treeSelect('work', that, obj, that.popupmx, false, ckdworkCallBack);
        return false;
    },

    onCpckdjeDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpckdmxje'),
            selection = customerGrid.getSelectionModel().getSelection()[0];
        var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
        var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupmxWindow').getViewModel();
                var store = customerGrid.getStore();
                that.sumjs(null, store, panel);
            }
        }
        );

    },
    onCpckdmxFormSubmit: function () {
        var dialog = this.dialog_mx,
            form = this.lookupReference('windowFormmx'),
            isEdit = this.isEdit_mx,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }
        var rec = form.getValues();
        //   console.log('onCpckdmxFormSubmit', rec);
        var p = this.lookupReference('popupmxWindow').getViewModel();


        var cpckdcw_store = this.lookupReference('cpckdmxcw').getStore();
        var i = 0, sumsl = 0, sumzl = 0;
        sumsl = Math.round(1000 * cpckdcw_store.sum("ccsl")) / 1000;
        sumzl = Math.round(1000 * cpckdcw_store.sum("cczl")) / 1000;
        /*cpckdcw_store.each(function (reccw) {
            if ((reccw.data.ccsl != 0) || (reccw.data.cczl != 0)) {
                i++;
                sumsl = sumsl + reccw.data.ccsl;
                sumzl = sumzl + reccw.data.cczl;
            }
        })
        */



        if ((sumsl != 0) || (sumzl != 0)) {
            if ((sumsl != Math.round(1000 * p.get('ccsl')) / 1000) || (sumzl != Math.round(1000 * p.get('cczl')) / 1000)) {
                Ext.MessageBox.alert('注意！', '输入出仓数量、重量与明细内容不一致！');
                return false
            }
        }
        cpckdcw_store.sync();

        var cpckdje_store = this.lookupReference('cpckdmxje').getStore();
        i = 0;

        var sumje = 0;
        var sumxjje = 0;

        cpckdje_store.each(function (recje) {
            if (recje.data.je != 0) {
                sumje = sumje + recje.data.je;
                if (recje.data.xjbz) {
                    sumxjje = sumxjje + recje.data.je;
                }
            }
        })
        sumje = sumje + 1 - 1;
        sumxjje = sumxjje + 1 - 1;

        cpckdje_store.sync();
        curcpckdcwStore.reload();
        curcpckdjeStore.reload();
        var cpckdmx_store = that.lookupReference('CpxsdmxGrid').getStore();

        var r = that.recordID;

        var recmx = cpckdmx_store.getById(r);
        recmx.set("ccsl", 0);
        recmx.set("cczl", 0);
        recmx.set("ccsl", Math.round(1000 * p.get('ccsl')) / 1000);
        recmx.set("cczl", Math.round(1000 * p.get('cczl')) / 1000);
        recmx.set("ccje", p.get('ccje'));
        recmx.set("xjje", p.get('xjje'));

        // recmx.set("ccsl", sumsl);
        // recmx.set("cczl", sumzl);
        // recmx.set("ccje", sumje);
        // recmx.set("xjje", sumxjje);
        //console.log('onCpckdmxFormSubmit  3 r=',r,sumsl,sumzl,sumje,sumxjje);
        that.getView().down("#cpckdmxedit").close();
        //      return;
    },



    onCpckdFormSubmit: function () {
        // console.log('onCpckdFormSubmit');
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
        var p = this.lookupReference('popupCpxsdWindow').getViewModel();


        
        var rq=rec.ckrq;//Ext.decode(Ext.encode(p.get('ckrq')));
        //console.log(rq,sys_option_min_date);
        if (rq<sys_option_min_date) {
            Ext.MessageBox.alert('注意！', '输入出仓日期不能小于：'+sys_option_min_date);
            return false
        }
    
       // return;

        xsid = rec.xsid;
        var cpckd = {};

        cpckd['cnote'] = rec.cnote;
        cpckd['cphm'] = rec.cphm;
        cpckd['thr'] = rec.sfr;

        cpckd['xsid'] = xsid;
        cpckd['czy'] = sys_userInfo.username;
        cpckd['ckrq'] = rec.ckrq;// Ext.decode(Ext.encode(p.get('ckrq')));

        // console.log(cpckd['ckrq'],Ext.decode(Ext.encode(p.get('ckrq')))); 


        var cpckdcw_store = this.lookupReference('cpckdmxcw0').getStore();
        var cpckdje_store = this.lookupReference('cpckdmxje0').getStore();
        var cpckdmx_store = this.lookupReference('CpxsdmxGrid').getStore();




        cpckdcw_store.load();
        cpckdje_store.load();
        cpckdcw_store.clearFilter();
        cpckdje_store.clearFilter();
        var i = 0, mxdh = '';
        var arraymx = [];
        var arraycw = [];
        var arrayje = [];
        var recmx0;
        var cwrec = 0;
        cpckd['fhbz'] = 1;
        var sumccsl = Math.round(cpckdmx_store.sum('ccsl') * 1000) / 1000;
        var sumcczl = Math.round(cpckdmx_store.sum('cczl') * 1000) / 1000;
        var summccsl = Math.round(cpckdmx_store.sum('mccsl') * 1000) / 1000;
        var summcczl = Math.round(cpckdmx_store.sum('mcczl') * 1000) / 1000;
        if ((summccsl == sumccsl) && (summcczl == sumcczl) && ((sumccsl != 0) || (sumcczl != 0))) {
            cpckd['fhbz'] = 2;
        }
        var msg = "";
        cpckdmx_store.each(function (reccw) {
         
            if (reccw.get('dh') == dh) {
                if ((reccw.get('ccsl') != 0) || (reccw.get('cczl') != 0)) {
                    var obj = {};
                    obj['mxid'] = reccw.data.mxid;
                    obj['ccsl'] = reccw.data.ccsl;
                    obj['cczl'] = reccw.data.cczl;
                    obj['ccje'] = reccw.data.ccje;
                    obj['xjje'] = reccw.data.xjje;

                    arraymx.push(obj);
                    cwrec++;
                }
            }
            if (reccw.get('ccsl') < reccw.get('mccsl')) {
                msg = msg + '<br><br>商品：' + reccw.get('cpmc') + '出仓数量小于提单开单数量';
            }
        })
        if (cwrec == 0) {
            Ext.MessageBox.alert('注意！', '请输入出仓内容！');
            return false
        }
        cwrec == 0;
        cpckdcw_store.each(function (reccw) {
            if (reccw.get('dh') == dh) {
                if ((reccw.get('ccsl') != 0) || (reccw.get('cczl') != 0)) {

                    reccw.data.czrq = Ext.Date.format(reccw.data.czrq, 'Y-m-d');
                      
                    arraycw.push(reccw.data);
                    cwrec++;
                }
            }
        })
       //  console.log("reccwv len",arraycw.length);
       if (arraycw.length==0)
        {
            msg = msg + '<br><br>没有仓位出仓内容！';
        }
       var sumjesl=0;
        cpckdje_store.each(function (recje) {
            if (recje.get('dh') == dh) {
                if (recje.get('sl')!=0){
                   sumjesl=sumjesl+recje.get('sl');
                   //arrayje.push(recje.data);
                }
            }

        })



        var s=0;
        cpckdje_store.each(function (recje) {
            if (recje.get('dh') == dh) {
                if (recje.get('sl')!=0 ){
                    if ((sumjesl<1) && (s==0) && (recje.get('zljs')) ) {  //重不够吨按一吨计
                        recje.data.sl=recje.data.sl+(1-sumjesl);
                        recje.data.je= Math.ceil(recje.data.dj*recje.data.sl);
                        s=1;
                    }
                   arrayje.push(recje.data);
                }
            }

        })
        cpckd['cpckdmx'] = arraymx;
        cpckd['cpckdje'] = arrayje;
        cpckd['cpckdcw'] = arraycw;
        //console.log('cpckd', cpckd);
      //  console.log('msg',msg);
        //return;
        var str = obj2str(cpckd);


        var encodedString = base64encode(Ext.encode(str));
        //var that = this;
        // AjaxDataSave('cpckdmxcksave', xsid, encodedString, saveCallBack,that);

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
                        that.data_save(xsid, encodedString);
                    }
                }
            });
            return;
        }

        that.data_save(xsid, encodedString);
        //-------------------------------------
    },

    data_save: function (loc, dataStr) {

        // console.log("id",loc);
        // return ;
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'cpckdmxcksave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                loc: loc,
                data: dataStr
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                    that.getView().down("#cpxsdshowview").close();
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

