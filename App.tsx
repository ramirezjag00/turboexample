import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Pressable
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';
import { useEffect, useState } from 'react';

const EMPTY = '<empty>';
const STORAGE_KEY = 'myKey';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [value, setValue] = useState<string | null>(null);

  const [editingValue, setEditingValue] = useState<
    string | null
  >(null);

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem(STORAGE_KEY);
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, STORAGE_KEY);
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem(STORAGE_KEY);
    setValue('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.text}>
        Current stored value is: <Text style={styles.value}>{value ?? 'No Value'}
      </Text></Text>
      <TextInput
        defaultValue={value ?? ''}
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Pressable onPress={saveValue} style={styles.button}>
        <Text style={styles.buttonLabel}>Save</Text>
      </Pressable>
      <Pressable onPress={deleteValue} style={styles.button}>
        <Text style={styles.buttonLabel}>Delete</Text>
      </Pressable>
      <Pressable onPress={clearAll} style={styles.button}>
        <Text style={styles.buttonLabel}>Clear</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor:'rgb(54, 108, 224)',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    color:'rgb(6, 171, 253)',
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor:'rgb(126, 126, 126)',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
