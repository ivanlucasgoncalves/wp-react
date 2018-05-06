
const apiURL = "htbtsubts";

const WPReact = {
  
  fetchPages() {
    return fetch(WPReactSettings.URL.api + "/pages").then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse.map(page => ({
        id: page.id,
        title: page.title,
        content: page.content
      }));
    });
  },
  fetchPosts() {
    return fetch(WPReactSettings.URL.api + "/posts").then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featured_image_src: post.featured_image_src,
        author_name: post.author_name,
        published_date: post.published_date,
        content: post.content
      }));
    });
  }
  
};

export default WPReact;