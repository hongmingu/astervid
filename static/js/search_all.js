$(function () {
    if ($('#search_word').html() === '') {
        $('#content_user').append('<div class="h4">need search word</div>')
        $('#content_solo').append('<div class="h4">need search word</div>')
        $('#content_group').append('<div class="h4">need search word</div>')
        $('#content_post').append('<div class="h4">need search word</div>')
    } else {
        $.ajax({
            url: '/re/search/all/', type: 'post', dataType: 'json', cache: false,
            data: {
                search_word: $('#search_word').html()
            },
            success: function (data) {
                if (data.res === 1) {
                    //post set
                    if (data.user_output.length === 0) {
                        $('#content_user').append('<div class="h4">no results</div>')
                        $('#more_user').addClass('hidden')
                    } else {
                        $('#more_user').removeClass('hidden')
                        $.each(data.user_output, function (key, value) {
                            var appender = '<div class="search_user_wrapper">' +
                                '<a href="/' + value.username + '/"><span>' +
                                '<span class="search_user_username">' + value.username + '</span>' +
                                '<span class="search_user_textname">' + value.user_text_name + '</span>' +
                                '</span></a>' +
                                '</div>'
                            $('#content_user').append(appender)
                        })
                    }
                    //user set

                    if (data.solo_output.length === 0) {
                        $('#content_solo').append('<div class="h4">no results</div>')
                        $('#more_solo').addClass('hidden')


                    } else {
                        $('#more_solo').removeClass('hidden')
                        $.each(data.solo_output, function (key, value) {

                            var member = '';
                            $.each(value.member, function (key, value) {
                                member = member + ' ' + value

                            })
                            var path = ''
                            var scheme = window.location.protocol == "https:" ? "https://" : "http://";
                            if (value.obj_type === 'group') {
                                path = scheme + window.location.host + "/group/profile/" + value.id + "/";
                            } else if (value.obj_type === 'solo') {
                                path = scheme + window.location.host + "/solo/profile/" + value.id + "/";
                            }
                            var appender = $('<a href="' + path + '"><div class="clickable search_obj_wrapper">' +
                                '<div class="search_obj_img_wrapper">' +
                                '<img class="search_obj_img" src="' + value.main_photo + '">' +
                                '</div>' +
                                '<div class="search_obj_detail_wrapper">' +
                                '<div class="search_obj_detail_name">' + value.main_name + '</div>' +
                                '<div class="search_obj_detail_explain h5">' + member + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</a>')
                            $('#content_solo').append(appender)
                        })
                    }


                    if (data.group_output.length === 0) {
                        $('#content_group').append('<div class="h4">no results</div>')
                        $('#more_group').addClass('hidden')


                    } else {
                        $('#more_group').removeClass('hidden')
                        $.each(data.group_output, function (key, value) {

                            var member = '';
                            $.each(value.member, function (key, value) {
                                member = member + ' ' + value

                            })
                            var path = ''
                            var scheme = window.location.protocol == "https:" ? "https://" : "http://";
                            if (value.obj_type === 'group') {
                                path = scheme + window.location.host + "/group/profile/" + value.id + "/";
                            } else if (value.obj_type === 'solo') {
                                path = scheme + window.location.host + "/solo/profile/" + value.id + "/";
                            }
                            var appender = $('<a href="' + path + '"><div class="clickable search_obj_wrapper">' +
                                '<div class="search_obj_img_wrapper">' +
                                '<img class="search_obj_img" src="' + value.main_photo + '">' +
                                '</div>' +
                                '<div class="search_obj_detail_wrapper">' +
                                '<div class="search_obj_detail_name">' + value.main_name + '</div>' +
                                '<div class="search_obj_detail_explain h5">' + member + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</a>')
                            $('#content_group').append(appender)
                        })
                    }


                    if (data.post_output.length === 0) {
                        $('#content_post').append('<div class="h4">no results</div>')
                        $('#more_post').addClass('hidden')


                    } else {
                        $('#more_post').removeClass('hidden')
                        $.each(data.post_output, function (key, value) {
                            var appender = '<div class="row div_base" id="post_wrapper_' + value.id + '">' +
                                '<script defer>' +
                                'post_populate("' + value.id + '", "' + value.obj_type + '")' +
                                '<' + '/script>' +
                                '</div>'
                            $('#content_post').append(appender)
                        })
                    }

                }


            }
        })
    }


})