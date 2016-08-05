import ac from './action-constants';

const data = (state={},action) => {
  switch( action.type ) {
    case ac.INIT_DATA: {
      let { data } = action;
      data = Object.keys(data.rows).map( k => data.rows[k] );
      let columns = { ...data[0]};
      const rows = data.slice(1).map( r => {
        const row = {};
        for( let k in r ) {
          row[ columns[k] ] = r[k];
        }
        return row;
      });
      return { ...state, columns, rows };
    }
    case ac.SELECT_ROW: {
      let { selectedRow } = action;
      return { ...state, selectedRow };
    }
    default: {
      return state;
    }
  }
};

module.exports = data;

