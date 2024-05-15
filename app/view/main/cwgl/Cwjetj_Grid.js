Ext.define("MyApp.view.main.cwgl.Cwjetj_Grid", {
  extend: "Ext.Mixin",
});
/*
onGridComplete=function()
{
  //  console.log("onGridComplete");
  if (!setGroupHeaders){
  setGroupHeaders=true;
  if (jelb==0){
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
    if (jelb==1){
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
        setGroupHeaders=true;
      };
  
      if (jelb==2){
        jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
            //useColSpanStyle: false, 
            useColSpanStyle: true,   
            groupHeaders:[
            {startColumnName: 'byxjje', numberOfColumns: 5, titleText: '现收金额'}
            
            ]  
          });
          jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
            useColSpanStyle: false, 
            groupHeaders:[
              {startColumnName: 'byxjje', numberOfColumns: 5, titleText: '现收金额'}
            ]  
          });
          setGroupHeaders=true;
        };
      }
  
  
};
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
