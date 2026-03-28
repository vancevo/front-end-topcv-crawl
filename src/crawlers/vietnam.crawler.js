import axios from "axios";

const API_URL = "https://ms.vietnamworks.com/job-search/v1.0/search";

export async function crawlVietnamWorks(page = 0) {

  try {

    const res = await axios.post(API_URL, {
      query: "frontend developer",
      location: [29],
      page,
      size: 20
    }, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      },
      timeout: 15000
    });

    const items = res.data?.data || [];

    console.log("VietnamWorks jobs:", items.length);

    const jobs = items.map(job => {

      const title = job.jobTitle;

      const company = job.companyName;

      const location =
        job.workingLocations?.map(l => l.city).join(", ") || "";

      const salary = job.salary || "";

      const link =
        "https://www.vietnamworks.com" + job.jobDetailUrl;

      return {
        title,
        company,
        location,
        salary,
        source: "VietnamWorks",
        date: new Date().toISOString().split("T")[0],
        link
      };

    });

    return jobs;

  } catch (err) {

    console.error("VietnamWorks error:", err.message);

    return [];

  }
}