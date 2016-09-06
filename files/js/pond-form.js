/*-----------------------------------------------------------------------------------

 	Script - Form Validation and Ajax Comments
 
-----------------------------------------------------------------------------------*/


jQuery(window).load(function($) {	
	
	
	/*---------------------------------------------- 
				  F O R M   V A L I D A T I O N 
	------------------------------------------------*/
	jQuery("body").on("click", 'input[type="submit"]', function(event) {
		event.preventDefault();
		$form = jQuery(this).parents('form');
		form_action = $form.attr('action');
		form_class = $form.attr('class');
		id = $form.attr('id');
		
		if (form_class == 'checkform') {
			
			var control = true;
			
			$form.find('label.req').each(function(index){
											  
				var name = jQuery(this).attr('for');
				defaultvalue = jQuery(this).html();
				value = $form.find('#'+name).val();
				formtype = $form.find('#'+name).attr('type');
				
				
				if (formtype == 'radio' || formtype == 'checkbox') {
					if (jQuery('.'+name+':checked').length == 0) { jQuery(this).siblings('div').find('.checkfalse').fadeIn(200); control = false;  } 
					else { jQuery(this).siblings('div').find('.checkfalse').fadeOut(200); }
				
				} else if(name == 'email_address') {
					var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
					if (!value.match(re)) { 
							$form.find('#'+name).addClass('false'); $form.find('#'+name).parent('.form-row').addClass('false'); control = false;
						} else { 
							$form.find('#'+name).removeClass('false'); $form.find('#'+name).parent('.form-row').removeClass('false');
						}
				} else {
					if (  value == '' || 
						  value == defaultvalue
						  ) 
						{ 
							$form.find('#'+name).addClass('false'); $form.find('#'+name).parent('.form-row').addClass('false'); control = false;
	
						} else { 
							$form.find('#'+name).removeClass('false'); $form.find('#'+name).parent('#form-row').removeClass('false');
						}
				}
				
			});
			
			
			if (!control) { 
				jQuery("#form-note").fadeIn(200);
				return false; 
			
			} else {
				jQuery("#form-note").fadeOut(200);
				
				if (form_action && form_action !== '') {


					var settings = {
						"async": true,
						"crossDomain": true,
						"url": form_action,
						"method": "POST",
						"headers": {
							"authorization": "Basic aW1paGFsY2VhMToyYWQyMjI3ODJkMDA0NWFjZmMyOTNhMmIyM2I2ZWMyYQ==",
							"cache-control": "no-cache",
							"postman-token": "fcf612c5-343e-6bce-b4e3-e932113fe33a"
						},
						"dataType":"json",
						"data": $form.serialize() };

					var query = jQuery.ajax(settings);
				   query.done(function (response) {
					   jQuery("#form-note").html("<div class=\"alert alert-confirm\"><strong>Confirm</strong>: Le message à bien été envoyé. Merci! </div>");
					   jQuery("#form-note").delay(200).fadeIn(200);
				   });
					query.error(function(error){
						jQuery("#form-note").html("<div class=\"alert alert-error\"><strong>Oups...</strong>: Une erreur est inervenue!</div>");
						jQuery("#form-note").delay(200).fadeIn(200);
					});

				return false;
				} else {
				return true;
				}
				
			} // END else {
		
		}
	});
	
	
});  // END jQuery(window).load(function($) {


