import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';
import Style from './../style';

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    let {text} = e.nativeEvent;
    this.setState({...this.state, value: text});
    if (typeof this.props.onCellChange === 'function') {
      const {
        column,
        row,
        input
      } = this.props;
      this.props.onCellChange(text, column, row, input);
    }
  }

  render() {
    const {
      value,
      input,
      editable,
      borderStyle,
      customStyles,
      height,
      width,
      index,
      span
    } = this.props;

    const columnStyle = [
      Style.cell,
      borderStyle,
      customStyles.cell,
      {height: height}
    ];

    if (span) {
      const paddingLR = 2 * span;
      columnStyle.push({paddingLeft: paddingLR, paddingRight: paddingLR})
    }

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

    if (index === 0) {
      columnStyle.push({alignItems: 'flex-start'});
    }

    return (
      <View style={columnStyle}>
        <Text style={Style.cellText}>{value}</Text>
      </View>
    );
  }
}

export default Cell;
