import Factory from "./factory.js";
export default class API{
    // For posts:

    //call to get posts
    async fetchPosts(list = [], skip){
        if(skip){
            const API_posts = `https://dummyjson.com/posts?limit=10&skip=${encodeURIComponent(skip)}`;
            await fetch(API_posts)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP Error! Status: ${response.status}`)
                    }
                    return response.json();
                })
                .then(data => {
                    data.posts.forEach(post=>{
                        list.push(Factory.post(post));
                    });
                })
        }
    }

    //call to get specific User

    static async fetchSpecificUser(userId){
        if(userId){
            const API_usr = `https://dummyjson.com/users/${encodeURIComponent(userId)}?&select=firstName,lastName,email,address`;
            await fetch(API_usr)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP Error! Status: ${response.status}`);
                    }
                    return response.json
                })
                .then(data =>{
                    console.log(data);
                    console.log(Factory.user(data.id));
                })
        }
    }

}
