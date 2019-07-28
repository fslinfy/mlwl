Ext.define("MyApp.view.main.cpghgl.CpghdckshView",{
    extend:"Ext.container.Container",
    xtype:"CpghdckshView",
    requires:[
    "MyApp.view.main.showView.CpghdListView"
    ,"MyApp.view.main.cpghgl.CpghdshShowView"
    ,'MyApp.view.main.cpghgl.CpghdghshStore'
      , 'MyApp.store.CpghdcwStore'
],
    controller:"CpghdckshCtrl",
    layout:"fit",
    closeAction:"destroy",
    items:[
        {xtype:"CpghdListView"}
    ]
});