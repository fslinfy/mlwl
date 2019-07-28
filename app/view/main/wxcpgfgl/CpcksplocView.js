var CpcksplocStore = Ext.create('MyApp.store.CpkclocStore',
    {
        groupField: 'khmc',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=cpckdlist_pc'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'cpcksploc',
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
Ext.define('MyApp.view.main.cpckgl.CpcksplocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpcksplocView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryDate'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCpmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        //, 'MyApp.store.CpkclocStore'
    ],
    //    id: 'CpcksplocGrid',
    closeAction: 'destroy',
    itemId: 'CpcksplocGrid',
    reference: 'CpcksplocGrid',
    plugins: ['gridfilters'],
    controller: 'CpcksplocCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'start_date': new Date(), 'end_date': new Date(),
            'ckmc': '', 'ckid': 0,
            'cpmc': '', 'cpid': 0
        }
    },
    // store: { type: 'CpcksplocStore' },
    store: CpcksplocStore,

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
                    xtype: 'QueryKhmc', flex: 1,
                    hidden: (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1,
                    hidden: (sys_location_id > 0)
                },

                { xtype: 'QueryCpmc', flex: 1 },

                { xtype: 'QueryDate' },

                {
                    labelWidth: 30,
                    xtype: 'triggerfield',
                    fieldLabel: '过滤',
                    itemId: 'FilterField',
                    flex: 1,
                    margin: '0 10 0 15',
                    triggerCls: 'x-form-clear-trigger',
                    onTriggerClick: function () {
                        this.reset();
                    }
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
            text: '客户名称',
            flex: 2,
            hideable: true,
            hidden: (sys_customer_id > 0),
            dataIndex: 'khmc'
        },
        {
            text: '仓库名称',
            flex: 2,

            hideable: true,
            hidden: (sys_location_id > 0),
            dataIndex: 'ckmc'
        },

        {
            text: '产地名称',
            flex: 2,

            dataIndex: 'cdmc'
        },
        {
            text: '商品名称',
            flex: 4,

            dataIndex: 'cpmc'
        },
        {
            text: '包装',
            flex: 4,
            dataIndex: 'bzmc',
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                if (typeof value == "object") {
                    return "合计";
                }
                else {
                    return "小计";
                }
                // ((value === 0 || value > 1) ? '(' + value + ' 行)' : '(1 行)');
            }
        },
        {
            text: '规格型号',
            flex: 2,
            dataIndex: 'cpgg'
        }, {
            text: '批号',
            flex: 2,
            dataIndex: 'cpph'
        },
        {
            text: '单位',
            width: 60,
            sortable: false,
            dataIndex: 'jldw'
        },
        {
            xtype: 'numbercolumn',
            text: '出库数量',
            sortable: false,
            flex: 2,align: 'right',
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
            text: '出库重量', sortable: false,
            flex: 2,align: 'right',
            dataIndex: 'zl',
            summaryType: 'sum',
            summaryRenderer: slrenderer,

            field: {
                xtype: 'numberfield'

            },
            renderer: slrenderer
        }, {
            text: '出库日期', sortable: false,


            formatter: 'date("Y-m-d")',
            width: 90,


            dataIndex: 'czrq'
        },
        {
            text: '出仓单号', sortable: false,
            width: 120,
            dataIndex: 'dh'
        }
    ]


});
