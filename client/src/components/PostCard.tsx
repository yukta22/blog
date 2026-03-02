import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface Props {
  post: any;
  fetchPosts: () => void;
}

const PostCard = ({ post, fetchPosts }: Props) => {
  const token = localStorage.getItem("token");

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(`${API}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchPosts();
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Failed to delete post"
      );
    }
  };

  return (
    <div className="card mb-3 shadow">
      <div className="card-body">
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <small>By {post.username}</small>
        <div>
          {post.tags?.map((tag: any, i: any) => (
            <span key={i} className="badge bg-secondary me-2">{tag}</span>
          ))}
        </div>
        {token && (
          <button className="btn btn-danger btn-sm mt-2" onClick={deletePost}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;