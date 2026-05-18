const TurndownService = require("turndown")
const turndownPluginGfm = require("turndown-plugin-gfm")
const fs = require("fs")
const path = require("path")

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
})

// Use GitHub Flavored Markdown plugin
turndownService.use(turndownPluginGfm.gfm)

// Custom rule to strip scripts and styles since we want clean markdown
turndownService.addRule("strip-scripts", {
  filter: ["script", "style", "head"],
  replacement: () => "",
})

// Load the source HTML
const htmlPath = path.join(__dirname, "..", "src", "index.html")
const html = fs.readFileSync(htmlPath, "utf8")

// Convert to Markdown
let markdown = turndownService.turndown(html)

// Remove "View in markdown" text from the generated markdown
markdown = markdown.replace(/View in markdown/gi, "")

// Remove the photo line from the generated markdown
markdown = markdown.replace(/!\[Photo\]\(\.\/profile\.jpg\)/g, "")

// Replace empty links with descriptive text
markdown = markdown.replace(/\[\]\(mailto:([^)]+)\)/g, "[Email](mailto:$1)")
markdown = markdown.replace(/\[\]\(https:\/\/github\.com\/([^)]+)\)/g, ", [Github Profile](https://github.com/$1)")

// Add "#" to the first line
const lines = markdown.split("\n")
if (lines.length > 0) {
  lines[0] = "# " + lines[0]
  markdown = lines.join("\n")
}

//
// Ensure dist directory exists
const distDir = path.join(__dirname, "..", "dist")
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir)
}

// Write the markdown file
fs.writeFileSync(path.join(distDir, "index.md"), markdown)

console.log("Successfully converted src/index.html to dist/index.md")
