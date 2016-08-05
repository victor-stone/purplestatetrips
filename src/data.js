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
      return { columns, rows };
    }
    default: {
      return state;
    }
  }
};

module.exports = data;

