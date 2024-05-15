Ext.define("MyApp.view.main.tree.NewCpjkSelectTree", {
  extend: "Ext.window.Window",
  xtype: "selectJkspWindow",
  reference: "popupSelectJkspWindow",
  itemId: "selectJkspWindow",
  title: "选择商品",
  width: 800,
  height: 600,
  minWidth: 500,
  minHeight: 300,
  layout: "fit",
  closeAction: "destroy",
  modal: true,
  layout: {
    type: "hbox",
    align: "stretch",
  },
  defaults: {
    xtype: "treepanel",
    singleExpand: false,
    rootVisible: true,
    draggable: false,
    useArrows: true,
    lines: true,
    border: 1,
    expanded: true,
    flex: 1,
  },
  //bodyPadding: 5,
  border: false,
  items: [
    {
      reference: "selectCdmcTreePanel",
      flex: 2,
      itemId: "selectCdmcTreePanel",
      store: {
        itemId: "selectJkspTreeStore",
        type: "tree",
        proxy: {
          type: "ajax",
          api: {
            read: sys_ActionPHP + "?act=producesselecttreelist",
          },
          actionMethods: {
            read: "GET",
          },
          extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code,
            p_l_id: sys_location_id,
            displayall: "",
          },
        },
        root: {
          text: "产地名称",
          id: "ALL",
          code: "",
          checked: false,
          expanded: true,
          draggable: false,
        },
        autoLoad: true,
      },
      tbar: [
        {
          labelWidth: 40,
          xtype: "triggerfield",
          fieldLabel: "过滤",
          flex: 1,
          triggerCls: "x-form-clear-trigger",
          onTriggerClick: function () {
            this.reset();
          },
          listeners: {
            change: function () {
              var tree = this.up("treepanel"),
                v,
                matches = 0;
              v = new RegExp(this.getValue(), "i");
              Ext.suspendLayouts();
              tree.store.filter({
                filterFn: function (node) {
                  var children = node.childNodes,
                    len = children && children.length,
                    visible = node.isLeaf() ? v.test(node.get("text")) : false,
                    i;
                  for (
                    i = 0;
                    i < len && !(visible = children[i].get("visible"));
                    i++
                  );
                  if (visible && node.isLeaf()) {
                    matches++;
                  }
                  return visible;
                },
                id: "titleFilter",
              });
              Ext.resumeLayouts(true);
            },
            buffer: 250,
          },
        },
      ],
    },
    {
      reference: "selectCdmcTreePanel1",
      itemId: "selectCdmcTreePanel1",
      flex: 4,
      margin: "0 5 0 5",
      store: {
        itemId: "selectJkspTreeStore1",
        type: "tree",
        proxy: {
          type: "ajax",
          api: {
            read: sys_ActionPHP + "?act=commodityselecttreelist",
          },
          actionMethods: {
            read: "GET",
          },
          extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code,
            p_l_id: sys_location_id,
            displayall: "",
          },
        },
        root: {
          text: "商品名称",
          id: "ALL",
          code: "",
          checked: false,
          expanded: true,
          draggable: false,
        },
        autoLoad: true,
      },
      tbar: [
        {
          labelWidth: 40,
          xtype: "triggerfield",
          fieldLabel: "过滤",
          flex: 1,
          triggerCls: "x-form-clear-trigger",
          onTriggerClick: function () {
            this.reset();
          },
          listeners: {
            change: function () {
              var tree = this.up("treepanel"),
                v,
                matches = 0;
              v = new RegExp(this.getValue(), "i");
              Ext.suspendLayouts();
              tree.store.filter({
                filterFn: function (node) {
                  var children = node.childNodes,
                    len = children && children.length,
                    visible = node.isLeaf() ? v.test(node.get("text")) : false,
                    i;
                  for (
                    i = 0;
                    i < len && !(visible = children[i].get("visible"));
                    i++
                  );
                  if (visible && node.isLeaf()) {
                    matches++;
                  }
                  return visible;
                },
                id: "titleFilter",
              });
              Ext.resumeLayouts(true);
            },
            buffer: 250,
          },
        },
      ],
    },
    {
      reference: "selectCdmcTreePanel2",
      itemId: "selectCdmcTreePanel2",
      flex: 3,
      store: {
        itemId: "selectJkspTreeStore2",
        type: "tree",
        proxy: {
          type: "ajax",
          api: {
            read: sys_ActionPHP + "?act=packingselecttreelist&gfbz=0",
          },
          actionMethods: {
            read: "GET",
          },
          extraParams: {
            p_e_code: sys_enterprise_code,
            p_l_id: sys_location_id,
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
          },
        },
        root: {
          text: "包装规格",
          id: "ALL",
          code: "",
          checked: false,
          expanded: true,
          draggable: false,
        },
        autoLoad: false,
      },
      tbar: [
        {
          labelWidth: 40,
          xtype: "triggerfield",
          fieldLabel: "过滤",
          flex: 1,
          triggerCls: "x-form-clear-trigger",
          onTriggerClick: function () {
            this.reset();
          },
          listeners: {
            change: function () {
              var tree = this.up("treepanel"),
                v,
                matches = 0;
              v = new RegExp(this.getValue(), "i");
              Ext.suspendLayouts();
              tree.store.filter({
                filterFn: function (node) {
                  var children = node.childNodes,
                    len = children && children.length,
                    visible = node.isLeaf() ? v.test(node.get("text")) : false,
                    i;
                  for (
                    i = 0;
                    i < len && !(visible = children[i].get("visible"));
                    i++
                  );
                  if (visible && node.isLeaf()) {
                    matches++;
                  }
                  return visible;
                },
                id: "titleFilter",
              });
              Ext.resumeLayouts(true);
            },
            buffer: 250,
          },
        },
      ],
    },
  ],
  buttons: [
    "->",
    {
      text: "确认",
      itemId: "btnJkspTreeAdd",
      icon: "images/right.gif",
      handler: "onJkspSelectOkClick",
    },
    {
      text: "放弃",
      icon: "images/close.gif",
      handler: function () {
        this.up("#selectJkspWindow").close();
      },
    },
  ],
});
