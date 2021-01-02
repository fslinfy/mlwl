Ext.define("MyApp.view.main.worker.WorkerGridView",{extend:"Ext.grid.Panel",alias:"widget.WorkerGridView",
itemId:"WorkerGridView",closeAction:"destroy",requires:["MyApp.store.WorkerStore","MyApp.view.main.QueryToolbarView"],
plugins:["cellediting","gridfilters"],store:{type:"WorkerStore"},tbar:[{xtype:"container",flex:1,layout:"hbox",
items:[{xtype:"container",flex:1,layout:"hbox",items:[
    {
        xtype: 'displayfield',
        itemId:"PageTitle",
        value:'工作人员资料',
        style: {
           'font-size':'16px',
           'font-weight': 'bold',
            margin: '5px 30px 0 0',
            color:"#000"  
        },
       fieldCls:'biggertext',
        hideLabel: true
        },
    {labelWidth:30,xtype:"triggerfield",fieldLabel:"\u8fc7\u6ee4",itemId:"FilterField",flex:1,triggerCls:"x-form-clear-trigger",onTriggerClick:function(){this.reset()}}]},{xtype:"QueryToolbarView"}]}],columns:[{text:"\u4eba\u5458\u59d3\u540d",dataIndex:"Name",flex:1,align:"left",filter:{type:"string",itemDefaults:{emptyText:"Search for\u2026"}},editor:{allowBlank:false,type:"string"}},{text:"\u7535\u8bdd",dataIndex:"Tel",flex:1,align:"left",filter:{type:"string",itemDefaults:{emptyText:"Search for\u2026"}},editor:{allowBlank:false,type:"string"}},{xtype:"checkcolumn",width:90,text:"\u6d3b\u8dc3",dataIndex:"Active"}],listeners:{select:"onItemSelected"}});