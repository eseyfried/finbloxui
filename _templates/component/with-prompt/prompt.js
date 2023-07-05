// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
    {
        type: 'input',
        name: 'name',
        message: "What is the component name (separate with underscores)?"
    },
    {
        type: 'input',
        name: 'path',
        message: "Where is the directory path to save this component?"
  }
]
