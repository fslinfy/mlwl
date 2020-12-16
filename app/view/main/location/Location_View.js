Ext.define("MyApp.view.main.location.Location_View",
{
extend: 'Ext.panel.Panel',
xtype:"Location_View",
title:"Location",
reference: 'popupgridwindow',
itemId:"popupgridwindow",
requires:[
    "MyApp.store.LocationStore",
    'MyApp.store.PackingStore',
    'MyApp.model.PackingModel',
    'MyApp.view.main.location.PackingEditView',
    "MyApp.view.main.QueryToolbarView",
    "MyApp.view.main.location.LocationGrid","MyApp.view.main.jqGridFunction"
],
id:"LocationGrid",
//plugins:["cellediting","gridfilters"],
controller:"Location_Ctrl",
//store:{type:"LocationStore"},
closeAction:"destroy",

tbar:[
    {xtype:"container",flex:1,layout:"hbox",
    items:[
      {xtype:"container",flex:1,layout:"hbox",
          items:[
            {
            xtype: 'displayfield',
            itemId:"PageTitle",
            value:PageTitleName,
            style: {
               'font-size':'16px',
               'font-weight': 'bold',
                margin: '5px 30px 0 0',
                color:"#000"  
            },
           fieldCls:'biggertext',
            hideLabel: true
            }
            /*,
            {labelWidth:30,xtype:"triggerfield",fieldLabel:"\u8fc7\u6ee4",itemId:"FilterField",id:"FilterField",flex:1,
            triggerCls:"x-form-clear-trigger", onTriggerClick:function(){this.reset()}}*/
            ]
      },
      {xtype:"QueryToolbarView"}
    ]
    }
],
items: [
   {
        xtype: 'panel',
        id: 'gridPanelId',
        bodyStyle:{"border":1}, 
        reference: 'gridPanelId',
        itemId: 'gridPanelId',
        layout: 'fit' ,
        bodyPadding: 0,
        html: '<div style="width:100%;height:100%;padding:0 1 0 1;" id="griddivid"> <table id="'+gridTableName+'" style="width:100%;"></table><div id="'+gridTableName+'Pager"></div><table  style="display:none;"  id="'+gridTableName+'Export"></table></div>'
    }],
    listeners: {
        afterrender: function(){
            creategrid(gridTableName);
      
        },
    }
});