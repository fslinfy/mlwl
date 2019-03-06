Ext.define('MyApp.store.EnterpriseStore', {
    extend: 'Ext.data.Store',
    alias: 'store.EnterpriseStore',
    storeId:'EnterpriseStore',
    model: 'MyApp.model.EnterpriseModel',
    pageSize: 10000,
    proxy: {
        type: 'ajax',
    	api: {
             read:sys_ActionPHP+'?act=enterpriselist',
             update:sys_ActionPHP+'?act=enterprisesave',
             create:sys_ActionPHP+'?act=enterprisenew',
             destroy:sys_ActionPHP+'?act=enterprisedelete'
           	 },
        actionMethods: {
        	create: 'POST',
        	read: 'GET',
        	update: 'POST',
        	destroy: 'POST'
        },
        headers:{"Content-Type":'application/json'},     	 
        extraParams: {
           			userInfo:{a:'aaa',bbbb:'b'},
           			name:'linfuyang'
        },
        reader: {
            		type: 'json',
            		rootProperty: 'rows',
            		successProperty: 'success'
           		}
           	
    },
    listeners: {
       // beforeload: function (store, records, options) {
       //    console.log('beforeload');
         //this.onbeforereload(store, records, options);
         //  return true;
        //},
        exception:function(proxy,response,operation,options){
				consoloe.log('response.responseText');
				consoloe.log(response.responseText);
		}
     },
     autoLoad: true,
     autoSync: false
});
