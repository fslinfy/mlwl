Ext.define('MyApp.model.CpkcModel', {
    extend: 'Ext.app.ViewModel',
    extend: 'Ext.data.Model',
    alias: 'viewmodel.CpkcModel',
    fields: [
        { name: 'id'   },
        { name: 'kcid', type: 'int' },
        { name: 'kcmxid', type: 'int' },
        { name: 'cpid', type: 'int' },
        { name: 'cdid', type: 'int' },
        { name: 'ckid', type: 'int' },
        { name: 'khid', type: 'int' },
        { name: 'bzid', type: 'int' },
        { name: 'mints', type: 'int' },
        { name: 'cdmc' },
        { name: 'ckmc' },
        { name: 'khmc' },
        { name: 'cpmc' },
        { name: 'bzmc' },
        { name: 'dh' },
        { name: 'lb' },
        
        { name: 'cpgg' },
        { name: 'cpph' },
        { name: 'jldw' },
        { name: 'area' },
        { name: 'cw' },
        { name: 'sm' },
        { name: 'kd', type: 'bool' },
        { name: 'kcsl', type: 'float' },
        { name: 'kczl', type: 'float' },
        { name: 'kcsl0', type: 'float' },
        { name: 'kczl0', type: 'float' },
        { name: 'kdsl', type: 'float' },
        { name: 'kdzl', type: 'float' },
        { name: 'sl', type: 'float' },
        { name: 'zl', type: 'float' },
        { name: 'tzsl', type: 'float' },
        { name: 'tzzl', type: 'float' },

        { name: 'jcsl', type: 'float' },
        { name: 'jczl', type: 'float' },

        { name: 'ccsl', type: 'float' },
        { name: 'cczl', type: 'float' },

        { name: 'czdj', type: 'float' },
        { name: 'czrq', type: 'date', dateFormat: 'Y-m-d' }
    ]
});


