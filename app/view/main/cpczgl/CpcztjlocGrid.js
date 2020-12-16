Ext.define('MyApp.view.main.cpczgl.CpcztjlocGrid', {
    extend: 'Ext.Mixin'
});

/*
onGridComplete=function()
{
  console.log("CpcztjlocGrid onGridComplete");
  if (!setGroupHeaders){
    jQuery("#"+gridTableName).jqGrid('setGroupHeaders', {
        //useColSpanStyle: false, 
        useColSpanStyle: true,   
        groupHeaders:[
        {startColumnName: 'days', numberOfColumns: 3, titleText: '仓租明细'},
        {startColumnName: 'byje', numberOfColumns: 2, titleText: '装卸作业'}
        ]  
      });
      jQuery("#"+gridTableName+"Export").jqGrid('setGroupHeaders', {
        useColSpanStyle: false, 
        groupHeaders:[
          {startColumnName: 'days', numberOfColumns: 3, titleText: '仓租明细'}, 
          {startColumnName: 'byje', numberOfColumns: 2, titleText: '装卸作业'}
        ]  
      });
      setGroupHeaders=true;
    };
};
*/
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
