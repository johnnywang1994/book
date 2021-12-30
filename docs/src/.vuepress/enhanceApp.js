/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueSocialSharing from 'vue-social-sharing';
import setGtag from './gtag';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
  Vue.use(VueSocialSharing);

  if (typeof exports !== 'object') {
    setGtag();
  }
}
