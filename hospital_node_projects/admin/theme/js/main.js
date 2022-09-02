/**
 * Copyright (C) Zero IT Solutions - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential. Dissemination of this information or reproduction 
 * of this material is strictly forbidden unless prior written permission is obtained
 * from Zero IT Solutions.
 
 * 
 * Written By  : Diksha Jaswal <dikshaj.zeroit@gmail.com>, May 2022
 * Description :
 * Modified By :
 */	
 let KWACHA_MAIN        = {},
    base_url            = window.location.origin;

KWACHA_MAIN.sweetAlert = function (_obj) {
    let ajaxTitle = "Done!",
        ajaxMessage = "successfully Done!",
        ajaxType = "success";

    if (typeof _obj == 'object') {
        if (_obj.title && _obj.title != '') {
            ajaxTitle = _obj.title;
        }
        if (_obj.message && _obj.message != '') {
            ajaxMessage = _obj.message;
        }
        if (_obj.type && _obj.type != '') {
            ajaxType = _obj.type;
        }
    }
    setTimeout(function () {
        swal({
            title: ajaxTitle,
            text: ajaxMessage,
            type: ajaxType,
            allowEscapeKey: false,
            allowOutsideClick: false
        }, function () {
            if (_obj.ajaxRedirect && typeof _obj.ajaxRedirect != 'undefined' && _obj.ajaxRedirect != '') {
                window.location = KWACHA_BASE_URL + _obj.ajaxRedirect;
            } else {
                // $('#commonConfirm').modal('hide');

                $('#submitHandlerBtn').show();
                $('#loader').hide();
                $('.submitText').show();
                $('.updateText').hide();
                $('.formSubmitHendler').attr("disabled", false);

                if ($('#' + _obj.subButn).length > 0) {
                    $('#' + _obj.subButn).show();
                }
                if ($('#' + _obj.subButnLoder).length > 0) {
                    $('#' + _obj.subButnLoder).hide();
                }
                if ($('button').length > 0) {
                    $('button').prop('disabled', false);
                }
                if (typeof _obj.callback != 'undefined' && typeof (_obj.callback == 'function')) {

                    _obj.callback(_obj.offset);
                } else {

                    swal.close();
                }
            }

        });
    }, 100);
}

KWACHA_MAIN.loadPageData = function (pageNum, config) {
    
   let _config          = {},
       containerId      = ".dynamic-listing",
       page_num         = pageNum ? pageNum : 0,
       _url             = '',
       sortBy           = '',
       sortOrder        = '',
       keywords         = '',
       perPage          = '10',
       postData         = '';
    if ( config ) {
        _config = config;
    } 
   
    if ( _config ) {

        if (_config.containerId) {
            containerId = _config.containerId;
        }
        if (_config.url) {
            _url = _config.url;
        }
        
    }


    

    postData = { 'page': page_num, 'keywords': keywords, 'perPage': perPage, 'sortBy': sortBy,  'sortOrder': sortOrder, }

    
    if (_url != '') {
        
        $.ajax({
            type: 'POST',
            url: _url,
            data: postData,
            success: function (html) {
                $(containerId).html(html);
            },
            error: function (error) {
                errorCode = error.status;
                if (errorCode == 401) {
                    let json = JSON.parse(error.responseText);
                    let errorConfig = {
                        title: 'Error',
                        message: json.message,
                        type: 'error',
                        ajaxRedirect: '/admin'
                    }
                    KWACHA_MAIN.sweetAlert(errorConfig);
                } 
            }
        });
    }
}
KWACHA_MAIN.getUserData = function () {

    $.ajax({
        url         : "get-user-data",
        contentType : false,
        processData : false,
        method      : 'POST',
        type        : 'POST',
        success: function (data) {

            if ( data && data.payload && data.payload.length > 0 ) {

                $("#userName").html(data.payload[0].name);

                if ( data.payload[0].image ) {
                    $("#loginUserImage").attr("src",'uploads/user_profile_images/'+data.payload[0].image);
                }

            } 

        },
        

    });

       

}
KWACHA_MAIN.getUserData();

KWACHA_MAIN.checkLogin = function () {
    if ( !localStorage.getItem("isUserLogin") ) {
        window.location.href = "/";
    }   
}  

KWACHA_MAIN.userLogout = function () {

    localStorage.clear();
    window.location.href = "/sign-in";

    $.ajax({
        url         : "user-logout",
        contentType : false,
        processData : false,
        method      : 'POST',
        type        : 'POST',
        success: function (data) {},
    });

       

}
























































  

