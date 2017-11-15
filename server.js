const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const ibmdb = require('ibm_db')
const connectionString = 'DRIVER={DB2};DATABASE=BPMWFSB1;UID=eggerbe;PWD=Warranty321;HOSTNAME=db2qawg_vip;port=50003'

let PORT = process.env.PORT || 4000

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.listen(PORT)
console.log('Listening on ' + PORT)

let selectQuery = 'select ID, USERID, MESSAGE, CREATEDDATE from EGGERBE.ANON_TABLE with ur;'

app.get('/api/submission', (req, res) =>{
    ibmdb.open(connectionString, function(err, conn)
    {
            if(err) 
                console.error("error: ", err.message)
           
            console.log("Connection Open")
    
            conn.query(selectQuery, (err, subs) =>{  
                if (err)
                    res.send(err)

                res.json(subs)
                })

            conn.close(function(){
                console.log("Connection Closed")
            })
    })
})

app.post('/api/submission', (req, res) =>{
    ibmdb.open(connectionString, function(err, conn)
    {
            if(err) 
                console.error("error: ", err.message)
            
            console.log("Connection Open")
       
            let userIDVar = req.body.USERID
            let messageVar = req.body.MESSAGE
            //let createdDateVar = new Date().getDate();
            let insertQuery = "INSERT INTO EGGERBE.ANON_TABLE (USERID, MESSAGE) VALUES ('"+ userIDVar + "', '" + messageVar + "');"

            conn.query(insertQuery, (err, subs) =>{  
                if (err)
                    console.error("error: ", err.message)
                res.send(err)
            })
            conn.close(function(){
                console.log("Connection Closed")
    })
}, (err, subs) =>{
    if (err)
      res.send(err);

    ibmdb.open(connectionString, function(err, conn)
    {
              if(err) 
                    console.error("error: ", err.message)
              
                console.log("Connection Open")
            
              conn.query(selectQuery, (err, subs) =>{  
                  if (err)
                    res.send(err)
                    
                  res.json(subs)
                  console.log(subs);
                  })
  
              conn.close(function(){
                  console.log("Connection Closed")
              })
    })    
  })
})

app.delete('/api/submission/:ID', (req, res) =>{
    ibmdb.open(connectionString, function(err, conn)
    {
            if(err) 
                console.error("error: ", err.message)
           
            console.log("Connection Open")

            let idToDelete = req.params.ID

            let deleteQuery = "DELETE FROM EGGERBE.ANON_TABLE WHERE ID = '" + idToDelete + "';"
            conn.query(deleteQuery, (err, subs) =>{  
                if (err)
                    res.send(err)

                })




            conn.close(function(){
                console.log("Connection Closed")
            })
    })

    ibmdb.open(connectionString, function(err, conn)
    {
              if(err) 
                    console.error("error: ", err.message)
              
                console.log("Connection Open")
            
              conn.query(selectQuery, (err, subs) =>{  
                  if (err)
                    res.send(err)
                    
                  res.json(subs)
                  console.log(subs);
                  })
  
              conn.close(function(){
                  console.log("Connection Closed")
              })
    })  

})


app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  })
