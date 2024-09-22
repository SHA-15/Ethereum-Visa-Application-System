export const consulateKeys = ["USA", "AUS", "NZ", "BEL", "UAE", "UK", "ESP", "FR"];

export const fetchVerificationStatus = (status) => {
    status = Number(status);
    switch (status) {
        case 0:
            return "Processing";
        case 1:
            return "Verified";
        case 2:
            return "Unverified";
        case 3:
            return "Rejected";
        default:
            return "Unknown";
    }
}

export const enumerateVerificationStatus = (status) => {
    switch (status) {
        case "Processing": 
            return 0;
        case "Verified": 
            return 1;
        case "Unverified":
            return 2;
        case "Rejected":
            return 3;
        default:
            return -1;
    }
}

export const fetchDocumentType = (type) => {
    type = Number(type);
    switch (type) {
        case 0:
            return "Educational";
        case 1:
            return "Financial";
        case 2:
            return "Personal";
    }
}

export const enumerateDocumentType = (type) => {
    switch (type) {
        case "Educational":
            return 0;
        case "Financial":
            return 1;
        case "Personal":
            return 2;
    }
}

export const fetchSex = (sex) => {
    sex = Number(sex);
    switch (sex) {
        case 0:
            return "Male";
        case 1:
            return "Female";
        case 2:
            return "Other";
        default:
            return "Unknown"
        }
}

export const enumerateSex = (sex) => {
    switch (sex) {
        case "Male": 
            return 0;
        case "Female": 
            return 1;
        case "Other": 
            return 2;
        default: 
            return -1;
    }
}

export const fetchCountry = (country) => {
    country = Number(country);
    switch (country) {
        case 0:
            return "USA";
        case 1:
            return "AUS";
        case 2:
            return "NZ";
        case 3:
            return "BEL";
        case 4:
            return "UAE";
        case 5:
            return "UK";
        case 6:
            return "ESP";
        case 7:
            return "FR";
        default:
            return -1;
    }
}

export const enumerateCountry = (countryCode) => {
    switch (countryCode) {
        case "USA":
            return 0;
        case "AUS":
            return 1;
        case "Nz":
            return 2;
        case "BEL":
            return 3;
        case "UAE":
            return 4;
        case "UK":
            return 5;
        case "ESP":
            return 6;
        case "FR":
            return 7;
        default:
            return -1;
    }
}

export const fetchVisaStatus = (visaStatus) => {
    visaStatus = Number(visaStatus);
    switch (visaStatus) {
        case 0:
            return "Draft";
        case 1:
            return "Submitted";
        case 2:
            return "Approved";
        case 3:
            return "Rejected";
        default:
            return "Unknown";
    }
}

export const fetchVisaType = (visaType) => {
    visaType = Number(visaType);
    switch(visaType) {
        case 0:
            return "Tourist";
        case 1:
            return "Business";
        case 2:
            return "Work";
        case 3:
            return "Student";
        case 4:
            return "Transit";
        default:
            return -1;
    }
}

export const enumerateVisaType = (visaType) => {
    switch (visaType) {
        case "Tourist":
            return 0;
        case "Business":
            return 1;
        case "Work":
            return 2;
        case "Student":
            return 3;
        case "Transit":
            return 4;
        default:
            return -1;
    }
}