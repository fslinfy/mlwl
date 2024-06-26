﻿Ext.define("MyApp.view.main.users.UsersView", {
  extend: "Ext.panel.Panel",
  xtype: "UsersView",
  requires: [
    "MyApp.view.main.users.UsersGridView",
    "MyApp.view.main.users.UserTypeTreeView",
    "MyApp.view.main.users.UserTypeEdit",
  ],
  controller: "UsersCtrl",
  closeAction: "destroy",
  items: [
    {
      xtype: "panel",
      layout: "border",
      defaults: { collapsible: true, split: true, border: 1 },
      items: [
        { xtype: "UserTypeTreeView", region: "west" },
        { xtype: "UsersGridView", collapsible: false, region: "center" },
      ],
    },
  ],
});
