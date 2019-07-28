Ext.define("MyApp.store.CurCpghdjeStore",{
    extend:"Ext.data.Store",
    alias:"store.CurCpghdjeStore",
    model:"MyApp.model.CpghdjeModel",
    autoLoad:true,
    proxy:{type:"localstorage",id:"CurCpghdjeModel"}
});