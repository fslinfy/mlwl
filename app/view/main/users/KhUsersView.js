Ext.define('MyApp.view.main.users.KhUsersView', {
	extend: 'Ext.grid.Panel',
	xtype: 'KhUsersView',
	title: 'KhUsersView',
	controller: 'KhUsersCtrl',
	requires: [
		'MyApp.store.KhUsersStore',
		'MyApp.view.main.QueryToolbarView'
		, 'MyApp.view.main.tree.QueryKhmc'
	],
	itemid: 'KhUsersGrid',
	plugins: ['cellediting', 'gridfilters'],
	viewModel: {
		data: { 'khmc': '', 'khid': 0 }
	},
    closeAction: 'destroy',
	store: { type: 'KhUsersStore' },

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
					xtype: 'displayfield',
					itemId:"PageTitle",
					value:'客户操作员维护',
					style: {
						'font-size':'16px',
						'font-weight': 'bold',
						margin: '5px 30px 0 0px',
						color:"#000"  
						},
					fieldCls:'biggertext',
					hideLabel: true
				},
				{ xtype: 'QueryKhmc', flex: 1 },
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

		}
		, {
			text: '移动电话',
			dataIndex: 'smsphone',
			flex: 2,
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
		/*{
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
		},
		*/
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
		    hidden:true,
			ReadOnly: true,
			text: '编辑权限',
			dataIndex: 'edit'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '新增权限',
			dataIndex: 'new'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '删除权限',
			dataIndex: 'del'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			ReadOnly: true,
			text: '业务审核权',
			dataIndex: 'sh'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
			hidden:true,
			ReadOnly: true,
			text: '财务审核权',
			dataIndex: 'cwsh'
		},
		{
			xtype: 'checkcolumn',
			width: 110,
			ReadOnly: true,
			text: '最高删单权',
			dataIndex: 'lastdel'
		},

	
		{
			xtype: 'checkcolumn',
			width: 90,
			text: '锁状态',
			dataIndex: 'locked'
		},
		{
			xtype: 'checkcolumn',
			width: 90,
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
	listeners: {
		select: 'onItemSelected'
	}
});

