Ext.define("MyApp.view.main.commodityType.TypeTreeView", {
  extend: "Ext.tree.Panel",
  alias: "widget.TypeTreeView",
  // itemId: 'LeftTreeView',
  // controller: 'TypeTreeCtrl',
  //controller : 'CommodityTypeCtrl',
  requires: ["Ext.data.TreeStore"],
  title: "大类",
  itemId: "LeftTree",
  width: 160,
  singleExpand: true,
  minWidth: 120,
  maxWidth: 250,
  rootVisible: false,
  draggable: false,
  useArrows: true,
  lines: true,
  expanded: true,
  header: {
    items: [
      {
        xtype: "button",
        iconCls: "button-home-small",
        width: 28,
        height: 28,
        itemId: "btnTreeRefresh",
        icon: "images/refresh.gif",
        handler: function () {
          this.up("#LeftTree").getStore().reload();
        },
      },
    ],
  },
  store: {
    type: "tree",
    itemId: "treeStore",
    proxy: {
      type: "ajax",
      api: {
        read: sys_ActionPHP + "?act=typetreelist",
      },
      actionMethods: {
        read: "GET",
      },
      extraParams: {
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        p_e_code: sys_enterprise_code,
      },
    },
    root: {
      text: "全部",
      id: "ALL",
      T_code: "",
      Active: 0,
      expanded: true,
      draggable: false,
    },
    autoLoad: true,
  },
  /*
    tbar: {
        reference: 'tbar',
        items: [{
            text: '展开',
            handler: 'onTreeExpandAll'
        }, 
            "->",
            {
                //text: '刷新',
                itemId: 'btnTreeRefresh',
                icon: "images/refresh.gif",
                handler: function () {
                    this.up("#LeftTree").getStore().reload();
                }
            }
        
        ]
    },*/
  bbar: {
    reference: "bbar",
    items: [
      {
        text: "增加",
        itemId: "btnTreeAdd",
        icon: "images/add.gif",
        disabled: true,
        handler: "onTreeAddClick",
      },
      {
        text: "修改",
        itemId: "btnTreeEdit",
        disabled: true,
        icon: "images/edit.gif",
        handler: "onTreeEditClick",
      },
    ],
  },
  listeners: {
    select: function (node, event) {
      this.down("#btnTreeEdit").setDisabled(false);
    },
  },
});
