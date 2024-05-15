Ext.define("MyApp.view.main.location.LocationGrid", {
  extend: "Ext.Mixin",
});
function myPrintCheckboxFormatter(cellvalue, options, rowObject) {
  return "<input type='checkbox' name='Active' onchange='getCurrentBinRow()'>";
}
function initDateSearch(elem) {
  setTimeout(function () {
    $(elem).datepicker({
      dateFormat: "dd-M-yy",
      autoSize: true,
      changeYear: true,
      changeMonth: true,
      showWeek: true,
      showButtonPanel: true,
    });
  }, 100);
}
editableInAddForm = function (options) {
  if (options.mode === "addForm") {
    return true;
  }
  if (options.mode === "editForm") {
    return "disabled";
  }
  return false; // don't allows editing in other editing modes
};
function showMsg(pid) {
  var idSelector = "#alertmod_" + pid;
  $.jgrid.viewModal(idSelector, {
    gbox: "#gbox_" + $.jgrid.jqID(pid),
    jqm: true,
  });
  $(idSelector).position({
    of: "#" + $.jgrid.jqID(pid),
    at: "center",
    my: "center",
  });
  $(idSelector).find(".ui-jqdialog-titlebar-close").focus();
}
function restorerow() {
  if (lastEditRow == 0) return true;
  grid.jqGrid("restoreRow", lastEditRow);
  lastEditRow = 0;
}
function checksave(result) {
  if (result.responseText == "") {
    alert("Update is missing!");
    return false;
  }
  var obj = JSON.parse(result.responseText);
  console.log("obj:", obj, obj.success);
  if (obj.success) {
    lastEditRow = 0;
    alert(obj.data.msg);
    return true;
  }
  alert(obj.data.msg);
  return false;
}
function checkdelete(result) {
  if (result.responseText == "") {
    alert("Update is missing!");
    return false;
  }
  var obj = JSON.parse(result.responseText);
  if (!obj.success) {
    alert(obj.data.msg);
    return false;
  }
  lastEditRow = 0;
  alert(obj.data.msg);
  return true;
}
editbeforeSubmit = function (postdata, formid) {
  var msg = "";
  console.log(postdata);
  if (postdata.C_code == "") {
    msg = "请输入客户代码！";
    alert(msg);
    return [false, msg];
  }
  if (postdata.C_name == "") {
    msg = "请输入客户名称！";
    alert(msg);
    return [false, msg];
  }
  if (postdata.C_shortname == "") {
    msg = "请输入客户简称！";
    alert(msg);
    return [false, msg];
  }
  return [true, ""];
};
editAfterSubmit = function (resp, postdata) {
  var obj = JSON.parse(resp.responseText);
  alert(obj.data.msg);
  return true;
};
addAfterSubmit = function (resp, postdata) {
  var obj = JSON.parse(resp.responseText);
  alert(obj.data.msg);
  return true;
};
deleteAfterSubmit = function (resp, postdata) {
  var obj = JSON.parse(resp.responseText);
  alert(obj.data.msg);
  return true;
};
gridLoadComplete = function (data) {};
onGridSelectRow = function (id) {};
onGridComplete = function () {};
gridresize = function () {
  grid.setGridWidth(window.innerWidth - 4);
  if (isSearchEnable) {
    grid.setGridHeight(document.documentElement.clientHeight - 218);
  } else {
    grid.setGridHeight(document.documentElement.clientHeight - 188);
  }
};
