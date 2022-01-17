fs = require("fs");

function getKeyByValue(object, value) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === value) return prop;
        }
    }
}

function get_image(params){
    path = params
    str = fs.readFileSync(path,"utf-8")
    start = str.indexOf("<img src")
    end = str.indexOf(".png")
    src = "http://localhost:8000/"+str.slice(start+10,end+4)
    return src;
}

function get_heading(params) {
    path = params
    str = fs.readFileSync(path,"utf-8")
    start = str.indexOf("<h1")
    end = str.indexOf("</h1>")
    heading = str.slice(start+40,end)
    return heading
}

function get_latest() {
    var dir = "C:/Users/Manjunath D/Desktop/WebTech Mini project/app/data/";

    var files = fs.readdirSync(dir);
    array = new Object();
    files.forEach((element) => {
        creation_date = fs.statSync(dir + element).birthtime.getTime();
        array[element] = creation_date;
    });
    keysSorted = Object.values(array);
    Sorted = keysSorted.sort();
    sortedArray = new Array();

    for (let i = 0; i < Sorted.length; i++) {
        sortedArray[i] =
            "C:/Users/Manjunath D/Desktop/WebTech Mini project/app/data/" + getKeyByValue(array, Sorted[i]);
    }
    sortedArray3 = new Array();
    sortedArray4 = new Array();

    final_data =new Object()
    for (let i = 0; i < sortedArray.length; i++) {
    sortedArray3[i] = get_heading(sortedArray[i])
    sortedArray4[i] = get_image(sortedArray[i])

    }
    // return final_data;
    for (let i = 0; i < sortedArray.length; i++) {
        sortedArray[i] = "http://localhost:8000/html/" + getKeyByValue(array, Sorted[i]);
        final_data[sortedArray[i]] = [sortedArray3[i],sortedArray4[i]]
        }
    return final_data
}


function create_json()
{json = JSON.stringify(get_latest())
fs.writeFileSync("C:/Users/Manjunath D/Desktop/WebTech Mini project/Blogger/source/Json/latest_html.json",json,() =>{
    console.log("done")
})}

module.exports = {create_json}

