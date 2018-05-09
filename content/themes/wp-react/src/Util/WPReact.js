
const WPReact = {
  
  fetchPages(){
    let url = window.location.href.split('/');
    let slug = url.pop();
    
    return fetch(WPReactSettings.URL.api + "/pages?slug=" + slug).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse;
    });
  },
  fetchPosts(){
    return fetch(WPReactSettings.URL.api + "/posts").then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse;
    });
  },
  fetchSingle(){
    let url = window.location.href.split('/');
    let slug = url.pop();
    
    return fetch(WPReactSettings.URL.api + "/posts?slug=" + slug + "&_embed").then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse[0];
    });
  }
  
};

export default WPReact;