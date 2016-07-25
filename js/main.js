/*
 * jQuery File Upload Plugin JS Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$(function() {
    'use strict';

    var file_size_public = 0;

    var timeStamp = 0;

    var timeOut = 0;

    var timeInteval = 0;

    var file_type_public = '';

    function check_file_type(file_type) {

        var type_accept = ['iso', 'dmg', 'zip', 'rar', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'ods', 'odt', 'odp', 'pdf', 'rtf', 'sxc', 'sxi', 'txt', 'avi', 'mpeg', 'mp3', 'mp4', '3gp', 'gif', 'jpg', 'jpeg', 'png']; //array of valid extensions

        if ($.inArray(file_type, type_accept) == -1) {

            return true;

        } else {

            return false;

        }
    }

    function check_file_size(file_size) {

        ranger_size = MAX_FILE_SIZE;

        if (file_size >= ranger_size) {

            return true;

        } else {

            return false;

        }

    }

    function check_file_size_zero(file_size) {

        if (file_size < 1) {

            return false;

        }

        return true;

    }



    $("#button_upload").click(function() {

        $("input[type='file']").click();

        $('p.tooltips').html();

    });

    $("input[type='file']").change(function(data) {

        var fileInput = document.getElementById("file-upload");

        $("div.fileupload-progress").removeClass('hidden');

        try {

            file_size = fileInput.files[0].size;

            file_type = this.value;

            file_size_public = file_size;

            file_type_public = file_type;

        } catch (e) {

            alert(e);

        }

    });

    $(window).mouseout(function() {

        $('div.modal-backdrop').removeClass('in');

        $('div.modal-backdrop').css({
            'z-index': 0,
            'height': '1px'
        });

    }).mouseleave(function() {

        $('div.modal-backdrop').removeClass('in');

        $('div.modal-backdrop').css({
            'z-index': 0,
            'height': '1px'
        });

    }).mousemove(function() {

        $('div.modal-backdrop').removeClass('in');

        $('div.modal-backdrop').css({
            'z-index': 0,
            'height': '1px'
        });

    });

    $('#fileupload').bind('fileuploadadd', function(e, data) {

            $('#cancel_all').click(function() {

                $('p.tooltips').html('');

                $('p.tooltips').fadeOut('fast');

                $(this).addClass('hidden');

                $("#button_upload").show();

                $("div.fileupload-progress").addClass('hidden');

            });

            if (file_size_public == 0) {

                file_size_public = data.files[0].size;

            };

            if (check_file_size(file_size_public)) {

                $('p.tooltips').html(error_messega_uploadsize);

                $('p.tooltips').fadeIn('fast');

                $("div.fileupload-progress").addClass('hidden');

                return false;
            }

            if (check_file_size_zero(file_size_public) == false) {

                $('p.tooltips').html(error_messega_uploadsize_zero);

                $('p.tooltips').fadeIn('fast');

                $("div.fileupload-progress").addClass('hidden');

                return false;
            }

            file_type = data.files[0].name;

            if (check_file_type(file_type.split('.').pop().toLowerCase())) {

                $('p.tooltips').html(error_messega_uploadtype);

                $('p.tooltips').fadeIn('fast');

                $("div.fileupload-progress").addClass('hidden');

                return false;

            }

            var jqXHR = data.submit();

            if (isDragging) {

                $("div.fileupload-progress").removeClass('hidden');

                isDragging = false;

            };

            $("#button_upload").hide();

            $('#cancel_all').removeClass('hidden');

            $('p.tooltips').hide();

            $('#cancel_all').on('click', function(e) {

                jqXHR.abort();

                $('#button_upload').show();

                $('#cancel_all').addClass('hidden');

                $("div.fileupload-progress").addClass('hidden');

            });

        })
        .bind('fileuploaddragover', function(e, data) {

            if (timeInteval == 0) {

                var timeInteval_1 = setInterval(function() {

                    check_drag(timeInteval_1);

                }, 500);

                timeInteval = 1;

            };

            $('div.modal-backdrop').addClass('in');

            $('div.modal-backdrop').css({
                'z-index': 99999,
                'height': 'auto'
            });

            timeStamp = e.timeStamp;

            if (timeOut != 0) {

                clearTimeout(timeOut);

            };

            timeOut = setTimeout(function() {

                timeStamp = 1;

            }, 300);

        })
        .bind('fileuploaddrop', function(e, data) {

            $('div.modal-backdrop').removeClass('in');

            $('div.modal-backdrop').css({
                'z-index': 0,
                'height': '1px'
            });

        })
        .bind('fileuploadchunkfail', function(e, data) {

            $('p.tooltips').html('Please check your network. We can not connect to the server !');

            $('p.tooltips').fadeIn('fast');

        })
        .bind('fileuploaddone', function(e, data) {

            if (data.jqXHR.responseJSON.files.size > 0) {

                if (data.jqXHR.responseJSON.files.ID != null) {

                    $("#fileupload").attr('action', APP_BASE_URL + "upload/link/" + data.jqXHR.responseJSON.files.ID);

                    $("#fileupload").submit();

                } else {

                    $('p.tooltips').html('Can\'t save file');

                    $('p.tooltips').fadeIn('fast');

                }

            } else {

                if (typeof data.jqXHR.responseJSON.files[0] != "undefined") {

                    if (typeof data.jqXHR.responseJSON.files[0].error != "undefined") {};

                    $('p.tooltips').html(data.jqXHR.responseJSON.files[0].error);

                } else {

                    $('p.tooltips').html('Data error');

                }

                $('p.tooltips').fadeIn('fast');

            }

        });

    function check_drag(time) {

        if (timeStamp == 1) {

            $('div.modal-backdrop').removeClass('in');

            $('div.modal-backdrop').css({
                'z-index': 0,
                'height': '1px'
            });

            timeInteval = 0;

            clearInterval(time);

        };

    }

});

$(document).ready(function() {

    $("input[type=file]").val('');

    $('p.tooltips').val('');

});
