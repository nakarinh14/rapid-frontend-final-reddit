<template>
  <q-card className="my-card bg-secondary text-white">
    <q-card-section>
      <div><p>r/movies  Posted by u/crazy</p></div>
      <div classname="title"><h6>Zack Snyder's Justice League | Official Trailer 2 | HBO Max</h6></div>
      <p classname="content">{{ lorem }}</p>
    </q-card-section>

    <q-separator dark/>

    <q-card-actions align="around">
      <q-btn flat round color="red" icon="favorite" />
      <q-btn flat round color="teal" icon="bookmark" />
      <q-btn flat round color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'PostPreview',
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.title
  margin-top: 10px
  margin-bottom: 10px
h6
  margin: 0
p
  margin: 0

</style>
