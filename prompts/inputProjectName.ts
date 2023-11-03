import prompts from 'prompts'
import { handlePromptState } from ':utilities/handlePromptState'
import { validateNpmPackageName } from ':utilities/validateNpmPackageName'
import path from 'node:path'

export async function inputProjectName() {
  const res = await prompts({
    onState: handlePromptState,
    type: 'text',
    name: 'path',
    message: 'What is your project named?',
    initial: 'monorepo-example',
    validate: (name: any) => {
      const validation = validateNpmPackageName(
        path.basename(
          path.resolve(name)
        )
      )
      if (validation.valid) {
        return true
      }
      return 'Invalid project name: ' + validation.problems![0]
    },
  })
  return res
}