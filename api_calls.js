import Factory from "./factory.js";
const BASE = "https://dummyjson.com/";

export default class API{
    // For posts:
    //call to get posts
    //don't need skip parameter anymore, but if I want to, I can specify
    static async fetchPosts(list = [], skip = 0, userIdList=[], postIdList = []){
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
                    // for (const element of data.posts) {
                    //     let postElement = Factory.post(element)
                    //     let userPost = await this.fetchSpecificUser(element.userId)
                    //     userIdList.push(userPost);
                    //     postElement.post.user = userPost
                    //     list.push(postElement);//element obj
                    // }
                    data.posts.forEach(element =>{
                        list.push(element);//Factory.post(element)
                        //userIdList.push(element.userId);
                        //postIdList.push(element.id);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }
        //console.log(list);
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
                    //console.log(data)
                    //console.log(data)
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
                // for (const element in data.comments){
                //     list.push(Factory.comment(element));
                // }
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
