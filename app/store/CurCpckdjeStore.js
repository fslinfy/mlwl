Ext.define("MyApp.store.CurCpckdjeStore",{extend:"Ext.data.Store",alias:"store.CurCpckdjeStore",
model:"MyApp.model.CpckdjeModel",autoLoad:true,proxy:{type:"sessionstorage",id:"CurCpckdjeModel"}});