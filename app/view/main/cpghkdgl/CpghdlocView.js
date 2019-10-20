Ext.define("MyApp.view.main.cpghkdgl.CpghdlocView",
    {
        extend: "Ext.container.Container",
        xtype: "CpghdlocView",
        requires: [
            "MyApp.view.main.showView.CpghdListView"
        ],
        controller: "CpghdlocCtrl",
        layout: "fit",
        closeAction: "destroy",
        items: [
            {
                xtype: "CpghdListView"
            }
        ]
    });