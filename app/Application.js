sys_current_khid=0;

sys_current_tab = "";
sys_WebUrl = "";
sys_ActionPHP = "mysql_action.php";
sys_userInfo = {};
sys_enterprise_code = '1';
sys_enterprise_name = '1';

sys_location_control = "1,2,3,";

sys_system_id = 0;
sys_system_name = "";

sys_location_id = 0;
sys_location_name = '';

sys_customer_id = 0;
sys_customer_name = '';

sys_system_sh = 0;
sys_system_edit = 0;
sys_system_del = 0;
sys_system_lastdel = 0;
sys_system_system = 0;
sys_system_menustring = "";
end_date = new Date();
start_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);

current_newid = 0;
sys_DisplayAll = 1;
oldthis = this;
mainApp = this;
encode_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
mainTabPanel = Ext.getCmp("maintabpanel");

Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',

    name: 'MyApp',

    stores: [
        // TODO: add global / shared stores here


    ],

    launch: function () {
        console.log(window.location.href) ; 
        sys_current_tab = "";
        sys_WebUrl = "";
        sys_ActionPHP = "mysql_action.php";
        sys_userInfo = {};
        sys_enterprise_code = '1';
        sys_enterprise_name = '1';

        sys_location_control = "1,2,3,";
        sys_system_menustring = "";

        sys_system_id = 0;
        sys_system_name = "";

        sys_location_id = 0;
        sys_location_name = '';

        sys_customer_id = 0;
        sys_customer_name = '';

        sys_system_sh = 0;
        sys_system_edit = 0;
        sys_system_del = 0;
        sys_system_lastdel = 0;
        sys_system_system = 0;
        sys_location_area = "";
        end_date = new Date();
        start_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);

        
        sys_DisplayAll = 1;
        oldthis = this;
        mainApp = this;
        encode_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        mainTabPanel = Ext.getCmp("maintabpanel");


        // TODO - Launch the application
        current_tab = "";
        sys_enterprise_code = "1";
        sys_location_id = 1;
        sys_customer_id = 0;
        current_E_code = "1";
        current_L_id = 1;
        current_newid = 0;
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

