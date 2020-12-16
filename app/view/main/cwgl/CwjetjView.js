var CwjetjStore = Ext.create('MyApp.store.CwjetjStore',
    {
        groupField: 'day',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=Cwjetj'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'Cwjetj',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                khid:0
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
Ext.define('MyApp.view.main.cwgl.CwjetjView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CwjetjView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],

    closeAction: 'destroy',
    itemId: 'CwjetjGrid',
    reference: 'CwjetjGrid',
    plugins: ['gridfilters'],
    controller: 'CwjetjCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'ny': (new Date()).getFullYear(), 'yu': (new Date()).getMonth(),
            'ckmc': '', 'ckid': sys_location_id,
            'cpmc': '', 'cpid': 0
        }
    },
    // store: { type: 'CwjetjStore' },
    store: CwjetjStore,

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
        groupHeaderTpl: '{name}日',
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

      /*  {
            text: '月',
            width: 60,
            dataIndex: 'yu'
        },
        {
            text: '日',
            width: 50,
            dataIndex: 'ri'
        },*/
        {
            text: '公司名称',
            width: 200,
            dataIndex: 'khmc'
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
            dataIndex: 'dw'
        },
        {
            xtype: 'numbercolumn',
            text: '重量', sortable: false,
            width: 85,
            align: 'right',
            dataIndex: 'sl',
            summaryType: 'sum',
            summaryRenderer: slrenderer,
            field: {
                xtype: 'numberfield'

            },
            renderer: slrenderer
        },
        {
            text: '装卸费', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '记帐',
                    sortable: false,
                    width: 70,
                    align: 'right',
                    dataIndex: 'byje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '现收', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'byxjje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '过车费', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '记帐',
                    sortable: false,
                    align: 'right',
                    width: 70,
                    dataIndex: 'gfje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '现收', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'gfxjje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '过户费', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '记帐',
                    sortable: false,
                    align: 'right',
                    width: 70,
                    dataIndex: 'ghje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '现收', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'ghxjje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '其它费用', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '记帐',
                    sortable: false,
                    align: 'right',
                    width: 70,
                    dataIndex: 'qtje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '现收', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'qtxjje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '合计', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '记帐',
                    sortable: false,
                    align: 'right',
                    width: 70,
                    dataIndex: 'je',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '现收', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'xjje',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '合计', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'je0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        }

    ]

});
