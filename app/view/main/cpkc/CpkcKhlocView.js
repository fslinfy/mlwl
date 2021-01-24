

var cpkcStore = Ext.create('MyApp.store.CpkcStore',
   {
        groupField: 'ckmc',
        autoLoad: false
   }
);
var showSummary = true;
// var store = Ext.create('MyApp.store.CustomerStore',{pageSize: 30});        
Ext.define('MyApp.view.main.cpkc.CpkcKhlocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpkcKhlocView',
    requires: [
        
         'MyApp.model.CpkcmxModel'
        , 'MyApp.model.CpkcModel'
        , 'MyApp.view.main.QueryToolbarView'
        , 'MyApp.store.CpkcStore'
        , 'MyApp.store.CpkclocStore'
    ],
    itemId: 'CpkcKhlocGrid',
    reference: 'CpkcKhlocGrid',
    closeAction: 'destroy',
    plugins: ['gridfilters'],
    controller: 'CpkcKhlocCtrl',
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
                {
                    xtype: 'displayfield',
                    itemId:"PageTitle",
                    value:'商品库存查询',
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
                    xtype: 'QueryKhmc', flex: 1,
                    hidden: (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1,
                    hidden: (sys_location_id > 0)
                },
                { xtype: 'QueryCdmc', flex: 1 },
                { xtype: 'QueryCpmc', flex: 1 },
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
        groupHeaderTpl: '存放仓库：{name}',
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
    {
        text: '仓库名称',
        itemId: 'ckmc',
        flex: 2,
        hidden: (sys_location_id > 0),
        dataIndex: 'ckmc'
    },
    {
        text: '客户名称',
        itemId: 'khmc',
        flex: 2,
        hidden: (sys_customer_id > 0),
        dataIndex: 'khmc',
    
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
            else 
                {
                    return "小计";
                }
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
                width: 80,align: 'right',
                sortable: false,
                dataIndex: 'kcsl',

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
                width: 80,align: 'right',
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
                text: '数量',align: 'right',
                //flex: 2,
                sortable: false,
                width: 80,
                dataIndex: 'kdsl',
                renderer: slrenderer

            },
            {
                xtype: 'numbercolumn',
                text: '重量',align: 'right',
                width: 80,
                sortable: false,
                //flex: 2,
                dataIndex: 'kdzl',
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
