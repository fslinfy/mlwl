Ext.define("MyApp.model.CpkcmxModel", { 
    extend: "Ext.app.ViewModel", 
    extend: "Ext.data.Model", 
    alias: "viewmodel.CpkcmxModel", 
    fields: [
        { name: "id" }, 
        { name: "mints", type: "int" }, 
        { name: "area" }, 
        { name: "dw" }, 
        { name: "cw" }, 
        { name: "sm" }, 
        { name: "sl", type: "float" }, 
        { name: "zl", type: "float" }, 
        { name: "czdj", type: "float" },
         { name: "czrq", type: "date", dateFormat: "Y-m-d" }
        ]
     });