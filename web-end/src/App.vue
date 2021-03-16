<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <q-header reveal style="background-color: #D84315">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-icon style="font-size: 32px;" name="auto_stories"/>
          <q-toolbar-title>read-it</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
