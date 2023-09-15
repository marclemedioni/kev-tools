import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'kev-tools',
  hidden: true,
  run: async (toolbox) => {
    await toolbox.menu.showMenu('', {
      showHelp: false,
      hideBack: true,
      cancelLabel: 'quit',
      byeMessage: '💋 mon bichon, travail pas trop tard',
    })
  },
}

module.exports = command
