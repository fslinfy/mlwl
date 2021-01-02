

var cpkcStore = Ext.create('MyApp.store.CpkcStore',
    {
        groupField: 'khmc',
        autoLoad: false
    }
);
var showSummary = true;
// var store = Ext.create('MyApp.store.CustomerStore',{pageSize: 30});        
Ext.define('MyApp.view.main.cpkc.CpkclocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpkclocView',
    requires: [

    ],
    itemId: 'CpkclocGrid',
    reference: 'CpkclocGrid',
    closeAction: 'destroy',
    plugins: ['gridfilters'],
    controller: 'CpkclocCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'cdmc': '', 'cdid': 0,
            'ckmc': '', 'ckid': 0,
            'cpmc': '', 'cpid': 0
        }
    },
    //store: { type: 'CpkcStore' },
    store: cpkcStore,
    tbar: [{
        xtype: 'container',
        flex: 1,
        layout: 'hbox',
        items: [{
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
               /* {
                    xtype: 'QueryKhmc', flex: 1,
                    hidden: (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1,
                    hidden: (sys_location_id > 0)
                },
                { xtype: 'QueryCdmc', flex: 1 },
                { xtype: 'QueryCpmc', flex: 1 },*/
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
    plugins: [{
        ptype: "subtable",
        columnLines: true,
        headerWidth: 24,
        columns: [{
            text: '进库日期',
            dataIndex: 'czrq',
            formatter: 'date("Y-m-d")'
        }, {
            text: '区',
            // width: 50,
            dataIndex: 'area'
        },
        {
            text: '仓位',
            dataIndex: 'cw'
        }, {
            text: '单位',
            dataIndex: 'dw'
        },
        {
            xtype: 'numbercolumn',
            text: '数量',
            dataIndex: 'sl',
            renderer: slrenderer

        }, {
            xtype: 'numbercolumn',
            text: '重量',
            dataIndex: 'zl',
            renderer: slrenderer

        },
        // 、、  {
        // xtype: 'numbercolumn',
        // text: '仓租单价',
        // dataIndex: 'czdj',
        // renderer: jerenderer
        // },

        {
            text: '说明',
            dataIndex: 'sm'
        }

        ],
        getAssociatedRecords: function (record) {
            var result = Ext.Array.filter(
                cpkcmxStore.data.items,
                function (r) {
                    return r.get('kcid') == record.get('kcid');
                });
            return result;
        }
    }]
    ,
    columnLines: true,
    enableColumnHide: false,
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '客户：{name}',
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
    columns: [{
        hidden: true,
        dataIndex: 'id'
    },
    /*{
        text: '客户名称',
        itemId: 'khmc',
        flex: 2,
        //hidden: (sys_customer_id > 0),
        dataIndex: 'khmc',
        summaryType: 'count',
        summaryRenderer: function (value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? '(' + value + ' 行)' : '(1 行)');
        }
    },*/
    {
        text: '仓库名称',
        itemId: 'ckmc',
        flex: 2,
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
        flex: 3,
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
        text: '单位', sortable: false,
        flex: 1,
        dataIndex: 'jldw'
    },
    {
        text: '库存',
        //width: 200,
        columns: [

            {
                xtype: 'numbercolumn',
                text: '数量',
                width: 80,
                sortable: false,
                dataIndex: 'kcsl',
                align: 'right',
                summaryType: 'sum',
                summaryRenderer: slrenderer,

                field: {
                    xtype: 'numberfield'
                },
                renderer: slrenderer

            },
            {
                xtype: 'numbercolumn',
                text: '重量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'kczl',
                summaryType: 'sum',
                summaryRenderer: slrenderer,
                field: {
                    xtype: 'numberfield'
                },
                renderer: slrenderer

            }]
    },
    {
        text: '留货',
        //  flex: 4,
        columns: [

            {
                xtype: 'numbercolumn',
                text: '数量',
                sortable: false,
                width: 80, align: 'right',
                dataIndex: 'kdsl',
                summaryType: 'sum',
                summaryRenderer: slrenderer,
                field: {
                    xtype: 'numberfield'

                },
                renderer: slrenderer
            },
            {
                xtype: 'numbercolumn',
                text: '重量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'kdzl',
                summaryType: 'sum',
                summaryRenderer: slrenderer,
                field: {
                    xtype: 'numberfield'

                },
                renderer: slrenderer
            }]
    }
        /*{
            xtype: 'numbercolumn', sortable: false,
            text: '数量',
            flex: 2,
            dataIndex: 'kcsl',
            renderer: slrenderer
    
        },
    
        {
            xtype: 'numbercolumn', sortable: false,
            text: '重量',
            //width: 100,
            flex: 2,
            dataIndex: 'kczl',
            renderer: slrenderer
        }*/
    ]
});
