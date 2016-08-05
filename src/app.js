import React    from 'react';
import ReactDOM from 'react-dom';
import request  from 'request';
import store    from './store';
import ac       from './action-constants';

class Row extends React.Component {
  render() {
    const  row  = this.props;
    const keys = [ 'TimeStammp', 'Name', 'Email', 'Phone'];
    return keys.map( (k,i) => <li key={i}><b>{k}</b>{": "}{row[k]}</li>);
  }
}

class Rows extends React.Component {

  render() {
    if( !this.props.model ) {
      return null;
    }
    const { rows } = this.props.model;
    return(
      <ul>
        {rows.map( (r,i) => <Row key={i} model={r} /> )}
      </ul>);
  }
}

class App extends React.Component
{
  render() {
    return (<div><h1>{"Purple State Trips"}</h1>
        <Rows model={this.props.state.data}  />
      </div>);
  }
}

request('http://52.42.35.98:3000/pix', function (error, response, data) {
  if (!error && response.statusCode === 200) {
    data = JSON.parse(data);
    store.dispatch( { type: ac.INIT_DATA, data });
    ReactDOM.render( React.createElement(App,{state:store.getState()}), 
               document.getElementById('content'));
  }
});


