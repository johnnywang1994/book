// https://github.com/eFrane/vuepress-plugin-mermaidjs
import path from 'path'
import markdownItPlugin from './markdownItPlugin'

export default function MermaidPlugin(options = {}, ctx) {
  return {
    name: 'vuepress-plugin-mermaidjs',
    define: {
      MERMAID_OPTIONS: options
    },
    extendsMarkdown(md) {
      md.use(markdownItPlugin)
    },
    clientConfigFile: path.resolve(__dirname, 'client.js')
  }
}