var CwworkwzStore = Ext.create('MyApp.store.CwjetjStore',
    {
        groupField: 'bz',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=Cwworktj'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'Cwworkwz',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                bz:'',
                khid:0,
                p_l_id: sys_location_id
            },
            reader: {
                type: 'json',
                rootProperty: 'rows'
            }
        },
        autoLoad: false
    }
);
var showSummary = true;
Ext.define('MyApp.view.main.cwgl.CwworkwzView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CwworkwzView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],

    closeAction: 'destroy',
    itemId: 'CwworkwzGrid',
    reference: 'CwworkwzGrid',
    plugins: ['gridfilters'],
    controller: 'CwworkwzCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'ny': (new Date()).getFullYear(), 'yu': (new Date()).getMonth(),
            'ckmc': '', 'ckid': sys_location_id,
            'cpmc': '', 'cpid': 0
        }
    },
    // store: { type: 'CwworkwzStore' },
    store: CwworkwzStore,

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
                    xtype: "numberfield",
                    name: 'ny',
                    labelWidth: 30,
                    fieldLabel: '年度',
                    bind: "{ny}",
                    hideTrigger: false,

                    margin: '1 0 1 1',
                    width: 120,
                    minValue: 2018,
                    maxValue: 9999,
                    decimalPrecision: 0
                },

                {
                    xtype: "numberfield",
                    name: 'yu',
                    labelWidth: 30,
                    fieldLabel: '月度',
                    bind: "{yu}",
                    hideTrigger: false,
                    margin: '1 0 1 10',
                    width: 120,
                    minValue: 1,
                    maxValue: 12,
                    decimalPrecision: 0

                },
                {
                    xtype: 'QueryKhmc', flex: 1,//                    hidden:  (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1//,        hidden: (sys_location_id > 0)
                }
                //,

                //{ xtype: 'QueryCpmc', flex: 1 },

            ]
        }, {
            xtype: 'QueryToolbarView'
        }]
    }
    ]
    ,
    columnLines: true,
    enableColumnHide: false,
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    },
    {
        ftype: 'summary',
        dock: 'bottom'
    }],
    lockedViewConfig: {
        scroll: 'horizontal'
    },
    columns: [

        {
            text: '',
            width: 60,
            dataIndex: 'bz'
        },
        /*
        {
            text: '日',
            width: 50,
            dataIndex: 'ri'
        },*/
        {
            text: '姓名',
            width: 200,
            dataIndex: 'xm'
        },

        /*
        {
            text: '包装',
            width: 150,
            dataIndex: 'bzmc',
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                if (typeof value == "object") {
                    return "合计";
                }
                else {
                    return "小计";
                }

            }
        },*/

        
         {
            text: '单位',
            width: 50,
            sortable: false,
            dataIndex: 'dw',
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                if (typeof value == "object") {
                    return "合计";
                }
                else {
                    return "小计";
                }

            }

        },
        {
            xtype: 'numbercolumn',
            text: '重量', sortable: false,
            width: 85,
            align: 'right',
            dataIndex: 'zl',
            summaryType: 'sum',
            summaryRenderer: slrenderer,
            field: {
                xtype: 'numberfield'

            },
            renderer: slrenderer
        }
    ]
});
