
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MainCategoryButton } from '../atoms/MainCategoryButton';
import { publicPlannyAsyncActionCreators } from '../../actions/asyncActionCreators/publicPlannyAsyncActionCreators';
import { categoryAsyncActionCreators } from '../../actions/asyncActionCreators/categoryAsyncActionCreators';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import './SearchForm.css';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class SearchForm extends React.Component {

    selectedCategories = [];

    constructor(props) {
        super(props);
        this.state = {
            subcategoriesVisible: false,
            currentSubCategories: [],
            currentParentCategoryId: 0,
            query: {
                settlementName: '',
                rangeInKms: 100,
                fromTime: new Date(),
                toTime: moment().add(7, 'd').toDate()
            }
        }      
    }

    componentDidMount() {
        this.props.getMainCategoriesAsync();
        this.props.getSubCategoriesAsync();
        this.search();
    }

    search = () => {
        var query = { ...this.state.query };
        //query.latitude = this.props.state.searchGeocode.latitude;
        //query.longitude = this.props.state.searchGeocode.longitude;
        query.categoryIds = this.selectedCategories;
        this.props.getPlanniesAsync(JSON.stringify(query));
    }


    toggleSelectCategory = (parentId) => {
        parentId = parseInt(parentId);

        if (this.state.currentParentCategoryId === 0 ||
            parentId === this.state.currentParentCategoryId || !this.state.subcategoriesVisible) {
            this.setState({
                subcategoriesVisible: !this.state.subcategoriesVisible,
                currentSubCategories: this.props.appCommonState.subCategories.filter((c) => c.mainCategoryId === parentId),
                currentParentCategoryId: parentId,
            });
        }
        else {
            this.setState({
                currentParentCategoryId: parentId,
                currentSubCategories: this.props.appCommonState.subCategories.filter((c) => c.mainCategoryId === parentId)
            });
        }
    }

    handleSelectSubCategory = (id) => {
        var index = this.selectedCategories.indexOf(id, 0);
        if (!(index > -1)) {
            this.selectedCategories.push(id);
        }
        else {
            this.selectedCategories.splice(index, 1);
        }

        this.search();
    }

    handleQueryChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setQueryValueChange(name, value);

        if (name === "settlementName" && e.target.value.length > 2) {
            this.props.geoCode(this.state.query.settlementName);
        }
    }

    setQueryValueChange = (name, value) => {
        this.setState({
            query: {
                ...this.state.query,
                [name]: value
            }
        });
        setTimeout(() => this.search(), 200);
    }

    handleFromTimeTimeChage = (value) => {
        this.setQueryValueChange("fromTime", value);
    }

    handleToTimeTimeChage = (value) => {
        this.setQueryValueChange("toTime", value);
    }

    render() {
        var mainCats = this.props.appCommonState.mainCategories;
        if (mainCats === undefined) {
            return null;
        }

        const menuTags = mainCats.map((c) =>
            <MainCategoryButton
                key={c.id}
                category={c}
            />
        );

        const Arrow = ({ iconName, className }) => {
            return (
                <FontAwesomeIcon icon={iconName} size="4x" className={className} />
            );
        };

        const ArrowLeft = Arrow({ iconName: 'angle-left', className: "pointer scroll-arrow-left" });
        const ArrowRight = Arrow({ iconName: 'angle-right', className: "pointer scroll-arrow-right" });

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

                <h1>Where and when?</h1>
                <Row className="d-flex formRow">
                    <form className="form-inline">
                        <Col xs={6} className="d-flex">
                            <div className="form-group">
                                <Label className="mr-3">Settlement:</Label>
                                <Input
                                    value={this.state.query.settlementName}
                                    name="settlementName"
                                    onChange={this.handleQueryChange}
                                    type="Text" />
                            </div>
                        </Col>

                        <Col xs={6} className="d-flex">
                            <div className="form-group">
                                <Label className="mr-3">Maximum distance:</Label>
                                <Input
                                    name="rangeInKms"
                                    value={this.state.query.rangeInKms}
                                    onChange={this.handleQueryChange}
                                    type="number" />
                                <Label className="ml-3">km</Label>
                            </div>
                        </Col>

                        <Col xs={6} className="d-flex mt-3">
                            <div className="form-group">
                                <Label className="mr-3">From:</Label>
                                <DatePicker
                                    className={"form-control"}
                                    onChange={this.handleFromTimeTimeChage}
                                    selected={this.state.query.fromTime}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time" />
                            </div>
                        </Col>

                        <Col xs={6} className="d-flex mt-3">
                            <div className="form-group">
                                <Label className="mr-3"> To:</Label>
                                <DatePicker
                                    className={"form-control"}
                                    onChange={this.handleToTimeTimeChage}
                                    selected={this.state.query.toTime}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time" />
                            </div>
                        </Col>
                    </form>
                </Row>
                <Row>
                    <Col xs={12} className="searchButtonWrapper">
                        <Button className="searchButton" onClick={this.search}>Search</Button>
                        <Button className="searchButton" tag={Link} to="/plannies/my">Add yours</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        appCommonState: state.appCommonState
    }),
    dispatch => ({
        ...publicPlannyAsyncActionCreators(dispatch),
        ...categoryAsyncActionCreators(dispatch),

    })
)(SearchForm);
