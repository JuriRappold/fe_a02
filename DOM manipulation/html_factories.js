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
const API_posts = `https://dummyjson.com/posts?limit=10`;
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
function createPostHTML(post){
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
    usrName.innerText = post.userID;//to be switched w/ actual usrname
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

function fetchSpecificUser(userId){
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
            //console.log(data);
            console.log(specUser);
            return specUser
        })
        .catch( error => {
                console.log(`Fetch of specific User failed: ${error}`);
        })


}


document.addEventListener("DOMContentLoaded", () => {
    //temp logic, will see how temporary it is lol
    const postList = [];
    const userList = [];
    byID("fetchPosts").onclick = async () => {
    const log = byID("cunt");
    clear(log);

    fetch(API_posts)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            show(log, "fetched successfully\n");
            data.posts.forEach((post) => {
                const p = createPost(post);
                postList.push(p);
            });

            const container = byID("container")
            const fragment = document.createDocumentFragment();

            postList.forEach(post => {
                fragment.appendChild(createPostHTML(post.post));//each element in postList has an id of post besides the index
            });

            container.appendChild(fragment);
            //show(log, postList, "\nEnd")
        })
        .catch( error => {
                show(log, `Fetch failed: ${error}`);
            })
}

    byID("testing").onclick = async () => {
        const testing = byID("testing_pre");
        fetch(API_Users)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            show(testing, "fetched successfully\n");
            data.users.forEach((user) => {
                const u = createUser(user);
                console.log(u)
                userList.push(u);
            });
            show(testing, userList, "\nEnd")
            show(testing,"Specific User:\n",fetchSpecificUser(10));

        })
        .catch( error => {
                show(testing, `Fetch failed: ${error}`);
            })

    }
});
