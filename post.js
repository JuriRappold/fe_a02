import API from "./api_calls.js"
import DomManipulation from "./dom.js";
import Factory from "./factory.js";
const byID = (id) => document.getElementById(id);
const clear = (el) => el.textContent="";

// NEXT FETCH LOGIC
async function nextFetch(skip, list){
    await API.fetchPosts(list,skip)
    for (let index = skip; index<list.length; index++){
        const json = list[index];
        list[index] = Factory.post(json)
    }
}
async function nextUserComments(skip ,list, usrPostDict, commPostDict){
    const tempCommList = []
    for (let index = skip; index<list.length; index++){
        const user = await API.fetchSpecificUser(list[index].post.user)
        usrPostDict[user.user.username] = user;
        commPostDict[list[index].post.id] = await API.fetchPostComments(tempCommList, list[index].post.id)
        list[index].post.user = user;
        list[index].post.comments = commPostDict[list[index].post.id];
    }
}
async function nextCombine(skip,list, usrPostDict, commPostDict, container){
    await nextFetch(skip, list);
    await nextUserComments(skip, list, usrPostDict, commPostDict);
    DomManipulation.renderPosts(list, container, skip);
}


// global variables
const postContainer = byID("container")
const fetchPosts = byID("fetchPosts");
const modal = byID("modal");

let postList = []
let skip = 0;
let userPostDictionary = {};
let commentsPostDictionary = {}
document.addEventListener("DOMContentLoaded", async () => {
    window.onload = async () => {
        clear(postContainer);
        postList=[];
        skip = 0;
        await nextCombine(skip, postList, userPostDictionary, commentsPostDictionary, postContainer);
        skip = 10;
    }

    postContainer.onclick = async (event) => {
        const spanUser = event.target.closest("span");
        if(!spanUser) return;
        if(spanUser.className === "usrName"){
            clear(modal)
            const userName = spanUser.innerText;
            modal.appendChild(DomManipulation.modalHTML(userPostDictionary[userName]));

            modal.classList.add("show");
        }
    }

    modal.onclick = (event) => {
        const btn = event.target.closest("button");
        if(!btn)return;
        if(btn.innerText === "X"){
            modal.classList.remove("show");
            clear(modal)
        }
    }

    fetchPosts.onclick = async () => {
        await nextCombine(skip, postList, userPostDictionary, commentsPostDictionary, postContainer);
        console.log(postList)
        skip+=10;
    }
})