Ext.define('MyApp.view.main.cpgfgl.CpgfdView', {
  extend: 'Ext.container.Container',
  xtype: 'CpgfdView',
  requires: [
    'MyApp.view.main.showView.CpgfdListView'
    , 'MyApp.view.main.cpgfgl.CpgfdEdit'
    
  ],
  controller: 'CpckdCtrl',
  layout: 'fit',
  closeAction: 'destroy',
  items: [{ xtype: "CpxsdListView" }]
});
