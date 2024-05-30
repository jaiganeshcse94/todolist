import React,{ useState, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { findIndex } from "../utitlity/arrayindex";
import { useNavigate} from 'react-router-dom';
function Dashboard({ data, setData }) {
    let navigate = useNavigate();
   const handlerDelete=(id)=>{
        let index=findIndex(data,id);
        console.log(index,id);
        if(index!=-1){
            let newArray=[...data];
            newArray.splice(index,1);
            setData(newArray);
        }
    }
    let[name,setName]=useState('');
    let[text,setText]=useState('');
    const addData=()=>{
        let id = data.length?data[data.length-1].id+1:1;
        let completed =false
        let newUser1 = {
            id,
            name,
            text,
            completed
        }
        
        let newArray1 = [...data]//deep copy
        newArray1.push(newUser1)//add the user
        setData(newArray1)//update the state using state Fn
    }
    const handleChange = (e) => {
      console.log(e);
      let index = findIndex(data,Number(e.id));
      let id = e.id;
      let name=e.name;
      let text=e.text;
      let completed = !e.completed;
        let newUser2 = {
          id,
          name,
          text,
          completed
        }
        let newArray2 = [...data]//deep copy
        newArray2.splice(index,1,newUser2)
        setData(newArray2)//update the state using state Fn
      };
      const [filter, setFilter] = useState('All');
      const [filteredData, setFilteredData] = useState([]);
      useEffect(() => {
        // Filter data based on the selected filter
        if (filter === 'All') {
          setFilteredData(data);
        } else if (filter === 'Completed') {
          setFilteredData(data.filter(item => item.completed));
        } else if (filter === 'Not Completed') {
          setFilteredData(data.filter(item => !item.completed));
        }
      }, [filter, data]);
    
      const handleFilterChange = (event) => {
        setFilter(event.target.value);
      };
  return <>
  <div className="container">
        <h1 className="todoHeading mt-4 mb-4">My todo</h1>
        <Form className="row mb-4">
          <div className="col-lg-5">
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Todo Name" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
          </div>
          <div className="col-lg-5">
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Todo Decription" onChange={(e)=>setText(e.target.value)}/>
            </Form.Group>
          </div>
          <div className="col-lg-2">
            <Button variant="success" className="bg-green" onClick={addData}>
              Add Todo
            </Button>
          </div>
        </Form>
        <div className="filter mb-4">
          <div className="filter_left">
            <h2>My Todos</h2>
          </div>
          <div className="filter_right">
            <h2>Status Filter&nbsp;: &nbsp;</h2>
            <Form.Select aria-label="Default select example" className="dropper dropper--danger" onChange={handleFilterChange}  value={filter}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
              </Form.Select>
          </div>
        </div>
        <div className="row">
          {
            filteredData.map((e,i)=>{
                return <>
                      <div className="col-sm-4 mb-3" key={e.id}>
                        <div className="card BG-green">
                          <div className="card-body">
                            <p className="card-text">
                              <strong>Name: </strong> {e.name}
                            </p>
                            <p className="card-text">
                              <strong>Description: </strong> {e.text}
                            </p>
                            <p className="card-text filter_right">
                              <strong>status :&nbsp;</strong>
                              <Form.Select aria-label="Default select example" className={`dropper ${e.completed ? 'dropper--success' : 'dropper--danger'}`} value={e.completed}  onChange={()=>handleChange(e,e.id)}>
                              <option value="false">Not Completed</option>
                              <option value="true">Completed</option>
                              </Form.Select>
                            </p>
                            <button href="#" className="btn btn-primary" onClick={()=>navigate(`/edit-user/${e.id}`)}>
                              Edit
                            </button>
                            &nbsp;&nbsp;
                            <button href="#" className="btn btn-danger"  onClick={()=>handlerDelete(e.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
            })
          }
        </div>
      </div>
  </>
}

export default Dashboard