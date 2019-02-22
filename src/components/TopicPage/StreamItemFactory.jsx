import React, { Component } from 'react'

import StreamItem from './StreamItem.jsx'

import { Panel, Tab, Tabs, Button, ButtonGroup } from 'react-bootstrap';


export default class componentName extends Component {



  render() {

    let streamItemArray = []

    //the goal of these nested for loops is to create the correct number of streamItems for each keyClaim 
    //And show/hide based on this.props.showStreamForClaim
    let keyClaimIdArray = Object.keys(this.props.keyClaims) //<-- find out how many key claims there are

    for (let i = 0; i < keyClaimIdArray.length; i++) { 
        let keyClaimId = i   //Each keyClaim gets an Id
        if (Number(this.props.showStreamForClaim) === keyClaimId) {
            let streamItemObject = this.props.keyClaims[i].streamData  //Pick out full streamItems object for each keyClaim
            // console.log('keyClaimId:', keyClaimId, 'streamItemObject', streamItemObject, 'this.props.showStreamForClaim:', this.props.showStreamForClaim);
                for (const streamItemId in streamItemObject) { //Loop through each streamItem object and create correct number of StreamItemPanels
                        streamItemArray.push(
                            <StreamItem key={streamItemId}
                                        keyClaimId = {keyClaimId}
                                        streamItemId = {streamItemId}
                                        streamItem = {streamItemObject[streamItemId]}
                                        showStreamForClaim={this.props.showStreamForClaim}/>
                        )   
                    }
            }
    }

    return (
      <div>
          
            {streamItemArray}

      </div>
    )
  }
}
