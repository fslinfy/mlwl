﻿


Ext.define('MyApp.view.main.xsdgl.XsdglView', {
    extend: 'Ext.grid.Panel',
    xtype: 'XsdglView',
    requires: [
        'Ext.grid.feature.Summary',
        //   'MyApp.view.main.SubTable'
        , 'MyApp.model.CpkcmxModel'
        , 'MyApp.view.main.QueryToolbarView'
        , 'MyApp.store.CpkcStore'
        //, 'MyApp.view.main.cpkc.CpkclocStore'
        , 'MyApp.model.CpxsdmxModel'
        , 'MyApp.store.CurCpxsdmxStore'
        , 'MyApp.view.main.xsdgl.CpxsdEdit'
        , 'Ext.grid.selection.SpreadsheetModel'
        , 'Ext.grid.plugin.Clipboard'
    ],
    itemId: 'XsdglGrid',
    reference: 'XsdglGrid',
    closeAction: 'destroy',
    controller: 'XsdglCtrl',
    viewModel: {
        data: {
            'khmc': '', 'khid': 0,
            'cdmc': '', 'cdid': 0,
            'ckmc': '', 'ckid': 0,
            'cpmc': '', 'cpid': 0
        }
    },
    store: { type: 'CpkcStore' },
    enableHdMenu: false,
    enableTextSelection:true,
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
                { xtype: 'QueryCkmc', flex: 1 },
                { xtype: 'QueryCdmc', flex: 1 },
                { xtype: 'QueryCpmc', flex: 1 }
            ]
        }, {
            xtype: 'QueryToolbarView'
        }]
    }
    ]
    ,
    selModel: {
        type: 'spreadsheet',
        // Disables sorting by header click, though it will be still available via menu
      //  columnSelect: true,
        checkboxSelect: true,
        //pruneRemoved: false,
        extensible: 'y'
    },
    plugins: [
        'gridfilters'
     //   , 'clipboard'
      //  , 'selectionreplicator'
    ],
    listeners: {
        selectionchange: 'onSelectionChange'
        
    },


    //collapsible: false,
    columnLines: true,
    enableColumnHide: false,
    readOnly:true,
    //animCollapse: false,
    border: 1,
    columns: [{
        text: 'ID',
        hidden: true,
        dataIndex: 'id'
    },
    {
        text: '客户名称',
        itemId: 'khmc',
        flex: 2,
        sortable: false,
     
        hideable: true,
        hidden: (sys_customer_id > 0),
        dataIndex: 'khmc'
    },
    {
        text: '仓库名称',
        itemId: 'ckmc',
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
    }, {
        text: '包装',
        flex: 4,
        sortable: false,
        dataIndex: 'bzmc'
    },
    {
        text: '规格型号',
        flex: 2,
        sortable: false,
        dataIndex: 'cpgg'
    }, {
        text: '批号',
        flex: 2,
        sortable: false,
        dataIndex: 'cpph'
    },
    {
        text: '单位',
        width: 50,
        sortable: false,
        dataIndex: 'jldw'
    },
    {
        text: '库存',
        //width: 200,
        columns: [

            {
                xtype: 'numbercolumn',
                text: '数量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'kcsl',
                renderer: slrenderer

            },
            {
                xtype: 'numbercolumn',
                text: '重量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'kczl',
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
                //flex: 2,
                sortable: false,
                width: 80, align: 'right',
                dataIndex: 'kdsl',
                renderer: slrenderer

            },
            {
                xtype: 'numbercolumn',
                text: '重量',
                width: 80, align: 'right',
                sortable: false,
                //flex: 2,
                dataIndex: 'kdzl',
                renderer: slrenderer
            }]
    }
        ,
    {
        text: '可开单',
        //    flex: 4,
        columns: [


            {
                xtype: 'numbercolumn',
                text: '数量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'sl',
                renderer: slrenderer

            },
            {
                xtype: 'numbercolumn',
                text: '重量',
                width: 80, align: 'right',
                sortable: false,
                dataIndex: 'zl',
                renderer: slrenderer

            }]
    }/*,
    {
        xtype: 'checkcolumn',
        width: 70,
        text: '开单',
        dataIndex: 'kd'
    }*/
    ]


});
