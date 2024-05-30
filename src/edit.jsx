import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findIndex } from './utitlity/arrayindex';
import { useNavigate,useParams } from 'react-router-dom';

function Edit({data,setData}) {
    let [name,setName] = useState("")
    let [text,setText] = useState("")
    let [completed,setCompleted] = useState("")
    let {id} = useParams()
    let navigate = useNavigate()
    const getData = (id)=>{
        let index = findIndex(data,Number(id))
        if(index!==-1)
        {
            setName(data[index].name)
            setText(data[index].text)
            setCompleted(data[index].completed)
        }
        else
        {
            console.error(`Invalid Id: ${id}`)
            navigate('/dashboard')
        }
    }
    useEffect(()=>{
        if(id)
        {
            getData(id)
        }
    },[])
    const handleSubmit = ()=>{
        let index = findIndex(data,Number(id));
        console.log(completed);
        let editedData = {id:data[index].id,name,text,completed}//forming the object

        let newArray = [...data]//deep copy
        newArray.splice(index,1,editedData)//replace the old data with edited data
        console.log(newArray);
        setData(newArray)

        navigate('/')

    }
  return <>
  <div className="container">
        <h1 className="todoHeading mt-4 mb-4">My todo</h1>
        <Form className="row mb-4">
          <div className="col-lg-3">
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Todo Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
          </div>
          <div className="col-lg-3">
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Todo Decription" value={text} onChange={(e)=>setText(e.target.value)}/>
            </Form.Group>
          </div>
          <div className="col-lg-3">
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="status" value={completed} onChange={(e)=>setCompleted(e.target.value)}/>
            </Form.Group>
          </div>
          <div className="col-lg-3">
          <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
          </div>
        </Form>
        </div>
  </>
}

export default Edit