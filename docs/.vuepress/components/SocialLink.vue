<template>
  <ShareNetwork
    :network="network"
    :url="resultUrl"
    :title="title"
    :description="description"
    :quote="quote"
    :hashtags="hashtags"
    class="social-share-btn"
  >
    {{ textMap[network] }}
  </ShareNetwork>
</template>

<script>
import VueSocialSharing from 'vue-social-sharing'
const { ShareNetwork } = VueSocialSharing;

export default {
  components: {
    ShareNetwork
  },
  props: {
    network: {
      type: String,
      default: 'facebook',
    },
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Welcome to Johnny Wang Blog',
    },
    description: {
      type: String,
      default: 'This is a new post by Johnny Wang',
    },
    quote: {
      type: String,
      default: 'Lets learn something special',
    },
    hashtags: {
      type: String,
      default: 'Javascript,Coding',
    },
  },
  data() {
    return {
      textMap: {
        facebook: 'Facebook',
        messenger: 'Messenger',
        line: 'LINE',
        baidu: 'Baidu',
        telegram: 'Telegram',
      },
      resultUrl: '',
    }
  },
  mounted() {
    this.resultUrl = this.url === ''
      ? window.location.href
      : this.url;
  },
};
</script>

<style lang="scss">
.share-network {
  &-baidu {
    background: linear-gradient(to bottom, blue, red);
    color: white;
  }
  &-facebook {
    background: #3B5998;
    color: white;
  }
  &-line {
    background: #099331;
    color: white;
  }
  &-messenger {
    background: linear-gradient(15deg, #128cff, #fe557e);
    color: white;
  }
  &-telegram {
    background: rgb(0, 132, 255);
    color: white;
  }
}

.social-share-btn {
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  &:hover {
    text-decoration: none !important;
  }
}
</style>