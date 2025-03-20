//10-Days-Project\backend\src\controllers\commentController.js
const supabase = require('../config/db.js');
const Comment = require('../models/commentModel.js');

const createComment = async (req, res) => {
    const { content } = req.body;
    const { blog_id } = req.params;
  
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Validate session with Supabase
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const { data: comment, error, status } = await supabase
            .from('comment')
            .insert([
                { 
                    content: content,
                    blog_id: blog_id, 
                    user_id: user.id,
                    author: user.username,
                }
            ])
            .select()
            .single(); // Get the inserted comment
  
          // Check if an error occurred during the insert
          if (error) {
              console.error('Supabase Error:', error);
              return res.status(500).json({
                  message: 'Error inserting comment',
                  details: error.message || error.details || 'Unknown error',
                  status: status,
              });
          }
  
        return res.status(201).json(comment);
      } catch (error) {
          console.error('Unexpected Error:', error);
          return res.status(500).json({
              message: 'Internal server error',
              details: error.message,
          });
      }
  };

const getCommentsByBlogId = async (req, res) => {
    const { blog_id } = req.params;

    try {
        const { data, error } = await supabase
            .from('comment')
            .select('*')
            .eq('blog_id', blog_id)
            .order('created_at', { ascending: true });

        if (error) throw error;

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteComment = async (req, res) => {
    const { comment_id } = req.params;

    try {
        const { data, error } = await supabase
            .from('comment')
            .delete()
            .eq('id', comment_id)
            .single();

        if (error) throw error;

        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createComment, getCommentsByBlogId, deleteComment };