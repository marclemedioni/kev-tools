import { build } from 'gluegun'

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('kev-tools')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'kev-tools-*', hidden: true })
    .plugin(__dirname + '/../node_modules/@lenne.tech/gluegun-menu/dist', {
      commandFilePattern: ['*.js'],
      extensionFilePattern: ['*.js'],
    })
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
