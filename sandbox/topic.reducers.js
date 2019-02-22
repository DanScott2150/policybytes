//allKeyClaims contains all key claims from the database
const allKeyClaims = (state = [], action) => {

    //sets state of allKeyClaims to an array of objects where each object is a key claim
    //with topic id, contributor id, claim text, and order id
    if (action.type === 'SET_ALL_KEY_CLAIMS'){
        return action.payload
    }

    //if action 'SET_ALL_KEY_CLAIMS' is not received, state is set to its 
    //default empty array
    return state
}

//allStreams contains all streams from the database
const allStreams = (state = [], action) => {

    //sets state of allStreams to an array of objects where each object is a stream
    //with key claim id, contributor id, stream text, and evidence text
    if (action.type === 'SET_ALL_STREAMS'){
        return action.payload
    }

    //if action 'SET_ALL_STREAMS' is not received, state is set to its 
    //default empty array
    return state
}

//allContributors contains all contributors from the database
const allContributors = (state = [], action) => {

    //sets state of allContributors to an array of objects where each object is a contributor
    //with their first name, last name, bio, and photo url
    if (action.type === 'SET_ALL_CONTRIBUTORS'){
        return action.payload
    }

    //if action 'SET_ALL_CONTRIBUTORS' is not received, state is set to its 
    //default empty array
    return state
}

//allProposals contains all proposals from the database
const allProposals = (state = [], action) => {

    //sets state of allProposals to an array of objects where each object is a proposal
    //with the topic id, contributor id, and the proposal text
    if (action.type === 'SET_ALL_PROPOSALS'){
        return action.payload
    }

    //if action 'SET_ALL_PROPOSALS' is not received, state is set to its 
    //default empty array
    return state
}

//allLikes contains all likes from the database
const allLikes = (state = [], action) => {

    //sets state of allLikes to an array of objects where each object is a like
    //with the user id and the id of the item liked e.g. key claim id, stream id,
    //id of a comment on a key claim, etc.
    if (action.type === 'SET_ALL_LIKES'){
        return action.payload
    }

    //if action 'SET_ALL_LIKES' is not received, state is set to its 
    //default empty array
    return state
}

//allLoves contains all loves from the database
const allLoves = (state = [], action) => {

    //sets state of allLoves to an array of objects where each object is a love
    //with the user id and the id of the item loved e.g. key claim id, stream id,
    //id of a comment on a key claim, etc.
    if (action.type === 'SET_ALL_LOVES'){
        return action.payload
    }

    //if action 'SET_ALL_LOVES' is not received, state is set to its 
    //default empty array
    return state
}