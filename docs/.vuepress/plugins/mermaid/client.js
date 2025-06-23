import { defineClientConfig } from '@vuepress/client'
import { Mermaid } from './mermaid'

export default defineClientConfig({
  enhance({ app }){
    app.component('Mermaid', Mermaid);
  },
})