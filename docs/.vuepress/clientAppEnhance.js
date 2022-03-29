/**
 * Client app enhancement file.
 *
 * https://v2.vuepress.vuejs.org/advanced/cookbook/usage-of-client-app-enhance.html
 */
import VueSocialSharing from 'vue-social-sharing';
import setGtag from './gtag';

export default ({
  app, // the version of Vue being used in the VuePress app
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
  app.use(VueSocialSharing);

  if (typeof exports !== 'object') {
    setGtag();
  }
}
