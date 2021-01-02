Ext.define("MyApp.view.main.worker.WorkerView",{extend:"Ext.panel.Panel",xtype:"WorkerView",
requires:["MyApp.view.main.worker.WorkerGridView"],controller:"WorkerCtrl",closeAction:"destroy",
items:[{xtype:"panel",frame:true,layout:"border",defaults:{collapsible:true,split:true,border:1},
items:[{title:"\u5206\u7c7b",region:"west",itemId:"LeftTree",width:125,singleExpand:true,minWidth:100,maxWidth:250,
xtype:"treepanel",rootVisible:false,draggable:false,lines:true,useArrows:true,root:{text:"\u5168\u90e8",
children:[{text:"\u642c\u8fd0",id:1,leaf:true},{text:"\u673a\u68b0",id:2,leaf:true},{text:"\u5176\u5b83",id:3,leaf:true}],
expanded:true}},{xtype:"WorkerGridView",collapsible:false,region:"center"}]}]});