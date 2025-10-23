import Factory from "./factory.js";
const BASE = "https://dummyjson.com/";

export default class API{
    // For posts:
    static async fetchPosts(list = [], skip = 0){
        if(Number.isInteger(skip) && skip >=0){
            const API_posts = `${BASE}posts?limit=10&skip=${encodeURIComponent(skip)}`;
            await fetch(API_posts)
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP Error! Status: ${response.status}`)
                    }
                    return response.json();
                })
                .then(async (data) => {
                    data.posts.forEach(element =>{
                        list.push(element);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }
        return list;
    }

    //call to get specific User
    static async fetchSpecificUser(userId){
        let usr = "";
        if(userId){
            const API_usr = `${BASE}users/${encodeURIComponent(userId)}?&select=username,firstName,lastName,email,address,eyeColor`;
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
                .catch(err => {
                    console.error(err);
                })
        }
        return usr;
    }

    //call to fetch comments of a post
    static async fetchPostComments(list = [], postId){
        const postComments = []
        const API_comments = `${BASE}posts/${encodeURIComponent(postId)}/comments`;
        await fetch(API_comments)
            .then(response => {
                if(!response.ok){
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                data.comments.forEach(element => {
                    const factEl = Factory.comment(element)
                    postComments.push(factEl);
                    list.push(factEl);
                })
            })
            .catch(err => {
                console.error(err);
            });
        return postComments;
    }

}
