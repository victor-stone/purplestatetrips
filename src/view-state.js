import ac from './action-constants';

const defaultView = {
  view: ac.SHOW_ALL,
};

module.exports = (state = defaultView, action ) => {
  const { type:view, id } = action;
  switch( view ) {
    case ac.SHOW_ALL: {
      return { view };
    }
    case ac.SHOW_ROW: {
      return { view, id };
    }
    default: {
      return state;
    }
  }
};

