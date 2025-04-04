// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ChainskillNFT} from "./ChainskillNFT.sol";

contract Chainskill{

    error ListingCanOnlyBeAssignedOneTime();
    error PlayTotalAmountToTheFuckingDev();
    error ProfileAlreadyExists();
    error FieldsCanNotBeEmpty();
    error CompanyIsNotRegistered();
    error ProjectIdAlreadyExists();
    error ProfileDoesNotExist();
    error ProjectIdDoesNotExists();
    error DevProfileDoesNotExist();
    error DevAddrGivenDidnotAppliedToThisListing();
    error ListingIsClosed();
    error UnAuthorisedAccess();
    error ProjectWasNotAssigned();
    error RatingRangeOutOfBound();
    error projectHasBeenAssignedOrFinished();
    error DifficultyWronglySpecified();

    struct Dev{
        address addr;
        string name;
        string email;
        string [] skills;
        string avail;
        uint256 hourlyRate;
        string bio;
        uint256 rating;
        uint256 peopleRated;
        uint256 totalProjectsCompleted;
       // Listing [] completedProjects;
    }

    struct Company {
        address addr;
        string name;
        string email;
        uint256 prevProjectCount;
        uint256 totalSpendings;
        string industry;
        string website;
        string description;
        // Listing [] listing;
    }

    enum ListingStatus{
        OPEN,
        ASSIGNED,
        CLOSED,
        TERMINATED
    }

    enum DevApplicationStatus{
        PENDING,
        ACCEPTED,
        REJECTED
    }

    enum ProjectDifficulty{
        ENTRY_LEVEL,
        INTERMEDIATE,
        EXPERT
    }

    struct Applied{
        uint256 ListingUUID;
        address devAddr;
        uint256 charges;
        string coverLetter;
        DevApplicationStatus status;
        uint256 AppliedAt;
        string companyName;
        string title;
    }

    struct Listing{
        uint256 ListingUUID;
        address companyAddr;
        string topic;
        string description;
        string[] skillsReq;
        uint256 duration;
        uint256 budget;
        ListingStatus status;
        address devAddr;
        uint256 devFees;
        uint256 ListedOn;
        ProjectDifficulty difficulty;
        uint256 applicantCount;
        string companyName;
        // address[] devsApplied; // logic in mapping DevAppliedProjectMapping
    }

    struct ListingWithApplications {
        Listing listing;
        Applied[] applications;
    }



    mapping(address=>Dev) public DevMap;
    mapping(address=> Company) public CompanyMap;
    mapping(address=> Listing[]) public CompanyListing;
    mapping(address=>Listing[]) public DevCompletedProjects;
    mapping(address=>Listing[]) public DevInProgressProjects;
    mapping(address=>Listing[]) public DevTotalAppliedProjects;
    mapping(uint256=>Applied[]) public DevAppliedProjectMapping;
    mapping(address=>Applied[]) public DevAppliedProjects;
    mapping(address=>Applied[]) public CompanyReceivedApplications;
    mapping(uint256=>address) public projectIdToCompanyMap;


    address [] public companies;
    address [] public devs;



     ChainskillNFT public chainskillNFTContract;
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function setNftContractAddress(address addr) public {
        if (msg.sender != owner) revert UnAuthorisedAccess();
        chainskillNFTContract = ChainskillNFT(addr);
    }



   function registerDev(address addr, string memory name, string memory email, string[] memory skills, string memory avail, uint256 hourlyRate, string memory bio) public {

        if(DevMap[addr].addr!=address(0)){
            revert ProfileAlreadyExists();
        }

        if(CompanyMap[addr].addr !=address(0)){
            revert ProfileAlreadyExists();
        }

        if(msg.sender!=addr){
            revert UnAuthorisedAccess();
        }

        if(bytes(name).length == 0 || bytes(email).length == 0) {
            revert FieldsCanNotBeEmpty();
        }   

        DevMap[addr] = Dev({
            addr: addr,
            email: email,
            name : name,
            skills: skills,
            avail: avail,
            hourlyRate : hourlyRate,
            bio : bio,
            rating : 0,
            peopleRated : 0,
            totalProjectsCompleted : 0
        });
        devs.push(addr);
    }

    function registerCompany(address addr, string memory name, string memory email,string memory industry,string memory website ,string memory description) public {

        if(DevMap[addr].addr!=address(0)){
            revert ProfileAlreadyExists();
        }

        if(CompanyMap[addr].addr !=address(0)){
            revert ProfileAlreadyExists();
        }

        if(msg.sender!=addr){
            revert UnAuthorisedAccess();
        }

        if(bytes(name).length == 0 || bytes(email).length == 0) {
            revert FieldsCanNotBeEmpty();
        } 
        
        CompanyMap[addr] = Company({
            addr : addr,
            name : name,
            email : email,
            industry : industry,
            website : website,
            description : description,
            prevProjectCount : 0,
            totalSpendings : 0
        });
        companies.push(addr);
    }

    function addListing(uint256 uuid, address companyAddr , string memory topic, string memory description , string[] memory skillsReq,uint256 duration,uint256 budget , uint256 difficulty) public {

        if(msg.sender!=companyAddr){
            revert UnAuthorisedAccess();
        }

        if(CompanyMap[companyAddr].addr ==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(projectIdToCompanyMap[uuid]!=address(0)){
            revert ProjectIdAlreadyExists();
        }

        if(bytes(topic).length == 0 || bytes(description).length == 0 || duration<=0 || budget<=0) {
            revert FieldsCanNotBeEmpty();
        } 

        if(difficulty<0 || difficulty>2) revert DifficultyWronglySpecified();

        CompanyListing[companyAddr].push(
            Listing({
            ListingUUID : uuid,
            companyAddr : companyAddr,
            topic : topic,
            description : description,
            skillsReq : skillsReq,
            duration : duration,
            status : ListingStatus.OPEN,
            devAddr: address(0),
            devFees : 0,
            budget : budget,
            ListedOn : block.timestamp,
            difficulty : ProjectDifficulty(difficulty),
            applicantCount : 0,
            companyName : CompanyMap[companyAddr].name

        })
        );

        projectIdToCompanyMap[uuid] = companyAddr;
    }

    function updateDev(address addr,string memory avail,string memory email,string[] memory skills,string memory name,string memory bio,uint256 hourlyRate) public {

        if(msg.sender!=addr){
            revert UnAuthorisedAccess();
        }
        
        if(DevMap[addr].addr==address(0)){
            revert ProfileDoesNotExist();
        }

        if(bytes(email).length == 0 || bytes(name).length==0 || hourlyRate<=0) {
            revert FieldsCanNotBeEmpty();
        }   

        Dev storage dev = DevMap[addr];
        dev.avail = avail;
        dev.email = email;
        dev.skills = skills;
        dev.name = name;
        dev.bio = bio;
        dev.hourlyRate = hourlyRate;
    }

    function updateCompany(address addr,string memory name,string memory email,string memory industry , string memory description , string memory website) public {
        if(msg.sender!=addr){
            revert UnAuthorisedAccess();
        }

        if(CompanyMap[addr].addr==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(bytes(name).length == 0 || bytes(email).length == 0) {
            revert FieldsCanNotBeEmpty();
        }  

        Company storage company = CompanyMap[addr];
        company.email = email;
        company.name = name;
        company.industry = industry;
        company.description = description;
        company.website = website;
    }

    function applyToListing(uint256 projectID,address devAddr,uint256 charges,string memory coverLetter) public{

        if(msg.sender!=devAddr){
            revert UnAuthorisedAccess();
        }

        if(DevMap[devAddr].addr==address(0)){
            revert ProfileDoesNotExist();
        }

        if(projectIdToCompanyMap[projectID]==address(0)){
            revert ProjectIdDoesNotExists();
        }

        address companyAddr = projectIdToCompanyMap[projectID];
        Listing[] memory listings = CompanyListing[companyAddr];
        Listing memory applied;
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
                if(listings[i].status!=ListingStatus.OPEN) revert ListingIsClosed();
                DevTotalAppliedProjects[devAddr].push(listings[i]);
                listings[i].applicantCount+=1;
                applied = listings[i];
            }
        }


        DevAppliedProjectMapping[projectID].push(Applied({
            ListingUUID : projectID,
            devAddr : devAddr,
            charges : charges,
            coverLetter : coverLetter,
            status : DevApplicationStatus.PENDING,
            AppliedAt : block.timestamp,
            companyName: CompanyMap[companyAddr].name,
            title : applied.topic
        }));

        DevAppliedProjects[devAddr].push(Applied({
            ListingUUID : projectID,
            devAddr : devAddr,
            charges : charges,
            coverLetter : coverLetter,
            status : DevApplicationStatus.PENDING,
            AppliedAt : block.timestamp,
            companyName: CompanyMap[companyAddr].name,
            title : applied.topic
        })
        );

        CompanyReceivedApplications[companyAddr].push(Applied({
            ListingUUID : projectID,
            devAddr : devAddr,
            charges : charges,
            coverLetter : coverLetter,
            status : DevApplicationStatus.PENDING,
            AppliedAt : block.timestamp,
            companyName: CompanyMap[companyAddr].name,
            title : applied.topic
        })
        );
    }

    function selectBidder(uint256 projectID,address companyAddr , address devAddr,uint256 charges) public returns(string memory){

        if(msg.sender!=companyAddr){
            revert UnAuthorisedAccess();
        }

        if(CompanyMap[companyAddr].addr==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(DevMap[devAddr].addr==address(0)){
            revert DevProfileDoesNotExist();
        }

        if(projectIdToCompanyMap[projectID]!=companyAddr){
            revert ProjectIdDoesNotExists();
        }

        Applied [] storage allDevsThatApplied = DevAppliedProjectMapping[projectID];
        bool devApplied = false;

        for(uint256 i=0;i<allDevsThatApplied.length;i++){
            if(allDevsThatApplied[i].devAddr==devAddr) {
                allDevsThatApplied[i].status = DevApplicationStatus.ACCEPTED;
                devApplied =true;
                //break;
            }else {
                allDevsThatApplied[i].status = DevApplicationStatus.REJECTED;
            }

        }

        DevAppliedProjectMapping[projectID] = allDevsThatApplied;
        Applied[] storage devApplications = DevAppliedProjects[devAddr];
        for (uint256 i = 0; i < devApplications.length; i++) {
            if (devApplications[i].ListingUUID == projectID) {
                devApplications[i].status = DevApplicationStatus.ACCEPTED;
                break;
            }
    }

        if(!devApplied) revert DevAddrGivenDidnotAppliedToThisListing();



        Listing[] storage listings = CompanyListing[companyAddr];
    
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
                if(listings[i].status !=ListingStatus.OPEN){
                    revert ListingCanOnlyBeAssignedOneTime();
                }
                listings[i].status = ListingStatus.ASSIGNED;
                listings[i].devAddr = devAddr;
                listings[i].devFees = charges;
                DevInProgressProjects[devAddr].push(listings[i]);
                break;
            }
        }

        Dev memory dev = DevMap[devAddr];
        return dev.email;
    }

    function removeInProgressProject(address devAddr, uint256 projectID) internal {
        Listing[] storage inProgress = DevInProgressProjects[devAddr];

        for (uint256 i = 0; i < inProgress.length; i++) {
            if (inProgress[i].ListingUUID == projectID) {
                inProgress[i] = inProgress[inProgress.length - 1]; 
                inProgress.pop(); 
                break;
            }
    }
    }

    function MarkProjectCompleteAndPayDev(uint256 projectID,address companyAddr,uint256 DevRating) public payable{
        if(msg.sender!=companyAddr){
            revert UnAuthorisedAccess();
        }

        if(CompanyMap[companyAddr].addr==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(projectIdToCompanyMap[projectID]!=companyAddr){
            revert ProjectIdDoesNotExists();
        }

        if(DevRating<0 || DevRating>5) revert RatingRangeOutOfBound();

        Listing[] storage listings = CompanyListing[companyAddr];

        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
                if(listings[i].devAddr==address(0)) revert ProjectWasNotAssigned();
                listings[i].status = ListingStatus.CLOSED;
                DevCompletedProjects[listings[i].devAddr].push(listings[i]);
                removeInProgressProject(listings[i].devAddr,projectID);

                if(msg.value<listings[i].devFees){
                    revert PlayTotalAmountToTheFuckingDev();
                }
                payable(listings[i].devAddr).transfer(msg.value);

                CompanyMap[companyAddr].totalSpendings+=msg.value;
                CompanyMap[companyAddr].prevProjectCount+=1;
                DevMap[listings[i].devAddr].totalProjectsCompleted+=1;

                DevMap[listings[i].devAddr].rating = (DevMap[listings[i].devAddr].rating + DevRating)/(DevMap[listings[i].devAddr].peopleRated + 1);
                DevMap[listings[i].devAddr].peopleRated+=1;

                chainskillNFTContract.mintNft(
                    listings[i].devAddr,
                    CompanyMap[companyAddr].name,
                    companyAddr,
                    listings[i].topic
                );

                break;
            }
        }
    }

    function RejectDev(uint256 projectID,address devAddr,address companyAddr) public {
        if(msg.sender!=companyAddr){
            revert UnAuthorisedAccess();
        }

         if(CompanyMap[companyAddr].addr==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(DevMap[devAddr].addr==address(0)){
            revert DevProfileDoesNotExist();
        }

        if(projectIdToCompanyMap[projectID]!=companyAddr){
            revert ProjectIdDoesNotExists();
        }

        Applied [] storage allDevsThatApplied = DevAppliedProjectMapping[projectID];
        bool devApplied = false;

        for(uint256 i=0;i<allDevsThatApplied.length;i++){
            if(allDevsThatApplied[i].devAddr==devAddr) {
                devApplied =true;
                allDevsThatApplied[i].status = DevApplicationStatus.REJECTED;
                break;
            }
        }

        if(!devApplied) revert DevAddrGivenDidnotAppliedToThisListing();

    }

    function terminateAListing(uint256 projectID,address companyAddr) public {
         if(msg.sender!=companyAddr){
            revert UnAuthorisedAccess();
        }

        if(CompanyMap[companyAddr].addr==address(0)){
            revert CompanyIsNotRegistered();
        }

        if(projectIdToCompanyMap[projectID]!=companyAddr){
            revert ProjectIdDoesNotExists();
        }


        Listing[] storage listings = CompanyListing[companyAddr];
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
               if(listings[i].status!=ListingStatus.OPEN) revert projectHasBeenAssignedOrFinished();
               listings[i].status = ListingStatus.TERMINATED;
               break;
            }
        }
    }

    function getOpenListings() public view returns (Listing[] memory) {
    uint256 openCount = 0;

    for (uint256 i = 0; i < companies.length; i++) {
        Listing[] memory allListings = CompanyListing[companies[i]];
        for (uint256 j = 0; j < allListings.length; j++) {
            if (allListings[j].status == ListingStatus.OPEN) {
                openCount++;
            }
        }
    }

    Listing[] memory openListings = new Listing[](openCount);
    uint256 idx = 0;

    for (uint256 i = 0; i < companies.length; i++) {
        Listing[] memory allListings = CompanyListing[companies[i]];
        for (uint256 j = 0; j < allListings.length; j++) {
            if (allListings[j].status == ListingStatus.OPEN) {
                openListings[idx] = allListings[j];
                idx++;
            }
        }
    }

    return openListings;
}


    // function NFTGeneration(uint256 projectId,Listing project) private{
    //         ////
    // }


    function getAllCompaniesAddr() public view returns(address[] memory){
        return companies;
    }

    function getAllDevsAddr() public view returns(address[] memory){
        return devs;
    }

    function getDevProfileData(address devAddr) public view returns (Dev memory) {
    return DevMap[devAddr];
    }

    function getCompanyProfile(address companyAddr) public view returns (Company memory){
        return CompanyMap[companyAddr];
    }

    function getCompanyListings(address companyAddr) public view returns(Listing[]memory){
        return CompanyListing[companyAddr];
    }

    function getlistedProjectDetail(uint256 projectID, address companyAddr) public view returns(Listing memory){
        Listing[] storage listings = CompanyListing[companyAddr];
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
               return listings[i];
            }
        }
        revert  ProjectIdDoesNotExists();
    }

    function getWhoBiddedForProject(uint256 projectId) public view returns(Applied[] memory){
        return DevAppliedProjectMapping[projectId];
    }

    function getApplicationStatus(uint256 projectID,address devAddr) public view returns(uint256){
        if(projectIdToCompanyMap[projectID]==address(0)) revert ProjectIdDoesNotExists();

        Applied [] memory allApplications = DevAppliedProjectMapping[projectID];

        for(uint256 i=0;i<allApplications.length;i++){
            if(allApplications[i].devAddr == devAddr) return uint256(allApplications[i].status);
        }
        
        revert DevAddrGivenDidnotAppliedToThisListing();
    }

    function getApplication(uint256 projectID,address devAddr) public view returns(Applied memory){
        if(projectIdToCompanyMap[projectID]==address(0)) revert ProjectIdDoesNotExists();

        Applied [] memory allApplications = DevAppliedProjectMapping[projectID];

        for(uint256 i=0;i<allApplications.length;i++){
            if(allApplications[i].devAddr == devAddr) return allApplications[i];
        }
        
        revert DevAddrGivenDidnotAppliedToThisListing();
    }

     function getDevApplications(address devAddr) public view returns(Applied [] memory){
        return DevAppliedProjects[devAddr];
    }

    function getDevCompletedProjects(address DevAddr) public view returns(Listing[] memory){
        if(DevMap[DevAddr].addr==address(0)) revert ProfileDoesNotExist();
        return DevCompletedProjects[DevAddr];
    }

    function getDevAppliedProjects(address DevAddr) public view returns(Listing[] memory){
        if(DevMap[DevAddr].addr==address(0)) revert ProfileDoesNotExist();
        return DevTotalAppliedProjects[DevAddr];
    }

    function getDevInProgressProjects(address DevAddr) public view returns(Listing[] memory){
        if(DevMap[DevAddr].addr==address(0)) revert ProfileDoesNotExist();
        return DevInProgressProjects[DevAddr];
    }

    function checkAddressIsDevCompanyOrDoesNotExist(address addr) public view returns(uint256){
        if(DevMap[addr].addr!=address(0)) return 0;
        if(CompanyMap[addr].addr!=address(0)) return 1;
        return 2;
    }

    function getTotalnftsAwarded(address devAddr) public view returns(uint256){
        return chainskillNFTContract.totalNftsAwarded(devAddr);
    }

    function getNFTsOfDev(address devAddr) public view returns(string[] memory){
        return  chainskillNFTContract.getAllNftsOfFreelancer(devAddr);
    }

    function getAllCompanyProposals(address companyAddr) public view returns(Listing[] memory){
        if(msg.sender!=companyAddr) revert UnAuthorisedAccess();
        return CompanyListing[companyAddr];
    }

    function getAllApplicationsToCompanyJobs(address companyAddr) public view returns(ListingWithApplications[] memory){
         if(msg.sender!=companyAddr) revert UnAuthorisedAccess();

        uint256 totalListings = CompanyListing[companyAddr].length;
        ListingWithApplications[] memory result = new ListingWithApplications[](totalListings);

        for(uint256 i = 0; i < totalListings; i++) {
            Listing memory listing = CompanyListing[companyAddr][i];
            Applied[] memory applications = DevAppliedProjectMapping[listing.ListingUUID];

            result[i] = ListingWithApplications({
                listing: listing,
                applications: applications
            });
        }

        return result;

    }

    function isProjectPaid(uint256 uuid) public view returns(uint256){
        address addr = projectIdToCompanyMap[uuid];
        Listing[] memory listings = CompanyListing[addr];
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == uuid){
                return uint256(listings[i].status);
            }
        }
    }

   function getCompanyActiveProjects(address companyAddr) public view returns (Listing[] memory) {
    Listing[] storage listings = CompanyListing[companyAddr];
    uint256 activeCount = 0;

    for (uint256 i = 0; i < listings.length; i++) {
        if (listings[i].status == ListingStatus.ASSIGNED) {
            activeCount++;
        }
    }

    Listing[] memory activeListings = new Listing[](activeCount);
    uint256 idx = 0;

    for (uint256 i = 0; i < listings.length; i++) {
        if (listings[i].status == ListingStatus.ASSIGNED) {
            activeListings[idx] = listings[i];
            idx++;
        }
    }

    return activeListings;
}

}