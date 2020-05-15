function signupinfo()
		{
			var datas = 
			{
			name   : document.getElementById('fname').value,
			email  : document.getElementById('Email').value,
			pwd	   : document.getElementById('password').value,
			pin	   : document.getElementById('pincode').value,
			contact: document.getElementById('contact').value
			}
			console.log(datas);	

			$.ajax({
				url: "http://localhost:4300/signup",
				method:"POST",
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(datas),
				success: function(result){
					console.log("sucessfully register")
					console.log(result);
					
					// here do the validation 
			  }
			});			

		} 


		function viewCount()
		{
			
			$.ajax({
				url: "http://localhost:4300/ping",
				method:"GET",
				success: function(result){
					console.log(result);
					
					// here displays the time 
			  }
			});	
		}
		
function login()
		{
			
			$.ajax({
				url: "http://localhost:4300/login/raja@gmail.com/12345",
				method:"GET",
				success: function(result){
					alert("succesfully login")
					console.log(result);
					
					// here displays the time
			  }
			});	
		}
		function cart()
		{
			
			var datas =
			{
					productname:document.getElementById('productname').value,
                    product_id:document.getElementById('product_id').value,
                    quantity:document.getElementById('quantity').value,
                    address:document.getElementById('address').value,
                    amount:document.getElementById('amount').value,
                    percentage:document.getElementById('percentage').value,
                    description:document.getElementById('description').value
			}
			console.log(datas);
			
			$.ajax({
				url: "http://localhost:4300/addcart", // + 'pass the unique id in params' which is generated in user signup form.
				method:"POST",
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(datas),
				success: function(result){
					console.log(result);
					
					// here do the validation 
			  }
			});			

			
		}
// company_name  gstnum	company_address  
		function companydata()
		{
			var datas =
			{
				company_name:document.getElementById('company_name').value,
				gstnum:document.getElementById('gstnum').value,
				company_address:document.getElementById('company_address').value,

			}
			console.log(datas);
			$.ajax({
				url: "http://localhost:4300/company", // + 'pass the unique id in params' which is generated in user signup form.
				method:"POST",
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(datas),
				success: function(result){
					console.log(result);
					
					// here do the validation 
			  }
			});		
		}

		// here you can see the all cart infos.
		function cartdata()
		{
			$.ajax({
				url: "http://localhost:4300/cartdata",
				method:"GET",
				success: function(result){
					console.log(result);
					
				// here you can see the all cart infos.
			}
			});	
		}
		
		
		// here you can see the companyinfos.
		function companyinfo()
		{
			$.ajax({
				url: "http://localhost:4300/companyinfo",
				method:"GET",
				success: function(result){
					console.log(result);
					
				// here you can see the company infos.
			}
			});	
		}
		
				// billcart
			function billcart()
			{
				var datas = 
				{
					
		            email:document.getElementById('email').value,
                    product_id:document.getElementById('product_id').value,
                    quantity:document.getElementById('quantity').value,
                    postcode:document.getElementById('postcode').value,
                    houseNo:document.getElementById('houseNo').value,
                    streetAddress:document.getElementById('streetAddress').value,
				    mobile:document.getElementById('mobile').value
				}

				console.log(datas);

				$.ajax({
				url: "http://localhost:4300/billcart", // + 'pass the unique id in params' which is generated in user signup form.
				method:"POST",
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(datas),
				success: function(result){
					console.log(result);
					
					// here do the validation 
			  }
			});		
				
			}

			// here you can view the billing details

			function getbillinfo()
			{
			$.ajax({
				url: "http://localhost:4300/getbillinfo",// +  'pass the unique id in params' which is generated in user signup form. 
				method:"GET",
				success: function(result){
					console.log(result);
					
				// here you can see the company infos.
			}
			});				
			}

