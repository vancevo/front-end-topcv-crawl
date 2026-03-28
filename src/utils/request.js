import axios from "axios"

/**
 * random delay to avoid anti scraping
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay() {
  return 500 + Math.floor(Math.random() * 1000)
}

/**
 * axios instance
 */
const client = axios.create({
  timeout: 15000
})

/**
 * request interceptor
 */
client.interceptors.request.use(async (config) => {

  await sleep(randomDelay())

  config.headers["User-Agent"] =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"

  console.log("Request:", config.url)

  return config

})

/**
 * response interceptor
 */
client.interceptors.response.use(

  (response) => {

    return {
      ok: true,
      data: response.data
    }

  },

  (error) => {

    if (error.response) {

      return {
        ok: false,
        error: `HTTP ${error.response.status}`
      }

    }

    if (error.request) {

      return {
        ok: false,
        error: "Network error"
      }

    }

    return {
      ok: false,
      error: error.message
    }

  }

)

/**
 * request with retry
 */
export async function request(url, retries = 2) {

  for (let i = 0; i <= retries; i++) {

    const res = await client.get(url)

    if (res.ok) return res

    console.warn("Retry:", i + 1, url)

  }

  return {
    ok: false,
    error: "Request failed after retries"
  }

}