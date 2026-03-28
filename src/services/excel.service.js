import XLSX from "xlsx"

export function exportExcel(topcvJobs, vietnamJobs) {

  const topcvData = topcvJobs.map(j => ({
    Title: j.title,
    Company: j.company,
    Salary: j.salary,
    "Posted Date": j.postedDate,
    "Updated Date": j.updatedDate,
    Source: j.source,
    CrawledDate: j.date,
    Link: j.link
  }))

  const vietnamData = vietnamJobs.map(j => ({
    Title: j.title,
    Company: j.company,
    Salary: j.salary,
    "Posted Date": j.postedDate,
    "Updated Date": j.updatedDate,
    Source: j.source,
    CrawledDate: j.date,
    Link: j.link
  }))

  const workbook = XLSX.utils.book_new()

  const topcvSheet = XLSX.utils.json_to_sheet(topcvData)
  XLSX.utils.book_append_sheet(workbook, topcvSheet, "TopCV")

  const vietnamSheet = XLSX.utils.json_to_sheet(vietnamData)
  XLSX.utils.book_append_sheet(workbook, vietnamSheet, "VietnamWorks")

  const today = new Date().toISOString().split("T")[0]

  XLSX.writeFile(workbook, `output/jobs_${today}.xlsx`)
}