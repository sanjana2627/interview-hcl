import XMLParser from 'react-xml-parser';

//API to fetch JSON response with n secs delay 
export default function JsonData(data, duration) {
    return new Promise(resolve => setTimeout(() => resolve(data), duration))
}

//converts XML to JSON
export function convertXMLToJSON(xmlData) {
    let xmlDataArray = [];
    var xml = new XMLParser().parseFromString(xmlData);
    let dataNodes = xml.children;
    for (let i = 0; i < xml.children.length; i++) {
        if (dataNodes[i].children !== null &&
            dataNodes[i].children !== [] &&
            dataNodes[i].children.length > 0
        ) {
            let obj = {};
            let dataArray = dataNodes[i].children;
            for (let y = 0; y < dataArray.length; y++) {
                obj[dataArray[y].name] = dataArray[y].value;
            }

            xmlDataArray.push(obj);
        }
    }
    return xmlDataArray;
}

export function numericObjectSort(dataArray, property) {
    return dataArray.sort((a,b) => (a[property] - b[property]))
}