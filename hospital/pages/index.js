import React from 'react'
import Homes from '../components/Homes'
import Login from '../components/Login'
import { ethers } from 'ethers'
import InfoContractAbi from '../../proj1/artifacts/contracts/InfoContract.sol/InfoContract.json';
import { useState } from 'react';
import {InfoContractAddress} from '../config'

export default function index() {

  const [isUserLogged, setUserLogged] = useState(false);
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [input , setInput] = useState('');
  const [input1 , setInput1] = useState('');
  const [input2 , setInput2] = useState('');
  const [input3 , setInput3] = useState('');
  const [input4 , setInput4] = useState('');
  const [input5 , setInput5] = useState('');
  const [input6 , setInput6] = useState('');
  const [input7 , setInput7] = useState('');
  const [info, setInfo] =useState([]);
  const [output, setOutput] = useState([]);


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

const addContent= async e =>{
  e.preventDefault();
  
  let content = {
    name: input,
    age: input1,
    gender: input2,
    weightt: input3,
    phoneNo: input4,
    medicProb: input5,
    misc: input6,
    bills: input7,
  }

  try{
    const {ethereum} = window;
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const InfoContract = new ethers.Contract(
        InfoContractAddress,
        InfoContractAbi.abi,
        signer
      )
      // string memory _patientName,
      //   uint256 _age,
      //   string memory _sex,
      //   uint256 _weight,
      //   uint256 _phoneNo,
      //   string memory _medicalProb,
      //   string memory _miscellaneous,
      //   uint256 _bill

      InfoContract.addpatient(content.name, content.age, content.gender, content.weightt, content.phoneNo, content.medicProb, content.misc, content.bills).then(res =>{
        setInfo([...info, content]);
        console.log("completed adding info");
      })
      .catch(err =>{
        console.log(err);
      })

    }
    else{
      console.log("ethereum does not exist");
    }
  }catch(error){
    console.log(error);
  }
}




const getContent = async () =>{
  try{
    const {ethereum} = window;
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const InfoContract = new ethers.Contract(
        InfoContractAddress,
        InfoContractAbi.abi,
        signer
      )
      let allContent = await InfoContract.showDetails();
      // const pId = allContent.patientId;
      // const pName = allContent.patientName;
      // const pgender = allContent.sex;
      // const pweight = allContent.weight;
      // const pPhone = allContent.phoneNo;
      // const pMedical = allContent.medicalProb;
      // const pMisc = allContent.miscellaneous;
      // const pbill = allContent.bill;

      setOutput(allContent);
      console.log(output);
      // console.log(pId, pMedical, pMisc, pName, pbill, pgender, pPhone, pweight);

    }
    else{
      console.log("no object found");
    }
  }catch(error){
    console.log(error);
  }
}
  
  return (
    <div>
      {
    !isUserLogged ? <Login onConnect={onConnect}/> :  correctNetwork ? <Homes setInput ={setInput} input={input} setInput1 ={setInput1} input1={input1} setInput2 ={setInput2} input2={input2} setInput3 ={setInput3} input3={input3}  setInput4 ={setInput4} input4={input4} setInput5 ={setInput5} input5={input5} setInput6 ={setInput6} input6={input6} setInput7 ={setInput7} input7={input7}  addContent={addContent} output={output} getContent={getContent} /> : <h1>there is an error</h1>
    // <Homes/>
  },
      
    </div>
  )
}
