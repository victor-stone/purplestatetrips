import actions      from './action-constants';

module.exports = {
  
  showRow: (id) => {
    return {
      type: actions.SHOW_ROW,
      id
    };
  },

  showList: () => {
    return {
      type: actions.SHOW_LIST
    } ;
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

