Ext.define("MyApp.view.main.tree.QueryArea", {
  extend: "Ext.container.Container",
  alias: "widget.QueryArea",
  itemId: "QueryArea",
  items: [
    {
      xtype: "combo",
      fieldLabel: "分区",
      labelWidth: 40,
      store: sys_area_store,
      width: 150,
      margin: "0 10 0 3",
      queryMode: "local",
      displayField: "area",
      valueField: "area",
      name: "area",
      hidden: sys_location_areas < 2 || sys_location_id == 0,
      itemId: "combo_area",
      bind: "{area}",
      listeners: {
        afterrender: function () {
          this.setHidden(
            this.getStore().getCount() < 2 || sys_location_id == 0
          );
        },
      },
    },
  ],
});
