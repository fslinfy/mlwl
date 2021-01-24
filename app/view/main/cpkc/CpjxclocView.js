var CpjxclocStore = Ext.create('MyApp.store.CpkclocStore',
    {
        groupField: 'khmc',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=cpjxcloc'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'cpjxcloc',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
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
Ext.define('MyApp.view.main.cpkc.CpjxclocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpjxclocView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],

    closeAction: 'destroy',
    itemId: 'CpjxclocGrid',
    reference: 'CpjxclocGrid',
    plugins: ['gridfilters'],
    controller: 'CpjxclocCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'ny': (new Date()).getFullYear(), 'yu': (new Date()).getMonth(),
            'ckmc': '', 'ckid': 0,
            'cpmc': '', 'cpid': 0
        }
    },
    // store: { type: 'CpjxclocStore' },
    store: CpjxclocStore,

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
                    value:'商品进出月报表',
                    style: {
                        'font-size':'16px',
                        'font-weight': 'bold',
                        margin: '5px 30px 0 0px',
                        color:"#000"  
                        },
                    fieldCls:'biggertext',
                    hideLabel: true
                },
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
                    xtype: 'QueryKhmc', flex: 1,
                    hidden: (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1,
                    hidden: (sys_location_id > 0)
                },

                { xtype: 'QueryCpmc', flex: 1 },

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
            text: '客户名称',
            width: 200,
            hideable: true,
            hidden: (sys_customer_id > 0),
            dataIndex: 'khmc'
        },
        {
            text: '仓库名称',
            width: 200,
            hideable: true,
            hidden: (sys_location_id > 0),
            dataIndex: 'ckmc'
        },

        {
            text: '产地名称',
            width: 150,

            dataIndex: 'cdmc'
        },
        {
            text: '商品名称',
            width: 150,

            dataIndex: 'cpmc'
        },
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
        },
        /*{
            text: '规格型号',
            width: 100,
            dataIndex: 'cpgg'
        },*/
         {
            text: '批号',
            width: 100,
            dataIndex: 'cpph'
        },
        {
            text: '单位',
            width: 50,
            sortable: false,
            dataIndex: 'jldw'
        },
        {
            text: '上月库存', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,

                    width: 70,
                    dataIndex: 'kcsl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'kczl0',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '本月商品入库', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,
                    width: 70,
                    align: 'right',
                    dataIndex: 'jcsl',
                    summaryType: 'sum',
                    // summaryRenderer: slrenderer,
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 85,
                    align: 'right',
                    dataIndex: 'jczl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '本月商品出库', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,
                    width: 70, align: 'right',
                    dataIndex: 'ccsl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 85, align: 'right',
                    dataIndex: 'cczl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '本月商品调账', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,
                    width: 70, align: 'right',
                    dataIndex: 'tzsl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer, field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 85, align: 'right',
                    dataIndex: 'tzzl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'

                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '本月商品库存', columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,
                    width: 70, align: 'right',
                    dataIndex: 'kcsl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer, field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '重量(吨)', sortable: false,
                    width: 85, align: 'right',
                    dataIndex: 'kczl',
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
