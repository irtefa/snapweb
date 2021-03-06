$(document).ready( function() {
    //hide messages div
    //$('#messages').hide();
    //hide cancel button
    $('#showCanvas').hide();
    //hide camera
    $('#snap-stuff').hide();
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
                        //show received messages and draw using dataURL
                        //show snap-web users
                    } else {
                        Parse.User.logIn(loginUserInfo.username, loginUserInfo.password, {
                          success: function(user) {
                            console.log("Logged in");
                            $('#login-form').hide();
                            $('#signup-form').hide();
                            $('#snap-stuff').show();
                            $('#incorrect-password').hide();
                            //populate #received-messages with dataURLs matching 'to' of the user
                            var Message = Parse.Object.extend('Message');
                            var messageQuery = new Parse.Query(Message);
                            messageQuery.equalTo('ToUser', loginUserInfo.username);
                            messageQuery.find({
                                success: function(messageArray) {
                                    for (var i = 0; i < messageArray.length; i++) {
                                        $('#received-messages').append("<div id='messageElement' dataURL='"+messageArray[i]['attributes']['DataURL']+"'>Snap from " + messageArray[i]['attributes']['FromUser'] +"</div>");
                                    }
                                },
                                error: function(object) {
                                    console.log(object);
                                }
                            })
                            //populate #snapweb-users with users of snapweb
                            var usersQuery = new Parse.Query(User);
                            usersQuery.find({
                                success: function(userArray) {
                                    for (var i = 0; i < userArray.length; i++) {
                                        $('#snapweb-users').append("<div id='userElement'>"+userArray[i]['attributes']['username'] +"</div>");
                                    }
                                },
                                error: function(object) {
                                    console.log(object);
                                }
                            })
                            //show div messages 
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
                                $('#login-form').hide();
                                $('#signup-form').hide();
                                $('#snap-stuff').show();
                                //window.location.replace('http://snapweb.herokuapp.com/dashboard.php');
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