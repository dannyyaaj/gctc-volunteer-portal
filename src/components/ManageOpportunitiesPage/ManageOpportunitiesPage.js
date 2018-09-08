import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import TextField from '@material-ui/core/TextField'
import AdminNav from '../Nav/AdminNav/AdminNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import OpportunitiesCard_AdminView from '../OpportunitiesCard_AdminView/OpportunitiesCard_AdminView.js';
import { Button } from '@material-ui/core';
import CreateOpportunityDialogue from '../CreateOpportunityDialogue/CreateOpportunityDialogue';

const mapStateToProps = state => ({
    opportunitiesList: state.opportunitiesReducer.opportunitiesReducer,
    user: state.user
});

function searchingFor(term) {
    return function (opportunity) {
        if (opportunity.title) {
            return opportunity.title.toLowerCase().includes(term.toLowerCase()) || !term;
        }
    }
}
class InfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            createEventIsOpen: false,

        }

        this.searchHandler = this.searchHandler.bind(this);
    }

<<<<<<< HEAD
=======
    
>>>>>>> master
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        if (this.props.user.access_level < 2 ) {
            this.props.history.push('/home');
<<<<<<< HEAD
            this.props.dispatch({ type: 'GET_EVENTS' })
=======
        }
        this.props.dispatch({ type: 'GET_EVENTS' })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
            console.log(this.props.state);
>>>>>>> master
        }
    }

    searchHandler(event) {
        this.setState({
            term: event.target.value
        })
    }

    openCreateEvent = () => {
        this.setState({
            createEventIsOpen: true,
        })
    }
    closeCreateEvent = () => {
        this.setState({
            createEventIsOpen: false,
        })
    }

    render() {
        let content = null;
        let opportunitiesArray = this.props.opportunitiesList.filter(searchingFor(this.state.term)).map((opportunity, index) => {
            return (<OpportunitiesCard_AdminView key={index}
                opportunity={opportunity}
            />)
        })


        if (this.props.user.email) {
            content = (
                <div>
                    <div>
                        {opportunitiesArray}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Header />
                <AdminNav />

                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.openCreateEvent}
                >
                    Create Opportunity
                    </Button>
                <CreateOpportunityDialogue
                    createEventIsOpen={this.state.createEventIsOpen}
                    closeCreateEvent={this.closeCreateEvent}
                />
                <div style={{ height: 60, borderRadius: 15 }}>

                    <TextField
                        id="full-width"
                        label=""
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Search..."
                        helperText="What opportunity are you looking for?"
                        width='50'
                        margin="normal"
                        onChange={this.searchHandler}
                        value={this.state.term}
                    />
                </div>

                {content}


            </div>
        );
    }
}


export default connect(mapStateToProps)(InfoPage);
