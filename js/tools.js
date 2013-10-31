$(document).ready( function(){
    $('li').click( function(){
        window.color = $(this).attr("id");
    });

    $('#addText').click(function() {
        var grabbedText = $('#textBox').val();
        var context = document.getElementById('preview').getContext('2d');
        context.fillText(grabbedText, 320, 240);
    });
});

