class Post {
    constructor(content, categories = []) {
        if(content === undefined || content === "") {
            throw new Error("Missing content in post");
        }

        this.content = content;
        this.categories = categories;
    }
}