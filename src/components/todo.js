import React, { useState ,useEffect } from 'react'
import "./todo.css";
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };
const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState("");
    const [toggleButton,setTogglrButton]=useState(false);
    const addItem=()=>
    {
        if(!inputdata)
        {
            alert("please add data");
        }
        else if(inputdata && toggleButton)
        {
            setItems(items.map((curElem)=>{
                if(curElem.id===isEditItem)
                {
                    return {...curElem,name:inputdata};
                }
                return curElem;
            }));
            setInputData("");
            setIsEditItem(null);
            setTogglrButton(false);
        }
    
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        };
        }
        const editItem=(index)=>{
            const item_todo_edited=items.find((currElem)=>
            {
                return currElem.id===index;
            });
            setInputData(item_todo_edited.name);setIsEditItem(index);
            setTogglrButton(true);
        }

        const deleteItem = (index) => {
            const updatedItems = items.filter((curElem) => {
              return curElem.id !== index;
            });
            setItems(updatedItems);
          };
        
          // remove all the elements
          const removeAll = () => {
            setItems([]);
          };
        
          // adding localStorage
          useEffect(() => {
            localStorage.setItem("mytodolist", JSON.stringify(items));
          }, [items]);
        

    
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./image/todo.svg'/>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input 
                            type='text' placeholder='✍ Add Item'
                            className='form-control'
                            value={inputdata}
                            onChange={(event)=>setInputData(event.target.value)}
                        />
                        {toggleButton?( <i className="far fa-edit add-btn" onClick={addItem}></i>):
                        
                        (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
                    </div>
                    <div className='showItems'>
                        {
                            items.map((curElem)=>{
                              return(<div className='eachItem' key={curElem.id}>
                              <h3>{curElem.name}</h3>
                              <div className='tood-btn'>
                              <i
                                className="far fa-edit add-btn"
                                onClick={() => editItem(curElem.id)}></i>
                               <i
                                className="far fa-trash-alt add-btn"
                                onClick={() => deleteItem(curElem.id)}>
                            </i>
                             </div>
                             </div>
                              )
                            })
                          
                        }    
                        
                    </div>
                    <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
                </div>
            </div>
        </>
    )
}

export default Todo
