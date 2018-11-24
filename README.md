# react-native-editable-list
Editable Table Component with vertical scrolling in React native

## Install

```bash
npm install react-native-editable-list --save
```

| ![iOS](https://github.com/jacob-hyde/react-native-editable-table/raw/master/images/Simulator%20Screen%20Shot%20-%20iPhone%20X%20-%202018-11-23%20at%2018.41.00.png "iOS")  |  ![Android](https://github.com/jacob-hyde/react-native-editable-table/raw/master/images/Screenshot_1543028834.png "Android") |
| ------------ | ------------ |


### Usage

```javascript
import EditableTable from 'react-native-editable-table';

class editabletable extends Component{

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <EditableTable
          columns={[
            {value: 'Col 1', input: 'c1', width: 20, sortable: true, defaultSort: 'ASC', reorder: 				true},
            {value: 'Col 2', input: 'c2', width: 20, sortable: false, editable: true, reorder: 					true},
            {value: 'Col 3', input: 'c3', width: 30, sortable: false, editable: true},
            {value: 'Col 4', input: 'c4', width: 30, sortable: true},
          ]}
          values={[
            [10, 'test', 23, ':)'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [30, {value: 'Extra Editable Rows', span: 2}, 'Dang'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [20, {value: 'Edit Me', editable: true}, {value: 45}, 'haha'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)'],
            [10, 'test', 23, ':)']
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
  table: {
    flex: 1,
    marginBottom: 30
  }
});
```
Check out  [index.js](https://github.com/jacob-hyde/react-native-editable-table/blob/master/index.js "index.js")

### Properties

|  Prop |  Default | Type  | Description  |
| ------------ | ------------ | ------------ | ------------ |
| Style  | - | `object` | Specify the style of the Table, eg. width, height...  |
| columns | - | `array`  | Specify your table headers. Example: `{value: 'Col 4', input: 'c4', width: 30, editable: true}`. Properties: Value, Input name if editable, width in %, editable  |
| values | [] | `Array` | The values of your table. Each object represents a row. Example: `[20, {value: 'Edit Me', editable: true}, {value: 45}, 'foo']`. Properties: Value, Editable |
| emptyRows | 1 | `number` | Specify the amount of extra rows you want at the end of the table |
| cellHeight | 40 | `number` | The height of the cells |
| onCellChange | - | `function` | The callback when a cell changes values if it is editable. Return values are: value, column, row, unique_id. The unique_id is the column input name-rowIndex-columnIndex |
| onColumnChange | - | `function` | The callback when a header column is changed. Return values are: value, old value, new value |
| customStyles | - | `object` | Custom styles to override. See style.js |
| borders | false | `bool` | If you want borders on the table body or not |
| headerBorders| false | `bool` | if you want borders on the table headers or not |
