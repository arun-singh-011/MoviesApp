import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
const Dropdown = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          style={styles.picker}
          onValueChange={(value) => onValueChange(value)}
          items={options}
        />
      </View>
      {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        {options.map((option) => (
          <Picker.Item
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </Picker> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '50%',
    borderColor: 'black',
    color: 'black',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: '50%',
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'gray',
    borderWidth: 1,
  },
  // picker: {
  //   height: 200,

  //   width: '100%',
  //   border
  // },
});

export default Dropdown;
