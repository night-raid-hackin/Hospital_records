import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import InfoContractAbi from '../../proj1/artifacts/contracts/InfoContract.sol/InfoContract.json';
import {InfoContractAddress} from '../config';
export default function Option() {
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
    <>
<div className="flex flex-col items-center justify-center w-full min-h-screen py-2 bg-[#252A34]">
<div className="bg-[#393E46] h-[30vh] rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
<div className="w-full flex p-10 bg-black rounded-2xl shadow-2xl h-full items-center justify-center">
<div className="w-1/2 h-[10vh] mr-10 flex items-center justify-center rounded-2xl bg-gray-500">
    <Link href="/Display">
    <button>
        <h1 className="font-bold text-2xl">
        Patient
        </h1>
        </button> 
    </Link>
        </div>   

<div className="w-1/2 h-[10vh] flex justify-center items-center bg-gray-600 rounded-2xl">
    <Link href="/Homes">
    <button>
        <h1 className="font-bold text-2xl">
Hospital
</h1>
    </button>
    </Link>
    </div>


</div>
</div>
</div>
</>
  )
}
