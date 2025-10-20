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
        postList=[];
        skip = 0;
        await API.fetchPosts(postList,skip);
        for (const element of postList){
            const user = await API.fetchSpecificUser(element.post.user);
            element.post.user = user
            //userList.push({user.username: user})
            await API.fetchPostComments(element.post.comments, element.post.id);
        }
        console.log(postList[0]);
        DomManipulation.renderPosts(postList, postContainer, skip);
        skip = 10;
    }


    postContainer.onclick = async (event) => {
        const spanUser = event.target.closest("span");

        //to check if it works:
        const counter =byID("counter");
        let num = Number(counter.innerText);
        num++;
        counter.innerText = num;

        //actual code:
        modal.classList.toggle("show");
        modal.innerText = `Hello There ${counter.innerText}`



    }

    fetchPosts.onclick = async () => {
        await API.fetchPosts(postList, skip);
        //await API.fetchPosts(postList,skip);
        for (const element of postList){
            element.post.user = await API.fetchSpecificUser(element.post.user);
            await API.fetchPostComments(element.post.comments, element.post.id);
        }
        DomManipulation.renderPosts(postList, postContainer, skip);
        skip+=10;

    }

})