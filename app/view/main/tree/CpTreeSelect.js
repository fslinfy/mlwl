Ext.require("Ext.slider.*");
Ext.define("MyApp.view.main.tree.CpTreeSelect", {
  extend: "Ext.Mixin"
});
function cpbmtreeSelect(callback) {
  this.callback = callback;
  var cpselecttree = Ext.create("Ext.Panel", {
    singleExpand: true,
    rootVisible: false,
    draggable: false,
    useArrows: true,
    lines: true,
    expanded: true,
    border: false,
    layout: {
      type: "hbox",
      align: "stretch",
    },
    reference: "selectPanel",
    itemId: "selectePanel",
    defaults: {
      xtype: "treepanel",
      singleExpand: false,
      rootVisible: false,
      draggable: false,
      useArrows: true,
      lines: true,
      border: 1,
      expanded: true,
      flex: 1,
    },
    items: [{
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
          autoLoad: false,
        },
        tbar: [{
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
                    i = 0; i < len && !(visible = children[i].get("visible")); i++
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
        }, ],
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
        tbar: [{
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
                    i = 0; i < len && !(visible = children[i].get("visible")); i++
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
        }, ],
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
              p_l_id: sys_current_ckid,
              p_c_id: sys_current_khid,
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
          autoLoad: true,
        },
        tbar: [{
            labelWidth: 40,
            xtype: "triggerfield",
            fieldLabel: "过滤",
            flex: 1,
            triggerCls: "x-form-clear-trigger",
            onTriggerClick: function () {
              this.reset();
            },
            listeners: {
              show: function () {
                console.log("show");
              },
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
                      i = 0; i < len && !(visible = children[i].get("visible")); i++
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
            }
          },
          {
            type: "button",
            icon: "images/refresh.png",
            itemId: "btnbzmcTreerefresh",
            Id: "btnbzmcTreerefresh",
            reference: "",
            handler: function () {
              var s = this.up("#selectCdmcTreePanel2").getStore();
              s.proxy.extraParams.p_c_id = sys_current_khid;
              s.proxy.extraParams.p_l_id = sys_current_ckid;
              s.proxy.extraParams.aaaaaaaaaa = "3";
              s.reload();
            }
          }
        ]
      }
    ],
    buttons: [
      "->",
      {
        text: "确认",
        itemId: "btnJkspTreeAdd",
        icon: "images/right.gif",
        handler: function () {
          var ret = new Object();
          selecttree = cpselecttree.down("#selectCdmcTreePanel"); // this.ge。.up("#selectPanel").down("#selectCdmcTreePanel2");
          //console.log(selecttree);
          sm = selecttree.getSelectionModel();
          if (sm.hasSelection() && sm.getSelection()[0].isLeaf()) {
            node = sm.getSelection()[0];
            console.log("node", node.data);
            ret.cdmcdata = node.data;
          } else {
            Ext.MessageBox.alert("注意！", "请选择商品产地!");
            return false;
          }
          //  console.log("ok");
          selecttree = cpselecttree.down("#selectCdmcTreePanel2"); // this.ge。.up("#selectPanel").down("#selectCdmcTreePanel2");
          //console.log(selecttree);
          sm = selecttree.getSelectionModel();
          if (sm.hasSelection() && sm.getSelection()[0].isLeaf() ) {
            node = sm.getSelection()[0];
            console.log("node", node.data);
            ret.bzmcdata = node.data;
          } else {
            Ext.MessageBox.alert("注意！", "请选择商品包装规格！");
            return false;
          }
          selecttree = cpselecttree.down("#selectCdmcTreePanel1"); // this.ge。.up("#selectPanel").down("#selectCdmcTreePanel2");
          //console.log(selecttree);
          sm = selecttree.getSelectionModel();
          if (sm.hasSelection() && sm.getSelection()[0].isLeaf() ) {
            node = sm.getSelection()[0];
            console.log("node", node.data);
            ret.cpmcdata = node.data;
          } else {
            Ext.MessageBox.alert("注意！", "请选择商品!");
            return false;
          }
          cpselecttreeWin.close();
          if (callback == undefined) {
            console.log(ret)
            return;
          }
          if (callback.length > 0) {
            callback(ret);
          }
        }
      },
      {
        text: "放弃",
        icon: "images/close.gif",
        handler: function () {
          //this.up("#selectCpbmWindow").close();
          cpselecttreeWin.destroy();
        },
      },
    ]
  });
  cpselecttreeWin = new Ext.Window({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 300,
    title: "请选择：",
    plain: true,
    resizable: false,
    //frame: true,
    layout: "fit",
    itemId: "selectCpbmWindow",
    closeAction: "destroy",
    border: true,
    modal:true,
    items: [cpselecttree]
  }).show();
}