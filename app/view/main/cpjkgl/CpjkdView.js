Ext.define('MyApp.view.main.cpjkgl.CpjkdView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CpjkdView',
    title: 'Cpjkd',
    requires: [
        'MyApp.store.CustomerStore'
        , 'MyApp.view.main.QueryToolbarView'
        , 'MyApp.model.CpjkdModel'
        , 'MyApp.model.CpjkdModel'
        , 'MyApp.model.CpjkdjeModel'
        , 'MyApp.store.CurCpjkdjeStore'
        , 'MyApp.model.CurCpjkdcwModel'
        , 'MyApp.store.CurCpjkdcwStore'
        , 'MyApp.model.CurCpjkdmxModel'
        , 'MyApp.store.CurCpjkdmxStore'
        , 'MyApp.model.CpjkdmxViewModel'
        , 'MyApp.model.StatesModel'
        , 'MyApp.store.StatesStore'
        , 'MyApp.view.main.cpjkgl.CpjkdEdit'
        , 'MyApp.view.main.cpjkgl.CpjkdmxEdit'
        , 'MyApp.view.main.tree.WorkerSelectTree'
    ],
    id: 'CpjkdGrid',
    plugins: ['gridfilters'],
    controller: 'CpjkdCtrl',
    store: { type: 'CustomerStore' },
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
                    value:"商品进仓单处理",
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
    columns: [{
        text: '客户代码', width: 80, dataIndex: 'C_code', align: 'left'
    },
    {
        text: '客户名称', dataIndex: 'C_name', flex: 1, align: 'left'

    },
    {
        text: '客户简称', dataIndex: 'C_shortname', flex: 1, align: 'left'
    },
    {
        text: '拼音码', dataIndex: 'Py_code', flex: 1, align: 'left'
    },
    {
        text: '联系电话', dataIndex: 'Tel', flex: 1, align: 'left'
    }
        ,
    {
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            xtype: 'button',
            text: '入库单',
            handler: 'onshowEditView'
        }
    }
    ],
    listeners: {
        //   select: 'onItemSelected'
    }

});
