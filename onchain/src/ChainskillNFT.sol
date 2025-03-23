// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract ChainskillNFT is ERC721 {
    using Strings for uint256;
    using Strings for address;

    error UnAuthorisedAccess();

    event NFTMinted(address indexed freelancer, uint256 tokenId, string tokenUri);

    uint256 private s_tokenCounter;
    mapping(uint256 => string) public s_tokenIdToUri;
    mapping(address => uint256[]) private s_ownerToTokenIds;
    address owner;
    address ChainskillContractAddress;

    modifier onlyOwner(){
        if(msg.sender != owner) revert UnAuthorisedAccess();
        _;
    }

    constructor() ERC721("Freelancer Certificate", "FCERT") {
        s_tokenCounter = 0;
        owner = msg.sender;
    }

    function setChainskillContractAddress(address addr) public onlyOwner {
        ChainskillContractAddress = addr;
    }

    function mintNft(address devAddr, string memory companyName, address companyAddr, string memory projectTitle) public {
        if (msg.sender != ChainskillContractAddress) revert UnAuthorisedAccess();
        string memory tokenUri = createTokenUri(devAddr, companyName, companyAddr, projectTitle);

        s_tokenIdToUri[s_tokenCounter] = tokenUri;
        _safeMint(devAddr, s_tokenCounter);
        s_ownerToTokenIds[devAddr].push(s_tokenCounter); // Track manually
        emit NFTMinted(devAddr, s_tokenCounter, tokenUri);
        s_tokenCounter++;
    }

    function createTokenUri(address devAddr, string memory companyName, address companyAddr, string memory projectTitle) internal view returns (string memory) {
        string memory json = string(
            abi.encodePacked(
                '{',
                '"name": "Freelancer Certificate #', s_tokenCounter.toString(), '", ',
                '"description": "Certificate awarded for successful project completion.", ',
                '"attributes": [',
                '{"trait_type": "Freelancer", "value": "', devAddr.toHexString(), '"},',
                '{"trait_type": "Company Name", "value": "', companyName, '"},',
                '{"trait_type": "Company Address", "value": "', companyAddr.toHexString(), '"},',
                '{"trait_type": "Project Title", "value": "', projectTitle, '"}',
                ']',
                '}'
            )
        );
        return json;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return s_tokenIdToUri[tokenId];
    }

    function totalNftsAwarded(address devAddr) public view returns (uint256) {
        return balanceOf(devAddr);
    }

    function getAllNftsOfFreelancer(address devAddr) public view returns (string[] memory) {
        uint256 nftCount = s_ownerToTokenIds[devAddr].length;
        string[] memory tokenURIs = new string[](nftCount);

        for (uint256 i = 0; i < nftCount; i++) {
            uint256 tokenId = s_ownerToTokenIds[devAddr][i];
            tokenURIs[i] = tokenURI(tokenId);
        }
        return tokenURIs;
    }
}