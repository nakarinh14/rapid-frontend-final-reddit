<template>
  <div class="recursive-nested-collapse">
    <div
      class="d-flex row items-stretch"
    >
      <div class="crazy-comment-border" @click="expandDropdown()" />
      <div class="column">
        <div class="column">
          <div class="row content-center items-center">
            <router-link
              :to="`/user/${author}`"
              tag="span"
              class="direct"
            >
              <b>{{ author }}</b>
            </router-link>
            <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
            <p class="text-grey-7 inline-block time">{{ parseDate(time_from_now) }}</p>
            <transition name="fade">
              <span v-if="!drawerIsSelected">
                <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
                <span class="text-grey-7 inline-block time">(Hidden)</span>
              </span>
            </transition>
          </div>
          <div v-if="drawerIsSelected">
            <p class="content-text"> {{ content }}</p>
            <div class="row">
              <div class="row items-center action">
                <q-btn flat round :color="upvoteColour()" class="no-margin" icon="arrow_upward" v-on:click="upvoteComment()"/>
                <span class="text-subtitle2" :style="{color: textColor}">{{ karma }}</span>
                <q-btn flat round :color="downvoteColour()" class="no-margin" icon="arrow_downward" v-on:click="downvoteComment()" />
              </div>
              <div class="row items-center action">
                <q-btn flat text-color="grey" icon="comment" @click="reply_onclick(true, path)"  no-caps>
                  <span class="text-subtitle2 text-grey-7" style="margin-left: 7px">Reply</span>
                </q-btn>
              </div>
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
              :id="child.id"
              :author="child.comment.user.displayName"
              :content="child.comment.body"
              :karma="child.comment.upvotes"
              :time_from_now="child.comment.timestamp"
              :data="child.comments"
              :user-upvotes="child.comment.user_upvotes"
              :reply_onclick="reply_onclick"
              :path="`${path}/${child.id}`"
              :on-update="onUpdate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDisplayDate } from 'src/utils/post-util'
import { voteComment } from 'src/services/CommentService'

export default {
  name: 'RecursiveNestedCollapse',
  mounted () {
    console.log(this.userUpvotes)
  },
  props: {
    id: String,
    author: String,
    content: String,
    karma: Number,
    time_from_now: Number,
    data: Object,
    reply_onclick: Function,
    path: String,
    userUpvotes: Object,
    onUpdate: Function
  },
  data () {
    return {
      drawerIsSelected: true
    }
  },
  computed: {
    componentID () {
      return `${this.author}-${this.content}`
    },
    userVoteStatus () {
      if (this.userUpvotes && this.$store.getters['auth/getUser']) {
        if (this.userUpvotes[this.$store.getters['auth/getUser'].displayName] !== undefined) {
          return this.userUpvotes[this.$store.getters['auth/getUser'].displayName]
        }
      }
      return null
    },
    textColor () {
      if (this.userVoteStatus == null) return 'grey'
      return this.userVoteStatus ? 'orange' : 'blue'
    }
  },
  methods: {
    expandDropdown () {
      this.drawerIsSelected = !this.drawerIsSelected
    },
    parseDate (timestamp) {
      return getDisplayDate(timestamp)
    },
    async upvoteComment () {
      await voteComment(this.id, this.$store.getters['auth/getUser'].displayName)
      this.onUpdate()
    },
    async downvoteComment () {
      await voteComment(this.id, this.$store.getters['auth/getUser'].displayName, false)
      this.onUpdate()
    },
    upvoteColour () {
      if (this.userVoteStatus) return 'orange'
      else return 'grey'
    },
    downvoteColour () {
      if (this.userVoteStatus !== null && !this.userVoteStatus) return 'blue'
      else return 'grey'
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
.crazy-comment-border{
  /*border-left: 1px solid #bdbdbd;*/
  padding-left: 10px;
  cursor: pointer;
  box-shadow: -2px 0 0 0 #bdbdbd;
  transition: box-shadow 0.1s linear;
}
.crazy-comment-border:hover{
  box-shadow: -4px 0 0 0 #bdbdbd;
}
.direct {
  cursor: pointer;
}
.direct:hover {
  text-decoration: underline;
}
.row {
  margin: 0 !important;
}
.recursive-nested-collapse {
  margin: 5px 15px 5px 15px;
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
.time {
  font-size: 13px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
