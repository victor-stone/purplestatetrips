import ac from './action-constants';

const defaultView = {
  open: ac.SHOW_LIST,
};

module.exports = (state = defaultView, action ) => {
  const { type:open, id } = action;
  switch( open ) {
    case ac.verify(ac.SHOW_LIST): {
      return { ...state, open };
    }
    case ac.verify(ac.SELECT_ROW): {
      return { open, id };
    }
    default: {
      return state;
    }
  }
};

