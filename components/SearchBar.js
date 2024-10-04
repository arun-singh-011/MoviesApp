import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import React from 'react';

const SearchBar = ({ query, onChangeText, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search for a movie</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={onChangeText}
        placeholder='e.g. The Godfather'
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={onSubmit}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  button: {
    backgroundColor: 'skyblue',
    color: 'white',
    padding: 8,
    width: '50%',
    marginTop: 10,
    fontSize: 16,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    padding: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default SearchBar;
