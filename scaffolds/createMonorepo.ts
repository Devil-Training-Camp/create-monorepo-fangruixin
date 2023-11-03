import { isFolderEmpty } from ':utilities/isFolderEmpty'
import { isWriteable } from ':utilities/isWritable'
import { makeDir } from ':utilities/makeDir'
import path from 'node:path'
import { green } from 'picocolors'
import { installTemplate } from ':utilities/installTemplate'

export async function createMonorepo(options: {
  monorepoPath: string
}) {
  const {
    monorepoPath
  } = options

  const root = path.resolve(monorepoPath)

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.'
    )
    console.error(
      'It is likely you do not have write permissions for this folder.'
    )
    process.exit(1)
  }

  const monorepoName = path.basename(root)

  await makeDir(root)
  if (!isFolderEmpty(root, monorepoName)) {
    process.exit(1)
  }

  console.log(`Creating a new monorepo in ${green(root)}.`)
  console.log()

  process.chdir(root)

  await installTemplate({
    templateName: 'monorepo'
  })
}