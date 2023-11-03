#!/usr/bin/env node
import { inputProjectName } from ':prompts/inputProjectName'
import { program, programState } from './program'
import { bold, cyan, green, red } from 'picocolors'
import path from 'node:path'
import fs from 'node:fs'
import { validateNpmPackageName } from ':utilities/validateNpmPackageName'
import { isFolderEmpty } from ':utilities/isFolderEmpty'
import { createMonorepo } from ':scaffolds/createMonorepo'

async function main() {
  let projectPath = programState.projectPath

  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }

  if (!projectPath) {
    const { path } = await inputProjectName()

    if (typeof path === 'string') {
      projectPath = path.trim()
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${cyan(program.name())} ${green('<project-directory>')}\n` +
        'For example:\n' +
        `  ${cyan(program.name())} ${green('monorepo-example')}\n\n` +
        `Run ${cyan(`${program.name()} --help`)} to see all options.`
    )
    process.exit(1)
  }

  const resolvedProjectPath = path.resolve(projectPath)
  const projectName = path.basename(resolvedProjectPath)

  const { valid, problems } = validateNpmPackageName(projectName)
  if (!valid) {
    console.error(
      `Could not create a project called ${red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    )

    problems!.forEach((p) => console.error(`    ${red(bold('*'))} ${p}`))
    process.exit(1)
  }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath)
  const folderName = path.basename(root)
  const folderExists = fs.existsSync(root)

  if (folderExists && !isFolderEmpty(root, folderName)) {
    process.exit(1)
  }

  try {
    await createMonorepo({
      monorepoPath: resolvedProjectPath
    })
  } catch (reason) {
    throw reason
  }
}

main()
  .catch(reason => {
    console.log(
      'Unexpected error. Please report it as a bug:'
    )
    console.log(reason)
  })