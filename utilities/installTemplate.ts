import { copy } from ':utilities/copy'
import path from 'node:path'

export async function installTemplate(options: {
  templateName: string
  root: string
}) {
  const {
    templateName,
    root
  } = options
  console.log('\nInitializing project with template:', templateName, '\n')
  const templatePath = path.join(__dirname, 'templates' ,templateName)
  const sources = ['**']

  await copy(sources, root, {
    cwd: templatePath
  })
}