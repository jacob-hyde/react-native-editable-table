import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Style from './style';

import Column from './lib/Column';
import Cell from './lib/Cell';

class EditableTable extends React.Component{

  constructor(props){
    if (props.emptyRows) {
      super(props);
      const emptyCol = {value: '', editable: true};
      for (let i = 0; i < props.emptyRows; i++) {
        const emptyRow = new Array(4).fill({...emptyCol}, 0, this.props.columns.length);
        this.props.values.push(emptyRow);
      }
    }
    const sortIndex = props.columns.findIndex(c => c.hasOwnProperty('defaultSort') === true);
    this.state = {
      sort: sortIndex !== undefined ? props.columns[sortIndex].defaultSort : null,
      sortColumnIndex: sortIndex !== undefined ? sortIndex : null,
      rows: props.values.length
    };


    let columnWidths = props.columns.map(c => c.width);
    this.state.widths = this._calculateCellWidths(columnWidths);

  }

  createColumns(columns) {
    return columns.map((c, i) => {
      let borders = {};
      if (this.props.headerBorders) {
        borders = this._createBorderStyles(i, columns.length);
      }
      return (
        <Column
          {...c}
          key={c.input}
          column={c}
          index={i}
          customStyles={this.props.customStyles}
          borderStyle={borders}
          onColumnChange={this.props.onColumnChange}
          height={this.props.cellHeight}
          width={this.state.widths[i]}
        />
      );
    });
  }

  createRows(rows) {
    const {customStyles} = this.props;
    return rows.map((row, i) => {
      const isLastRow = rows.length - 1 === i;
      const rowStyle = [
        Style.row,
        customStyles.row,
        (isLastRow ? {borderBottomWidth: 0} : {})
      ];
      return (
        <View key={i} style={rowStyle}>
          {this.createRow(row, i)}
        </View>
      );
    });
  }

  createRow(row, rowIndex) {
    let addColIndex = 0;
    return row.map((cell, colIndex) => {
      colIndex = colIndex + addColIndex;
      if (cell.hasOwnProperty('span')) {
        addColIndex += cell.span - 1;
      }
      let borderStyle = {};
      if (this.props.borders) {
        borderStyle = this._createBorderStyles(colIndex, row.length);
      }
      return this.createCell(cell, colIndex, rowIndex, borderStyle);
    });
  }

  createCell(cell, colIndex, rowIndex, borderStyle) {
    let columnInput = this.props.columns[colIndex].input;
    columnInput += `-${rowIndex}-${colIndex}`;
    if (typeof cell === 'object') {
      let width = this.state.widths[colIndex];
      if (cell.hasOwnProperty('span')) {
        const span = cell.span;
        if (span + colIndex <= this.props.columns.length) {
          for (let i = 1; i < span; i++) {
            width += this.state.widths[colIndex + i];
          }
        }
      }
      return (
        <Cell
          {...cell}
          key={colIndex}
          index={colIndex}
          customStyles={this.props.customStyles}
          borderStyle={borderStyle}
          height={this.props.cellHeight}
          width={width}
          input={columnInput}
          column={colIndex}
          row={rowIndex}
          onCellChange={this.props.onCellChange}
        />
      );

    }
    return (
      <Cell
        value={cell}
        key={colIndex}
        index={colIndex}
        customStyles={this.props.customStyles}
        borderStyle={borderStyle}
        height={this.props.cellHeight}
        width={this.state.widths[colIndex]}
        input={columnInput}
        column={colIndex}
        row={rowIndex}
      />
    );
  }

  _createBorderStyles(i, length) {
    return {
      borderRightWidth: (length - 1 > i ? 0.5 : 0)
    };
  }

  _calculateCellWidths(widths) {
    const widthFlexs = [];
    for (let i = 0; i < widths.length; i++) {
      widthFlexs.push(widths.length * (widths[i] * 0.01));
    }
    return widthFlexs;
  }

  render() {
    const {
      style,
      customStyles,
      cellHeight,
      columns,
      values
    } = this.props;

    return (
      <View style={[Style.container, style, {minHeight: cellHeight}]}>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'position' : 'padding'} enabled>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={[Style.row, customStyles.row]}>
                {this.createColumns(columns)}
              </View>
              {this.createRows(values)}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }

}

EditableTable.defaultProps = {
  values: [],
  emptyRows: 1,
  borders: false,
  headerBorders: false,
  style: {},
  customStyles: {},
  cellHeight: 40
};

EditableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  values: PropTypes.array,
  emptyRows: PropTypes.number,
  cellHeight: PropTypes.number,
  onCellChange: PropTypes.func,
  onColumnChange: PropTypes.func,
  customStyles: PropTypes.object,
  borders: PropTypes.bool,
  headerBorders: PropTypes.bool
};

export default EditableTable;
