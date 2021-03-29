<template>
  <q-card flat>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="40%" animation="fade" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="30%" animation="fade"  />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="q-pl-sm">
        <q-skeleton height="80px" class="q-mb-sm"  width="70%" animation="fade" />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'CommentPlaceholder'
}
</script>

<style scoped>

</style>
