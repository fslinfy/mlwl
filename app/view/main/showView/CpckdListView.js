Ext.define('MyApp.view.main.showView.CpckdListView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CpckdListView',
    requires: [
        'MyApp.view.main.SubTable'
        , 'MyApp.view.main.QueryToolbarView'
        , 'MyApp.store.CpckdmxStore'
        , 'MyApp.model.CpckdmxModel'
        , 'MyApp.store.CpckdListStore'
        , 'MyApp.store.CpckdcwStore'
        , 'MyApp.view.main.cpckgl.CpckdShowView'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.tree.QueryCkmc'
        , 'MyApp.view.main.tree.QueryDate'
       
        , 'MyApp.view.main.DataSave'
    ],
    itemId: 'CpckdListGrid',
    plugins: ['gridfilters'],
    closeAction: 'destroy',
    viewModel: {
        data: { 'start_date': new Date(), 'end_date': new Date(), 'khmc': '', 'khid': 0,'deletebz':false}
    },
    store: { type: 'CpckdListStore' },
    enableHdMenu: false,
    tbar: [{
        xtype: 'container',
        flex: 1,
        layout: 'hbox',
        items: [{
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [

                { xtype: 'QueryKhmc' },
                { xtype: 'QueryCkmc' },
                { xtype: 'QueryDate', itemId: 'QueryDate', hidden: true },
                {
                        xtype: 'checkbox',
                        labelWidth: 60,
                        fieldLabel: '含作废单',
                        width:100,
                        margin: '0 5 0 5',
                        bind:'{deletebz}',
                        itemId: 'deletebz',
                        hidden:true
                },
                {
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

    plugins: [{
        ptype: "subtable",
        columnLines: true,
        headerWidth: 24,
        columns: [{
            text: '产地名称',
            dataIndex: 'cdmc'
        }, {
            text: '商品名称',
            dataIndex: 'cpmc'
        }, {
            text: '包装规格',
            dataIndex: 'bzmc'
        }, {
            text: '规格型号',
            dataIndex: 'cpgg'
        }, {
            width: 50,
            text: '单位',
            dataIndex: 'jldw'
        }, {
            xtype: 'numbercolumn',
            text: '计划数量',align: 'right',
            dataIndex: 'ccsl',
            renderer: slrenderer

        }, {
            xtype: 'numbercolumn',
            text: '计划重量',align: 'right',
            dataIndex: 'cczl',
            renderer: slrenderer

        },
        {
            xtype: 'numbercolumn',
            text: '实出数量',
            dataIndex: 'cwsl',align: 'right',
            renderer: slrenderer

        }, {
            xtype: 'numbercolumn',
            text: '实出重量',align: 'right',
            dataIndex: 'cwzl',
            renderer: slrenderer

        },
        {
            xtype: 'numbercolumn',
            text: '单价',align: 'right',
            dataIndex: 'czdj',
            renderer: jerenderer
        },
        {
            xtype: 'numbercolumn',
            text: '出仓费',align: 'right',
            dataIndex: 'ccje',
            renderer: jerenderer
        }
            ,
        {
            xtype: 'numbercolumn',
            text: '现付',align: 'right',
            dataIndex: 'xjje',
            renderer: jerenderer
        }
        ],

        getAssociatedRecords: function (record) {
            var result = Ext.Array.filter(
                cpckdmxStore.data.items,
                function (r) {
                    return r.get('ckid') == record.get('id');
                });
            return result;
        }
    }],
    enableColumnHide: false,
    columnLines: true,

    columns: [{
        text: 'ID',
        hidden: true,
        hideable: false,
        dataIndex: 'id'
    },
    {
        xtype: 'widgetcolumn',
        width: 90, sortable: false,
        widget: {
            xtype: 'button',
            text: '浏览',
            handler: 'onCpckdmxShowView'
        }
    },
    {
        text: '提单号',
        width: 130,
        sortable: true,
        hideable: false,
        dataIndex: 'xsdh'
    },
    {
        text: '出仓流水单号',
        width: 130,
        sortable: true,
        hideable: false,
        dataIndex: 'ckdh'
    }, {
        xtype: 'datecolumn',
        text: '日期',
        width: 100,
        //format: 'y-m-d',
        formatter: 'date("Y-m-d")',
        sortable: false,
        hideable: false,
        dataIndex: 'ckrq'
    },
    {
        text: '客户名称',
        width: 200,
        hidden: (sys_customer_id > 0),
        sortable: false,
        dataIndex: 'khmc'
    },
    {
        text: '仓库名称',
        width: 200,
        sortable: false,
        hidden: (sys_location_id > 0),
        dataIndex: 'ckmc'
    },
    {
        xtype: 'numbercolumn',
        text: '数量',align: 'right',
        sortable: false,
        dataIndex: 'ccsl',
        renderer: slrenderer

    }, {
        xtype: 'numbercolumn',
        text: '重量',align: 'right',
        sortable: false,
        dataIndex: 'cczl',
        renderer: slrenderer
    }, {
        xtype: 'numbercolumn',
        text: '费用',align: 'right',
        sortable: false,
        dataIndex: 'ccje',
        renderer: jerenderer
    }, {
        xtype: 'numbercolumn',
        text: '其中现金',align: 'right',
        sortable: false,
        dataIndex: 'xjje',
        renderer: jerenderer
    },
    {
        text: '提货人',
        sortable: false,
        dataIndex: 'thr'
    }, {
        text: '经办人',
        sortable: false,
        dataIndex: 'czy'
    }, {
        text: '',
        width: 60,
        dataIndex: 'delbz',
        renderer: function (val) {
            if (val) {
                return "作废";
            }
            return "";
        }
    }
    ]
});
