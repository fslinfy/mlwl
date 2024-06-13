Ext.define("MyApp.model.ProducesModel", {
    extend: "Ext.app.ViewModel",
    extend: "Ext.data.Model",
    alias: "viewmodel.ProducesModel",
    fields: [{
        name: "id",
        type: "int"
    }, {
        name: "E_code"
    }, {
        name: "P_code"
    }, {
        name: "Py_code"
    }, {
        name: "P_name"
    }, {
        name: "Address"
    }, {
        name: "Tel"
    }, {
        name: "Active",
        type: "bool"
    }]
});