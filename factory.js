//import API from "./api_calls.js";

export default class Factory{
    static post(posti){
        //console.log(posti.reaction);
        return {
            post: {
                title: posti.title,
                id: posti.id,
                body: posti.body,
                tags: posti.tags,
                reaction: posti.reactions,
                user: posti.userId,
                comments: [],
            }
        }
    }

    static user(user){
        return {
            user: {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                username: user.username,
                email: user.email,
                address: user.address.address.city,//`${user.address.address}, ${user.address.city} ${user.address.postalCode}, ${user.address.state} ${user.address.country}`,
                eyeColor: user.eyeColor,
                modalText: `Username: ${user.username}\nEmail: ${user.email}\nAddress: ${user.address.city}\nEye Color: ${user.eyeColor}`,
            }
        }
    }

    static comment(comment){
        return {
            comment: {
                id: comment.id,
                postId: comment.postId,
                body: comment.body,
                likes: comment.likes,
                user: comment.user,
            }
        }
    }
}