Ext.define("MyApp.view.main.cpjkdsh.CpjkdlocView",{extend:"Ext.container.Container",xtype:"CpjkdlocView",
requires:["MyApp.view.main.showView.CpjkdListView"],controller:"CpjkdlocCtrl",layout:"fit",closeAction:"destroy",
items:[{xtype:"CpjkdListView"}]});