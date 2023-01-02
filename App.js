import {View, Text, TextInput, Button, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import * as RNFS from 'react-native-fs';
import {jsonToCSV} from 'react-native-csv';

export default function App() {
  const [msgData, setMsg] = useState(0);
  const [msgData1, setMsg1] = useState(0);
  const [msgDataArray, setMsgArray] = useState([]);
  const [initData, setInitData] = useState(0);
  const [mytime, setMytime] = useState(0);
  const [recordState, setRecordState] = useState(false);

  //   const interval = setInterval(() => {
  //     console.log('This will be called every 2 seconds');
  //     incrementFunc()
  //   }, 1000);

  useEffect(() => {
    let myInterval;
    if (recordState) {
      myInterval = setInterval(() => {
        setMytime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!recordState) {
      clearInterval(myInterval);
      setMytime(0)
    }
    return () => clearInterval(myInterval);
  }, [recordState]);

  useEffect(() => {
    if (recordState) {
      incrementFunc();
    }
  }, [mytime]);

  function incrementFunc() {
    setMsg(msgData + 1);
    setMsg1(msgData + 10);
    setMsgArray([
      ...msgDataArray,
      `{"time": "${mytime}", "data": "${msgData}", "data1": "${msgData1}"}`,
    ]);
    console.log(msgDataArray[msgDataArray.length-1] + `${msgDataArray.length}`);
    // setInitData(initData + 1);
  }

  const writeFile = () => {
    var path = RNFS.ExternalDirectoryPath + `/data-running.txt`;
    RNFS.writeFile(path, jsonToCSV(`[${msgDataArray}]`), 'utf8')
      .then(() => {
        setMsgArray([])
        console.log('FILE WRITTEN!');
        console.log(RNFS.ExternalDirectoryPath);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <View>
      <Text>Time Record: {mytime}</Text>
      <Text>Data: {msgData}</Text>
      <Text>Data 1: {msgData1}</Text>

      <Button title="Press me" onPress={() => incrementFunc()} />
      <Button title="Save File" onPress={() => writeFile()} />

      {!recordState ? (
        <Button title="Record" onPress={() => setRecordState(true)} />
      ) : (
        <Button title="Stop Record" onPress={() => setRecordState(false)} />
      )}
    </View>
  );
}
