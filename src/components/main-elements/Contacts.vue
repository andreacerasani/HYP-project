<!-- Component that show a box with contact info -->
<template>
  <div class="container-xl">
    <div class="px-4 py-2 align-items-center rounded-3 my-border">
      <br />
      <h3 class="align-center">{{title}}</h3>
      <div class="col-lg-9 p-3 p-lg-5 pt-lg-3">
        <div v-if="date !== null">
          <b>Date:</b>
          <p class="lead">
            {{ formatDate(date) }}
          </p>
        </div>
        <div v-if="openingHour != 'none' && !(openingHour == '00:00:00' && (closingHour == '24:00:00' || closingHour == '00:00:00'))">
          <b>Opening hours:</b>
          <p class="lead">
            {{ openingHour.substring(0, 5) }} -
            {{ closingHour.substring(0, 5) }}
          </p>
        </div>
        <div v-if="ticket !== 9999">
          <b>Ticket:</b>
          <br />
          <p v-if="ticket > 0" class="lead">{{ ticket.toFixed(2) }} €</p>
          <p v-else>Free</p>
        </div>
        <div
          v-if="
            landlinePhone !== 'none' ||
            mobilePhone !== 'none' ||
            email !== 'none'
          "
        >
          <hr />
          <b>Contacts:</b>

          <p class="lead">
            <br />
            <span v-if="landlinePhone !== 'none'">
              <img
                src="/images/icons/phone_icon.png"
                class="icon-img-personalize"
                alt="landline Phone Icon"
              />
              &nbsp; landline phone: &emsp; &nbsp;
              <br class="hidden-ss" />
              <a :href="'tel:' + landlinePhone">+39 {{ landlinePhone }}</a>
              <br />
              <br class="hidden-ss" />
            </span>
            <span v-if="mobilePhone !== 'none'">
              <img
                src="/images/icons/phone_icon.png"
                class="icon-img-personalize"
                alt="Mobile Phone Icon"
              />
              &nbsp; mobile phone: &emsp;&emsp;
              <br class="hidden-ss" />
              <a :href="'tel:' + mobilePhone">+39 {{ mobilePhone }}</a> <br />
              <br class="hidden-ss" />
            </span>
            <span v-if="email !== 'none'">
              <img
                src="/images/icons/email_icon.png"
                class="icon-img-personalize"
                alt="Email Icon"
              />
              &nbsp; mail: &emsp; &emsp; &emsp; &emsp; &emsp;
              <br class="hidden-ss" />
              <a :href="'mailto:' + email">{{ email }}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '~/mixins/common.js'

export default {
  name: 'ContactsComponent',
  mixins: [common] ,
  props: {
    title:{
      type: String,
      default: 'More information',
      required: false,
    },
    date: {
        type: String,
      default: null,
      required: false,
    },
    openingHour: {
      type: String,
      default: 'none',
      required: false,
    },
    closingHour: {
      type: String,
      default: 'none',
      required: false,
    },
    ticket: {
      type: Number,
      default: 9999,
      required: false,
    },
    landlinePhone: {
      type: String,
      default: 'none',
      required: false,
    },
    mobilePhone: {
      type: String,
      default: 'none',
      required: false,
    },
    email: {
      type: String,
      default: 'none',
      required: false,
    },
  },
  methods: {
    
  }
}
</script>

<style scoped>
@media (min-width: 460px) {
  .hidden-ss {
    display: none !important;
  }
}
a:hover {
  color: var(--link-color);
}
a {
  color: var(--subtitle-color);
}
b {
  color: var(--subtitle-color);
  border-left: 6px solid var(--subtitle-color);
  padding-left: 1vw;
}
.icon-img-personalize {
  width: 2vw;
  min-width: 20px;
  height: 2vw;
  min-height: 20px;
}
.my-border {
  border-style: solid;
  border-color: var(--div-color-light);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
h3 {
  text-align: center;
  color: var(--subtitle-color);
}
</style>
