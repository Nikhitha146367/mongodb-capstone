// File: capstone_queries.js

// Ensure you are using the correct database
use capstoneDB;

// --- Implement requirements using MongoDB ---

// 1. Find out who and how many students and who do not have location details.
print("\n--- 1. Students with Location Details (Count and List) ---");
db.StudentData.find({
    $or: [
        { Location: { $exists: true, $ne: null, $ne: "" } }
    ]
}).count();
db.StudentData.find({
    $or: [
        { Location: { $exists: true, $ne: null, $ne: "" } }
    ]
}).projection({ StudentId: 1, Location: 1 }).pretty();

print("\n--- 1. Students without Location Details (Count and List) ---");
db.StudentData.find({
    $or: [
        { Location: { $exists: false } },
        { Location: null },
        { Location: "" }
    ]
}).count();
db.StudentData.find({
    $or: [
        { Location: { $exists: false } },
        { Location: null },
        { Location: "" }
    ]
}).projection({ StudentId: 1, Location: 1 }).pretty();


// 2. Update the location as 'Delhi' for the students who do not have location details.
print("\n--- 2. Update Location for Students with Missing Details ---");
// Find documents where Location is null or an empty string, or does not exist
let updateResult = db.StudentData.updateMany(
    {
        $or: [
            { Location: { $exists: false } },
            { Location: null },
            { Location: "" }
        ]
    },
    {
        $set: { Location: "Delhi" }
    }
);
print("Documents Matched: " + updateResult.matchedCount);
print("Documents Modified: " + updateResult.modifiedCount);

// Verify the update (optional)
print("\n--- 2. Verification of Update ---");
db.StudentData.find({ Location: "Delhi" }).pretty();


// 3. How many students are there in each school type. Display total number of students as TotalNumOfStudents alphabetical order of school type.
print("\n--- 3. Total Students by School Type (Alphabetical) ---");
db.StudentData.aggregate([
    {
        $group: {
            _id: "$SchoolType", // Group by SchoolType
            TotalNumOfStudents: { $sum: 1 } // Count documents in each group
        }
    },
    {
        $sort: { _id: 1 } // Sort by SchoolType (alphabetical)
    },
    {
        $project: {
            _id: 0, // Exclude the default _id
            SchoolType: "$_id", // Rename _id to SchoolType
            TotalNumOfStudents: 1
        }
    }
]).pretty();


// 4. How does GPA vary based on gender? Display average GPA as AvgGPA in alphabetical order of gender.
print("\n--- 4. Average GPA by Gender (Alphabetical) ---");
db.StudentData.aggregate([
    {
        $group: {
            _id: "$Gender", // Group by Gender
            AvgGPA: { $avg: "$GPA" } // Calculate average GPA
        }
    },
    {
        $sort: { _id: 1 } // Sort by Gender (alphabetical)
    },
    {
        $project: {
            _id: 0, // Exclude the default _id
            Gender: "$_id", // Rename _id to Gender
            AvgGPA: { $round: ["$AvgGPA", 2] } // Round AvgGPA to 2 decimal places
        }
    }
]).pretty();


// 5. Where are the highest average discipline incidents reported based on school type. Display average discipline incidents as AvgDisciplineIncidents in descending order.
print("\n--- 5. Highest Average Discipline Incidents by School Type (Descending) ---");
db.StudentData.aggregate([
    {
        $group: {
            _id: "$SchoolType", // Group by SchoolType
            AvgDisciplineIncidents: { $avg: "$DisciplineIncidents" } // Calculate average incidents
        }
    },
    {
        $sort: { AvgDisciplineIncidents: -1 } // Sort by AvgDisciplineIncidents (descending)
    },
    {
        $project: {
            _id: 0, // Exclude the default _id
            SchoolType: "$_id", // Rename _id to SchoolType
            AvgDisciplineIncidents: { $round: ["$AvgDisciplineIncidents", 2] } // Round AvgIncidents
        }
    }
]).pretty();


// 6. Export the updated data from the collection into StudentDataS.csv and use it as a data source in PySpark.
print("\n--- 6. Export Updated Data to StudentDataS.csv (External Command) ---");
print("To export the data from the 'StudentData' collection to a CSV file named 'StudentDataS.csv', run the following command in your **Terminal/Command Prompt** (not the MongoDB shell):");
print("\nmongoexport --db capstoneDB --collection StudentData --type=csv --fields StudentId,Location,SchoolType,Gender,GPA,DisciplineIncidents,ParentalCare,SocioEconomicStatus,DropoutRate --out StudentDataS.csv\n");
print("Note: Replace 'capstoneDB' and 'StudentData' if you used different names.");
print("The resulting 'StudentDataS.csv' file can then be used as a data source in PySpark.");