const fs = require('fs');
const mkdirp = require('mkdirp');
const inputDir = './input';
const outputDir = './output';
mkdirp.sync(inputDir);
mkdirp.sync(outputDir);

const readInput = () => {
let inputFileName = 'input.txt';    
const inputFile = `${inputDir}/${inputFileName}`;
console.log(inputFile);
let inputObjArray=[];
fs.readFile(inputFile,'utf8',(err,data)=>{
    if (err) throw err;

    let inputData = data.split('\n');
    for(let record of inputData){
      if(record != ""){  
     let obj={};
     let recordArr = record.split(',');
     obj.EmployeeID = recordArr[0];
     obj.Name = recordArr[1];
     obj.Department = recordArr[2];
     obj.Salary = recordArr[3];
     inputObjArray.push(obj);
    }
  }
  let result = inputObjArray.reduce(function(prv,cur){  
    prv[cur.Department+'_Id'] =(prv[cur.Department+'_Id'] || cur.EmployeeID);
    prv[cur.Department] =(prv[cur.Department] || cur.Salary);
    prv[cur.Department] =cur.EmployeeID>prv[cur.Department+'_Id'] ? cur.Salary:prv[cur.Department];
    prv[cur.Department+'_Id'] =cur.EmployeeID>prv[cur.Department+'_Id'] ? cur.EmployeeID:prv[cur.Department+'_Id'];
    return prv
},{})
let outputString ="";
for (const [key, value] of Object.entries(result)) {
    if(key.indexOf('Id') == -1){
        outputString +=  `${key}: ${value}\n`
    }
  }
  console.log(outputString)
let outputFileName = 'output.txt';    
const outputFile = `${outputDir}/${outputFileName}`;
fs.writeFile(outputFile, outputString, 'utf8',(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})
}
readInput()