<template>
  <div :class="[isLeft ? 'outerLeft' : 'outerRight']">
    <div class="container-xl">
      <div class="row pt-5 align-items-center">
        <div class="empty-space col-1" />
        <div class="col-8 text-start">
          <h1
            :class="{
              left: isLeft,
              right: !isLeft,
            }"
          >
            {{ title }}
          </h1>
        </div>
        <div class="col text-end pe-5">
          <nuxt-link :to="linkPath">
            <button
              type="button"
              class="btn"
              :class="[isLeft ? 'left' : 'right']"
            >
              {{ linkName }}
            </button>
          </nuxt-link>
        </div>
      </div>

      <div
        class="row pt-3 pb-5 align-items-center flex-wrap"
        :class="{
          'flex-row-reverse ': !isLeft,
          'flex-row flex-md-row': isLeft,
        }"
      >
        <div class="col-lg-7 col-sm-12 half-side">
          <div class="pb-3">
            <clickable-image
              :img="content[0].images[0].path"
              :name="content[0].title"
              :link="content[0].linkPath"
              :date="content[0].date"
              :trapezoid="false"
              class="bigCard"
            />
          </div>
        </div>

        <div class="col-lg-5 half-side">
          <clickable-image
            :img="content[1].images[0].path"
            :name="content[1].title"
            :link="content[1].linkPath"
            :date="content[1].date"
            :trapezoid="true"
            class="smallCard number-1 flex-fill"
          />
          <br />
          <clickable-image
            :img="content[2].images[0].path"
            :name="content[2].title"
            :link="content[2].linkPath"
            :date="content[2].date"
            :trapezoid="true"
            class="smallCard number-2 flex-fill"
          />
          <br />
          <clickable-image
            :img="content[3].images[0].path"
            :name="content[3].title"
            :link="content[3].linkPath"
            :date="content[3].date"
            :trapezoid="true"
            class="smallCard number-3 flex-fill"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    linkName: {
      type: String,
      required: false,
      default: 'See all',
    },
    linkPath: {
      type: String,
      required: true,
    },
    content: {
      type: Array, // Array of at least 4 elements with name, img, (date)
      required: true,
    },
    isLeft: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  mounted() {},
  methods: {
    titleClass(isLeft) {
      if (isLeft) return 'left'
      return 'right'
    },
    outer(isLeft) {
      if (isLeft) return 'outerLeft'
      return 'outerRight'
    },
  },
}
</script>

<style scoped>
.half-side {
  position: relative;
  height: max(70vh, 370px);
}

.bigCard {
  width: 90%;
  height: 60vh;
  min-height: 350px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}

.smallCard {
  width: 80%;
  height: 18vh;
  min-height: 100px;
  margin: auto;
}

.outerLeft {
  background: var(--background-color);
}
.outerRight {
  background: var(--subtitle-color);
}

h1.left {
  color: var(--subtitle-color);
}
h1.right {
  color: var(--title-color);
}

button {
  color: var(--subtitle-color);
  background: white;
}
button.left {
  border-color: var(--subtitle-color);
}
button.right {
  border-color: var(--div-color-light);
}
button.left:hover {
  background-color: var(--subtitle-color);
  color: white;
}
button.right:hover {
  background-color: var(--div-color-light);
  color: black;
}
</style>
