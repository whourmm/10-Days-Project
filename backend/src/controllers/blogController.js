const supabase = require("../config/db");

// Get all blogs
// /api/blogs
async function getBlogs(req, res) {
  try {
    let { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')

    if (error) throw error;

    res.json(blogs)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

// Get a single blog
// /api/blogs/:id
async function getBlog(req, res) {
  try {
    let { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', req.params.id)

    if (error) throw error;

    res.json(blog)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
}

// Create a blog
// /api/blogs
async function createBlog(req, res) {
  try {
    const { title, content, tags, image } = req.body;
    
    // Validate fields
    if (!title || !tags || tags.length === 0 || tags.length > 3) {
      return res.status(400).json({ error: "Please provide all required fields and ensure tags are between 1-3." });
    }

    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    //console.log("Extracted Token:", token); // Debugging log

    // Validate session with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    //console.log("User ID:", user.id); // Debugging log

    // Fetch user details
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("username")
      .eq("id", user.id)
      .single();

    console.log("User Error:", userError); // Debugging log
    console.log("User Data:", userData); // Debugging log

    if (userError || !userData) {
      return res.status(404).json({ error: "User not found" });
    }

    let imageUrl = null;
    if (image) {
      // Convert base64 to buffer (if image is sent as base64)
      const buffer = Buffer.from(image.split(",")[1], "base64");

      // Upload image to Supabase Storage
      const filePath = `blogs/${user.id}-${Date.now()}.jpg`; // Unique filename
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("blog-images") // Your storage bucket name
        .upload(filePath, buffer, {
          contentType: "image/jpg",
        });

      if (uploadError) {
        return res.status(500).json({ error: "Image upload failed", details: uploadError.message });
      }

      // Get public URL of uploaded image
      // imageUrl = supabase.storage.from("blog-images").getPublicUrl(filePath).data.publicUrl;

      if(uploadData) {
        const { data: url_data, error: url_error } = supabase.storage.from("blog-images").getPublicUrl(uploadData.path);
        
        if (url_error) {
          console.storage_error('Error getting public URL:', url_error.message);
        } else {
          imageUrl = url_data.publicUrl;
          //console.log('Public URL:', imageUrl);
        }
      }

    }

    // Insert blog with image URL
    let { data: blog, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          content,
          user_id: user.id,
          author: userData.username,
          tags,
          image_url: imageUrl, // Store public image URL
        }
      ])
      .select();

    if (error) throw error;

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

// Update a blog
// /api/blogs/:id
async function updateBlog(req, res) {
  try {
    const { title, content, tags, image } = req.body;

    // Validate fields
    if (!title || !content || !tags || tags.length === 0 || tags.length > 3) {
      return res.status(400).json({ error: "Please provide all required fields and ensure tags are between 1-3." });
    }

    // Get user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.headers.authorization);
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user details
    let { data: userData, error: userError } = await supabase
      .from("users")
      .select("name")
      .eq("id", user.id)
      .single();
    if (userError || !userData) {
      return res.status(404).json({ error: "User not found" });
    }

    let imageUrl = null;
    if (image) {
      // Convert base64 to buffer (if image is sent as base64)
      const buffer = Buffer.from(image.split(",")[1], "base64");

      // Upload image to Supabase Storage
      const filePath = `blogs/${user.id}-${Date.now()}.png`; // Unique filename
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from("blog-images") // Your storage bucket name
        .upload(filePath, buffer, {
          contentType: "image/png",
        });

      if (uploadError) {
        return res.status(500).json({ error: "Image upload failed", details: uploadError.message });
      }

      // Get public URL of uploaded image
      imageUrl = supabase.storage.from("blog-images").getPublicUrl(filePath).data.publicUrl;
    }

    // Insert blog with image URL
    let { data: blog, error } = await supabase
      .from("blogs")
      .update([
        {
          title,
          content,
          user_id: user.id,
          author: userData.name,
          tags,
          image: imageUrl, // Store public image URL
        }
      ])
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

// Delete a blog
// /api/blogs/:id
async function deleteBlog(req, res) {
  try {
    // Get user session
    const { data: {user}, error: authError } = await supabase.auth.getUser(req.headers.authorization);
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { error } = await supabase 
      .from("blogs")
      .delete()
      .eq("id", req.params.id);

      if(error) throw error;

      return res.status(204).json({ message: "Blog deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};