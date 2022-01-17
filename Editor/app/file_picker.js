fs = require("fs");

function getKeyByValue(object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value) return prop;
        }
    }
}

function get_latest() {
    var dir = "C:/Users/Manjunath D/Desktop/Web Mini project/app/public/images/";

    var files = fs.readdirSync(dir);
    array = new Object();
    files.forEach((element) => {
        creation_date = fs.statSync(dir + element).birthtime.getTime();
        array[element] = creation_date;
    });
    keysSorted = Object.values(array);
    Sorted = keysSorted.sort();
    sortedArray = new Array();
    sortedArrayPath = new Array();
    for (let i = 0; i < Sorted.length; i++) {
        sortedArray[i] = getKeyByValue(array, Sorted[i]);
        sortedArrayPath[i] = "C:/Users/Manjunath D/Desktop/Web Mini project/app/public/images/" + sortedArray[i];
    }
    final_data =new Object()
    for (let i = 0; i < sortedArray.length; i++) {
        final_data[sortedArray[i]] = sortedArrayPath[i]
    }
    return final_data;
}

function create_json()
{json = JSON.stringify(get_latest())
fs.writeFileSync("C:/Users/Manjunath D/Desktop/Web Mini project/Blogger/source/Json/latest_images.json",json,() =>{
    console.log("done")
})}

create_json()