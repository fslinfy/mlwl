Ext.define('MyApp.view.main.cktjjd.CktjjdView', {
    extend: 'Ext.grid.Panel',
    xtype: 'CktjjdView',
    title: 'Cktjjd',
    requires: [
        'MyApp.store.CktjjdStore',
        'MyApp.view.main.QueryToolbarView'
    ],
    // id: 'CktjjdGrid',
      plugins: ['gridfilters'],
    viewModel: {
        data: {
            'ny': (new Date()).getFullYear()
        }
    },
    controller: 'CktjjdCtrl',
    store: { type: 'CktjjdStore' },
    closeAction: 'destroy',
    tbar: [
        {
            xtype: 'container',
            flex: 1,
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: "ny",
                    fieldLabel: '选择年度',
              
                    store: [(new Date).getFullYear() - 2, (new Date).getFullYear() - 1, (new Date).getFullYear()],
                    queryMode: 'local',
                    allowBlank: false,
                    bind: "{ny}",
                    listeners: {
                            change: function (field, e) {
                                cktjjdQuery(e);
                                //console.log(e);
                            }
                        }
                },
                ]
            },
            {
                xtype: 'QueryToolbarView'
            }
            ]
        }
    ],
    columnLines: true,
    columns: [
        {
            text: '年', width: 80, dataIndex: 'ny', align: 'left'
        },
        {
            text: '月', width: 80, dataIndex: 'yu', align: 'center'
        },
        {
            text: '状态', width: 120, dataIndex: 'status', align: 'center',
            renderer: function (value, cellmeta) {
                if (value == 1) {
                    return "已统计";
                }
                else {
                    if (value == 2) {
                        return "已封帐";
                    }
                }
                return "";
            }
        },
        {
            text: '经手', width: 120, dataIndex: 'jby', align: 'left'
        },
        {
            text: '日期', width: 120, dataIndex: 'rq', align: 'left', formatter: 'date("Y-m-d")',
        }

    ],
    listeners: {
        select: 'onItemSelected'
    }
});
