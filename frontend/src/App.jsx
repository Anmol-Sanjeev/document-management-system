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
    await axios.put(`${API}/documents/${id}`, {
      status: status
    })
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

  const statuses = ["Draft", "Review", "Approved", "Archived"]

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

      <h2>Workflow Board</h2>

      <div className="board">

        {statuses.map(status => (

          <div className="column" key={status}>

            <h3>{status}</h3>

            {filteredDocuments
              .filter(doc => doc.status === status)
              .map(doc => (

                <div key={doc._id} className="card">

                  <h4>{doc.title}</h4>
                  <p>{doc.description}</p>

                  <div className="actions">

                    {status !== "Draft" &&
                      <button onClick={()=>updateStatus(doc._id,"Draft")}>
                        Move to Draft
                      </button>
                    }

                    {status !== "Review" &&
                      <button onClick={()=>updateStatus(doc._id,"Review")}>
                        Move to Review
                      </button>
                    }

                    {status !== "Approved" &&
                      <button onClick={()=>updateStatus(doc._id,"Approved")}>
                        Approve
                      </button>
                    }

                    {status !== "Archived" &&
                      <button onClick={()=>updateStatus(doc._id,"Archived")}>
                        Archive
                      </button>
                    }

                    <button onClick={()=>deleteDocument(doc._id)}>
                      Delete
                    </button>

                  </div>

                </div>

              ))}

          </div>

        ))}

      </div>

    </div>
  )
}

export default App