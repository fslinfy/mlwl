Ext.define("MyApp.view.main.cwgl.Cwjetj_View2",
{
extend: 'Ext.panel.Panel',
xtype:"Cwjetj_View2",
title:"Cwjetj",
reference: 'popupgridwindow',
itemId:"popupgridwindow",
requires:[
    "MyApp.view.main.QueryToolbarView"
    ,"MyApp.view.main.jqGridFunction"
 //   ,"MyApp.view.main.cwgl.Cwjetj_Grid"
    ,'MyApp.view.main.tree.QueryKhmc'
    ,'MyApp.view.main.tree.QueryCkmc'
    

],
//id:"Cwjetj_Grid",

controller:"Cwjetj_Ctrl2",

closeAction:"destroy",

viewModel: {
    data: {
        'khmc': '', 'khid': 0,
        'ny': (new Date()).getFullYear(), 'yu': (new Date()).getMonth()+1,
        'ckmc': '', 'ckid': sys_location_id,
        'cpmc': '', 'cpid': 0
    }
},


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
                margin: '5px 30px 0 0px',
                color:"#000"  
            },
           fieldCls:'biggertext',
            hideLabel: true
            },
                    {
                        xtype: "numberfield",
                        name: 'ny',
                        labelWidth: 30,
                        fieldLabel: '年度',
                        bind: "{ny}",
                        hideTrigger: false,
    
                        margin: '1 0 1 1',
                        width: 120,
                        minValue: 2018,
                        maxValue: 9999,
                        decimalPrecision: 0
                    },
    
                    {
                        xtype: "numberfield",
                        name: 'yu',
                        labelWidth: 30,
                        fieldLabel: '月度',
                        bind: "{yu}",
                        hideTrigger: false,
                        margin: '1 0 1 10',
                        width: 120,
                        minValue: 1,
                        maxValue: 12,
                        decimalPrecision: 0
                    },
                    {
                        xtype: 'QueryKhmc', flex: 1,//                    hidden:  (sys_customer_id > 0)
                    },
                    {
                        xtype: 'QueryCkmc', flex: 1//,        hidden: (sys_location_id > 0)
                    }
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
        html: '<div style="width:100%;height:100%;padding:0 1 0 1;" id="griddivid"> <table id="'+gridTableName+'" style="width:100%;"></table><div id="'+gridTableName+'Pager"></div></br></br></br></br></br></br><table style="display:none;" id="'+gridTableName+'Export"></table></div>'
    }],
    listeners: {
        afterrender: function(){
         //   console.log("gridTableName",gridTableName);
            creategrid(gridTableName);
        },
    }
});