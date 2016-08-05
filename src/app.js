import React    from 'react';
import ReactDOM from 'react-dom';
import request  from 'request';
import store    from './store';
import ac       from './action-constants';
import actions  from './actions';

const mailContent = name => `
Hi ${name}

Thank you for volunteering for a swing state trip!

Will be great to have you join us! We are working with the groups in the states to figure out the best structure to handle out-of-state volunteers. And we are setting up teams and captains in each state to organize the trips.

We'll get back to you over the coming weeks as we figure things out and put you in touch with the relevant people.

We are building the plane while flying and hoping to help thousands of people take swing state trips - so please pardon our delays while we set things up.

In the mean time, you are confirmed in our system to place in a volunteer opportunity. 

Things you can start to do in the meantime:

 - Get a crew together (have them fill out the form too).
 - Hold a house party to plan your trip, organize your local team
 - Raise funds to go on the trip (or raise funds for others to travel or for Movement 2016 groups in the state)
 - Ask around about supporter housing in state or people you can stay with when you're there. Put it out on Facebook!  (We will also try to help find housing, but it's always better if you're able to use your own networks!)
 - Post on Facebook that you're going and share the Movement 2016 link - spread the word!

Margie
Movement 2016 Travel Agent
`;
import { 
  NavbarHeader,
  Grid,
  Form } from 'vanilla';

class RowField extends React.Component {
  render() {
    const { f, value, name } = this.props;
    const content = f === 'Email'
                    ? <a target="_blank" href={'mailto:' + value + '?subject=[Movement2016]%20Thanks!&body=' + encodeURIComponent(mailContent(name))}>{value}</a>
                    : value;
    return <Form.StaticField className="row-field" title={f} >{content}</Form.StaticField>;
  }
}
class Row extends React.Component {
  onShowList(e) {
    e.preventDefault();
    store.dispatch( actions.showList() );
  }

  render() {
    const { selectedRow } = this.props.state.data;
    const { Name } = selectedRow;
    return (
      <Form.HorizontalForm className="row-form">
        {Object.keys(selectedRow).map( k => <RowField key={k} name={Name} f={k} value={selectedRow[k]} />)}
        <Form.StaticField key="button" ><button onClick={this.onShowList.bind(this)}>{'back to list'}</button></Form.StaticField>
      </Form.HorizontalForm>);
  }
}

class RowLine extends React.Component {
  render() {
    const  {row}  = this.props;
    const keys = [ 'Timestamp', 'Name', 'Email', 'Phone'];
    return (<li onClick={this.props.onClick}>{keys.map( k => <span key={k}><b>{k}</b>{': ' + row[k] + ' '}</span> )}</li>);
  }
}

class Rows extends React.Component {

  onSelectRow(row,e) {
    e.preventDefault();
    store.dispatch( actions.selectRow(row) );
  }

  render() {
    const { data } = this.props.state;

    if( !data ) {
      return null;
    }

    return(
      <ul>
        {data.rows.map( (r,i) => <RowLine onClick={this.onSelectRow.bind(this,r)} key={i} row={r} /> )}
      </ul>);
  }
}


const renderMap = {
  [ac.verify(ac.SHOW_LIST)]: Rows,
  [ac.verify(ac.SELECT_ROW)]: Row
};

const Header = () => {
  const homeLink = <a href="/" className="navbar-brand">{"purple state trips"}</a>;

  return(
      <nav className="navbar navbar-inverse top-navbar">
          <div className="container-fluid">
          <NavbarHeader title="purple state trips" homeLink={homeLink} />
            <div className="collapse navbar-collapse" id="dig-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={e => {e.preventDefault(); store.dispatch(actions.showList());}}>{'full list'}</a>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    );
};

class App extends React.Component
{
  componentWillMount() {
    this.unsub = this.props.store.subscribe( this.forceUpdate.bind(this) );
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    const state = this.props.store.getState();
    const { view } = state;
    const E = renderMap[ view.open ];
    return (
      <div>
        <Header />
        <Grid.FluidContainer>
          <Grid.Row>
            <Grid.Column cols="8" offset="2">
              <E state={state}  />
            </Grid.Column>
          </Grid.Row>
        </Grid.FluidContainer>
      </div>
      );
  }
}

request('http://52.42.35.98:3000/pix', function (error, response, data) {
  if (!error && response.statusCode === 200) {
    data = JSON.parse(data);
    store.dispatch( { type: ac.verify(ac.INIT_DATA), data });
    ReactDOM.render( React.createElement(App,{store}), 
               document.getElementById('content'));
  }
});


