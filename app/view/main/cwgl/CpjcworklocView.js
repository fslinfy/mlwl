var CpjcworkmxStore = Ext.create('MyApp.store.CpjcworkmxStore',
    {
        groupField: 'khmc',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=cpjcworklist_pc'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                loc: 'cpjcworkloc',
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
Ext.define('MyApp.view.main.cwgl.CpjcworklocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpjcworklocView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryDate'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCkmc'
    ],
    closeAction: 'destroy',
    itemId: 'CpjcworklocGrid',
    reference: 'CpjcworklocGrid',
    plugins: ['gridfilters'],
    controller: 'CpjcworklocCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0, 'jclb': '',
            'start_date': new Date(), 'end_date': new Date()
        }
    },
    // store: { type: 'CpjcworkmxStore' },
    store: CpjcworkmxStore,
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
                { xtype: 'QueryDate'},

                {
                    xtype: 'combo',
                    name: "jclb",
                    labelWidth: 30,
                    fieldLabel: '进出',
                    width:120,
                   // padding: '20 20 10 20',
                    store: ['全部', '进仓', '出仓', '过货','其它'],
                    queryMode: 'local',
                    editable: false,
                   // allowBlank: false,
                    bind: '{jclb}'
                },
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
            width: 150,
            hideable: true,
            hidden: (sys_customer_id > 0),
            dataIndex: 'khmc'
        },
        {
            text: '仓库名称',
            width: 150,

            hideable: true,
            hidden: (sys_location_id > 0),
            dataIndex: 'ckmc'
        },
        {
            text: '商品名称',
            width: 180,
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
        {
            text: '进出仓内容',
            //width: 200,
            columns: [

                {
                    text: '单位',
                    width: 50,
                    sortable: false,
                    dataIndex: 'jldw'
                },
                {
                    xtype: 'numbercolumn',
                    text: '数量',align: 'right',
                    sortable: false,
                    width: 80,
                    dataIndex: 'jcsl',
                    summaryType: 'sum',
                    summaryRenderer:slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer

                },
                {
                    xtype: 'numbercolumn',
                    text: '重量', sortable: false,
                    width: 70,align: 'right',
                    dataIndex: 'jczl',
                    summaryType: 'sum',
                    summaryRenderer:slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                }]
        },
        {
            text: '作业内容',
            //width: 200,
            columns: [
                {
                    text: '项目名称',
                    width: 100,
                    sortable: false,
                    dataIndex: 'work'
                },
                {
                    text: '单位',
                    width: 50,
                    sortable: false,
                    dataIndex: 'dw'
                },
                {
                    xtype: 'numbercolumn',
                    text: '数量',
                    sortable: false,
                    width: 80,align: 'right',
                    dataIndex: 'sl',
                    summaryType: 'sum',
                    summaryRenderer:slrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: slrenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '单价', sortable: false,
                    width: 70,
                    dataIndex: 'dj',
                    renderer: jerenderer
                },
                {
                    xtype: 'numbercolumn',
                    text: '金额',
                    sortable: false,
                    width: 80,
                    dataIndex: 'je',
                    summaryType: 'sum',
                    summaryRenderer: intrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: intrenderer
                }, {
                    xtype: 'numbercolumn',
                    text: '付现',
                    sortable: false,
                    width: 60,
                    dataIndex: 'xjje',
                    summaryType: 'sum',
                    summaryRenderer: intrenderer,
                    field: {
                        xtype: 'numberfield'
                    },
                    renderer: intrenderer
                },
                { text: '机械', width: 80, dataIndex: 'gs' },
                { text: '搬运', width: 80, dataIndex: 'byg' },
                { text: '仓管', width: 80, dataIndex: 'cg' }
            ]
        },
        {
            text: '日期', sortable: false,
            formatter: 'date("Y-m-d")',
            width: 90,
            dataIndex: 'rq'
        },
        {
            text: '单号', sortable: false,
            width: 130,
            dataIndex: 'dh'
        },
        {
            text: '分类', sortable: false,
            width: 60,
            dataIndex: 'jclb'
        }
    ]
});
