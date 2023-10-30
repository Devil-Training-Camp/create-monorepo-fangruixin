import path from 'node:path'

export async function installTemplate(options: {
  templateName: string
}) {
  const {
    templateName
  } = options
  console.log('\nInitializing project with template:', templateName, '\n')
  const templatePath = path.join(__dirname, templateName)
}