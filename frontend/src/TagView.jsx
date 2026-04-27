import { useState } from "react";

function TagView({ node, setTree }) {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(node.name);

  const triggerUpdate = () => {
    setTree({ ...node });
  };

  const handleAddChild = () => {
    if (node.data) {
      node.children = [{ name: "New Child", data: "Data" }];
      delete node.data;
    } else {
      if (!node.children) {
        node.children = [];
      }
      node.children.push({ name: "New Child", data: "Data" });
    }

    triggerUpdate();
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "6px",
        marginTop: "10px"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? ">" : "v"}
        </button>

        {editing ? (
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                node.name = tempName;
                setEditing(false);
                triggerUpdate();
              }
            }}
            autoFocus
          />
        ) : (
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => setEditing(true)}
          >
            {node.name}
          </strong>
        )}
      </div>

      {/* Add Child */}
      <button
        onClick={handleAddChild}
        style={{
          marginTop: "8px",
          padding: "4px 8px",
          background: "#eee",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}
      >
        Add Child
      </button>

      {/* Content */}
      {!collapsed && (
        <>
          {node.data && (
            <div style={{ marginTop: "8px" }}>
              <input
                value={node.data}
                onChange={(e) => {
                  node.data = e.target.value;
                  triggerUpdate();
                }}
              />
            </div>
          )}

          {node.children &&
            node.children.map((child, index) => (
              <TagView
                key={index}
                node={child}
                setTree={triggerUpdate}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default TagView;