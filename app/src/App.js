import React from 'react';
import TermHeader from './components/header';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  render = () => (
    <div style={styles}>
      <TermHeader name="cobragos" />
    </div>
  )
}