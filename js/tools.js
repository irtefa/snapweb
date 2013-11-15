$(document).ready( function(){
    //check is user is logged in
    
    $('li').click( function(){
        window.color = $(this).attr('id');
    });

    $('#addText').click(function() {
        var grabbedText = $('#textBox').val();
        var context = document.getElementById('hiddenCanvas').getContext('2d');
        context.font = '40pt Calibri';
        context.fillStyle = 'white';
        context.fillText(grabbedText, 320, 240);
    });

    //snap picture
    $('#snap-button').click(function() {
        //hide video on click
        $('#video').hide();
        $('#hiddenCanvas').show();
        $('#showCanvas').show();
        console.log(dataURL);
    })

    //show video on click
    $('#showCanvas').click(function() {
        $('#hiddenCanvas').hide();
        $('#showCanvas').hide();
        $('#video').show();
    })

    //on send, send to the people its selected for
    $('#send-button').click(function() {
        var canvas = document.getElementById('hiddenCanvas');
        var pictureDataURL = canvas.toDataURL();
        console.log(pictureDataURL);
    })

    //on message click, draw on canvas
    $(document).on('click', '#messageElement', function() {
        //console.log($this);
        console.log($(this).attr('dataURL'));
    })
});