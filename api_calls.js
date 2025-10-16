import Factory from "./factory.js";
export default class API{
    // For posts:
    //call to get posts
    //don't need skip parameter anymore, but if I want to, I can specify
    static async fetchPosts(list = [], skip = 0){
        if(Number.isInteger(skip) && skip >=0){
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
                        list.push(Factory.post(post));//
                    });
                })
        }
        //console.log(list);
        return list;
    }

    //call to get specific User
    static async fetchSpecificUser(userId){
        let usr = "";
        if(userId){
            const API_usr = `https://dummyjson.com/users/${encodeURIComponent(userId)}?&select=firstName,lastName,email,address`;
            await fetch(API_usr)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP Error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data =>{
                    usr = Factory.user(data);
                })
        }
        return usr;
    }

}
