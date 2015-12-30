var factor = {

    factor: function() {
    	if($('#number').val()==""){
    		// Check if the input value is empty
    		alert("The value that you set is empty");	
    	}else if((isNaN($('#number').val()))){
    		
    		//In this if, a message pop up when the input a letter or a word is introduced
    	
    		alert("The value that you set is supposed to be a positive integer not a letter");
    	}else if((($('#number').val()) % 1) != 0){
    	    
    	   	// A message pop up when the input value is a decimal value
    	    
    		alert("The value that you set is supposed to be a positive integer not a decimal");
    	
    	}else if($('#number').val()<1){
    	
    		/*
    		In this if case the alert message pop up when the input value is negative,
    		zero is not considered a positive integer number
    		
    		*/
    		alert("The value is must be positive bigger than zero");
    		
    	}else if((($('#number').val())>=2147483647)){
    		/* 
    		 To avoid problems when the server uses some operations to make the Factorization, 
    		 I decided to set the Int32 MaxValue as the biggest Positive Integer number
    		 allowed
    		 
    		 JavaScript can handle values bigger than the Int32 Positive MaxValue, that is the reason
    		 that I could make the "if" to detect bigger numbers
    		 
    		 Int32 is the safest range to operate in all kinds of processors for 32 and 64 bits
    		 and to avoid to use another module in the CGI's server
    		 
    		 */
    		 
    		alert("This number of the input is out of range");
    		
    	}else{
    		/*
    			Once everything is correct the program is ready to send the number to get
    			its factorization to the server, and get its result
    		*/
    		
    		var NumberToSend =parseInt(($('#number').val())); // this is the value to be send to the server
    	
    		// This is where the ajax is going to be executed to send the data to the server
    		$.ajax({
    			type: "POST",
    			
    			url: "http://localhost/cgi-bin/factor.cgi", 
    			/*
    			this is the url's of the factor.cgi file (Server's program location)
    			localhost can be changed for the domain's server or IP's server
    			*/
    			
    			data: "NumberToSend=" + NumberToSend, 
    			// NumberTo SendThis is the parameter ready to send to the server
    			
    			error: function(){
    				// This alert message appear when the Server call fail
    				alert("Server call was not successful"); 
    			},
    			
    			success: function(result_recived){
    				/*
    				Server was called successfully now, result_recived is the
    				prime number lists
    				*/
    				
    				result = result_recived;
    				
    				$("#result").text(result);
    			}
    															 
    		});
    		
    		
    	}
    }
 };