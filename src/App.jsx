import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [todoname, setToDoName] = useState("");


const [todolist, setToDoList] = useState(()=>{
const savedtodo=localStorage.getItem("todolist")
return savedtodo ? JSON.parse(savedtodo) : [];
}); 

const updateItem=(index,newValue)=>{
const updatedList=[...todolist];
updatedList[index]={
  ...updatedList[index],
 text:newValue
};
setToDoList(updatedList);
}

useEffect(() => {
  localStorage.setItem("todolist",JSON.stringify(todolist));

  
}, [todolist])



const saveToDoList=(e)=>{
    e.preventDefault();
  if(todolist.some(item=>item.text===todoname)){
  alert("Task already present")
}
else{
  const finaltodolist=[...todolist,{
    text:todoname,
    completed:false,
  }]
  setToDoList(finaltodolist);
}
    
setToDoName("")
  }

  const toggleComplete=(index)=>{
    const updatedList=[...todolist]
    updatedList[index].completed=!updatedList[index].completed
    setToDoList(updatedList);
  }

   const deleteItem = (indextodelete) => {
  setToDoList(
    todolist.filter((_, index) => index !== indextodelete)
  );
};

    const list=todolist.map((value,index)=>{
    return(
      <ToDoListItems 
      key={index}
      value={value}
      index={index}
      deleteItem={deleteItem}
      updateItem={updateItem}
      toggleComplete={toggleComplete}

       />
    )
  })



  return (
    <>
    <div className='App'>
      <h1>To do List</h1>
      <form onSubmit={saveToDoList}>
        <input
        placeholder='Enter task...'
         type='text'
         name='todoname'
         value={todoname}
         onChange={(e)=>setToDoName(e.target.value)}

         />
      <button>Save</button>
      </form>

      <div className='listitems'>
        <ul>
          
           {list} 
        </ul>
      </div>


    </div>

    </>
  )
}

export default App

function ToDoListItems({value,index,deleteItem,updateItem,toggleComplete}){
  const [isEditing, setisEditing] = useState(false);
  const [editValue, seteditValue] = useState(value.text);

const handleSave=(e)=>{
  e.stopPropagation();
  updateItem(index,editValue);
  setisEditing(false);
}

  return(
   <li onClick={()=>toggleComplete(index)}
   style={{textDecoration:value.completed?"line-through":"none",cursor:"pointer"}}
   >
   {isEditing ?(
    <>
      <input
      type='text'
      value={editValue}
      onChange={(e)=>seteditValue(e.target.value)}
      />
      <button className='editbtn' onClick={handleSave}>Save</button>
    </>
   ):(
    <>
     {value.text}
   <button className='editbtn' onClick={(e)=>{
    setisEditing(true);
    e.stopPropagation();
    }}>Edit</button>

   <span onClick={(e)=>{
    e.stopPropagation();
    deleteItem(index)
    }}>&times;</span>
  
    </>
   )}
   </li>
  );
 
}
