Ext.define("MyApp.view.main.type.TypeView", {
  extend: "Ext.grid.Panel",
  xtype: "TypeView",
  title: "Type",
  requires: ["MyApp.store.TypeStore", "MyApp.view.main.QueryToolbarView"],
  id: "TypeGrid",
  plugins: ["cellediting", "gridfilters"],
  controller: "TypeCtrl",
  store: {
    type: "TypeStore",
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
      text: "大类代码",
      width: 80,
      dataIndex: "T_code",
      align: "left",
      filter: {
        type: "string",
        itemDefaults: {
          emptyText: "Search for…",
        },
      },
      editor: {
        allowBlank: false,
        regex: /(^[0-9A-Z]{1,5}$)/,
        type: "string",
      },
    },
    {
      text: "大类名称",
      dataIndex: "T_name",
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
      xtype: "checkcolumn",
      width: 90,
      text: "活跃",
      dataIndex: "Active",
    },
  ],
  /*dockedItems : [{
		xtype : 'pagingtoolbar',
		store : {
			type : 'TypeStore'
		},
		dock : 'bottom',
		displayInfo : true,
		pageSize : 30,
		displayMsg : '总记录数 {0} - {1} of {2}',
		emptyMsg : "没有记录"
	}],*/
  listeners: {
    select: "onItemSelected",
  },
});
