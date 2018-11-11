import * as React from 'react';
import './MainPage.css';
import { PlannyTable } from '../organisms/PlannyTable';
import  SearchForm  from '../organisms/SearchForm';
import { connect } from 'react-redux';

class MainPage extends React.Component {

  constructor(props) {
    super(props);   
    this.gotoDetails = this.gotoDetails.bind(this);
  }

  gotoDetails(id) {
    this.props.history.push('/planny/' + id);
  }

  render() {
    return (
      <div>   
        <SearchForm/>     
        {/*todo rename state.searchedPlannies */}
        <PlannyTable
            plannies={this.props.state.plannies}
            gotoDetails={this.gotoDetails} />      
      </div>
    );
  }   
}

export default connect(
  (state) => ({
      state: state.acquirePlanniesState,
  }) 
)(MainPage);
