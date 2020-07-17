Ext.define('MyApp.view.main.packing.PackingView', {
	extend: 'Ext.grid.Panel',
	xtype: 'PackingView',
	title: 'Packing',
	requires: [
		'MyApp.store.PackingStore',
		'MyApp.model.PackingModel',
		'MyApp.view.main.QueryToolbarView'
	],
	id: 'PackingGrid',
	plugins: ['cellediting', 'gridfilters'],
	controller: 'PackingCtrl',
	columnLines: true,
	enableHdMenu: false,
	enableColumnHide: false,
	store: { type: 'PackingStore' },

	tbar: [{
		xtype: 'container',
		flex: 1,
		layout: 'hbox',
		items: [{
			xtype: 'container',
			flex: 1,
			layout: 'hbox',
			items: [{
				labelWidth: 30,
				xtype: 'triggerfield',
				fieldLabel: '过滤',
				itemId: 'FilterField',
				flex: 1,
				triggerCls: 'x-form-clear-trigger',
				onTriggerClick: function () {
					this.reset();
				}
			}]
		}, {
			xtype: 'QueryToolbarView'
		}]
	}
	],

	columns: [

		{
			text: '代码', width: 50, dataIndex: 'PS_code', align: 'left', sortable: false,
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'
				}
			},

			editor: {
				allowBlank: false,
				regex: /(^[0-9A-Z]{1,5}$)/,
				type: 'string'
			}
		},
		{
			text: '包装名称', dataIndex: 'PS_name', flex: 3, align: 'left', sortable: false,
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'
				}
			},
			editor: {
				allowBlank: false,
				type: 'string'
			}
		},
		{
			text: '数量单位', dataIndex: 'Quantity_Unit', flex: 1, align: 'left', sortable: false,
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'

				}
			},
			editor: {
				allowBlank: true,
				//regex:/>([^<>]+)</,      
				type: 'string'
			}

		},
		{
			//xtype: "numbercolumn",

			align: 'right',
			//formatter: 'usMoney',
			format: '00000.00',
			//align: 'right', 
			text: '转换系数', dataIndex: 'Rate', flex: 1, align: 'left', sortable: false,
			editor: {
				type: 'numberfield',

				//	regex: /(^[0-9]{1,8}.[0-9]{3}$)/,
				decimalPrecision: 3,
				align: 'right',

				allowBlank: false,
				minValue: 0,
				maxValue: 100000

			}
		},
		{
			text: '重量单位', dataIndex: 'Weight_Unit', flex: 1, align: 'left', sortable: false,
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'
				}
			},
			editor: {
				allowBlank: true,
				type: 'string'
			}
		},
		{
			text: '临时仓仓租单价',
			columns: [
				{
					text: '180天内',
					columns: [

						{
							xtype: "numbercolumn", align: 'right', format: '00000.00',
							text: '不分批号', dataIndex: 'Czdj', flex: 1, align: 'left', sortable: false,
							editor: {
								type: 'numberfield',
								decimalPrecision: 3,
								align: 'right',
								allowBlank: true,
								minValue: 0,
								maxValue: 9999.99
							}
						},

						{
							xtype: "numbercolumn", align: 'right', format: '00000.00',
							text: '分批号', dataIndex: 'Phdj', flex: 1, align: 'left', sortable: false,
							editor: {
								type: 'numberfield',
								decimalPrecision: 3,
								align: 'right',
								allowBlank: true,
								minValue: 0,
								maxValue: 9999.99
							}
						}]
				},


				{
					text: '180天以后',
					columns: [

						{
							xtype: "numbercolumn", align: 'right', format: '00000.00',
							text: '不分批号', dataIndex: 'Czdj2', flex: 1, align: 'left', sortable: false,
							editor: {
								type: 'numberfield',
								decimalPrecision: 3,
								align: 'right',
								allowBlank: true,
								minValue: 0,
								maxValue: 9999.99
							}
						},

						{
							xtype: "numbercolumn", align: 'right', format: '00000.00',
							text: '分批号', dataIndex: 'Phdj2', flex: 1, align: 'left', sortable: false,
							editor: {
								type: 'numberfield',
								decimalPrecision: 3,
								align: 'right',
								allowBlank: true,
								minValue: 0,
								maxValue: 9999.99
							}
						}]
				},
				{
					text: "最小", columns: [{
						xtype: "numbercolumn", align: "center", format: "00",
						 text: "天数",
						dataIndex: "mints", width: 50, align: "center", sortable: false,
						editor: { type: "numberfield", decimalPrecision: 0, align: "right", allowBlank: true, minValue: 0, maxValue: 31 }
					}]
				},
				{
					text: "周期", columns: [{
						xtype: "numbercolumn", align: "center", format: "00",
						 text: "天数",
						dataIndex: "czts", width: 50, align: "center", sortable: false,
						editor: { type: "numberfield", decimalPrecision: 0, align: "right", 
						allowBlank: true, minValue: 0, maxValue: 31 }
					}]
				}
			]
		},
		{
			text: '固定仓',
			columns: [
				{
					text: '每月平方',
					columns: [
						{
							xtype: "numbercolumn", align: 'right', format: '00000.00',
							width: 70,
							text: '单   价', dataIndex: 'Pfdj', align: 'left', sortable: false,
							editor: {
								type: 'numberfield',
								decimalPrecision: 3,
								align: 'right',
								allowBlank: true,
								minValue: 0,
								maxValue: 9999.99
							}
						}
					]
				}]
		},
		{
			text: '其它费用单价',
			columns: [
				{
					xtype: "numbercolumn", align: 'right', format: '00000.00',
					text: '装卸单价', dataIndex: 'Bydj', flex: 1, align: 'left', sortable: false,
					editor: {
						type: 'numberfield',
						decimalPrecision: 3,
						align: 'right',
						allowBlank: true,
						minValue: 0,
						maxValue: 9999.99
					}
				},

				{
					xtype: "numbercolumn", align: 'right', format: '00000.00',
					text: '破包修复', dataIndex: 'Pbdj', flex: 1, align: 'left', sortable: false,
					editor: {
						type: 'numberfield',
						decimalPrecision: 3,
						align: 'right',
						allowBlank: true,
						minValue: 0,
						maxValue: 9999.99
					}
				},
				{
					xtype: "numbercolumn", align: 'right', format: '00000.00',
					text: '过户费', dataIndex: 'Ghdj', flex: 1, align: 'left', sortable: false,
					editor: {
						type: 'numberfield',
						decimalPrecision: 3,
						align: 'right',
						allowBlank: true,
						minValue: 0,
						maxValue: 9999.99
					}
				}]
		},
		{
			xtype: 'checkcolumn',
			flex: 1,
			text: '重量核算', sortable: false,
			dataIndex: 'Weight_Status'
		}
		,
		{
			xtype: 'checkcolumn',
			flex: 1,
			text: '活跃', sortable: false,
			dataIndex: 'Active'
		}
		,
		{
			xtype: 'checkcolumn',
			flex: 1,
			text: '过车', sortable: false,
			dataIndex: 'Xmlb'
		}
	],
	listeners: {
		select: 'onItemSelected'
	}
});
