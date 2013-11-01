$(document).ready( function(){
    //move the user to the signup page
    $('#signup-button').click(function() {
        $('#login-form').hide();
        $('#signup-form').show();
    });
    //create user in parse
    $('#create-button').click(function() {
        var userInfo = {
            username: $('#signup-username').val(),
            phonenumber: $('#phone-number').val(),
            password: $('#signup-password').val()
        }
        Parse.initialize("GdphsZ82nRcNe4SWgr7n2Q1izTGhbip8zQYVjNM6", "PTEORK6w2ImcqU45hqPdA3eYE8LE6O6AXcjY8yA0");
        var User = Parse.Object.extend('User');
        var userObject = new User();
        userObject.save(userInfo, {
            success: function(object) {
                console.log('its amazing');
            }
        });
    });
});