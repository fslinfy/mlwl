Ext.define("MyApp.store.CommodityTypeTreeStore",{extend:"Ext.data.TreeStore",alias:"store.files",type:"tree",proxy:{type:"ajax",url:"http://localhost/mysql_action.php?act\x3dtypetreelist"},root:{expanded:true,draggable:false},autoLoad:true});