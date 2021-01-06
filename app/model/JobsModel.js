Ext.define("MyApp.model.JobsModel",{extend:"Ext.app.ViewModel",extend:"Ext.data.Model",alias:"viewmodel.JobsModel",
fields:[
    {name:"id",type:"int"},
    {name:"L_id",type:"int"},
    {name:"E_code"},
    {name:"Jobs"},
    {name:"JobsName"},
    { name: 'Tcdj', type: 'float' },
    { name: 'Tcdj1', type: 'float' }

]});