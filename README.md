# fe_a02
Assignment 02 for the Frontend Development course; html, css, and javascript

# Requirements

## General Requirements
1. Navigation Bar:
   - A responsive navigation bar at the top of all pages. 
   - Links to sections: Home, Posts, and Contact. 
   - Highlight the active section.
2. Home Page:
   - Briefly describe the application, its purpose, and instructions for users. 
   - Use semantic HTML to structure the content.
3. Posts Page:
   - Dynamically display posts fetched from the API. 
   - Include for each post: 
     - Title 
     - Body 
     - Username (Link the post's userId to the username via the users API). 
     - Tags 
     - Reaction Count  
   - Include comments attached to each post (fetched via the comments API). 
   - Add pagination or infinite scrolling for posts. 
   - Use asynchronous functions (async/await) for all API requests to ensure smooth data fetching. 
   - Organize the fetched data into JavaScript objects for efficient manipulation and reusability.
4. Contact Page:
   - Include a contact form with:
     - Name 
     - Email 
     - A checkbox for "Confirm to send."
     - A "Send" button (disabled until the checkbox is checked).  
   - Validate inputs:
     - Name must not contain numbers. 
     - Email must include "@" and ".". 
     - Checkbox must be checked for submission.
   - Provide appropriate error messages for invalid inputs. 
   - Style the form to include:
     - A clean and responsive layout. 
     - Proper spacing, padding, and alignment. 
     - Use flexbox or grid for the layout.
5. User Profiles:
   - Clicking on a username in a post opens a modal displaying the user's profile:
     - Name 
     - Email 
     - Address 
     - Additional profile details from the users API.
   - Store user data as JavaScript objects after fetching.
6. Error Handling and Feedback:
   - Display error messages for failed network requests. 
   - Show a message for empty states (e.g., "No comments available.").

## HTML Requirements
- Use semantic HTML tags throughout the application, including:
    - `<header>`,`<nav>`,`<main>`,`<section>`,`<article>`,`<aside>`,`<footer>`.
- Ensure proper nesting of tags to maintain clean and meaningful structure.
- All images must include descriptive`alt`text.
- Provide clear labels for form fields (e.g., use`<label>`for inputs).
