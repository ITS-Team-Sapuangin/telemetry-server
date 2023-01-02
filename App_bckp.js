import {View, Text, TextInput, Button, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

const ws = new WebSocket('ws://sapang-tele.azurewebsites.net');

export default function App() {
  const [msgData, setMsg] = useState();
  const [serverMsg, setServerMsg] = useState();
  const [connectionStatus, setStatus] = useState();

  useEffect(() => {
    const serverMessagesList = [];

    ws.onopen = () => {
      console.log('Connected to Server');
      setStatus('Connected to Server');
    };
    ws.onclose = e => {
      console.log('Disconnected. Check internet or server.');
      setStatus(false);
    };
    ws.onerror = e => {
      console.log(e.message);
    };
    ws.onmessage = e => {
      console.log('Server Messages');
      setServerMsg(e.data);
    };
  }, []);

  const submitMessage = () => {
    ws.send(`{"message":"${msgData}"}`);
    setMsg('');
  };

  const sendData = () => {
    Alert.alert('Simple Button pressed');
  };

  return (
    <View>
      <Text>Status: {connectionStatus}</Text>
      <TextInput
        style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
        onChangeText={setMsg}
        value={msgData}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />

      <Button title="Press me" onPress={() => submitMessage()} />

      <Text> Server Messages: {serverMsg}</Text>
    </View>
  );
}
