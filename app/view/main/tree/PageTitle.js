Ext.define("MyApp.view.main.tree.PageTitle", {
  extend: "Ext.container.Container",
  alias: "widget.PageTitle",
  itemId: "PageTitle",
  items: [
    {
      xtype: "displayfield",
      // itemId:"PageTitle",
      value: PageTitleName,
      style: {
        "font-size": "16px",
        "font-weight": "bold",
        margin: "5px 30px 0 0",
        color: "#000",
      },
      fieldCls: "biggertext",
      hideLabel: true,
    },
  ],
});
