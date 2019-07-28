Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdlocView', {
    extend: 'Ext.container.Container',
    xtype: 'wxCpgfdlocView',
    requires: [
        'MyApp.view.main.showView.CpgfdListView'
        ,"MyApp.view.main.wxcpgfgl.wxCpgfdshShowView"
        // ,"MyApp.view.main.showView.CpgfdShowView"
       //, 'MyApp.store.CurCpgfdjeStore'
       // ,'MyApp.store.CurCpgfdmxStore'
       // , 'MyApp.store.CpgfdmxStore'

    ],
    controller: 'wxCpgfdlocCtrl',
    layout: 'fit',
    closeAction: 'destroy',
    items: [{ xtype: "CpgfdListView" }]
});
