import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1
    }
  }
  return ~c >>> 0
}

/** Minimal RGB PNG writer. */
function pngRgb(size, paint) {
  const stride = 1 + size * 3
  const raw = Buffer.alloc(stride * size)
  for (let y = 0; y < size; y++) {
    const rowStart = y * stride
    raw[rowStart] = 0
    for (let x = 0; x < size; x++) {
      const [r, g, b] = paint(x, y, size)
      const i = rowStart + 1 + x * 3
      raw[i] = r
      raw[i + 1] = g
      raw[i + 2] = b
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 2

  function chunk(type, data) {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length, 0)
    const typeBuf = Buffer.from(type)
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
    return Buffer.concat([len, typeBuf, data, crc])
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function paint(x, y, size) {
  const nx = x / (size - 1)
  const ny = y / (size - 1)
  const bg = [20, 16, 24]
  const inMountain = ny > 0.55 && Math.abs(nx - 0.5) < (ny - 0.55) * 1.15
  if (inMountain) return [232, 184, 109]
  const dx = nx - 0.72
  const dy = ny - 0.28
  if (dx * dx + dy * dy < 0.018) return [244, 209, 154]
  return bg
}

const outDir = path.resolve('public')
fs.mkdirSync(outDir, { recursive: true })
for (const size of [192, 512]) {
  const file = path.join(outDir, `pwa-${size}.png`)
  fs.writeFileSync(file, pngRgb(size, paint))
  console.log('wrote', file)
}
