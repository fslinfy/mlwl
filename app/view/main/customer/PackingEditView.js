Ext.define("MyApp.view.main.customer.PackingEditView",{extend:"Ext.window.Window",xtype:"formpackingwindow",reference:"popuppackingWindow",itemId:"PackingEditView",bind:{title:"{title}"},width:"95%",height:700,minWidth:600,minHeight:400,layout:"fit",closeAction:"destroy",bodyPadding:5,plain:true,maximizable:true,modal:true,items:[{xtype:"form",reference:"windowForm",layout:{type:"vbox",align:"stretch"},autoScroll:true,border:false,items:[{xtype:"grid",flex:1,border:1,store:{type:"PackingStore"},reference:"packingmxGrid",plugins:["cellediting"],enableHdMenu:false,enableColumnHide:false,collapsible:false,columnLines:true,animCollapse:false,itemId:"packingmxGrid",margin:"0 0 0 0",columns:[{text:"\u4ee3\u7801",width:50,dataIndex:"PS_code",align:"left",sortable:false},{text:"\u5305\u88c5\u540d\u79f0",dataIndex:"PS_name",flex:3,align:"left",sortable:false},{text:"\u6570\u91cf\u5355\u4f4d",dataIndex:"Quantity_Unit",flex:1,align:"left",sortable:false},{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u8f6c\u6362\u7cfb\u6570",dataIndex:"Rate",flex:1,align:"left",sortable:false},{text:"\u91cd\u91cf\u5355\u4f4d",dataIndex:"Weight_Unit",flex:1,align:"left",sortable:false},{text:"\u4e34\u65f6\u4ed3\u4ed3\u79df\u5355\u4ef7",columns:[{text:"180\u5929\u5185",columns:[{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u4e0d\u5206\u6279\u53f7",dataIndex:"Czdj",flex:1,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}},{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u5206\u6279\u53f7",dataIndex:"Phdj",flex:1,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}}]},{text:"180\u5929\u4ee5\u540e",columns:[{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u4e0d\u5206\u6279\u53f7",dataIndex:"Czdj2",flex:1,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}},{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u5206\u6279\u53f7",dataIndex:"Phdj2",flex:1,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}}]},{text:"\u6700\u5c0f",columns:[{xtype:"numbercolumn",align:"center",format:"00",text:"\u5929\u6570",dataIndex:"mints",width:50,align:"center",sortable:false,editor:{type:"numberfield",decimalPrecision:0,align:"right",allowBlank:true,minValue:0,maxValue:999}}]}]},{text:"\u56fa\u5b9a\u4ed3",columns:[{text:"\u6bcf\u6708\u5e73\u65b9",columns:[{xtype:"numbercolumn",align:"right",format:"00000.00",width:70,text:"\u5355   \u4ef7",dataIndex:"Pfdj",align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}}]}]},{text:"\u5176\u5b83\u8d39\u7528\u5355\u4ef7",columns:[{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u88c5\u5378",dataIndex:"Bydj",width:70,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}},{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u7834\u5305\u4fee\u590d",dataIndex:"Pbdj",flex:1,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}},{xtype:"numbercolumn",align:"right",format:"00000.00",text:"\u8fc7\u6237",dataIndex:"Ghdj",width:70,align:"left",sortable:false,editor:{type:"numberfield",decimalPrecision:3,align:"right",allowBlank:true,minValue:0,maxValue:9999.99}}]},{flex:1,text:"\u91cd\u91cf\u6838\u7b97",sortable:false,dataIndex:"Weight_Status",renderer:function(val){if(val)return"\u91cd\u91cf\u6838\u7b97";else return""}}]}]}],buttons:["-\x3e",{text:"\u4fdd \u5b58",icon:"images/right.gif",itemId:"btnpackingSave"},{text:"\u653e \u5f03",icon:"images/close.gif",handler:function(){this.up("window").hide()}}]});