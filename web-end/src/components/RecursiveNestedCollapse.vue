<template>
  <div class="recursive-nested-collapse">
    <div
      class="d-flex items-center"
    >
      <span @click="expandDropdown()"><b>{{ author }}</b></span>
      <p class="content-text"> {{ content }}</p>
      <div class="row">
        <div class="row items-center action">
          <q-btn flat round color="grey" class="no-margin" icon="arrow_upward" />
          <span class="text-subtitle2 text-grey-7">{{ 10 }}</span>
          <q-btn flat round color="grey" class="no-margin" icon="arrow_downward" />
        </div>
        <div class="row items-center action">
          <q-btn flat round color="grey" icon="comment" />
          <span class="text-subtitle2 text-grey-7">Reply</span>
        </div>
      </div>
    </div>
    <div
      v-show="drawerIsSelected"
      :id="componentID"
    >
      <div v-if="data">
        <recursive-nested-collapse
          v-for="child in data"
          :key="child.id"
          :author="child.author"
          :content="child.content"
          :data="child.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecursiveNestedCollapse',
  props: {
    author: String,
    content: String,
    data: Object
  },
  data () {
    return {
      drawerIsSelected: true
    }
  },
  computed: {
    componentID () {
      return `${this.author}-${this.content}`
    }
  },
  methods: {
    expandDropdown () {
      this.drawerIsSelected = !this.drawerIsSelected
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
p {
  margin: 0;
}
a {
  color: #42b983;
}
.row {
  margin: 0 !important;
}
.recursive-nested-collapse {
  margin: 5px 15px 5px 15px;
  padding-left: 10px;
  border-left: 1px solid #bdbdbd;
}
.q-btn {
  font-size: 10px;
}
.action span {
  font-size: 13px;
}
.content-text {
  margin-top: 2px;
  margin-bottom: 1px;
}
.btn:hover,
button:hover {
  cursor: pointer;
}
</style>
