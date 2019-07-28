Ext.define("MyApp.store.CpghdjeStore",{extend:"Ext.data.Store",alias:"store.CpghdjeStore",
model:"MyApp.model.CpghdjeModel",proxy:{type:"ajax",api:{read:sys_ActionPHP+"?act=Cpghdjelist_pc"},
actionMethods:{read:"GET"},
extraParams:{userInfo:base64encode(Ext.encode(obj2str(sys_userInfo))),
    ghid:0,p_l_id:sys_location_id},reader:{type:"json",rootProperty:"rows"}}});