//10-Days-Project\backend\src\models\commentModel.js
class Comment {
      constructor(id, content, created_at, blog_id, user_id) {
          this.id = id;
          this.content = content;
          this.created_at = created_at;
          this.blog_id = blog_id;
          this.user_id = user_id;
      }
  }
  
  module.exports = Comment;