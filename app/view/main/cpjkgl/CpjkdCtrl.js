var jkdh;
var that;
var khid = 0;
var cpjkd_store;
var CurCpjkdcwStore;
var CurCpjkdjeStore;
var CurCpjkdmxStore;
var jkdworkCallBack = function (node) {
    var rec = node.data;
    var p = that.popupmx;
    var mxdh = p.getViewModel().get('mxdh');
    if (rec.zljs == '1') {
        var dw = p.getViewModel().get('zldw');
        var sl = p.getViewModel().get('jczl');
        
    }
    else {
        var dw = p.getViewModel().get('sldw');
        var sl = p.getViewModel().get('jcsl');
    }
      
    //if ((sl<1) && (sl>0))
      //  {
        //    sl=1;
       // }
    var cpjkdmxje = that.lookupReference('cpjkdmxje').getStore();
    cpjkdmxje.add({
        dw: dw,
        mxdh: mxdh,
        jkdh:jkdh,
        workid: rec.id,
        work: rec.text,
        sl: sl,
        dj: rec.dj,
        je: Math.ceil(sl * rec.dj),
        sm: '',
        zljs: rec.zljs,
        inbz: rec.inbz,
        indj: rec.indj
    })
    sumjs(null, cpjkdmxje, p.getViewModel());


}
var packingCallBack = function (node) {
    //console.log('packing------CallBack', node);
    //var p= this.lookupReference('popupcpjkWindow');

    var r = that.popupmx.getViewModel();
    r.set('bzmc', node.data.text);
    r.set('bzid', node.data.id);

    r.set('rate', node.data.rate);

    r.set('zljs', node.data.zljs);

    //  r.set('czdj', node.data.czdj);
    //  r.set('phdj', node.data.phdj);

    r.set('czdj', 0);
    r.set('phdj', 0);

    r.set('bydj', node.data.bydj);
    r.set('sldw', node.data.sldw);
    r.set('zldw', node.data.zldw);


    if (node.data.zljs == 1) {
        r.set('jldw', node.data.zldw);
    } else {
        r.set('jldw', node.data.sldw);
    }


}

