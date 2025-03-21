// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "../lib/forge-std/src/Test.sol";
import {DeployChainskill} from "../script/DeployChainskill.s.sol";

contract Chainskill is Test{
     function setUp() external{
        DeployChainskill deployChainskill = new DeployChainskill();
        deployChainskill.run();
     }
}
