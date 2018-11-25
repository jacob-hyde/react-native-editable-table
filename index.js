import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  SafeAreaView
} from 'react-native';
import EditableTable from './editabletable.js';

class editabletable extends Component{


  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => {console.log('onStartShouldSetPanResponder'); return true;},
      onMoveShouldSetPanResponder: (e) => {console.log('onMoveShouldSetPanResponder'); return true;},
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to react-native-editable-table example!
        </Text>
        <EditableTable
          columns={[
            {value: 'Col 1', input: 'c1', width: 25, sortable: true, defaultSort: 'ASC', reorder: true},
            {value: 'Col 2', input: 'c2', width: 25, sortable: false, editable: true, reorder: true},
            {value: 'Col 3', input: 'c3', width: 25, sortable: false, editable: true},
            {value: 'Col 4', input: 'c4', width: 25, sortable: true},
            {value: 'Col 5', input: 'c5', width: 25, sortable: true}
          ]}
          values={[
            [10, 'test', 23, ':)', 'horizontal'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha', 90],
            [30, {value: 'Span Me', span: 2}, 'Dang', 'Column 5']
          ]}
          emptyRows={2}
          onCellChange={(value, column, row, unique_id) => {
            console.log(`Cell Change on Column: ${column} Row: ${row}
                        and unique_id: ${unique_id}`);
          }}
          onColumnChange={(value, oldVal, newVal) => {
            console.log(`Column Change. Old Value: ${oldVal} New Value: ${newVal}`)
          }}
          customStyles={{

          }}
          style={styles.table}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  table: {
    flex: 1,
    marginBottom: 30
  }
});

AppRegistry.registerComponent('editabletable', () => editabletable);
