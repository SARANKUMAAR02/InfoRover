const ExcelJS = require("exceljs");
const { error, fileSuccess } = require("./color");

function printReport(pages,url) {
  const urlObj = new URL(url);
  const sortedPages = sortPages(pages);
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Internal Links");
  

  worksheet.columns = [
    { header: "URL", key: "url", width: 30 },
    { header: "HITS", key: "hit", width: 10 },
  ];



  // Add rows to the worksheet
  sortedPages.forEach((sortedPage) => {
    worksheet.addRow(sortedPage);
  });



  // Save the workbook to a file
  const filePath = `outputs/ExcelInternal/${urlObj.hostname.split(".").at(0)}_internal.xlsx`;
  workbook.xlsx
    .writeFile(filePath)
    .then(() => {
      fileSuccess(` Excel file "${urlObj.hostname.split(".").at(0)}_internal.xlsx" created successfully at path ${filePath}.`);
    })
    .catch((err) => {
      console.log()
      error(" Error creating Excel file:", err);
      console.log()
    });
}

function printReportAll(pagesAll,url) {
  const urlObj = new URL(url);
  const sortedPagesAll = sortPages(pagesAll)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Both Links");

  worksheet.columns = [
    { header: "URL", key: "url", width: 30 },
    { header: "HITS", key: "hit", width: 10 },
  ];


  // Add rows to the worksheet
  sortedPagesAll.forEach((sortedPage) => {
    worksheet.addRow(sortedPage)
  })

  // Save the workbook to a file
  const filePath = `outputs/ExcelBoth/${urlObj.hostname.split(".").at(0)}_both.xlsx`;
  workbook.xlsx
    .writeFile(filePath)
    .then(() => {
      fileSuccess(` Excel file "${urlObj.hostname.split(".").at(0)}_both.xslx" created successfully at path ${filePath}.`);
    })
    .catch((err) => {
      console.log()
      error(" Error creating Excel file:", err);
      console.log()
    });
}



function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];

    return b[1] - a[1];
  });

  return pagesArr;
}

module.exports = { sortPages, printReport, printReportAll };
