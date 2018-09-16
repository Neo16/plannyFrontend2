import * as React from 'react';
import { connect } from 'react-redux';
import { MainCategoryButton } from '../atoms/MainCategoryButton';
import './MainPage.scss';
import {
 Row,
 Col,
 Input,
 Button } from 'reactstrap';

class MainPageState {
  subcategoriesVisible;
  currentSubCategories;
  currentParentCategoryId;
  query;
}

export class MainPage extends React.Component {

  selectedCategories = new Array;

  constructor(props) {
    super(props);
    this.state = {
      subcategoriesVisible: false,
      currentSubCategories: new Array,
      currentParentCategoryId: 0,
      query: ''
    }
    this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
    this.handleSelectSubCategory = this.handleSelectSubCategory.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.search = this.search.bind(this);
    this.gotoDetails = this.gotoDetails.bind(this);
  }

  search() {
    var query = { ...this.state.query };
    query.latitude = this.props.state.searchGeocode.latitude;
    query.longitude = this.props.state.searchGeocode.longitude;
    query.categoryIds = this.selectedCategories;

    console.log(query);
    this.props.getPlannies(JSON.stringify(query));
  }

  handleQueryChange(e) {
    console.log(e.target.value);
    const name = e.target.name;
    this.setState({
      query: {
        ...this.state.query,
        [name]: e.target.value
      }
    });

    if (name == "settlementName" && e.target.value.length > 2) {
      this.props.geoCode(this.state.query.settlementName);
    }
    setTimeout(() => this.search(), 200);
  }

  componentDidMount() {
    this.props.getMainCategories();
    this.props.getSubCategories();
  }

  toggleSelectCategory(parent) {
    if (this.state.currentParentCategoryId == 0 ||
      parent.id == this.state.currentParentCategoryId || !this.state.subcategoriesVisible) {
      this.setState({
        subcategoriesVisible: !this.state.subcategoriesVisible,
        currentSubCategories: this.props.state.subCategories.filter((c) => c.parentCategoryId == parent.id),
        currentParentCategoryId: parent.id,
      });
    }
    else {
      this.setState({
        currentParentCategoryId: parent.id,
        currentSubCategories: this.props.state.subCategories.filter((c) => c.parentCategoryId == parent.id)
      });
    }
  }

  handleSelectSubCategory(id) {
    var index = this.selectedCategories.indexOf(id, 0);
    if (!(index > -1)) {
      this.selectedCategories.push(id);
    }
    else {
      this.selectedCategories.splice(index, 1);
    }

    this.search();
  }

  gotoDetails(id) {
    this.props.history.push('/planny/' + id);
  }

  render() {
    const mainCats = this.props.state.mainCategories;
    return (
      <div>
        <h1>Interests</h1>
        <Row className="categoryRow">
          <Col xs={1} className="navbar-pager">
            <span className="scroll-left">left></span>
          </Col>
          <Col xs={10}>
            <ul className="nav category-tabs horizontal" role="tablist">
              {mainCats.map((c) =>
                <MainCategoryButton
                  category={c}
                  toggleSelectCategory={this.toggleSelectCategory}
                  currentParentCategoryId={this.state.currentParentCategoryId}
                />
              )}
            </ul>
          </Col>
          <Col xs={1} className="navbar-pager">
            <span  className="scroll-right">right</span>           
          </Col>
        </Row>

        <Row style={{ display: this.state.subcategoriesVisible ? 'block' : 'none' }}>
          <Col className="subCategoryRow" >
            <div>
              {this.state.currentSubCategories.map((c) =>
                <Input type="checkbox" key={c.id} onChange={() => this.handleSelectSubCategory(c.id)}>
                  {c.name}
                </Input>
              )}
            </div>
          </Col>
        </Row>

        <h1>With who?</h1>
        <Row className="formRow">
          <Col xs={4}>
            <div>
              <label>Gender:</label>
              <Input
                value={this.state.query.participantsGender}
                name="participantsGender"
                onChange={this.handleQueryChange}
                className="inlineControl"
                componentClass="select">
                <option value="0">male</option>
                <option value="1">female</option>
                <option value="2" selected >doesn't matter</option>
              </Input>
            </div>
          </Col>
          <Col xs={4}>
            <div>
              <label>Age:</label>
              <Input
                value={this.state.query.participantsAgeMin}
                name="participantsAgeMin"
                onChange={this.handleQueryChange}
                className="inlineControlSmall"
                type="number" /> -
               <Input
                value={this.state.query.participantsAgeMax}
                name="participantsAgeMax"
                onChange={this.handleQueryChange}
                className="inlineControlSmall"
                type="number" />
            </div>
          </Col>
          <Col xs={4}>
            <div>
              <label>Num of attendants:</label>
              <Input
                value={this.state.query.participantsNumberMin}
                name="participantsNumberMin"
                onChange={this.handleQueryChange}
                className="inlineControlSmall"
                type="number" /> -
               <Input
                value={this.state.query.participantsNumberMax}
                name="participantsNumberMax"
                onChange={this.handleQueryChange}
                className="inlineControlSmall"
                type="number" />
            </div>
          </Col>
        </Row>

        <h1>Where and when?</h1>
        <Row className="formRow">
          <Col xs={6}>
            <div className="formLine">
              <label>Settlement:</label>
              <Input
                value={this.state.query.settlementName}
                name="settlementName"
                onChange={this.handleQueryChange}
                className="inlineControlBig"
                type="Text" />
            </div>
            <div>
              <label>Maximum distance:</label>
              <Input
                name="rangeInKms"
                value={this.state.query.rangeInKms}
                onChange={this.handleQueryChange}
                className="inlineControl"
                type="number" /> km
              </div>
          </Col>
          <Col xs={6}>
            <div className="formLine">
              <label>From:</label>
              <Input
                value={this.state.query.fromTime}
                name="fromTime"
                onChange={this.handleQueryChange}
                className="inlineControlBig"
                type="datetime-local">
              </Input>
            </div>
            <div>
              <label>To:</label>
              <Input
                value={this.state.query.toTime}
                name="toTime"
                onChange={this.handleQueryChange}
                style={{ 'margin-left': '29px' }}
                className="inlineControlBig"
                type="datetime-local">
              </Input>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="searchButtonWrapper">
            <Button bsStyle="primary" className="searchButton" onClick={this.search}>Search</Button>
            <Button bsStyle="primary" className="searchButton" href="/createplanny">Add yours</Button>
            {/* {
              this.props.state.isLoading &&
              <Spinner />
            } */}
          </Col>
        </Row>

        <Row className="planniesRow">
          asd
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    state: state.acquirePlanniesState,
  }),
  // plannyActionCreators
)(MainPage);
