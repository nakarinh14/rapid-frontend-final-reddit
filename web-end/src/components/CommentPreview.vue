<template>
  <q-card flat :bordered="bordered" class="my-card">
    <q-card-section>
      <div class="top-caption">
        <span class="text-grey-7" style="font-size: 12px">
          <b>{{ author }}</b> commented on <b>{{ group }}</b>
        </span>
      </div>
      <div>
        <span class="inline-block author"><b>{{ author }}</b></span>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <p class="text-grey-7 inline-block author">{{ time_from_now }}</p>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <q-icon flat round color="grey" class="no-margin" name="arrow_upward" />
        <p class="text-grey-7 inline-block author">{{ karma }}</p>
      </div>
      <p class="content">{{ content }}</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CommentPreview',
  props: {
    group: String,
    author: String,
    title: String,
    content: String,
    karma: String,
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
.title h6 {
  font-size: 21px
}
.content {
  font-size: 15px
}
.author{
  font-size: 13px;
}
h6, p {
  margin: 0
}
.action p{
  margin-right: 11px;
}
.top-caption{
  margin-bottom: 3px;
}
</style>
