# What goes into the `API logic` folder?
- api fetch calls
  - apropiate error handling
  - classes & objs for incoming data?
    - Users
    - Posts
    - Comments
    - keyword `obj factories`

# What goes into the `DOM manipulation` folder?
- formatting of posts, comments and user objs
- pop-up user-profile
- `HTML factories?` --> functions to which you pass the for example, post-object, and it returns formatted HTML code
- 

# What goes into the `Event handling` folder?
- clicking on username pop-ups the user-profile

# Selecting specific attributes from dummyjson.com/...
`https://dummyjson.com/users?limit=5&select=id,eyeColor,firstName,email,address`<br>
returns:
```json

```

# Links
*general links limit=10*<br>
[Posts](https://dummyjson.com/posts?limit=10)<br>
[Comments](https://dummyjson.com/comments?limit=10)<br>
[Users](https://dummyjson.com/users?limit=10)<br>

# for-loop delay
```javascript
for (const element of postList){
    const user = await API.fetchSpecificUser(element.post.user);
    element.post.user = user
    //userList.push({user.username: user})
    await API.fetchPostComments(element.post.comments, element.post.id);
}
```
- The for-loop occupies the thread, therefore blocking the execution & rendering of posts
    