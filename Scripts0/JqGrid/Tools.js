$(function () {
    $("#searchButton").click(function () {
        //console.log("click");
        var par = document.getElementById("Text1").value;
        console.log("text=" + par);

        //console.log("click");
        grid.jqGrid("setGridParam", { "page": 1,"initArg":par }).trigger("reloadGrid");


    })
})