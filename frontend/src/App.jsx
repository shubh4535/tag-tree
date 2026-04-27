import { useState, useEffect } from "react";
import TagView from "./TagView";

function App() {
  const [tree, setTree] = useState({
    name: "root",
    children: []
  });

  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clean tree before sending
  const cleanTree = (node) => {
    const newNode = { name: node.name };

    if (node.data) {
      newNode.data = node.data;
    }

    if (node.children) {
      newNode.children = node.children.map(cleanTree);
    }

    return newNode;
  };

  // Fetch all trees
  const fetchTrees = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/trees");
      const data = await res.json();
      setTrees(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  // Save new tree (POST)
  const handleExport = async () => {
    const cleanedTree = cleanTree(tree);

    setLoading(true);
    try {
      await fetch("http://127.0.0.1:8000/trees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cleanedTree)
      });

      // reset tree after saving
      setTree({
        name: "root",
        children: []
      });

      await fetchTrees();
      alert("New tree saved!");
    } catch (err) {
      console.error(err);
      alert("Error saving tree");
    }
    setLoading(false);
  };

  // Update existing tree (PUT)
  const updateTreeOnServer = async (id, updatedTree) => {
    const cleanedTree = cleanTree(updatedTree);

    setLoading(true);
    try {
      await fetch(`http://127.0.0.1:8000/trees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cleanedTree)
      });

      await fetchTrees();
      alert("Tree updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating tree");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "10px" }}>Tag Tree App</h1>

      <button
        onClick={handleExport}
        style={{
          padding: "8px 12px",
          marginBottom: "15px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Export New Tree
      </button>

      {loading && <p>Loading...</p>}

      <h2>New Tree</h2>
      <TagView node={tree} setTree={setTree} />

      <h2 style={{ marginTop: "20px" }}>Saved Trees</h2>
      {trees.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        >
          <button
            onClick={() => updateTreeOnServer(item.id, item.tree)}
            style={{
              marginBottom: "10px",
              padding: "6px 10px",
              background: "#2196F3",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Update This Tree
          </button>

          <TagView
            node={item.tree}
            setTree={(updatedNode) => {
              const updated = trees.map((t) =>
                t.id === item.id ? { ...t, tree: updatedNode } : t
              );
              setTrees(updated);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;