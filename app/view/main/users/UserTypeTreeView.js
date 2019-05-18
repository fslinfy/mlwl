
Ext.define('MyApp.view.main.users.UserTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.UserTypeTreeView',
    itemId: 'LeftTreeView',
    reference: 'LeftTreeView',
    closeAction: 'destroy',
    Drop: true,
    requires: [
        'Ext.data.TreeStore'
    ],
    viewConfig : {
		plugins : {
			ptype : 'treeviewdragdrop',
			//ddGroup : 'treeDD',
			ddGroup : 'gridtotree',
			enableDrag :false,
			enableDrop : true
		},
		listeners : {

			beforenodedrop : function(e) {
				console.log("beforenodedrop")

			},
			nodedragover : function(targetNode, position, dragData) {
				
                var data = targetNode.data;
                if (data.id==dragData.records[0].data.typeid) {
						return false;
                }
                
                if (data.leaf) {
						return true;
                }
                    
				return false;

			},
			beforedrop : function(node, data, dropRec) {
                        console.log('beforedrop',data.records[0].data.typeid,data.records[0].data.userid,data.records[0].data.username,dropRec.data.id,dropRec.data.text)
                        return true;
                

                oldpid = data.records[0].data.parentId;
               
				var leaf;
				leaf = data.records[0].data.leaf

				if (leaf == false) {
					return;
				}
				if (idstr == '') {
					return false;
				}
				//以下处理GRIDTOTREE内容

				return false;

            }
		}
	},
	


    title: '用户分类',
    itemId: "LeftTree",
    width: 160,
    singleExpand: true,
    minWidth: 120,
    maxWidth: 250,
    rootVisible: true,
    // dropable: true,
    // allowDrop: true,
    //  allowDrag: true,
    useArrows: true,
    lines: true,
    expanded: true,
    header: {
        items: [
            {
                xtype: 'button',
                iconCls: 'button-home-small',
                width: 28, height: 28,
                itemId: 'btnTreeRefresh',
                icon: "images/refresh.gif",
                handler: function () {
                    this.up("#LeftTree").getStore().reload();
                }
            }]
    },

    store: {
        type: 'tree',
        itemId: 'treeStore',
        proxy: {
            type: 'ajax',
            api: {
                read: sys_ActionPHP + '?act=usertypetreelist'
            },
            actionMethods: {
                read: 'GET'
            },
            extraParams: {
                userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
                p_e_code: sys_enterprise_code
            }
        },
        root: {
            text: '全部',
            id: 'ALL',
            typeid: "",
            typename: "",
            menustring: '',
            Active: 0,
            new: 0,
            edit: 0,
            delete: 0,
            system: 0,
            sh: 0,
            expanded: true,
            dropable: true
            //draggable: true
        },
        autoLoad: true

    },
    bbar: {
        reference: 'bbar',
        items: [{
            text: '增加',
            itemId: "btnTreeAdd",
            icon: "images/add.gif",
            disabled: true,
            handler: 'onTreeAddClick'
        }, {
            text: '修改',
            itemId: "btnTreeEdit",
            disabled: true,
            icon: "images/edit.gif",
            handler: 'onTreeEditClick'
        }]

    },
    listeners: {
        select: function (node, event) {
            if (event.data.root) {
                this.down("#btnTreeEdit").setDisabled(true);
                this.down("#btnTreeAdd").setDisabled(false);
            } else {
                this.down("#btnTreeEdit").setDisabled(false);
                this.down("#btnTreeAdd").setDisabled(true);
            }

        }

    }
});