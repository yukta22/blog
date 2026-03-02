import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

interface FormData {
  title: string;
  content: string;
  tags: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    tags: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      setError("Title and Content are required.");
      return;
    }

    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          tags: form.tags
            ? form.tags.split(",").map((tag) => tag.trim())
            : []
        })
      });
      console.log("res",res)
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }

      // Clear form
      setForm({ title: "", content: "", tags: "" });

      // Redirect to home
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

 return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <div className="card shadow-lg p-4">
          <h3 className="mb-4 text-center">Create New Post</h3>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                className="form-control"
                rows={4}
                value={form.content}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                className="form-control"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default CreatePost;