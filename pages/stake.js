import Head from 'next/head';
import {useEffect, useState} from "react";
import StakeToggle from "../components/stakeToggle"
import Link from 'next/link';
import { useAccount, useContractReads } from 'wagmi';
import { liquidstakingcontract } from '@/utils/contractInfo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';

export default function Stake(){

  const {address} = useAccount();

  const [contractInfo, setContractInfo] = useState();
  const [account, setAccount] = useState();

  const {data, isLoading, isError} = useContractReads({
    contracts: [
      {
        ...liquidstakingcontract,
        functionName: "balanceOf",
        args: [account]
      },
      {
        ...liquidstakingcontract,
        functionName: "totalSupply",
      },
      {
        ...liquidstakingcontract,
        functionName: "name",
      },
    ]
  })


    useEffect(() => {
        AOS.init();
        setContractInfo(data);
        setAccount(address);
      }, [data, address])

      
return(
    <>
    <Head>
        <title>The staking platform of Axora-Labs</title>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />;
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />;
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/svg-with-js.min.css" />;

    </Head>
  <div className='max-h-screen' style={{backgroundColor:"#2b313d", padding:"2%", paddingBottom:"100%", color:"#eee", fontFamily:"georgia"}}>
    <div>
    
    <Link href='/'><span className='py-3 text-3xl' style={{color:"#d7b679"}}><i class="fa fa-caret-left"></i> &nbsp; BACK</span></Link>

        <div className='pl-5 pr-5' style={{marginTop:"3%"}}>
        <span className='' style={{fontSize:"200%", fontWeight:"bold"}}>Stake</span>
        <span className='float-right'>{<ConnectButton /> ?? <button className="rounded px-4 py-1" id="stakeConnectWallet" style={{background:"#d7b679", color:"#141722", cursor:"pointer"}}><i class="fa fa-money"></i>&nbsp;&nbsp; Connect wallet</button>}</span>
        </div>

        <div className='grid md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1' data-aos="zoom-out" style={{marginTop:"3%", transition:"1s ease-in-out"}}>
            <div className='grid-cols-1'></div>
             
            <div className='grid-cols-1'>
            <div className='grid grid-cols-3 gap-3' style={{marginBottom:"5%", textAlign:"center"}}>
                <div className='grid-cols-1'>
                <div>Your Staked ETH</div>
                <div style={{fontSize:"140%", fontWeight:"bold"}}>{contractInfo?.[0]?.toString() / ethers.utils.parseEther("1")}</div>
                </div>
                <div className='grid-cols-1'>
                <div>Token Name</div>
                <div style={{fontSize:"140%", fontWeight:"bold"}}>{contractInfo?.[2]}</div>
                </div>
                <div className='grid-cols-1'>
                <div>Total ETH Staked</div>
                <div style={{fontSize:"140%", fontWeight:"bold"}}>{contractInfo?.[1]?.toString() / ethers.utils.parseEther("1")}</div>
                </div>
            </div>

          <StakeToggle />
            </div>

            <div className='grid-cols-1'></div>
        </div>
        
    </div>
  </div>
</>
);
}