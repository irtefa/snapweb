$(document).ready( function() {
    //remove alerts
    $('#user-exists').hide();
    $('#password-mismatch').hide();
    $('#incorrect-password').hide();
    //move the user to the signup page
    $('#signup-button').click(function() {
        $('#login-form').hide();
        $('#signup-form').show();
    });
    //login user
    $('#login-button').click(function() {
        var loginUserInfo = {
            username: $('#login-username').val(),
            password: $('#login-password').val()
        }
        //check if user exists
        Parse.initialize("GdphsZ82nRcNe4SWgr7n2Q1izTGhbip8zQYVjNM6", "PTEORK6w2ImcqU45hqPdA3eYE8LE6O6AXcjY8yA0");
        var User = Parse.Object.extend('User');
        var loginUserQuery = new Parse.Query(User);
        loginUserQuery.equalTo('username', loginUserInfo.username);
        loginUserQuery.find({
                success: function(userArray) {
                    if (userArray.length === 0) {
                        $('#login-form').hide();
                        $('#signup-form').show();            
                    } else {
                        Parse.User.logIn(loginUserInfo.username, loginUserInfo.password, {
                          success: function(user) {
                            console.log("Logged in");
                            window.location.replace('http://snapweb.herokuapp.com');
                            $('#incorrect-password').hide();
                          },
                          error: function(user, error) {
                            console.log("Error logging in");
                            $('#incorrect-password').show();

                          }
                        });
                    }
                },
                error: function(object) {
                    console.log('login error');
                }            
        })
    })
    //create user in parse
    $('#create-button').click(function() {
        //spit warning if password mismatch
        if ($('#signup-password').val() === $('#password-confirmation').val()) {
            //if all form entries valid do this [not doing anythign at the moment]
            var userInfo = {
                username: $('#signup-username').val(),
                phonenumber: $('#phone-number').val(),
                password: $('#signup-password').val()
            }
            Parse.initialize("GdphsZ82nRcNe4SWgr7n2Q1izTGhbip8zQYVjNM6", "PTEORK6w2ImcqU45hqPdA3eYE8LE6O6AXcjY8yA0");
            var User = Parse.Object.extend('User');
            var getUserQuery = new Parse.Query(User);
            getUserQuery.equalTo('username', userInfo.username);       
            getUserQuery.find({
                success: function(userArray) {
                    if (userArray.length === 0) {
                        //create user
                        var userObject = new User();
                        userObject.save(userInfo, {
                            success: function(object) {
                                console.log('user created');
                                $('#user-exists').hide();
                                $('#password-mismatch').hide();
                                window.location.replace('http://snapweb.herokuapp.com');
                            }
                        });    
                    } else {
                        console.log('user already exists');
                        $('#user-exists').show();
                    }
                },
                error: function(object) {
                    console.log('signup error');
                }
            });
        } else {
            $('#password-mismatch').show();
        }
    });
});