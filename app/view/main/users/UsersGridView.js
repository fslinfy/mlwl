Ext.define("MyApp.view.main.users.UsersGridView", {
  extend: "Ext.grid.Panel",
  alias: "widget.UsersGridView",
  itemId: "UsersGridView",
  //enableDragDrop: true,
  enableDrag: true,
  requires: ["MyApp.store.UsersStore", "MyApp.view.main.QueryToolbarView"],
  plugins: ["cellediting", "gridfilters"],
  closeAction: "destroy",
  /*viewConfig: {
		plugins: [
			Ext.create('Ext.grid.plugin.DragDrop', {
				ddGroup: 'GridDD',
				enableDrop: true
			})]
	},
*/
  viewConfig: {
    stripeRows: true,
    plugins: [
      Ext.create("Ext.grid.plugin.DragDrop", {
        ddGroup: "gridtotree",
        enableDrop: false,
      }),
    ],
  },
  store: {
    type: "UsersStore",
  },
  tbar: [
    {
      xtype: "container",
      flex: 1,
      layout: "hbox",
      items: [
        {
          xtype: "container",
          flex: 1,
          layout: "hbox",
          items: [
            {
              xtype: "displayfield",
              itemId: "PageTitle",
              value: "操作员维护",
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0px",
                color: "#000",
              },
              fieldCls: "biggertext",
              hideLabel: true,
            },
            {
              labelWidth: 30,
              xtype: "triggerfield",
              fieldLabel: "过滤",
              itemId: "FilterField",
              flex: 1,
              triggerCls: "x-form-clear-trigger",
              onTriggerClick: function () {
                this.reset();
              },
            },
          ],
        },
        {
          xtype: "QueryToolbarView",
        },
      ],
    },
  ],
  columns: [
    {
      text: "用户ID",
      width: 80,
      dataIndex: "userid",
      align: "left",
    },
    {
      text: "代码",
      width: 80,
      dataIndex: "usercode",
      align: "left",
      editor: {
        allowBlank: false,
        regex: /(^[0-9A-Z]{1,5}$)/,
        type: "string",
      },
    },
    {
      text: "用户名称",
      dataIndex: "username",
      flex: 1,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        },
      },
      editor: {
        allowBlank: false,
        type: "string",
      },
    },
    {
      text: "联系电话",
      dataIndex: "tel",
      flex: 2,
      align: "left",
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        },
      },
      editor: {
        allowBlank: false,
        type: "string",
      },
    },
    {
      text: "移动电话",
      dataIndex: "smsphone",
      flex: 2,
      align: "left",
      editor: {
        allowBlank: true,
        type: "string",
      },
    },
    /*
		{
			text: '证件号码',
			dataIndex: 'sfjhm',
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
		
		{
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
		}, 
		{
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
		},
		 {
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
      xtype: "checkcolumn",
      width: 90,
      ReadOnly: true,
      //	hidden: true,
      text: "锁状态",
      dataIndex: "locked",
    },
    {
      xtype: "checkcolumn",
      width: 90,
      ReadOnly: true,
      //	hidden: true,
      text: "激活",
      dataIndex: "smsactive",
    },
    {
      xtype: "checkcolumn",
      width: 110,
      ReadOnly: true,
      text: "最高删单权",
      dataIndex: "lastdel",
    },
    {
      xtype: "checkcolumn",
      width: 90,
      ReadOnly: true,
      text: "有效",
      dataIndex: "active",
    },
    {
      text: "仓库权限",
      dataIndex: "lidstring",
      align: "left",
    },
    {
      xtype: "widgetcolumn",
      width: 40,
      //bind: {
      //	width: "{w}"
      //},
      sortable: false,
      widget: {
        xtype: "button",
        handler: "onSelectckmcView",
      },
    },
  ],
  listeners: {
    select: "onItemSelected",
    selectionchange: "onSelectionchange",
    drop: function (node, data, dropRec, dropPosition) {
      var dropOn = dropRec
        ? " " + dropPosition + " " + dropRec.get("name")
        : " on empty view";
      Ext.example.msg(
        "Drag from right to left",
        "Dropped " + data.records[0].get("name") + dropOn
      );
    },
  },
});
