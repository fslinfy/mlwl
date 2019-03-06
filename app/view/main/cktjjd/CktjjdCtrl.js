var that;
var curyu = 0;
var curstatus = 0;
var curny = (new Date()).getFullYear();
Ext.define('MyApp.view.main.cktjjd.CktjjdCtrl', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CktjjdCtrl',
    requires: [
        'MyApp.view.main.cktjjd.CktjjdView'
    ]
    ,
    onBtnQueryClick: function (e) {
        var v = this.getView().getViewModel();
        if (e == undefined) {
            curny = v.get('ny');
        }
        else {
            curny = e;

        }


        var store = this.getView().getStore();
        store.proxy.extraParams.ny = curny;
        store.reload();
        curyu = 0;
        curstatus = 0;
        console.log("curny", curny, "curyu", curyu);

        //this.getView().getStore().load();

        var tool = this.getView().down("#QueryToolbarView");

        tool.down('#btnNew').setText("统计");
        tool.down('#btnSave').setText("封帐");
        tool.down('#btnUndo').setText("解封");
        tool.down('#btnNew').setDisabled(true);
        tool.down('#btnSave').setDisabled(true);
        tool.down('#btnUndo').setDisabled(true);

        this.onFilterChange();
        return false;
    },
    onBtnNewClick: function (rs) {
        //console.log(rs);
        var yu1 = curyu;
        if ((curstatus < 2) && (curyu > 0)) {
            var msg = "</br>年度：" + curny + "</br></br>月度：" + curyu;
        } else {
            if (curyu == '12') {
                Ext.Msg.alert('提示信息', '本年度月份已统计完毕！');
                return;
            }

            yu1 = parseInt(curyu) + 1

            var msg = "</br>年度：" + curny + "</br></br>月度：" + yu1;
        }
        console.log(msg, curyu, yu1, curstatus);
        var abc = Ext.Msg.confirm('真的对此月度数据进行统计处理？', msg + "</br>", function (e) {
            if (e == 'yes') {
                Ext.Ajax.request({
                    method: 'GET',
                    url: sys_ActionPHP,
                    params: {
                        act: 'cktjjdnew',
                        userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                        p_l_id: sys_location_id,
                        ny: curny,
                        yu: yu1
                    },
                    scope: this,
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        if (result.result == 'success') {
                            that.onBtnQueryClick();
                        }
                        else {
                            Ext.MessageBox.alert('错误!', '月度数据统计失败！');
                        }
                    },
                    failure: function () {
                        Ext.MessageBox.alert('错误!', '发生错误！');
                    }
                });
            }
        }
        );
    },
    onBtnDeleteClick: function (button, e, options) {
        var store = this.getView().getStore();
        var grid = Ext.getCmp('CktjjdGrid');
        return storeBtnDeleteClick(this, grid, store);
    },
    onBtnHelpClick: function (button, e, options) {
        console.log(" help")
        return false;
    },
    onBtnSaveClick: function (button, e, options) {
        var msg = "</br>年度：" + curny + "</br></br>月度：" + curyu;
        var abc = Ext.Msg.confirm('真的对此月度数据进行封帐处理？', msg, function (e) {
            if (e == 'yes') {
                var selection = that.getView().getSelectionModel().getSelection()[0];
                selection.set('status', 2);
                selection.set('jby', sys_userInfo.username);
                var store = that.getView().getStore();
                store.sync({
                    success: function (batch, options) {

                        // store.load();
                        that.onBtnQueryClick();

                    },
                    failure: function (batch, options) {
                        Ext.Msg.alert('提示信息', '数据更新失败!');
                    },
                    scope: that
                });
            }
        }
        );

    },
    onBtnUndoClick: function (button, e, options) {
        var msg = "</br>年度：" + curny + "</br></br>月度：" + curyu;
        var abc = Ext.Msg.confirm('真的对此月度数据进行解封处理？', msg, function (e) {
            if (e == 'yes') {


                var selection = that.getView().getSelectionModel().getSelection()[0];

                selection.set('status', 1);
                selection.set('jby', sys_userInfo.username);
                var store = that.getView().getStore();
                store.sync({
                    success: function (batch, options) {

                        //store.load();
                        that.onBtnQueryClick();

                    },
                    failure: function (batch, options) {
                        Ext.Msg.alert('提示信息', '数据更新失败!');
                    },
                    scope: that
                });

            }
        }
        );


        return false;
    },
    onBeforeReload: function (store, records, options) {
        var store = this.getView().getStore();
        return storeBeforeReload(this, store);
    },
    onBtnCancelClick: function (button, e, options) {
        var win = this.lookupReference('popupWindow');
        win.close()
        return false;
    },

    init: function () {
        that = this;
        that.viewname = that.getView();

        var tool = this.getView().down("#QueryToolbarView");
        tool.down('#btnNew').setHidden(false);
        tool.down('#btnSave').setHidden(false);

        tool.down('#btnUndo').setHidden(false);



        tool.down('#btnNew').setText("统计");
        tool.down('#btnSave').setText("封帐");
        tool.down('#btnUndo').setText("解封");



        tool.down('#btnNew').setDisabled(true);
        tool.down('#btnSave').setDisabled(true);
        tool.down('#btnUndo').setDisabled(true);


        tool.down('#btnQuery').setHidden(true);
        this.control({
            "#btnQuery": {
                click: this.onBtnQueryClick
            },
            "#button1": {
                click: this.onButtonAddClick
            },
            "#btnNew": {
                click: this.onBtnNewClick
            },
            "#btnSave": {
                click: this.onBtnSaveClick
            },

            "#btnDelete": {
                click: this.onBtnDeleteClick
            },
            "#btnHelp": {
                click: this.onBtnHelpClick
            },
            "#btnUndo": {
                click: this.onBtnUndoClick
            }
            ,
            "#Cancel": {
                click: this.onBtnCancelClick
            },
            "#FilterField": {
                change: this.onFilterChange
            }
        });
        var store = this.getView().getStore();
        // store.on('beforeload', this.onBeforeReload, this);
        store.on('load', this.onItemSelected, this);
        this.onBtnQueryClick();
    },

    onFilterChange: function (v) {
        //var store = that.viewname.getStore()
        var store = this.getView().getStore();
        var regExp = new RegExp(".*" + curny + ".*");
        store.clearFilter();
        store.filterBy(function (record, id) {
            return regExp.test(record.get('ny'));
        });
    },
    onItemSelected: function (sender, record) {
        var tool = this.getView().down("#QueryToolbarView");
        var l_find = 0;
        var ny1 = curny;
        var yu1 = curyu;
        var store = this.getView().getStore();

        if (record.data == undefined) {
            if (store.getCount() == 0) {
                tool.down('#btnNew').setDisabled(false);
                yu1 = 1;
                store.clearFilter();
                l_find = 0;
                store.each(function (rec) {
                    if ((rec.data.yu >= yu1) && (rec.data.ny == ny1) && (l_find == 0) && (rec.data.status == 2)) {
                        l_find = 1;
                    } else {
                        if ((rec.data.ny > ny1) && (l_find == 0) && (rec.data.status == 2)) {
                            l_find = 1;
                        }
                    }
                })
                if (l_find == 1) {
                    tool.down('#btnSave').setDisabled(true);
                    tool.down('#btnUndo').setDisabled(true);
                    tool.down('#btnNew').setDisabled(true);
                }
                this.onFilterChange();
            }
            return;
        }
        curstatus = record.data.status;
        curny = record.data.ny;
        curyu = record.data.yu;
        ny1 = curny;
        yu1 = curyu;

        l_find = 0;
        tool.down('#btnNew').setDisabled(true);
        tool.down('#btnSave').setDisabled(true);
        tool.down('#btnUndo').setDisabled(true);
        store.clearFilter();

        //  console.log(ny1, yu1, curstatus, curny, curyu);
        if (curstatus == 2) {
            if (yu1 == 12) {
                yu1 = 1;
                ny1 = ny1 + 1;
            }
            else {
                yu1 = yu1 + 1;
            }
            //            console.log(ny1,yu1,curstatus,curny,curyu);

            store.each(function (rec) {
        //        console.log("rec", rec);
                if ((rec.data.yu == yu1) && (rec.data.ny == ny1) && (l_find == 0)) {
                    l_find = 1;
                    console.log(ny1, yu1, 'l_find',l_find);
                    if (rec.data.status == 1) {
                        tool.down('#btnUndo').setDisabled(false);
                    }
                }
            })

            if (l_find == 0) {
                tool.down('#btnNew').setDisabled(false);
                tool.down('#btnUndo').setDisabled(false);
            }
        }
        else {
            if (yu1 == 1) {
                yu1 = 12;
                ny1 = ny1 - 1;
            }
            else {
                yu1 = yu1 - 1;
            }
            //console.log(ny1,yu1,curstatus,curny,curyu);

            store.each(function (rec) {
                if ((rec.data.yu == yu1) && (rec.data.ny == ny1)) {
                    //console.log(ny1, yu1, curstatus, curny, curyu);

                    if (rec.data.status == 2) {
                        l_find = 1;
                        if (curstatus == 1) {
                            tool.down('#btnNew').setText("重新统计");
                            tool.down('#btnSave').setDisabled(false);
                        } else {
                            tool.down('#btnNew').setText("统计");
                        }
                        tool.down('#btnNew').setDisabled(false);

                    }


                }
            })



            /*            if (l_find==0)
                        {
                                    if (curstatus == 1) {
                                        tool.down('#btnNew').setText("重新统计");
                                        tool.down('#btnSave').setDisabled(false);
                                    } else {
                                        tool.down('#btnNew').setText("统计");
                                    }
                                    tool.down('#btnNew').setDisabled(false);
                        }*/
        }
        this.onFilterChange();
        return false;
    }

})
function cktjjdQuery(e) {
    //console.log("cktjjdQuery");
    that.onBtnQueryClick(e);
}
