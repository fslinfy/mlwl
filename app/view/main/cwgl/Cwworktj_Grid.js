Ext.define('MyApp.view.main.cwgl.Cwworktj_Grid', {
    extend: 'Ext.Mixin'
});
/*
createpivotgrid=function(op){
 //if (op>0){
  var w=window.innerWidth-8;
  var h=document.documentElement.clientHeight-238;
  var dt=new Date().toISOString().replace("-",'').replace("-",'').replace(".",'').replace(":",'').replace(":",'');
  dt="Id"+dt;    
  console.log('createpivotgrid0',dt,w,h);
  griddiv=new Ext.Component({ 
      itemId: dt,
      flex:1,
      id: dt,
      bodyStyle:{"border":1}, 
      reference: dt,
      layout: 'fit' ,
      bodyPadding: 0,
      html: '<div style="width:'+w+';height:'+h+';padding:0 1 0 1;" id="griddivid'+gridTableName+'"> <table id="'+gridTableName+'" style="width:100%;"></table><div id="'+gridTableName+'Pager"></div></div>'
  });

  var panel=that.getView().down("#"+gridTableName+'gridPanelId');
   panel.removeAll();
   panel.add(griddiv)
  
   
  var v = that.getView().getViewModel();
  var ckid = v.get('ckid');
  var khid = v.get('khid');
  var ny = v.get('ny');
  var yu = v.get('yu');
  var work = v.get('bywork');
  var workname="搬运";
  switch(work){
    case '1':
      workname="搬运";
      break;
    case '2':
      workname="机械";
      break;
    case '3':
      workname="仓管";
      break;
    }
    
  exportfilename=ny+"年"+yu+'月度'+workname+'工作量统计表.xlsx'; 

var url='JQGRIDDATA.php?act=CwworktjLIST&loc=&bybz='+work+"&ny="+ny+"&yu="+yu+"&khid="+khid+"&p_l_id="+ckid+"&bz=&page=1&start=0&limit=25" ;  
  grid =jQuery("#"+gridTableName);
  //grid=that.getView().down("#"+gridTableName);
  //console.log(url,grid);
  grid.jqGrid('jqPivot',url,

  {
      xDimension: [
         // { dataName: "bz" , label: '   ',width:20 },
          { dataName: "ri",label: '日', align: 'center',width:50 },
          { dataName: "dw",label: '计量单位', align: 'center',width:100  }
      ],
      groupSummaryPos: "footer",
      aggregates: [
          { 
              formatter: "number",
              label: "sl",
              width: 100,
              align: "right",
              aggregator: "sum",
              summaryType: "sum",
              formatoptions: { defaultValue: ""},
              member: "sl"
          }
      ],
      yDimension : [
          { dataName: 'bz'                 },
          { dataName: 'xm'                 }
       ],
       rowTotals : false,
       colTotals : true,
  // caption: "Multiple aggregates"
  },
  {
     gridComplete : function()
     {
       // onGridComplete();
       grid.setGridWidth(window.innerWidth-8);
       grid.setGridHeight(document.documentElement.clientHeight-238);
       jQuery(window).bind('resize', function () {
            
           grid.setGridWidth(window.innerWidth-8);
           grid.setGridHeight(document.documentElement.clientHeight-238);
           console.log("resize",document.documentElement.clientHeight-238,window.innerWidth-8);
       }).trigger('resize');
     },
      width: 600,
      height: 400,
      rowNum: 10000,
      loadonce: true,
      viewrecords: true,
      shrinkToFit:false,
     // footerrow: true,
      useColSpanStyle: true, 
      rowList : ["10:10","20:20","30:30","10000:All"],
      pager: "#"+gridTableName+"Pager",
  });

};*/


/*
editbeforeSubmit=function(postdata, formid) {
  return [true,''];
};
editAfterSubmit=function(resp, postdata) {
  var obj=JSON.parse(resp.responseText);
  alert(obj.data.msg);
  return true;
};

addAfterSubmit=function(resp, postdata) {
       var obj=JSON.parse(resp.responseText);
       alert(obj.data.msg);
       return true;
};

deleteAfterSubmit=function(resp, postdata) {
  var obj=JSON.parse(resp.responseText);
  alert(obj.data.msg);
  return true;
};

gridLoadComplete=function(data)
{
 
};

onGridSelectRow=function(id)
{

};
*/


