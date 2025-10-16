export default class DomManipulation{
    static createEl(el){
        return document.createElement(el);
    }
    static postHTML(post){
        post = post.post;
        //creating html elements & assigning classes
        const article = this.createEl("article");
        article.classList.toggle("post");//adds class "post" to article

        const usrName = this.createEl("span");
        usrName.classList.toggle("usrName");
        const title = this.createEl("h2");
        title.classList.toggle("postTitle")
        const body = this.createEl("p");
        body.classList.toggle("postBody");

        const div = this.createEl("div");
        div.classList.toggle("react_ID");
        const reaction = this.createEl("div");
        reaction.classList.toggle("reaction");
        const postId = this.createEl("div")
        postId.classList.toggle("postID");

        const comments = this.createEl("div")
        comments.classList.toggle("commentSection")
        comments.innerText = "COMMENTS COMING SOON!!!";

        //assigning value to html elements
        usrName.innerText = post.user;//`${post.user.firstName} ${post.user.lastName}`//post.user;//name;//to be switched w/ actual usrname
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

    static modalHTML(user){//later add usr object as parameter
        user = user.user;
        const modally = this.createEl("div");
        modally.classList.toggle("modally");
        const header = this.createEl("h3");
        const body = this.createEl("p");

        header.innerText = user.name;
        body.innerText = `Email: ${user.email}\nAddress: ${user.address}\nEye Color: ${user.eyeColor}`

        modally.appendChild(header);
        modally.appendChild(body);

        return modally;
    }

    static renderPosts(list, container, skip){//direct DOM manipulation; no return
        const fragment = document.createDocumentFragment();
        const temp = [];
        for(let l = skip; l<list.length;l++){
            temp.push(list[l]);
        }
        temp.forEach(post => {
            fragment.appendChild(this.postHTML(post));
        })

        container.appendChild(fragment)

    }
}