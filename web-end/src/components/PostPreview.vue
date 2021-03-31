<template>
  <q-card flat :bordered="bordered" class="my-card">
    <unauthorize-modal v-model="unAuthModalVisible"/>
    <post-reply-modal
      :prompt="postModalVisible"
      :toggle-modal="togglePostModal"
      :post-title="title"
      :post-id="id"
      :subreadit="subreadit"
      :on-create="onCreateComment"
    />
    <q-card-section>
      <div>
        <router-link
          :to="`/subreadit/${group}`"
          tag="b"
          class="direct inline group"
        >
          {{ group }}
        </router-link>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <router-link
          :to="`/user/${author}`"
        >
          <p class="text-grey-7 inline-block author direct">
            Posted by {{ author }}
          </p>
        </router-link>
        <q-icon name="circle" style="font-size: 0.17em; color: grey; margin-right: 5px; margin-left: 5px"></q-icon>
        <p class="text-grey-7 inline-block author">{{ parseDate(time_from_now) }}</p>
      </div>
      <div class="title">
        <router-link
          :to="`/post/${id}`"
          tag="h6"
          class="direct"
        >
          {{ title }}
        </router-link>
      </div>
      <p class="content">{{ content }}</p>
    </q-card-section>
    <q-card-actions>
      <div class="row items-center action">
        <q-btn flat round :color="upvoteColour()" class="no-margin" icon="arrow_upward" v-on:click="upvote()" />
        <h6 class="text-subtitle2 text-grey-7">{{ karma }}</h6>
        <q-btn flat round :color="downvoteColour()" class="no-margin" icon="arrow_downward" v-on:click="downvote()" />
      </div>
      <div class="row items-center action">
        <q-btn flat text-color="grey" icon="comment" @click="commentOnClick()">
          <p class="text-subtitle2 text-grey-7" style="margin-left: 9px">
            {{ comment_freq }}
          </p>
        </q-btn>
      </div>
      <div class="row item-center action">
        <q-btn
          flat text-color="grey"
          icon="ios_share"
          no-caps
          @click="copyURL()">
          <p class="text-subtitle2 text-grey-7" style="margin-left: 9px">
            Share
          </p>
        </q-btn>
      </div>
      <div class="row items-center action">
        <q-btn flat round color="grey" icon="bookmark_outline" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { getDisplayDate } from '../utils/post-util'
import PostReplyModal from 'components/PostReplyModal'
import { votePost } from '../services/PostService'
import UnauthorizeModal from 'components/UnauthorizeModal'

export default {
  name: 'PostPreview',
  components: { UnauthorizeModal, PostReplyModal },
  data () {
    return {
      postModalVisible: false,
      unAuthModalVisible: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    },
    userVoteStatus () {
      if (this.userVotes && this.$store.getters['auth/getUser']) {
        if (this.userVotes[this.$store.getters['auth/getUser'].displayName] !== undefined) {
          return this.userVotes[this.$store.getters['auth/getUser'].displayName]
        }
      }
      return null
    }
  },
  // Might change karma type and comment freq type into number
  props: {
    group: String,
    author: String,
    title: String,
    content: String,
    karma: Number,
    comment_freq: Number,
    bordered: Boolean,
    time_from_now: Number,
    id: String,
    userVotes: Object,
    subreadit: String,
    onCreateComment: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    copyURL () {
      navigator.clipboard.writeText(`${window.location.origin}/#/post/${this.id}`)
      this.showNotif()
    },
    showNotif () {
      this.$q.notify({
        message: 'Link copied.',
        icon: 'announcement',
        timeout: 500
      })
    },
    parseDate (timestamp) {
      return getDisplayDate(timestamp)
    },
    togglePostModal (visible) {
      this.postModalVisible = visible == null ? !this.postModalVisible : visible
    },
    upvote () {
      if (!this.checkAuthorized()) return
      votePost(this.id, this.$store.getters['auth/getUser'].displayName)
    },
    downvote () {
      if (!this.checkAuthorized()) return
      votePost(this.id, this.$store.getters['auth/getUser'].displayName, false)
    },
    upvoteColour () {
      if (this.userVoteStatus) return 'orange'
      else return 'grey'
    },
    downvoteColour () {
      if (this.userVoteStatus !== null && !this.userVoteStatus) return 'blue'
      else return 'grey'
    },
    checkAuthorized () {
      if (!this.$store.getters['auth/getUser']) {
        this.unAuthModalVisible = true
        return false
      }
      return true
    },
    commentOnClick () {
      if (this.user) {
        this.togglePostModal()
      } else {
        this.unAuthModalVisible = true
      }
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
}
.title {
  margin-top: 7px;
  margin-bottom: 8px;
}
.title h6 {
  font-size: 21px;
  cursor: pointer;
}
.direct {
  cursor: pointer;
}
.direct:hover {
  text-decoration: underline;
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
