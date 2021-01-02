
var CkPackingStore =Ext.define("MyApp.store.CkPackingStore",
{extend:"Ext.data.Store",alias:"store.CkPackingStore",pageSize:1E4,model:"MyApp.model.PackingModel",proxy:{type:"ajax",
api:{
    read:sys_ActionPHP+"?act\x3dpackinglist0",
    update:sys_ActionPHP+"?act\x3dpackingsave"
    //create:sys_ActionPHP+"?act\x3dpackingnew",
    //destroy:sys_ActionPHP+"?act\x3dpackingdelete"
},
actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},
extraParams:{
    userInfo:base64encode(Ext.encode(obj2str(sys_userInfo))),
    p_e_code:sys_enterprise_code,
    p_l_id:sys_location_id,
    optype:"location",
    khid:0
},
reader:{type:"json",rootProperty:"rows",totalProperty:"results"}},autoLoad:false});




Ext.define('MyApp.view.main.packing.CkPackingView', {
	extend: 'Ext.grid.Panel',
	xtype: 'CkPackingView',
	title: 'CkPacking',
	requires: [
	],
	id: 'CkPackingGrid',
	plugins: ['cellediting', 'gridfilters'],
	controller: 'CkPackingCtrl',
	columnLines: true,
	enableHdMenu: false,
	enableColumnHide: false,
	store: { type: 'CkPackingStore' },
	//store: CkPackingStore,

	tbar: [{
		xtype: 'container',
		flex: 1,
		layout: 'hbox',
		items: [{
			xtype: 'container',
			flex: 1,
			layout: 'hbox',
			items: [
				{
					xtype: 'PageTitle'
				},
				{
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
			}
		},
		{
			text: '包装名称', dataIndex: 'PS_name', flex: 3, align: 'left', sortable: false,align: 'center',
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'
				}
			}
		},
		{
			text: '数量单位', dataIndex: 'Quantity_Unit', flex: 1, align: 'left', sortable: false,
			align: 'center',
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'

				}
			}

		},
		{
			align: 'right',
			format: '00000.00',
			text: '转换系数', dataIndex: 'Rate', flex: 1, align: 'left', sortable: false
		},
		{
			text: '重量单位', dataIndex: 'Weight_Unit', flex: 1, align: 'left', sortable: false,
			align: 'center',
			filter: {
				type: 'string',
				itemDefaults: {
					emptyText: 'Search for…'
				}
			}
		},
		{
			text: '临时仓仓租单价',
			columns: [
				{
					text: cztsfl+'天内',
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
					text: cztsfl+ '天以后',
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
			width:90, text: "重量核算", sortable: false, dataIndex: "Weight_Status",
			align: 'center',
			renderer: function (val) { if (val) return "是"; else return "" }
			
		}
		,
		{
			width:90, text: "活跃", sortable: false, dataIndex: "Active",align: 'center',
			renderer: function (val) { if (val) return "是"; else return "" }
			
		},

		{
			text: '过车', 
			width:50,align: 'center',
			sortable: false,
			enable:false,
			readOnly: true,
			dataIndex: 'Xmlb',
			renderer: function (val) { if (val) return "是"; else return "" }
		}




	],
	listeners: {
		select: 'onItemSelected'
	}
});
