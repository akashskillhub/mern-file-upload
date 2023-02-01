import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
const MultiImage = () => {
    const [name, setName] = useState("kate")
    const [documents, setDocuments] = useState()
    const [users, setUsers] = useState([])

    const userInstance = axios.create({
        baseURL: "http://localhost:5000"
    })

    const handleSubmit = async e => {
        e.preventDefault()
        const fd = new FormData()
        fd.append("name", name)
        // for (let i = 0; i < documents.length; i++) {
        // fd.append("doc", documents[i])
        for (let d of documents) {
            fd.append("doc", d)
        }
        // Print FormData
        // for (const x of fd.entries()) {
        //     console.log(x)
        // }

        const { data } = await userInstance.post("/user/add-to-gallery", fd)
        console.log(data);

    }
    const getAllUsers = async e => {
        const { data: { result } } = await userInstance.get("/user/fetch")
        setUsers(result)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <>
        <pre>
            {JSON.stringify(documents, null, 2)}
        </pre>
        <form onSubmit={handleSubmit} >
            <div className="container mt-5">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='form-control'
                    placeholder='enter name' />
                <br />
                <input
                    type="file"
                    multiple
                    onChange={e => setDocuments(e.target.files)}
                    placeholder='Please Choose Docs'
                    className='form-control' />
                <br /><br />
                <button
                    type="submit"
                    class="btn btn-primary">
                    Add Docs
                </button>
            </div>
        </form>

        <div className='mt-5'>
            {
                users.map(item => <div class="card">
                    <div class="card-body">
                        <h1>{item.name}</h1>
                        {
                            item.docs.map(url => <img
                                src={`http://localhost:5000/${url}`}
                                height={100}
                                className="img-fluid"
                                alt="" />)
                        }
                    </div>
                </div>)
            }
        </div>
    </>
}

export default MultiImage