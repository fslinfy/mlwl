
Ext.define('MyApp.view.main.DataSave', {
    extend: 'Ext.Mixin',
    sqltest1: function () {
        console.log('sqltest1');
    }
    // 新增一条记录
	/*
	 addRecord : function(button) {
	 var grid = this.getView().down('modulegrid');
	 var model = Ext.create(grid.getStore().model);
	 model.set('tf_id', null); // 设置为null,可自动增加
	 grid.getStore().insert(0, model);
	 grid.getSelectionModel().select(model); // 选中当前新增的记录
	 }*/

});

AjaxDataSave = function (act, loc, data, CallBackFunction, the) {
    Ext.Ajax.request({
        method: 'GET',
        url: sys_ActionPHP,
        params: {
            act: act,
            loc: loc,
            p_l_id: sys_location_id,
            userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
            data: data
        },
        scope: that,
        success: function (response) {
            var result = Ext.decode(response.responseText);
            if (result.result == 'success') {
                //	Ext.toast({
                //		html: "数据保存成功！！！",
                //		closable: true,
                //		title: '信息',
                //		align: 't',
                //		slideInDuration: 100,
                //		minWidth: 400
                //	});

                CallBackFunction(the);
            }
            else {
                Ext.MessageBox.alert('错误!', '数据保存失败！');
            }
        },
        failure: function () {
            Ext.MessageBox.alert('错误!', '发生错误！');
        }
    });
}
