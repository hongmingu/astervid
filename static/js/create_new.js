$(function () {
    $('#create_search_btn').click(function (e) {
        e.preventDefault()
        var keyword = $('#create_search_input').val()
        if (keyword.replace(/ /g, '') === '') {
            return false
        }
        if (keyword.length > 2048) {
            return false
        }
        $('#solo_end').html('false')
        $('#group_end').html('false')
        $('#solo_id').html('')
        $('#group_id').html('')

        $('#keyword').html(keyword)
        $.ajax({
            url: '/re/create/search/', type: 'post', dataType: 'json', cache: false,
            data: {
                keyword: keyword,
                solo_id: $('#solo_id').html(),
                group_id: $('#group_id').html(),
                solo_end: $('#solo_end').html(),
                group_end: $('#group_end').html(),
            },
            success: function (data) {
                if (data.res === 1) {
                    $('#create_search_result').empty()
                    $.each(data.output, function (key, value) {
                        var member = '';
                        $.each(value.member, function (sub_key, sub_value) {
                            member = member + ' ' + sub_value

                        })
                        var path = ''
                        var scheme = window.location.protocol == "https:" ? "https://" : "http://";
                        if (value.kind === 'group') {
                            path = scheme + window.location.host + "/create/group/post/" + value.id + "/";
                        } else if (value.kind === 'solo') {
                            path = scheme + window.location.host + "/create/solo/post/" + value.id + "/";
                        }
                        var appender = $('<a href="' + path + '"><div class="clickable">' +
                            '<div class="create_search_img_wrapper">' +
                            '<img class="create_search_img" src="' + value.main_photo + '">' +
                            '</div>' +
                            '<div class="create_search_detail_wrapper">' +
                            '<div class="create_search_detail_name">' + value.main_name + '</div>' +
                            '<div class="create_search_detail_explain h5">' + member + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>')
                        $('#create_search_result').append(appender)
                    })


                    if (data.group_end === 'true') {
                        $('#group_end').html('true')
                    }
                    if (data.solo_end === 'true') {
                        $('#solo_end').html('true')
                    }
                    $('#solo_id').html(data.solo_id)
                    $('#group_id').html(data.group_id)
                    if (data.solo_end === 'true' && data.group_end === 'true') {
                        if (!($('#create_search_more_load').hasClass('hidden'))) {
                            $('#create_search_more_load').addClass('hidden')
                        }
                    } else {
                        if ($('#create_search_more_load').hasClass('hidden')) {
                            $('#create_search_more_load').removeClass('hidden')
                        }
                    }

                }
            }
        });

    })

    $('#create_search_input').on("keypress", function (e) {
        /* ENTER PRESSED*/
        if (e.keyCode == 13 && !e.shiftKey) {

            e.preventDefault()
            var keyword = $('#create_search_input').val()

            if (keyword.replace(/ /g, '') === '') {
                return false
            }
            if (keyword.length > 2048) {
                return false
            }
            $('#solo_end').html('false')
            $('#group_end').html('false')
            $('#solo_id').html('')
            $('#group_id').html('')

            $('#keyword').html(keyword)
            $.ajax({
                url: '/re/create/search/', type: 'post', dataType: 'json', cache: false,
                data: {
                    keyword: keyword,
                    solo_id: $('#solo_id').html(),
                    group_id: $('#group_id').html(),
                    solo_end: $('#solo_end').html(),
                    group_end: $('#group_end').html(),
                },
                success: function (data) {
                    if (data.res === 1) {
                        $('#create_search_result').empty()

                        console.log(data)
                        $.each(data.output, function (key, value) {
                            var member = '';
                            $.each(value.member, function (sub_key, sub_value) {
                                member = member + ' ' + sub_value

                            })
                            var path = ''
                            var scheme = window.location.protocol == "https:" ? "https://" : "http://";
                            if (value.kind === 'group') {
                                path = scheme + window.location.host + "/create/group/post/" + value.id + "/";
                            } else if (value.kind === 'solo') {
                                path = scheme + window.location.host + "/create/solo/post/" + value.id + "/";
                            }
                            var appender = $('<a href="' + path + '"><div class="clickable">' +
                                '<div class="create_search_img_wrapper">' +
                                '<img class="create_search_img" src="' + value.main_photo + '">' +
                                '</div>' +
                                '<div class="create_search_detail_wrapper">' +
                                '<div class="create_search_detail_name">' + value.main_name + '</div>' +
                                '<div class="create_search_detail_explain h5">' + member + '</div>' +
                                '</div>' +
                                '</div>' +
                                '</a>')
                            $('#create_search_result').append(appender)
                        })


                        if (data.group_end === 'true') {
                            $('#group_end').html('true')
                        }
                        if (data.solo_end === 'true') {
                            $('#solo_end').html('true')
                        }
                        $('#solo_id').html(data.solo_id)
                        $('#group_id').html(data.group_id)
                        if (data.solo_end === 'true' && data.group_end === 'true') {
                            if (!($('#create_search_more_load').hasClass('hidden'))) {
                                $('#create_search_more_load').addClass('hidden')
                            }
                        } else {
                            if ($('#create_search_more_load').hasClass('hidden')) {
                                $('#create_search_more_load').removeClass('hidden')
                            }
                        }

                    }
                }
            });
            return false;
        }
    })
    $('#create_search_more_load').click(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/re/create/search/', type: 'post', dataType: 'json', cache: false,
            data: {
                keyword: $('#keyword').html(),
                solo_id: $('#solo_id').html(),
                group_id: $('#group_id').html(),
                solo_end: $('#solo_end').html(),
                group_end: $('#group_end').html(),
            },
            success: function (data) {
                if (data.res === 1) {
                    console.log(data)
                    $.each(data.output, function (key, value) {
                        var member = '';
                        $.each(value.member, function (sub_key, sub_value) {
                            member = member + ' ' + sub_value

                        })

                        var appender = $('<a href=""><div class="clickable">' +
                            '<div class="create_search_img_wrapper">' +
                            '<img class="create_search_img" src="' + value.main_photo + '">' +
                            '</div>' +
                            '<div class="create_search_detail_wrapper">' +
                            '<div class="create_search_detail_name">' + value.main_name + '</div>' +
                            '<div class="create_search_detail_explain h5">' + member + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>')
                        $('#create_search_result').append(appender)
                    })


                    if (data.group_end === 'true') {
                        $('#group_end').html('true')
                    }
                    if (data.solo_end === 'true') {
                        $('#solo_end').html('true')
                    }
                    $('#solo_id').html(data.solo_id)
                    $('#group_id').html(data.group_id)
                    if (data.solo_end === 'true' && data.group_end === 'true') {
                        if (!($('#create_search_more_load').hasClass('hidden'))) {
                            $('#create_search_more_load').addClass('hidden')
                        }
                    } else {
                        if ($('#create_search_more_load').hasClass('hidden')) {
                            $('#create_search_more_load').removeClass('hidden')
                        }
                    }

                }
            }
        });

    })
});
