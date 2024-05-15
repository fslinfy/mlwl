var areaArray = [];
var ckmc = "";
var cur = 0;
Ext.define("MyApp.view.main.report.DataToExcel", {
  extend: "Ext.Mixin",
});
function DataToExcel(op) {
  var tableData = [
    {
      sheetName: "Sheet1",
      data: [
        [
          { text: "Name" },
          { text: "Position" },
          { text: "Office" },
          { text: "Age" },
          { text: "Start date" },
          { text: "Salary" },
        ],
        [
          { text: "Tiger Nixon" },
          { text: "System Architect" },
          { text: "Edinburgh" },
          { text: 61 },
          { text: "2011/04/25" },
          { text: "$320,800" },
        ],
        [
          { text: "Garrett Winters" },
          { text: "Accountant" },
          { text: "Tokyo" },
          { text: 63 },
          { text: "2011/07/25" },
          { text: "$170,750" },
        ],
        [
          { text: "Ashton Cox" },
          { text: "Junior Technical Author" },
          { text: "San Francisco" },
          { text: 66 },
          { text: "2009/01/12" },
          { text: "$86,000" },
        ],
        [
          { text: "Cedric Kelly" },
          { text: "Senior Javascript Developer" },
          { text: "Edinburgh" },
          { text: 22 },
          { text: "2012/03/29" },
          { text: "$433,060" },
        ],
        [
          { text: "Airi Satou" },
          { text: "Accountant" },
          { text: "Tokyo" },
          { text: 33 },
          { text: "2008/11/28" },
          { text: "$162,700" },
        ],
        [
          { text: "Brielle Williamson" },
          { text: "Integration Specialist" },
          { text: "New York" },
          { text: 61 },
          { text: "2012/12/02" },
          { text: "$372,000" },
        ],
        [
          { text: "Herrod Chandler" },
          { text: "Sales Assistant" },
          { text: "San Francisco" },
          { text: 59 },
          { text: "2012/08/06" },
          { text: "$137,500" },
        ],
        [
          { text: "Rhona Davidson" },
          { text: "Integration Specialist" },
          { text: "Tokyo" },
          { text: 55 },
          { text: "2010/10/14" },
          { text: "$327,900" },
        ],
      ],
    },
  ];
  var options = {
    fileName: "Export xlsx Sipmle Sheet",
  };
  Jhxlsx.export(tableData, options);
  return;
  console.log("op", op);
  var fileName = op.fileName;
  if (fileName == NaN || fileName == "" || fileName == undefined) {
    fileName = "report";
  }
  var sheetName = op.sheetName;
  if (sheetName == NaN || sheetName == "" || sheetName == undefined) {
    sheetName = "Sheet1";
  }
  var jsonData = op.data;
  var arrData = typeof jsonData != "object" ? JSON.parse(jsonData) : jsonData;
  var showLabel = op.showLabel;
  //  console.log("showLabel", showLabel, op);
  if (showLabel == NaN || showLabel == [] || showLabel == undefined) {
    showLabel = Object.keys(arrData[1]);
  }
  var title = op.title;
  if (title == NaN || title == "" || title == undefined) {
    title = "无标题";
  }
  var smallTitle = op.title1;
  if (smallTitle == NaN || smallTitle == "" || smallTitle == undefined) {
    smallTitle = "";
  }
  var smallTitle1 = op.title2;
  if (smallTitle1 == NaN || smallTitle1 == "" || smallTitle1 == undefined) {
    smallTitle1 = "";
  }
  var excel = "<table>";
  //设置标题
  excel +=
    " <tr><td colspan=" +
    showLabel.length.toString() +
    " style='font-weight: 500; font-size:large; text-align: center;'>" +
    title +
    "</td></tr>";
  if (smallTitle.length > 0 && smallTitle1.length > 0) {
    var i1 = parseInt(showLabel.length / 2);
    var i2 = showLabel.length - i1;
    excel +=
      " <tr><td colspan=" +
      i1.toString() +
      " >" +
      smallTitle +
      "</td><td colspan=" +
      i2.toString() +
      " >" +
      smallTitle1 +
      "</td></tr>";
  } else {
    excel +=
      " <tr><td colspan=" +
      showLabel.length.toString() +
      " >" +
      smallTitle +
      "</td></tr>";
  }
  //设置表头
  var row = "<tr>";
  for (var i = 0, l = showLabel.length; i < l; i++) {
    row +=
      "<td style='color: #FFFFFF; font-weight: 700; font-size: large;background-color: #006699; '>" +
      showLabel[i] +
      "</td>";
  }
  //换行
  excel += row + "</tr>";
  //设置数据
  for (var i = 0; i < arrData.length; i++) {
    var row = "<tr>";
    var obj = arrData[i];
    for (var item in obj) {
      //row += `<td>${obj[item] + '\t'}</td>`;
      row += "<td>" + obj[item] + "</td>";
    }
    excel += row + "</tr>";
  }
  excel += "</table>";
  var excelFile =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile +=
    '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  //    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += sheetName;
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += excel;
  excelFile += "</body>";
  excelFile += "</html>";
  var uri =
    "data:application/vnd.ms-excel;charset=utf-8," +
    encodeURIComponent(excelFile);
  var link = document.createElement("a");
  link.href = uri;
  link.style = "visibility:hidden";
  link.download = fileName + ".xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
