const fs = require('fs');
const path = require('path');

const imagesDirName = 'images';

function getAllFileNames(dir) {
    let fileNames = [];
    try {
        fileNames = fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((item) => !item.isDirectory())
            .map((item) => item.name);
    } catch (err) {
        console.log(
            'error occurred while getting all filenames form directory: ',
            err
        );
    }
    return fileNames;
}

// renames the images in a given folder to hexadecimal sequence eg: 1,2,3,4,5,6,7,8,9,a,b etc
function main() {
    const imagesDir = path.resolve(__dirname, '..', imagesDirName);
    let fileNames = getAllFileNames(imagesDir);
    console.log('No. of files => ', fileNames.length);
    console.log('Filenames: ', fileNames);
    let counter = 1;
    let common = 0;
        let rare = 0;
        let epic = 0;
        let legendary = 0;
        let num;

    // get filenames without extension
    fileNames = fileNames.map((fileName) => path.parse(fileName).name);

    // In first pass we prepend filenames with hexString separated by comma
    // we do this to avoid overriding filenames already in hexadecimal format
    fileNames.map((fileName) => {
    
        let nospace = fileName.split(" ");
        console.log(nospace);
        let batch = nospace[0];
        console.log(batch)
        let first = nospace[1];
        console.log(first);
        let name;
        

        
        if(first == "Common"){
            common++;
            num = common;
            name = "a";
            console.log(num);
        }

        else if(first == "Rare"){
            rare++;
            name = "b";
            num = rare;
        }

        else if(first == "Epic"){
            epic++;
            name = "c";
            num = epic;
        }

        else if(first == "Legendary"){
            legendary++;
            name = "d";
            num = legendary;
        }

        try {
            const hexString = parseInt(counter, 10).toString(16);
            fs.renameSync(
                `${imagesDir}/${fileName}.gif`,
                `${imagesDir}/${batch}_${name}_${num}_.gif`
            );
            counter++;
        } catch (err) {
            console.log(
                'error ocurred while adding hexString to the beginning of filenames: ',
                fileName
            );
            throw err;
        }
    });
    counter = 1;
    // in second pass we actually rename files to hexString
    // fileNames.map((fileName) => {
    //     let nounder = fileName.split("_");
    //     let name = nounder[4];
    //     console.log("Hello buddy")
    //     try {
    //         const hexString = parseInt(counter, 10).toString(16);
    //         fs.renameSync(
    //             `${imagesDir}/${hexString}_${first}.gif`,
    //             `${imagesDir}/${name}.gif`
    //         );
    //         console.log(
    //             `rename successful for file: ${fileName}.gif to ${hexString}.gif`
    //         );
    //         counter++;
    //     } catch (err) {
    //         console.log('error ocurred while renaming file: ', fileName);
    //         throw err;
    //     }
    // });
    console.log('All files renamed successfully in images directory');
}

main();
