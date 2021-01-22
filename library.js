const fs = require('fs');
const Papa = require('papaparse');
var dict = {};
function loadDictionary() {
    const file1 = fs.createReadStream('live/merged.csv');
    var count = 0; // cache the running count

    Papa.parse(file1, { //first file, contains county info
        worker: true, // Don't bog down the main thread if its a big file
        step: function (results) {
            dict[`${results.data[1]}, ${results.data[2]}`] = results.data;
            count++;
        },
        complete: function (results) {
            console.log("1: " +count);
            
            const file2 = fs.createReadStream('live/SHEET1.csv');
            Papa.parse(file2, { //second file, contains district info
                worker: true, // Don't bog down the main thread if its a big file
                step: function (results) {
                    dict[`${results.data[14]} ${results.data[3]}`] = results.data;
                    count++;
                },
                complete: function (results) {
                    console.log("2: " +count);
                    const jsonString = JSON.stringify(dict);
                    fs.writeFile('./dictionary.json', jsonString, err => {
                        if (err) {
                            console.log('Error writing file', err)
                        } else {
                            console.log('Successfully wrote file')
                        }
                    })
                }
            });
        }
    });
}
loadDictionary();