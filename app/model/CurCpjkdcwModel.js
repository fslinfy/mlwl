Ext.define("MyApp.model.CurCpjkdcwModel",{extend:"Ext.app.ViewModel",extend:"Ext.data.Model",alias:"viewmodel.CurCpjkdcwModel",
fields:[{name:"id"},{name:"mxdh"},{name:"cw"},{name:"cpph"},{name:"dw"},{name:"sm"},{name:"sl",type:"float"},
{name:"zl",type:"float"},{name:"czdj",type:"float"}],proxy:{type:"sessionstorage",id:"CurCpjkdcwModel"}});