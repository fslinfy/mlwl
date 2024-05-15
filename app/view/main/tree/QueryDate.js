Ext.define("MyApp.view.main.tree.QueryDate", {
  extend: "Ext.container.Container",
  alias: "widget.QueryDate",
  itemId: "QueryDate",
  layout: "hbox",
  defaults: {
    border: 0,
    cls: "x-btn-text-icon details",
    disabled: false,
  },
  items: [
    {
      xtype: "datefield",
      fieldLabel: "开始",
      labelWidth: 30,
      margin: "0 0 0 5",
      width: 158,
      bind: "{start_date}",
      allowBlank: false,
      format: "Y-m-d", //,
      // maxValue: new Date()
    },
    {
      xtype: "datefield",
      fieldLabel: "至",
      labelWidth: 15,
      width: 142,
      bind: "{end_date}",
      allowBlank: false,
      format: "Y-m-d",
      //maxValue: new Date(),
      margin: "0 10 0 0",
    },
  ],
});
