import hash from 'hash-sum'
import markdownItFence from './markdownItFence'

export default function mermaidjsPlugin (md) {
  return markdownItFence(md, 'mermaid-fence', {
    render: (tokens, idx, _options, env, self) => {
      const token = tokens[idx]
      const key = `mermaid_${hash(idx)}`
      const { content } = token

      let encoded = encodeURIComponent(content)
      return `<Mermaid id="${key}" graph="${encoded}"></Mermaid>`
    },
    validate: (params) => {
      return params.trim().split(' ').includes('mermaid')
    }
  })
}