/*Ext.application({
    name: 'MyApp',
    extend: 'MyApp.Application',
    requires: [
        'MyApp.view.main.Main'
    ],
    mainView: 'MyApp.view.main.Main'
});
*/

Ext.Loader.setConfig({
    enabled: true
});

getSystemInfo();

Ext.application({
    name: 'MyApp',
    appFolder: 'app',
    requires: ['MyApp.view.main.Main',
       // 'MyApp.view.main.Toast',
        'Ext.window.Window',
        , 'Ext.grid.*'
        , 'Ext.form.*'
        , 'Ext.data.*'
        , 'Ext.util.*'
        , 'Ext.slider.*'
        , 'Ext.dd.DropTarget'
        , 'Ext.tree.*'
       // ,'Ext.Sheet'
        // ,'Ext.toast'



    ],
    mainView: 'MyApp.view.main.Main',
    mixins: ['MyApp.view.main.SQLController'],
    findTab: function (tabPanel, record) {
        var ret
        activeTab = tabPanel.getActiveTab();
        if (activeTab && activeTab.record === record) {
            return activeTab;
        }
        tabPanel.items.each(function (t, idx) {
            if (t && t.record === record) {
                ret = t;
                return ret;
            }
        });
        return ret;
    },

    activateTab: function (tabPanel, targetTab) {
        if (targetTab) {
            tabPanel.setActiveTab(targetTab);

            return true;
        }
        return false;
    },

    widget: function (controllerFile, widgetName, Ctitle) {

        mainTabPanel = Ext.getCmp("maintabpanel");
        var findRes = this.findTab(mainTabPanel, Ctitle);
        if (findRes) {
            this.activateTab(mainTabPanel, findRes);
            //findRes.close();
        }

        else {
            //    console.log(controllerFile, widgetName, Ctitle)
            Ext.require(controllerFile, function () {

                mainTabPanel.setActiveTab(

                    mainTabPanel.add({
                        xtype: widgetName,
                        record: Ctitle,
                        closable: true,
                        closeAction: 'destroy',
                        title: Ctitle
                    })
                );
            }, this);
        }
    },
    launch: function () {
        console.log("init",window.location.href);
        sys_current_tab = "";
        //sys_WebUrl = "";
        //sys_ActionPHP = "mysql_action.php";

        sys_WebUrl = "";
        sys_ActionPHP = "mysql_action.php";
        sys_userInfo = {};
        sys_guid = "";
        sys_enterprise_code = '1';
        sys_enterprise_name = '1';

        sys_location_control = "1,2,3,";
        sys_system_menustring = "";
        sys_system_id = 0;
        sys_system_name = "";

        sys_location_id = 0;
        sys_location_area = "";
        sys_location_areas = 1;
        sys_location_name = '';

        sys_customer_id = 0;
        sys_customer_name = '';

        sys_system_sh = 0;
        sys_system_cwsh = 0;
        sys_system_edit = 0;
        sys_system_del = 0;
        sys_system_lastdel= 0;
        sys_system_new = 0;

        end_date = new Date();
        start_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);

        current_newid = 0;
        sys_DisplayAll = 1;
        oldthis = this;
        mainApp = this;
        encode_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        mainTabPanel = Ext.getCmp("maintabpanel");
        getcookie();
        pagereset();
        sys_area_store = Ext.create('Ext.data.Store', {
            extend: 'Ext.data.Store',
            alias: 'store.CurAreaStore',
            itemId: 'areacode',
            fields: ['area'],
            data: [ ]
        });





        // console.log(getSystemInfo(),LODOP); 
        //user_login();
        if (CheckIsInstall() == 0) {
           // console.log('LODOP  no install', LODOP);

            var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";

            strHtmInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>";
            var p = Ext.getCmp('maintabpanel');
            //var p = Ext.getCmp('mainhtml');
            //  console.log(strHtmInstall);
            p.removeAll();
            //  p.html='strHtmInstall';

            p.add({
                xtype: 'panel',
                title: "主页",
                //  id: "mainhtml",
                closable: false,
                html: strHtmInstall
            })
        } else {
           // console.log('LODOP   install');

        };
        if (sys_system_name == "" || sys_system_name == undefined) {
            system_setting();
        } else {
            user_login();
        }






        // LODOP=getLodop();         
        //testlodop();


    }
}); 