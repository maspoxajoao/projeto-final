const getPosts = async() => {
    const apiLogin = await fetch("http://localhost:3000/posts");
    const posts = await apiLogin.json()
    console.log(posts)
}

