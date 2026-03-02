import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API}/posts?page=${page}&search=${search}`,
      );
      const data = await res.data;
      setPosts(data.posts);
      setPages(data.pages);
    } catch (err) {
      alert("Error fetching posts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="container mt-4">
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchPosts}>
          Search
        </button>
      </div>

      {loading ? <p>Loading...</p> :
        posts.map(post => (
          <PostCard key={post._id} post={post} fetchPosts={fetchPosts} />
        ))
      }

      <div className="mt-3">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            className="btn btn-outline-primary me-2"
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;