const fs = require("fs");
const { execSync } = require("child_process");

// Define the directory containing the .proto files
const protoDirectory = "./src/protos";
const genDirectory = "./src/gen";

// Get a list of all .proto files in the directory
const protoFiles = fs
  .readdirSync(protoDirectory)
  .filter((file) => file.endsWith(".proto"));

// Loop through each .proto file and generate the JavaScript code
protoFiles.forEach((protoFile) => {
  const protoFilePath = `${protoDirectory}/${protoFile}`;
  const outputFileName = protoFile.replace(".proto", ".js");
  const outputFilePath = `${genDirectory}/${outputFileName}`;

  try {
    // Use the pbjs command to compile the .proto file
    execSync(`npx pbjs --es5 ${outputFilePath} ${protoFilePath}`);
    console.log(`Generated ${outputFileName}`);
  } catch (error) {
    console.error(`Error generating ${outputFileName}: ${error.message}`);
  }
});
