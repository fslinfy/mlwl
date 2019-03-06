﻿Ext.define('MyApp.view.main.cwgl.CwsjlocView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CwsjlocView',
    title: 'Cwsj',
    requires: [
        'MyApp.store.CwsjStore',
        'MyApp.view.main.QueryToolbarView'
        , 'MyApp.view.main.tree.QueryDate'
    ],
    viewModel: {
        data: { 'start_date': new Date(), 'end_date': new Date()}
    },
  
    reference: 'cwsjlistview',
    plugins: ['gridfilters'],
    controller: 'CwsjlocCtrl',
    store: { type: 'CwsjStore' },
    closeAction: 'destroy',
    tbar: [{
        xtype: 'container',
        flex: 1,
        layout: 'hbox',
        items: [{
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [
                { xtype: 'QueryDate', itemId: 'QueryDate', hidden: true },
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

    columns: [
        {
            text: '流水号', dataIndex: 'sjdh', width: 100
        },
        {
            text: '日期', dataIndex: 'sjrq',
            width: 100,

            formatter: 'date("Y-m-d")',
            sortable: false,
            hideable: false

        },
        {
            text: '客户', dataIndex: 'khmc', flex: 3
        },
        {
            text: '摘要', dataIndex: 'cwzy', flex: 3
        },
        {
            xtype: 'numbercolumn',
            text: '收入金额',
            dataIndex: 'srje',
            renderer: jerenderer
        },
        {
            xtype: 'numbercolumn',
            text: '支出金额',
            dataIndex: 'jcje',
            renderer: jerenderer
        },

        {
            text: '备注', dataIndex: 'cnote'


        },
        {
            text: '经办人', dataIndex: 'jbr'

        },
        {
            text: '操作', dataIndex: 'czy'

        }/*,
        {
            xtype: 'widgetcolumn',
            width: 90, sortable: false,
            widget: {
                xtype: 'button',
                text: '审核',
                handler: 'onCwsjshcl'
            }
        }*/
    ],
    listeners: {
        select: 'onItemSelected'
    }
});
