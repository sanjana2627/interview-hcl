import React, { useEffect, useState } from 'react';
import dataJSON from '../Mocks/mock.json';
import dataXML from '../Mocks/mock.xml';
import XMLParser from 'react-xml-parser';

function List() {
    //state values to hold data for each API and merge the data 
    let [jsonData, setJsonData] = useState([]);
    let [xmlData, setXMLData] = useState([]);
    let [overallData, setOverallData] = useState([]);

    useEffect(() => {
        //API to fetch JSON response with 5 secs delay 
        new Promise(resolve => setTimeout(() => resolve(dataJSON), 5000))
            .then(res => {
                setJsonData(res?.person);
            })
        //Mock XML data and conversion of data from XML to JSON 
        fetch(dataXML).then(resp => {
            resp.text().then(xml => {
                let xmlDataArray = [];
                var xml = new XMLParser().parseFromString(xml);
                let dataNodes = xml.children;
                for (let i = 0; i < xml.children.length; i++) {
                    if (dataNodes[i].children !== null &&
                        dataNodes[i].children !== [] &&
                        dataNodes[i].children.length > 0
                    ) {
                        let obj = {};
                        let dataArray = dataNodes[i].children;
                        for(let y = 0; y < dataArray.length; y++) {
                        obj[dataArray[y].name] = dataArray[y].value;
                    }

                    xmlDataArray.push(obj);
                }
            }
            setTimeout(() => setXMLData(xmlDataArray), 10000);
        });
    })}, []);

    useEffect(() => {
        //Merge the data when both API's return the data 
        if(jsonData.length > 0 && xmlData.length > 0) {
            setOverallData([...jsonData, ...xmlData]);
        }
    }, [jsonData, xmlData]);

    return (
        <ul>
            {overallData.sort((a,b) => (a.id - b.id)).map(val => {
                return <li>{val.id} {val.firstName} {val.lastName}</li>
            })}
        </ul>
    );
}

export default List;
