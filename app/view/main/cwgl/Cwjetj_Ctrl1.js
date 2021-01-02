var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var jelb=1;
var fheight=218;
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
var PageTitleName='月度工作费用记账表'; 
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
Ext.define("MyApp.view.main.cwgl.Cwjetj_Ctrl1", {
    extend:"Ext.app.ViewController",
    alias:"controller.Cwjetj_Ctrl1",
    requires:[
        
        "MyApp.view.main.QueryToolbarView"
        ,"MyApp.view.main.jqGridFunction"
        ,'MyApp.view.main.tree.QueryKhmc'
        ,'MyApp.view.main.tree.QueryCkmc'
        ,"MyApp.view.main.cwgl.Cwjetj_View1"
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
            jelb:1,
            initArg:123,
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
PageTitleName='月度工作费用记帐表'; 
lastSel=0;   
jelb=1;
fheight=218;
lastEditRow=0;  
exportload=false;
exportfilename=ny+'年'+yu+PageTitleName+".xlsx";

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
            {label: '日',  name: 'day',width:50, sortable: false,align: 'center'},
            {label: '公司',  name: 'khmc', sortable: false },
            {label: '单位',  name: 'dw', align: 'center', sortable: false },
            {label: '重量',  name: 'sl',align: 'right', sortable: false,formatter:zlFormat },
            {label: '装卸',  name: 'byje',align: 'right', formatter:jeFormat,sortable: false ,summaryType:'sum'},
            {label: '过车',  name: 'gfje',align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '过户',  name: 'ghje',align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '其它',  name: 'qtje',align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum'},
            {label: '合计',  name: 'je', align: 'right',  formatter:jeFormat,sortable: false,summaryType:'sum'}
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
    /*
    onBtnExportClick:function(button,e,options){
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

       
        exportfilename=ny+'年'+yu+PageTitleName+'.xlsx';

        gridpostData={
            export:"0",
            jelb:1,
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
    
      
          jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
              //useColSpanStyle: false, 
              useColSpanStyle: true,   
              groupHeaders:[
              {startColumnName: 'byje', numberOfColumns: 5, titleText: '记账金额'}
              
              ]  
            });
            jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
              useColSpanStyle: false, 
              groupHeaders:[
                {startColumnName: 'byje', numberOfColumns: 5, titleText: '记账金额'}
              ]  
            });
         
        };
      
        
    },
    
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




