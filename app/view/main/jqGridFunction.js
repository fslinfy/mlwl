

Ext.require('Ext.slider.*');
Ext.define('MyApp.view.main.jqGridFunction',{
	extend: 'Ext.Mixin'
});


creategrid=function(tableName){
  grid =jQuery("#"+tableName);
  grid.jqGrid({
  url:listUrl,
  mtype: 'POST',
  datatype: "json",
  postData:gridpostData,
  colModel:mycolModel,
  loadComplete:function(data)
  {
     lastSel=0;
     lastEditRow=0;
     that.gridLoadComplete(data);
  },
  onSelectRow : function(id) 
  {
      that.onGridSelectRow(id);
  },
  
  gridComplete : function()
  {
     that.onGridComplete();
  },
      autowidth: true,
      shrinkToFit:false,
      pager: "#"+tableName+"Pager",
      iconSet: "fontAwesome",
      autoencode: true,
      viewrecords: true,
      rownumbers:true,
      multiselect : false,
      rowNum: gridrowNum,
      sortname: gridSortName,
      sortorder: "desc",
      stripeRows: true,
      altRows: true,
      editurl :editUrl,
      altclass: "myAltRowClass",
      rowList: [10, 20,30, "10000:All" ],
      closeAfterAdd: true,
      closeAfterEdit: true,
      autoScroll: true, 
      grouping:gridgrouping,
      groupingView:gridgroupingView,
      footerrow : sumfooterrow,
      userDataOnFooter : sumfooterrow,
      navOptions: {
          del: false
      }
   });
if (paging){
   grid.jqGrid("navGrid","#"+tableName+"Pager",
   { edit: isEditEnable, add: isAddEnable, del:isDeleteEnable ,view: true, align: "left" ,search:isSearchEnable    },
   {
       recreateform : true,
       width : 500, 
       url:editUrl,  
       top: 30, 
       left:400,
       editCaption:"编辑记录",
       viewPagerButtons :false,
       closeOnEscape:true,
       model : true,
       closeAfterEdit : true,
       checkOnSubmit : false,
       beforeSubmit:function(postdata, formid) {
        return [true,''];
        //return editbeforeSubmit(postdata,formid);


       },
       afterSubmit:function(resp, postdata) {
       var obj=JSON.parse(resp.responseText);
         if (!obj.success)
         {
              alert("数据提交保存失败！");
              return false;
         }
         return   editAfterSubmit(resp, postdata);   
    }
       
   },

   {
       recreateform : true,
       width:500, 
       url:editUrl, 
       top: 30, 
       left:400, 
       addCaption : "新增记录",
       closeOnEscape:true,
       drag : true,
       model : true,
       closeAfterAdd : true,
       beforeSubmit:function(postdata, formid) {
        return [true,''];
        //return editbeforeSubmit(postdata,formid);
        

       },
       afterSubmit:function(resp, postdata) {
         var obj=JSON.parse(resp.responseText);
            if (!obj.success)
                  {
                alert("数据提交保存失败！");
                return false;
               }
          return that.addAfterSubmit(resp, postdata) ;
        }
      
   },
   {
       url:editUrl, 
       mtype:"POST",
       deleteCaption : "删除记录",
       closeOnEscape:true,
       closeAfterDelete : true,
       afterSubmit:function(resp, postdata) {
        var obj=JSON.parse(resp.responseText);
       if (!obj.success)
          {
                alert("删除提交保存失败！");
                return false;
          }
       return that.deleteAfterSubmit(resp, postdata);
      },

       
   },
   {groupOps:[{op:'AND',text:"所有"},{op:'OR',text:"任一"}],
       closeOnEscape:true,
       closeAfterSearch: true,
       closeAfterReset: true,
       multipleSearch: true,
       multipleGroup: false,
       showQuery: false
    }  
  )};


  grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "scroll" }); 
  
  if(isSearchEnable)  grid.jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, searchOperators: true });
  
  if (isExportEnable){
      grid.jqGrid('navButtonAdd','#'+tableName+'Pager',{
                   caption:"Export to Excel", 
                   onClickButton : function () { 
                     jqGridExportToCSV(grid);
                   } 
               }); 
      console.log('gridTableName',gridTableName,tableName);

      jQuery("#"+tableName+"Export").jqGrid({
         mtype: 'POST',
         datatype: "local",
         colModel:mycolModel,
         postData:gridpostData,
         rowNum: 100000,
         loadonce: true,
         hidden:true,
         grouping:gridgrouping,
         groupingView:gridgroupingView,
         footerrow : sumfooterrow,
         userDataOnFooter : sumfooterrow,
   
         loadComplete:function(data){
           if (exportload){
               var obj=data;
           if ((obj.success) && (obj.records>0) ){
               exportload=false;
               jQuery("#"+gridTableName+"Export").jqGrid("exportToCsv",{
                           includeLabels : true,
                           includeGroupHeader : true,
                           includeFooter: true,
                           fileName :exportfilename,
                           maxlength : 40 

                      })
           }
           }
       }
       });
    };
   
       var d=document.getElementById("maintabpanel");
       if (d){
          d.style.top="37px";
          d.style.left="0px";
       }
      
      jQuery(window).bind('resize', function () {
        console.log("resize");
        gridresize();
          //grid.setGridWidth(window.innerWidth-4);
          //grid.setGridHeight(document.documentElement.clientHeight-220);
      }).trigger('resize');
      gridresize();
      //grid.setGridWidth(window.innerWidth-4);
      //grid.setGridHeight(document.documentElement.clientHeight-220);



};
//*********************************************************************************************************** */
gridresize=function(){
  grid.setGridWidth(window.innerWidth-4);
  if(isSearchEnable)
  {
    grid.setGridHeight(document.documentElement.clientHeight-fheight);
  }else{
    grid.setGridHeight(document.documentElement.clientHeight-fheight-20);
  }
};

