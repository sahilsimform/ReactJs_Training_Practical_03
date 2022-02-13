import React, { useState, useEffect } from "react";
import "./Todo.css";
const schedule = require("node-schedule");

const getLocalItems = () => {
  let list = localStorage.getItem("TodoList");
  if (list) {
    return JSON.parse(localStorage.getItem("TodoList"));
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("Please Enter a Data.");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  schedule.scheduleJob("0 0 * * *", () => {
    setItems([]);
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    } else if (event.key === "Escape") {
      setToggleBtn(false);
    }
  };

  // let Done_Btn = {
  //   background: "#888",
  //   color: "#fff",
  //   textDecoration: "lineThrough",
  // };

  return (
    <>
      <div className="container ">
        <div className="main_div">
          <div className="child_div">
            <div className="container">
              <div className="addItems ">
                {toggleBtn ? (
                  <>
                    <input
                      type="text"
                      className="textArea"
                      placeholder="Add Items to Add to the Todo.."
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      onKeyUp={handleKeyDown}
                    />

                    <button className="btnAdd" onClick={addItem}>
                      <i className="fas fa-check add-btn" title="Update Item">
                        Update/Add
                      </i>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setToggleBtn(true)}
                    className="Add_btn_main"
                  >
                    +
                  </button>
                )}
              </div>
              <div className="showItems container">
                {items.map((elem) => {
                  return (
                    <div className="eachItem" key={elem.id}>
                      <h3>{elem.name}</h3>
                      <div className="float-right">
                        {/* <button className="btnDone">
                          <i
                            className="fa fa-check add-btn"
                            title="Delete Item"
                          >
                            Done
                          </i>
                        </button> */}
                        <button
                          className="btnEdit"
                          onClick={() => editItem(elem.id)}
                        >
                          <i
                            className="far fa-edit add-btn"
                            title="Edit Item"
                          ></i>
                        </button>
                        <button
                          className="btnDelete"
                          onClick={() => deleteItem(elem.id)}
                        >
                          <i
                            className="far fa-trash-alt add-btn"
                            title="Delete Item"
                          ></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="btnRe">
                <button className="btnRemAll" onClick={removeAll}>
                  Remove All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
