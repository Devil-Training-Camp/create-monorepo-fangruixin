import { async as glob } from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs'

export async function copy(source: string | string[], destination: string, options?: {
  /**
   * Current working directory
   */
  cwd?: string
}) {
  const {
    cwd
  } = options || {}
  const sources = typeof source === 'string' ? [source] : source

  if (sources.length === 0 || !destination) {
    throw new TypeError('`sources` and `destination` are required')
  }

  const sourceFiles = await glob(source, {
    cwd,
    dot: true,
    absolute: false,
    stats: false,
  })

  const resolvedDestination = cwd ? path.resolve(cwd, destination) : destination

  return Promise.all(sourceFiles.map(async (filePath) => {
    const basename = path.basename(filePath)
    const from = cwd ? path.resolve(cwd, filePath) : filePath
    const to = path.join(resolvedDestination, basename)

    await fs.promises.mkdir(path.dirname(to), { recursive: true })

    return fs.promises.copyFile(from, to)
  }))
}