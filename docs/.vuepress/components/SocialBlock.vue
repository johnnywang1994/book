<template>
  <div class="social-share-block">
    <p>Share On:</p>
    <div class="btn-wrapper">
      <SocialLink :url="url" :title="title" :description="description" :quote="quote" :hashtags="hashtags" />
      <SocialLink :url="url" :title="title" :description="description" :quote="quote" :hashtags="hashtags" network="line" />
      <SocialLink :url="url" :title="title" :description="description" :quote="quote" :hashtags="hashtags" network="messenger" />
      <SocialLink :url="url" :title="title" :description="description" :quote="quote" :hashtags="hashtags" network="telegram" />
    </div>
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang="scss">
.social-share-block {
  > p {
    color: rgb(134, 134, 134);
    margin: 0;
    font-size: 14px;
  }
  .btn-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
