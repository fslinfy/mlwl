Ext.define("MyApp.view.main.tree.QueryKhmc", {
  extend: "Ext.container.Container",
  alias: "widget.QueryKhmc",
  itemId: "QueryKhmc",
  layout: "hbox",
  flex: 1,
  defaults: {
    border: 0,
    cls: "x-btn-text-icon details",
    disabled: false,
  },
  items: [
    {
      xtype: "textfield",
      hidden: true,
      width: 0,
      itemId: "textQueryKhid",
      bind: "{khid}",
    },
    {
      labelWidth: 60,
      xtype: "triggerfield",
      //  hidden: (sys_customer_id > 0),
      fieldLabel: "客户名称",
      itemId: "textQueryKhmc",
      bind: "{khmc}",
      margin: "1 0 1 10",
      flex: 1,
      triggerCls: "x-form-clear-trigger",
      onTriggerClick: function () {
        this.reset();
        //console.log("onTriggerClick");
        that.getView().getViewModel().set("khid", sys_customer_id);
        //  this.up("gridpanel").getViewModel().set('khid', 0);
        //khmcTriggerClick();
      },
    },
    {
      xtype: "button",
      itemId: "btnQueryKhmc",
      margin: "1 5 1 0",
      text: "...",
      // hidden: (sys_customer_id > 0),
      width: 30,
    },
  ],
});
