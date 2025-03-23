// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "../lib/forge-std/src/Script.sol";
import {Chainskill} from "../src/Chainskill.sol";
import {ChainskillNFT} from "../src/ChainskillNFT.sol";

contract DeployChainskill is Script{
    Chainskill chainskill;
    ChainskillNFT chainskillNFT;
   function run() public returns(Chainskill, ChainskillNFT){
        vm.startBroadcast();
        chainskill = new Chainskill();
        chainskillNFT = new ChainskillNFT();
        chainskill.setNftContractAddress(address(chainskillNFT));
        chainskillNFT.setChainskillContractAddress(address(chainskill));
        vm.stopBroadcast();
       return (chainskill, chainskillNFT);
    }
}