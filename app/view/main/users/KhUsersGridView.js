Ext.define('MyApp.view.main.users.KhUsersGridView', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.KhUsersGridView',
	itemId: 'KhUsersGridView',
	requires: ['MyApp.store.KhUsersStore',
		'MyApp.view.main.QueryToolbarView'
		//,'MyApp.view.main.tree.KhbmSelectTree'
		, 'MyApp.view.main.tree.QueryKhmc'
	],
	plugins: ['cellediting', 'gridfilters'],
	store: {
		type: 'KhUsersStore'
	},
	closeAction: 'destroy',
	tbar: [{
		xtype: 'container',
		flex: 1,
		layout: 'hbox',
		items: [{
			xtype: 'container',
			flex: 1,
			layout: 'hbox',
			items: [
				{ xtype: 'QueryKhmc' },
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
	}],
	columns: [
		{
			text: '用户ID',
			width: 80,
			dataIndex: 'userid',
			align: 'left'
		},
		{
			text: '代码',
			width: 80,
			dataIndex: 'usercode',
			align: 'left',
			editor: {
				allowBlank: false,
				regex: /(^[0-9A-Z]{1,5}$)/,
				type: 'string'
			}
		}, {
			text: '用户名称',
			dataIndex: 'username',
			//	flex: 1,
			align: 'left',
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
			text: '用户名称',
			dataIndex: 'username',
			//flex: 1,
			align: 'left',
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

		}, {
			text: '联系电话',
			dataIndex: 'tel',
			//flex: 2,
			align: 'left',
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
			text: '移动电话', dataIndex: 'smsphone', flex: 2, align: 'left',
			editor: {
				allowBlank: true,
				type: 'string'
			}
		},
/*
		{
			text: '证件号码',
			dataIndex: 'sfjhm',
			//flex: 2,
			align: 'left',
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

		}, {
			text: 'QQ号码',
			dataIndex: 'qqnumber',
			//flex: 1,
			align: 'left',
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

		}, {
			text: '微信号',
			dataIndex: 'wxnumber',
			//flex: 1,
			align: 'left',
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

		}, {
			text: '微信名',
			dataIndex: 'wxname',
			//	flex: 1,
			align: 'left',
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
		},*/
		{
			xtype: 'numbercolumn',
			text: '登录次数',
			dataIndex: 'logincount',
			//flex: 1,
			align: 'left',
			renderer: intrenderer
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '锁状态',
			dataIndex: 'locked'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '激活',
			dataIndex: 'smsactive'
		},

		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '有效',
			dataIndex: 'active'
		}
	],
	/*dockedItems : [{
		xtype : 'pagingtoolbar',
		store : {
			type : 'KhUsersStore'
		},
		dock : 'bottom',
		displayInfo : true,
		pageSize : 30,
		displayMsg : '总记录数 {0} - {1} of {2}',
		emptyMsg : "没有记录"
	}],*/
	listeners: {
		select: 'onItemSelected',
		selectionchange: 'onSelectionchange'
	}
});
