Ext.define("MyApp.view.main.cpghkdgl.CpghdmfhView",
    {
        extend: "Ext.container.Container",
        xtype: "CpghdmfhView",
        requires: [
            "MyApp.view.main.showView.CpghdListView"
        ],
        controller: "CpghdmfhCtrl",
        layout: "fit",
        closeAction: "destroy",
        items: [
            {
                xtype: "CpghdListView"
            }
        ]
    });