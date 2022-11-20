import React from 'react'
import Homes from './Homes'
import Login from '../components/Login'

import { useState } from 'react';
import Option  from '../components/Option';


export default function index() {

  const [isUserLogged, setUserLogged] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');



  const onConnect = async() =>{
    try{

      const {ethereum } = window;
      if(!ethereum){
        console.log("metamask not connected");
        return;
      }
      let chainId = await ethereum.request({method: 'eth_chainId'});
      console.log("connected through chain Id", chainId);
      const goerli = '0x5';
      if(chainId !== goerli){
        alert("not the correct network");
        setCorrectNetwork(false);
        return;
      }
      else{
        setCorrectNetwork(true);
        console.log("connected ");

      }
    }
    catch(error){
      console.log(error);
    }

    const accounts = await ethereum.request({method : 'eth_requestAccounts'});
    setCurrentAccount(accounts[0]);
    setUserLogged(true);
}

// uint256 patientId;
//         string patientName;
//         uint256 age;
//         string sex;
//         uint256 weight;
//         uint256 phoneNo;
//         string medicalProb;
//         string miscellaneous;
//         uint256 bill;






  
  return (
    <div>
      {
    !isUserLogged ? <Login onConnect={onConnect}/> :  correctNetwork ? <Option /> : <h1>there is an error</h1>
    // <Homes/>
  }
    </div>
  )
}
