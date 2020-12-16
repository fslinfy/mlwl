
var store = Ext.create('MyApp.store.CustomerStore',{pageSize: 10000});

Ext.define('MyApp.view.main.customer.CustomerView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CustomerView',
    title: 'Customer',
    requires: [
        'MyApp.store.CustomerStore',
        'MyApp.store.PackingStore',
        'MyApp.model.PackingModel',
        'MyApp.view.main.customer.PackingEditView',
        'MyApp.view.main.QueryToolbarView'
    ],
    id: 'CustomerGrid',
    closeAction: 'destroy',
    plugins: ['cellediting', 'gridfilters'],
    controller: 'CustomerCtrl',
   // store: { type: 'CustomerStore' },
    store:store,
    enableHdMenu: false,
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

    columns: [{
        text: '客户ID', width: 50, dataIndex: 'id'
    }, {
        text: '代码', width: 70, dataIndex: 'C_code', align: 'left',
        editor: {
            allowBlank: false,
            regex: /(^[0-9A-Z]{1,5}$)/,
            type: 'string'
        }
    },
    {
        text: '客户名称', dataIndex: 'C_name', flex:2, align: 'left',
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
        text: '客户简称', dataIndex: 'C_shortname', flex: 1, align: 'left',
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

    },/* {
        text: '拼音码', dataIndex: 'Py_code', flex: 1, align: 'left',
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

    },*/
    {        text: '客户地址', dataIndex: 'Address', flex: 3, align: 'left',
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
        text: '联系电话', dataIndex: 'Tel', flex: 1, align: 'left',
        editor: {
            allowBlank: true,
            type: 'string'
        }
    },
    {
        text: '移动电话', dataIndex: 'smsphone', flex: 1, align: 'left',
        editor: {
            allowBlank: true,
            type: 'string'
        }
    },
    {
        text: '月度开始日', dataIndex: 'Beginday', width: 90, align: 'center',
        hidden:true,
        editor: {
            allowBlank: false,
            type: 'numberfield',
            decimalPrecision: 1
        }
    },
    {
        xtype: 'datecolumn',
        text: '有效日期', sortable: false,
        dataIndex: 'Enddate',
        width: 120,
        //formatter: 'date("Y-m-d")',
        format: 'Y-m-d',
        editor: {
            xtype: 'datefield',
            format: 'y-m-d'
            //disabledDays: [0, 6],
            //disabledDaysText: 'Plants are not available on the weekends'
        }
    },
    {
        xtype: 'checkcolumn',
        width: 50,
        text: '活跃',
        dataIndex: 'Active'
    },
    {
        xtype: 'checkcolumn',
        width: 80,
        text: '独立单价',
        dataIndex: 'Aloneprice'
    },
    {
        xtype: 'widgetcolumn',
        width: 100, sortable: false,
        widget: {
            xtype: 'button',
            text: '单价定义',
            handler: 'onPackingEdit'
        }
    }
    ],
/*
     dockedItems: [{
         xtype: 'pagingtoolbar',
         store:store,
         dock: 'bottom',
         displayInfo: true,
         pageSize:30,
         displayMsg: '总记录数 {0} - {1} of {2}',
         emptyMsg: "没有记录"
     }],
*/
/*
     bbar: Ext.create('Ext.PagingToolbar', {
                store: {type: 'CustomerStore'},
                displayInfo: true,
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No topics to display",
                items:[
                    '-', {
                    text: pluginExpanded ? 'Hide Preview' : 'Show Preview',
                    pressed: pluginExpanded,
                    enableToggle: true,
                    toggleHandler: function(btn, pressed) {
                        btn.up('grid').getPlugin('preview').toggleExpanded(pressed);
                        btn.setText(pressed ? 'Hide Preview' : 'Show Preview');
                    }
                }]
            }),
    
  */  
    listeners: {
        select: 'onItemSelected'

    }

});
