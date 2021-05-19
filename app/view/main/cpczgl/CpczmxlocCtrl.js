var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var fheight=218;
var sumfooterrow=true;
var gridTableName="czmxlocgridTable";
var gridpostData;
var isEditEnable=false;
var isAddEnable=false;
var isDeleteEnable=false;
var isExportEnable=true;
var isSearchEnable=false;
var gridrowNum;
var gridSortName;
var PageTitleName='月度仓租明细表'; 
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
var exportfilename=PageTitleName;
Ext.define("MyApp.view.main.cpczgl.CpczmxlocCtrl", {
    extend:"Ext.app.ViewController",
    alias:"controller.CpczmxlocCtrl",
    requires:[
    "MyApp.view.main.QueryToolbarView"
    ,"MyApp.view.main.jqGridFunction"
    ,'MyApp.view.main.tree.QueryCpmc'
    ,'MyApp.view.main.tree.QueryKhmc'
    ,'MyApp.view.main.tree.QueryCkmc'
    ,"MyApp.view.main.cpczgl.CpczmxlocView"
  
  ],
    init:function(){
     that = this;
     that.viewname = that.getView();


        var v = that.getView().getViewModel();
        var ckid =sys_location_id;// v.get('ckid');
        var khid = v.get('khid');
        var cpid = v.get('cpid');
        var ny = v.get('ny');
        var yu = v.get('yu');
        exportfilename=ny+'年'+yu+PageTitleName+".xlsx";
        gridpostData={
            export:"0",
            initArg:123,
            p_e_code:1,
            p_l_id:ckid,
            khid:khid,
            cpid:cpid,
            ny:ny,
            yu:yu
        };
        fheight=218;
paging=false;
gridrowNum=10000;
gridTableName="czmxlocgridTable";
listUrl='jqgriddata.php?act=czmxloclist';
gridgrouping=true;
setGroupHeaders=false;
gridgroupingView = {
               groupField : ['khmc'],
               groupColumnShow : [false],
               groupSummary : [true],
              // groupText : ['<b>{0}日 - {1}条记录 </b>'],
               groupCollapse : false,
               groupOrder: ['asc']
             };

         mycolModel= [
            {label: '公司',  name: 'khmc',width:80, sortable: false },
            {label: '日期 ',  name: 'rq',width:80, sortable: false},
            {label: '产地名称',  name: 'cdmc', width:120, sortable: false },
            {label: '产品名称',  name: 'cpmc', width:200,sortable: false },
           
            {label: '单位',  name: 'jldw', index: 'jldw',width:40,align: 'center',sortable: false },
            
            
            
            {label: '数量',  name: 'sl', width:100, align: 'right', formatter:zlFormat,sortable: false,summaryType:'sum' },
            {label: '重量',  name: 'zl', width:100, align: 'right', formatter: zlFormat, sortable: false,summaryType:'sum' },
            {label: '计租天数',  name: 'days', width:60, align: 'right', sortable: false },
            {label: '单价',  name: 'dj', width:100, align: 'right', formatter:jeFormat,sortable: false },
            {label: '仓租',  name: 'je', width:100,  align: 'right',search: false ,formatter:zlFormat,sortable: false,summaryType:'sum'},
            {label: '产品批号',  name: 'cpph', width:100, sortable: false },
            {label: '类别',  name: 'jclbmc', width:60, sortable: false },
            {label: '进仓日期 ',  name: 'czrq', width:80,sortable: false,search: false }
            
            ];
            var tool=that.getView().down("#QueryToolbarView");
            tool.down("#btnExport").setHidden(!isExportEnable);
           
            that.control({
                "#btnQuery":{click:that.onBtnQueryClick},
                "#btnHelp":{click:that.onBtnHelpClick},
                "#btnExport":{click:onBtnExportClick},
                "#btnQueryKhmc":{click:onSelectKhbmView},
                "#btnQueryCkmc":{click: onSelectCkbmView},
                "#btnQueryCpmc":{click: onSelectCpbmView}
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
    /*
    onBtnExportClick:function(button,e,options){
        //grid.jqGrid('exportToCsv');
      //  console.log("exportToCsv");
        grid.jqGrid("exportToCsv",{
          includeLabels : true,
          includeGroupHeader : true,
          includeFooter: true,
          fileName :exportfilename,
          maxlength : 40 
        })
     },*/
     onBtnHelpClick:function(button,e,options){
      console.log('HELP');
     },
    onBtnQueryClick:function(button,e,options){

        
        var v = that.getView().getViewModel();
        
        var ckid = v.get('ckid');
        var khid = v.get('khid');
        var cpid = v.get('cpid');
        
        var ny = v.get('ny');
        var yu = v.get('yu');
        exportfilename=ny+'年'+yu+PageTitleName+".xlsx";
        gridpostData={
            export:"0",
            initArg:123,
            p_e_code:1,
            p_l_id:ckid,
            khid:khid,
            cpid:cpid,
            ny:ny,
            yu:yu
        };
       grid.jqGrid('setGridParam',{postData:gridpostData}).trigger('reloadGrid'); 

    },

   
    onGridComplete:function()
    {
      console.log("var  CpczmxlocGrid onGridComplete");
      if (!setGroupHeaders){
        jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
            //useColSpanStyle: false, 
            useColSpanStyle: true,   
            groupHeaders:[
            {startColumnName: 'days', numberOfColumns: 3, titleText: '仓租明细'},
            {startColumnName: 'cpph', numberOfColumns: 3, titleText: '备注'}
            ]  
          });
          jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
            useColSpanStyle: false, 
            groupHeaders:[
              {startColumnName: 'days', numberOfColumns: 3, titleText: '仓租明细'}, 
              {startColumnName: 'cpph', numberOfColumns: 3, titleText: '备注'}
            ]  
          });
          setGroupHeaders=true;
        };
    }   ,
    /****************************************************** */
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
 })
 
 



