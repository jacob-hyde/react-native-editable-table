import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import Style from './../style';

class Column extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.value
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    let {text} = e.nativeEvent;
    this.setState({...this.state, value: text});
    const oldVal = {...this.props.column};
    this.props.column.value = text;
    if (typeof this.props.onColumnChange === 'function') {
      this.props.onColumnChange(text, oldVal, this.props.column);
    }
  }

  render() {
    const {
      value,
      input,
      sortable,
      editable,
      borderStyle,
      customStyles,
      height,
      width,
      index
    } = this.props;

    const columnStyle = [
      Style.cell,
      Style.column,
      borderStyle,
      customStyles.cell,
      customStyles.column,
      {height: height}
    ];


    if (width) {
      columnStyle.push({flex: width});
    }

    if (editable) {
      const cellStyle = [
        Style.cellInput,
        customStyles.cellInput,
      ];
      if (index === 0) {
        cellStyle.push({textAlign: 'left'});
      }
      return (
        <View style={columnStyle}>
          <TextInput
            value={this.state.value}
            onChange={this.onChangeText}
            style={cellStyle}
            onFocus={() => this.setState({...this.state, isEditing: true})}
            onBlue={() => this.setState({...this.state, isEditing: false})}
          />
        </View>
      );
    }

    const columnText = [
      Style.columnText,
      customStyles.columnText
    ];

    if (index === 0) {
      columnStyle.push({alignItems: 'flex-start'});
    }
    return (
      <View style={columnStyle}>
        <Text style={columnText}>{value}</Text>
      </View>
    );
  }
}

export default Column;