Ext.define('MyApp.view.main.cpjkgl.CpjkdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpjkdCtrl',
    requires: [
        'MyApp.view.main.cpjkgl.CpjkdView'
        , 'MyApp.view.main.DataSave'
        , 'MyApp.view.main.report.PrintCpjkd'
        , 'MyApp.view.main.tree.NewCpjkSelectTree'


    ],
    onBtnQueryClick: function (button, e, options) {

        this.getView().getStore().load();
        return false;
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
        tool.down('#btnDelete').setDisabled(false);
        return false;
    },
    onBtnNewClick: function (rs) {
        this.getView().getStore().addSorted([{ L_id: sys_location_id }]);
        return false;
    },
    onBtnDeleteClick: function (button, e, options) {
        var store = this.getView().getStore();
        var grid = Ext.getCmp('CpjkdGrid');
        return storeBtnDeleteClick(this, grid, store);
    },
    onBtnHelpClick: function (button, e, options) {
        //  console.log(" help")
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
        var win = this.lookupReference('jkdpopupWindow');
        win.close()
        return false;
    },
    init: function () {
        that = this;
        //console.log("init");
        //console.log(base64encode('8888'));
        CurCpjkdcwStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpjkdcwModel',
           // autoLoad: true,
            proxy: {
                type: 'sessionstorage',
                id: 'CurCpjkdcwModel'
            }
        });

        CurCpjkdjeStore = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            model: 'MyApp.model.CpjkdjeModel',
           // autoLoad: true,
            proxy: {
                type: 'sessionstorage',
                id: 'CurCpjkdjeModel'
            }
        });




        cpjkd_store = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            alias: 'store.CpjkdStore',
            model: 'MyApp.model.CpjkdModel',
            autoLoad: true,
            proxy: {
                type: 'sessionstorage',
                id: 'CpjkdModel'
            }
        });

        // console.log("init  0");


        /*  cpjkd_store = Ext.create('Ext.data.Store', {
              extend: 'Ext.data.Store',
              alias: 'store.CpjkdStore',
              model: 'MyApp.model.CpjkdModel',
              //itemId: "CpjkdStore",
             // autoLoad: true,
              proxy: {
                  type: 'sessionstorage',
                  id: 'CpjkdModel'
              }
          });
          
          */

        var store = this.getView().getStore();
        store.on('beforeload', this.onBeforeReload, this);
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnUndo').setHidden(true);
        tool.down('#btnDelete').setHidden(true);
        tool.down('#btnNew').setHidden(true);
        tool.down('#btnSave').setHidden(true);

        this.control({
            "#btnQueryCdmc": {
                click: this.onSelectCdbmView
            },
            "#btnQueryCpmc": {
                click: this.SelectCpbmView
            },

            "#FilterField": {
                change: this.onFilterChange
            }/*,
            "#btnJkspTreeAdd": {
                change: this.onJkspSelectOkClick
            }*/

        });
        // console.log("init  2");
    },
    onUploadFile: function () {

        uploadWin = new Ext.Window({
            width: 600,
            height: 700,
            title: '请选择：',
            autoScroll: true,
            plain: true,
            resizable: true,
            frame: true,
            layout: 'fit',
            closeAction: 'destroy',
            border: false,
            items: [
                { xtype: "msFieldFileImageContainer" }
            ]
        }).show();
    },

    onFilterChange: function (v) {
        var store = this.getView().getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return (regExp.test(record.get('C_name')) || regExp.test(record.get('C_shortname')) || regExp.test(record.get('C_code')) || regExp.test(record.get('Py_code')));
        });
    },



    onEditCpjkdmxClick: function (button) {
        this.createDialog(button.getWidgetRecord());
    },

    onshowEditView: function (button) {
        var rec = button.getWidgetRecord();
        // console.log("area",sys_location_area);
        khid = rec.data.C_id;
        var khmc = rec.data.C_name;
        cpjkd_store.clearFilter();
        var index = cpjkd_store.find('khid', khid);
        var record = cpjkd_store.getAt(index);
        if (!record) {
            jkdh=generateGUID();
            cpjkd_store.add(
                {
                    jkdh:jkdh,
                    czrq: new Date(),
                    jkrq: new Date(),
                    khid: khid,
                    khmc: khmc,
                    area: sys_location_area,
                    cnote: '',
                    sfdh: '',
                    cphm: '',
                    shr: ''
                }
            )
            cpjkd_store.sync();
            index = cpjkd_store.find('khid', khid);
            record = cpjkd_store.getAt(index);

        }
        record = record.data;
        
        if ((record['jkdh'] == '') || (!record['jkdh'])) {
            record['jkdh'] = generateGUID();
        }
        record['czrq'] = new Date();
        record['jkrq'] = new Date();
        record['sfr'] = '';
        record['sfdh'] = '';
        record['cphm'] = '';
        record['czy'] = sys_userInfo.username;
        jkdh = record['jkdh'];
        console.log('jkdh=',jkdh);
        var view = that.getView();
        that.isEdit = false;// !!record;
        that.dialog = view.add({
            xtype: 'formjkdwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        that.dialog.show();
        //console.log("this=",this,that);
        var cpjkdmx = that.lookupReference('CpjkdmxGrid').getStore();
        cpjkdmx.clearFilter();
        cpjkdmx.removeAll();
        cpjkdmx.sync();
        cpjkdmx.filter(
            { filterFn: function (item) { return item.get("jkdh") == jkdh; } }
        );
       // this.DeletecpjkdAll0();      
        var cpjkdcw_store = that.lookupReference('cpjkdmxcw0').getStore();
    },

    createDialog: function (record, jkdh) {
        var view = this.getView();
        system_khid = khid;
        current_newid = khid;
        this.isEdit_mx = !!record;
        if (!this.isEdit_mx) {
            record = {};

            this.editrecordID = 0;
            record['newrecord'] = true;
            record['mints'] = 1;
            record['jkdh'] = jkdh;
            record['khid'] = khid;
            record['mxdh'] = generateGUID();
            record['cdid'] = 0;
            record['cdmc'] = '';
            record['cpid'] = 0;
            record['cpmc'] = '';
            record['cpgg'] = '';
            record['bzid'] = 0;
            record['bzmc'] = '';

        } else {
            this.editrecordID = record['id'];
            record['newrecord'] = false;
            record['khid'] = khid;
            // console.log("this.recordID",this.recordID);

        }
        // console.log(record);
        record['title'] = '进库商品明细录入';
        this.dialog_mx = view.add({
            xtype: 'formcpjkwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        var mxdh = record['mxdh'];
        var cpjkdmxcw = this.lookupReference('cpjkdmxcw').getStore();
        cpjkdmxcw.filter(
            { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
        );
        var cpjkdmxje = this.lookupReference('cpjkdmxje').getStore();
        cpjkdmxje.filter(
            { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
        );

        this.dialog_mx.show();


    },

    onEditCpjkdmxClick: function (button) {
        this.createDialog(button.getWidgetRecord().data, null);
    },


    onshowmxEditView: function (record) {
        var p = this.lookupReference('jkdpopupWindow').getViewModel();
        this.createDialog(null, p.get('jkdh'));
    },

    onSelectCdbmView: function (record) {
        // console.log('onSelectCdbmView');
        treeSelect('cdmc', that, '', that.getView().down('#cpjkdmxedit'), false);

        return false;
    },
    onSelectCpbmView: function (record) {
        treeSelect('cpmc', that, '', that.getView().down('#cpjkdmxedit'), false);
        return false;
    },

    onJkspSelectOkClick: function () {
        //console.log("onJkspTreeAdd", current_newid);

        var p = that.lookupReference('popupcpjkWindow').getViewModel();

        var selecttree = that.getView().down("#selectCdmcTreePanel");
        var sm = selecttree.getSelectionModel();
        if (sm.hasSelection()) {
            node = sm.getSelection()[0];
            if (node.data.leaf) {
                p.set('cdid', node.data.id);
                p.set('cdmc', node.data.text);
            }
            else {

                Ext.MessageBox.alert('注意！', '请选择商品产地名称！');
                return false;
            }
        }


        selecttree = that.getView().down("#selectCdmcTreePanel1");
        sm = selecttree.getSelectionModel();
        if (sm.hasSelection()) {
            node = sm.getSelection()[0];
            if (node.data.leaf) {
                p.set('cpid', node.data.id);
                p.set('cpmc', node.data.text);
            }
            else {

                Ext.MessageBox.alert('注意！', '请选择商品名称！');
                return false;
            }
        }



        selecttree = that.getView().down("#selectCdmcTreePanel2");
        sm = selecttree.getSelectionModel();
        if (sm.hasSelection()) {
            node = sm.getSelection()[0];
            //console.log("node", node.data);

            if (node.data.leaf) {


                p.set('bzmc', node.data.text);
                p.set('bzid', node.data.id);

                p.set('rate', node.data.rate);

                p.set('zljs', node.data.zljs);

                //  r.set('czdj', node.data.czdj);
                //  r.set('phdj', node.data.phdj);

                p.set('czdj', 0);
                p.set('phdj', 0);

                p.set('bydj', node.data.bydj);
                p.set('sldw', node.data.sldw);
                p.set('zldw', node.data.zldw);


                if (node.data.zljs == 1) {
                    p.set('jldw', node.data.zldw);
                } else {
                    p.set('jldw', node.data.sldw);
                }

                that.lookupReference('popupSelectJkspWindow').close();



            }
            else {

                Ext.MessageBox.alert('注意！', '请选择商品包装规格！');
                return false;
            }
        }

        return;


    },

    onSelectPackingView: function (record) {
        //console.log("onSelectPackingView", khid);
        // that.popupmx = that.getView().down('#cpjkdmxedit');

        //treeSelect('bzmc', that, '', that.popupmx, false, packingCallBack);

        // this.recordID = button.getWidgetRecord();
        // var obj = [];
        // obj['khid'] = khid;



        var view = this.getView();
        this.dialog = view.add({
            xtype: 'selectJkspWindow',
            session: true
        });
        this.dialog.show();
        var s = that.getView().down("#selectCdmcTreePanel2").getStore();
        s.proxy.extraParams.p_c_id = khid;
        s.load();

        return false;
    },
    onCpjkdjeAddClick: function (record) {

        that.popupmx = that.getView().down('#cpjkdmxedit');//  this.lookupReference('popupcpjkWindow');
        var rec = that.lookupReference('popupcpjkWindow').getViewModel();



        var obj = [];
        obj['khid'] = khid;
        obj['bzid'] = rec.data.bzid;
        //  console.log('bzid', rec, obj);


        treeSelect('work', that, obj, that.popupmx, false, jkdworkCallBack);
        return false;
    },


    onSelectWorkerView: function (button) {
        this.recordID = button.getWidgetRecord();
        var view = this.getView();
        this.dialog = view.add({
            xtype: 'selectWorkerWindow',
            session: true
        });
        this.dialog.show();
    },
    onWorkerSelectOkClick: function () {


        //      function WorkerSelectOkClick() {

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
        //  console.log("1",that.recordID);
        if (selection != undefined) {
            selection.set('gs', gs.join(';'));
            selection.set('byg', by.join(';'));
            selection.set('cg', cg.join(';'));

            that.getView().down("#selectWorkerWindow").close();
        }
        // console.log("1",that.recordID);
        //};


        /*
        var records = this.getView().down("#selectWorkerTreePanel").getChecked();
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
        // console.log(gs.join(';'), by.join(';'), cg.join(';'));
        var selection = this.recordID;
        if (selection != undefined) {
            selection.set('worker', names.join(';'));
            this.getView().down("#selectWorkerWindow").close();
        }*/
    },
    onWorkerSelectCanelClick: function () {

        this.getView().down("#selectWorkerWindow").close();
    },

    onCpjkdmxcwAddClick: function () {
        var p = this.lookupReference('popupcpjkWindow');
        var bzid = p.getViewModel().get('bzid');
        if (bzid < 1) {
            return;
        }
        var mxdh = p.getViewModel().get('mxdh');
        var zlhs = p.getViewModel().get('zlhs');
        if (zlhs == '1') {
            var dw = p.getViewModel().get('zldw');
        }
        else {
            var dw = p.getViewModel().get('sldw');
        }
        var cpjkdmxcw = this.lookupReference('cpjkdmxcw').getStore();
        cpjkdmxcw.add({
            dw: dw,
            mxdh: mxdh,
            cw: '',
            cpph: '',
            sl: 0,
            zl: 0,
            sm: '',
            czdj: p.getViewModel().get('czdj')
        })
    },
    onRemoveCpjkdcwClick: function (button) {
        var store = this.lookupReference('cpjkdmxcw').getStore();
        store.remove(button.getWidgetRecord());
    },
    onRemoveCpjkdjeClick: function (button) {
        var store = this.lookupReference('cpjkdmxje').getStore();
        store.remove(button.getWidgetRecord());
    },

    onRemoveCpjkdmxClick: function (button) {
        var cpjkdmxGrid = this.lookupReference('CpjkdmxGrid');
        var store = cpjkdmxGrid.getStore();
        var selection = cpjkdmxGrid.getSelectionModel().getSelection()[0];
        selection.set('phdj', 15.9);


    },
    onCpjkdcwDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpjkdmxcw'),
            selection = customerGrid.getSelectionModel().getSelection()[0];

        var msg = "仓位：" + selection.get('cw') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>重量：" + selection.get('zl');
        var abc = Ext.Msg.confirm('真的删除仓位内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupcpjkWindow').getViewModel();
                var store = customerGrid.getStore();
                sumjs(store, null, panel);
            }
        }
        );



    },

    onCpjkdjeDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpjkdmxje'),
            selection = customerGrid.getSelectionModel().getSelection()[0];
        var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
        var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupcpjkWindow').getViewModel();
                var store = customerGrid.getStore();
                sumjs(null, store, panel);
            }
        }
        );


    },


    onCpjkdmxFormSubmit: function () {
        var dialog = this.dialog_mx,
            form = this.lookupReference('windowFormmx'),
            isEdit = this.isEdit_mx,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }

        // Ext.MessageBox.alert('注意！', '请输入商品入库明细数据！11111111111111111111');
        // console.log('注意！', '请输入商品入库明细数据！11111111111111111111');
        //     return false;
        // 、、if (form.isValid()) {
        var rec = form.getValues();


        var jkdmx = {};

        var p = this.lookupReference('popupcpjkWindow').getViewModel();
            if ((p.get('bzid') == 0) || (p.get('cpid') == 0) || (p.get('cdid') == 0)) {
                Ext.MessageBox.alert('注意！', '请输入商品入库资料有误，请重进行商品选择！');
                return false;
            }

        jkdmx['bzid'] = p.get('bzid');
        jkdmx['bzmc'] = p.get('bzmc');
        jkdmx['cdmc'] = p.get('cdmc');
        jkdmx['cdid'] = p.get('cdid');
        jkdmx['cpid'] = p.get('cpid');
        jkdmx['cpmc'] = p.get('cpmc');

        jkdmx['mints'] = p.get('mints');
        jkdmx['cpgg'] = p.get('cpgg');

        jkdmx['sldw'] = p.get('sldw');
        jkdmx['zldw'] = p.get('zldw');
        jkdmx['jldw'] = p.get('jldw');
        jkdmx['rate'] = p.get('rate');
        jkdmx['czdj'] = p.get('czdj');
        jkdmx['phdj'] = p.get('phdj');
        jkdmx['zljs'] = p.get('zljs');
        jkdmx['bydj'] = p.get('bydj');

        jkdmx['mxdh'] = p.get('mxdh');
        jkdmx['jkdh'] = p.get('jkdh');

        if ((jkdmx['mints'] == '') || (jkdmx['mints'] == undefined)) jkdmx['mints'] = 0;
        if (!p.get('mxdh')) {
            jkdmx['mxdh'] = generateGUID();
        }
        var arraycw = [];
        var arrayje = [];
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw').getStore();
        cpjkdcw_store.sync();
        var ret = 0;

        var i = 0, sumsl = 0, sumzl = 0,recs=0;
    //    if (cpjkdcw_store.getCount() == 0) {
     //       Ext.MessageBox.alert('注意！', '输入仓位商品的入库数量及重量！');

       //     return false;
       // }

        cpjkdcw_store.each(function (rec) {
            //console.log(rec.data);
            if ((rec.data.sl == 0) && (rec.data.zl == 0)) {

              //  ret = 1;

              //  return false;
            }
            else {
                i++;
                arraycw.push(rec.data);
                recs=recs+1;
                sumsl = sumsl + rec.data.sl;
                sumzl = sumzl + rec.data.zl;
            }
        })
        if (recs==0) {
            Ext.MessageBox.alert('注意！', '输入仓位商品的入库数量及重量！');
            return false;
        }


        jkdmx['jcsl'] = sumsl;
        jkdmx['jczl'] = sumzl;

        if (i > 0) {
            jkdmx['cpjkdcw'] = arraycw;
        }
        var cpjkdje_store = this.lookupReference('cpjkdmxje').getStore();
        cpjkdje_store.sync();
        i = 0;
        sumzl = 0;
        var sumxjje = 0;
        cpjkdje_store.each(function (rec) {
            if (rec.data.je != 0) {

                arrayje.push(rec.data);
                sumzl = sumzl + rec.data.je;
                if (rec.data.xjbz) {
                    sumxjje = sumxjje + rec.data.je;
                }
            }
        })
        jkdmx['jcje'] = sumzl;
        jkdmx['xjje'] = sumxjje;
        if (i > 0) {
            jkdmx['cpjkdje'] = arrayje;
        }
        var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
        if (isEdit) {
            var r = that.editrecordID;
            //   console.log(r);
            var rec = cpjkdmx_store.getById(r);
            rec.set('cpgg', jkdmx['cpgg']);
            rec.set('cdid', jkdmx['cdid']);
            rec.set('cdmc', jkdmx['cdmc']);
            rec.set('cpid', jkdmx['cpid']);
            rec.set('cpmc', jkdmx['cpmc']);
            rec.set('bzid', jkdmx['bzid']);
            rec.set('bzmc', jkdmx['bzmc']);
            rec.set('mints', jkdmx['mints']);
            rec.set('jcsl', jkdmx['jcsl']);
            rec.set('jczl', jkdmx['jczl']);
            rec.set('rate', jkdmx['rate']);
            rec.set('czdj', jkdmx['czdj']);
            rec.set('phdj', jkdmx['phdj']);
            rec.set('sldw', jkdmx['sldw']);
            rec.set('zldw', jkdmx['zldw']);
            rec.set('zljs', jkdmx['zljs']);
            rec.set('bydj', jkdmx['bydj']);
            rec.set('jcje', jkdmx['jcje']);
            rec.set('xjje', jkdmx['xjje']);
            rec.set('jkdh', jkdmx['jkdh']);
            rec.set('mxdh', jkdmx['mxdh']);
        } else {
            cpjkdmx_store.add(jkdmx);
        }

        cpjkdmx_store.sync();
        this.getView().down("#cpjkdmxedit").close();

        return;
    },
    onCpjkdmxDeleteClick: function () {
        var cpjkdcw_store = this.lookupReference('cpjkdmxcw').getStore();
        var cpjkdje_store = this.lookupReference('cpjkdmxje').getStore();
        var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();

        var p = this.lookupReference('popupcpjkWindow').getViewModel();

        var win = this.getView().down("#cpjkdmxedit");
        var mxdh = p.get('mxdh');
        var jkdh = p.get('jkdh');
        var msg = "商品名称：" + p.get('cpmc') + "<br>产地名称：" + p.get('cdmc') + "<br>包装规格：" + p.get('bzmc') + "<br>入库数量：" + p.get('jcsl');

        var abc = Ext.Msg.confirm('真的删除此货物入库内容？', msg, function (e) {
            if (e == 'yes') {
                cpjkdje_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpjkdcw_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpjkdje_store.removeAll();
                cpjkdje_store.sync();
                cpjkdcw_store.removeAll();
                cpjkdcw_store.sync();
                cpjkdmx_store.each(function (rec) {
                    if (rec) {
                        if (rec.get('mxdh') == mxdh) {
                            cpjkdmx_store.remove(rec);
                        }
                    }
                })

                cpjkdmx_store.sync();
                //cpjkdmx_store.load();
                win.close();
            }
        }
        );
    },
    DeletecpjkdAll: function (cpjkdmx_store, cpjkdcw_store, cpjkdje_store, jkdh) {

        cpjkdje_store.clearFilter();
        cpjkdcw_store.clearFilter();
        cpjkdmx_store.clearFilter();
        cpjkdje_store.removeAll();
        cpjkdje_store.sync();
        cpjkdcw_store.removeAll();
        cpjkdcw_store.sync();
        cpjkdmx_store.removeAll();
        cpjkdmx_store.sync();
        /*
        cpjkdmx_store.filter(
            { filterFn: function (item) { return item.get("jkdh") == jkdh; } }
        );
        cpjkdmx_store.each(function (recmx) {
            if (recmx.get('jkdh') == jkdh) {
                mxdh = recmx.get('mxdh');
                cpjkdje_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpjkdcw_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpjkdje_store.removeAll();
                cpjkdje_store.sync();
                cpjkdcw_store.removeAll();
                cpjkdcw_store.sync();
            }
        })
        cpjkdmx_store.removeAll();
        cpjkdmx_store.sync();

        cpjkd_store.filter(
            { filterFn: function (item) { return item.get("jkdh") == jkdh; } }
        );
        cpjkd_store.removeAll();

        cpjkd_store.sync();*/
    },
    DeletecpjkdAll0: function () {
       // console.log('DeletecpjkdAll0');
      //  var cpjkdcw_store = this.lookupReference('cpjkdmxcw').getStore();
     //   var cpjkdje_store = this.lookupReference('cpjkdmxje').getStore();
      //  var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
      //  cpjkdje_store.clearFilter();
     //   cpjkdcw_store.clearFilter();
     //   cpjkdmx_store.clearFilter();
      //   cpjkdje_store.removeAll();
     //    cpjkdje_store.sync();
      //   cpjkdcw_store.removeAll();
      //   cpjkdcw_store.sync();
      //   cpjkdmx_store.removeAll();
      //   cpjkdmx_store.sync();
    },
    onCpjkdFormSubmit: function () {

        var dialog = this.dialog,
            form = this.lookupReference('windowForm'),
            isEdit = this.isEdit,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false;
        }


        
 
        
        var cpjkdmx_store = this.lookupReference('CpjkdmxGrid').getStore();
        if (cpjkdmx_store.getCount() == 0) {
            Ext.MessageBox.alert('注意！', '请输入商品入库明细数据！');
            return false;
        }


        var p = this.lookupReference('jkdpopupWindow').getViewModel();
        var mxdh = p.get('mxdh');
       var rq=Ext.decode(Ext.encode(p.get('czrq')));
        //console.log(czrq,sys_option_min_date);
        if (rq<sys_option_min_date) {
            Ext.MessageBox.alert('注意！', '输入入库日期不能小于：'+sys_option_min_date);
            return false
        }
    
    
        //return ;


        var khid = p.get('khid');
        //console.log(p);
        var index = cpjkd_store.find('khid', khid);

        var rec = cpjkd_store.getAt(index);

        if (sys_location_areas>1) {
            if ((p.get('area')=="")||(p.get('area')==null)) {
                Ext.MessageBox.alert('注意！', '请选择分区！');
                return false;
            }
            rec.set('area', p.get('area'));
        }
        else
        {
            rec.set('area', '');
        }

        rec.set('czy', sys_userInfo.username);
        rec.set('cnote', p.get('cnote'));

        rec.set('sfdh', p.get('sfdh'));
        rec.set('cphm', p.get('cphm'));
        rec.set('sfr', p.get('sfr'));

        



        cpjkd_store.sync();
        //  console.log('rece', rec.data);

        var cpjkd = rec.data;
         jkdh = rec.get("jkdh");
        cpjkd['czrq'] = Ext.decode(Ext.encode(p.get('czrq')));
        cpjkd['jkrq'] = Ext.decode(Ext.encode(p.get('jkrq')));

        //     console.log(cpjkd['czrq'], Ext.encode(p.get('czrq')));


        var cpjkdcw_store = this.lookupReference('cpjkdmxcw0').getStore();
        //if (cpjkdcw_store.getCount() == 0) {
        //    Ext.MessageBox.alert('注意！', '请输入商品入库仓位明细数量及重量！!');
        //    return false;

        //}
        var cpjkdje_store = this.lookupReference('cpjkdmxje0').getStore();
        //cpjkdje_store.sync();
        cpjkdje_store.clearFilter();
        var sumjesl=0;


        var s=0;


        var i = 0;
        var arraymx = [];
        var arraycw = [];
        var arrayje = [];
        var recmx0;
        cpjkdcw_store.clearFilter();
     //   cpjkdmx_store.clearFilter();
        cpjkdmx_store.load();
        cpjkdcw_store.load();
        cpjkdje_store.load();

        cpjkdje_store.each(function (recje) {
        
        if (recje.get('jkdh') == jkdh) {
            if (recje.get('sl')!=0){
               sumjesl=sumjesl+recje.get('sl');
            }
        }

        })

