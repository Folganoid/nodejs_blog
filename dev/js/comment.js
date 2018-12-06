/* eslint-disable no-undef */
$(function() {
    // eslint-disable-next-line

    // publish
    $('.form.comment .send').on('click', function(e) {
        e.preventDefault();
        //removeErrors();

        var data = {
            body: $('#post-body').html()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done(function(data) {
            console.log(data);
            if (!data.ok) {
                $('.post-form h2').after('<p class="error">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(function(item) {
                        $('#post-' + item).addClass('error');
                    });
                }
            } else {
                $('.post-form h2').after('<p class="success">Success!</p>');
                $(location).attr('href', '/');
            }
        });
    });
});

/* eslint-enable no-undef */