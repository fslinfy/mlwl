Ext.define("MyApp.store.CurCpjkdcwStore",{extend:"Ext.data.Store",alias:"store.CurCpjkdcwStore",model:"MyApp.model.CpjkdcwModel",autoLoad:true,proxy:{type:"sessionstorage",id:"CurCpjkdcwModel"}});