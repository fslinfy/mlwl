Ext.define("MyApp.view.main.cwgl.Cwworktjmx_View", {
  extend: "Ext.panel.Panel",
  xtype: "Cwworktjmx_View",
  title: "Cwworktjmx",
  reference: "popupworkgridwindow",
  itemId: "popupworkgridwindow",
  //id:"Cwworktjmx_Grid",
  controller: "Cwworktjmx_Ctrl",
  style: {
    background: "yellow",
  },
  closeAction: "destroy",
  viewModel: {
    data: {
      khmc: "",
      khid: 0,
      ny: new Date().getFullYear(),
      yu: new Date().getMonth(),
      ckmc: "",
      ckid: sys_location_id,
      cpmc: "",
      cpid: 0,
      bywork: "1",
    },
  },
  tbar: [
    {
      xtype: "container",
      flex: 1,
      layout: "hbox",
      items: [
        {
          xtype: "container",
          flex: 1,
          layout: "hbox",
          items: [
            {
              xtype: "displayfield",
              itemId: "PageTitle",
              value: PageTitleName,
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0px",
                color: "#000",
              },
              fieldCls: "biggertext",
              hideLabel: true,
            },
            {
              xtype: "numberfield",
              name: "ny",
              labelWidth: 30,
              fieldLabel: "年度",
              bind: "{ny}",
              hideTrigger: false,
              margin: "1 0 1 1",
              width: 120,
              minValue: 2018,
              maxValue: 9999,
              decimalPrecision: 0,
            },
            {
              xtype: "numberfield",
              name: "yu",
              labelWidth: 30,
              fieldLabel: "月度",
              bind: "{yu}",
              hideTrigger: false,
              margin: "1 0 1 10",
              width: 120,
              minValue: 1,
              maxValue: 12,
              decimalPrecision: 0,
            },
            {
              xtype: "QueryKhmc",
              flex: 1, //                    hidden:  (sys_customer_id > 0)
            },
            {
              xtype: "QueryCkmc",
              flex: 1, //,        hidden: (sys_location_id > 0)
            },
            {
              xtype: "combo",
              fieldLabel: "",
              labelWidth: 40,
              store: bystore,
              width: 100,
              margin: "0 10 0 20",
              queryMode: "local",
              displayField: "workname",
              valueField: "id",
              name: "bywork",
              bind: "{bywork}",
            },
          ],
        },
        { xtype: "QueryToolbarView" },
      ],
    },
  ],
  items: [
    {
      xtype: "panel",
      //  id:gridTableName+'gridPanelId',
      itemId: gridTableName + "gridPanelId",
      reference: gridTableName + "gridPanelId",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      style: {
        "font-size": "16px",
        "font-weight": "bold",
        margin: "2px 1px 1px 1px",
        border: 2,
        background: "blue",
        color: "#000",
      },
      width: 1200,
      height: 500,
      // items:[griddiv]
    },
  ],
  listeners: {
    afterrender: function () {
      //   console.log("gridTableName",gridTableName);
      //createpivotgrid(0);
    },
  },
});
