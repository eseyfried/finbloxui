import fs from 'node:fs';
import path from 'node:path';

const getAllFiles = function(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })
  
    return arrayOfFiles
}
const files = getAllFiles("./src/components");

const components = files.filter((file) => {
    return file.indexOf("__tests__") == -1 && file.indexOf(".vue") !== -1;
}).map((file) => {
    return file.replace("src", "..")
});

let content = "";
const componentNames = []
components.forEach(component => {
    const componentName = path.basename(component, ".vue");
    componentNames.push(componentName);
    content += `import ${componentName} from "${component}";\n`;
});

content += `export {\n    ${componentNames.join(",\n    ")}\n}\n`;
console.log("Building components manifest for exporting...")
try {
  fs.writeFileSync('./src/lib/components.js', content);
  // file written successfully
} catch (err) {
  console.error(err);
}