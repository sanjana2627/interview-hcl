import React, { useEffect, useState } from 'react';
import dataJSON from '../Mocks/mock.json';
import dataXML from '../Mocks/mock.xml';
import JsonData, { convertXMLToJSON, numericObjectSort } from './common-utility';

function List() {
    //state values to hold data for each API and merge the data 
    let [jsonData, setJsonData] = useState([]);
    let [xmlData, setXMLData] = useState([]);
    let [overallData, setOverallData] = useState([]);

    useEffect(() => {
        //API to fetch xml converted JSON response 
        fetch(dataXML).then(resp => resp.text()
            .then(xml => setTimeout(() => setXMLData(convertXMLToJSON(xml)), 10000)));
        //API to fetch JSON response
        JsonData(dataJSON, 5000).then(res => setJsonData(res?.person))

        }, []);

    useEffect(() => {
        //Merge the data when both API's return the data 
        if(jsonData.length > 0 && xmlData.length > 0) {
            setOverallData([...jsonData, ...xmlData]);
        }
    }, [jsonData, xmlData]);

    return (
        <ul>
            {numericObjectSort(overallData, 'id').map(val => {
                return <li key={val.id}>{val.id} {val.firstName} {val.lastName}</li>
            })}
        </ul>
    );
}

export default List;
