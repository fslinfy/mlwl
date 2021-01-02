Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdCtrlFunction', {
    extend: 'Ext.Mixin'
});

function SelectWorkerView(button) {
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
};

function WorkerSelectOkClick() {
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
        // names.push(rec.get('text'));
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
        // names.push(rec.get('text'));
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
};


function SelectKhbmView(record) {
    treeSelect('khmc', that, '', that.viewname, true);
    return false;
};



function SelectCkbmView(record) {
    treeSelect('ckmc', that, '', that.viewname, true);
    return false;
};

function onCpgfdmxShEdit(button) {
    var rec = button.getWidgetRecord();
    var gfid = rec.data.gfid;
    var record = rec.data;
    console.log(record);
    record['op'] = 'cksh';
    record['gsop'] = false;
    record["w"] = 40;
    record['btnButtonHidden'] = false;
    record['title'] = '商品过车数据补录入';
    var view = this.getView();
    this.isEdit = false;// !!record;
    this.dialog = view.add({
        xtype: 'gfdformmxwindow',
        viewModel: {
            data: record
        },
        session: true
    });

    this.dialog.show();


    /*var cpgfdmx_store = this.lookupReference('CpgfdmxGrid').getStore();
    cpgfdmx_store.proxy.extraParams.gfid = gfid;
    cpgfdmx_store.load();        

    
    var cpgfdcw_store = this.lookupReference('cpgfdmxcw0').getStore();
    cpgfdcw_store.proxy.extraParams.gfid = gfid;
    cpgfdcw_store.proxy.extraParams.loc = 'gfid';
    cpgfdcw_store.load();
    
    this.onGridReload();
    */


};


function onPrintwxCpgfd() {

    var p = that.lookupReference('popupCpgfdWindow').getViewModel();
    if (p.get('ztbz')<'2')
    {
     //console.log('ztbz',p.get('ztbz'),p);
        Ext.MessageBox.alert('注意！', '此过车内容未进行过车业务审核，不能打印！');
        return ;
    }
    PrintCpgfdgfid(p.get('gfid'));
    //Printcpgfdgfid
    //PrintCpgfdgfid(4);
}




