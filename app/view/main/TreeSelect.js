Ext.define("MyApp.view.main.TreeSelect", { extend: "Ext.Mixin" });
function treeSelect(mc, the, kcbz, viewname, resh, callback) {
  this.callback = callback;
  this.mc = mc;
  this.viewname = viewname;
  var url = "";
  switch (mc) {
    case "ckmc":
      url = sys_ActionPHP + "?act\x3dlocationselecttreelist";
      this.f_id = "ckid";
      this.f_mc = "ckmc";
      break;
    case "khmc":
      url = sys_ActionPHP + "?act\x3dcustomerselecttreelist";
      this.f_id = "khid";
      this.f_mc = "khmc";
      break;
    case "cpmc":
      url = sys_ActionPHP + "?act\x3dcommodityselecttreelist";
      this.f_id = "cpid";
      this.f_mc = "cpmc";
      break;
    case "cdmc":
      url = sys_ActionPHP + "?act\x3dproducesselecttreelist";
      this.f_id = "cdid";
      this.f_mc = "cdmc";
      break;
    case "bzmc":
      url = sys_ActionPHP + "?act\x3dpackingselecttreelist";
      this.f_id = "bzid";
      this.f_mc = "bzmc";
      break;
    case "work":
      url = sys_ActionPHP + "?act\x3dworkselecttreelist";
      this.f_id = "workid";
      this.f_mc = "workmc";
      break;
    default:
      return;
      break;
  }
  var treestore = Ext.create("Ext.data.TreeStore", {
    autoLoad: true,
    proxy: {
      type: "ajax",
      api: { read: url },
      actionMethods: { read: "GET" },
      extraParams: {
        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
        p_e_code: sys_enterprise_code,
        p_l_id: sys_location_id,
        p_c_id: sys_customer_id,
        displayall: kcbz,
      },
    },
    root: {
      id: "",
      code: "",
      py_code: "",
      text: "\u5168\u90e8",
      expanded: true,
    },
  });
  var selecttree = Ext.create("Ext.tree.Panel", {
    singleExpand: true,
    rootVisible: false,
    draggable: false,
    useArrows: true,
    lines: true,
    expanded: true,
    frame: true,
    border: true,
    itemId: "selectTreePanel",
    reference: "selectTreePanel",
    store: treestore,
    tbar: [
      {
        labelWidth: 40,
        xtype: "triggerfield",
        fieldLabel: "\u8fc7\u6ee4",
        flex: 1,
        triggerCls: "x-form-clear-trigger",
        onTriggerClick: function () {
          this.reset();
        },
        listeners: {
          change: function () {
            var tree = this.up("treepanel"),
              v,
              matches = 0,
              v = new RegExp(this.getValue(), "i");
            Ext.suspendLayouts();
            tree.store.filter({
              filterFn: function (node) {
                var children = node.childNodes,
                  len = children && children.length,
                  visible = node.isLeaf()
                    ? v.test(node.get("text")) ||
                      v.test(node.get("py_code")) ||
                      v.test(node.get("code"))
                    : false,
                  i;
                for (
                  i = 0;
                  i < len && !(visible = children[i].get("visible"));
                  i++
                );
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
    bbar: {
      reference: "bbar",
      items: [
        "-\x3e",
        {
          text: "\u786e\u8ba4",
          itemId: "btnTreeSelect",
          icon: "images/right.gif",
          disabled: true,
          handler: function () {
            onSelectOkClick();
          },
        },
        {
          text: "\u653e\u5f03",
          itemId: "btnCkbmTreeEdit",
          icon: "images/close.gif",
          handler: function () {
            selecttreeWin.Close();
          },
        },
      ],
    },
    listeners: {
      select: function (node, event) {
        if (event.data.leaf) this.down("#btnTreeSelect").setDisabled(false);
        else this.down("#btnTreeSelect").setDisabled(true);
      },
    },
  });
  selecttreeWin = new Ext.Window({
    width: 440,
    height: 440,
    title: "\u8bf7\u9009\u62e9\uff1a",
    plain: true,
    resizable: false,
    frame: true,
    layout: "fit",
    closeAction: "destroy",
    border: false,
    items: [selecttree],
  }).show();
  onSelectOkClick = function () {
    var mc = this.mc;
    var viewname = this.viewname;
    //console.log("viewname", viewname);
    var sm = selecttree.getSelectionModel();
    if (sm.hasSelection()) {
      node = sm.getSelection()[0];
      //console.log("node", node);
      selecttreeWin.close();
      if (callback == undefined) {
        viewname.getViewModel().set(this.f_mc, node.data.text);
        viewname.getViewModel().set(this.f_id, node.data.id);
        if (resh) that.onBtnQueryClick();
        return;
      }
      if (callback.length > 0) callback(node);
    }
  };
}
