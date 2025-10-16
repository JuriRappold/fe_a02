// createPost factory:
// <article class="post">
//     <h2>Title Post</h2>
//     <div class="body">
//         <img src="../assets/floatyLap.jpg" alt="Floaty Laptop" loading="lazy" class="post_img">
//     </div>
//     <p class="usr_name">Username</p>
//     <p class="tags"></p>
//     <div class="reaction_cnt"></div>
// </article>
import API from "./api_calls.js";
import DomManipulation from "./dom.js";

let skip = 0;

const API_Users = `https://dummyjson.com/users?limit=5&select=id,eyeColor,firstName,lastName,email,address`
const byID = (id) => document.getElementById(id);
const show = (el, ...things) => {
    el.textContent += things.map(t =>
        typeof t === 'string' ? t : JSON.stringify(t, null, 2)
    ).join(' ') + '\n';
};
const clear = (el) => el.textContent="";
const createEl = (el) => document.createElement(el);

function createPost(posti){
    // const tags = posti.tags.map(t => posti.tags[t]);
    // const likes = posti.reactions.likes;
    // const dislikes = posti.reactions.dislikes;
    return {
        post: {
            title: posti.title,
            id: posti.id,
            body: posti.body,
            tags: posti.tags,
            reaction: posti.reactions,
            userID: posti.userId,
        }
    }
}
function createPostHTML(post, name){
    //creating html elements & assigning classes
    const article = createEl("article");
    article.classList.toggle("post");//adds class "post" to article

    const usrName = createEl("span");
    usrName.classList.toggle("usrName");
    const title = createEl("h2");
    title.classList.toggle("postTitle")
    const body = createEl("p");
    body.classList.toggle("postBody");

    const div = createEl("div");
    div.classList.toggle("react_ID");
    const reaction = createEl("div");
    reaction.classList.toggle("reaction");
    const postId = createEl("div")
    postId.classList.toggle("postID");

    const comments = createEl("div")
    comments.classList.toggle("commentSection")
    comments.innerText = "COMMENTS COMING SOON!!!";

    //assigning value to html elements
    usrName.innerText = post.userID;//name;//to be switched w/ actual usrname
    title.innerText = post.title;
    body.innerText = post.body;
    reaction.innerText = `Likes: ${post.reaction["likes"]}; Dislikes: ${post.reaction["dislikes"]};`;
    postId.innerText = `post id: ${post.id}`;

    //putting it all together
    div.appendChild(reaction)
    div.appendChild(postId)

    article.appendChild(usrName);
    article.appendChild(title);
    article.appendChild(body);
    article.appendChild(div);
    article.appendChild(comments);

    return article;
}
async function fetch_posts(){
    const postList = []
    const API_posts = `https://dummyjson.com/posts?limit=10&skip=${skip}`;
    await fetch(API_posts)
            .then(response => {
                if (!response.ok){
                    throw new Error(`HTTP Error! Status: ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                //show(log, "fetched successfully\n");
                data.posts.forEach((post) => {
                    const p = createPost(post);
                    postList.push(p);
                });
                //console.log(data)
                //show(log, postList, "\nEnd")

            })
            .catch( error => {
                    show(log, `Fetch failed: ${error}`);
                })
    return postList
}
async function makePosts(){
    let postList = [];
    let userList = []
    postList = await fetch_posts();
    // for (const post of postList) {
    //     userList.push(await fetchSpecificUser(post.post.userID));
    // }
    //console.log(postList);
    const container = byID("container")
    const fragment = document.createDocumentFragment();

    postList.forEach(post => {
        fragment.appendChild(createPostHTML(post.post));//each element in postList has an id of post besides the index
    });
    container.appendChild(fragment);
    console.log(skip);
}

function createUser(user){
    return {
        user: {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            address: `${user.address.address}, ${user.address.city} ${user.address.postalCode}, ${user.address.state} ${user.address.country}`,
            eyeColor: user.eyeColor,
        }
    }
    // return {
    //     user
    // }
}

async function fetchSpecificUser(userId){
    let specUser = "";
    const specificURL = `https://dummyjson.com/users/${userId}?&select=id,eyeColor,firstName,lastName,email,address`;
    fetch(specificURL)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data =>{
            console.log("fetch succesful")
            specUser = createUser(data);
            console.log(data);
            console.log(specUser);
        })
        .catch( error => {
                console.log(`Fetch of specific User failed: ${error}`);
        })
    return specUser;

}

function createModal(userId){//later add usr object as parameter
    const modal = createEl("div");
    modal.classList.toggle("modal");
    const closeBtn = createEl("button");
    const header = createEl("h3");
    const body = createEl("p");

    closeBtn.innerText = "X";
    header.innerText = userId;
    body.innerText = "User information"

    modal.appendChild(closeBtn);
    modal.appendChild(header);
    modal.appendChild(body);

    return modal;
}

function cDiv(userList){
    userList = document.querySelectorAll(".usrName");
    userList.forEach((usr) => {
    usr.onclick = () =>{
        let temp = Number(byID("counter").innerText);
        temp+=1;
        byID("counter").innerText = temp;
        }
    })
}







document.addEventListener("DOMContentLoaded", async () => {
    window.onload = async () => {
        const posts = await API.fetchPosts();//no parameters needed on first fetch
        const fragment = document.createDocumentFragment();
        posts.forEach(post =>{
            fragment.appendChild(DomManipulation.postHTML(post.post))
            //console.log(post);
        })
        const container = byID("container")
        container.appendChild(fragment)

    }
    // let list = []
    // list = await API.fetchPosts(list, 1)
    // let user = await API.fetchSpecificUser(10);
    // console.log(user);
    // console.log(list);
    //temp logic, will see how temporary it is lol
    //
    // let userList = [];
    // window.onload = async () => {
    //     await makePosts();
    //     cDiv(userList);
    //     skip+=10;
    // }
    //
    // byID("fetchPosts").onclick = async () => {
    //     await makePosts();
    //     cDiv(userList);
    //     skip+=10;
    // }
    // //const usrNames = document.querySelectorAll(".usrName")//maybe .post .usrName?
    //
    //
    //
    //
    //

});
