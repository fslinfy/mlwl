var that;
var khid = 0;
var cpgfd_store;

var gfdworkCallBack = function (node) {
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

    if ((sl < 1) && (sl > 0)) {
        sl = 1;
    }
    var cpgfdmxje = that.lookupReference('cpgfdmxje').getStore();
    cpgfdmxje.add({
        dw: dw,
        mxdh: mxdh,
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
    sumjs(null, cpgfdmxje, p.getViewModel());


}
var packingCallBack = function (node) {
    console.log('packing------CallBack', node);
    //var p= this.lookupReference('popupcpgfWindow');

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

Ext.define('MyApp.view.main.cpgfkdgl.CpgfdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpgfdCtrl',
    requires: [
        

         'MyApp.view.main.DataSave'
        , 'MyApp.view.main.report.PrintCpgfd'
     


    ],
    onBtnQueryClick: function (button, e, options) {
        var store=this.getView().getStore()
        store.proxy.extraParams.act='wxCpgfdlist_pc';
        store.load();
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
        var grid = Ext.getCmp('CpgfdGrid');
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
        var win = this.lookupReference('gfdpopupWindow');
        win.close()
        return false;
    },
    init: function () {
        that = this;
        //console.log("init");
        //console.log(base64encode('8888'));


        cpgfd_store = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            alias: 'store.CpgfdStore',
            model: 'MyApp.model.CpgfdModel',
            autoLoad: true,
            proxy: {
                type: 'localstorage',
                id: 'CpgfdModel'
            }
        });

        // console.log("init  0");


        /*  cpgfd_store = Ext.create('Ext.data.Store', {
              extend: 'Ext.data.Store',
              alias: 'store.CpgfdStore',
              model: 'MyApp.model.CpgfdModel',
              //itemId: "CpgfdStore",
             // autoLoad: true,
              proxy: {
                  type: 'localstorage',
                  id: 'CpgfdModel'
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
            "#btnQueryBzmc": {
                click: this.onSelectBzbmView
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



    onEditCpgfdmxClick: function (button) {
        this.createDialog(button.getWidgetRecord());
    },

    onshowEditView: function (button) {
        var rec = button.getWidgetRecord();
        // console.log("area",sys_location_area);
        khid = rec.data.C_id;
        var khmc = rec.data.C_name;
        cpgfd_store.clearFilter();
        var index = cpgfd_store.find('khid', khid);
        var record = cpgfd_store.getAt(index);
        if (!record) {
            cpgfd_store.add(
                {
                    gfdh: generateGUID(),
                    czrq: new Date(),
                    gfrq: new Date(),
                    khid: khid,
                    khmc: khmc,
                    area: sys_location_area,
                    cnote: '',
                    gfdh: '',
                    cphm: '',
                    sfr: '',
                    shr: ''
                }
            )
            cpgfd_store.sync();
            index = cpgfd_store.find('khid', khid);
            record = cpgfd_store.getAt(index);

        }
        record = record.data;
        if ((record['gfdh'] == '') || (!record['gfdh'])) {
            record['gfdh'] = generateGUID();
        }
        record['czrq'] = new Date();
        record['gfrq'] = new Date();
        record['sfr'] = '';
        //  record['sfdh'] = '';
        record['cphm'] = '';
        record['czy'] = sys_userInfo.username;
        var gfdh = record['gfdh'];
        var view = that.getView();
        that.isEdit = false;// !!record;
        that.dialog = view.add({
            xtype: 'formgfdwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        that.dialog.show();
        //console.log("this=",this,that);
        var cpgfdmx = that.lookupReference('CpgfdmxGrid').getStore();
        cpgfdmx.filter(
            { filterFn: function (item) { return item.get("gfdh") == gfdh; } }
        );

        var cpgfdcw_store = that.lookupReference('cpgfdmxcw0').getStore();
    },

    createDialog: function (record, gfdh) {
        var view = this.getView();
        system_khid = khid;
        current_newid = khid;
        this.isEdit_mx = !!record;
        if (!this.isEdit_mx) {
            record = {};

            this.editrecordID = 0;
            record['newrecord'] = true;
            record['mints'] = 1;
            record['gfdh'] = gfdh;
            record['khid'] = khid;
            record['mxdh'] = generateGUID();
            record['sfr'] = '';

            record['cphm'] = '';
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
        record['title'] = '过车商品明细录入';
        this.dialog_mx = view.add({
            xtype: 'formcpgfwindow',
            viewModel: {
                data: record
            },
            session: true
        });
        var mxdh = record['mxdh'];
        var cpgfdmxcw = this.lookupReference('cpgfdmxcw').getStore();
        cpgfdmxcw.filter(
            { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
        );
        var cpgfdmxje = this.lookupReference('cpgfdmxje').getStore();
        cpgfdmxje.filter(
            { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
        );

        this.dialog_mx.show();


    },

    onEditCpgfdmxClick: function (button) {
        this.createDialog(button.getWidgetRecord().data, null);
    },


    onshowmxEditView: function (record) {
        var p = this.lookupReference('gfdpopupWindow').getViewModel();
        this.createDialog(null, p.get('gfdh'));
    },

    onSelectCdbmView: function (record) {
        // console.log('onSelectCdbmView');
        treeSelect('cdmc', that, '', that.getView().down('#cpgfdmxedit'), false);

        return false;
    },
    onSelectBzbmView: function (record) {
        // console.log('onSelectCdbmView');
        treeSelect('bzmc', that, '', that.getView().down('#cpgfdmxedit'), false);
        return false;
    },

    onSelectCpbmView: function (record) {
        treeSelect('cpmc', that, '', that.getView().down('#cpgfdmxedit'), false);
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
    onWorkerSelectCanelClick: function () {

        this.getView().down("#selectWorkerWindow").close();
    },

    onRemoveCpgfdcwClick: function (button) {
        var store = this.lookupReference('cpgfdmxcw').getStore();
        store.remove(button.getWidgetRecord());
    },
    onRemoveCpgfdjeClick: function (button) {
        var store = this.lookupReference('cpgfdmxje').getStore();
        store.remove(button.getWidgetRecord());
    },

    onRemoveCpgfdmxClick: function (button) {
        var cpgfdmxGrid = this.lookupReference('CpgfdmxGrid');
        var store = cpgfdmxGrid.getStore();
        var selection = cpgfdmxGrid.getSelectionModel().getSelection()[0];
        selection.set('phdj', 15.9);


    },
    onCpgfdcwDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpgfdmxcw'),
            selection = customerGrid.getSelectionModel().getSelection()[0];

        var msg = "仓位：" + selection.get('cw') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>重量：" + selection.get('zl');
        var abc = Ext.Msg.confirm('真的删除仓位内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupcpgfWindow').getViewModel();
                var store = customerGrid.getStore();
                sumjs(store, null, panel);
            }
        }
        );



    },

    onCpgfdjeDeleteClick: function (button) {

        var customerGrid = this.lookupReference('cpgfdmxje'),
            selection = customerGrid.getSelectionModel().getSelection()[0];
        var msg = "费用项目：" + selection.get('work') + "<br>数量：" + selection.get('sl') + "<br>单位：" + selection.get('dw') + "<br>单价：" + selection.get('dj') + "<br>金额:" + selection.get('je');
        var abc = Ext.Msg.confirm('真的删除费用内容？', msg, function (e) {
            if (e == 'yes') {
                selection.drop();
                var panel = that.lookupReference('popupcpgfWindow').getViewModel();
                var store = customerGrid.getStore();
                sumjs(null, store, panel);
            }
        }
        );


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
        // Ext.MessageBox.alert('注意！', '请输入商品过车明细数据！11111111111111111111');
        // console.log('注意！', '请输入商品过车明细数据！11111111111111111111');
        //     return false;
        // 、、if (form.isValid()) {
        var rec = form.getValues();


        var gfdmx = {};

        var p = this.lookupReference('popupcpgfWindow').getViewModel();
        if ((p.get('bzid') == 0) || (p.get('cpid') == 0) || (p.get('cdid') == 0)) {
            Ext.MessageBox.alert('注意！', '请输入商品过车资料有误，请重进行商品选择！');
            return false;
        }

        gfdmx['bzid'] = p.get('bzid');
        gfdmx['bzmc'] = p.get('bzmc');
        gfdmx['cdmc'] = p.get('cdmc');
        gfdmx['cdid'] = p.get('cdid');
        gfdmx['cpid'] = p.get('cpid');
        gfdmx['cpmc'] = p.get('cpmc');

        gfdmx['mints'] = p.get('mints');
        gfdmx['cpgg'] = p.get('cpgg');

        gfdmx['sldw'] = p.get('sldw');
        gfdmx['zldw'] = p.get('zldw');
        gfdmx['jldw'] = p.get('jldw');
        gfdmx['rate'] = p.get('rate');
        gfdmx['czdj'] = p.get('czdj');
        gfdmx['phdj'] = p.get('phdj');
        gfdmx['zljs'] = p.get('zljs');
        gfdmx['bydj'] = p.get('bydj');

        gfdmx['mxdh'] = p.get('mxdh');
        gfdmx['gfdh'] = p.get('gfdh');

        if ((gfdmx['mints'] == '') || (gfdmx['mints'] == undefined)) gfdmx['mints'] = 0;
        if (!p.get('mxdh')) {
            gfdmx['mxdh'] = generateGUID();
        }
        var arraycw = [];
        var arrayje = [];
        var cpgfdcw_store = this.lookupReference('cpgfdmxcw').getStore();
        cpgfdcw_store.sync();
        var ret = 0;

        var i = 0, sumsl = 0, sumzl = 0, recs = 0;
        if (cpgfdcw_store.getCount() == 0) {
            Ext.MessageBox.alert('注意！', '输入仓位商品的过车数量及重量！');

            return false;
        }

        cpgfdcw_store.each(function (rec) {
            if ((rec.data.sl == 0) && (rec.data.zl == 0)) {

                //  ret = 1;

                //  return false;
            }
            else {
                i++;
                arraycw.push(rec.data);
                recs = recs + 1;
                sumsl = sumsl + rec.data.sl;
                sumzl = sumzl + rec.data.zl;
            }
        })
        if (recs == 0) {
            Ext.MessageBox.alert('注意！', '输入仓位商品的过车数量及重量！');
            return false;
        }












        gfdmx['jcsl'] = sumsl;
        gfdmx['jczl'] = sumzl;

        if (i > 0) {
            gfdmx['cpgfdcw'] = arraycw;
        }
        var cpgfdje_store = this.lookupReference('cpgfdmxje').getStore();
        cpgfdje_store.sync();
        i = 0;
        sumzl = 0;
        var sumxjje = 0;
        cpgfdje_store.each(function (rec) {
            if (rec.data.je != 0) {

                arrayje.push(rec.data);
                sumzl = sumzl + rec.data.je;
                if (rec.data.xjbz) {
                    sumxjje = sumxjje + rec.data.je;
                }
            }
        })
        gfdmx['jcje'] = sumzl;
        gfdmx['xjje'] = sumxjje;
        if (i > 0) {
            gfdmx['cpgfdje'] = arrayje;
        }
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
        if (isEdit) {
            var r = that.editrecordID;
            //   console.log(r);
            var rec = cpgfdmx_store.getById(r);
            rec.set('cpgg', gfdmx['cpgg']);
            rec.set('cdid', gfdmx['cdid']);
            rec.set('cdmc', gfdmx['cdmc']);
            rec.set('cpid', gfdmx['cpid']);
            rec.set('cpmc', gfdmx['cpmc']);
            rec.set('bzid', gfdmx['bzid']);
            rec.set('bzmc', gfdmx['bzmc']);
            rec.set('mints', gfdmx['mints']);
            rec.set('jcsl', gfdmx['jcsl']);
            rec.set('jczl', gfdmx['jczl']);
            rec.set('rate', gfdmx['rate']);
            rec.set('czdj', gfdmx['czdj']);
            rec.set('phdj', gfdmx['phdj']);
            rec.set('sldw', gfdmx['sldw']);
            rec.set('zldw', gfdmx['zldw']);
            rec.set('zljs', gfdmx['zljs']);
            rec.set('bydj', gfdmx['bydj']);
            rec.set('jcje', gfdmx['jcje']);
            rec.set('xjje', gfdmx['xjje']);
            rec.set('gfdh', gfdmx['gfdh']);
            rec.set('mxdh', gfdmx['mxdh']);
        } else {
            cpgfdmx_store.add(gfdmx);
        }

        cpgfdmx_store.sync();
        this.getView().down("#cpgfdmxedit").close();

        return;
    },
    onCpgfdmxDeleteClick: function () {






        var cpgfdcw_store = this.lookupReference('cpgfdmxcw').getStore();
        var cpgfdje_store = this.lookupReference('cpgfdmxje').getStore();
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();

        var p = this.lookupReference('popupcpgfWindow').getViewModel();

        var win = this.getView().down("#cpgfdmxedit");
        var mxdh = p.get('mxdh');
        var gfdh = p.get('gfdh');
        var msg = "商品名称：" + p.get('cpmc') + "<br>产地名称：" + p.get('cdmc') + "<br>包装规格：" + p.get('bzmc') + "<br>过车数量：" + p.get('jcsl');

        var abc = Ext.Msg.confirm('真的删除此货物过车内容？', msg, function (e) {
            if (e == 'yes') {
                cpgfdje_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpgfdcw_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpgfdje_store.removeAll();
                cpgfdje_store.sync();
                cpgfdcw_store.removeAll();
                cpgfdcw_store.sync();
                cpgfdmx_store.each(function (rec) {
                    if (rec) {
                        if (rec.get('mxdh') == mxdh) {
                            cpgfdmx_store.remove(rec);
                        }
                    }
                })

                cpgfdmx_store.sync();
                //cpgfdmx_store.load();
                win.close();
            }
        }
        );
    },
    DeletecpgfdAll: function (cpgfdmx_store, cpgfdcw_store, cpgfdje_store, gfdh) {
        cpgfdmx_store.filter(
            { filterFn: function (item) { return item.get("gfdh") == gfdh; } }
        );
        cpgfdmx_store.each(function (recmx) {
            if (recmx.get('gfdh') == gfdh) {
                mxdh = recmx.get('mxdh');
                cpgfdje_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpgfdcw_store.filter(
                    { filterFn: function (item) { return item.get("mxdh") == mxdh; } }
                );
                cpgfdje_store.removeAll();
                cpgfdje_store.sync();
                cpgfdcw_store.removeAll();
                cpgfdcw_store.sync();
            }
        })
        cpgfdmx_store.removeAll();
        cpgfdmx_store.sync();

        //cpgfd_store.filter(
        //    { filterFn: function (item) { return item.get("gfdh") == gfdh; } }
        //);
        cpgfd_store.clearFilter();
        cpgfd_store.removeAll();

        cpgfd_store.sync();
    },

    onCpgfdFormSubmit: function () {

        var dialog = this.dialog,
            form = this.lookupReference('windowForm'),
            isEdit = this.isEdit,
            id;
        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false;
        }
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
        if (cpgfdmx_store.getCount() == 0) {
            Ext.MessageBox.alert('注意！', '请输入商品过车明细数据！');
            return false;
        }


        var p = this.lookupReference('gfdpopupWindow').getViewModel();
        var khid = p.get('khid');
        //console.log(p);
        var index = cpgfd_store.find('khid', khid);

        var rec = cpgfd_store.getAt(index);

  


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

        
        cpgfd_store.sync();
        //  console.log('rece', rec.data);

        var cpgfd = rec.data;
        var gfdh = rec.get("gfdh");
        cpgfd['czrq'] = Ext.decode(Ext.encode(p.get('czrq')));
        cpgfd['gfrq'] = Ext.decode(Ext.encode(p.get('gfrq')));

        //     console.log(cpgfd['czrq'], Ext.encode(p.get('czrq')));


        var cpgfdcw_store = this.lookupReference('cpgfdmxcw0').getStore();
        if (cpgfdcw_store.getCount() == 0) {
            Ext.MessageBox.alert('注意！', '请输入商品过车仓位明细数量及重量！!');
            return false;

        }
        var cpgfdje_store = this.lookupReference('cpgfdmxje0').getStore();

        var i = 0, mxdh = '';
        var arraymx = [];
        var arraycw = [];
        var arrayje = [];
        var recmx0;
        cpgfdcw_store.clearFilter();
        cpgfdje_store.clearFilter();
        cpgfdcw_store.load();
        cpgfdje_store.load();
        var ret = 0;
        var sumsl = 0, sumzl = 0, sumje = 0;
        var recs = 0;
        cpgfdmx_store.each(function (recmx) {
            mxdh = recmx.get('mxdh');

            if ((recmx.get('cdid') == 0) || (recmx.get('cpid') == 0) || (recmx.get('bzid') == 0)) {
                Ext.MessageBox.alert('注意！', '请输入商品过车资料有误，请重进行商品选择！');
                return false;
            }

            if ((recmx.get('jcsl') == 0) && (recmx.get('jczl') == 0)) {
                Ext.MessageBox.alert('注意！', '请输入商品过车数量及重量！');

                return false;


            }
            arraycw = [];
            cpgfdcw_store.each(function (reccw) {
                if (reccw.get('mxdh') == mxdh) {
                    if ((reccw.get('khsl') == 0) && (reccw.get('khzl') == 0)) {
                        //   Ext.MessageBox.alert('注意！', '请输入商品过车明细数量及重量！');
                        //  ret = 1;
                        //  return false;

                    }
                    else {
                        arraycw.push(reccw.data);
                        sumsl = sumsl + reccw.get('khsl');
                        sumzl = sumzl + reccw.get('khzl');
                        recs = recs + 1;
                    }
                }
            })
            recmx0 = recmx.data;
            if ((recmx0['mints'] == '') || (recmx0['mints'] == undefined)) recmx0['mints'] = 0;
            //console.log(recmx0);
            recmx0['cpgfdcw'] = arraycw;
            arrayje = [];
            cpgfdje_store.each(function (recje) {
                if ((recje.get('mxdh') == mxdh) && (recje.get('je') != 0)) {
                    arrayje.push(recje.data);
                    sumje = sumje + recje.get('je');
                }
            })



            recmx0['cpgfdje'] = arrayje;
            arraymx.push(recmx0);
        })
        // if (ret == 1) {
        //    Ext.MessageBox.alert('注意！', '请输入商品过车明细数量及重量！!');
        //     return false;
        // }
        if (recs == 0) {
            Ext.MessageBox.alert('注意！', '请输入商品过车仓位明细数量及重量！!');
            return false;
        }


        Ext.MessageBox.show({
            title: "注意！",
            msg: "请选择装卸作业费用付款方式",
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: "司机付现金",
                no: "月度结账"
            },
            icon: Ext.MessageBox["WARNING"],
            scope: this,
            fn: function (btn, text) {

                
                if ((btn == "yes") || (btn == "no")) {


                

                    var xjbz = 0;
                    if (btn == "yes") xjbz = 1;



                 


                    cpgfd['xjbz'] = xjbz;
                    if (sys_customer_id > 0) {
                        cpgfd['khkd'] = 1;
                    }
                    else {
                        cpgfd['khkd'] = 0;
                    }



        cpgfd['cpgfdmx'] = arraymx;
        var str = obj2str(cpgfd);
        var encodedString = base64encode(Ext.encode(str));
        var that = this;
        Ext.Ajax.request({
            method: 'GET',
            url: sys_ActionPHP,
            params: {
                act: 'cpgfdmxsave',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                data: encodedString
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.result == 'success') {
                    // PrintCpgfdJkid(result.gfid);
                    //console.log('gfdh=', result.dh);
                    //Ext.toast.msg("提示",'进库单已保存，单号是：'+result.gfdh);
                    Ext.MessageBox.alert('提示', '过车单已保存，单号是：' + result.dh);

                    that.DeletecpgfdAll(cpgfdmx_store, cpgfdcw_store, cpgfdje_store, gfdh);
                    that.getView().down("#cpgfdedit").close();
                }
                else {
                    Ext.MessageBox.alert('错误!',result.msg);
                }
            },
            failure: function () {
                Ext.MessageBox.alert('错误!', '发生错误！');
            }
        });
    }}})
    },

    sumje: function () {
     //   console.log(           "sumje"        );
        var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
        var p = this.lookupReference('gfdpopupWindow').getViewModel();
        p.set('khsl') = cpgfdmx_store.sum("khsl");
        p.set('khzl') = cpgfdmx_store.sum("khzl");
        p.set('je') = cpgfdmx_store.sum("je");
    //    console.log( p.get('sl'), p.get('zl'), p.get('je'))
        if (p.get('xjbz')) {
            p.set('xjje') = cpgfdmx_store.sum("je");

        }else
        {
            p.set('xjje') =0;
        }


    }

});

