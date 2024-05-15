Ext.define("MyApp.view.main.cpczgl.CpjcworklocView", {
  extend: "Ext.panel.Panel",
  xtype: "CpjcworklocView",
  title: "jcworkloc",
  reference: "popupgridwindow",
  itemId: "popupgridwindow",
  requires: [],
  //id:"CpjcworklocGrid",
  controller: "CpjcworklocCtrl",
  closeAction: "destroy",
  viewModel: {
    data: {
      khmc: "",
      khid: 0,
      jclb: "0",
      cpid: "0",
      ckid: sys_location_id,
      start_date: new Date(),
      end_date: new Date(),
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
              value: "进出仓费用明细账",
              style: {
                "font-size": "16px",
                "font-weight": "bold",
                margin: "5px 30px 0 0px",
                color: "#000",
              },
              fieldCls: "biggertext",
              hideLabel: true,
            },
            { xtype: "QueryDate" },
            {
              xtype: "QueryKhmc",
              flex: 1,
              hidden: sys_customer_id > 0,
            },
            {
              xtype: "QueryCkmc",
              flex: 1,
              hidden: sys_location_id > 0,
            },
            {
              xtype: "QueryCpmc",
              flex: 1,
            },
            {
              xtype: "combo",
              fieldLabel: "",
              labelWidth: 40,
              store: bystore,
              width: 100,
              margin: "0 10 0 20",
              queryMode: "local",
              displayField: "jclb",
              valueField: "id",
              name: "jclb",
              bind: "{jclb}",
            } /* 
            {
                xtype: 'combo',
                name: "jclb",
                labelWidth: 30,
                fieldLabel: '进出',
                width:120,
               // padding: '20 20 10 20',
                store: ['全部', '进仓', '出仓', '过货','其它'],
                queryMode: 'local',
                editable: false,
               // allowBlank: false,
                bind: '{jclb}'
            }*/,
          ],
        },
        { xtype: "QueryToolbarView" },
      ],
    },
  ],
  items: [
    {
      xtype: "panel",
      id: "gridPanelId",
      bodyStyle: { border: 1 },
      reference: "gridPanelId",
      itemId: "gridPanelId",
      layout: "fit",
      bodyPadding: 0,
      html:
        '<div style="width:100%;height:100%;padding:0 1 0 1;" id="griddivid"> <table id="' +
        gridTableName +
        '" style="width:100%;"></table><div id="' +
        gridTableName +
        'Pager"></div></br></br></br></br><table style="display:none;" id="' +
        gridTableName +
        'Export"></table></div>',
    },
  ],
  listeners: {
    afterrender: function () {
      //   console.log("gridTableName",gridTableName);
      creategrid(gridTableName);
    },
  },
});
