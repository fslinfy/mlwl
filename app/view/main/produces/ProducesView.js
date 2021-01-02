Ext.define("MyApp.view.main.produces.ProducesView",{extend:"Ext.grid.Panel",xtype:"ProducesView",title:"Produces",
requires:["MyApp.store.ProducesStore","MyApp.view.main.QueryToolbarView"],id:"ProducesGrid",plugins:["cellediting","gridfilters"],
controller:"ProducesCtrl",store:{type:"ProducesStore"},closeAction:"destroy",tbar:[{xtype:"container",flex:1,layout:"hbox",
items:[{xtype:"container",flex:1,layout:"hbox",
items:[
    {
        xtype: 'displayfield',
        itemId:"PageTitle",
        value:'产地资料维护',
        style: {
           'font-size':'16px',
           'font-weight': 'bold',
            margin: '5px 30px 0 0',
            color:"#000"  
        },
       fieldCls:'biggertext',
        hideLabel: true
        },

    {labelWidth:30,xtype:"triggerfield",fieldLabel:"\u8fc7\u6ee4",itemId:"FilterField",flex:1,triggerCls:"x-form-clear-trigger",onTriggerClick:function(){this.reset()}}]},{xtype:"QueryToolbarView"}]}],columns:[{text:"\u4ea7\u5730\u4ee3\u7801",width:80,dataIndex:"P_code",align:"left",editor:{allowBlank:false,regex:/(^[0-9A-Z]{1,5}$)/,type:"string"}},{text:"\u4ea7\u5730\u540d\u79f0",dataIndex:"P_name",flex:1,align:"left",filter:{type:"string",itemDefaults:{emptyText:"Search for\u2026"}},editor:{allowBlank:false,type:"string"}},{text:"\u62fc\u97f3\u7801",dataIndex:"Py_code",flex:1,align:"left",filter:{type:"string",itemDefaults:{emptyText:"Search for\u2026"}},editor:{allowBlank:true,type:"string"}},{text:"\u4ea7\u5730\u5730\u5740",dataIndex:"Address",flex:1,align:"left",filter:{type:"string",itemDefaults:{emptyText:"Search for\u2026"}},editor:{allowBlank:true,type:"string"}},{text:"\u8054\u7cfb\u7535\u8bdd",dataIndex:"Tel",flex:1,align:"left",editor:{allowBlank:true,type:"string"}},{xtype:"checkcolumn",width:90,text:"\u6d3b\u8dc3",dataIndex:"Active"}],listeners:{select:"onItemSelected"}});