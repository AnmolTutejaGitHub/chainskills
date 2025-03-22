// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

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
        EXPIRED
    }

    enum DevApplicationStatus{
        PENDING,
        ACCEPTED,
        REJECTED
    }

    struct Applied{
        uint256 ListingUUID;
        address devAddr;
        uint256 charges;
        string coverLetter;
        DevApplicationStatus status;
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
        // address[] devsApplied; // logic in mapping DevAppliedProjectMapping
    }


    mapping(address=>Dev) public DevMap;
    mapping(address=> Company) public CompanyMap;
    mapping(address=> Listing[]) public CompanyListing;
    mapping(address=>Listing[]) public DevCompletedProjects;
    mapping(address=>Listing[]) public DevInProgressProjects;
    mapping(address=>Listing[]) public DevTotalAppliedProjects;
    mapping(uint256=>Applied[]) public DevAppliedProjectMapping;
    mapping(uint256=>address) public projectIdToCompanyMap;


    address [] public companies;
    address [] public devs;

   function registerDev(address addr,string memory email,string memory name,string[] memory skills,string memory avail,uint256 hourlyRate,string memory bio) public {

        if(DevMap[addr].addr!=address(0)){
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

    function registerCompany(address addr,string memory name, string memory email,string memory industry,string memory website ,string memory description) public {

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

    function addListing(uint256 uuid, address companyAddr , string memory topic, string memory description , string[] memory skillsReq,uint256 duration,uint256 budget) public {

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
            ListedOn : block.timestamp
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
        for(uint256 i=0;i<listings.length;i++){
            if(listings[i].ListingUUID == projectID){
                if(listings[i].status!=ListingStatus.OPEN) revert ListingIsClosed();
                DevTotalAppliedProjects[devAddr].push(listings[i]);
            }
        }


        DevAppliedProjectMapping[projectID].push(Applied({
            ListingUUID : projectID,
            devAddr : devAddr,
            charges : charges,
            coverLetter : coverLetter,
            status : DevApplicationStatus.PENDING
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
                break;
            }else {
                allDevsThatApplied[i].status = DevApplicationStatus.REJECTED;
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

}