jqGridAddRow=function(jqgrid){
    //jQuery("#gridTable")
    jqgrid.jqGrid('editGridRow', "new", {
          recreateform : true,
          width:500, 
          top: 30, 
          left:400, 
          closeOnEscape:true,
          drag : true,
          model : true,
          closeAfterAdd : true,
     });
  };
  jqGridDeleteRow=function(jqgrid){
  //   console.log("start edit!");
     var gr=  jqgrid.jqGrid('getGridParam', 'selrow' );
      if (gr == null)
      {
        alert("请选择要删除的行!");
        return; 
      }
      if (gr.indexOf("jqg") >-1){
        alert("暂时不能删除此行!");
        return ;
      }
      jqgrid.jqGrid('delGridRow',gr,{
            reloadAfterSubmit :false,
            closeAfterDelete : true
      } 
      );
    };
  
    jqGridEditRow=function(editgrid ){
        //var editgrid=jQuery("#"+editname);
           var rowKey = editgrid.jqGrid('getGridParam', 'selrow');
         //  console.log("lastsel key",rowKey,'int',parseInt(rowKey) );
          if (rowKey == null ){
            alert("请选择要编辑的行!");
            return ;
          }
          if (rowKey.indexOf("jqg") >-1){
            alert("暂时不能编辑此行!");
            return ;
          }
          //jQuery("#gridTable").
          editgrid.editGridRow(rowKey, {
                  closeAfterEdit: true,
                  viewPagerButtons :false,
                  recreateform : true,
                  width : 500, 
                  top: 30, 
                  left:400,
                  viewPagerButtons :false,
                  closeOnEscape:true,
                  model : true,
                  closeAfterEdit : true,
                  checkOnSubmit : false,
                  beforeSubmit:function(postdata, formid) {
                    return [true,''];
                    //return editbeforeSubmit(postdata,formid);
                    
            
                   },
                  afterSubmit:function(resp, postdata) {
                    var obj=JSON.parse(resp.responseText);
                      if (!obj.success)
                      {
                           alert("数据提交保存失败！");
                           return false;
                      }
                      return   that.editAfterSubmit(resp, postdata);   
                  }
           });  
        };
  
  
  jqGridExportToCSV=function (jqgrid ) {
          console.log("jqGridExportToCSV",jqgrid);        
          var rowIds = grid.getDataIDs();
            
              if (rowIds.length > 0) {
                  exportload=true;
                  var filt=grid.getGridParam("postData").filters;
                  var postData=grid.getGridParam("postData");
                  postData['export']="1";
                  console.log(postData,grid.getGridParam("url"),mycolModel,postData);
                      if (filt==undefined) filt="";
                      $("#"+gridTableName+"Export").jqGrid('setGridParam',{
                          url:grid.getGridParam("url"),
                          sortname:postData['sidx'],
                          sortorder:postData['sord'],
                          footerrow :grid.getGridParam("footerrow"),
                          userDataOnFooter :grid.getGridParam("userDataOnFooter"),
                    
                          grouping:grid.getGridParam("grouping"),
                          groupingView:grid.getGridParam("groupingView"),
                          groupHeaders:grid.getGridParam("groupHeaders"),
                          datatype:'json',
                          colModel:mycolModel,
                          postData:postData
                          }).trigger('reloadGrid'); 
                         
              }
      
};

