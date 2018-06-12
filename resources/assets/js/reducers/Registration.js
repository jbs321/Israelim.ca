import {REGISTER_USER, REGISTER_BUSINESS, STEP_BACK, STEP_FORWARD} from '../actions/Registration';

const initState = {
    activeStep: 0,
    steps: [
        'Register Personal Information',
        'Register Business Information',
    ]
};

export default function (state = initState, action) {
    let newState = _.assign({}, state);

    switch (action.type) {
        case REGISTER_USER:
            newState.user = action.payload.data;
            newState.activeStep = 1;
            return newState;
        case REGISTER_BUSINESS:
            newState.business = action.payload.data;
            newState.activeStep = 2;
            return newState;
        case STEP_BACK:
            if(state.activeStep !== 0) {
                newState.activeStep = state.activeStep - 1;
            }

            return newState;

        case STEP_FORWARD:
            if(state.activeStep < state.steps.length - 1) {
                newState.activeStep = state.activeStep + 1;
            }

            return newState;
        default:
            return state;
    }
}