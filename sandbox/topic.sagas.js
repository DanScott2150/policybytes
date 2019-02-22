//gets all key claims from database
function* fetchAllKeyClaims(action){
    try{

        //keyClaimResponse sends get request to router '/api/topic/allkeyclaims' and 
        //receives back all key claims from the database and stores them in keyClaimResponse.data
        const keyClaimResponse = yield call(axios.get, '/api/topic/allkeyclaims')

        //sends all key claims to allKeyClaims reducer via action 'SET_ALL_KEY_CLAIMS'
        //and payload keyClaimResponse.data
        yield put({
            type: 'SET_ALL_KEY_CLAIMS',
            payload: keyClaimResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting key claims: ', error);
    }
}

//gets all streams from database
function* fetchAllStreams(action){
    try{

        //streamResponse sends get request to router '/api/topic/allstreams' and 
        //receives back all streams from the database and stores them in streamResponse.data
        const streamResponse = yield call(axios.get, '/api/topic/allstreams')

        //sends all streams to allStreams reducer via action 'SET_ALL_STREAMS'
        //and payload streamResponse.data
        yield put({
            type: 'SET_ALL_STREAMS',
            payload: streamResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting streams: ', error);
    }
}

//gets all contributors from database
function* fetchAllContributors(action){
    try{

        //contributorResponse sends get request to router '/api/topic/allcontributors' and 
        //receives back all contributors from the database and stores them in contributorResponse.data
        const contributorResponse = yield call(axios.get, '/api/topic/allcontributors')

        //sends all contributors to allContributors reducer via action 'SET_ALL_CONTRIBUTORS'
        //and payload contributorResponse.data
        yield put({
            type: 'SET_ALL_CONTRIBUTORS',
            payload: contributorResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting contributors: ', error);
    }
}

//gets all proposals from database
function* fetchAllProposals(action){
    try{

        //proposalResponse sends get request to router '/api/topic/allproposals' and 
        //receives back all proposals from the database and stores them in proposalResponse.data
        const proposalResponse = yield call(axios.get, '/api/topic/allproposals')

        //sends all proposals to allProposals reducer via action 'SET_ALL_PROPOSALS'
        //and payload proposalResponse.data
        yield put({
            type: 'SET_ALL_PROPOSALS',
            payload: proposalResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting proposals: ', error);
    }
}

//gets all likes from database
function* fetchAllLikes(action){
    try{

        //likeResponse sends get request to router '/api/topic/alllikes' and 
        //receives back all likes from the database and stores them in likeResponse.data
        const likeResponse = yield call(axios.get, '/api/topic/alllikes')

        //sends all likes to allLikes reducer via action 'SET_ALL_LIKES'
        //and payload likeResponse.data
        yield put({
            type: 'SET_ALL_LIKES',
            payload: likeResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting likes: ', error);
    }
}

//gets all loves from database
function* fetchAllLoves(action){
    try{

        //loveResponse sends get request to router '/api/topic/allloves' and 
        //receives back all loves from the database and stores them in loveResponse.data
        const loveResponse = yield call(axios.get, '/api/topic/allloves')

        //sends all likes to allLikes reducer via action 'SET_ALL_LOVES'
        //and payload loveResponse.data
        yield put({
            type: 'SET_ALL_LOVES',
            payload: loveResponse.data
        })

    //if there is an error in sending get request to router, the error
    //will display in the console log
    }catch(error){
        console.log('Error in getting loves: ', error);
    }
}