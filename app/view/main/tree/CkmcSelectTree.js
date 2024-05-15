Ext.define("MyApp.view.main.tree.CkmcSelectTree", {
  extend: "Ext.window.Window",
  xtype: "selectCkmcWindow",
  reference: "popupSelectCkmcWindow",
  itemId: "selectCkmcWindow",
  title: "\u786e\u5b9a\u4ed3\u5e93",
  width: 400,
  height: 300,
  minWidth: 300,
  minHeight: 300,
  layout: "fit",
  closeAction: "destroy",
  modal: true,
  items: [
    {
      xtype: "treepanel",
      reference: "selectCkmcTreePanel",
      itemId: "selectCkmcTreePanel",
      singleExpand: false,
      rootVisible: false,
      draggable: false,
      useArrows: true,
      lines: true,
      expanded: true,
      store: {
        itemId: "selectCkmcTreeStore",
        type: "tree",
        proxy: {
          type: "ajax",
          api: { read: sys_ActionPHP + "?act\x3dlocationselecttreelist" },
          actionMethods: { read: "GET" },
          extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code,
            p_l_id: sys_location_id,
            loc: "lidstring",
            displayall: sys_DisplayAll,
          },
        },
        root: {
          text: "\u5168\u90e8",
          id: "ALL",
          code: "",
          checked: false,
          expanded: true,
          draggable: false,
        },
        autoLoad: true,
      },
      bbar: {
        reference: "bbar",
        items: [
          "-\x3e",
          {
            text: "\u786e\u8ba4",
            itemId: "btnCkmcTreeAdd",
            icon: "images/right.gif",
          },
          {
            text: "\u653e\u5f03",
            itemId: "btnCkmcTreeEdit",
            icon: "images/close.gif",
            handler: function () {
              this.up("window").close();
            },
          },
        ],
      },
      listeners: {
        select: function (node, event) {
          if (event.data.leaf);
          else;
        },
      },
    },
  ],
});
