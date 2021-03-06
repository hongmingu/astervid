$(function () {

    $('#post_delete').click(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/re/profile/post/delete/', type: 'post', dataType: 'json', cache: false,
            data: {
                post_id: $('#delete_post_id').html(),
            },
            success: function (data) {
                if (data.res === 1) {
                    $('#post_wrapper_with_modi_' + $('#delete_post_id').html()).replaceWith('<div>post removed</div>')
                    $('#modal_post_delete').modal('hide')
                }
            }
        })

    })
    $("#modal_post_delete").on("shown.bs.modal", function () {

    }).on("hidden.bs.modal", function () {
        $('#delete_post_id').html('')
    })
});
$(function () {

    $.ajax({
        url: '/re/profile/post/', type: 'post', dataType: 'json', cache: false,
        data: {
            chosen_user_id: $('#chosen_user_id').html(),
            last_post_id: $('#last_post_id').html()
        },
        success: function (data) {
            var _modifier = ''
            var chosen_user_id = $('#chosen_user_id').html()
            var user_id = $('#user_id').html()
            $.each(data.output, function (key, value) {

                if (chosen_user_id === user_id) {
                    _modifier = '<div align="right"><a href="/update/' + value.obj_type + '/post/' + value.id + '/"><span class="pro_update clickable">update</span></a><span>  </span><a href=""><span class="pro_delete clickable">delete</span></a></div>'
                }
                var appender = '<div id="post_wrapper_with_modi_' + value.id + '">' +
                    '<div class="row div_base" id="post_wrapper_' + value.id + '">' +
                    '<script defer>' +
                    '    post_populate("' + value.id + '", "' + value.obj_type + '")' +
                    '<' + '/script>' +
                    '</div>' + _modifier +
                    '</div>'
                var jq_appender = $(appender)
                jq_appender.find('.pro_delete').on('click', function (e) {
                    e.preventDefault()
                    $('#delete_post_id').html(value.id)
                    $('#modal_post_delete').modal('show')
                })
                $('#user_profile_post_list').append(jq_appender)
            })
            if (data.last === null) {
                $('#more_load').addClass('hidden')
                $('#last_post_id').html('')

            } else {
                $('#more_load').removeClass('hidden')
                $('#last_post_id').html(data.last)
            }

        }
    })

    $('#more_load').click(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/re/profile/post/', type: 'post', dataType: 'json', cache: false,
            data: {
                chosen_user_id: $('#chosen_user_id').html(),
                last_post_id: $('#last_post_id').html()
            },
            success: function (data) {
                var _modifier = ''
                var chosen_user_id = $('#chosen_user_id').html()
                var user_id = $('#user_id').html()
                $.each(data.output, function (key, value) {

                    if (chosen_user_id === user_id) {
                        _modifier = '<div align="right"><a href="/update/' + value.obj_type + '/post/' + value.id + '/"><span class="pro_update clickable">update</span></a><span>  </span><a href=""><span class="pro_delete clickable">delete</span></a></div>'
                    }
                    var appender = '<div id="post_wrapper_with_modi_' + value.id + '">' +
                        '<div class="row div_base" id="post_wrapper_' + value.id + '">' +
                        '<script defer>' +
                        '    post_populate("' + value.id + '", "' + value.obj_type + '")' +
                        '<' + '/script>' +
                        '</div>' + _modifier +
                        '</div>'
                    var jq_appender = $(appender)
                    jq_appender.find('.user_profile_post_delete').on('click', function (e) {
                        e.preventDefault()
                        $('#delete_post_id').html(value.id)
                        $('#modal_post_delete').modal('show')
                    })
                    $('#user_profile_post_list').append(jq_appender)
                })
                if (data.last === null) {
                    $('#more_load').addClass('hidden')
                    $('#last_post_id').html('')
                } else {
                    $('#more_load').removeClass('hidden')
                    $('#last_post_id').html(data.last)

                }

            }
        })

    })
})
