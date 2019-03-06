Ext.define('MyApp.view.main.cpgfgl.CpgfdlocView', {
  extend: 'Ext.container.Container',
  xtype: 'CpgfdlocView',
  requires: [
    'MyApp.view.main.showView.CpgfdListView'
    , 'MyApp.store.CurCpgfdmxStore'
  ],
  controller: 'CpgfdlocCtrl',
  layout: 'fit',
  closeAction: 'destroy',
  items: [{ xtype: "CpgfdListView" }]
});
