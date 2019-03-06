﻿Ext.define('MyApp.view.main.showView.CpgfdListView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CpgfdListView',
    requires: [
        'MyApp.view.main.SubTable'
        , 'MyApp.store.CpgfdListStore'
        , 'MyApp.store.CpgfdmxStore'
        , 'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryDate'
        , 'MyApp.view.main.tree.QueryKhmc'
        , 'MyApp.view.main.DataSave'
    ],
    itemId: 'CpgfdListGrid',
    reference: 'CpgfdListGrid',
    plugins: ['gridfilters'],
    closeAction: 'destroy',
  
    viewModel: {
        data: { 'start_date': new Date(), 'end_date': new Date(), 'khmc': '', 'khid': 0, 'deletebz': 0 }
    },
    store: { type: 'CpgfdListStore' },
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
                { xtype: 'QueryKhmc', flex: 1 },
                //  { xtype: 'QueryCkmc' },
                { xtype: 'QueryDate', itemId: 'QueryDate', hidden: true },
                {
                    xtype: 'checkbox',
                    labelWidth: 60,
                    fieldLabel: '含作废单',
                    width: 100,
                    margin: '0 5 0 5',
                    bind: '{deletebz}',
                    itemId: 'deletebz',
                    hidden: true
                },
                {
                    labelWidth: 30,
                    flex: 1,
                    xtype: 'triggerfield',
                    fieldLabel: '过滤',
                    itemId: 'FilterField',
                    flex: 1,
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
            text: '产地名称',
            dataIndex: 'cdmc'
        },
        {
            text: '项目名称',
            dataIndex: 'xmmc'
        },
        {
            width: 80,
            text: '计量单位',
            dataIndex: 'jldw'
        },
        {
            xtype: 'numbercolumn',
            text: '数量',
            width: 100, align: 'right',
            dataIndex: 'sl',
            renderer: slrenderer

        },

        {
            xtype: 'numbercolumn',
            text: '重量',
            width: 100, align: 'right',
            dataIndex: 'zl',
            renderer: slrenderer

        }, {
            xtype: 'numbercolumn',
            text: '单价',
            width: 100,
            align: 'right',
            dataIndex: 'dj',
            renderer: jerenderer
        },
        {
            xtype: 'numbercolumn',
            text: '费用',
            width: 100, align: 'right',
            dataIndex: 'je',
            renderer: jerenderer
        }
            ,

        {
            text: '机械',
            dataIndex: 'gs'
        }
            ,
        {
            text: '搬运',
            dataIndex: 'byg'
        }
            ,
        {
            text: '仓管',
            dataIndex: 'cg'
        }
        ]
        ,
        getAssociatedRecords: function (record) {
            var result = Ext.Array.filter(
                cpgfdmxStore0.data.items,
                function (r) {
                    return r.get('gfid') == record.get('id');
                });
            return result;
        }
    }]
    ,
    enableHdMenu: false,
    enableColumnHide: false,
    collapsible: false,
    animCollapse: false,

    //defaults:{
    // sortable:false
    //},
    columns: [{
        text: 'ID',
        hidden: true,
        hideable: false,
        dataIndex: 'id'
    },
    {
        xtype: 'widgetcolumn',
        width: 90,
        sortable: false,
        widget: {
            xtype: 'button',
            text: '浏览',
            handler: 'onCpgfdmxShowView'
        }
    },
    {
        text: '流水单号',
        width: 130,
        sortable: true,
        hideable: false,
        dataIndex: 'gfdh'
    },
    {
        xtype: 'datecolumn',
        text: '日期',
        width: 120,
        formatter: 'date("Y-m-d")',
        sortable: false,
        hideable: false,
        dataIndex: 'gfrq'
    },
    {
        text: '客户名称',
        width: 300,
        sortable: false,
        hidden: (sys_customer_id > 0),
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
        text: '数量', align: 'right',
        dataIndex: 'sl',
        sortable: false,
        renderer: slrenderer
    },
    {
        xtype: 'numbercolumn',
        text: '重量', align: 'right',
        dataIndex: 'zl',
        sortable: false,
        renderer: slrenderer
    },
    {
        xtype: 'numbercolumn',
        text: '费用', align: 'right',
        dataIndex: 'je',
        sortable: false,
        renderer: jerenderer
    }, {
        xtype: 'numbercolumn',
        text: '现付',
        sortable: false, align: 'right',
        hidden: true,
        dataIndex: 'xjje',
        renderer: jerenderer
    },
    {
        text: '车牌号码',  sortable: false,
        dataIndex: 'cphm'
    }
        ,
    {
        text: '司机',  sortable: false,
        dataIndex: 'sfr'
    }
        ,
    {
        text: '经办人',
        sortable: false,
        dataIndex: 'czy'
    },
    {
        text: '',
        width: 60,
        sortable: false,
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
