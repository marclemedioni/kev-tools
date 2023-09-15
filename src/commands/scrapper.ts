import { GluegunCommand } from 'gluegun'

const API_MESSAGE = `
Before using the movie CLI, you'll need an API key from ranxplorer.

RANXPLORER KEY>`

const command: GluegunCommand = {
  name: 'scrapper',
  hidden: true,
  run: async (toolbox) => {
    const { parameters, prompt, scrapper } = toolbox

    let inputFile = parameters.first

    if (!inputFile) {
      const result = await prompt.ask({
        type: 'input',
        name: 'file',
        message: '🗂️  Where is the input file ?',
      })

      if (result && result.file) {
        inputFile = result.file
      }
    }

    let useRanxplorer = false

    const result = await prompt.ask({
      type: 'confirm',
      name: 'useRanxplorer',
      initial: false,
      message: 'Use ranxplorer ?',
    })

    if (result && result.useRanxplorer) {
      useRanxplorer = true
      if ((await scrapper.getApiKey()) === false) {
        // didn't find an API key. let's ask the user for one
        const result = await prompt.ask({
          type: 'input',
          name: 'key',
          message: API_MESSAGE,
        })

        // if we received one, save it
        if (result && result.key) {
          await scrapper.saveApiKey(result.key)
        } else {
          // no API key, exit
          return
        }
      }
    }

    await scrapper.launch(
      inputFile,
      useRanxplorer && (await scrapper.getApiKey())
    )
  },
}

module.exports = command
