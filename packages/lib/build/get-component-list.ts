import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = fileURLToPath(new URL('.', import.meta.url))
const INPUT_COMPONENT_DIR = resolve(_dirname, './../components')

export async function getComponentList() {
  try {
    const fileList = await readdir(INPUT_COMPONENT_DIR, { withFileTypes: true })
    return fileList
      .filter(
        dirent =>
          dirent.isFile()
          && dirent.name.startsWith('Maz')
          && !dirent.name.endsWith('.d.ts')
          && !dirent.name.endsWith('.css'),
      )
      .map(({ name }) => ({
        name: name.split('.')[0],
        fullName: `${name}`,
        path: `${INPUT_COMPONENT_DIR}/${name}`,
      }))
  }
  catch (error) {
    throw new Error(
      `[get-component-list] 🔴 Error occurred while generating components entry file ${error}`,
    )
  }
}
