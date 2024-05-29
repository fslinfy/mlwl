Ext.require("Ext.slider.*");
Ext.define("MyApp.view.main.tree.SelectTreeKhmc", {
  extend: "Ext.Mixin"
});

function SelectKhmc(callback, display) {
  this.callback = callback;
  if (display == undefined) display = "";
  var selectKhmcTree = Ext.create("Ext.Panel", {
    singleExpand: true,
    rootVisible: false,
    draggable: false,
    useArrows: true,
    lines: true,
    expanded: true,
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
      border: true,
      expanded: true,
      flex: 1,
    },
    items: [{
      reference: "selectKhmcTreePanel",
      itemId: "selectKhmcTreePanel",
      flex: 4,
      //margin: "0 5 0 5",
      store: {
        itemId: "selectJkspTreeStore",
        type: "tree",
        proxy: {
          type: "ajax",
          api: {
            read: sys_ActionPHP + "?act=customerselecttreelist",
          },
          actionMethods: {
            read: "GET",
          },
          extraParams: {
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            p_e_code: sys_enterprise_code,
            p_l_id: sys_location_id,
            displayall: display,
          },
        },
        root: {
          text: "客户名称",
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
        }
      }],
      listeners: {
        select: function (node, event) {
          this.up("#selectePanel").down("#btnTreeSelect").setDisabled(!event.data.leaf);
        }
      }

    }],
    bbar: {
      reference: "bbar",
      items: [
        "->",
        {
          text: "确认",
          itemId: "btnTreeSelect",
          icon: "images/right.gif",
          disabled: true,

          handler: function () {
            var ret = new Object();
            selecttree = selectKhmcTree.down("#selectKhmcTreePanel");
            //console.log(selecttree);
            sm = selecttree.getSelectionModel();
            if (sm.hasSelection() && sm.getSelection()[0].isLeaf()) {
              node = sm.getSelection()[0];
              console.log("node", node.data);
              ret = node.data;
            } else {
              Ext.MessageBox.alert("注意！", "请选择客户!");
              return false;
            }
            selectKhmcTreeWin.close();
            var p = that.getView().getViewModel();
            if (p != undefined) {
              console.log("ret data", ret.id, ret.text);
              p.set("khid", ret.id);
              p.set("khmc", ret.text);
            }


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
            selectKhmcTreeWin.destroy();
          }
        }
      ]
    }
  });
  selectKhmcTreeWin = new Ext.Window({
    width: 400,
    height: 500,
    minWidth: 300,
    minHeight: 300,
    title: "请选择客户!",
    plain: true,
    resizable: false,
    frame: true,
    modal: true,
    layout: "fit",
    itemId: "selectKhmcWindow",
    closeAction: "destroy",
    border: true,
    items: [selectKhmcTree]
  }).show();
}