import validate from 'validate-npm-package-name'

export function validateNpmPackageName(name: string) {
  const validation = validate(name)
  if (validation.validForNewPackages) {
    return {
      valid: true as const
    }
  }

  return {
    valid: false as const,
    problems: [
      ...(validation.errors || []),
      ...(validation.warnings || []),
    ] as string[],
  }
}