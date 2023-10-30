import fs from 'node:fs'

export async function isWriteable(directory: string) {
  try {
    await fs.promises.access(directory, (fs.constants || fs).W_OK)
    return true
  } catch (err) {
    return false
  }
}