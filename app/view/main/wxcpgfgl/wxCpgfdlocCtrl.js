var gfid = 0;
var that;
var curcpgfdjeStore;
/*
var khmcCallBack = function (node) {
    that.popupmx.getViewModel().set('khid', node.data.id);
    that.popupmx.getViewModel().set('khmc', node.data.text);
}
*/
var gfdshsaveCallBack = function (th) {
    var p = th.lookupReference('popupCpgfdWindow');
  //  var mgfid = p.getViewModel().get('gfid');
    if (that.loc != "delete") {
        Ext.MessageBox.show({
            title: "提示",
            msg: "打印商品过车单",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "确认打印",
                no: "放  弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    PrintCpgfdgfid(gfid);
                }
                p.close();
                that.locQuery();
            }
        });
    } else {
        p.close();
        that.locQuery();
        Ext.MessageBox.alert('提示！', '此过车单过车内容已作废！');
    }
};
var cpgfdmxStore0;
Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wxCpgfdlocCtrl',
    requires: [
        'MyApp.view.main.wxcpgfgl.wxCpgfdlocView'
        //, 'MyApp.view.main.wxcpgfgl.wxCpgfdmxEdit'
        , 'MyApp.view.main.tree.WorkerSelectTree'
        ,'MyApp.view.main.report.PrintwxCpgfd'
    ],
    locQuery: function (the) {

        var v = that.viewname.getViewModel();
        var khid = v.get('khid');
        var ckid = v.get('ckid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');
           
        console.log(d1,d2,start_date,end_date) ;         
       // var store = that.viewname.getStore();
       cpgfdmxStore0.proxy.extraParams.loc = 'wxcpgfdmxgfloc';
       cpgfdmxStore0.proxy.extraParams.khid = khid;
       cpgfdmxStore0.proxy.extraParams.l_id = ckid;
       cpgfdmxStore0.proxy.extraParams.startdate=d1;
       cpgfdmxStore0.proxy.extraParams.enddate=d2;
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
        v.set('PageTitleName', '商品过车单明细查询');
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
                    loc: "wxcpgfdmxgfloc",
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
        cpgfdmxStore0.on("load", function () {
            var v = that.viewname.getViewModel();
            var khid = v.get('khid');
            var ckid = v.get('ckid');
            start_date = v.get('start_date');
            end_date = v.get('end_date');
            var d1 = Ext.Date.format(start_date, 'Y-m-d');
            var d2 = Ext.Date.format(end_date, 'Y-m-d');
    
            
           var store = that.viewname.getStore();
         store.proxy.extraParams.act ="wxCpgfdlist_pc";
           store.proxy.extraParams.loc = 'wxcpgfdgfloc';
           store.proxy.extraParams.khid = khid;
           store.proxy.extraParams.l_id = ckid;
           store.proxy.extraParams.startdate=d1;
           store.proxy.extraParams.enddate=d2;
            store.reload();
        });
        that.listmxstore = cpgfdmxStore0;
        that.liststore = that.viewname.getStore();
        that.control({
            "#btnQuery": {
                click: that.onBtnQueryClick
            },
            "#btnCpgfdSave": {
               click: that.onwxCpgfdFormSubmit
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnPrintCpgfd":  {
                click: function () {
                    PrintCpgfdgfid(gfid);
                }
            },
            "#btnwxCpgfdDelete": {
                click: that.onwxCpgfdshDeleteSubmit
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
        that.viewname.down('#QueryDate').setHidden(false);
        var v = that.viewname.getViewModel();
        v.set('start_date', start_date);
        v.set('end_date', end_date);
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
        
        var rec = button.getWidgetRecord();
        issave=false;
        gfid = rec.data.gfid;
        mgfid=gfid;
        var record = rec.data;
        console.log('CpgfshShowView',record);
        record['op'] = 'loc';
        record['gsop'] = true;
        record["w"] = 0;
        record['btnButtonHidden'] = false;
        record['title'] = '商品过车单-查询';
        var view = this.getView();
        this.isEdit = false;// !!record;
        
        this.dialog = view.add({
            xtype: 'cpgfshformwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        this.dialog.show();
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
        var p = this.lookupReference('popupCpgfdWindow');
        p.down("#btnCpgfdSave").setHidden(true);
        if (sys_system_sh)
        {
            p.down("#btnwxCpgfdDelete").setHidden(!sys_system_sh);
        }
        
        var cpgfdmx_store = that.lookupReference('CpgfdmxGrid').getStore();
        cpgfdmx_store.proxy.extraParams.gfid = gfid;
       cpgfdmx_store.proxy.extraParams.act='wxCpgfdgfmxlist_pc';
        cpgfdmx_store.load();
    },



    onCpgfdmxgheditView:function (button) {

            var rec = button.getWidgetRecord();
            console.log("onCpgfdmxgheditView 商品过车处理",rec.data);
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
            console.log("endrq", record);
    
            that.recordID = record['id'];
            record['newrecord'] = false;
            record['xjbz'] = rec0.data.xjbz;
            record['title'] = "商品过车处理";
    
            if (record['sl'] == 0 && record['zl'] == 0) {
                record['sl'] = record['khsl'];
                record['zl'] = record['khzl'];
            }
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
        },
    
           
    /*    onCpgfdjeDeleteClick: function (button) {
                var customerGrid = this.lookupReference('cpgfdmxje'),
                selection = customerGrid.getSelectionModel().getSelection()[0];
            var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
            var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
                if (e == 'yes') {
                    selection.drop();
                    var panel = that.lookupReference('popupmxWindow').getViewModel();
                    var store = customerGrid.getStore();
                    that.sumjs(null, store, panel);
                }
            });
    
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


    onSelectWorkerView: function (button) {
        var rec = button.getWidgetRecord();
        if (rec.data.mxdh=='1' )
        {
         return ;  
        }
        console.log('rec=',rec);
        SelectWorkerView(button);
    },
    onWorkerSelectOkClick: function () {
        WorkerSelectOkClick();
    },

    onwxCpgfdFormSubmit: function () {
      //  this.wxCpgfdshSave('cpgfdloc', that);
    },
    onwxCpgfdshDeleteSubmit: function () {
        this.wxCpgfdshSave('delete', that);
    },
    wxCpgfdshSave: function (loc, the) {
        loc="delete";
        var p = the.lookupReference('popupCpgfdWindow').getViewModel();
        var form = this.lookupReference('windowForm');
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }
        var wxcpgfdmx_store = the.lookupReference('CpgfdmxGrid').getStore();


        var sumsl=0,sumzl=0,sumje=0,recs=0; 
        var mx = [];
        
         wxcpgfdmx_store.each(function (rec) {
                if (rec.data.mxdh!='1') {
                  recs=recs+1;
                    sumsl=sumsl+rec.data.sl;
                      sumzl=sumzl+rec.data.zl;
                      sumje=sumje+rec.data.je;
                    mx.push(rec.data);
                }
            })
        
       // if (recs==0)
         //  {
           //     Ext.MessageBox.alert('注意！', '请输入明细机械作用数据内容！');
             //   return false;
          // }

        var gfd = {}
        gfd['gfrq'] = Ext.decode(Ext.encode(p.get('gfrq')));
        gfd["gfid"] = gfid;
        gfd["cphm"] = p.data.cphm;
        gfd["sfr"] = p.data.sfr;
        gfd["cnote"] = p.data.cnote;
        gfd['gfrq'] = Ext.decode(Ext.encode(p.get('gfrq')));
        if (p.data.xjbz) {
            gfd["xjbz"] = 1;
            gfd["xjje"] = sumje;
        }
        else {
            gfd["xjbz"] = 0;
            gfd["xjje"] = 0;
        }
        gfd["gfdje"] = mx;
        var msg = "过车单号：" + p.get('gfdh') + "<br>客户名称：" + p.get('khmc');
        var title = "真的取消此过车单的过车内容？";
        
        var btnname="确  认";
        var cgfrq=gfd['gfrq'].substr(0,10);
        var ctoday=Ext.Date.format(new Date(), 'Y-m-d' );
         if ((cgfrq<sys_option_min_date) && (ctoday>=sys_option_min_date)) {
                Ext.MessageBox.alert('注意！', '此单是上月过车单，不能作删除处理！');
                return false
         }

    
        that.loc = loc;
        that.gfid = gfid;
        console.log("gfd",gfd);
        //return ;
        

        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: btnname,
                no: "放 弃"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {
                if (btn == "yes") {
                    that.lookupReference('popupCpgfdWindow').down("#btnwxCpgfdDelete").setHidden(true);
                    var str = obj2str(gfd);
                    var encodedString = base64encode(Ext.encode(str));
                   // console.log('save....');
                    AjaxDataSave('wxcpgfdshsave', loc, encodedString, gfdshsaveCallBack, the);
                }
            }
        });


        
    },


});

