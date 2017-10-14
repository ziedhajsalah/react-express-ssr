import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    answer: 42,
  };
  returnAnswer = () => Promise.resolve(938);
  async componentDidMount() {
    this.setState({
      answer: await this.returnAnswer(),
    });
  }
  render() {
    return <h2>Hello React Class Component -- {this.state.answer}</h2>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
