import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const htmlPath = path.join(distDir, 'index.html')
let html = fs.readFileSync(htmlPath, 'utf8')

const scriptMatch = html.match(
  /<script(?: type="module")?(?: crossorigin)? src="([^"]+)"><\/script>/,
)
const cssMatch = html.match(
  /<link rel="stylesheet"(?: crossorigin)? href="([^"]+)">/,
)

if (!scriptMatch || !cssMatch) {
  throw new Error('postbuild: could not find script/css references in dist/index.html')
}

const jsPath = path.join(distDir, scriptMatch[1].replace(/^\.\//, ''))
const cssPath = path.join(distDir, cssMatch[1].replace(/^\.\//, ''))
const js = fs.readFileSync(jsPath, 'utf8')
const css = fs.readFileSync(cssPath, 'utf8')

// 1) folder-based index.html：defer，方便 npm run preview
html = html
  .replace(scriptMatch[0], `<script defer src="${scriptMatch[1]}"></script>`)
  .replace(cssMatch[0], `<link rel="stylesheet" href="${cssMatch[1]}">`)
fs.writeFileSync(htmlPath, html)

// 2) 单文件：发给别人双击即可（不依赖 Node / 同一 Wi‑Fi）
const single = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#ffffff" />
    <title>New Mexico Trip</title>
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
${js}
    </script>
  </body>
</html>
`

const singlePath = path.join(distDir, 'New-Mexico-Trip.html')
fs.writeFileSync(singlePath, single)

console.log('postbuild:')
console.log('  - dist/index.html (for preview / PWA: npm run preview)')
console.log('  - dist/New-Mexico-Trip.html  ← 单文件分享（无离线 SW）')
console.log('  - dist/sw.js + manifest → 用本地服务器打开才能安装/离线')
