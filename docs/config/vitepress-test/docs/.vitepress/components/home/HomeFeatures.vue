<template>
  <div class="tw-grid md:tw-grid-cols-3 tw-gap-4 md:tw-px-12 tw-px-6">
    <div
      v-for="feature in features"
      :key="`feature-block-${feature.title}`"
      class="tw-rounded-xl tw-bg-[var(--vp-c-bg-soft)] tw-p-6"
    >
      <h2 className="tw-font-semibold tw-pb-2">{{ feature.title }}</h2>
      <ul className="[&_a]:tw-text-vc-blue">
        <li
          v-for="(detail, i) in feature.details"
          :key="`feature-defail-${i}`"
        >
          <span v-if="typeof detail === 'string'">
            {{ detail }}
          </span>
          <a v-else :href="detail.href" target="_blank">
            {{ detail.content }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFeatures',
  data() {
    return {
      features: [
        {
          title: 'Frontend Development',
          details: [
            'Vuejs 4+years',
            'Reactjs 3+years',
            'Nuxtjs 2+years',
            'Nextjs 1+year',
            'JavaScript 4+years',
            'TypeScript 3+years',
            'Webpack 4+years',
            'Vite 2+years',
            'SCSS 4+years',
            'StyledComponents 1+year',
            'TailwindCSS 2+year'
          ],
        },
        {
          title: 'Backend Development',
          details: [
            'Expressjs 3+years',
            'Koajs 2+years',
            'Nodejs 3+years',
            'ApolloGraphQL 1+year',
            'ParseServer 1+year',
            'Docker 2+years',
            'Prisma 1+years',
            'MySQL 1+year',
            'MongoDB 0.5+year',
            'Django 0.5+year',
            'Temporal 1+year',
          ],
        },
        {
          title: 'Implement',
          details: [
            {
              content: '[NPM] jspdf-html2canvas',
              href: 'https://www.npmjs.com/package/jspdf-html2canvas',
            },
            {
              content: '[NPM] script-custom-module',
              href: 'https://www.npmjs.com/package/script-custom-module',
            },
            {
              content: '[NPM] maju-ui',
              href: 'https://www.npmjs.com/package/maju-ui',
            },
            {
              content: '[NPM] remockjs',
              href: 'https://www.npmjs.com/package/remockjs',
            },
            {
              content: 'TailwindCSS EDM Generator',
              href: 'https://github.com/johnnywang1994/edm-generator',
            },
            {
              content: '[NPM] maju-decorators',
              href: 'https://www.npmjs.com/package/maju-decorators',
            },
            {
              content: '[NPM] node-ftp-cli',
              href: 'https://www.npmjs.com/package/node-ftp-cli',
            },
            {
              content: 'Virtual-Dom Implement',
              href: 'https://github.com/jwlearn1994/tiny-vnode',
            },
            {
              content: 'MVVM Implement',
              href: 'https://github.com/johnnywang1994/mivm.git',
            },
          ]
        },
      ],
    };
  }
};
</script>
