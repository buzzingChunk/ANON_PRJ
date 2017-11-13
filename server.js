const express = require('express')
const app = express()
const ibmdb = require('ibm_db')
const bodyParser= require('body-parser')


let PORT = process.env.PORT || 4000


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.listen(PORT)
console.log('Listening on ' + PORT)




app.get('/api/submission', (req, res) =>{
    ibmdb.open("DRIVER={DB2};DATABASE=BPMWFSB1;UID=eggerbe;PWD=Warranty321;HOSTNAME=db2qawg_vip;port=50003", function(err, conn)
    {
            if(err) {
            /*
              On error in connection, log the error message on console 
            */
                  console.error("error: ", err.message);
            } else{
                console.log("Connection Open")
            }
    
            conn.query("select EMAILID, MESSAGE, CREATEDDATE from EGGERBE.ANON_TABLE with ur;", (err, subs) =>{  
                if (err)
                res.send(err)

                res.json(subs);
                //console.log(todos);
                });

            conn.close(function(){
                console.log("Connection Closed");
            });
    })
})

app.post('/api/submission', (req, res) =>{
    ibmdb.open("DRIVER={DB2};DATABASE=BPMWFSB1;UID=eggerbe;PWD=Warranty321;HOSTNAME=db2qawg_vip;port=50003", function(err, conn)
    {
            if(err) {
                  console.error("error: ", err.message);
            } else{
                console.log("Connection Open")
            }


                
            let emailIDVar = req.body.EMAILID;
            let messageVar = req.body.MESSAGE;
            //let createdDateVar = new Date().getDate();

            let insertQuery = "INSERT INTO EGGERBE.ANON_TABLE (EMAILID, MESSAGE) VALUES ('" + emailIDVar + "', '" + messageVar + "');"; 
    
            conn.query(insertQuery, (err, subs) =>{  
                if (err)
                console.error("error: ", err.message);
                res.send(err)
            });
            conn.close(function(){
                console.log("Connection Closed");
    })
}, (err, subs) =>{
    if (err)
      res.send(err);

      ibmdb.open("DRIVER={DB2};DATABASE=BPMWFSB1;UID=eggerbe;PWD=Warranty321;HOSTNAME=db2qawg_vip;port=50003", function(err, conn)
      {
              if(err) {
              /*
                On error in connection, log the error message on console 
              */
                    console.error("error: ", err.message);
              } else{
                  console.log("Connection Open")
              }
      
              conn.query("select EMAILID, MESSAGE, CREATEDDATE from EGGERBE.ANON_TABLE with ur;", (err, subs) =>{  
                  if (err)
                    res.send(err)
                    
                  res.json(subs)
                  console.log(subs);
                  })
  
              conn.close(function(){
                  console.log("Connection Closed");
              });
      })


      
  } )
})



app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  })