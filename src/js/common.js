function validate(form, options) {
    var setings = {
        errorFunction: null,
        submitFunction: null,
        highlightFunction: null,
        unhighlightFunction: null
    };
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function (e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass: 'errorText',
            focusCleanup: true,
            focusInvalid: false,
            invalidHandler: function (event, validator) {
                if (typeof( setings.errorFunction ) === 'function') {
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.closest('.form-group'));
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if (typeof( setings.highlightFunction ) === 'function') {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('error');
                if (typeof( setings.unhighlightFunction ) === 'function') {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function (form) {
                if (typeof( setings.submitFunction ) === 'function') {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]', $form).each(function () {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: 'Вы пропустили'
                }
            });
        });

        if ($('[type="email"]', $form).length) {
            $('[type="email"]', $form).rules('add',
                {
                    messages: {
                        email: 'Невалидный email'
                    }
                });
        }

        if ($('.tel-mask[required]', $form).length) {
            $('.tel-mask[required]', $form).rules('add',
                {
                    messages: {
                        required: 'Введите номер мобильного телефона.'
                    }
                });
        }

        $('[type="password"]', $form).each(function () {
            if ($(this).is('#re_password') === true) {
                $(this).rules('add', {
                    minlength: 6,
                    equalTo: '#password',
                    messages: {
                        equalTo: 'Пароли не совпадают',
                        minlength: 'Недостаточно символов.'
                    }
                });
            }
        });
    }
}

/**
 * Mask on input(russian telephone)
 */
function Maskedinput() {
    if ($('.tel-mask')) {
        $('.tel-mask').mask('+7 (999) 999-99-99');
    }
}

/**
 * Sending form with a call popup
 * @param {form} string - Form
 */
function validationCall(form) {

    var thisForm = $(form);
    var formSur = thisForm.serialize();
    console.log(formSur);

    // $.ajax({
    // 	url: thisForm.attr( 'action' ),
    // 	data: formSur,
    // 	method: 'POST',
    // 	success: function( data ) {
    // 		if ( data.trim() === 'true' ) {
    // 			thisForm.trigger( 'reset' );
    // 			$.fancybox.close();
    // 			popNext( '#call_success', 'call-popup' );
    // 		}			else {
    // 			thisForm.trigger( 'reset' );
    // 		}
    //
    // 	}
    // });

}


/**
 * Sending form with a call popup
 * @param {popupId} string - Id form, that we show
 * @param {popupWrap} string - Name of class, for wrapping popup width form
 */
function popNext(popupId, popupWrap) {

    $.fancybox.open({
        src: popupId,
        type: '',
        opts: {
            baseClass: popupWrap || '',
            afterClose: function () {
                $('form').trigger('reset');
                clearTimeout(timer);
            }
        }
    });

    var timer = null;

    timer = setTimeout(function () {
        $('form').trigger('reset');
        $.fancybox.close();
    }, 2000);

}

/**
 * Fansybox on form
 */
function fancyboxForm() {
    $('.fancybox-form').fancybox({
        baseClass: 'fancybox-form'
    });
}

function menuToggle() {
    $('.menu-toggle').click(function () {
        var menu = $(this).attr('data-toggle');
        $(this).toggleClass('active');
        $('[data-toggle="' + menu + '"]').not($(this)).stop().slideToggle();
        return false;
    });
}

function onScroll(event) {
    var scrollPos = $(window).scrollTop();
    $('.hmenu a.js-scrolldown').each(function () {
        var currLink = $(this),
            refElement = currLink.attr('href'),
            topPos = $('.js-scrollSection[data-scroll="' + refElement + '"]').offset().top - $('.header').outerHeight();
        if (topPos <= scrollPos && topPos + $('.js-scrollSection[data-scroll="' + refElement + '"]').height() > scrollPos) {
            $('.hmenu a.js-scrolldown').removeClass('active');
            currLink.addClass('active');
        }
    });
}


function footerPlaceholder() {
    $('.footer_placeholder').height($('.footer').outerHeight());
}

function scrollDown() {
    $('.js-scrolldown').click(function () {
        var scroll = $(this).attr('href'),
            body = $('html, body'),
            scrolltop = $('.js-scrollSection[data-scroll="' + scroll + '"]').offset().top - $('.header').outerHeight();
        $('.js-scrolldown').removeClass('active');
        $(this).addClass('active');
        if (scrolltop) {
            body.stop().animate({scrollTop: scrolltop}, 500, 'swing');
        }
        return false;
    });
}

$(document).ready(function () {


    footerPlaceholder();
    //validate('.js-form', {submitFunction: validationCall});
    Maskedinput();
    fancyboxForm();
    menuToggle();
    scrollDown();
});

$(window).resize(function () {
    footerPlaceholder();
});

$(window).scroll(function () {
    onScroll();
    $('.js-menu-hidden, .openMenu').removeClass('active');
})


