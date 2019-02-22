
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//gets all comments from database

router.get('/get/proposal/:id', (req, res) => {

    let id = req.params.id;

    if (req.isAuthenticated) {

    const queryText = `SELECT * FROM "like" WHERE proposal_id = $1;`
    //pool.query is the method that sends the queryText to the database and 
    //stores the results in the variable result
    pool.query(queryText, [id]).then((result) => {
        //all of the comments are stored in result.rows; therefore we will send back
        //result.rows
        res.send(result.rows)
        //if there was an error in getting the comments from the database,
        //the error will be displayed in the console log
    }).catch((error) => {
        console.log('Error in getting proposal like: ', error);

    })
}
});

router.get('/get/keyClaim/:id', (req, res) => {

    let id = req.params.id;

    if (req.isAuthenticated) {

    const queryText = `SELECT * FROM "like" WHERE key_claim_id = $1;`
    //pool.query is the method that sends the queryText to the database and 
    //stores the results in the variable result
    pool.query(queryText, [id]).then((result) => {
        //all of the comments are stored in result.rows; therefore we will send back
        //result.rows
        res.send(result.rows)
        //if there was an error in getting the comments from the database,
        //the error will be displayed in the console log
    }).catch((error) => {
        console.log('Error in getting stream like: ', error);

    })
}
});

router.get('/get/stream/:id', (req, res) => {

    let id = req.params.id;

    if (req.isAuthenticated) {

    const queryText = `SELECT * FROM "like" WHERE stream_id = $1;`
    //pool.query is the method that sends the queryText to the database and 
    //stores the results in the variable result
    pool.query(queryText, [id]).then((result) => {
        //all of the comments are stored in result.rows; therefore we will send back
        //result.rows
        res.send(result.rows)
        //if there was an error in getting the comments from the database,
        //the error will be displayed in the console log
    }).catch((error) => {
        console.log('Error in getting stream like: ', error);

    })
}
});

router.put('/increment/:id', (req, res) => {
    //in order to post an item, user must be signed in
    (async () => {
        //client does not allow the program to proceed until it is connected to the database
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            let queryText1 = `SELECT * FROM "like" WHERE ` + req.body.columnName + ` = $1`
    
            const result = await client.query(queryText1, [req.params.id]);
    
            const likeResult = result && result.rows && result.rows[0];
    
            if (!likeResult) {
                        //INSERT NEW LIKE ROW
                        let queryText = `INSERT INTO "like" (` + req.body.columnName + `, "count") VALUES ($1, $2);`;
                        await client.query(queryText, [req.params.id, 1]);
                        
                    } else {
                        //ADD TO EXISTING LIKE ROW
                        let queryText = `UPDATE "like" SET "count" = $1 WHERE ` + req.body.columnName + ` = $2;`;
                        await client.query(queryText, [likeResult.count + 1, req.params.id]);  
            }
    
            await client.query('COMMIT');
            res.sendStatus(201);
    
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

});

router.put('/decrement/:id', (req, res) => {
    //in order to post an item, user must be signed in

    (async () => {
        //client does not allow the program to proceed until it is connected to the database
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            let queryText1 = `SELECT * FROM "like" WHERE ` + req.body.columnName + ` = $1`
    
            const result = await client.query(queryText1, [req.params.id]);
    
            const likeResult = result && result.rows && result.rows[0];
    
            if (!likeResult) {
                        //INSERT NEW LIKE ROW
                        let queryText = `INSERT INTO "like" (` + req.body.columnName + `, "count") VALUES ($1, $2);`;
                        await client.query(queryText, [req.params.id, 1]);
                        
                    } else {
                        //ADD TO EXISTING LIKE ROW
                        let queryText = `UPDATE "like" SET "count" = $1 WHERE ` + req.body.columnName + ` = $2;`;
                        await client.query(queryText, [likeResult.count - 1, req.params.id]);
            }
    
            await client.query('COMMIT');
            res.sendStatus(201);
    
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

});

module.exports = router;

