const express = require('express');
const app= express();

const bodyParser = require('body-parser');
const request = require('request');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){

	res.sendFile(__dirname + '/signup.html');
});
app.post('/',function(req,res){

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var id = req.body.id;
    var data =
    	{  members:[{


    		email_address:id,
    		status:"subscribed",
    		merge_fields:{
    			FNAME:firstname,
    			LNAME:lastname
    		}
    	}]


    	};
 
 var jsondata = JSON.stringify(data);
   var options= {
   url:"https://us20.api.mailchimp.com/3.0/lists/6aea7393c9",
   method:"POST",
   headers:{
    "Authorization":"doneit007 3928cf3779c2920ab51460bf115a5252-us20"
   
   },

   //body:jsondata
   }
   request(options,function(error,response,body){
    
    	console.log(error);
    
    var status = response.statusCode;
    if(status==200){
     res.sendFile(__dirname+'/success.html');  
    }
    else
    {
      res.sendFile(__dirname+'/failure.html');  

    }

   });

});

app.post('/failure',function(req,res){

  res.redirect('/');

});

app.listen(process.env.PORT||3000,function(){
console.log("the server is running on port 3000");
});