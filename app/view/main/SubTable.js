/**
 * A small grid nested within a parent grid's row. 
 *
 * See the [Kitchen Sink](http://dev.sencha.com/extjs/5.0.1/examples/kitchensink/#customer-grid) for example usage.
 */
Ext.define('MyApp.view.main.SubTable', {
    //extend: 'MyApp.view.main.RowExpander',
     extend:'Ext.grid.plugin.RowExpander',

    alias: 'plugin.subtable',



//rowBodyTpl: ['<table  class="' + Ext.baseCSSPrefix + 'grid-subtable"  style=" font-family:\"Trebuchet MS\", Arial, Helvetica, sans-serif; width:100%; border-collapse:collapse; "  border=1 >',
rowBodyTpl: ['<table  class="' + Ext.baseCSSPrefix + 'grid-subtable"  style=" width:100%; border-collapse:collapse; "  border=1 >',
        '{%',
            'this.owner.renderTable(out, values);',
        '%}',
        '</table>'
    ],
/*
rowBodyTpl: ['<table  class="' + Ext.baseCSSPrefix + 'grid-subtable" style="width:100%; " id="customers" >',
        '{%',
            'this.owner.renderTable(out, values);',
        '%}',
        '</table>'
    ],
*/
    init: function(grid) {
        var me = this,
            columns = me.columns,
            len, i, columnCfg;

        me.callParent(arguments);

        me.columns = [];
        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                // Don't register with the component manager, we create them to use
                // their rendering smarts, but don't want to treat them as real components
                columnCfg = Ext.apply({
                    preventRegister: true
                }, columns[i]);
                columnCfg.xtype = columnCfg.xtype || 'gridcolumn';
                me.columns.push(Ext.widget(columnCfg));
            }
        }
    },

    destroy: function() {
        var columns = this.columns,
            len, i;

        if (columns) {
            for (i = 0, len = columns.length; i < len; ++i) {
                columns[i].destroy();
            }
        }
        this.columns = null;
        this.callParent();
    },

    getRowBodyFeatureData: function(record, idx, rowValues) {
        this.callParent(arguments);
        rowValues.rowBodyCls += ' ' + Ext.baseCSSPrefix + 'grid-subtable-row';
    },

    renderTable: function(out, rowValues) {
        var me = this,
            columns = me.columns,
            numColumns = columns.length,
            associatedRecords = me.getAssociatedRecords(rowValues.record),
            recCount = associatedRecords.length,
            rec, column, i, j, value;

        out.push('<thead>');
        for (j = 0; j < numColumns; j++) {
            out.push('<th class="' + Ext.baseCSSPrefix + 'grid-subtable-header" style="font-size:1.1em;text-align:center; padding-top:5px;  padding-bottom:4px;  background-color:#A7C942; " >', columns[j].text, '</th>');
        }
        out.push('</thead><tbody>');
        for (i = 0; i < recCount; i++) {
            rec = associatedRecords[i];
            out.push('<tr>');
            for (j = 0; j < numColumns; j++) {
                column = columns[j];
                value = rec.get(column.dataIndex);
                if (column.renderer && column.renderer.call) {
                    value = column.renderer.call(column.scope || me, value, {}, rec);
                }
                out.push('<td class="' + Ext.baseCSSPrefix + 'grid-subtable-cell"');
                if (column.width != null) {
                    out.push(' style="width:' + column.width + 'px"');
                }
                out.push('><div class="' + Ext.baseCSSPrefix + 'grid-cell-inner">', value, '</div></td>');
            }
            out.push('</tr>');
        }
        out.push('</tbody>');
    },
    
    getRowBodyContentsFn: function(rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues);
        };
    },
    
    getAssociatedRecords: function(record) {
        return record[this.association]().getRange();
    }
});