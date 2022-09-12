<!-- Page to show the contact of Venice tourism office -->
<template>
  <div>
    <top-image :title="'Contact Us'" :bg-img="bgImg" />
    <breadcrumbs page-name="Contact Us" link="contact us"/>
    <simple-content text-align="left" :title="'Vela Spa'" :description="description" />
    <br>
    <div class="container-md">
      <contacts
        :title="'How to reach us'"
        :email="email"
        :closing-hour="closingHour"
        :landline-phone="phone"
        :opening-hour="openingHour"
      />
    </div>
  </div>
</template>

<script>
import TopImage from '~/components/informative/TopImage.vue'
import SimpleContent from '~/components/text-elements/SimpleContent.vue'
import Contacts from '~/components/contacts/Contacts.vue'
import Breadcrumbs from '~/components/navigation/Breadcrumbs.vue'
export default {
  name: 'ContactPage',
  components: {
    TopImage,
    SimpleContent,
    Contacts,
    Breadcrumbs,
  },
  data() {
    const bgImg = 'images/city-hall.jpg'
    const email = 'info@veneziaunica.it'
    const phone = '041 2424'
    const openingHour = '07:30'
    const closingHour = '19:00'
    const description = 'Vela Spa is the company responsible for tourist information of the town of Venice since February 1st 2016. Feel free to contact us for further information.'
    return {
      bgImg,
      email,
      phone,
      openingHour,
      closingHour,
      description
    }
  },
  head() {
    return {
      title: "Contact Us - VisitVenice",
      meta:[
        {
          hid: 'description',
          name: 'description',
          content: "Contacts of the company responsible for tourist information of the town of Venice"
        }
      ]
    }
  },
}
</script>
