Ext.define("MyApp.store.CurCpgfdjeStore",{
    extend:"Ext.data.Store",
    alias:"store.CurCpgfdjeStore",
    model:"MyApp.model.CpgfdjeModel",
    autoLoad:true,
    proxy:{type:"localstorage",id:"CurCpgfdjeModel"}
});