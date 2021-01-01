import React, { useState } from "react";
import "./styles.css";
import receipt from "./receipt.svg";

export default function App() {
  const cashArray = [2000, 500, 100, 50, 20, 10, 5, 1];
  const [state, setState] = useState({
    bill: 0,
    cash: 0,
    balance: 0
  });
  const [bool, setBool] = useState({
    enter: false,
    balance: false,
    error:false
  });
  const [balanceArr, setBalanceArr] = useState([]);

  function obj(denomination, count) {
    this.denomination = denomination;
    this.count = count;
  }

  function changeHandler(event) {
    setState({ ...state, [event.target.name]: Number(event.target.value) });
  }

  function booleanHandler(e) {
    state.bill && setBool({ ...bool, enter: true });
  }

  function clickHandler(event) {
  
    if(state.cash>=state.bill){
    balanceArr.length = 0;
    let balance = state.cash - state.bill;
    let obj1;
    setBool({ error:false});
    
    setBool({ ...bool, balance: true,error:false });
    for (let i = 0; i < cashArray.length; i++) {
      let remainder = Math.floor(balance / cashArray[i]);

      if (remainder) {
        obj1 = new obj(cashArray[i], remainder);
        balanceArr.push(obj1);
        setBalanceArr(balanceArr);
        balance = balance - remainder * cashArray[i];
      }
    }
    }
    else{
    setBool({ ...bool, error:true,balance:false});
    

    


    }
  }
  return (
    <div className="App">
      <nav>
        <h1>Balance Calculator</h1>
      </nav>
      <img src={receipt} alt="receipt"></img>
      <div className="form">
        <input
          type="text"
          placeholder="Enter the bill amount"
          name="bill"
          onChange={changeHandler}
        />
        <button className="enterBtn" onClick={booleanHandler} name="enter">
          Enter
        </button>
      </div>
      {bool.enter && (
        <div className="form">
          <input
            className="classInput"
            type="text"
            placeholder="Enter the user cash"
            name="cash"
            onChange={changeHandler}
          />
          <button className="enterBtn" onClick={clickHandler}>
            Balance
          </button>
        </div>
      )}
      {bool.balance && (
        <>
          <h3 className="balP">Balance : Rs.{state.cash - state.bill}</h3>

          <table className="bill">
            <thead>
              <tr>
                <th>Note</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {balanceArr.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.denomination !== 1 ? (
                      <td>Rs.{item.denomination}</td>
                    ) : (
                      <td>Re.{item.denomination}</td>
                    )}
                    <td>{item.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer>
            <h4>Developed by sruthi</h4>
            <ul>
              <li>
                <a href="https://twitter.com/CodesSruthi">Twitter</a>
              </li>
              <li>
                <a href="https://github.com/sruthiragupathy">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sruthi-ragupathy-7740ab172/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </footer>
        </>
      )}
         
      {bool.error && (
        <>
      <h4 className="balP error">User amount is lesser than Bill amount! Please enter the valid values! </h4>
      <footer>
            <h4>Developed by sruthi</h4>
            <ul>
              <li>
                <a href="https://twitter.com/CodesSruthi">Twitter</a>
              </li>
              <li>
                <a href="https://github.com/sruthiragupathy">Github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sruthi-ragupathy-7740ab172/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </footer>
          </>
      )}
    </div>
  );
}
