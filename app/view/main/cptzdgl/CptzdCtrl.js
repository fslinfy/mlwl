sys_DisplayAll = "";
var that;
var khid = 0;
var cpkcmxStore;
var cptzdmx_store;
var TzdsaveCallBack = function (th) {
    th.getView().down("#cptzdmxedit").close();
    th.locQuery(th);
}
var workCallBack = function (node) {
    var rec = node.data;
    var p = that.popupmx;

    if (rec.zljs == '1') {
        var dw = '吨';//‘’ p.getViewModel().get('zldw');
        var sl = p.getViewModel().get('tzzl');
    }
    else {
        var dw = '包';// p.getViewModel().get('sldw');
        var sl = p.getViewModel().get('tzsl');
    }
    var cptzdmxje = that.lookupReference('cptzdmxje').getStore(); // p.getStore();
    cptzdmxje.add({
        dw: dw,
        workid: rec.id,
        work: rec.text,
        sl: sl,
        dj: rec.dj,
        je:Math.ceil( sl * rec.dj),
        sm: '',
        zljs: rec.zljs,
        inbz: rec.inbz,
        indj: rec.indj
    })
    that.sumjs(null, cptzdmxje, p.getViewModel());
}


var khmcCallBack = function (node) {
    that.popupmx.getViewModel().set('newkhid', node.data.id);
    that.popupmx.getViewModel().set('newkhmc', node.data.text);
}
Ext.define('MyApp.view.main.cptzdgl.CptzdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CptzdCtrl',
    requires: [
        'MyApp.view.main.cptzdgl.CptzdView'
        , 'MyApp.view.main.report.PrintCptzd'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCdmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],
    locQuery: function (that) {
        //   console.log('locQuery');

        var selectedData = that.getView().getSelectionModel().getSelection();
        // that.getView().getSelectionModel().deselect(selectedData);
        selectedData.forEach(function (rec) {
            that.getView().getSelectionModel().deselect(rec);
        })

        var ckid = that.viewname.getViewModel().get('ckid');
        khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var area = that.viewname.getViewModel().get('area');
        //  if (area == '') area = 'A';
        var store = that.viewname.getStore();
        store.proxy.extraParams.loc = 'cpkcmxloc';
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;

        store.proxy.extraParams.area = area;
        store.reload();

        selectedData = that.getView().getSelectionModel().getSelection();
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setDisabled(selectedData.length == 0);

    },

    onBtnQueryClick: function (button, e, options) {
        khid = that.viewname.getViewModel().get('khid');
        var ckid = that.viewname.getViewModel().get('ckid');
        var tool = that.viewname.down("#QueryToolbarView");
        if (khid == 0) {
            tool.down('#btnNew').setDisabled(true);
            Ext.MessageBox.alert('注意！', '请选择客户！');
            return false
        }
        if (ckid == 0) {
            tool.down('#btnNew').setDisabled(true);
            Ext.MessageBox.alert('注意！', '请选提货仓库！');
            return false
        }
        //  tool.down('#btnNew').setDisabled(false);
        this.locQuery(that);
    },
    onBtnNewClick: function (rs) {

        var selectedData = that.getView().getSelectionModel().getSelection();
        var store = that.liststore;
        var rows = 0;
        var sumsl = 0;
        var sumzl = 0;
        selectedData.forEach(function (rec) {
            sumsl = sumsl + rec.data.sl;
            sumzl = sumzl + rec.data.zl;

        })

        khid = that.viewname.getViewModel().get('khid');
        var khmc = that.viewname.getViewModel().get('khmc');
        var ckid = that.viewname.getViewModel().get('ckid');
        var ckmc = that.viewname.getViewModel().get('ckmc');
        var record = {};
        record['khid'] = khid;
        record['khmc'] = khmc;
        record['ckid'] = ckid;
        record['jekh'] = true;
        record['ckmc'] = ckmc;
        record['tzsl'] = sumsl;
        record['tzzl'] = sumzl;
        record['tzrq'] = new Date();
        record['czy'] = sys_userInfo.username;
        record['newkhid'] = 0;
        record['newkhmc'] = "";

        var view = that.viewname;
        that.dialog = view.add({
            xtype: 'formcptzdeditwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        var cptzdmx = this.lookupReference('cptzdmxGrid').getStore();

        //var cptzdmx = that.lookupReference('CpxsdmxGrid').getStore();
        cptzdmx.load();
        cptzdmx.removeAll();
        var todaysDate = new Date();

        todaysDate.setDate(todaysDate.getDate() + 1);

        todaysDate = new Date(Ext.Date.format(todaysDate, 'Y-m-d'))

        // console.log("todaysDate", todaysDate);
        selectedData.forEach(function (rec) {

            if ((rec.data.sl != 0) || (rec.data.zl != 0)) {
                var record0 = {
                    kcmxid: rec.data.kcmxid,
                    kcid: rec.data.kcid,
                    cdid: rec.data.cdid,
                    cdmc: rec.data.cdmc,
                    cpid: rec.data.cpid,
                    cpmc: rec.data.cpmc,
                    bzid: rec.data.bzid,
                    bzmc: rec.data.bzmc,
                    cpgg: rec.data.cpgg,
                    cpph: rec.data.cpph,
                    jldw: rec.data.jldw,
                    kcsl: rec.data.sl,
                    kczl: rec.data.zl,
                    tzsl: rec.data.sl,
                    tzzl: rec.data.zl,
                    area: rec.data.area,
                    cw: rec.data.cw,
                    sm: rec.data.sm,
                    czdj: rec.data.czdj,
                    czrq: rec.data.czrq,
                    mints: rec.data.mints,
                    newcw: rec.data.cw,
                    newsm: rec.data.sm,
                    newczdj: rec.data.czdj,
                    newczrq: todaysDate,
                    newmints: rec.data.mints,
                    newcpph: rec.data.cpph,
                    xsdj: 0,
                    xsje: 0,
                    sm: ''

                };

                cptzdmx.add(record0);

            }
        })
        cptzdmx.clearFilter();
        cptzdmx.sync();
        that.dialog.show();
    },
    onBtnHelpClick: function (button, e, options) {
        return false;
    },
    init: function () {
        that = this;
        that.viewname = that.getView();
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setText("开调账单");
        tool.down('#btnNew').setDisabled(true);
        tool.down('#btnNew').setHidden(false);

        if (sys_customer_id > 0) {
            that.viewname.getViewModel().set('khid', sys_customer_id);
            that.viewname.getViewModel().set('khmc', sys_customer_name);
        }
        if (sys_location_id > 0) {
            that.viewname.getViewModel().set('ckid', sys_location_id);
            that.viewname.getViewModel().set('ckmc', sys_location_name);
        }
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnNew": {
                click: this.onBtnNewClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#FilterField": {
                change: this.onFilterChange
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnQueryCdmc": {
                click: this.SelectCdbmView
            },
            "#btnQueryCpmc": {
                click: this.SelectCpbmView
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
            ,
            //  "#btnKhbmTreeAdd": {
            //    click: this.onKhbmTreeAdd
            // }
            // ,
            "#btnCptzdjeAddClick": {
                click: this.onCptzdjeAddClick
            }
            ,
            "#btnCptzdjeDeleteClick": {
                click: this.onCptzdjeDeleteClick
            },
            "#btnCptzdmxFormSubmit": {
                click: this.onCptzdmxFormSubmit
            }


        });

        //  console.log(new Date('2017-12-03T08:00:00'),new Date());    

        that.liststore = that.viewname.getStore();
    },

    onSelectionChange: function (grid, selection) {
        //var tool = that.viewname.down("#QueryToolbarView");
        //console.log(selection,selection.getCount()  ); 
        //tool.down('#btnNew').setDisabled(selection.getCount() == 0);

       var  selectedData = that.getView().getSelectionModel().getSelection();
      // console.log(selectedData,selectedData.length); 


        var tool = that.viewname.down("#QueryToolbarView");

        tool.down('#btnNew').setDisabled(selectedData.length == 0);


    },
    onCptzdjeAddClick: function (record) {
        that.popupmx = this.lookupReference('popupcptzdwindow');// that.getView().down('#cptzdmxedit');
        var rec = that.lookupReference('popupcptzdwindow').getViewModel();



        var obj = [];
        obj['khid'] = khid;
        obj['bzid'] = 1;
        // console.log('bzid', rec, obj);

        treeSelect('work', that, obj, that.popupmx, false, workCallBack);
        return false;
    },

    onCptzdjeDeleteClick: function () {
        var th = this;
        var customerGrid = this.lookupReference('cptzdmxje'),
            selection = customerGrid.getSelectionModel().getSelection()[0];
        var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
        var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = th.lookupReference('popupcptzdwindow').getViewModel();
                var store = customerGrid.getStore();
                that.sumjs(null, store, panel);
            }
        }
        );


    },
    sumjs: function (store1, store2, panel) {
        if (store2) {
            var tzje = 0;
            var xjje = 0;
            store2.each(function (rec) {
                tzje = tzje + rec.data.je;
                if (rec.data.xjbz) {
                    xjje = xjje + rec.data.je;
                }
            })
            panel.set('tzje', tzje);
            panel.set('xjje', xjje);
        }
        if (store1) {
            var sl = store1.sum('tzsl');
            var zl = store1.sum('tzzl');
            panel.set('tzsl', sl);
            panel.set('tzzl', zl);
        }
        return true;

    },
    onSelectKhbmView: function (record) {

        treeSelect('khmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    onSelectNewKhbmView: function (record) {
        that.popupmx = this.lookupReference('popupcptzdwindow');
        // console.log('onSelectNewKhbmView');
        treeSelect('khmc', that, '', that.popupmx, false, khmcCallBack);
        return false;
    },

    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, 'cpkc', that.viewname, true);
        return false;
    },

    SelectCdbmView: function (record) {
        treeSelect('cdmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    SelectCpbmView: function (record) {
        treeSelect('cpmc', that, 'cpkc', that.viewname, true);
        return false;
    },

    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('cdmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cpgg')) || regExp.test(record.get('cpph')) || regExp.test(record.get('khmc'));
        });
    },
    onCptzdmxFormSubmit: function () {
        //  console.log('onCptzdmxFormSubmit')
        var dialog = this.dialog,
            form = this.lookupReference('windowFormmx'),
            isEdit = this.isEdit,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }
        var rec = form.getValues();
        var p = this.lookupReference('popupcptzdwindow').getViewModel();
        var newkhid = p.get('newkhid');
        if (newkhid < 1) {
            Ext.MessageBox.alert('注意！', '请选择商品调入客户！');
            return false
        }
        var cptzd = {};
        cptzd['czy'] = sys_userInfo.username;
        cptzd['cnote'] = rec.cnote;//p.get('cnote');;
        cptzd['khid'] = p.get('khid');
        cptzd['khmc'] = p.get('khmc');
        if (p.get('jekh')){
                cptzd['jekh'] ='1';
        }
        else{
                cptzd['jekh'] ='0';
        }

        cptzd['newkhid'] = p.get('newkhid');
        cptzd['newkhmc'] = p.get('newkhmc');
        cptzd['tzrq'] = Ext.decode(Ext.encode(p.get('tzrq')));
        cptzd['ckid'] = p.get('ckid');
        cptzd['ckmc'] = p.get('ckmc');
        var cptzdje_store = this.lookupReference('cptzdmxje').getStore();
        cptzdmx_store = this.lookupReference('cptzdmxGrid').getStore();
        var arraymx = [];
        var arrayje = [];

        var recdata;
        //   cptzdmx_store1=cptzdmx_store;;
        cptzdmx_store.each(function (reccw) {
            if ((reccw.get('tzsl') != 0) || (reccw.get('tzzl') != 0)) {
                recdata = reccw.data;

                //    console.log(recdata['czrq'],Ext.decode(Ext.encode(recdata.czrq)));
                recdata['czrq'] = Ext.decode(Ext.encode(recdata.czrq));
                recdata['newczrq'] = Ext.decode(Ext.encode(recdata.newczrq));

                arraymx.push(recdata);
            }
        })

        cptzdje_store.each(function (recje) {
            if (recje.get('je') != 0) {
                arrayje.push(recje.data);
            }
        })
        
        //      return;

        cptzd['cptzdmx'] = arraymx;
        cptzd['cptzdje'] = arrayje;

      //  console.log("cptzd",cptzd);
       // return;
        var str = obj2str(cptzd);
        var encodedString = base64encode(Ext.encode(str));

        //AjaxDataSave('cptzdmxsave', 0, encodedString, TzdsaveCallBack, that);

        //------------------------------------

        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'cptzdmxsave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                loc: 0,
                data: encodedString
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);

                if (result.result == 'success') {
                     //  PrintCptzdtzid(result.tzid); 

                    that.getView().down("#cptzdmxedit").close();
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
        //-------------------------------------

    }
});


