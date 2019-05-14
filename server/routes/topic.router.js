const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all topics from database
router.get('/alltopics', (req, res) => {

    const queryText = `SELECT * from topic ORDER BY id asc;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Error in getting topics: ', error);
        });
});

// Landing Page: Get featured topic
router.get('/featuredlanding', (req, res) => {

    const queryText = `
        SELECT "topic"."id", 
                "topic_title", 
                "published_date", 
                "first_name", 
                "last_name", 
                "bio", 
                "photo_url" 
        FROM "topic" 
        JOIN "contributor" 
        ON "topic"."contributor1_id" = "contributor"."id" 
        OR "topic"."contributor2_id" = "contributor"."id" 
        WHERE "featured" = true;`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Error in getting featured topic for landing page: ', error);
        });
});

// Get landing page intro paragraph
router.get('/meta', (req, res) => {
    let queryText = `
        SELECT "header"
        FROM "meta"`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log("Error in getting site header: ", error);
        });
});

// Landing Page: Get archive topics
router.get('/archived', (req, res) => {

    let queryText = `
        SELECT "topic"."id", 
               "topic_title", 
               "published_date", 
               "icon_url", 
               "archive_summary" 
        FROM "topic"
        WHERE "featured" = 'false' AND "published" = 'true' 
        ORDER BY published_date DESC;`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error)=> {
            console.log('Error in getting archived topics for landing page: ', error);
        });
});

// TOPIC POST ROUTES

// Create New Topic
router.post('/newtopic', (req, res) => {

    const topic = req.body;

    (async () => {
        //client does not allow the program to proceed until it is connected to the database
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Insert Contributor 1 into database
            let queryText1 = `
                INSERT INTO "contributor" (
                    "first_name", 
                    "last_name", 
                    "bio", 
                    "photo_url")
                VALUES($1, $2, $3, $4) 
                RETURNING "id";`;

            const contributor1Result = await client.query(queryText1, [
                topic.contributor1FirstName,
                topic.contributor1LastName, 
                topic.bio1, 
                topic.photo1]);

            const contributor1Id = contributor1Result.rows[0].id

            // Insert Contributor 2 into database
            let queryText2 = `
                INSERT INTO "contributor" (
                    "first_name", 
                    "last_name", 
                    "bio", 
                    "photo_url")
                VALUES($1, $2, $3, $4) 
                RETURNING "id";`;

            const contributor2Result = await client.query(queryText2, [
                topic.contributor2FirstName,
                topic.contributor2LastName, 
                topic.bio2, 
                topic.photo2]);

            const contributor2Id = contributor2Result.rows[0].id

            // Insert Topic into database
            let queryText = `
                INSERT INTO "topic" (
                    "topic_title", 
                    "premise", 
                    "common_ground", 
                    "contributor1_id",
                    "contributor2_id", 
                    "archive_summary", 
                    "icon_url") 
                VALUES($1, $2, $3, $4, $5, $6, $7)  
                RETURNING "id";`;

            const topicResult = await client.query(queryText, [
                topic.topicTitle, 
                topic.topicPremise, 
                topic.topicCommonGround,
                contributor1Id, 
                contributor2Id, 
                topic.topicSummary, 
                topic.topicReadMore]); //<---- TOPIC READ MORE IS ACTUALLY ICON URL [what does this mean?]

            const topicId = topicResult.rows[0].id

            // Insert Proposal for Contributor 1
            let queryText3 = `
                INSERT INTO "proposal" (
                    "topic_id", 
                    "contributor_id", 
                    "proposal") 
                VALUES($1, $2, $3);`;

            await client.query(queryText3, [
                topicId, 
                contributor1Id, 
                topic.proposal1]);

            // Insert Proposal for Contributor 2
            let queryText4 = `
                INSERT INTO "proposal" (
                    "topic_id", 
                    "contributor_id", 
                    "proposal") 
                VALUES($1, $2, $3);`;

            await client.query(queryText4, [
                topicId, 
                contributor2Id, 
                topic.proposal2]);

            // Insert Key Claims (i.e. establish a new discussion thread)
            // for loop since each topic can have a variable amount of key claims
            for (key in topic.keyClaims) {

                let claim_order = key;
                let keyData = topic.keyClaims[key]
                let keyClaimData = [];
                
                // Parse data into its own array 
                for (prop in keyData) {
                    let keyDataProp = keyData[prop]
                    keyClaimData.push(keyDataProp);
                }
                
                // Insert Key Claim into database
                let queryText5 = `
                    INSERT INTO "key_claim" (
                        "topic_id", 
                        "contributor_id", 
                        "claim", 
                        "claim_order")
                    VALUES($1, $2, $3, $4) 
                    RETURNING "id";`;

                // Establish which contributor the key claim is for
                let contributor;
                if (keyClaimData[1] === 'contributor1') {
                    contributor = contributor1Id
                } else {
                    contributor = contributor2Id
                }

                // ^^Possible refactor:
                // let contributor = keyClaimData[1] === 'contributor1' ? contributor1Id : contributor2Id;

                const keyClaimResult = await client.query(queryText5, [
                    topicId, 
                    contributor, 
                    keyClaimData[2],    // "claim"
                    claim_order]);

                console.log("Key Claim added to database");

                const keyClaimId = keyClaimResult.rows[0].id

                let streamData = keyClaimData[3];   //"claim_order"

                //Build out stream for each key claim
                for (stream in streamData) {
                    let stream_order = stream; //<-- local stream Id number

                    let streamDataObj = streamData[stream] //<--all content for a single stream
                    
                    let queryText6 = `
                        INSERT INTO "stream" (
                            "key_claim_id", 
                            "contributor_id", 
                            "stream_comment", 
                            "stream_evidence", 
                            "stream_order")
                        VALUES ($1, $2, $3, $4, $5)`;

                    // Establish which contributor it's for
                    if (streamDataObj.streamContributor === 'contributor1') {
                        contributor = contributor1Id;
                    } else {
                        contributor = contributor2Id
                    }

                    // ^^Possible refactor? =>
                    // let contributor = keyClaimData[1] === 'contributor1' ? contributor1Id : contributor2Id;

                    await client.query(queryText6, [
                        keyClaimId, 
                        contributor, 
                        streamDataObj.streamComment, 
                        streamDataObj.streamEvidence, 
                        stream_order]);
                }   //for(stream in streamData)
            }//for(key in topic.keyClaims)

            await client.query('COMMIT');
            res.sendStatus(201);

        } catch (e) {
            // If any errors, ROLLBACK clears the data to prevent corruption
            console.log('Error - ROLLBACK: ', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            //allows res.sendStatus(201) to be sent
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    })
}); //router.post('/newtopic')


// Toggle "published" status on given topic
// Unpublished topics will show in the Admin panel, but not on the main site
router.put('/togglePublished', (req, res) => {
    let topicId = req.body.id;

    // Set query text to change published status to opposite
    let queryText = `
        UPDATE topic 
        SET published = NOT published 
        WHERE id = $1;`;

    pool.query(queryText, [topicId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in PUT /api/topic/togglePublished');
            res.sendStatus(500);
        })
});

// Toggle "Featured" Post, which appears on landing page
router.put('/toggleFeatured', (req, res) => {
    let topicId = req.body.id;

    // We can only have one topic be featured at any given moment
    // Because of that, we start off by setting the 'featured' status of EVERY topic
    // to false via firstQueryText, then change to true for the topic we want

    let firstQueryText = `
        UPDATE topic 
        SET featured = FALSE;`;

    let secondQueryText = `
        UPDATE topic 
        SET featured = TRUE 
        WHERE id = $1;`;

    pool.query(firstQueryText)
        .then((result) => {
            pool.query(secondQueryText, [topicId])
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((err) => {
                    console.log('error in PUT /api/topic/toggleFeatured');
                    res.sendStatus(500);
                })
        })
        .catch((err) => {
            console.log('error in PUT /api/topic/toggleFeatured');
            res.sendStatus(500);
        })
});

// Delete selected Topic
router.delete('/deleteTopic/:id', (req, res) => {
    let topicId = req.params.id;
    
    //queryText deletes the topic with the same topic id as topicId;
    //this will delete everything associated with that topic except for 
    //the contributors
    let queryText = `
        DELETE FROM "topic" 
        WHERE id = $1;`;

    pool.query(queryText, [topicId])
        .then((result) => {
            console.log('successful DELETE /api/topic/deleteTopic');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in DELETE /api/topic/deleteTopic');
            res.sendStatus(500);
        })
})

// Update topic
router.put('/updatetopic', (req, res) => {
    let topic = req.body;

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            //Post updates to contributor1 & contributor2
            let queryText1 = `
                UPDATE "contributor" 
                SET "first_name" = $1, 
                    "last_name" = $2, 
                    "bio" = $3, 
                    "photo_url" = $4
                WHERE "id" = $5;`;

            await client.query(queryText1, [
                topic.contributor1FirstName,
                topic.contributor1LastName, 
                topic.bio1, 
                topic.photo1, 
                topic.contributor1DbId]);

            console.log('successfully updated contributor1');

            let queryText2 = `
                UPDATE "contributor" 
                SET "first_name" = $1, 
                    "last_name" = $2, 
                    "bio" = $3, 
                    "photo_url" = $4
                WHERE "id" = $5;`;
            
            await client.query(queryText2, [
                topic.contributor2FirstName,
                topic.contributor2LastName, 
                topic.bio2, 
                topic.photo2, 
                topic.contributor2DbId]);

            console.log('successfully updated contributor2');

            // Post update to topic info
            let queryText = `
                UPDATE "topic" 
                SET "topic_title" = $1, 
                    "premise" = $2, 
                    "common_ground" = $3, 
                    "archive_summary" = $4, 
                    "icon_url" = $5 
                WHERE "id" = $6;`;

            await client.query(queryText, [
                topic.topicTitle, 
                topic.topicPremise, 
                topic.topicCommonGround, 
                topic.topicSummary, 
                topic.topicReadMore, 
                topic.topicDbId]);

            console.log('successfully updated topic info');

            // Post update to Proposal
            let queryText3 = `
                UPDATE "proposal" 
                SET "proposal" = $1 
                WHERE "id" = $2;`;

            await client.query(queryText3, [
                topic.proposal1, 
                topic.proposal1DbId]);

            console.log("Updated contributor1's proposal");

            let queryText4 = `
                UPDATE "proposal" 
                SET "proposal" = $1 
                WHERE "id" = $2;`;

            await client.query(queryText4, [
                topic.proposal2, 
                topic.proposal2DbId]);

            console.log("Updated contributor2's proposal");

            //Update Key claims
            for (key in topic.keyClaims) {

                let claim_order = key;  // Broken?
                let keyData = topic.keyClaims[key]

                let keyClaimData = [];

                for (prop in keyData) {
                    let keyDataProp = keyData[prop]
                    keyClaimData.push(keyDataProp);
                }

                let queryText5 = `
                    UPDATE "key_claim" 
                    SET "contributor_id" = $1, 
                        "claim" = $2 
                    WHERE "id" = $3;`;

                let contributor;
                
                if (keyClaimData[1] === 'contributor1') {
                    contributor = topic.contributor1DbId
                } else {
                    contributor = topic.contributor2DbId
                }
                
                const keyClaimResult = await client.query(queryText5, [
                    contributor, 
                    keyClaimData[2], 
                    keyClaimData[0]]);


                let streamData = keyClaimData[3]

                for (stream in streamData) {
                    let stream_order = stream;

                    let streamDataObj = streamData[stream];

                    let queryText6 = `
                        UPDATE "stream" 
                        SET "contributor_id" = $1, 
                            "stream_comment" = $2, 
                            "stream_evidence" = $3 
                        WHERE "id" = $4;`;

                    if (streamDataObj.streamContributor === 'contributor1') {
                        contributor = topic.contributor1DbId;
                    } else {
                        contributor = topic.contributor2DbId
                    }
                    await client.query(queryText6, [
                        contributor, 
                        streamDataObj.streamComment, 
                        streamDataObj.streamEvidence, 
                        streamDataObj.streamDbId]);
                }
            }

            await client.query('COMMIT');
            res.sendStatus(201);

        } catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            //allows res.sendStatus(201) to be sent
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    })
});

router.put('/meta', (req, res) => {
    let update = req.body;
    console.log('req.body: ', update);

    (async () => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            let queryText = `
                UPDATE "meta"
                SET "header" = $1`;

            await client.query(queryText, 
                [update.header]);

            console.log('successfully updated landing text');

            await client.query('COMMIT');
            res.sendStatus(201);
        } catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            //allows res.sendStatus(201) to be sent
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    })
});

//THIS IS ALSO BEING USED TO POPULATE THE TOPIC PAGE - SAGA TYPE FETCH_TOPIC_PAGE_CONTENT
//FETCHES SELCTED TOPICS INFO TO POPULATE TOPICEDIT PAGE (BASED ON URL)
router.get(`/fetchEditTopicInfo/:id`, (req, res) => {
    
    let topicId = req.params.id;
    //selectedTopicToSend is the master object exported at the end of the async function.
    let selectedTopicToSend = {};
    //preserves contributor ids globally.
    let contributor1Id = '';
    let contributor2Id = '';

    (async () => {
        //client does not allow the program to proceed until it is connected to the database
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            //begins series of async database SELECTS to add to selectedTopicToSend
            let queryText1 = `SELECT topic.topic_title, topic.archive_summary, topic.premise, topic.icon_url, topic.common_ground, contributor1_id, contributor2_id,
            "topic"."id" as "topic_id" FROM topic 
            WHERE topic.id = $1;`;
            const topicResult = await client.query(queryText1, [topicId]);
            
            selectedTopicToSend = {
                topicDbId: topicResult.rows[0].topic_id,
                topicTitle: topicResult.rows[0].topic_title,
                topicSummary: topicResult.rows[0].archive_summary,
                topicPremise: topicResult.rows[0].premise,
                topicReadMore: topicResult.rows[0].icon_url,
                topicCommonGround: topicResult.rows[0].common_ground
            };
            contributor1Id = topicResult.rows[0].contributor1_id;
            contributor2Id = topicResult.rows[0].contributor2_id;

            let queryText2 = `SELECT id, first_name, last_name, bio, photo_url from contributor where id = $1;`;
            const contributor1Result = await client.query(queryText2, [contributor1Id]);

            selectedTopicToSend = {
                ...selectedTopicToSend, contributor1DbId: contributor1Result.rows[0].id,
                contributor1FirstName: contributor1Result.rows[0].first_name,
                contributor1LastName: contributor1Result.rows[0].last_name,
                bio1: contributor1Result.rows[0].bio,
                photo1: contributor1Result.rows[0].photo_url

            };

            let queryText2B = `SELECT id, first_name, last_name, bio, photo_url from contributor where id = $1`;
            const contributor2Result = await client.query(queryText2B, [contributor2Id]);

            selectedTopicToSend = {
                ...selectedTopicToSend, contributor2DbId: contributor2Result.rows[0].id,
                contributor2FirstName: contributor2Result.rows[0].first_name,
                contributor2LastName: contributor2Result.rows[0].last_name,
                bio2: contributor2Result.rows[0].bio,
                photo2: contributor2Result.rows[0].photo_url,
                keyClaims: ''
            };

            let queryText3 = `SELECT proposal, id from proposal WHERE contributor_id = $1;`;
            const proposal1Result = await client.query(queryText3, [contributor1Id]);

            selectedTopicToSend = {
                ...selectedTopicToSend, proposal1: proposal1Result.rows[0].proposal,
                proposal1DbId: proposal1Result.rows[0].id
            }

            let queryText4 = `SELECT proposal, id from proposal WHERE contributor_id = $1;`;
            const proposal2Result = await client.query(queryText4, [contributor2Id]);

            selectedTopicToSend = {
                ...selectedTopicToSend, proposal2: proposal2Result.rows[0].proposal,
                proposal2DbId: proposal2Result.rows[0].id
            }

            let queryText5 = `SELECT * from key_claim WHERE topic_id = $1 ORDER BY claim_order;`;
            const keyClaimResult = await client.query(queryText5, [topicId]);

            //instantiate empty object to hold all key claims, to be added to selectedTopicToSend 
            allKeyClaimsObject = {};

            for (let keyClaim of keyClaimResult.rows) {
                let queryText6 = `SELECT * from stream WHERE key_claim_id = $1 ORDER BY stream_order;`;
                let streamResult = await client.query(queryText6, [keyClaim.id]);

                //iterates over all streams from dB and packages them as a single object.
                let streamToSpread = {};

                for (let stream of streamResult.rows) {
                    if (stream.contributor_id === contributor1Id) {
                        streamToSpread = {
                            ...streamToSpread, [stream.stream_order]: {
                                streamDbId: stream.id,
                                streamContributor: 'contributor1',
                                streamComment: stream.stream_comment,
                                streamEvidence: stream.stream_evidence
                            }
                        }
                    } else {
                        streamToSpread = {
                            ...streamToSpread, [stream.stream_order]: {
                                streamDbId: stream.id,
                                streamContributor: 'contributor2',
                                streamComment: stream.stream_comment,
                                streamEvidence: stream.stream_evidence
                            }
                        }
                    }
                }

                //adds objects to allKeyClaimsObject
                if (keyClaim.contributor_id === contributor1Id) {
                    allKeyClaimsObject[keyClaim.claim_order] = {
                        claimDbId: keyClaim.id,
                        claimContributor: 'contributor1',
                        keyClaim: keyClaim.claim,
                    }
                } else {
                    allKeyClaimsObject[keyClaim.claim_order] = {
                        claimDbId: keyClaim.id,
                        claimContributor: 'contributor2',
                        keyClaim: keyClaim.claim,

                    }
                }
                //attaches streamData to end of each keyClaim object
                allKeyClaimsObject[keyClaim.claim_order].streamData = streamToSpread;
            }
 
            selectedTopicToSend.keyClaims = allKeyClaimsObject;

            await client.query('COMMIT');
            res.send(selectedTopicToSend);

        } catch (e) {

            //checks for errors at any point within the try block; if errors are found,
            //all the data is cleared to prevent data corruption
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {

            //allows res.sendStatus(201) to be sent
            client.release();
        }

        //if an error occurs in posting the game info to the database, the error will
        //appear in the console log
    })().catch((error) => {
        console.log('CATCH', error);
        res.sendStatus(500);
    })
})

module.exports = router;