//console.log(sumjesl);



        var ret = 0;
        var sumsl = 0, sumzl = 0, sumje = 0;
        var recs = 0;
      //  console.log("jkmx",cpjkdmx_store)  ; 
      cpjkdmx_store.each(function (recmx) {
      //  console.log("jkmx",recmx)  ; 
      if (recmx.get('jcsl')>0)
      {
            mxdh = recmx.get('mxdh');
            console.log("jkmx",recmx.data)  ; 
            if ((recmx.get('cdid') == 0) || (recmx.get('cpid') == 0) || (recmx.get('bzid') == 0)) {
                Ext.MessageBox.alert('注意！', '请输入商品入库资料有误，请重进行商品选择！');
                return false;
            }
           
            if ((recmx.get('jcsl') == 0) && (recmx.get('jczl') == 0)) {
                Ext.MessageBox.alert('注意！', '请输入商品入库数量及重量！');

                return false;


            }
            arraycw = [];
            cpjkdcw_store.each(function (reccw) {
                if (reccw.get('mxdh') == mxdh) {
                    //console.log("cwmx",reccw.data)  ;
                    if ((reccw.get('sl') == 0) && (reccw.get('zl') == 0)) {
                     //   Ext.MessageBox.alert('注意！', '请输入商品入库明细数量及重量！');
                      //  ret = 1;
                      //  return false;

                    }
                    else {
                        arraycw.push(reccw.data);
                        sumsl = sumsl + reccw.get('sl');
                        sumzl = sumzl + reccw.get('zl');
                        recs = recs + 1;
                    }
                }
            })
            recmx0 = recmx.data;
            if ((recmx0['mints'] == '') || (recmx0['mints'] == undefined)) recmx0['mints'] = 0;
          // console.log('cpjkdcw',arraycw);
            recmx0['cpjkdcw'] = arraycw;
            arrayje = [];
            cpjkdje_store.each(function (recje) {
                if ((recje.get('mxdh') == mxdh) && (recje.get('je') != 0)) {
                    if ((sumjesl<1) && (s==0) && (recje.get('zljs')) ) {  //重不够吨按一吨计
                        recje.data.sl=recje.data.sl+(1-sumjesl);
                        recje.data.je=Math.ceil(recje.data.dj*recje.data.sl);
                        s=1;
                    }
                    arrayje.push(recje.data);
                    sumje = sumje + recje.get('je');
                }
            })
            recmx0['cpjkdje'] = arrayje;
            arraymx.push(recmx0);
        }
        })
       // if (ret == 1) {
        //    Ext.MessageBox.alert('注意！', '请输入商品入库明细数量及重量！!');
       //     return false;
       // }
        if (recs == 0) {
            Ext.MessageBox.alert('注意！', '请输入商品入库仓位明细数量及重量！!');
            return false;

        }

        cpjkd['cpjkdmx'] = arraymx;
      //  console.log('jkd', cpjkd);
      //  return;
        var str = obj2str(cpjkd);
        var encodedString = base64encode(Ext.encode(str));
        var that = this;
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'cpjkdmxsave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                data: encodedString
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                    // PrintCpjkdJkid(result.jkid);
                    //console.log('jkdh=', result.dh);
                    //Ext.toast.msg("提示",'进库单已保存，单号是：'+result.jkdh);
                    Ext.MessageBox.alert('提示', '进库单已保存，单号是：' + result.dh);

                    that.DeletecpjkdAll(cpjkdmx_store, cpjkdcw_store, cpjkdje_store, jkdh);
                    that.getView().down("#cpjkdedit").close();
                }
                else {
                    Ext.MessageBox.alert('错误!', result.msg);
                }
            },
            failure: function () {
                Ext.MessageBox.alert('错误!', '发生错误！');
            }
        });
    
    }

});

