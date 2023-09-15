import { GluegunToolbox } from 'gluegun'
import { launch as scrapperLaunch } from '../toolbox/scrapper'

module.exports = (toolbox: GluegunToolbox) => {
  const { filesystem } = toolbox

  const CONFIG = `${filesystem.homedir()}/.kev-tools/config.json`

  let ranxplorerKey: string | false = false

  // read an existing API key from the `MOVIE_CONFIG` file, defined above
  async function readApiKey(): Promise<string | false> {
    if (filesystem.exists(CONFIG)) {
      const config = await filesystem.readAsync(CONFIG, 'json')
      return config.ranxplorerKey
    }
    return false
  }

  async function getApiKey(): Promise<string | false> {
    // if we've already retrieved it, return that
    if (ranxplorerKey) return ranxplorerKey

    // get it from the config file?
    ranxplorerKey = await readApiKey()

    // return the key
    return ranxplorerKey
  }

  // save a new API key to the `MOVIE_CONFIG` file
  async function saveApiKey(key): Promise<void> {
    if (filesystem.exists(CONFIG)) {
      const config = await filesystem.readAsync(CONFIG, 'json')
      config.ranxplorerKey = key
      return filesystem.writeAsync(CONFIG, config)
    }
    return filesystem.writeAsync(CONFIG, { ranxplorerKey: key })
  }

  async function launch(inputFile: string, ranxplorerKey: string) {
    return scrapperLaunch(inputFile, ranxplorerKey)
  }

  toolbox.scrapper = { launch, getApiKey, saveApiKey }
}
