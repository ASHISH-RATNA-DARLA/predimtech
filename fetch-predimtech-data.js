import { JSDOM } from "jsdom"

async function fetchWebsiteData() {
  try {
    console.log("Fetching data from predimtech.com...")
    const response = await fetch("https://predimtech.com/index.html")

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    console.log("Successfully fetched HTML content")

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract key information
    const title = document.querySelector("title")?.textContent || "No title found"
    const metaDescription =
      document.querySelector('meta[name="description"]')?.getAttribute("content") || "No description found"

    // Extract all headings
    const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map((h) => ({
      level: h.tagName,
      text: h.textContent.trim(),
    }))

    // Extract main content paragraphs
    const paragraphs = Array.from(document.querySelectorAll("p"))
      .map((p) => p.textContent.trim())
      .filter((text) => text.length > 0)

    // Extract links
    const links = Array.from(document.querySelectorAll("a"))
      .map((a) => ({
        text: a.textContent.trim(),
        href: a.getAttribute("href"),
      }))
      .filter((link) => link.href && !link.href.startsWith("#") && link.href !== "")

    // Extract images
    const images = Array.from(document.querySelectorAll("img")).map((img) => ({
      alt: img.getAttribute("alt") || "No alt text",
      src: img.getAttribute("src"),
    }))

    // Compile the data
    const websiteData = {
      title,
      metaDescription,
      headings,
      paragraphs,
      links,
      images,
    }

    console.log("Extracted Website Data:")
    console.log(JSON.stringify(websiteData, null, 2))

    return websiteData
  } catch (error) {
    console.error("Error fetching or parsing website data:", error.message)
  }
}

// Execute the function
fetchWebsiteData()

