Ext.define("MyApp.view.main.pivot.PivotCtrl", {
  extend: "Ext.app.ViewController",
  alias: "controller.PivotCtrl",
  requires: ["MyApp.view.main.pivot.PivotView"],
  yearLabelRenderer: function (value) {
    return "Year " + value;
  },
  monthLabelRenderer: function (value) {
    return Ext.Date.monthNames[value];
  },
  expandAll: function () {
    this.getView().expandAll();
  },
  collapseAll: function () {
    this.getView().collapseAll();
  },
  onPivotBeforeUpdate: function () {
    Ext.log('Event "pivotbeforeupdate" fired');
  },
  onPivotUpdate: function () {
    Ext.log('Event "pivotupdate" fired');
  },
});
