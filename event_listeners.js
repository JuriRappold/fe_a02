import API from "./api_calls.js"
import DomManipulation from "./dom.js";
import Factory from "./factory.js";
const byID = (id) => document.getElementById(id);
const clear = (el) => el.textContent="";
const createEl = (el) => document.createElement(el);
//const createFrag = () => document.createDocumentFragment();


const postContainer = byID("container")
const fetchPosts = byID("fetchPosts");
const modal = byID("modal");

let postList = []
let userList = []
let commentsList = []
let skip = 0;
let userPostDictionary = {};
let commentsPostDictionary = {}

async function firstFetchAndRenderPosts(skip){
    await API.fetchPosts(postList,skip, userList, commentsList);//pushes json objects, userId, postId
        // for (const element of postList){
        //     const user = await API.fetchSpecificUser(element.post.user);
        //     element.post.user = user
        //     //userList.push({user.username: user})
        //     await API.fetchPostComments(element.post.comments, element.post.id);
        // }

        // console.log(postList)
        postList.forEach((item, i) => {
            postList[i] = Factory.post(item);
        })

        //await fetchUserAndComments(postList, userList, commentsList);
        DomManipulation.renderPosts(postList, postContainer, skip);
}
async function fetchUserAndComments(listPost = [], listUser = [], listComments = []){
    for (const element of listPost) {
        const user = await API.fetchSpecificUser(element.post.user);
        //console.log(user)
        //console.log(user);
        userPostDictionary[user.user.username] = user;
        //console.log()
        commentsPostDictionary[element.post.id] = await  API.fetchPostComments(listComments, element.post.id);
        element.post.user = userPostDictionary[user.user.username];
        element.post.comments = commentsPostDictionary[element.post.id];
    }
}
// function updatePostObj(listPost){
//     // let keys = userPostDictionary.getAllKeys()
//     // keys.forEach((element, i) => {
//     //     keys[i] = element[1];
//     // })
//     for (let element of listPost){
//         element.post.user = userPostDictionary[element.post.id];
//         element.post.comments = commentsPostDictionary[element.post.id];
//     }
//     // userPostDictionary.forEach(key =>{
//     //
//     // })
// }

async function totalFetch(){
    await firstFetchAndRenderPosts(skip);
    await fetchUserAndComments(postList, userList, commentsList);
    //updatePostObj(postList)
    clear(postContainer);
    DomManipulation.renderPosts(postList,postContainer,skip)
}


document.addEventListener("DOMContentLoaded", async () => {
    window.onload = async () => {
        clear(postContainer);
        postList=[];
        skip = 0;
        await totalFetch();
        skip = 10;
        // postList.forEach(element => {
        //     console.log(element.post.user.user.username)
        //     console.log(element.post.user);
        //
        // })
        //console.log(userPostDictionary)
    }


    postContainer.onclick = async (event) => {
        const spanUser = event.target.closest("span");
        if(!spanUser) return;
        if(spanUser.className === "usrName"){
            //to check if it works:
            const counter =byID("counter");
            let num = Number(counter.innerText);
            num++;
            counter.innerText = num;

            //actual code:
            const userName = spanUser.innerText;
            //console.log(userPostDictionary[userName])
            modal.appendChild(DomManipulation.modalHTML(userPostDictionary[userName]));

            modal.classList.toggle("show");
        }
    }


    fetchPosts.onclick = async () => {
        await totalFetch();
        skip+=10;

    }
    modal.onclick = (event) => {
        const btn = event.target.closest("button");
        if(!btn)return;
        if(btn.innerText === "X"){
            modal.classList.toggle("show");
        }
    }

})