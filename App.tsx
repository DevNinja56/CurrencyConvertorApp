import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
//import {Picker} from '@react-native-picker/picker';
import HttpClients from './config';
import RNPickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const App = () => {
  const [country, setCountry] = useState<String>('');
  const [response, setResponse] = useState<Object>({});
  const [amount, setAmount] = useState<String>('');

  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  var b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
        : '';
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
        : '';
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
        : '';
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
        : '';
    str +=
      n[5] != 0
        ? (str != '' ? 'and ' : '') +
          (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
          'only '
        : '';
    return str;
  }

  useEffect(()=>{
    console.log(inWords(900.00))
  },[])

  const LeftBox = () => {
    return (
      <View style={styles.leftBoxStyle}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={styles.numberStyle}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <TextInput
            placeholder="Enter value"
            placeholderTextColor={'#000'}
            value={amount}
            style={{
              ...styles.numbertextStyle,
              fontSize: 35,
            }}
            textAlign="center"
            onChangeText={text => setAmount(text)}
          />
          {/* <Text
            style={{...styles.numbertextStyle, textAlign: 'center', flex: 1}}>
            5120.08
          </Text> */}
        </View>
        <Text style={styles.textStyle}>US Dollar (USD)</Text>
      </View>
    );
  };

  const RightBox = () => {
    return (
      <View style={styles.rightBoxStyle}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={styles.numberStyle}>
            <Text style={styles.numberText}>2</Text>
          </View>
          <Text
            style={{...styles.numbertextStyle, textAlign: 'center', flex: 1}}>
            {/* {!response ? '' : response.result.toFixed(2)} */}
          </Text>
        </View>
        <RNPickerSelect
          //useNativeAndroidPickerStyle={false}
          placeholder={{
            label: 'Please select the country',
            value: null,
            color: '#000',
          }}
          value={country}
          style={pickerStyle}
          onValueChange={value => {
            console.log('value ==>', value);
            setCountry(value);
            if (amount.length < 0) {
              alert('PLease enter amount');
            } else {
              api('USD', value, amount);
            }
          }}
          items={[
            {
              label: 'Autralian Dollar (AUD)',
              value: 'AUD',
            },
            {
              label: 'Euro',
              value: 'EUR',
            },
          ]}
        />
        {/* <Text style={styles.textStyle}>US Dollar (USD)</Text> */}
      </View>
    );
  };

  const api = async (to, from, amount) => {
    var myHeaders = new Headers();
    myHeaders.append('apikey', 'cwrV0RaJvJw0r4Fqk0Y84bcMz1L5VGFP');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    fetch(
      `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setResponse(result);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.mainContainer}>
      <LeftBox />
      <Text style={{...styles.numbertextStyle, alignSelf: 'center'}}>=</Text>
      <RightBox />
    </View>
  );
};

const pickerStyle = {
  inputIOS: {
    color: '#000',
    //fontFamily: "ProximaNovaSoftW03-Bold",
    fontSize: 18,
    //fontWeight: "normal",
    paddingHorizontal: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
  },
  placeholder: {
    color: '#707070',
    //fontFamily: "ProximaNovaSoftW03-Bold",
    fontSize: 18,
    //fontWeight: "normal",
  },
  inputAndroid: {
    color: '#000',
    //fontFamily: "pnsb",
    fontSize: 18,
    //fontWeight: "normal",
    paddingHorizontal: 10,
    //backgroundColor: 'red',
    borderRadius: 5,
  },
  modalViewBottom: {
    backgroundColor: 'white',
  },
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  leftBoxStyle: {
    marginTop: windowHeight * 0.02,
    justifyContent: 'space-between',
    padding: windowWidth * 0.05,
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.18,
    backgroundColor: '#b3c6e7',
    borderColor: '#8eaadc',
    borderWidth: 1.5,
    borderTopLeftRadius: windowWidth * 0.06,
  },
  rightBoxStyle: {
    marginTop: windowHeight * 0.02,
    justifyContent: 'space-between',
    padding: windowWidth * 0.05,
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.18,
    backgroundColor: '#b3c6e7',
    borderColor: '#8eaadc',
    borderWidth: 1.5,
    borderTopRightRadius: windowWidth * 0.06,
  },

  numberText: {
    fontSize: windowWidth * 0.06,
    color: 'white',
  },
  numbertextStyle: {
    fontSize: windowWidth * 0.08,
    color: 'black',
  },
  textStyle: {
    fontSize: windowWidth * 0.05,
    color: 'black',
  },
  numberStyle: {
    backgroundColor: '#ed7d31',
    borderColor: '#2e518e',
    borderWidth: 1.5,
    width: windowWidth * 0.13,
    height: windowWidth * 0.13,
    borderRadius: (windowWidth * 0.13) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -windowWidth * 0.1,
  },
  dropDownStyle: {
    fontSize: windowWidth * 0.05,
    color: 'black',
  },
});

export default App;
