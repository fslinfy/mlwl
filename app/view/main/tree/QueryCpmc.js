Ext.define("MyApp.view.main.tree.QueryCpmc",{extend:"Ext.container.Container",alias:"widget.QueryCpmc",
itemId:"QueryCpmc",layout:"hbox",defaults:{border:0,cls:"x-btn-text-icon details",disabled:false},
items:[{labelWidth:60,xtype:"triggerfield",fieldLabel:"\u5546\u54c1\u540d\u79f0",name:"cpmc",
itemId:"textQueryCpmc",bind:"{cpmc}",margin:"1 0 1 10",flex:1,triggerCls:"x-form-clear-trigger",
onTriggerClick:function(){this.reset();
    that.getView().getViewModel().set("cpid",0);
//    that.cpmcTriggerClick()
}},{xtype:"button",itemId:"btnQueryCpmc",margin:"1 5 1 0",text:"...",width:30},{xtype:"textfield",hidden:true,width:40,name:"cpid",itemId:"textQueryCpid",bind:"{cpid}"}]});