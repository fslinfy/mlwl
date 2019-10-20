sys_DisplayAll = "cpkc";
var that;
var cpkcmxStore;
var cpghdmx_store;
var saveCallBack = function (th) {
    that.locQuery(th);
    th.viewname.down("#cpghdedit").close();
}

var khmcCallBack = function (node) {
    //console.log('onSelectnew KhbmView    khmcCallBack  ' ,node.data );

    var p = that.lookupReference('popupCpghdWindow').getViewModel();
    p.set('newkhid', node.data.id);
    p.set('newkhmc', node.data.text);
}
Ext.define('MyApp.view.main.cpghkdgl.GhdglCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GhdglCtrl',
    requires: [
        'MyApp.view.main.cpghkdgl.GhdglView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        , 'MyApp.view.main.tree.QueryCdmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.DataSave'
        //  , 'MyApp.view.main.report.PrintCpghkd'
    ],
    locQuery: function (th) {
        var selectedData = that.getView().getSelectionModel().getSelection();
        selectedData.forEach(function (rec) {
            that.getView().getSelectionModel().deselect(rec);
        })

        var ckid = th.viewname.getViewModel().get('ckid');
        var khid = th.viewname.getViewModel().get('khid');
        var cdid = th.viewname.getViewModel().get('cdid');
        var cpid = th.viewname.getViewModel().get('cpid');


        var store = th.viewname.getStore();
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;
        store.reload();
        selectedData = that.getView().getSelectionModel().getSelection();
        //        console.log("selected ",selectedData)
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setDisabled(selectedData.length == 0);
        return false;
    },


    onBtnQueryClick: function (button, e, options) {
        var khid = that.viewname.getViewModel().get('khid');
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
        tool.down('#btnNew').setDisabled(false);
        this.locQuery(this);
    },
    onBtnNewClick: function (rs) {
        var selectedData = that.getView().getSelectionModel().getSelection();
        var store = that.liststore;
        var rows = 0;
        var sumsl = 0;
        var sumzl = 0;
        selectedData.forEach(function (rec) {
            if ((rec.data.sl > 0) || (rec.data.zl > 0)) {
                rows++;
                //    console.log("rec", rec.data);
            }

        })

        if (rows == 0) {
            Ext.MessageBox.alert('注意！', '请选择开单商品！');
            return false
        }

        var todaysDate = new Date();

        todaysDate.setDate(todaysDate.getDate() + 2);

        // todaysDate=Ext.Date.add(new Date(), Ext.Date.Day,2); //增加2天  

        todaysDate = new Date(Ext.Date.format(todaysDate, 'Y-m-d'))

        var khid = that.viewname.getViewModel().get('khid');
        var khmc = that.viewname.getViewModel().get('khmc');
        var ckid = that.viewname.getViewModel().get('ckid');
        var ckmc = that.viewname.getViewModel().get('ckmc');
        var record = {};
        record['khid'] = khid;
        record['khmc'] = khmc;
        record['ckid'] = ckid;
        record['ckmc'] = ckmc;
        record['xsrq'] = new Date();
        record['endrq'] = todaysDate;
        record['czy'] = sys_userInfo.username;
        record['cphm'] = '';
        record['sfr'] = '';
        record['cnote'] = '';
        var view = that.viewname;

        that.dialog = view.add({
            xtype: 'formshwindow',
            viewModel: {
                data: record
            },
            session: true
        });


        var cpghdmx = that.lookupReference('CpghdmxGrid').getStore();
        cpghdmx.removeAll();
        cpghdmx.load();
        //cpghdmx_store.each(function (rec) {

        //  if ((rec.data.kd) && (rec.data.kd != 0) && (rec.data.zl != 0)) {

        selectedData.forEach(function (rec) {
            if ((rec.data.sl > 0) || (rec.data.zl > 0)) {
                var record0 = {
                    cdid: rec.data.cdid,
                    cdmc: rec.data.cdmc,
                    cpid: rec.data.cpid,
                    cpmc: rec.data.cpmc,
                    bzid: rec.data.bzid,
                    bzmc: rec.data.bzmc,
                    kcid: rec.data.kcid,
                    cpgg: rec.data.cpgg,
                    cpph: rec.data.cpph,
                    jldw: rec.data.jldw,
                    sl: rec.data.sl,
                    zl: rec.data.zl,
                    xssl: rec.data.sl,
                    xszl: rec.data.zl,
                    ghdj: 0,
                    xsje: 0,
                    sm: ''
                };
                //  console.log("add", record0);
                cpghdmx.add(record0);
            }
        })
        that.dialog.show();
    },

    onBtnHelpClick: function (button, e, options) {
        console.log(" help");
        return false;
    },
    init: function () {
        console.log("sys_location_id", sys_location_id);
        console.log("sys_customer_id", sys_customer_id);
        that = this;
        that.viewname = that.getView();
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setText("过户开单");
        tool.down('#btnNew').setDisabled(true);
        tool.down('#btnNew').setHidden(false);

        if (sys_customer_id > 0) {
            that.viewname.getViewModel().set('khid', sys_customer_id);
            that.viewname.getViewModel().set('khmc', sys_customer_name);
            that.viewname.down('#QueryKhmc').setHidden(true);
            that.viewname.down('#QueryCkmc').setHidden(false);
        } else {
            that.viewname.down('#QueryKhmc').setHidden(false);
            that.viewname.down('#QueryCkmc').setHidden(true);
            if (sys_location_id > 0) {
                that.viewname.getViewModel().set('ckid', sys_location_id);
                that.viewname.getViewModel().set('ckmc', sys_location_name);
                that.viewname.down('#QueryKhmc').setHidden(false);
                that.viewname.down('#QueryCkmc').setHidden(true);
            }
            else {
                that.viewname.down('#QueryKhmc').setHidden(true);
                that.viewname.down('#QueryCkmc').setHidden(false);
            }
        }


        cpkcmxStore = Ext.create('Ext.data.Store', {
            alias: 'store.cpkcmxStore',
            model: 'MyApp.model.CpkcmxModel',
            proxy: {
                type: 'ajax',
                api: {
                    read: sys_ActionPHP + '?act=Cpkcmxlist_pc'
                },
                actionMethods: {
                    read: 'GET'
                },
                extraParams: {
                    userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                    p_l_id: sys_location_id,
                    khid: sys_customer_id
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            }
        });

        cpkcmxStore.on("load", function () {
            that.locQuery();
        });
        if ((sys_customer_id > 0) && (sys_location_id > 0)) {
            that.onBtnQueryClick();
        }
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#btnNew": {
                click: this.onBtnNewClick
            },
            "#FilterField": {
                change: this.onFilterChange
            },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
            },
            "#btnQueryNewKhmc": {
                click: this.onSelectNewKhbmView
            },

            "#btnQueryCkmc": {
                click: this.onSelectCkbmView
            },
            "#btnQueryCdmc": {
                click: this.onSelectCdbmView
            },
            "#CpghdFormSubmit": {
                click: this.onCpghdFormSubmit
            },
            "#btnQueryCpmc": {
                click: this.onSelectCpbmView
            }


        });
        //that.viewname.down("#btnQueryCkmc").setHidden(true);
        //console.log(that.viewname.down("#btnQueryCkmc"))


        var store = that.viewname.getStore();
    },

    onSelectKhbmView: function (record) {
        console.log('onSelectKhbmView');
        treeSelect('khmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    onSelectNewKhbmView: function (record) {
        console.log('onSelectnewKhbmView');
        that.popupmx = that.getView().down('#cpghdmxedit');
        treeSelect('khmc', that, 'cpkc', that.viewname, false, khmcCallBack);
        return false;
    },

    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    onSelectionChange: function (grid, selection) {
        //console.log(selection.getCount()  ); 
        //var tool = that.viewname.down("#QueryToolbarView");

        // tool.down('#btnNew').setDisabled(selection.getCount() == 0);
        selectedData = that.getView().getSelectionModel().getSelection();
        var tool = that.viewname.down("#QueryToolbarView");
        tool.down('#btnNew').setDisabled(selectedData.length == 0);


    },

    onSelectCkbmView: function (record) {
        treeSelect('ckmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    onSelectCdbmView: function (record) {
        treeSelect('cdmc', that, 'cpkc', that.viewname, true);

        return false;
    },
    cdmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },


    onSelectCpbmView: function (record) {
        treeSelect('cpmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },





    onCpghdFormSubmit: function () {
        var dialog = this.dialog,
            form = this.lookupReference('windowForm'),

            isEdit = this.isEdit,
            id;
        var p = this.lookupReference('popupCpghdWindow').getViewModel();

        if (!form.isValid()) {
            Ext.MessageBox.alert('注意！', '输入内容不完整！');
            return false
        }

        var cpghd = form.getValues();
        console.log('cpghd',cpghd);

        if (cpghd["newkhid"]==0) {
            Ext.MessageBox.alert('注意！', '输入选择新客户！');
            return false
        }

       // return ;


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

                //  console.log(btn, text);
                if ((btn == "yes") || (btn == "no")) {


                    that.lookupReference('popupCpghdWindow').down("#CpghdFormSubmit").setHidden(true);


                    var xjbz = 0;
                    if (btn == "yes") xjbz = 1;



                 


                    cpghd['xjbz'] = xjbz;
                    if (sys_customer_id > 0) {
                        cpghd['khkd'] = 1;
                    }
                    else {
                        cpghd['khkd'] = 0;
                    }

                    var cnote = cpghd['cnote'];
                    cpghd['sfr'] = cpghd['sfr'].replace("\n", "");
                    cpghd['cphm'] = cpghd['cphm'].replace("\n", "");
                    cpghd['sfr'] = cpghd['sfr'].replace('"', " ");
                    cpghd['cphm'] = cpghd['cphm'].replace('"', " ");


                    //cnote=cnote.replace('"'," ");
                    //cnote=cnote.replace('"'," ");

                    while (cnote.indexOf('"') > 0) {
                        cnote = cnote.replace('"', " ");

                    }
                    //  console.log("cnote=", cnote,cnote.indexOf("\n"));


                    if (cnote.indexOf("\n") > 0) {
                        cnote = '!' + bade64_encode(cnote) + "~";
                        cpghd['cnote'] = cnote;
                    }
                    //  console.log("cnote=", cnote);
                    //  return ;







                    cpghd['xsrq'] = Ext.decode(Ext.encode(p.get('xsrq')));
                    cpghd['endrq'] = Ext.decode(Ext.encode(p.get('endrq')));
                    cpghd['czy'] = sys_userInfo.username;
                    cpghdmx_store = this.lookupReference('CpghdmxGrid').getStore();
                    var arraymx = [];
                    var mxrec = {};
                    cpghdmx_store.each(function (recmx) {
                        mxrec = {};
                        mxrec['cdid'] = recmx.data.cdid;
                        mxrec['cdmc'] = recmx.data.cdmc;
                        mxrec['cpid'] = recmx.data.cpid;
                        mxrec['cpmc'] = recmx.data.cpmc;
                        mxrec['bzid'] = recmx.data.bzid;
                        mxrec['bzmc'] = recmx.data.bzmc;
                        mxrec['cpgg'] = recmx.data.cpgg;
                        mxrec['cpph'] = recmx.data.cpph;
                        mxrec['jldw'] = recmx.data.jldw;
                        mxrec['xssl'] = recmx.data.xssl;
                        mxrec['xszl'] = recmx.data.xszl;
                        // mxrec['ghdj'] = recmx.data.ghdj;
                        // mxrec['xsje'] = recmx.data.xsje;
                        mxrec['kcid'] = recmx.data.kcid;
                        mxrec['sm'] = recmx.data.sm;
                        arraymx.push(mxrec);
                    })
                    cpghd['cpghdmx'] = arraymx;

                    //                   console.log(cpghd);
                    //                  return ;

                    var str = obj2str(cpghd);
                    var encodedString = base64encode(Ext.encode(str));

                    //-----------------------------------------------------------------


                    Ext.Ajax.request({
                        method: 'GET',
                        url: sys_ActionPHP,
                        params: {
                            act: 'wxcpghdmxsave',
                            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                            p_l_id: sys_location_id,
                            data: encodedString
                        },
                        scope: this,
                        success: function (response) {
                            var result = Ext.decode(response.responseText);

                            if (result.result == 'success') {
                                //  PrintCpghdxsid(result.xsid);
                                var selectedData = that.getView().getSelectionModel().getSelection();
                                that.getView().getSelectionModel().deselect(selectedData);
                                that.locQuery(that);
                                that.viewname.down("#cpghdedit").close();
                                // that.getView().down("#cpghdedit").close();
                            }
                            else {
                                Ext.MessageBox.alert('错误!', result.msg);
                                that.lookupReference('popupCpghdWindow').down("#CpghdFormSubmit").setHidden(false);
                            }
                        },
                        failure: function () {
                            Ext.MessageBox.alert('错误!', '发生错误！');
                            that.lookupReference('popupCpghdWindow').down("#CpghdFormSubmit").setHidden(false);

                        }
                    });
                    //------------------------------------------------------------------
                }
            }
        });
    }
});


