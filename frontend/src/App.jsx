import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

const API = "https://document-management-system-jyg5.onrender.com"

function App() {

  const [documents, setDocuments] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const fetchDocuments = async () => {
    const res = await axios.get(`${API}/documents`)
    setDocuments(res.data)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const addDocument = async () => {
    await axios.post(`${API}/documents/add`, {
      title,
      description,
      status: "Draft"
    })

    setTitle("")
    setDescription("")
    fetchDocuments()
  }

  const deleteDocument = async (id) => {
    await axios.delete(`${API}/documents/${id}`)
    fetchDocuments()
  }

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/documents/${id}`, { status })
    fetchDocuments()
  }

  const filteredDocuments = documents.filter(doc => {

    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" || doc.status === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="container">

      <h1>Document Management System</h1>

      <h2>Add Document</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button onClick={addDocument}>Add</button>

      <h2>Dashboard</h2>

      <div style={{display:"flex", gap:"20px"}}>

        <div className="card">
          Total: {documents.length}
        </div>

        <div className="card">
          Draft: {documents.filter(d => d.status==="Draft").length}
        </div>

        <div className="card">
          Review: {documents.filter(d => d.status==="Review").length}
        </div>

        <div className="card">
          Approved: {documents.filter(d => d.status==="Approved").length}
        </div>

      </div>

      <h2>Search</h2>

      <input
        placeholder="Search documents..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <h2>Filter</h2>

      <select
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Draft">Draft</option>
        <option value="Review">Review</option>
        <option value="Approved">Approved</option>
        <option value="Archived">Archived</option>
      </select>

      <h2>Documents</h2>

      {filteredDocuments.map(doc => (

        <div key={doc._id} className="card">

          <h3>{doc.title}</h3>
          <p>{doc.description}</p>

          <p>Status:</p>

          <select
            value={doc.status}
            onChange={(e)=>updateStatus(doc._id, e.target.value)}
          >
            <option>Draft</option>
            <option>Review</option>
            <option>Approved</option>
            <option>Archived</option>
          </select>

          <br/>

          <button onClick={()=>deleteDocument(doc._id)}>
            Delete
          </button>

        </div>

      ))}

    </div>
  )
}

export default App