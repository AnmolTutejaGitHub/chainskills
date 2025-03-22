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
   address public PLAYER_2 = makeAddr("player_2");
   address public COMPANY_2 = makeAddr("company_2");

   function setUp() external{
      DeployChainskill deployChainskill = new DeployChainskill();
      cs = deployChainskill.run();
      vm.deal(COMPANY, 100 ether);
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

   function testRevertIfApplyingToUnListingProject() public RegisterCompany RegisterDev{
     vm.prank(COMPANY);
     cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.expectRevert(Chainskill.ProjectIdDoesNotExists.selector);
      vm.prank(PLAYER);
      cs.applyToListing(2020, PLAYER, CHARGES, COVER_LETTER);
   }

   function testSelectBidder() public RegisterCompany RegisterDev{
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);
   }

   function testRevertSelectBidderIfDevHasNotBidded() public RegisterCompany RegisterDev {
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.expectRevert(Chainskill.DevAddrGivenDidnotAppliedToThisListing.selector);
      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);
   }

   function testRevertSelectBidderIfDevNotFound() public RegisterCompany {
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.expectRevert(Chainskill.DevProfileDoesNotExist.selector);
      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);
   }

   function testRevertIfSelectingMultipleBidder() public RegisterCompany RegisterDev {
      vm.prank(PLAYER_2);
      cs.registerDev(PLAYER_2, EMAIL,NAME,skills,AVAIL, perHour , BIO);

      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER_2);
      cs.applyToListing(UUID, PLAYER_2, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);

      vm.expectRevert(Chainskill.ListingCanOnlyBeAssignedOneTime.selector);
      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER_2 , CHARGES);
   }

   function testMarkProjectCompleteAndPayDev() public RegisterCompany RegisterDev {
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);

      vm.prank(COMPANY);
      cs.MarkProjectCompleteAndPayDev{value: CHARGES}(UUID, COMPANY, 4);
   }

   function testMarkProjectCompleteButPayLessDev() public RegisterCompany RegisterDev{
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);

      vm.expectRevert(Chainskill.PlayTotalAmountToTheFuckingDev.selector);
      vm.prank(COMPANY);
      cs.MarkProjectCompleteAndPayDev{value: CHARGES - 20}(UUID, COMPANY, 4);
   }

   function testMarkProjectCompleteButDevDidNotApplied() public RegisterCompany RegisterDev{
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.expectRevert(Chainskill.ProjectWasNotAssigned.selector);
      vm.prank(COMPANY);
      cs.MarkProjectCompleteAndPayDev{value: CHARGES}(UUID, COMPANY, 4);
   }

   function testCompanyRejectDevFromAProject() public RegisterCompany RegisterDev{
     vm.prank(COMPANY);
     cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.RejectDev(UUID, PLAYER, COMPANY);

      cs.getApplicationStatus(UUID, PLAYER);
   }

   function testIfBidderSelectedRejectAllOtherAllicants() public RegisterCompany RegisterDev{
      vm.prank(PLAYER_2);
      cs.registerDev(PLAYER_2, EMAIL,NAME,skills,AVAIL, perHour , BIO);

      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER_2);
      cs.applyToListing(UUID, PLAYER_2, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER_2 , CHARGES);

      uint256 status_1 = cs.getApplicationStatus(UUID, PLAYER);
      uint256 status_2 = cs.getApplicationStatus(UUID, PLAYER_2);

      assert(status_1==2);
      assert(status_2==1);
   }

   function testGetAllCompanies() public RegisterCompany{
      vm.prank(COMPANY_2);
      cs.registerCompany(COMPANY_2, NAME, EMAIL, INDUSTRY, WEBSITE, DESCRIPTION);

      cs.getAllCompaniesAddr();
   }

   function testGetAllDevs() public RegisterDev{
      cs.getAllDevsAddr();
   }

   function testGetDevProfileAndMimicProjects() public RegisterDev RegisterCompany{
      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(COMPANY);
      cs.addListing(5050,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(COMPANY);
      cs.addListing(3456,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER);
      cs.applyToListing(5050, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER);
      cs.applyToListing(3456, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(COMPANY);
      cs.selectBidder(UUID, COMPANY, PLAYER , CHARGES);

      vm.prank(COMPANY);
      cs.RejectDev(5050, PLAYER, COMPANY);

      vm.prank(COMPANY);
      cs.selectBidder(3456, COMPANY, PLAYER , CHARGES);

      vm.prank(COMPANY);
      cs.MarkProjectCompleteAndPayDev{value: CHARGES}(3456, COMPANY, 4);

      uint256 status_1 = cs.getApplicationStatus(UUID, PLAYER);
      uint256 status_2 = cs.getApplicationStatus(5050, PLAYER);
      uint256 status_3 = cs.getApplicationStatus(3456, PLAYER);

      cs.getDevAppliedProjects(PLAYER);
      cs.getDevCompletedProjects(PLAYER);
      cs.getDevInProgressProjects(PLAYER);

      assert(status_1==1);
      assert(status_2==2);
      assert(status_3==1);
   }


   function testWhoBiddedForProject() public RegisterCompany RegisterDev{
      vm.prank(PLAYER_2);
      cs.registerDev(PLAYER_2, EMAIL,NAME,skills,AVAIL, perHour , BIO);

      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER_2);
      cs.applyToListing(UUID, PLAYER_2, CHARGES, COVER_LETTER);

      cs.getWhoBiddedForProject(UUID);
   }

   function testgetlistedProjectDetail() public RegisterCompany RegisterDev{
      vm.prank(PLAYER_2);
      cs.registerDev(PLAYER_2, EMAIL,NAME,skills,AVAIL, perHour , BIO);

      vm.prank(COMPANY);
      cs.addListing(UUID,COMPANY,TOPIC,DESCRIPTION,skills,DURATION,BUDGET);

      vm.prank(PLAYER);
      cs.applyToListing(UUID, PLAYER, CHARGES, COVER_LETTER);

      vm.prank(PLAYER_2);
      cs.applyToListing(UUID, PLAYER_2, CHARGES, COVER_LETTER);

      cs.getlistedProjectDetail(UUID, COMPANY);
      cs.getWhoBiddedForProject(UUID);
   }
}
