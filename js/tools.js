$(document).ready( function(){
    $('li').click( function(){
        window.color = $(this).attr("id");
    });

    $('#addText').click(function() {
        var grabbedText = $('#textBox').val();
        var context = document.getElementById('preview').getContext('2d');
        context.font = '40pt Calibri';
        context.fillStyle = 'white';
        context.fillText(grabbedText, 320, 240);
    });

    //hide canvas on click
    $('#hideCanvas').click(function() {
        $('#canvasHolder').hide();
    })
});

