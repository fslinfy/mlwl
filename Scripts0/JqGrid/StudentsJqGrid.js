grid =jQuery("#grid");
$(function () {
    grid.jqGrid({
        url: "/Jqgrid/Search?operation=log",
        mtype: 'POST',
        datatype: "json",
        postData: {
            initArg: function() { return jQuery("#Text1").val(); }
        },
        colNames: ['Id', 'Name', 'StudentClass'],
        //colModel takes the data from controller and binds to grid   
        colModel: [
          {
              key: true,
              hidden: true,
              name: 'Id',
              index: 'Id',
              editable: true
          }, {
              key: false,
              name: 'Name',
              index: 'Name',
              editable: true
          }, {
              key: false,
              name: 'StudentClass',
              index: 'StudentClass',
              editable: true
          }
        ],
        rowNum: 10,
        width: 700,
        rowList: [10, 20, 30],
        pager: '#pager',
        sortname: 'Id',

        closeAfterSearch: true,
        closeAfterReset: true,

        viewrecords: true,
        sortorder: "desc",
        jsonReader: {
            repeatitems: false
        },
        caption: "Show query in search",
        height: '100%'
    });
    grid.jqGrid('navGrid', '#pager',
    { edit: false, add: false, del: false },
    {},
    {},
    {},
    {
        closeAfterSearch: true,
        closeAfterReset: true,
        multipleSearch: true,
        multipleGroup: true,
        showQuery: true
    }
    );


})
/*


$(function () {
    
    $("#grid").jqGrid
    ({
        url: "/Jqgrid/Search?operation=log",
        datatype: 'json',
        mtype: 'Get',
        //table header name
        colNames: ['Id', 'Name', 'StudentClass'],
        //colModel takes the data from controller and binds to grid   
        colModel: [
          {
              key: true,
              hidden: true,
              name: 'Id',
              index: 'Id',
              editable: true
          }, {
              key: false,
              name: 'Name',
              index: 'Name',
              editable: true
          }, {
              key: false,
              name: 'StudentClass',
              index: 'StudentClass',
              editable: true
          }
        ],

        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [3,10, 20, 30, 40],
        height: '100%',
        loadonce: true,
        multipleSort: true,
        multiSort: true,
        // editurl: "/Jqgrid/Edit",
        //  closeAfterEdit: true,
        //multipleSearch:true,
        stringResult: true,
        viewrecords: true,
        caption: 'Jq grid sample Application',
        emptyrecords: '没有符合条件的内容！',
        jsonReader:
        {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        autowidth: true,
        multiselect: true
        //pager-you have to choose here what icons should appear at the bottom  
        //like edit,create,delete icons  
    }).navGrid('#pager',
    {
        edit: true,
        add: true,
        del: true,
        search: true,
       
        
        refresh: true
    },
    {
        // edit options  
        zIndex: 100,
        url: '/Jqgrid/Edit',
        closeOnEscape: true,
        closeAfterEdit: true,
        recreateForm: true,
        msg: "edit save?",
        afterComplete: function (response) {
            if (response.responseText) {
      //          alert(response.responseText);
            }
        }
    },{
        // add options  
        zIndex: 100,
        url: "/Jqgrid/Create",
        closeOnEscape: true,
        closeAfterAdd: true,

        msg: "add save?",
        afterComplete: function (response) {
            if (response.responseText) {
                alert(response.responseText);
            }
        }
    },
    {
        // delete options  
        zIndex: 100,
        url: "/Jqgrid/Delete",
        closeOnEscape: true,
        closeAfterDelete: true,
        recreateForm: true,
        msg: "Are you sure you want to delete this student?",
        afterComplete: function (response) {
            if (response.responseText) {
                alert(response.responseText);
            }
        }
    }
    ,
    { multipleSearch: true, multipleGroup:true }
    );

    


});

$(document).ready(function () {
    
    $("#searchButton").click(function () {
      //  console.log("click");
        jQuery("#grid").jqGrid("searchGrid", {
           // searchurl: "/Jqgrid/Search",
            closeOnEscape: true,
           
            closeAfterSearch: true,
            closeAfterReset: true,
            closeAfterClear: true,
            multipleSearch: true, multipleGroup:true ,
            afterClear: true,
            onSearch: function () {

                mode = "defaultMode";
                console.log(this);
            },
            onClose: function () { mode = "defaultMode"; }


        });
    })
})


*/