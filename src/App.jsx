import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (params) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="box md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-[#75b39b] min-h-[80vh] xl:w-[35%] md:w-3/4 ">
        <h1 className="font-bold text-center text-3xl cursor-pointer">
          iTask - Manage your todos at one place
        </h1>
        <h2 className="text-2xl font-bold my-2 cursor-pointer">Add a Todo</h2>
        <div className="addTodo my-5 flex gap-3 ">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="cursor-pointer w-full rounded-full px-5 py-1 bg-white  focus:bg-green-200 focus:shadow-2xl focus:shadow-white"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className=" bg-[#266b62] disabled:bg-[#499d92] cursor-pointer text-sm font-bold hover:bg-[#1c524b] p-2 px-3 py-2 text-white rounded-full mx-2">
            Save
          </button>
        </div>
        <input
          className="my-4 w-5 h-5 checked:bg-green-900 cursor-pointer"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          id="show"
        />
        <label className="mx-2 font-bold text-lg" htmlFor="show">
          Show Finished
        </label>

        <div className="h-[1px] bg-gray-400 my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to Display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo my-3 flex w-full justify-between border border-black p-3 rounded-full bg-[#C4DAD2]">
                  <div className="flex gap-5">
                    <input
                      className="w-5 h-5 cursor-pointer"
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full items-center justify-center">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className=" bg-[#266b62] text-sm cursor-pointer font-bold hover:bg-[#143b35] p-2 py-1 text-white rounded-md mx-1">
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className=" bg-[#266b62] text-sm cursor-pointer font-bold hover:bg-[#143b35] p-2 py-1 text-white rounded-md mx-1">
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
