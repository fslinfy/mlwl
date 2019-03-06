Ext.define('MyApp.view.main.commodityType.CommodityTypeView', {
	extend: 'Ext.panel.Panel',
	xtype: 'CommodityTypeView',
	
	requires: ['MyApp.view.main.commodityType.CommodityTypeGridView'
	,'MyApp.view.main.commodityType.TypeTreeView'
	,'MyApp.view.main.commodityType.CommodityTypeEdit'
	 , 'Ext.window.Window'
],
	controller: 'CommodityTypeCtrl',
	
	items: [{
		xtype: 'panel',
		layout: 'border',
		defaults: {
			collapsible: true,
			split: true,
			border: 1
		},
		items: [{
			xtype: 'TypeTreeView',
			region: 'west'
		}, 
		{
			xtype: 'CommodityTypeGridView',
			collapsible: false,
			region: 'center'
		}]

	}]
});
