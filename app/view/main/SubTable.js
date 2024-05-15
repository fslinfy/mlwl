Ext.define("MyApp.view.main.SubTable", {
  extend: "Ext.grid.plugin.RowExpander",
  alias: "plugin.subtable",
  rowBodyTpl: [
    '\x3ctable  class\x3d"' +
      Ext.baseCSSPrefix +
      'grid-subtable"  style\x3d" width:100%; border-collapse:collapse; "  border\x3d1 \x3e',
    "{%",
    "this.owner.renderTable(out, values);",
    "%}",
    "\x3c/table\x3e",
  ],
  init: function (grid) {
    var me = this,
      columns = me.columns,
      len,
      i,
      columnCfg;
    me.callParent(arguments);
    me.columns = [];
    if (columns)
      for (i = 0, len = columns.length; i < len; ++i) {
        columnCfg = Ext.apply({ preventRegister: true }, columns[i]);
        columnCfg.xtype = columnCfg.xtype || "gridcolumn";
        me.columns.push(Ext.widget(columnCfg));
      }
  },
  destroy: function () {
    var columns = this.columns,
      len,
      i;
    if (columns)
      for (i = 0, len = columns.length; i < len; ++i) columns[i].destroy();
    this.columns = null;
    this.callParent();
  },
  getRowBodyFeatureData: function (record, idx, rowValues) {
    this.callParent(arguments);
    rowValues.rowBodyCls += " " + Ext.baseCSSPrefix + "grid-subtable-row";
  },
  renderTable: function (out, rowValues) {
    var me = this,
      columns = me.columns,
      numColumns = columns.length,
      associatedRecords = me.getAssociatedRecords(rowValues.record),
      recCount = associatedRecords.length,
      rec,
      column,
      i,
      j,
      value;
    out.push("\x3cthead\x3e");
    for (j = 0; j < numColumns; j++)
      out.push(
        '\x3cth class\x3d"' +
          Ext.baseCSSPrefix +
          'grid-subtable-header" style\x3d"font-size:1.1em;text-align:center; padding-top:5px;  padding-bottom:4px;  background-color:#A7C942; " \x3e',
        columns[j].text,
        "\x3c/th\x3e"
      );
    out.push("\x3c/thead\x3e\x3ctbody\x3e");
    for (i = 0; i < recCount; i++) {
      rec = associatedRecords[i];
      out.push("\x3ctr\x3e");
      for (j = 0; j < numColumns; j++) {
        column = columns[j];
        value = rec.get(column.dataIndex);
        if (column.renderer && column.renderer.call)
          value = column.renderer.call(column.scope || me, value, {}, rec);
        out.push(
          '\x3ctd class\x3d"' + Ext.baseCSSPrefix + 'grid-subtable-cell"'
        );
        if (column.width != null)
          out.push(' style\x3d"width:' + column.width + 'px"');
        out.push(
          '\x3e\x3cdiv class\x3d"' + Ext.baseCSSPrefix + 'grid-cell-inner"\x3e',
          value,
          "\x3c/div\x3e\x3c/td\x3e"
        );
      }
      out.push("\x3c/tr\x3e");
    }
    out.push("\x3c/tbody\x3e");
  },
  getRowBodyContentsFn: function (rowBodyTpl) {
    var me = this;
    return function (rowValues) {
      rowBodyTpl.owner = me;
      return rowBodyTpl.applyTemplate(rowValues);
    };
  },
  getAssociatedRecords: function (record) {
    return record[this.association]().getRange();
  },
});