initFormat=function ( cellvalue, options, rowObject ){  
  if (cellvalue==0) return "";
  return cellvalue;  
}  


initDateSearch=function(elem) {
  setTimeout(function () {
      $(elem).datepicker({
          dateFormat: "dd-M-yy",
          autoSize: true,
          changeYear: true,
          changeMonth: true,
          showWeek: true,
          showButtonPanel: true
      });
  }, 100);
};
editableInAddForm=function (options) {
  if (options.mode === "addForm") {
      return true;
  }
  if (options.mode === "editForm") {
      return "disabled";
  }
  return false; // don't allows editing in other editing modes
};

showMsg=function(pid){
var idSelector = "#alertmod_" +pid;
  $.jgrid.viewModal(idSelector, {
      gbox: "#gbox_" + $.jgrid.jqID(pid),
      jqm: true
  });
  $(idSelector).position({
      of: "#" + $.jgrid.jqID(pid),
      at: "center",
      my: "center"
  });
  $(idSelector).find(".ui-jqdialog-titlebar-close").focus();
};


onBtnHelpClick=function(button,e,options){
  console.log('help');
};

onSelectKhbmView=function (record) {
  treeSelect('khmc', that, '', that.viewname, true);
  return false;
};
khmcTriggerClick= function (record) {
//   that.onBtnQueryClick();
  return false;
};

onSelectCpbmView=function (record) {
  treeSelect('cpmc', that, '', that.viewname, true);
  return false;
};
cpmcTriggerClick= function (record) {
//   that.onBtnQueryClick();
  return false;
};


onSelectCkbmView= function (record) {
  treeSelect('ckmc', that, '', that.viewname, true);
  return false;
};
ckmcTriggerClick= function (record) {
//  that.onBtnQueryClick();
  return false;
};
onBtnExportClick=function(button,e,options){
  console.log("jqGridExportToCSV    onBtnExportClick");
  jqGridExportToCSV(grid);
  return false
};
onBtnNewClick=function(rs){
        jqGridAddRow(grid);
};
onBtnDeleteClick=function(button,e,options){
        jqGridDeleteRow(grid);
};
onBtnEditClick=function(button,e,options){
        jqGridEditRow(grid);
};

var jeFormat=function(cellValue, options, rowObject){
  if (cellValue == 0) {
      return "";
  }
  else {
      return Ext.util.Format.number(cellValue, '0.00');
  }
 };

var zlFormat=function(cellValue, options, rowObject){
  if (cellValue == 0) {
      return "";
  }
  if (Math.floor(cellValue)==cellValue){
    return Ext.util.Format.number(cellValue, '0');
  }

  if (Math.floor(cellValue*10)==cellValue*10){
    return Ext.util.Format.number(cellValue, '0.0');
  }
  if (Math.floor(cellValue*100)==cellValue*100){
    return Ext.util.Format.number(cellValue, '0.00');
  }
  return Ext.util.Format.number(cellValue, '0.000');
};



function restorerow() {
  if (lastEditRow==0) return true;
  grid.jqGrid('restoreRow',lastEditRow);
  lastEditRow=0;
};


function checksave(result) {
    if (result.responseText == "") {
      alert("Update is missing!");
      return false;
    }
    var obj=JSON.parse(result.responseText);
 //   console.log("obj:",obj,obj.success);
    if (obj.success){
      lastEditRow=0;
      alert(obj.data.msg);
      return true;
  }
  alert(obj.data.msg);
  return false;
};
function checkdelete(result) {
  if (result.responseText == "") {
    alert("Update is missing!");
    return false;
  }
  var obj=JSON.parse(result.responseText);
  if (!obj.success){
    alert(obj.data.msg);
    return false;
  }
  lastEditRow=0;
  alert(obj.data.msg);
  return true;
};



