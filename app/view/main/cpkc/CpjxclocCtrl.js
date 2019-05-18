sys_DisplayAll = "";
var that;
Ext.define('MyApp.view.main.cpkc.CpjxclocCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CpjxclocCtrl',
    requires: [
        'MyApp.view.main.cpkc.CpjxclocView'
    ],
    locQuery: function (the) {

        var v = the.getView().getViewModel();


        var ckid = v.get('ckid');
        var khid = v.get('khid');
        var cpid = v.get('cpid');
        var ny = v.get('ny');
        var yu = v.get('yu');
        CpjxclocStore.proxy.extraParams.p_l_id = ckid;
        CpjxclocStore.proxy.extraParams.khid = khid;
        CpjxclocStore.proxy.extraParams.cpid = cpid;
        CpjxclocStore.proxy.extraParams.ny = ny;
        CpjxclocStore.proxy.extraParams.yu = yu;
        CpjxclocStore.reload();
    },

    onBtnQueryClick: function (button, e, options) {
        this.locQuery(this);
        return false;
    },
    onBtnHelpClick: function (button, e, options) {
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
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
//            "#FilterField": {
  //              change: this.onFilterChange
    //        },
            "#btnQueryKhmc": {
                click: this.onSelectKhbmView
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
        var v = this.getView().getViewModel();
        
        this.locQuery(this);
        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnExport').setHidden(false);
    },

    onBtnExportClick: function (record) {
        var that=this;
        var v = that.getView().getViewModel();
        var ny = v.get('ny');
        var yu = v.get('yu');

        var khmc = v.get('khmc');
      //  if (khmc.length == 0) {
      //      Ext.MessageBox.alert('注意！', '请选择客户名称！');
      //      return;
      //  }





        var store = this.getView().getStore();



        
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
        console.log(sheetarr);
        var tableDataarr=[];
        var jsonSheetData=[];

        for (var i = 0; i < sheetarr.length; i++) {
            if (i==0){
            var   oldobj = sheetarr[i];
             jsonSheetData=this.getexcelsheetdata (kcarray,oldobj.khid,oldobj.khmc,ny,yu) ;
             tableDataarr.push(
                {
                    "sheetName": oldobj.khjc,
                    "data": jsonSheetData
                }
             );
            }
        } 






        //
        //return ;





        var prtData = {
            "options": {
                "fileName": "("+ ny+'年'+yu+"月)商品进出存月报表"
            },
            "tableData":tableDataarr
        }

  //console.log(prtData);     
        Jhxlsx.export(prtData.tableData, prtData.options);

     

    },
    
    getexcelsheetdata: function (dataarray,khid,khmc,ny,yu) {
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
                "text": "("+ ny+'年'+yu+"月)商品进出存月报表"
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
                "text": "仓库：" + this.viewname.getViewModel().get('ckmc')
            },{},{},{},{},{},
            {
                "merge": {
                    "c": 9
                },

                "style": {
                    "font": {
                        "bold": true
                    }
                },
                "text": " 客户："+khmc
            }


        ]
        jsonData.push(arr);  //增加小标题
//        jsonData.push([]);

        arr = [
            {
                'text': '产地     ', 
                "merge": {  "r": 1       },
                "style": {
                    "font": {
                        "bold": true
                    }
                }
            }
            , {"merge": { "r": 1},
                'text': '商品名称       ', "style": {
                    "font": {
                        "bold": true
                    },
                    "width":500
                }
            }, {"merge": {"r": 1},
                'text': '包装      ', "style": {
                    "font": {
                        "bold": true
                    }
                }
            }, {"merge": {"r": 1},
                'text': '规格      ', "style": {
                    "font": {
                        "bold": true
                    }
                }
            }, {"merge": {"r": 1},
                'text': '批号    ', "style": {
                    "font": {
                        "bold": true
                    }
                }
            }, {"merge": {"r": 1 },
                'text': '单位  ', "style": {
                    "font": {
                        "bold": true
                    }
                }
            },

            {
            'text': '上月库存', 
            "merge": {"c": 1},
            "style": {
                "font": {
                    "bold": true
                }
            }
        }, {}
        , {
            "merge": {
                "c": 1
            },
            'text': '本月进仓', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {}
        , {
            "merge": {
                "c": 1
            },
            'text': '本月出仓', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {}
        , {
            "merge": {
                "c": 1
            },
            'text': '本月调帐', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {}
        , {
            "merge": {
                "c": 1
            },
            'text': '本月结存', "style": {
                "font": {
                    "bold": true
                }
            }
        }
    ];
        jsonData.push(arr);

        arr = [{
            'text': '产地       ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '    商品名称       ', "style": {
                "font": {
                    "bold": true
                },
                "width":500
            }
        }, {
            'text': '包装      ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '规格      ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '批号    ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '单位  ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   重量   ', "style": {
                "font": {
                    "bold": true
                }
            } 
        }
        , {
            'text': '   数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   重量   ', "style": {
                "font": {
                    "bold": true
                }
            } 
        }
        , {
            'text': '   数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   重量   ', "style": {
                "font": {
                    "bold": true
                }
            } 
        }
        , {
            'text': '   数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   重量   ', "style": {
                "font": {
                    "bold": true
                }
            } 
        }
        , {
            'text': '   数量   ', "style": {
                "font": {
                    "bold": true
                }
            }
        }, {
            'text': '   重量   ', "style": {
                "font": {
                    "bold": true
                }
            } 
        }
       
    ];
        jsonData.push(arr);
       var sumkcsl0=0;
       var sumkczl0=0;

       var sumkcsl=0;
       var sumkczl=0;

       var sumjcsl=0;
       var sumjczl=0;

       var sumccsl=0;
       var sumcczl=0;
       var sumtzsl=0;
       var sumtzzl=0;

       var sumrows=0; 
       for (var i = 0; i < dataarray.length; i++) {
            //  var newobj={};          
            arr = [];
            var oldobj = dataarray[i].data;
          if (oldobj.khid==khid){
            arr.push({ 'text': oldobj.cdmc });
            arr.push({ 'text': oldobj.cpmc });
            arr.push({ 'text': oldobj.bzmc });
            arr.push({ 'text': oldobj.cpgg });
            arr.push({ 'text': oldobj.cpph });
            arr.push({ 'text': oldobj.jldw });
            arr.push({ 'text': slrenderer( oldobj.kcsl0) });
            arr.push({ 'text':  slrenderer(oldobj.kczl0) });
            arr.push({ 'text':  slrenderer(oldobj.jcsl) });
            arr.push({ 'text':  slrenderer(oldobj.jczl) });
            arr.push({ 'text': slrenderer( oldobj.ccsl) });
            arr.push({ 'text':  slrenderer(oldobj.cczl) });
            arr.push({ 'text': slrenderer(oldobj.tzsl) });
            arr.push({ 'text': slrenderer(oldobj.tzzl) });
            arr.push({ 'text':  slrenderer(oldobj.kcsl) });
            arr.push({ 'text':  slrenderer(oldobj.kczl) });
            sumrows+=1;
            sumkcsl+=oldobj.kcsl;
            sumkczl+=oldobj.kczl;

            sumkcsl0+=oldobj.kcsl0;
            sumkczl0+=oldobj.kczl0;

            sumjcsl+=oldobj.jcsl;
            sumjczl+=oldobj.jczl;
            sumccsl+=oldobj.ccsl;
            sumcczl+=oldobj.cczl;

            sumtzsl+=oldobj.tzsl;
            sumtzzl+=oldobj.tzzl;
            
            jsonData.push(arr);
          }
        }

         if (sumrows>0){
           arr=[];
            arr.push({ 'text':'',"merge": {
                "c": 4
            } });
            arr.push({ });
            arr.push({ });
            arr.push({ });
            arr.push({  });
            arr.push({ 'text':'合计'});
            arr.push({ 'text':slrenderer( sumkcsl0) });
            arr.push({ 'text':slrenderer( sumkczl0) });
            arr.push({ 'text':slrenderer( sumjcsl) });
            arr.push({ 'text':slrenderer( sumjczl) });
            arr.push({ 'text':slrenderer( sumccsl) });
            arr.push({ 'text':slrenderer( sumcczl) });
            arr.push({ 'text':slrenderer(sumtzsl) });
            arr.push({ 'text':slrenderer( sumtzzl) });
            arr.push({ 'text':slrenderer( sumkcsl) });
            arr.push({ 'text':slrenderer( sumkczl) });
        ////    console.log("arr",arr);
            jsonData.push(arr);
         }
//console.log(jsonData);
      return   jsonData;




    },
    slrender:function(sss)
    {
          if (sss==0){
              return '';
          }
          
          return sss;
    },   
    onSelectKhbmView: function (record) {
        treeSelect('khmc', that, '', that.viewname, true);
        return false;
    },
    khmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },



    SelectCkbmView: function (record) {
        treeSelect('ckmc', that, '', that.viewname, true);
        return false;
    },
    ckmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    },
    SelectCpbmView: function (record) {
        treeSelect('cpmc', that, '', that.viewname, true);
        return false;
    },
    cpmcTriggerClick: function (record) {
        that.onBtnQueryClick();
        return false;
    }/*,
    onFilterChange: function (v) {
        var store = that.viewname.getStore()
        var regExp = new RegExp(".*" + v.rawValue + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('cdmc')) ||  regExp.test(record.get('dh')) ||regExp.test(record.get('cpmc')) || regExp.test(record.get('cpgg')) || regExp.test(record.get('cpph')) || regExp.test(record.get('khmc'));
        });
    }*/
});

