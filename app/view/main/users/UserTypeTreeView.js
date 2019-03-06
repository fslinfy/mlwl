
Ext.define('MyApp.view.main.users.UserTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.UserTypeTreeView',
    itemId: 'LeftTreeView',
    reference: 'LeftTreeView',
    closeAction: 'destroy',
    //enableDrop: true, //允许Drop //enableDD:true, //允许Drag & Drop
    Drop: true,
    requires: [
        'Ext.data.TreeStore'
    ],
    /*
        dropConfig: {
            ddGroup: 'GridDD',// 从Grid到Tree。如果是Tree内部节点拖动，使用'TreeDD' 
    
            dropAllowed: true,
            notifyDrop: function (source, e, data) {
                console.log("data", data);
                if (this.lastOverNode.node.id == 'root' || data.selections.length == 0) return;
    
                console.log(this.lastOverNode.node.id); //目标节点id 
    
    
                this.cancelExpand();
                this.removeDropIndicators(this.lastOverNode);
                return true;
            },
    
            onNodeOver: function (n, dd, e, data) {  // 
                console.log("data", data);
                var pt = this.getDropPoint(e, n, dd);
                var node = n.node;
                console.log(node);
                return true;
                // auto node expand check
                if (!this.expandProcId && pt == "append" && node.hasChildNodes() && !n.node.isExpanded()) {
                    this.queueExpand(node);
                } else if (pt != "append") {
                    this.cancelExpand();
                }
                // set the insert point style on the target node
                var returnCls = this.dropNotAllowed;
                if (this.isValidDropPoint(n, pt, dd, e, data)) {
                    if (pt) {
                        var el = n.ddel;
                        var cls;
                        returnCls = "x-tree-drop-ok-append";
                        cls = "x-tree-drag-append";
                        if (this.lastInsertClass != cls) {
                            Ext.fly(el).replaceClass(this.lastInsertClass, cls);
                            this.lastInsertClass = cls;
                        }
                    }
                }
                return returnCls;
            },
            nodedragover: function (e) {
                //var n = e.target;
                //if (n.leaf) {
                //    n.leaf = false;
                // }
                return true;
            },
            beforenodedrop: function (e) {
                var n = e.dropNode; // the node that was dropped
                console.log("n",n)
              //  var copy = new Ext.tree.TreeNode( // copy it
              //      Ext.apply({}, n.attributes)
              //  );
              //  e.dropNode = copy; // assign the copy as the new dropNode
            }
        },
    


    enableDrop: true, //允许Drop //enableDD:true, //允许Drag & Drop

    dropConfig: {
        ddGroup: 'GridDD',// 从Grid到Tree。如果是Tree内部节点拖动，使用'TreeDD' 

        dropAllowed: true,
        notifyDrop: function (source, e, data) {
            console.log(data);
            return;

            if (this.lastOverNode.node.id == 'root' || data.selections.length == 0) return;

            alert(this.lastOverNode.node.id); //目标节点id 

            var srcList = new Array();
            for (i = 0; i < data.selections.length; i++) {
                srcList[i] = data.selections[i].data['mydataField'];
            }

            alert(srcList.length); //data: 来自Grid的数据

            //TODO: 此处增加您想要的操作!

            this.cancelExpand();
            this.removeDropIndicators(this.lastOverNode);
            return true;
        }, 
        onNodeOver: function (n, dd, e, data) {
            console.log(data);
            return true;

            var pt = this.getDropPoint(e, n, dd);
            var node = n.node;
            // auto node expand check
            if (!this.expandProcId && pt == "append" && node.hasChildNodes() && !n.node.isExpanded()) {
                this.queueExpand(node);
            } else if (pt != "append") {
                this.cancelExpand();
            }
            // set the insert point style on the target node
            var returnCls = this.dropNotAllowed;
            if (this.isValidDropPoint(n, pt, dd, e, data)) {
                if (pt) {
                    var el = n.ddel;
                    var cls;
                    returnCls = "x-tree-drop-ok-append";
                    cls = "x-tree-drag-append";
                    if (this.lastInsertClass != cls) {
                        Ext.fly(el).replaceClass(this.lastInsertClass, cls);
                        this.lastInsertClass = cls;
                    }
                }
            }
            return returnCls;
        }
    },*/

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
				//var rec = dragData.records[0];
				
                var data = targetNode.data;
               // console.log("nodedragover",data.id,data.text,data.leaf,dragData.records[0].data.typeid);
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

							console.log(dropRec);
					//			console.log(data.records[0].data);

					//	console.log('leaf',leaf)
					return;
				}
				//console.log(nid,idstr);
				if (idstr == '') {
					return false;
				}
				//以下处理GRIDTOTREE内容

				return false;

            }/*,
			drop : function(node, data, dropRec, dropPosition) {

                console.log("drop",node, data, dropRec, dropPosition);
                return;

				//var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('text') : ' on empty view';
				//处理TREE drop 内容
				var result = dropRec.data;
				//console.log()
				console.log("drop",data.records[0].data);
				var oldsel = data.records[0].data

				var oldid = oldsel.id;
				//console.log(result);

				if (dropPosition == 'append') {
					var pid = result.id;
				} else {
					var pid = result.parentId;
				}

				//console.log(oldsel.parentId+'='+pid);
				//console.log(oldpid);
				if (pid != oldpid) {
				
				}
			}*/
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