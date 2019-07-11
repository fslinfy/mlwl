sys_DisplayAll = "cpkc";
var that;
Ext.define('MyApp.view.main.cpkc.CpkcmxlocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpkcmxlocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpkcmxlocView'
        , 'MyApp.view.main.cpkc.CpkccwEdit'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCdmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        , 'MyApp.view.main.report.DataToExcel'
    ],
    locQuery: function (that) {
        var ckid = that.viewname.getViewModel().get('ckid');
        var khid = that.viewname.getViewModel().get('khid');
        var cdid = that.viewname.getViewModel().get('cdid');
        var cpid = that.viewname.getViewModel().get('cpid');
        var area = that.viewname.getViewModel().get('area');
        // if (area == '') area = 'A';
        var store = that.viewname.getStore();
        store.proxy.extraParams.loc = 'cpkcmxloc';
        store.proxy.extraParams.p_l_id = ckid;
        store.proxy.extraParams.khid = khid;
        store.proxy.extraParams.cdid = cdid;
        store.proxy.extraParams.cpid = cpid;
        store.proxy.extraParams.area = area;

        store.reload();
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(true);



    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
        /*  var grid = that.getView();
          grid.saveDocumentAs({
              type: 'excel',
              title: 'My export',
              fileName: 'myExport.xml'
          });
  */
        return false;
    },
    init: function () {
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
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#btnEdit": {
                click: this.onBtnEditClick
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
            "#btnFormSubmit": {
                click: this.onFormSubmit
            },
            "#btnExport": {
                click: this.onBtnExportClick
            },

            "#btnQueryCkmc": {
                click: this.SelectCkbmView
            }
        });
        this.locQuery(this);
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setHidden(false);
        tool.down('#btnEdit').setText('调整堆位');
        tool.down('#btnExport').setHidden(false);

    },

    onBtnEditClick: function (rs) {
        var store = this.getView().getStore();
        var grid = this.getView();// .down("#CpkcmxlocGrid");//Ext.getCmp('CommodityGrid');
        var rec = grid.getSelectionModel().getSelection()[0].data;
        rec["rq"] = new Date();
        rec["newsl"] = 0;
        rec["newzl"] = 0;
        rec["newcw"] = rec["cw"];
        rec["newsm"] = rec["sm"];
        rec["oldArea"] = rec["area"];
        var view = this.getView();
        this.view = view;
        this.dialog = view.add({
            xtype: 'formcweditwindow',
            viewModel: {
                data: rec
            },
            session: true
        });
        this.dialog.show();
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnEdit').setDisabled(false);
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
    onBtnExportClick: function (record) {
    var that=this;
    var area = that.viewname.getViewModel().get('area');
    if (area.length>0){
        var title='商品仓位明细库存表('+area+')';
    }else{
        var title='商品仓位明细库存表';
    }
    var store = that.getView().getStore();
        var kcarray = store.data.items;
        var sheetarr = [];
        var khid=0;
        for (var i = 0; i < kcarray.length; i++) {
            var oldobj = kcarray[i].data;
            if (oldobj.khid!=khid){
                khid=oldobj.khid;
                sheetarr.push(
               {
                "khid":khid,
                "khjc":oldobj.khjc  ,
                "khmc":oldobj.khmc  
               }
            );
            }
        } 
        var tableDataarr=[];
        var jsonSheetData=[];
        for (var i = 0; i < sheetarr.length; i++) {
            var   oldobj = sheetarr[i];
             jsonSheetData=this.getexcelsheetdata (kcarray,oldobj.khid,oldobj.khmc,title) ;
             tableDataarr.push(
                {
                    "sheetName": oldobj.khjc,
                    "data": jsonSheetData
                }
             );
        } 
   
        var prtData = {
            "options": {
                "fileName": title
            },
            "tableData":tableDataarr
        }
        Jhxlsx.export(prtData.tableData, prtData.options);
        return ;
    },
    getexcelsheetdata: function (kcarray,khid,khmc,title) {
        var that=this;
        var jsonData=[];
        var arr = [
            {
                "merge": {
                    "c": 15
                },
                "style": {
                    "font": {
                        "sz":24,
                        "bold": true,
                         "color": {
                            "rgb": 'FF4F81BD' 
                          }
                    },
                    "alignment": {
                        "horizontal": 'center' 
                      }
                },
                "text":title
            }
        ]
        jsonData.push(arr);  //增加标题
        arr = [
            {
                "merge": {
                    "c": 5
                },
                "style": {
                    "font": {
                        "bold": true
                    }
                },
                "text": "客户：" + khmc
            }, {}, {}, {}, {}, {},  
            {
                "merge": {
                    "c": 5
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
            'text': '批号     ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '  区域  ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '  仓位  ', "style": {
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
        }, {
            'text': '进仓日期    ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '仓位说明     ', "style": {
                "font": {
                    "bold": true
                }
            }
        }
        ];
        jsonData.push(arr);
        var sumsl=0;
        var sumzl=0;
        for (var i = 0; i < kcarray.length; i++) {
            arr = [];
            var oldobj = kcarray[i].data;
          if (oldobj.khid==khid){
            var oldobj = kcarray[i].data;
            arr.push({ 'text': oldobj.cdmc });
            arr.push({ 'text': oldobj.cpmc });
            arr.push({ 'text': oldobj.bzmc });
            arr.push({ 'text': oldobj.cpgg });
            arr.push({ 'text': oldobj.cpph });
            arr.push({ 'text': oldobj.jldw });
            arr.push({ 'text': oldobj.area });
            arr.push({ 'text': oldobj.cw });
            arr.push({ 'text': slrenderer(oldobj.kcsl) });
            arr.push({ 'text': slrenderer(oldobj.kczl) });
            arr.push({ 'text': Ext.Date.format(oldobj.czrq, 'Y-m-d') });
            arr.push({ 'text': oldobj.sm });
            sumsl+=oldobj.kcsl;
            sumzl+=oldobj.kczl;
            jsonData.push(arr);
          }
        }
        if ( kcarray.length>1) {
            arr=[]; 
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({});
            arr.push({ 'text': '合计' });
            arr.push({ 'text': slrenderer(sumsl) });
            arr.push({ 'text': slrenderer(sumzl) });
            arr.push({ 'text': '' });
            arr.push({ 'text':''});
            jsonData.push(arr);

        }
        return   jsonData;
    },

    SelectCkbmView: function (record) {
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
    SelectCpbmView: function (record) {
        treeSelect('cpmc', that, 'cpkc', that.viewname, true);
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },

    /** 
    * 合并单元格 
    * @param {} grid  要合并单元格的grid对象 
    * @param {} cols  要合并哪几列 [1,2,4] 
    */
    /*  
    mergeCells: function (grid, cols) {
        var arrayTr = document.getElementById(grid.getId() + "-body").firstChild.firstChild.firstChild
            .getElementsByTagName('tr');
        //var arrayTr = document.getElementById(grid.getId()+"-body").firstChild.nextSibling;  
        //var arrayTr = Ext.get(grid.getId()+"-body").first().first().first().select("tr");  
        var trCount = arrayTr.length;
        var arrayTd;
        var td;
        var merge = function (rowspanObj, removeObjs) { //定义合并函数  
            if (rowspanObj.rowspan != 1) {
                arrayTd = arrayTr[rowspanObj.tr].getElementsByTagName("td"); //合并行  
                td = arrayTd[rowspanObj.td - 1];
                td.rowSpan = rowspanObj.rowspan;
                td.vAlign = "middle";
                Ext.each(removeObjs, function (obj) { //隐身被合并的单元格  
                    arrayTd = arrayTr[obj.tr].getElementsByTagName("td");
                    arrayTd[obj.td - 1].style.display = 'none';
                });
            }
        };
        var rowspanObj = {}; //要进行跨列操作的td对象{tr:1,td:2,rowspan:5}  
        var removeObjs = []; //要进行删除的td对象[{tr:2,td:2},{tr:3,td:2}]  
        var col;

        Ext.each(cols, function (colIndex) { //逐列去操作tr  
            var rowspan = 1;
            var divHtml = null; //单元格内的数值  
            for (var i = 1; i < trCount; i++) { //i=0表示表头等没用的行  
                arrayTd = arrayTr[i].getElementsByTagName("td");
                var cold = 0;
                Ext.each(arrayTd, function (Td) { //获取RowNumber列和check列  
                    if (Td.getAttribute("class")
                        .indexOf("x-grid-cell-special") != -1)
                        cold++;
                });
                col = colIndex + cold; //跳过RowNumber列和check列  
                if (!divHtml) {
                    divHtml = arrayTd[col - 1].innerHTML;
                    rowspanObj = {
                        tr: i,
                        td: col,
                        rowspan: rowspan
                    }
                } else {
                    var cellText = arrayTd[col - 1].innerHTML;
                    var addf = function () {
                        rowspanObj["rowspan"] = rowspanObj["rowspan"] + 1;
                        removeObjs.push({
                            tr: i,
                            td: col
                        });
                        if (i == trCount - 1)
                            merge(rowspanObj, removeObjs);//执行合并函数  
                    };
                    var mergef = function () {
                        merge(rowspanObj, removeObjs);//执行合并函数  
                        divHtml = cellText;
                        rowspanObj = {
                            tr: i,
                            td: col,
                            rowspan: rowspan
                        }
                        removeObjs = [];
                    };
                    if (cellText == divHtml) {
                        if (colIndex != 1) {
                            var leftDisplay = arrayTd[col - 2].style.display;//判断左边单元格值是否已display  
                            if (leftDisplay == 'none') {
                                addf();
                            } else {
                                mergef();
                            }
                        } else {
                            addf();
                        }
                    } else {
                        mergef();
                    }
                }
            }
        });
    },*/

    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('cdmc')) || regExp.test(record.get('cpmc')) || regExp.test(record.get('cpgg')) || regExp.test(record.get('cpph')) || regExp.test(record.get('khmc'));
        });
    },
    onFormSubmit: function () {

        var formPanel = that.lookupReference('popupcweditWindow');
        var form = that.lookupReference('windowcweditForm');
        if (form.isValid()) {
            var record = form.getValues();
            record["p_e_code"] = sys_enterprise_code;
            record["p_l_id"] = sys_location_id;
            var obj = record;
            obj['rq'] = Ext.decode(Ext.encode(new Date()));
            obj["czy"] = sys_userInfo.username;
            if ((obj['newsl'] == 0) && (obj['newzl'] == 0)) {
                Ext.MessageBox.alert('提示!', '请输入变更数量！');
                return false;
            }
            if (obj['newsl'] == obj['sl']) {
                obj['newzl'] = obj['zl'];
            }
            Ext.Ajax.request({
                method: 'POST',
                url: sys_ActionPHP + '?act=cpkccwedit',
                scope: this,
                params: obj,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        that.lookupReference('popupcweditWindow').destroy();
                        var store = that.view.getStore();
                        store.load();
                        Ext.toast.msg('注意！', ' 仓库变更数据保存成功！');

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
    }

});

