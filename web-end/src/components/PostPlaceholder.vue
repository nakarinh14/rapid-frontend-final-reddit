<template>
  <q-card flat bordered>
    <q-item>
      <q-item-section class="q-pl-sm">
        <div class="row items-center justify-between no-wrap">
          <div class="row items-center">
            <q-skeleton type="QBadge" animation="fade" />
            <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
            <q-skeleton type="QBadge" animation="fade" />
            <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
            <q-skeleton type="QBadge"  animation="fade" />
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="80%" animation="fade"  />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="q-pl-sm">
        <q-skeleton height="100px" class="q-mb-sm" animation="fade" />
        <div class="row items-center justify-between no-wrap">
          <div class="row items-center">
            <q-icon name="arrow_upward" color="grey-4" size="18px" />
            <q-skeleton type="text" width="30px" />
            <q-icon name="arrow_downward" color="grey-4" class="q-mr-sm" size="18px" />
          </div>
          <div class="row items-center">
            <q-icon name="chat_bubble_outline" color="grey-4" class="q-mr-sm" size="18px" />
            <q-skeleton type="text" width="30px" />
          </div>
          <div class="row items-center">
            <q-icon name="ios_share" color="grey-4" class="q-mr-sm" size="18px" />
            <q-skeleton type="text" width="30px" />
          </div>
          <div class="row items-center">
            <q-icon name="repeat" color="grey-4" class="q-mr-sm" size="18px" />
            <q-skeleton type="text" width="30px" />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'PostPlaceholder'
}
</script>

<style scoped>

</style>
