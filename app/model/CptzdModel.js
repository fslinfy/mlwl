Ext.define("MyApp.model.CptzdModel",{
    extend:"Ext.app.ViewModel",
    extend:"Ext.data.Model",
    alias:"viewmodel.CptzdModel",
    fields:[
    {name:"id"},
    {name:"tzid"},{name:"tzdh"},{name:"khid",type:"int"},{name:"ckid",type:"int"},{name:"khmc"},{name:"ckmc"},{name:"newkhid",type:"int"},
    {name:"newkhmc"},{name:"cgy"},{name:"cwsh"},{name:"czy"},{name:"shr"},{name:"cnote"},{name:"tzsl",type:"float"},{name:"tzzl",type:"float"},
    {name:"tzje",type:"float"},{name:"xjje",type:"float"},{name:"tzrq",type:"date",dateFormat:"Y-m-d"},
    {name:"cwshrq",type:"date",dateFormat:"Y-m-d h:ia"},{name:"shrq",type:"date",dateFormat:"Y-m-d h:ia"},{name:"ztbz",type:"int"},
    {name:"jekh",type:"bool"},{name:"delbz",type:"bool"},{name:"shbz",type:"bool"}
]});