
export default {
    methods: {
        // You can insert methods here if they are used globally
        formatDate(date){
            const realDate = new Date(date)
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return realDate.toLocaleDateString("en-GB", options)
          },
        removePath(image){
            const imageName = image.substring(image.lastIndexOf("/") + 1, image.lastIndexOf("."));
            return imageName;
        },
        retriveGroupLinks(){
            const linksJson = sessionStorage.getItem('groupLinks')

            let groupLinks = []
            if (linksJson == null || linksJson === 'undefined') {
              groupLinks = [
                { type: 'services', links: [] },
                { type: 'events', links: [] },
                { type: 'pois', links: [] },
                { type: 'itineraries', links: [] },
                { type: 'event-type', links: [] },
              ]
            } else {
              groupLinks = JSON.parse(linksJson)
            }
            return groupLinks
        }
    },
}