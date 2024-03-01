//Reference Posts as main wrapper for entire section
const posts = document.getElementById("posts");
//Clear items before fetching posts
const postArray = "";

//Fetch posts from API
const fetchPosts = async () => {
  const settledResponse = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const postArray = await settledResponse.json();
  const postList = document.getElementById(`posts`);
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => filterSearch(postArray));

  for (let post of postArray) {
    //create container for each post
    const postContainer = document.createElement("Div");
    postContainer.classList.add("post-container");
    // Create list within post & class it
    const item = document.createElement("li");
    item.classList.add("post");
    // Create div for title for post & class it & append it
    const title = document.createElement("div");
    title.textContent = `Title: ${post.title}`;
    title.classList.add("post-title");
    item.appendChild(title);
    // Create div for body & class it & append it
    const body = document.createElement("div");
    body.textContent = `Body: ` + post.body;
    body.classList.add("post-body");
    item.appendChild(body);
    // Create button to view comments & append it
    const viewComments = document.createElement("button");
    viewComments.textContent = "View comments";
    viewComments.classList.add("button");
    viewComments.addEventListener("click", async () => {
      const comments = await fetchComments(post.id);
      displayComments(commentsWrapper, comments);
    });
    item.appendChild(viewComments);
    // Create comments wrapper & class it & append it
    const commentsWrapper = document.createElement("div");
    commentsWrapper.classList.add("comments-wrapper");
    item.appendChild(commentsWrapper);
    postContainer.appendChild(item);
    postList.appendChild(postContainer);
  }
};

// Exercise 3D: Search todos based on the input
const filterSearch = (obj) => {
  // obtain searchInput's value (.value) converted to lowercase (.toLowerCase()) assigned to searchValue
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.toLowerCase();
  // .filter = iterator
  const filteredPosts = obj.filter((post) => {
    // check todo's title in lowercase includes searchValue
    return post.title.toLowerCase().includes(searchValue);
  });
  // call displayTodos and pass in filteredTodos
  const postList = document.getElementById(`posts`);
  postList.innerHTML = "";
  for (let post of filteredPosts) {
    //create container for each post
    const postContainer = document.createElement("Div");
    postContainer.classList.add("post-container");
    // Create list within post & class it
    const item = document.createElement("li");
    item.classList.add("post");
    // Create div for title for post & class it & append it
    const title = document.createElement("div");
    title.textContent = `Title: ${post.title}`;
    title.classList.add("post-title");
    item.appendChild(title);
    // Create div for body & class it & append it
    const body = document.createElement("div");
    body.textContent = `Body: ` + post.body;
    body.classList.add("post-body");
    item.appendChild(body);
    // Create button to view comments & append it
    const viewComments = document.createElement("button");
    viewComments.textContent = "View comments";
    viewComments.classList.add("button");
    viewComments.addEventListener("click", async () => {
      const comments = await fetchComments(post.id);
      displayComments(commentsWrapper, comments);
    });
    item.appendChild(viewComments);
    // Create comments wrapper & class it & append it
    const commentsWrapper = document.createElement("div");
    commentsWrapper.classList.add("comments-wrapper");
    item.appendChild(commentsWrapper);
    postContainer.appendChild(item);
    postList.appendChild(postContainer);
  }
};
fetchPosts();

const fetchComments = async (postId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const json = await res.json();
  console.log(json);
  return json;
};

//attempting to view comments here//

const displayComments = (commentsWrapper, comments) => {
  commentsWrapper.innerHTML = "";
  const commentsList = document.createElement("ul");
  commentsList.classList.add("comment-list");
  for (let comment of comments) {
    // Create a container for each comment
    const commentItem = document.createElement("li");
    commentItem.classList.add("comment-individual");
    const commentText = document.createElement("div");
    commentText.textContent = comment.body;
    commentText.classList.add("comment-text");
    commentItem.appendChild(commentText);
    commentsList.appendChild(commentItem);
  }
  commentsWrapper.appendChild(commentsList);
};
