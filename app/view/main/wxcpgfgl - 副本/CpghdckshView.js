Ext.define("MyApp.view.main.cpghgl.CpghdckshView",{
    extend:"Ext.container.Container",
    xtype:"CpghdckshView",
    requires:[
    "MyApp.view.main.showView.CpghdListView"
    ,"MyApp.view.main.cpghgl.CpghdshShowView"
    ,'MyApp.view.main.cpghgl.CpghdghshStore'
    //,'MyApp.model.CpghdmxModel'
    //,'MyApp.model.CpghdModel'
    // , 'MyApp.store.CpghdjeStore'
      , 'MyApp.store.CpghdcwStore'
   // , 'MyApp.store.CurCpghdcwStore'
   // , 'MyApp.store.CurCpghdjeStore'
],
    controller:"CpghdckshCtrl",
    layout:"fit",
    closeAction:"destroy",
    items:[
        {xtype:"CpghdListView"}
    ]
});