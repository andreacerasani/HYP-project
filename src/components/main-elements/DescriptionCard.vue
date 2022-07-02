<!-- Component with an image and a part of text on the left or right that when the img shrinks the text goes down
with a possible link added   -->
<template>
  <div class="container-xl">
    <div
      class="row p-3 align-items-center"
      :class="{
        'flex-column-reverse flex-md-row': isLeft,
        'flex-column flex-md-row': !isLeft,
      }"
    >
      <div v-if="isLeft" class="col text-center">
        <div class="row p-3">
          <p class="text">{{ title }}</p>
        </div>
        <div class="row p-2">
          <div>
            <p>{{ limitDescription(description,400) }}</p>
          </div>
        </div>
        <div class="row justify-content-center p-3">
          <span v-if="linkPath !== 'def'">
            <nuxt-link :to="linkPath">
              <button type="button" class="btn btn-outline-primary">{{ linkName }}</button>
              </nuxt-link>
          </span>
        </div>
      </div>

      <div class="col text-center">
        <img :src="descrImg" class="rounded-3 img-fluid" :alt="removePath(descrImg)" />
      </div>

      <div v-if="!isLeft" class="col text-center">
        <div class="row p-3">
          <p class="text">{{ title }}</p>
        </div>
        <div class="row p-2">
          <div>
            <p>{{ limitDescription(description,400) }}</p>
          </div>
        </div>
        <div class="row justify-content-center p-3">
          <span v-if="linkPath !== 'def'">
            <nuxt-link :to="linkPath">
              <button type="button" class="btn">{{ linkName }}</button>
              </nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import common from '~/mixins/common'
export default {
  name: 'DescriptionCard',
  mixins: [common],
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    descrImg: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    linkName: {
      type: String,
      required: false,
      default: '',
    },
    linkPath: {
      type: String,
      required: false,
      default: 'def',
    },
    isLeft: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods:{
    limitDescription(str = '', num = 1) {
      const { length: len } = str
      if (num < len) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
  }
}
</script>

<style scoped>
p{
  color: var(--text-color);
}
button{
  color: var(--subtitle-color);
  border-color: var(--subtitle-color);
}
button:hover{
  background-color: var(--subtitle-color);
  color: white;
}
.text {
  font-size: 2rem;
  font-weight: 600;
  color: var(--subtitle-color);
}
</style>