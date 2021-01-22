var fheight=218;
var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var jelb=0;
var sumfooterrow=true;
var gridTableName="cwjetjgridTable";
var gridpostData;
var isEditEnable=false;
var isAddEnable=false;
var isDeleteEnable=false;
var isExportEnable=true;
var isSearchEnable=false;
var gridrowNum;
var gridSortName;
var PageTitleName='月度工作费用统计表'; 
var gridgrouping=false;
var gridgroupingView = {};
var lastSel=0;   
var navGridObj;
var lastEditRow=0;  
var exportload=false;
var paging=false;
var editUrl= "";
var listUrl='';
var mycolModel;
var setGroupHeaders=false;
var exportfilename=PageTitleName+".xlsx";
Ext.define("MyApp.view.main.cwgl.Cwjetj_Ctrl", {
    extend:"Ext.app.ViewController",
    alias:"controller.Cwjetj_Ctrl",
    requires:[
    "MyApp.view.main.QueryToolbarView"
    ,"MyApp.view.main.jqGridFunction"
    ,'MyApp.view.main.tree.QueryKhmc'
    ,'MyApp.view.main.tree.QueryCkmc'
    ,"MyApp.view.main.cwgl.Cwjetj_View"
],
    init:function(){
     that = this;
     that.viewname = that.getView();


        var v = that.getView().getViewModel();
        var ckid = v.get('ckid');
        var khid = v.get('khid');
     //   var cpid = v.get('cpid');
        var ny = v.get('ny');
        var yu = v.get('yu');
        gridpostData={
            export:"0",
            initArg:123,
            jelb:0,
            p_e_code:1,
            p_l_id:ckid,
            khid:khid,
            ny:ny,
            yu:yu
        };
//console.log(gridpostData);
setGroupHeaders=false;
gridTableName="cwjetjgridTable";
gridpostData;
isEditEnable=false;
isAddEnable=false;
isDeleteEnable=false;
isExportEnable=true;
isSearchEnable=false;
gridrowNum=20000;
gridSortName="Id";
PageTitleName='月度工作费用统计表'; 
exportfilename=ny+'年'+yu+PageTitleName+".xlsx";

lastSel=0;   
jelb=0;
fheight=218;
lastEditRow=0;  
exportload=false;
editUrl= "";
listUrl='jqgriddata.php?act=cwjetjlist';
gridgrouping=true;
gridgroupingView = {
               groupField : ['day'],
               groupColumnShow : [true],
               groupSummary : [true],
              // groupText : ['<b>{0}日 - {1}条记录 </b>'],
               groupCollapse : false,
               groupOrder: ['asc']
             };

         mycolModel= [
           // {label: '月',  name: 'yu', sortable: false,align: 'center', sorttype: "string"},
            {label: '日',  name: 'day', width:50,sortable: false,align: 'center'},
            {label: '公司',  name: 'khmc', width:120, sortable: false },
            {label: '单位',  name: 'dw', width:50, align: 'center', sortable: false },
            {label: '重量',  name: 'sl', width:100,align: 'right', formatter:zlFormat,sortable: false },
            {label: '记帐',  name: 'byje', width:100,align: 'right', formatter:jeFormat,sortable: false ,summaryType:'sum'},
            {label: '现收',  name: 'byxjje', width:100, align: 'right',formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '记帐',  name: 'gfje', width:100, align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '现收',  name: 'gfxjje', width:100,align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '记帐',  name: 'ghje', width:100, align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '现收',  name: 'ghxjje', width:100,align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'            },
            {label: '记帐',  name: 'qtje', width:100, align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '现收',  name: 'qtxjje', width:100,align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '记帐',  name: 'je', width:100,  align: 'right',  formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '现收',  name: 'xjje', width:100,align: 'right',  formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '合计',  name: 'je0', width:100, align: 'right',  formatter:jeFormat,sortable: false,summaryType:'sum' }
            ];
            var tool=that.getView().down("#QueryToolbarView");
            tool.down("#btnExport").setHidden(!isExportEnable);
           
            that.control({
                "#btnQuery":{click:that.onBtnQueryClick},
                "#btnHelp":{click:that.onBtnHelpClick},
                "#btnExport":{click:onBtnExportClick},
                "#btnQueryKhmc":{click:onSelectKhbmView},
                "#btnQueryCkmc":{click: onSelectCkbmView}
             });

             if (sys_customer_id > 0) {
                that.viewname.getViewModel().set('khid', sys_customer_id);
                that.viewname.getViewModel().set('khmc', sys_customer_name);
            }
            if (sys_location_id > 0) {
                that.viewname.getViewModel().set('ckid', sys_location_id);
                that.viewname.getViewModel().set('ckmc', sys_location_name);
                that.getView().down('#QueryCkmc').setHidden(true);
            }
    
    
    },
    /*onBtnExportClick:function(button,e,options){
        var v = that.getView().getViewModel();
        var ny = v.get('ny');
        var yu = v.get('yu');
        exportfilename=ny+'年'+yu+PageTitleName+".xlsx";

        //grid.jqGrid('exportToCsv');
        grid.jqGrid("exportToCsv",{
          includeLabels : true,
          includeGroupHeader : true,
          includeFooter: true,
          fileName :exportfilename,
          maxlength : 40 
        })
     },*/
    onBtnQueryClick:function(button,e,options){
        var v = that.getView().getViewModel();
        console.log("v=",v);
        var ckid = v.get('ckid');
        var khid = v.get('khid');
        var ny = v.get('ny');
        var yu = v.get('yu');
        exportfilename=ny+'年'+yu+PageTitleName+".xlsx";

        if (khid>0){
            gridgroupingView = {
                groupField : ['khmc'],
                groupColumnShow : [true],
                groupSummary : [false],
                // groupText : ['<b>{0}日 - {1}条记录 </b>'],
                groupCollapse : false,
                groupOrder: ['asc']
            };

        }else{
            gridgroupingView = {
                groupField : ['day'],
                groupColumnShow : [true],
                groupSummary : [true],
                // groupText : ['<b>{0}日 - {1}条记录 </b>'],
                groupCollapse : false,
                groupOrder: ['asc']
          };
         
        }

       
     

        gridpostData={
            export:"0",
            jelb:0,
            initArg:123,
            p_e_code:1,
            p_l_id:ckid,
            khid:khid,
            ny:ny,
            yu:yu
        };
       grid.jqGrid('setGridParam',{postData:gridpostData,groupingView:gridgroupingView}).trigger('reloadGrid'); 

    },
    onBtnHelpClick:function(button,e,options){
        console.log('help'); 
        jQuery("#"+gridTableName).jqGrid('navGrid','hideCol',"khmc");
    },
    onGridComplete:function()
    {
        console.log("onGridComplete");
      if (!setGroupHeaders){
      setGroupHeaders=true;
    //  if (jelb==0){
        jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
            //useColSpanStyle: false, 
            useColSpanStyle: true,   
            groupHeaders:[
            {startColumnName: 'byje', numberOfColumns: 2, titleText: '<em>装卸费用</em>'},
            {startColumnName: 'gfje', numberOfColumns: 2, titleText: '过车费用'},
            {startColumnName: 'ghje', numberOfColumns: 2, titleText: '过户费用'},
            {startColumnName: 'qtje', numberOfColumns: 2, titleText: '其它费用'},
            {startColumnName: 'je', numberOfColumns: 3, titleText: '合计'}
            ]  
          });
          jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
            useColSpanStyle: false, 
            groupHeaders:[
            {startColumnName: 'byje', numberOfColumns: 2, titleText: '<em>装卸费用</em>'},
            {startColumnName: 'gfje', numberOfColumns: 2, titleText: '过车费用'},
            {startColumnName: 'ghje', numberOfColumns: 2, titleText: '过户费用'},
            {startColumnName: 'qtje', numberOfColumns: 2, titleText: '其它费用'},
            {startColumnName: 'je', numberOfColumns: 3, titleText: '合计'}
            ]  
          });
         
        };
    
          
    } ,   


    //************************************************ */
    editbeforeSubmit:function(postdata, formid) {
        return [true,''];
    },
    editAfterSubmit:function(resp, postdata) {
        var obj=JSON.parse(resp.responseText);
        alert(obj.data.msg);
        return true;
    },
    
    addAfterSubmit:function(resp, postdata) {
             var obj=JSON.parse(resp.responseText);
             alert(obj.data.msg);
             return true;
    },
    
    deleteAfterSubmit:function(resp, postdata) {
        var obj=JSON.parse(resp.responseText);
        alert(obj.data.msg);
        return true;
    },
    
    gridLoadComplete:function(data)
    {
       
    },
    
    onGridSelectRow:function(id)
    {
     
    }
    


    //**************************************************** */

 })




