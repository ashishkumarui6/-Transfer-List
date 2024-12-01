import React, { useState } from "react";
import "./App.css";
import { data } from "./data/data";

function App() {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const cheackedList = (list, id, cheacked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          cheacked: !cheacked,
        };
      }

      return item;
    });
  };

  const handleClick = (id, cheacked, directon) => {
    if (directon === "LEFT") {
      let copylist = [...leftItems];

      copylist = cheackedList(copylist, id, cheacked);
      console.log(copylist);
      setLeftItems(copylist);
    } else {
      let copylist = [...rightItems];

      copylist = cheackedList(copylist, id, cheacked);
      setRightItems(copylist);
    }
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        cheacked: false,
      };
    });
  };

  const hadleTransfer = (dir) => {
    if (dir === "LEFT_TO_RIGHT") {
      if (leftItems.length) {
        const copyList = [...leftItems];
        const cheackedList = copyList.filter((item) => item.cheacked);
        const unCheackList = copyList.filter((item) => !item.cheacked);

        setRightItems(resetItems([...rightItems, ...cheackedList]));

        setLeftItems(unCheackList);
      }
    } else {
      const copyList = [...rightItems];
      const cheackedList = copyList.filter((item) => item.cheacked);
      const unCheackList = copyList.filter((item) => !item.cheacked);

      setLeftItems(resetItems([...leftItems, ...cheackedList]));

      setRightItems(unCheackList);
    }
  };
  return (
    <>
      <div className="main">
        <h1 className="headind">Tranfer list</h1>
        <div className="container">
          <div className="box">
            {/* left section  */}
            {leftItems.map(({ title, id, cheacked }) => {
              return (
                <div
                  onClick={() => handleClick(id, cheacked, "LEFT")}
                  className={`item ${cheacked && "cheacked"}`}
                  key={id}
                  id={id}
                >
                  {title}
                </div>
              );
            })}
          </div>
          <div className="actions">
            {/* buttons */}
            <button onClick={() => hadleTransfer("LEFT_TO_RIGHT")}>Left</button>
            <button onClick={() => hadleTransfer("RIGHT_TO_LEFT")}>
              Right
            </button>
          </div>
          <div className="actions-mobile">
            {/* buttons */}
            <button onClick={() => hadleTransfer("LEFT_TO_RIGHT")}>
              {" "}
              Bottom
            </button>
            <button onClick={() => hadleTransfer("RIGHT_TO_LEFT")}>Top</button>
          </div>
          <div className="box">
            {/* right section  */}
            {rightItems.map(({ title, id, cheacked }) => {
              return (
                <div
                  onClick={() => handleClick(id, cheacked, "RIGHT")}
                  className={`item ${cheacked && "cheacked"}`}
                  key={id}
                  id={id}
                >
                  {title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
