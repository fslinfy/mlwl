sys_DisplayAll = "cpkc";
var LODOP;
var that;
var cpkcmxStore;




Ext.define('MyApp.view.main.cpkc.CpkclocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpkclocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpkclocView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCdmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        //, 'MyApp.view.main.report.DataToExcel'
        //, 'MyApp.view.main.report.ToExcel'
    ],
    locQuery: function () {
        var ckid = that.viewname.getViewModel().get('ckid');
        var khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var store = that.viewname.getStore();
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;
        store.reload();
    },
    onBtnQueryClick: function (button, e, options) {
        var ckid = that.viewname.getViewModel().get('ckid');
        var khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var store = this.getView().getStore();
        cpkcmxStore.proxy.extraParams.p_l_id = ckid;
        cpkcmxStore.proxy.extraParams.khid = khid;
        cpkcmxStore.proxy.extraParams.cdid = cdid;
        cpkcmxStore.proxy.extraParams.cpid = cpid;
        cpkcmxStore.reload();
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        //     this.printtest();
        return;
    },
    init: function () {

        console.log('start_date');
        console.log(sys_option_min_date);
        that = this;
        that.viewname = that.getView();
        if (sys_customer_id > 0) {
            that.viewname.getViewModel().set('khid', sys_customer_id);
            that.viewname.getViewModel().set('khmc', sys_customer_name);
        }
        if (sys_location_id > 0) {
            that.viewname.getViewModel().set('ckid', sys_location_id);
            that.viewname.getViewModel().set('ckmc', sys_location_name);
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
            },
            autoLoad: false
        });
        cpkcmxStore.on("load", function () {
            that.locQuery();
        });
        that.onBtnQueryClick();
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
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
                click: this.onSelectCdbmView
            },
            "#btnQueryCpmc": {
                click: this.SelectCpbmView
            },
            "#btnExport": {
                click: this.onBtnExportClick
            },
            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        var store = that.viewname.getStore();
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnExport').setHidden(false);
    },
    onBtnExportClick: function (record) {
        var that = this;
        var store = this.getView().getStore();
        var kcarray = store.data.items;
        var sheetarr = [];
        var khid = 0;
        for (var i = 0; i < kcarray.length; i++) {
            var oldobj = kcarray[i].data;
            if (oldobj.khid != khid) {
                khid = oldobj.khid;
                sheetarr.push(
                    {
                        "khid": khid,
                        "khjc": oldobj.khjc,
                        "khmc": oldobj.khmc
                    }
                );
            }
        }
        var tableDataarr = [];
        var jsonSheetData = [];
        for (var i = 0; i < sheetarr.length; i++) {
            var oldobj = sheetarr[i];
            jsonSheetData = this.getexcelsheetdata(kcarray, oldobj.khid, oldobj.khmc);
            tableDataarr.push(
                {
                    "sheetName": oldobj.khjc,
                    "data": jsonSheetData
                }
            );
        }
        var prtData = {
            "options": {
                "fileName": "商品仓位明细库存表"
            },
            "tableData": tableDataarr
        }
        Jhxlsx.export(prtData.tableData, prtData.options);
        return;
    },
    getexcelsheetdata: function (kcarray, khid, khmc) {
        var that = this;
        var jsonData = [];
        var arr = [
            {
                "merge": {
                    "c": 11
                },
                "style": {
                    "font": {
                        "sz": 24,
                        "bold": true,
                        "color": {
                            "rgb": 'FF4F81BD'
                        }
                    },
                    "alignment": {
                        "horizontal": 'center'
                    }
                },
                "text": "商品仓位明细库存表"
            }
        ]
        jsonData.push(arr);  //增加标题
        arr = [
            {
                "merge": {
                    "c": 3
                },
                "style": {
                    "font": {
                        "bold": true
                    }
                },
                "text": "客户：" + khmc
            }, {}, {}, {},
            {
                "merge": {
                    "c": 3
                },

                "style": {
                    "font": {
                        "bold": true
                    }
                },
                "text": "仓库：" + this.viewname.getViewModel().get('ckmc')
            }

        ]
        jsonData.push(arr);  //增加小标题
        jsonData.push([]);
        arr = [{
            'text': '    产地       ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '     商品名称     ', "style": {
                "font": {
                    "bold": true
                },
                "width": 500
            }
        }, {
            'text': '      包装     ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '      规格   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   批号     ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '  单位  ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '库存数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '库存重量    ', "style": {
                "font": {
                    "bold": true
                }
            }
        } 
        ];
        jsonData.push(arr);
        var sumsl = 0;
        var sumzl = 0;
        for (var i = 0; i < kcarray.length; i++) {
            arr = [];
            var oldobj = kcarray[i].data;
            if (oldobj.khid == khid) {
                var oldobj = kcarray[i].data;
                arr.push({ 'text': oldobj.cdmc });
                arr.push({ 'text': oldobj.cpmc });
                arr.push({ 'text': oldobj.bzmc });
                arr.push({ 'text': oldobj.cpgg });
                arr.push({ 'text': oldobj.cpph });
                arr.push({ 'text': oldobj.jldw });
                arr.push({ 'text': slrenderer(oldobj.kcsl) });
                arr.push({ 'text': slrenderer(oldobj.kczl) });
                sumsl += oldobj.kcsl;
                sumzl += oldobj.kczl;
                jsonData.push(arr);
            }
        }
        if (kcarray.length > 1) {
            arr = [];
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({ 'text': '合计' });
            arr.push({ 'text': slrenderer(sumsl) });
            arr.push({ 'text': slrenderer(sumzl) });
            jsonData.push(arr);

        }
        return jsonData;
    },






    cdmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },



    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, 'cpkc', that.viewname, true);
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

    onSelectCdbmView: function (record) {
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
            return regExp.test(record.get('cpmc')) || regExp.test(record.get('cdmc')) || regExp.test(record.get('khmc')) || regExp.test(record.get('cpgg')) || regExp.test(record.get('cpph'));
        });
    }
});

