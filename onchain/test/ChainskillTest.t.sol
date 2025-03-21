// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "../lib/forge-std/src/Test.sol";
import "../lib/forge-std/src/console.sol";
import {DeployChainskill} from "../script/DeployChainskill.s.sol";
import {Chainskill} from "../src/Chainskill.sol";

contract ChainskillTest is Test{
   Chainskill cs;

   string constant EMAIL = "testuser@gmail.com";
   string constant NAME = "test";
   string constant AVAIL = "IST";
   string constant BIO = "Developer";
   string [] skills = ["Java","Python"];
   uint256 constant perHour = 0.02 ether;
   string constant INDUSTRY = "Tech";
   string constant DESCRIPTION = "Tech";
   string constant WEBSITE = "Tech.dev";
   string constant TOPIC = "WEB3";
   uint256 constant UUID = 8080;
   uint256 constant DURATION = 9090;
   uint256 constant BUDGET = 1010;
   uint256 constant CHARGES = 1010;
   string constant COVER_LETTER = "cover_letter";


   address public PLAYER = makeAddr("player");
   address public COMPANY = makeAddr("company");

   function setUp() external{
      DeployChainskill deployChainskill = new DeployChainskill();
      cs = deployChainskill.run();
   }

   modifier RegisterDev{
      vm.prank(PLAYER);
      cs.registerDev(PLAYER, EMAIL,NAME,skills,AVAIL, perHour , BIO);
      _;
   }

   modifier RegisterCompany{
      vm.prank(COMPANY);
      cs.registerCompany(COMPANY, NAME, EMAIL, INDUSTRY, WEBSITE, DESCRIPTION);
      _;
   }

   function testDevRegisteration() public {
      vm.prank(PLAYER);
      cs.registerDev(PLAYER, EMAIL,NAME,skills,AVAIL, perHour , BIO);

      Chainskill.Dev memory dev = cs.getDevProfileData(PLAYER);
      assert(keccak256(abi.encodePacked(dev.bio)) == keccak256(abi.encodePacked(BIO)));
   }

   function testDevRegisterationFailsIfDevExists() public RegisterDev {
      vm.expectRevert(Chainskill.ProfileAlreadyExists.selector);
      vm.prank(PLAYER);
      cs.registerDev(PLAYER, EMAIL,NAME,skills,AVAIL, perHour , BIO);
   }

   function testCompanyRegisteration() public {
      vm.prank(COMPANY);
      cs.registerCompany(COMPANY, NAME, EMAIL, INDUSTRY, WEBSITE, DESCRIPTION);
   }

   function testCompnayAlreadyRegistered() public {
      vm.prank(COMPANY);
      cs.registerCompany(COMPANY, NAME, EMAIL, INDUSTRY, WEBSITE, DESCRIPTION);

      vm.expectRevert(Chainskill.ProfileAlreadyExists.selector);
      vm.prank(COMPANY);
      cs.registerCompany(COMPANY, NAME, EMAIL, INDUSTRY, WEBSITE, DESCRIPTION);
   }

   function testProjectListing() public RegisterCompany{
       vm.prank(COMPANY);
       cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);
   }

   function testDevUpdate() public RegisterDev{
      vm.prank(PLAYER);
      cs.updateDev(PLAYER, AVAIL,EMAIL, skills, NAME, BIO, perHour);
   }

   function testRevertDevUpdate() public RegisterDev{
      vm.prank(PLAYER);
      vm.expectRevert(Chainskill.FieldsCanNotBeEmpty.selector);
      cs.updateDev(PLAYER, AVAIL,"", skills, NAME, BIO, perHour);
   }

   function testUpdateCompany() public RegisterCompany{
      vm.prank(COMPANY);
      cs.updateCompany(COMPANY, "updated", EMAIL, INDUSTRY, DESCRIPTION, WEBSITE);
   }

   function testRevertUpdateCompanyIfNotExists() public {
      vm.expectRevert(Chainskill.CompanyIsNotRegistered.selector);
      vm.prank(COMPANY);
      cs.updateCompany(COMPANY, "updated", EMAIL, INDUSTRY, DESCRIPTION, WEBSITE);
   }

   function testRevertIfCompanyNameIsNotGiven() public RegisterCompany{
      vm.prank(COMPANY);
      vm.expectRevert(Chainskill.FieldsCanNotBeEmpty.selector);
      cs.updateCompany(COMPANY, "" , "" , INDUSTRY , DESCRIPTION, WEBSITE);
   }

   function testApplyToListing() public RegisterCompany RegisterDev{
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);
   }

}
