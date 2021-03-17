<template>
  <q-card flat :bordered="bordered" class="my-card">
    <q-card-section>
      <div>
        <b class="inline group">{{ group }}</b>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <p class="text-grey-7 inline-block author">Posted by {{ author }}</p>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <p class="text-grey-7 inline-block author">{{ time_from_now }}</p>
      </div>
      <div class="title"><h6>{{ title }}</h6></div>
      <p class="content">{{ content }}</p>
    </q-card-section>
    <q-card-actions align="flex-start">
      <div class="row items-center action">
        <q-btn flat round color="grey" class="no-margin" icon="arrow_upward" />
        <h6 class="text-subtitle2 text-grey-7">{{ karma }}</h6>
        <q-btn flat round color="grey" class="no-margin" icon="arrow_downward" />
      </div>
      <div class="row items-center action">
        <q-btn flat round color="grey" icon="comment" />
        <p class="text-subtitle2 text-grey-7">{{ comment_freq }}</p>
      </div>
      <div class="row item-center action">
        <q-btn flat text-color="grey" icon="ios_share" no-caps>
          <p class="text-subtitle2 text-grey-7" style="margin-left: 9px">Share</p>
        </q-btn>
      </div>
      <div class="row items-center action">
        <q-btn flat round color="grey" icon="bookmark" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    group: String,
    author: String,
    title: String,
    content: String,
    karma: String,
    comment_freq: String,
    bordered: Boolean,
    time_from_now: String
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 725px
}
.title {
  margin-top: 7px;
  margin-bottom: 8px;
}
.title h6 {
  font-size: 21px
}
.content {
  font-size: 15px
}
.action {
  margin-right: 40px;
}
.group, .author{
  font-size: 12px;
}
h6, p {
  margin: 0
}
.action p{
  margin-right: 11px;
}
</style>
