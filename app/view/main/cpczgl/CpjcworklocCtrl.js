var bystore = Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'jclb'],
    data :[['0', '全部'],['1', '进仓'],['2', '出仓'],['3', '过户'],['4', '过车']]
});


var that;
var areaArray = [];
var ckmc = "";
var cur = 0;
var grid;
var fheight=0;
var sumfooterrow=true;
var gridTableName="jcworklocgridTable";
var gridpostData;
var isEditEnable=false;
var isAddEnable=false;
var isDeleteEnable=false;
var isExportEnable=true;
var isSearchEnable=false;
var gridrowNum;
var gridSortName;
var PageTitleName='进出仓费用明细账'; 
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
Ext.define("MyApp.view.main.cpczgl.CpjcworklocCtrl", {
    extend:"Ext.app.ViewController",
    alias:"controller.CpjcworklocCtrl",
    requires:["MyApp.view.main.cpczgl.CpjcworklocView"],
    init:function(){
     that = this;
     that.viewname = that.getView();






        exportfilename=PageTitleName+".xlsx";

        var v = that.getView().getViewModel();
        var ckid = v.get('ckid');
        var jclb = v.get('jclb');
        var khid = v.get('khid');
      //  var cpid = v.get('cpid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');

        gridpostData={
            export:"0",
            jclb:jclb,
            cpid:0,
            p_e_code:1,
            p_l_id:ckid,
            khid:khid,
            ckid:ckid,
            startdate:d1,
            enddate:d2
        };
        fheight=218;
        paging=false;
        gridrowNum=10000;
        gridTableName="jcworklocgridTable";
        listUrl='jqgriddata.php?act=cpjcworkloclist';
        gridgrouping=true;
        onBtnExportClick=false;
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
            {label: '产地名称',  name: 'cdmc', width:180, sortable: false },
            {label: '产品名称',  name: 'cpmc', width:250,sortable: false },
          //  {label: '包装名称',  name: 'bzmc', width:200, sortable: false },
            {label: '单位',  name: 'jldw',width:60,align: 'center',sortable: false },
            {label: '数量',  name: 'jcsl', align: 'right', formatter:zlFormat,sortable: false,summaryType:'sum' },
            {label: '重量',  name: 'jczl', align: 'right', formatter:zlFormat, sortable: false,summaryType:'sum' },
            {label: '工作名称',  name: 'work', sortable: false },
            {label: '单位',  name: 'dw', width:60,align: 'center',sortable: false },
            {label: '重量',  name: 'sl', align: 'right', formatter:zlFormat,sortable: false,summaryType:'sum' },
            {label: '单价',  name: 'dj', align: 'right', formatter: jeFormat, sortable: false},
            {label: '金额',  name: 'je', align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum' },
            {label: '其中现付',  name: 'xjje', align: 'right', formatter:jeFormat,sortable: false,summaryType:'sum' },
            {label: '机械',  name: 'gs', sortable: false },
            {label: '搬运',  name: 'byg', sortable: false },
            {label: '仓管',  name: 'cg', sortable: false },
            {label: '日期 ',  name: 'rq', width:100,sortable: false },
            {label: '单号',  name: 'dh',  width:150,sortable: false },
            {label: '分类',  name: 'jclb',width:80, sortable: false }
            ];
            var tool=that.getView().down("#QueryToolbarView");
            tool.down("#btnExport").setHidden(!isExportEnable);
           
            that.control({
                "#btnQuery":{click:that.onBtnQueryClick},
                "#btnHelp":{click:onBtnHelpClick},
                "#btnExport":{click:that.onBtnExportClick},
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
    
    onBtnExportClick:function(button,options)
    {
      console.log("jqGridExportToCSV    onBtnExportClick");
      jqGridExportToCSV(grid);

     },
    
    onBtnQueryClick:function(button,e,options){

        var v = that.getView().getViewModel();
        var ckid = v.get('ckid');
        var jclb = v.get('jclb');
        var khid = v.get('khid');
      //  var cpid = v.get('cpid');
        start_date = v.get('start_date');
        end_date = v.get('end_date');
        var d1 = Ext.Date.format(start_date, 'Y-m-d');
        var d2 = Ext.Date.format(end_date, 'Y-m-d');

        gridpostData={
            export:"0",
            jclb:jclb,
            cpid:0,
            p_e_code:1,
            ckid:ckid,
            p_l_id:ckid,
            khid:khid,
            startdate:d1,
            enddate:d2
        };

       grid.jqGrid('setGridParam',{postData:gridpostData}).trigger('reloadGrid'); 

    },
  onGridComplete:function()
 {
     console.log("var  CpjcworklocGrid   onGridComplete");
   if (!setGroupHeaders){
     jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
         //useColSpanStyle: false, 
         useColSpanStyle: true,   
         groupHeaders:[
         {startColumnName: 'jldw', numberOfColumns: 3, titleText: '进出仓内容'},
         {startColumnName: 'work', numberOfColumns: 9, titleText: '作业内容'}
         ]  
       });
       jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
         useColSpanStyle: false, 
         groupHeaders:[
           {startColumnName: 'jldw', numberOfColumns: 3, titleText: '进出仓内容'},
           {startColumnName: 'work', numberOfColumns: 9, titleText: '作业内容'}
         ]  
       });
       setGroupHeaders=true;
     };
 },
//************************************************* */
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

},

   
    

 })



 


