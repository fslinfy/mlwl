Ext.define("MyApp.store.CpghdmxStore", 
{ extend: "Ext.data.Store", alias: "store.CpghdmxStore", model: "MyApp.model.CpghdmxModel", 
proxy: { type: "ajax", api: { read: sys_ActionPHP + "?act=Cpghdmxlist_pc" }, 
actionMethods: { read: "GET" },
 extraParams: { userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))), ghid: 0, khid: sys_customer_id },
 reader: { type: "json", rootProperty: "rows" } } });