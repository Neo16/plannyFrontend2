
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Label } from 'reactstrap';
import { MainCategoryButton } from '../atoms/MainCategoryButton';
import { plannyAsyncActionCreators } from '../../actions/asyncActionCreators/plannyAsyncActionCreators';
import { categoryAsyncActionCreator } from '../../actions/asyncActionCreators/categoryAsyncActionCreator';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './SearchForm.css';


class SearchForm extends React.Component {

    selectedCategories = [];

    constructor(props) {
        super(props);
        this.state = {
            subcategoriesVisible: false,
            currentSubCategories: [],
            currentParentCategoryId: 0,
            query: ''
        }
        this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
        this.handleSelectSubCategory = this.handleSelectSubCategory.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.props.getMainCategoriesAsync();
        this.props.getSubCategoriesAsync();
        this.props.getPlanniesAsync(null);
    }

    search() {
        var query = { ...this.state.query };
        //query.latitude = this.props.state.searchGeocode.latitude;
        //query.longitude = this.props.state.searchGeocode.longitude;
        query.categoryIds = this.selectedCategories;
        this.props.getPlanniesAsync(JSON.stringify(query));
    }


    toggleSelectCategory(parentId) {       
        parentId = parseInt(parentId);   

        if (this.state.currentParentCategoryId === 0 ||
            parentId === this.state.currentParentCategoryId || !this.state.subcategoriesVisible) {
            this.setState({
                subcategoriesVisible: !this.state.subcategoriesVisible,
                currentSubCategories: this.props.state.subCategories.filter((c) => c.parentCategoryId === parentId),
                currentParentCategoryId: parentId,
            });
        }
        else {
            this.setState({
                currentParentCategoryId: parentId,
                currentSubCategories: this.props.state.subCategories.filter((c) => c.parentCategoryId === parentId)
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

    handleQueryChange(e) {
        const name = e.target.name;
        this.setState({
            query: {
                ...this.state.query,
                [name]: e.target.value
            }
        });

        if (name === "settlementName" && e.target.value.length > 2) {
            this.props.geoCode(this.state.query.settlementName);
        }
        setTimeout(() => this.search(), 200);
    }

    render() {
        var mainCats = this.props.state.mainCategories;
        if (mainCats === undefined) {
            return null;
        }

        const menuTags = mainCats.map((c) =>
            <MainCategoryButton
                key={c.id}
                category={c}
            />
        );

        const Arrow = ({ className, text }) => {
            return (
                <span className={className}>{text}</span>
            );
        };

        const ArrowLeft = Arrow({ text: '<', className: 'scroll-left' });
        const ArrowRight = Arrow({ text: '>', className: 'scroll-right' });      

        return (
            <div>
                <h1>Interests</h1>
                <Row className="categoryRow">
                    <Col className="category-tabs" xs={12}>
                        <ScrollMenu
                            data={menuTags}
                            arrowLeft={ArrowLeft}
                            arrowRight={ArrowRight}
                            dragging={true}
                            onSelect={this.toggleSelectCategory}
                            itemClass="category-item"
                            transition={1.1}                       
                        />
                    </Col>
                </Row>

                <Row style={{ display: this.state.subcategoriesVisible ? 'block' : 'none' }}>
                    <Col className="subCategoryRow" >
                        <div>
                            {this.state.currentSubCategories.map((c) =>
                                <Label check key={c.id}>
                                    <Input type="checkbox" value={c.id} onChange={() => this.handleSelectSubCategory(c.id)} />
                                    {c.name}
                                </Label>
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
                                type="select"
                                value={this.state.query.participantsGender}
                                defaultValue="2"
                                name="participantsGender"
                                onChange={this.handleQueryChange}
                                className="inlineControl">
                                <option value="0">male</option>
                                <option value="1">female</option>
                                <option value="2">doesn't matter</option>
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
                                style={{ 'margiLeft': '29px' }}
                                className="inlineControlBig"
                                type="datetime-local">
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="searchButtonWrapper">
                        <Button className="searchButton" onClick={this.search}>Search</Button>
                        <Button className="searchButton" href="/createplanny">Add yours</Button>
                        {/* {
                    this.props.state.isLoading &&
                    <Spinner />
                    } */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state: state.acquirePlanniesState,
    }),
    dispatch => ({
        ...plannyAsyncActionCreators(dispatch),
        ...categoryAsyncActionCreator(dispatch)
    })
)(SearchForm);
