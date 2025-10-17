import API from "./api_calls.js"
import DomManipulation from "./dom.js";
import Factory from "./factory.js";
const byID = (id) => document.getElementById(id);
const clear = (el) => el.textContent="";
const createEl = (el) => document.createElement(el);
//const createFrag = () => document.createDocumentFragment();


const postContainer = byID("container")
const fetchPosts = byID("fetchPosts");

let postList = []
let userList = []
let commentsList = []
let skip = 0;

async function fetchPost(list=[], skip = 0){//this is taking waaay too long
    await API.fetchPosts(list, skip)//returns json in list
    for (let post of list) { //use for-in loop
        //fetch user Object
        const userObj = await API.fetchSpecificUser(post.post.user);
        //create postObj
        post.post.user=userObj.user.name;
        //console.log(post);
        //console.log(userObj);
    }
    return list;
}

document.addEventListener("DOMContentLoaded", async () => {
    window.onload = async () => {
        clear(postContainer);
        postList = [];
        skip = 0;
        await API.fetchPosts(postList, skip, userList);//returns post & user obj
        DomManipulation.renderPosts(postList, postContainer, skip)
        skip = 10;

    }

    postContainer.onclick = async (event) => {
        const spanUser = event.target.closest("span");
        if(!spanUser) return;
        const userID = Number(spanUser.innerText);
        const user = DomManipulation.modalHTML(await API.fetchSpecificUser(userID))
        const modal_cont = byID("modal_container");
        clear(modal_cont);
        modal_cont.appendChild(user);


    }

    fetchPosts.onclick = async () => {
        await API.fetchPosts(postList, skip);
        DomManipulation.renderPosts(postList, postContainer, skip);
        skip+=10;

    }

})