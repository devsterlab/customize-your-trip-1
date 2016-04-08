import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from '../../actions/summary';
import DateHelper from '../../util/dateHelper';

import Timeline from '../../components/Timeline';
import Category from '../../components/Timeline/Category';
import Title from '../../components/Timeline/Title';
import Item from '../../components/Timeline/Item';
import Content from '../../components/Timeline/Content';
import Actions from '../../components/Timeline/Actions';

import FlightCard from '../../components/FlightCard';
import HotelCard from '../../components/HotelCard';
import CarCard from '../../components/CarCard';
import Button from '../../components/Button';

class Summary extends Component {
    static propTypes = {
        children: PropTypes.node,
        steps: PropTypes.arrayOf(PropTypes.shape({
            flight: PropTypes.shape({
                _id: PropTypes.string,
                fromCity: PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                    timezone: PropTypes.number
                }),
                toCity: PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                    timezone: PropTypes.number
                }),
                companyName: PropTypes.string,
                available: PropTypes.number,
                price: PropTypes.number,
                departTime: PropTypes.string,
                duration: PropTypes.string
            }),
            hotel: PropTypes.shape({
                _id: PropTypes.string,
                city: PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string
                }),
                name: PropTypes.string,
                popularity: PropTypes.number,
                images: PropTypes.arrayOf(PropTypes.string),
                stars: PropTypes.number,
                latitude: PropTypes.number,
                longitude: PropTypes.number,
                address: PropTypes.string,
                description: PropTypes.string,
                price: PropTypes.number
            }),
            car: PropTypes.shape({
                _id: PropTypes.string,
                city: PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string
                }),
                brand: PropTypes.string,
                model: PropTypes.string,
                image: PropTypes.string,
                carType: PropTypes.string,
                price: PropTypes.number,
                transmission: PropTypes.oneOf(['manual', 'automatic']),
                maxPassengers: PropTypes.number
            }),
            hotelDays: PropTypes.number,
            carDays: PropTypes.number,
            date: PropTypes.object,
            dateFrom: PropTypes.object,
            dateTo: PropTypes.object,
            days: PropTypes.number,
            price: PropTypes.number
        })),
        homeCity: PropTypes.string,
        days: PropTypes.number,
        price: PropTypes.number,
        currentStep: PropTypes.object,
        index: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.currentStepConcated = false;
        this.state = { steps: props.steps };
        setTimeout(() => props.actions.setCurrentStep(), 0);
    }

    componentWillReceiveProps(props) {
        if (!this.currentStepConcated && props.currentStep) {
            this.currentStepConcated = true;
            this.setState({
                steps: props.steps
                    .slice(0, props.index)
                    .concat([props.currentStep])
                    .concat(props.steps.slice(props.index, props.steps.length))
            });
        }
    }

    handleContinueClick() {
        this.props.actions.continueTrip();
    }

    editItem(step, index, itemType) {
        this.props.actions.editItem(step, index, itemType);
        hashHistory.push(`/${itemType}`);
    }

    removeItem(step, index, itemType) {

    }

    render() {
        let { homeCity, days, price, currentStep } = this.props;
        let steps = this.state.steps;
        const summaryAvailable = steps.length;
        if (summaryAvailable) {
            var firstStep = steps[0], lastStep = steps[steps.length - 1];
            var tripFinished = lastStep.flight.toCity._id == homeCity && !lastStep.hotel;
            var finishSecondary = `${DateHelper.formatDateMonth(firstStep.date)} - `
                + `${DateHelper.formatDateMonth(lastStep.dateTo)}`
                + ` | ${DateHelper.formatDays(days || 0)}`;
        }

        return (
            summaryAvailable &&
            <div className={`summary row height-100 ${tripFinished && 'finish' || ''}`}>
                <h3 className="header">
                    Your <strong>trip summary</strong> looks great!
                </h3>
                {!tripFinished && <Button className="success float-right large continue-button" link="/flight"
                        onClick={() => this.handleContinueClick()}>
                    Continue
                </Button>}
                <hr className="divider"/>
                <Timeline>
                    {steps.map((step, index) => {
                        const isFirstStep = index == 0, isLastStep = index == steps.length - 1,
                            secondary = `${DateHelper.formatDateMonth(step.dateFrom)} - `
                                + `${DateHelper.formatDateMonth(step.dateTo)} | ${DateHelper.formatDays(step.days)}`,
                            isHome = step.flight.toCity._id == homeCity;
                        const isFinish = isHome && !step.hotel;
                        if (!isLastStep) var nextStep = steps[index + 1];
                        return (
                            <div key={index}>
                                {isFirstStep && <Category>
                                    <Title date={step.date} icon="mdi-home">{step.flight.fromCity.name}</Title>
                                    <Item icon="mdi-airplane" className="last">
                                        <Content>
                                            <FlightCard flight={step.flight} date={step.date}/>
                                        </Content>
                                        <Actions onEdit={() => this.editItem(step, index, 'flight')}
                                                 onRemove={() => this.removeItem(step, index, 'flight')}/>
                                    </Item>
                                </Category>}
                                <Category className={isFinish && 'last' || ''}>
                                    <Title date={isFinish && step.dateTo || step.dateFrom} icon={isHome && 'mdi-home' || 'mdi-city'}
                                           secondary={isFinish && finishSecondary || secondary}>
                                        {isFinish &&
                                        <span>Trip end:&nbsp;
                                            <strong>${price + (currentStep && currentStep.price || 0)}</strong>
                                        </span> ||
                                        step.flight.toCity.name}
                                    </Title>
                                    {!isFinish && <div>
                                        <Item icon="mdi-hotel" className={(!step.car && isLastStep) && 'last' || ''}>
                                            <Content>
                                                <HotelCard hotel={step.hotel} price={step.hotel.price} days={step.hotelDays}/>
                                            </Content>
                                            <Actions onEdit={() => this.editItem(step, index, 'hotel')}
                                                     onRemove={() => this.removeItem(step, index, 'hotel')}/>
                                        </Item>
                                        {step.car && <Item icon="mdi-car" className={isLastStep && 'last' || ''}>
                                            <Content>
                                                <CarCard car={step.car} price={step.car.price} days={step.carDays}/>
                                            </Content>
                                            <Actions onEdit={() => this.editItem(step, index, 'car')}
                                                     onRemove={() => this.removeItem(step, index, 'car')}/>
                                        </Item>}
                                        {!isLastStep && <Item icon="mdi-airplane" className="last">
                                            <Content>
                                                <FlightCard flight={nextStep.flight} date={nextStep.date}/>
                                            </Content>
                                            <Actions onEdit={() => this.editItem(nextStep, index + 1, 'flight')}
                                                     onRemove={() => this.removeItem(nextStep, index + 1, 'flight')}/>
                                        </Item> || ''}
                                    </div>}
                                </Category>
                            </div>
                        );
                    })}
                    {!tripFinished && <Category className="last">
                        <Title date={lastStep.dateTo} icon="mdi-flag-checkered" secondary={finishSecondary}>
                            Trip end:&nbsp;
                            <strong>${price || 0}</strong>
                        </Title>
                    </Category>}
                </Timeline>
            </div> ||
            <div className="height-100">
                <h2 className="subheader text-center">Flight or hotel not selected</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.summary;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Summary);