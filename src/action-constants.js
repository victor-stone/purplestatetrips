

const constants = {
  SHOW_LIST: 'SHOW_LIST',
  INIT_DATA: 'INIT_DATA',
  SELECT_ROW: 'SELECT_ROW'
} ;

constants.verify = c => {
  if( c in constants ) {
    return c;
  }
  throw new Error( c + ' is not valid constant');
};

module.exports = constants;