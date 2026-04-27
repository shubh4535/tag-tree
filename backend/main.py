from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary in-memory DB
trees_db = []

# GET: fetch all trees
@app.get("/trees")
def get_trees():
    return [
        {"id": i, "tree": t}
        for i, t in enumerate(trees_db)
    ]

# POST: save new tree
@app.post("/trees")
def save_tree(tree: dict):
    trees_db.append(tree)
    return {"message": "Tree saved", "id": len(trees_db) - 1}

# PUT: update existing tree
@app.put("/trees/{tree_id}")
def update_tree(tree_id: int, tree: dict):
    if tree_id < len(trees_db):
        trees_db[tree_id] = tree
        return {"message": "Tree updated"}
    return {"error": "Tree not found"}