Ext.define("MyApp.view.main.EnterpriseEdit", {
  extend: "Ext.window.Window",
  xtype: "form-contact-window",
  reference: "popupWindow",
  title: "Resize Me",
  width: 500,
  height: 300,
  minWidth: 300,
  minHeight: 220,
  layout: "fit",
  closeAction: "destroy",
  bodyPadding: 20,
  plain: true,
  items: [
    {
      xtype: "form",
      defaultType: "textfield",
      fieldDefaults: { labelWidth: 40 },
      layout: { type: "vbox", align: "stretch" },
      bodyPadding: 5,
      border: false,
      items: [
        {
          fieldLabel: "\u4ee3\u7801",
          regex: /(^[0-9A-Z]{1,3}$)/,
          allowBank: false,
          name: "E_code",
        },
        { fieldLabel: "\u540d\u79f0", allowBank: false, name: "E_name" },
        { fieldLabel: "\u5730\u5740", name: "Address" },
        { fieldLabel: "\u7535\u8bdd", name: "Tel" },
      ],
    },
  ],
  buttons: [
    { text: "Send", itemId: "Send" },
    { text: "Cancel", itemId: "Cancel" },
  ],
});
