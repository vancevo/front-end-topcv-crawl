import { crawlTopCV } from "./crawlers/topcv.crawler.js"
import { crawlVietnamWorks } from "./crawlers/vietnam.crawler.js"
import { exportExcel } from "./services/excel.service.js"

async function main() {

  console.log("Crawling TopCV...")
  console.log("Crawling VietnamWorks...")

  const [topcvJobs, vietnamJobs] = await Promise.all([
    crawlTopCV(),
    crawlVietnamWorks(3)
  ])

  exportExcel(topcvJobs, vietnamJobs)

  console.log("Excel exported!")
}

main()
