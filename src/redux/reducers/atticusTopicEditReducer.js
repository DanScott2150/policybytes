// Reducer for Actions relating to the Topic Edit Cache

import { combineReducers } from 'redux';

let emptyTopicEditCache = {
  topicDBId: '',
  topicTitle: '',
  topicSummary: '',
  topicPremise: '',
  topicReadMore: '',
  topicCommonGround: '',
  contributor1DbId: '',
  contributor1FirstName: '',
  contributor1LastName: '',
  bio1: '',
  photo1: '',
  proposal1DbId: '',
  proposal1: '',
  contributor2DbId: '',
  contributor2FirstName: '',
  contributor2LastName: '',
  bio2: '',
  photo2: '',
  proposal2DbId: '',
  proposal2: '',
  keyClaims: {
    0: {
      claimDbId: '',
      claimContributor: '',
      keyClaim: '',
      streamData: {
        0: {
          streamDbId: '',
          streamContributor: '',
          streamComment: '',
          streamEvidence: '',
        }
      }
    }
  }
}

const topicEditCache = (state = emptyTopicEditCache, action) => {
  switch (action.type) {

    case 'FETCH_EDIT_CACHE':
        return state; 

//HANDLE CHANGE FOR TOPIC INFO (FIRST LEVEL OF OBJECT)
    case 'CHANGE_TOPIC_INFO':
      return {
        ...state, 
        [action.payload.name]: action.payload.value,
      }

// Reset to Empty Cache
    case 'RESET_EDIT_CACHE':
      return emptyTopicEditCache;

//HANDLE CHANGE FOR KEY CLAIM INFO (SECOND LEVEL OF OBJECT)    
    case 'CHANGE_KEY_CLAIM_INFO':
      // console.log('action', action);
      // console.log('action.payload', action.payload);
      // console.log('id, name, value', action.payload.id, action.payload.name, action.payload.value);
        
      return{
        ...state, 
        keyClaims: {
          ...state.keyClaims,
        [action.payload.id]: {
          ...state.keyClaims[action.payload.id],
          [action.payload.name]: action.payload.value
        }
      }
    }
            
//HANDLE CHANGE FOR STREAM ITEM INFO (THIRD LEVEL OF OBJECT)    
    case 'CHANGE_STREAM_ITEM_INFO': 
      return {
        ...state,
        keyClaims: {
          ...state.keyClaims, 
          [action.payload.claimId]: {
            ...state.keyClaims[action.payload.claimId],
            streamData: {
              ...state.keyClaims[action.payload.claimId].streamData,
              [action.payload.streamId]: {
                ...state.keyClaims[action.payload.claimId].streamData[action.payload.streamId],
                [action.payload.eventTarget.name]: action.payload.eventTarget.value
              }
            }
          }
        }
      }

//ADD A NEW KEY CLAIM TO THE STATE OBJECT
    case 'ADD_KEY_CLAIM' :
      return {
        ...state,
        keyClaims: {
          ...state.keyClaims,
          [action.payload.id]: {
            claimDbId: '',
            claimContributor: action.payload.contributor,
            keyClaim: ''
            // streamData: {
            //   0: {
            //     streamDbId: '',
            //     streamContributor: action.payload.contributor,
            //     streamComment: '',
            //     streamEvidence: '',
            //   },
            }
          }
        }
      
// Delete Key Claim
    case 'DELETE_KEY_CLAIM':
      console.log('DELETE_KEY_CLAIM: ', action.payload);

      const claimToRemove = action.payload.claimDbId;
      const keyId = action.payload.keyClaimDbId;
      let currentKeyClaims = state.keyClaims;
      let target = currentKeyClaims[action.payload.keyClaimDbId];

      console.log("claimToRemove: ", claimToRemove);
      console.log("currentKeyClaims: ", currentKeyClaims);
      console.log("targeted: ", target);

      const { [keyId]: deletedClaim, ...newKeyClaims} = currentKeyClaims;

      console.log("UPDATED:");
      console.log("currentKeyClaims : ", currentKeyClaims);
      console.log("deleted : ", deletedClaim);
      console.log("newKeyClaims : ", newKeyClaims);

      return {
        ...state,
        keyClaims: { 
          ...newKeyClaims
        }
      }

//ADD A NEW STREAM ITEM TO CLAIM BASED ON CLAIM ID
    case 'ADD_STREAM_ITEM':
    console.log('in ADD_STREAM_ITEM, payload: ', action.payload);
      return {
        ...state,
        keyClaims: {
          ...state.keyClaims,
          [action.payload.claimId]: {
            ...state.keyClaims[action.payload.claimId],
            streamData: {
              ...state.keyClaims[action.payload.claimId].streamData,
              [action.payload.streamItemId]: {
                  streamContributor: action.payload.contributorId,
                  streamComment: '',
                  streamEvidence: '',
                  streamDbId: '',
              }
            }
          }
        }
      }

    // Delete Stream Item
    case 'DELETE_STREAM_ITEM':

      const keyClaimId = action.payload.claimId;
      const streamToRemove = action.payload.streamId;
      let currentStream = state.keyClaims[keyClaimId].streamData;

      const { [streamToRemove]: deletedStream, ...newStreamItems } = currentStream;

      return {
        ...state,
        keyClaims: {
          ...state.keyClaims,
          [action.payload.claimId]: {
            ...state.keyClaims[action.payload.claimId],
            streamData: {
              ...newStreamItems
            }
          }
        }
      }

//SET REDUX STORE TO HOLD SELECTED TOPIC TO BE EDITED 
      case 'CACHE_TOPIC_TO_EDIT':
        return action.payload
      

      default: 
        return state

    } //switch(action.type)
} //const topicEditCache

export default combineReducers({
    topicEditCache
})