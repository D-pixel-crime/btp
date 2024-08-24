import { useState } from "react";
import "./Display.css";

const Display = ({ contracts, accounts }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    console.log("Button clicked");
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contracts.display(Otheraddress);
        console.log(dataArray);
      } else {
        console.log(accounts);
        dataArray = await contracts.display(accounts);
        console.log("Fetched data array");
      }
    } catch (e) {
      console.error(e);
      alert("You don't have access");
    }
    console.log(dataArray);
    const isEmpty = Object.keys(dataArray).length === 0;
    console.log("Running");
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log("HI");
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <></>
          // <a href={item} key={i} target="_blank">
          //   <img
          //     key={i}
          //     src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
          //     alt="new"
          //     className="image-list"
          //   ></img>
          // </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
      console.log("Nope");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Address"
          className="address px-2.5 py-2 border rounded-md bg-transparent text-slate-300 bg-slate-700 outline-none border-slate-600 shadow-md shadow-black"
        />
        <button
          className="center button flex-center bg-green-600 border-2 border-green-600 hover:text-green-400 hover:bg-transparent hover:cursor-pointer px-2.5 py-2 rounded-md"
          onClick={getdata}
        >
          Fetch
        </button>
      </div>
    </>
  );
};
export default Display;
