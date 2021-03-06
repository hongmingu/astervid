$(function () {
    var height = $(window).height();
    $('.modal-body').css('max-height', height - 120);
    $(window).on('resize', function () {

        if ($(window).height() != height) {
            height = $(window).height();
            $('.modal-body').css('max-height', height - 120);
        }
    });
})
$(function () {
    if($('#user_id').html()!==$('#chosen_user_id').html()){
        $('#follow_wrapper').removeClass('hidden')
    }
    $('#follow').click(function (e) {
        e.preventDefault()
        if ($('#user_id').html() === '') {
            $('#modal_need_login_follow').modal('show')
            return false;
        }
        $.ajax({
            url: '/re/follow/add/', type: 'post', dataType: 'json', cache: false,
            data: {
                user_id: $('#chosen_user_id').html()
            },
            success: function (data) {
                if (data.result === true) {
                    $('#follow').html('following <span class="glyphicon glyphicon-ok"></span>')
                    var count_follower = parseInt($('#count_follower').html()) + 1
                    $('#count_follower').html(count_follower)
                } else {
                    $('#follow').html('follow')
                    var count_follower = parseInt($('#count_follower').html()) - 1
                    $('#count_follower').html(count_follower)
                }
            }
        })
    })

    $("#modal_following").on("shown.bs.modal", function () {
        var height = $(window).height();
        $('.modal-body').css('max-height', height - 120);
        $(window).on('resize', function () {
            if ($(window).height() != height) {
                height = $(window).height();
                $('.modal-body').css('max-height', height - 120);
            }
        });

        var chosen_user_id = $('#chosen_user_id').html()

        $.ajax({
            url: '/re/following/list/', type: 'post', dataType: 'json', cache: false,
            data: {
                user_id: $('#chosen_user_id').html(),
                next_user_id: $('#next_user_id').html()
            },
            success: function (data) {
                if (data.res === 1) {
                    $.each(data.output, function (key, value) {
                        var appender = '<div class="modal_unit_wrapper"><a href="/' + value.username + '/">\n' +
                            '<img class="modal_img" src="' + value.photo + '">\n' +
                            '<span class="modal_username">' + value.username + '</span>\n' +
                            '</a></div>'
                        $('#modal_following_list').append(appender)
                    })
                }
                if (data.next === null) {
                    $('#modal_following_more').addClass('hidden')
                } else {
                    $('#modal_following_more').removeClass('hidden')
                }

            }
        })
    }).on("hidden.bs.modal", function () {
        $('#modal_following_list').empty()
        $('#next_user_id').html('')

    });

    $('#modal_following_more').click(function (e) {
        e.preventDefault()
        var chosen_user_id = $('#chosen_user_id').html()

        $.ajax({
            url: '/re/following/list/', type: 'post', dataType: 'json', cache: false,
            data: {
                user_id: $('#chosen_user_id').html(),
                next_user_id: $('#next_user_id').html()
            },
            success: function (data) {
                if (data.res === 1) {
                    $.each(data.output, function (key, value) {
                        var appender = '<div class="modal_unit_wrapper"><a href="/' + value.username + '/">\n' +
                            '<img class="modal_img" src="' + value.photo + '">\n' +
                            '<span class="modal_username">' + value.username + '</span>\n' +
                            '</a></div>'
                        $('#modal_following_list').append(appender)
                    })
                }
                if (data.next === null) {
                    $('#next_user_id').html('')
                    $('#modal_following_more').addClass('hidden')
                } else {
                    $('#next_user_id').html(data.next)
                    $('#modal_following_more').removeClass('hidden')
                }

            }
        })
    })

    $("#modal_follower").on("shown.bs.modal", function () {

        var height = $(window).height();
        $('.modal-body').css('max-height', height - 120);
        $(window).on('resize', function () {

            if ($(window).height() != height) {
                height = $(window).height();
                $('.modal-body').css('max-height', height - 120);
            }
        });
        var chosen_user_id = $('#chosen_user_id').html()

        $.ajax({
            url: '/re/follower/list/', type: 'post', dataType: 'json', cache: false,
            data: {
                user_id: $('#chosen_user_id').html(),
                next_user_id: $('#next_user_id').html()
            },
            success: function (data) {
                console.log(data)
                if (data.res === 1) {
                    $.each(data.output, function (key, value) {
                        var appender = '<div class="modal_unit_wrapper"><a href="/' + value.username + '/">\n' +
                            '<img class="modal_img" src="' + value.photo + '">\n' +
                            '<span class="modal_username">' + value.username + '</span>\n' +
                            '</a></div>'
                        $('#modal_follower_list').append(appender)
                    })
                }
                if (data.next === null) {
                    $('#next_user_id').html('')
                    $('#modal_follower_more').addClass('hidden')
                } else {
                    $('#next_user_id').html(data.next)
                    $('#modal_follower_more').removeClass('hidden')
                }

            }
        })
    }).on("hidden.bs.modal", function () {
        $('#modal_follower_list').empty()
        $('#next_user_id').html('')
    });

    $('#modal_follower_more').click(function (e) {
        e.preventDefault()
        var chosen_user_id = $('#chosen_user_id').html()

        $.ajax({
            url: '/re/follower/list/', type: 'post', dataType: 'json', cache: false,
            data: {
                user_id: $('#chosen_user_id').html(),
                next_user_id: $('#next_user_id').html()
            },
            success: function (data) {
                console.log(data)
                if (data.res === 1) {
                    $.each(data.output, function (key, value) {
                        var appender = '<div class="modal_unit_wrapper"><a href="/' + value.username + '/">\n' +
                            '<img class="modal_img" src="' + value.photo + '">\n' +
                            '<span class="modal_username">' + value.username + '</span>\n' +
                            '</a></div>'
                        $('#modal_follower_list').append(appender)
                    })
                }
                if (data.next === null) {
                    $('#next_user_id').html('')
                    $('#modal_follower_more').addClass('hidden')
                } else {
                    $('#next_user_id').html(data.next)
                    $('#modal_follower_more').removeClass('hidden')
                }

            }
        })
    })

    $('#count_follower').click(function (e) {
        e.preventDefault()
        $('#modal_follower').modal('show')
    })
    $('#count_following').click(function (e) {
        e.preventDefault()
        $('#modal_following').modal('show')
    })
})
