var khsum = true;
var cpsum = false;
var CpjcttmxStore = Ext.create('MyApp.store.CpjcttmxStore',
    {
        groupField: 'bz',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=cpjcttlist_pc'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'cpjcttloc',
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_l_id: sys_location_id,
                khid: 0,
                khbz: 1,
                cpbz: 0,
                jclb: "",
                area:"",
                ny: 0,
                yu: 0,
                ri: 0
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
Ext.define('MyApp.view.main.cwgl.CpjcttlocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpjcttlocView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        , 'MyApp.view.main.tree.QueryArea'
    ],
    closeAction: 'destroy',
    itemId: 'CpjcttlocGrid',
    reference: 'CpjcttlocGrid',
    plugins: ['gridfilters'],
    controller: 'CpjcttlocCtrl',
    viewModel: {
        data: {
            'ckid': 0, 'area':'','khsum': khsum, "cpsum": cpsum, 'ckmc': '', 'khmc': '', 'khid': 0, 'jclb': '', 'ny': (new Date).getFullYear(), 'yu': (new Date).getMonth() + 1, 'ri': ''
        }
    },
    // store: { type: 'CpjcttmxStore' },
    store: CpjcttmxStore,
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
                    xtype: 'QueryKhmc', flex: 2,
                    hidden: (sys_customer_id > 0)
                },
                // {
                //    xtype: 'QueryCkmc', flex: 2,
                //     hidden: (sys_location_id > 0)
                // },
                {
                    xtype: 'combo',
                    name: "ny",
                    fieldLabel: '年度',
                    padding: '0 0 0 20',
                    labelWidth: 30,
                    width: 120,
                    store: [(new Date).getFullYear() - 1, (new Date).getFullYear()],
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    bind: "{ny}"/*,
                    //listeners: {
                            change: function (field, e) {
                                cktjjdQuery(e);
                                //console.log(e);
                            }
                        }*/
                },
                {
                    xtype: 'combo',
                    name: "yu",
                    fieldLabel: '月',
                    padding: '0 0 0 20',
                    labelWidth: 20,
                    width: 100,
                    store: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    queryMode: 'local',

                    allowBlank: false,
                    editable: false,
                    bind: "{yu}"

                },
                {
                    xtype: 'textfield',
                    name: "ri",
                    padding: '0 0 0 20',
                    labelWidth: 20,
                    maxLength: 2,
                    fieldLabel: '日',
                    width: 65,
                    allowBlank: true,
                    //maxValue:31,                       //最大值  
                    //minValue:0,    
                    bind: '{ri}'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: '按客户汇总',
                    name: 'khsum',
                    labelWidth: 70,
                    width: 120,
                    padding: '0 10 0 10',
                    bind: '{khsum}'

                },
                {
                    xtype: 'checkbox',
                    fieldLabel: '按商品汇总',

                    name: 'cpsum',
                    labelWidth: 70,
                    width: 120,
                    padding: '0 10 0 10',
                    bind: '{cpsum}',
                    listeners:
                    {
                        change: function (e) {
                            //  var this.getView().getViewModel();
                            cpsum = e.value;
                            console.log(e.value, this.up("#CpjcttlocGrid"));

                        }

                    }

                },
                { xtype: "QueryArea" },
                {
                    xtype: 'combo',
                    name: "jclb",
                    labelWidth: 30,
                    padding: '0 0 0 30',
                    fieldLabel: '进出',
                    width: 120,
                    hidden: true,
                    // padding: '20 20 10 20',
                    store: ['全部', '进仓', '出仓', '过货', '其它'],
                    queryMode: 'local',
                    editable: false,
                    // allowBlank: false,
                    bind: '{jclb}'
                },
                {
                    flex: 1
                }
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
            text: '客户',
            //width: 200,
            flex: 1,
            dataIndex: 'khmc'
        },
        {
            text: '商品',
            //width: 150,
            flex: 1,
            dataIndex: 'cpmc'
        },
        {
            text: '入库',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 90,
                    dataIndex: 'jcsl',
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
                    width: 90, align: 'right',
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
            text: '出库',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 90,
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
                    width: 90, align: 'right',
                    dataIndex: 'cczl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        }, {
            text: '过车',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 90,
                    dataIndex: 'gfsl',
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
                    width: 90, align: 'right',
                    dataIndex: 'gfzl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        }, {
            text: '调帐',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 90,
                    dataIndex: 'tzsl',
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
                    width: 90, align: 'right',
                    dataIndex: 'tzzl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        }, {
            text: '合计',
            //width: 200,
            columns: [
                {
                    xtype: 'numbercolumn',
                    text: '数量(包)', align: 'right',
                    sortable: false,
                    width: 100,
                    dataIndex: 'sl',
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
                    width: 100, align: 'right',
                    dataIndex: 'zl',
                    summaryType: 'sum',
                    summaryRenderer: slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },
        {
            flex: 1
        }

    ]
});
