<template>
  <div class="container-xl">
    <div class="px-4 py-2 align-items-center rounded-3 my-border">
      <h3 class="align-center">More information</h3>
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <div v-if="hourOpening != '00:00:00' && hourClosing != '24:00:00'">
          <b>Opening hours:</b>
          <p class="lead">
            {{ hourOpening.substring(0, 5) }} -
            {{ hourClosing.substring(0, 5) }}
          </p>
        </div>
        <div v-if="ticket !== 9999">
          <b>Ticket:</b>
          <p class="lead">{{ ticket.toFixed(2) }} €</p>
        </div>
        <div
          v-if="
            phoneLandline !== 'none' &&
            phoneMobile !== 'none' &&
            email !== 'none'
          "
        >
          <b>Contacts:</b>
          <p class="lead">
            <span v-if="phoneLandline !== 'none'">
              <img
                src="/images/icons/phone_icon.png"
                class="icon-img-personalize"
              />
              landline phone: &emsp; &nbsp;
              <a :href="'tel:' + phoneLandline">+39 {{ phoneLandline }}</a>
              <br />
            </span>
            <span v-if="phoneMobile !== 'none'">
              <img
                src="/images/icons/phone_icon.png"
                class="icon-img-personalize"
              />
              mobile phone: &emsp;&emsp;
              <a :href="'tel:' + phoneMobile">+39 {{ phoneMobile }}</a> <br />
            </span>
            <span v-if="email !== 'none'">
              <img
                src="/images/icons/email_icon.png"
                class="icon-img-personalize"
              />
              mail: &emsp; &emsp; &emsp; &emsp; &emsp;
              <a :href="'mailto:' + email">{{ email }}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsComponent',
  props: {
    hourOpening: {
      type: String,
      default: 'none',
      required: false,
    },
    hourClosing: {
      type: String,
      default: 'none',
      required: false,
    },
    ticket: {
      type: Number,
      default: 9999,
      required: false,
    },
    phoneLandline: {
      type: String,
      default: 'none',
      required: false,
    },
    phoneMobile: {
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
}
</script>

<style scoped>
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
  height: 2vw;
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
