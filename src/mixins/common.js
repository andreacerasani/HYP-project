
export default {
    methods: {
        // You can insert methods here if they are used globally
        formatDate(date){
            const realDate = new Date(date)
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return realDate.toLocaleDateString("en-GB", options)
          }
    }
}