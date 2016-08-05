import ac      from './action-constants';

module.exports = {
  
  showList: () => {
    return {
      type: ac.verify(ac.SHOW_LIST)
    } ;
  },

  selectRow: (selectedRow) => {
    return {
      type: ac.verify(ac.SELECT_ROW),
      selectedRow
    };
  },

  showNextPage: (paging) => {
    let { offset, total, limit } = paging;
    if( offset + limit <= total ) {
      offset += limit;
    }
    return { ...paging, offset };
  },

  showPrevPage: (paging) => {
    let { offset, limit } = paging;
    if( offset - limit < 0 ) {
      offset = 0;
    }
    return { ...paging, offset };
  }

};

