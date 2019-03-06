﻿Ext.define('MyApp.view.main.cptzdgl.CptzdView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CptzdView',
    requires: [
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.store.CpkclocStore'
        , 'MyApp.store.CurCptzdmxStore'
        , 'MyApp.store.CurCptzdjeStore'
        , 'MyApp.view.main.cptzdgl.CptzdmxEdit'
        , 'MyApp.view.main.tree.QueryArea'
        , 'Ext.grid.selection.SpreadsheetModel'
        , 'Ext.grid.plugin.Clipboard'
        , 'MyApp.view.main.DataSave'
    ],
    itemId: 'CptzdGrid',
    reference: 'CptzdGrid',
    controller: 'CptzdCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'cdmc': '', 'cdid': 0,
            'ckmc': '', 'ckid': 0,
            'area': '',
            'cpmc': '', 'cpid': 0
        }
    },
    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
        columnSelect: true,
        checkboxSelect: true,
        pruneRemoved: false,
        extensible: 'y'
    },
    plugins: [
        'gridfilters'
        , 'clipboard'
        , 'selectionreplicator'
    ],
    listeners: {
        selectionchange: 'onSelectionChange'
    },
    store: { type: 'CpkclocStore' },
    closeAction: 'destroy',
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

                {
                    xtype: 'QueryKhmc', flex: 1,
                    hidden: (sys_customer_id > 0)
                },
                {
                    xtype: 'QueryCkmc', flex: 1,
                    hidden: (sys_location_id > 0)
                },
                { xtype: 'QueryArea' },
                { xtype: 'QueryCdmc', flex: 1 },
                { xtype: 'QueryCpmc', flex: 1 }

            ]
        }, {
            xtype: 'QueryToolbarView'
        }]
    }
    ]
    ,
    enableColumnHide: false,
    columnLines: true,

    columns: [{
        text: 'ID',
        hidden: true,
        hideable: false,
        dataIndex: 'id'
    },

    {
        text: '客户名称',
        flex: 2,
        sortable: false,
        hideable: true,
        hidden: (sys_customer_id > 0),
        dataIndex: 'khmc'
    },
    {
        text: '仓库名称',
        flex: 2,
        sortable: false,
        hideable: true,
        hidden: (sys_location_id > 0),
        dataIndex: 'ckmc'
    },

    {
        text: '产地名称',
        flex: 2,
        sortable: false,
        dataIndex: 'cdmc'
    },
    {
        text: '商品名称',
        flex: 4,
        sortable: false,
        dataIndex: 'cpmc'
    },
    {
        text: '包装',
        flex: 3, sortable: false,
        dataIndex: 'bzmc'
    },
    {
        text: '规格型号',
        flex: 2, sortable: false,
        dataIndex: 'cpgg'
    }, {
        text: '批号',
        flex: 2, sortable: false,
        dataIndex: 'cpph'
    },
    {
        text: '区',
        width: 70,
        hidden: ((sys_location_areas < 2) || (sys_location_id == 0)),
        sortable: false,
        dataIndex: 'area'
    },
    {
        text: '仓位',
        width: 70, sortable: false,
        dataIndex: 'cw'
    },
    {
        text: '单位',
        width: 50, sortable: false,
        dataIndex: 'jldw'
    },


    {
        xtype: 'numbercolumn',
        text: '数量',
        flex: 2, sortable: false,
        dataIndex: 'sl',
        renderer: zlrenderer
    },

    {
        xtype: 'numbercolumn',
        text: '重量',
        flex: 2, sortable: false,
        dataIndex: 'zl',
        renderer: zlrenderer
    }, {
        xtype: 'datecolumn',
        text: '进库日期',
        format: 'y-m-d',
        width: 90,
        sortable: false,
        dataIndex: 'czrq'
    },
    {
        text: '仓位说明',
        width: 80, sortable: false,
        dataIndex: 'sm'
    }
    ]


});
