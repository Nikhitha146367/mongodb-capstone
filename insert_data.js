// File: insert_data.js

// 1. Connect to the database (replace 'capstoneDB' with your database name)
use capstoneDB;

// Drop the collection if it exists to ensure a clean start
db.StudentData.drop();

// 2. Insert sample data into the 'StudentData' collection
// IMPORTANT: Replace this sample data with your actual data from StudentData2.txt
db.StudentData.insertMany([
    {
        StudentId: 101,
        Location: "Delhi", // Should be 'Dehli' as per the update requirement to be fixed later
        SchoolType: "Public",
        Gender: "Male",
        GPA: 3.5,
        DisciplineIncidents: 2,
        ParentalCare: "High",
        SocioEconomicStatus: "Middle",
        DropoutRate: 0.05
    },
    {
        StudentId: 102,
        Location: "Mumbai",
        SchoolType: "Private",
        Gender: "Female",
        GPA: 3.9,
        DisciplineIncidents: 1,
        ParentalCare: "High",
        SocioEconomicStatus: "High",
        DropoutRate: 0.02
    },
    {
        StudentId: 103,
        Location: null, // This student has no location details
        SchoolType: "Public",
        Gender: "Male",
        GPA: 2.1,
        DisciplineIncidents: 5,
        ParentalCare: "Low",
        SocioEconomicStatus: "Low",
        DropoutRate: 0.15
    },
    {
        StudentId: 104,
        Location: "Bangalore",
        SchoolType: "Private",
        Gender: "Female",
        GPA: 3.2,
        DisciplineIncidents: 0,
        ParentalCare: "Medium",
        SocioEconomicStatus: "Middle",
        DropoutRate: 0.03
    },
    {
        StudentId: 105,
        Location: "", // This student also has no location details (empty string)
        SchoolType: "Charter",
        Gender: "Female",
        GPA: 3.8,
        DisciplineIncidents: 1,
        ParentalCare: "High",
        SocioEconomicStatus: "High",
        DropoutRate: 0.01
    }
    // Add all your data here
]);

print("Sample Data Insertion Complete.");