Ext.define("MyApp.view.main.commodity.CommodityTypeTreeView", {
  extend: "Ext.tree.Panel",
  alias: "widget.CommodityTypeTreeView",
  requires: ["Ext.data.TreeStore"],
  title: "\u5206\u7c7b",
  itemId: "LeftTree",
  width: 180,
  singleExpand: true,
  minWidth: 120,
  maxWidth: 250,
  closeAction: "destroy",
  rootVisible: true,
  draggable: false,
  useArrows: true,
  lines: true,
  expanded: true,
  tools: [
    {
      type: "refresh",
      tooltip: "Reload Data",
      handler: function () {
        this.up("#LeftTree").getStore().reload();
      },
    },
  ],
  store: {
    type: "tree",
    proxy: {
      type: "ajax",
      api: { read: sys_ActionPHP + "?act\x3dcommoditytypetreelist" },
      actionMethods: { read: "GET" },
      extraParams: {
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        p_e_code: sys_enterprise_code,
        displayall: sys_DisplayAll,
      },
    },
    root: {
      text: "\u5168\u90e8",
      id: "ALL",
      code: "",
      T_id: 0,
      CT_id: 0,
      name: "",
      pid: 0,
      Active: 0,
      expanded: true,
      draggable: false,
    },
    autoLoad: true,
  },
  bbar: {
    reference: "bbar",
    items: [
      {
        text: "\u589e\u52a0",
        itemId: "btnTreeAdd",
        icon: "images/add.gif",
        disabled: true,
        handler: "onTreeAddClick",
      },
      {
        text: "\u4fee\u6539",
        itemId: "btnTreeEdit",
        disabled: true,
        icon: "images/edit.gif",
        handler: "onTreeEditClick",
      },
    ],
  },
  listeners: {
    select: function (node, event) {
      if (event.data.root) {
        this.down("#btnTreeEdit").setDisabled(true);
        this.down("#btnTreeAdd").setDisabled(false);
      } else if (event.data.pid == 0) {
        this.down("#btnTreeEdit").setDisabled(false);
        this.down("#btnTreeAdd").setDisabled(false);
      } else {
        this.down("#btnTreeEdit").setDisabled(false);
        this.down("#btnTreeAdd").setDisabled(true);
      }
    },
  },
});
