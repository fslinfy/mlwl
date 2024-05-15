Ext.define("MyApp.view.main.QueryToolbarView", {
  extend: "Ext.container.Container",
  alias: "widget.QueryToolbarView",
  itemId: "QueryToolbarView",
  //layout: {
  //    type: 'hbox'
  //},
  //Style : 'padding-left:15px',
  defaults: {
    xtype: "button",
    border: 0,
    //width:80,
    cls: "x-btn-text-icon details",
    disabled: false,
    margin: "1 1 1 1",
  },
  items: [
    {
      itemId: "btnQuery",
      text: " 刷新",
      margin: "1 1 1 10",
      icon: "images/refresh.gif",
    },
    {
      itemId: "btnNew",
      text: "增加",
      hidden: true,
      icon: "images/add.gif",
    },
    {
      itemId: "btnEdit",
      text: "编辑",
      hidden: true,
      disabled: true,
      icon: "images/edit.gif",
    },
    {
      itemId: "btnDelete",
      text: "删除",
      hidden: true,
      disabled: true,
      icon: "images/u_delete_color.gif",
    },
    {
      itemId: "btnSave",
      hidden: true,
      text: "保存",
      icon: "images/save.gif",
    },
    {
      itemId: "btnUndo",
      hidden: true,
      text: "还原",
      icon: "images/undo.gif",
    },
    {
      itemId: "btnPrint",
      text: "打印",
      hidden: true,
      icon: "images/print.gif",
    },
    {
      itemId: "btnExport",
      text: "导出",
      hidden: true,
      icon: "images/xls.gif",
    },
    {
      itemId: "btnHelp",
      text: " 帮助",
      // hidden: true,
      icon: "images/help.gif",
    },
  ],
});
