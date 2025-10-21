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

async function fetchAndRenderPosts(skip){
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
        console.log(postList[i]);
    })

        //await fetchUserAndComments(postList, userList, commentsList);
        DomManipulation.renderPosts(postList, postContainer, skip);
}
async function fetchUserAndComments(listPost = [], listUser = [], listComments = []){
    console.log(listPost);
    for (const element of listPost) {
        console.log(`Element.post.user: ${element.post.user}`);
        const user = await API.fetchSpecificUser(element.post.user);
        //console.log(user);
        userPostDictionary[user.user.username] = user;
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
    await fetchAndRenderPosts(skip);
    await fetchUserAndComments(postList, userList, commentsList);
    //updatePostObj(postList)
    clear(postContainer);
    DomManipulation.renderPosts(postList,postContainer,skip)
}

async function nextFetch(skip, list){
    await API.fetchPosts(list,skip)
    for (let index = skip; index<list.length; index++){
        const json = list[index];
        list[index] = Factory.post(json)
    }
    //DomManipulation.renderPosts(list, postContainer, skip);
}
async function nextUserComments(skip ,list){
    const tempCommList = []
    for (let index = skip; index<list.length; index++){
        const user = await API.fetchSpecificUser(list[index].post.user)
        userPostDictionary[user.user.username] = user;
        commentsPostDictionary[list[index].post.id] = await API.fetchPostComments(tempCommList, list[index].post.id)
        list[index].post.user = user;
        list[index].post.comments = commentsPostDictionary[list[index].post.id];
    }
    //DomManipulation.renderPosts(list, postContainer, skip);
}
async function nextCombine(skip,list){
    await nextFetch(skip, list);
    await nextUserComments(skip, list);
    //clear(postContainer);
    DomManipulation.renderPosts(list, postContainer, skip);
}


document.addEventListener("DOMContentLoaded", async () => {
    window.onload = async () => {
        clear(postContainer);
        postList=[];
        skip = 0;
        await totalFetch();
        skip = 10;
    }

    postContainer.onclick = async (event) => {
        const spanUser = event.target.closest("span");
        if(!spanUser) return;
        if(spanUser.className === "usrName"){
            //to check if it works:
            // const counter =byID("counter");
            // let num = Number(counter.innerText);
            // num++;
            // counter.innerText = num;

            //actual code:
            clear(modal)
            const userName = spanUser.innerText;
            //console.log(userPostDictionary[userName])
            modal.appendChild(DomManipulation.modalHTML(userPostDictionary[userName]));

            modal.classList.toggle("show");
        }
    }

    modal.onclick = (event) => {
        const btn = event.target.closest("button");
        if(!btn)return;
        if(btn.innerText === "X"){
            modal.classList.toggle("show");
            clear(modal)
        }
    }

    fetchPosts.onclick = async () => {
        // await nextFetch(skip, postList);
        // await nextUserComments(skip, postList);
        await nextCombine(skip, postList);
        console.log(postList)
        skip+=10;
    }


})