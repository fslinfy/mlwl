
Ext.define('MyApp.model.CpjcworkmxModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpjcworkmxModel',
    fields: [
    { name: 'id', type: 'int' },
    { name: 'rq', type: 'date', dateFormat: 'Y-m-d' },
    { name: 'mxid', type: 'int' },
    { name: 'jeid', type: 'int' },
    { name: 'jclb' },
    { name: 'dh' },
    { name: 'khmc' },
    { name: 'khid', type: 'int' },
    { name: 'cpmc' },
    { name: 'cpid', type: 'int' },
    { name: 'bzmc' },
    { name: 'bzid', type: 'int' },
    { name: 'jldw' },
    { name: 'jcsl', type: 'float' },
    { name: 'jczl', type: 'float' },
    
    { name: 'sl', type: 'float' },
    { name: 'dj', type: 'float' },
    { name: 'je', type: 'float' }, 
    { name: 'xjje', type: 'float' },
    
    { name: 'dw' },
    { name: 'gs' },
    { name: 'cg' },
    { name: 'byg' },
    { name: 'zljs', type: 'bool' }
   
    ]
});



