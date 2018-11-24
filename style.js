import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 0,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    elevation: 1,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cell: {
    flex: 1,
    borderColor: '#ddd',
    minHeight: 40,
    padding: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cellText: {
    color: '#000'
  },
  columnText: {
    color: '#0000008a'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 10,
    paddingRight: 10
  },
  column: {
    justifyContent: 'center',
  },
  cellInput: {
    width: '100%',
    textAlign: 'right'
  }
});

export default styles;
