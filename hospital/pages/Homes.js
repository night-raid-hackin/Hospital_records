import React from 'react'
import { useState } from 'react';
import { InfoContractAddress } from '../config';
import { ethers } from 'ethers';
import InfoContractAbi from '../../proj1/artifacts/contracts/InfoContract.sol/InfoContract.json';

function Homes() {
  const [input , setInput] = useState('');
  const [input1 , setInput1] = useState('');
  const [input2 , setInput2] = useState('');
  const [input3 , setInput3] = useState('');
  const [input4 , setInput4] = useState('');
  const [input5 , setInput5] = useState('');
  const [input6 , setInput6] = useState('');
  const [input7 , setInput7] = useState('');
  const [info, setInfo] =useState([]);


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
   
  return (
    <div>
        {/* <HospitalForm/> */}
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <div className="bg-gradient-to-r from-[#4FD3C4] to-[#C1F8CF] rounded-2xl shadow-2xl flex w-full max-w-4xl">
                 <div className="p-5 w-ful drop-shadow-lg">
                      {/* Sign In  */}
                      <div className="text-left font-bold">
                      <span className="text-black">NIGHT</span><span className="text-gradientfrom-cyan-500 to-blue-500"> RAID</span>
                      </div>
<div className="items-stretch justify-center px-60 mx-10 drop-shadow-md hover:drop-shadow-2xl w-100%">
  <h2 className="text-3xl w-full font-bold text-[#222831] mb-8">
    Enter the details
  </h2>
  <div className="flex flex-col items-center w-80% md:w-auto">
  {/* Patient's Details */}
<div className="bg-gray-100 w-full  p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl">
<input value={input} onChange={e =>setInput(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="text" name="email" placeholder="Enter Patient's Name">
</input>
</div>


<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl ">
<input value={input1} onChange={e =>setInput1(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="number" name="email" placeholder="Age">
</input>
</div>


<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl ">
<input value={input2} onChange={e =>setInput2(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="text" name="email" placeholder="Sex">
</input>
</div>



<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl ">
<input value={input3} onChange={e =>setInput3(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="number" name="email" placeholder="Weight">
</input>
</div>


<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2x l">
<input value={input4} onChange={e =>setInput4(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="number" name="email" placeholder="Phone Number">
</input>
</div>


<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl ">
<input value={input5} onChange={e =>setInput5(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="text" name="email" placeholder="Medical Problems">
</input>
</div>


<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl">
<input value={input6} onChange={e =>setInput6(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="text" name="email" placeholder="Miscellaneous">
</input>
</div>



<div className="bg-gray-100 w-full p-2 rounded-xl mb-2 drop-shadow-md hover:drop-shadow-2xl ">
<input value={input7} onChange={e =>setInput7(e.target.value)} className="bg-gray-100 rounded-md outline-none w-full caret-black"type="number" name="email" placeholder="Bill">
</input>
</div>
{/* <input value={input1} onChange={e =>setInput1(e.target.value)} className="bg-gray-100 rounded-md"type="email" name="email" placeholder="Address">
</input> */}

<button onClick={addContent} className="border-2 border-[#222831] rounded-full hover:text-[#FF2E63] px-12 py-2 inline-block mt-10 font-semibold bg-[#222831] text-white drop-shadow-md hover:drop-shadow-2xl">Initialise</button>

  </div>
</div>
</div>
</div>
</div>

    </div>
  )
}

export default Homes