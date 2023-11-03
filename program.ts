import { Command } from 'commander'
import packageJson from './package.json'
import { cyan, green, red, yellow, bold, blue } from 'picocolors'

export const programState = {
  projectPath: ''
}

export const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('[project-directory]')
  .usage(`${green('<project-directory>')} [options]`)
  .action((name) => {
    programState.projectPath = name
  })
  .allowUnknownOption()
  .parse(process.argv)