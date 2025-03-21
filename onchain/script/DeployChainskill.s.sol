// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "../lib/forge-std/src/Script.sol";
import {Chainskill} from "../src/Chainskill.sol";

contract DeployChainskill is Script{
   Chainskill chainskill;
   function run() public returns(Chainskill){
        vm.startBroadcast();
        chainskill = new Chainskill();
        vm.stopBroadcast();
        return chainskill;
    }
}