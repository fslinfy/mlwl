Ext.define("MyApp.model.CommodityModel",
    {
        extend: "Ext.app.ViewModel",
        extend: "Ext.data.Model",
        alias: "viewmodel.CommodityModel",
        fields: [{ name: "id", type: "int" }, { name: "S_id", type: "int" }, { name: "S_code" },
        { name: "S_name" }, { name: "CT_name" }, { name: "Weight_Unit" }, { name: "Quantity_Unit" },
         { name: "Size" }, { name: "Rate", type: "int" }, { name: "Active", type: "bool" }]
    });