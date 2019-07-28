Ext.define('MyApp.view.main.wxcpgfgl.wxCpgfdView', {
  extend: 'Ext.container.Container',
  xtype: 'wxCpgfdView',
  requires: [
    'MyApp.view.main.showView.wxCpgfdListView'
    //, 'MyApp.store.wxCurCpgfdmxStore'
  ],
  controller: 'wxCpgfdCtrl',
  layout: 'fit',
  closeAction: 'destroy',
  items: [{ xtype: "wxCpgfdListView" }]
});
