/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const thousands_separators = num =>
{
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}
const App = () => {

  const [result, setResult] = React.useState('Result')
  const [calc, setCalc] = React.useState('0')
  const isDarkMode = useColorScheme() === 'dark';

  const validateInput = () => {
    let lastChar = calc.toString().split('').pop()
    if(ops.indexOf(lastChar) != -1) return false
    return true
  }
  const calculate = () => {
    validateInput() && setResult(eval(calc))
    
  }
  const buttonPressed = val =>{
    setCalc(prevCalc => {
      if(val == '='){
        calculate()
        return prevCalc
      }
      else if(prevCalc.length < 2 && prevCalc == '0'){
        return val
      }
      else if(val == '0' && prevCalc.length > 1 && prevCalc == '00'){
        return '0'
      }
      else{
        if(prevCalc.toString().startsWith('.')){
          return '0' + prevCalc.toString() + val.toString()
        }
        return prevCalc.toString() + val.toString()
      }
    })
  }
  const deleteItem = () => {
    setCalc(prevCalc => {
      if(prevCalc == '0' && prevCalc.length < 2){
        return '0'
      }
      else if(prevCalc.length < 2){
        return '0'
      }
      else{
        let range = prevCalc.length
        return prevCalc.toString().slice(0, range-1)
      }
    })
  }
  const operationKey = key => {
    switch(key){
      case 'del':
        deleteItem()
        break;
      default:
      setCalc(prevCalc => {
       let lastChar = prevCalc.toString().split('').pop()
      if(ops.indexOf(lastChar) != -1) return prevCalc
        return prevCalc + `${key}`
      })
    }
  }
  let rows = []

  let values = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, '.', '=']]
  for(let i=0; i< 4; i++){
    let row = []
    for(let j=0; j< 3; j++){
      row.push(<TouchableOpacity onPress={() => buttonPressed(values[i][j])} key={(j+i).toString()} style={styles.btn}>
                <Text style={styles.btnText}>{values[i][j]}</Text>
              </TouchableOpacity>
        )
    }
    rows.push(<View key={i.toString()} style={styles.row}>{row}</View>)
  }
  var ops = ['+', '-', '*', '/', 'del']
  let operands = []
  for(let i=0; i< 5; i++){
    operands.push(<TouchableOpacity onPress={()=> operationKey(ops[i])} key={(i).toString()} style={styles.btn}>
                  <Text style={[styles.btnText, styles.white]}>{ops[i]}</Text>
                </TouchableOpacity>
      )
  }
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
      <View style={styles.container}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = 'black' translucent={false} />
          <View style={styles.result}>
            <Text style={styles.resultText}> {result ? thousands_separators(result) : result}</Text>
          </View>
          <View style={styles.calculation}>
              <Text style={styles.calculationText}>{calc}</Text>
              <Text style={styles.signature}>i-wizard calculator</Text>
          </View>
          <View style={styles.buttons}>
              <View style={styles.numbers}>
                {rows}
                
              </View>
              <View style={styles.operations}>
                {operands}
              </View>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  result:{
    marginTop:Platform.os == 'ios' ? 10 : 0,
    flex:1,
    justifyContent:'center',
    alignItems:"flex-end",
    backgroundColor:'#fff'
  },
  resultText:{
    color:'gray',
    fontSize:30,
    marginRight:10,
    fontWeight:'bold'
    
  },
  calculationText:{
    fontSize:17,
    marginRight:10,
    color:"gray"
  },
  calculation:{
    flex:2,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:"flex-end",
  },
  buttons:{
    flex:7,
    flexDirection:'row'
  },
  btn:{
    flex:1,
    alignItems:"center",
    alignSelf:"stretch",
    justifyContent:'center'
  },
  numbers:{
    flex:3,// make view as flex so that u can divide the screen horizontally
    backgroundColor:'orange'
  },
  operations:{
    flex:1,
    justifyContent:'space-around',
    alignItems:"stretch",
    backgroundColor:'black'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:"space-around",
    alignItems:"center"
  },
  btnText:{
    fontSize:30
  },
  white:{
    color:'#fff'
  },
  signature:{alignSelf:'center', 
    color:'#000', 
    marginBottom:5, 
    fontSize:12, 
    fontWeight:'bold',
    position:'absolute',
    bottom:0,
    left:10,
    fontWeight:'bold'
  }
});

export default App;
// {
//   <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//        <Text>Hello World</Text>
//         <Button title="button" onPress={() => printOut()} color="blue"/>
//         <TextInput ref={input => setText(input)}/>
//       </ScrollView>
// }