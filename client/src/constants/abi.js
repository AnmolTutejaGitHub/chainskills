const abi =[
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "CompanyListing",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "topic",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.ListingStatus"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "devFees",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "ListedOn",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "difficulty",
                "type": "uint8",
                "internalType": "enum Chainskill.ProjectDifficulty"
            },
            {
                "name": "applicantCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CompanyMap",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "prevProjectCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "totalSpendings",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "industry",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "website",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "CompanyReceivedApplications",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "charges",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "coverLetter",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.DevApplicationStatus"
            },
            {
                "name": "AppliedAt",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevAppliedProjectMapping",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "charges",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "coverLetter",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.DevApplicationStatus"
            },
            {
                "name": "AppliedAt",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevAppliedProjects",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "charges",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "coverLetter",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.DevApplicationStatus"
            },
            {
                "name": "AppliedAt",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevCompletedProjects",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "topic",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.ListingStatus"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "devFees",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "ListedOn",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "difficulty",
                "type": "uint8",
                "internalType": "enum Chainskill.ProjectDifficulty"
            },
            {
                "name": "applicantCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevInProgressProjects",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "topic",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.ListingStatus"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "devFees",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "ListedOn",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "difficulty",
                "type": "uint8",
                "internalType": "enum Chainskill.ProjectDifficulty"
            },
            {
                "name": "applicantCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevMap",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "avail",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "hourlyRate",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "bio",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "rating",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "peopleRated",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "totalProjectsCompleted",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "DevTotalAppliedProjects",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "ListingUUID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "topic",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum Chainskill.ListingStatus"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "devFees",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "ListedOn",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "difficulty",
                "type": "uint8",
                "internalType": "enum Chainskill.ProjectDifficulty"
            },
            {
                "name": "applicantCount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyName",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "MarkProjectCompleteAndPayDev",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "DevRating",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "RejectDev",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addListing",
        "inputs": [
            {
                "name": "uuid",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "topic",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "skillsReq",
                "type": "string[]",
                "internalType": "string[]"
            },
            {
                "name": "duration",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "budget",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "difficulty",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "applyToListing",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "charges",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "coverLetter",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "chainskillNFTContract",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract ChainskillNFT"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "checkAddressIsDevCompanyOrDoesNotExist",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "companies",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "devs",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllApplicationsToCompanyJobs",
        "inputs": [
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.ListingWithApplications[]",
                "components": [
                    {
                        "name": "listing",
                        "type": "tuple",
                        "internalType": "struct Chainskill.Listing",
                        "components": [
                            {
                                "name": "ListingUUID",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "companyAddr",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "topic",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "description",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "skillsReq",
                                "type": "string[]",
                                "internalType": "string[]"
                            },
                            {
                                "name": "duration",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "budget",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "status",
                                "type": "uint8",
                                "internalType": "enum Chainskill.ListingStatus"
                            },
                            {
                                "name": "devAddr",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "devFees",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "ListedOn",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "difficulty",
                                "type": "uint8",
                                "internalType": "enum Chainskill.ProjectDifficulty"
                            },
                            {
                                "name": "applicantCount",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "companyName",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    },
                    {
                        "name": "applications",
                        "type": "tuple[]",
                        "internalType": "struct Chainskill.Applied[]",
                        "components": [
                            {
                                "name": "ListingUUID",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "devAddr",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "charges",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "coverLetter",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "status",
                                "type": "uint8",
                                "internalType": "enum Chainskill.DevApplicationStatus"
                            },
                            {
                                "name": "AppliedAt",
                                "type": "uint256",
                                "internalType": "uint256"
                            },
                            {
                                "name": "companyName",
                                "type": "string",
                                "internalType": "string"
                            },
                            {
                                "name": "title",
                                "type": "string",
                                "internalType": "string"
                            }
                        ]
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllCompaniesAddr",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllCompanyProposals",
        "inputs": [
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getAllDevsAddr",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getApplication",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Chainskill.Applied",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "charges",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "coverLetter",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.DevApplicationStatus"
                    },
                    {
                        "name": "AppliedAt",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getApplicationStatus",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCompanyListings",
        "inputs": [
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCompanyProfile",
        "inputs": [
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Chainskill.Company",
                "components": [
                    {
                        "name": "addr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "email",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "prevProjectCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalSpendings",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "industry",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "website",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDevApplications",
        "inputs": [
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Applied[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "charges",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "coverLetter",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.DevApplicationStatus"
                    },
                    {
                        "name": "AppliedAt",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDevAppliedProjects",
        "inputs": [
            {
                "name": "DevAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDevCompletedProjects",
        "inputs": [
            {
                "name": "DevAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDevInProgressProjects",
        "inputs": [
            {
                "name": "DevAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getDevProfileData",
        "inputs": [
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Chainskill.Dev",
                "components": [
                    {
                        "name": "addr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "email",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skills",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "avail",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "hourlyRate",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "bio",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "rating",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "peopleRated",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "totalProjectsCompleted",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getNFTsOfDev",
        "inputs": [
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string[]",
                "internalType": "string[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getOpenListings",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Listing[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTotalnftsAwarded",
        "inputs": [
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getWhoBiddedForProject",
        "inputs": [
            {
                "name": "projectId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct Chainskill.Applied[]",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "charges",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "coverLetter",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.DevApplicationStatus"
                    },
                    {
                        "name": "AppliedAt",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getlistedProjectDetail",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct Chainskill.Listing",
                "components": [
                    {
                        "name": "ListingUUID",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "topic",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "skillsReq",
                        "type": "string[]",
                        "internalType": "string[]"
                    },
                    {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "budget",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ListingStatus"
                    },
                    {
                        "name": "devAddr",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "devFees",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "ListedOn",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "difficulty",
                        "type": "uint8",
                        "internalType": "enum Chainskill.ProjectDifficulty"
                    },
                    {
                        "name": "applicantCount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "companyName",
                        "type": "string",
                        "internalType": "string"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "projectIdToCompanyMap",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "registerCompany",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "industry",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "website",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registerDev",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "skills",
                "type": "string[]",
                "internalType": "string[]"
            },
            {
                "name": "avail",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "hourlyRate",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "bio",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "selectBidder",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "devAddr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "charges",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setNftContractAddress",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "terminateAListing",
        "inputs": [
            {
                "name": "projectID",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "companyAddr",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateCompany",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "industry",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "website",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateDev",
        "inputs": [
            {
                "name": "addr",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "avail",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "email",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "skills",
                "type": "string[]",
                "internalType": "string[]"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "bio",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "hourlyRate",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "error",
        "name": "CompanyIsNotRegistered",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DevAddrGivenDidnotAppliedToThisListing",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DevProfileDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "DifficultyWronglySpecified",
        "inputs": []
    },
    {
        "type": "error",
        "name": "FieldsCanNotBeEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ListingCanOnlyBeAssignedOneTime",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ListingIsClosed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PlayTotalAmountToTheFuckingDev",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProfileAlreadyExists",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProfileDoesNotExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProjectIdAlreadyExists",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProjectIdDoesNotExists",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProjectWasNotAssigned",
        "inputs": []
    },
    {
        "type": "error",
        "name": "RatingRangeOutOfBound",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UnAuthorisedAccess",
        "inputs": []
    },
    {
        "type": "error",
        "name": "projectHasBeenAssignedOrFinished",
        "inputs": []
    }
]

export default abi;