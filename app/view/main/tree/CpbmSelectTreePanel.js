Ext.define("MyApp.view.main.tree.CpbmSelectTreePanel", {
  extend: "Ext.tree.Panel",
  xtype: "filtered-tree",
  alias: "widget.SelectPanel",
  store: "SelectTreeStore",
  rootVisible: false,
  animate: false,
  frame: true,
  title: "Filtered Tree",
  width: 650,
  height: 400,
  reserveScrollbar: true,
  useArrows: true,
  columns: [
    {
      xtype: "treecolumn",
      text: "Forum",
      flex: 2.5,
      sortable: true,
      dataIndex: "forumtitle",
    },
    { text: "User", flex: 1, dataIndex: "username", sortable: true },
    {
      text: "Title",
      flex: 2,
      dataIndex: "title",
      renderer: function (value, p, record) {
        return value
          ? Ext.String.format(
              '\x3ca href\x3d"http://sencha.com/forum/showthread.php?t\x3d{1}" target\x3d"_blank"\x3e{0}\x3c/a\x3e',
              value,
              record.data.threadid
            )
          : "";
      },
    },
  ],
  tbar: [
    {
      labelWidth: 130,
      xtype: "triggerfield",
      fieldLabel: "Filter on thread title",
      triggerCls: "x-form-clear-trigger",
      onTriggerClick: function () {
        this.reset();
      },
      listeners: {
        change: function () {
          var tree = this.up("treepanel"),
            v,
            matches = 0;
          try {
            v = new RegExp(this.getValue(), "i");
            Ext.suspendLayouts();
            tree.store.filter({
              filterFn: function (node) {
                var children = node.childNodes,
                  len = children && children.length,
                  visible = node.isLeaf() ? v.test(node.get("title")) : false,
                  i;
                for (
                  i = 0;
                  i < len && !(visible = children[i].get("visible"));
                  i++
                );
                if (visible && node.isLeaf()) matches++;
                return visible;
              },
              id: "titleFilter",
            });
            tree.down("#matches").setValue(matches);
            Ext.resumeLayouts(true);
          } catch (e) {
            this.markInvalid("Invalid regular expression");
          }
        },
        buffer: 250,
      },
    },
    {
      xtype: "displayfield",
      itemId: "matches",
      fieldLabel: "Matches",
      labelWidth: null,
      listeners: {
        beforerender: function () {
          var me = this,
            tree = me.up("treepanel"),
            root = tree.getRootNode(),
            leafCount = 0;
          tree.store.on("fillcomplete", function (store, node) {
            if (node === root) {
              root.visitPostOrder("", function (node) {
                if (node.isLeaf()) leafCount++;
              });
              me.setValue(leafCount);
            }
          });
        },
        single: true,
      },
    },
  ],
});
