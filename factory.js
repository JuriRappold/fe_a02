//import API from "./api_calls.js";

export default class Factory{
    static post(posti, user){//ignore useage atm
        return {
            post: {
                title: posti.title,
                id: posti.id,
                body: posti.body,
                tags: posti.tags,
                reaction: posti.reactions,
                user: user
            }
        }
    }
    static user(user){
        return {
            user: {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                address: `${user.address.address}, ${user.address.city} ${user.address.postalCode}, ${user.address.state} ${user.address.country}`,
                eyeColor: user.eyeColor,
            }
        }
    }
}