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

function showMoreInfoTariff() {
    $('.tariff__item').each(function(){
        let parent = $(this);

        $('.show-more', parent).click(function () {
            let itemHeight = $('.tariff__info', parent).height();
            let marginPlace = itemHeight - 135 + 70;
            $('.tariff__info-wrap').css('maxHeight', 135);
            if($(this).is('.active')){
                $(this).removeClass('active');
                $('.tariff__item-content', parent).removeClass('active');
                $('.tariff__info-wrap', parent).css('maxHeight', 135);
                $('.tariff').css('marginBottom', 70 )
            } else {
                $('.show-more').removeClass('active');
                $('.tariff__item-content').removeClass('active');

                $(this).addClass('active');
                $('.tariff__item-content', parent).addClass('active');
                $('.tariff__info-wrap', parent).css('maxHeight', itemHeight);
                $('.tariff').css('marginBottom', marginPlace );
            }
        });
    })
}

function scrollHeader() {
    const scroll = $(window).scrollTop();

    if (scroll >= 30) {
        $('.header').addClass(' fixed');
    } else {
        $('.header').removeClass(' fixed');
    }
}

function initMap() {
    const map = new google.maps.Map(
        document.getElementById('map'), {
            center: {lat: 49.414741, lng: 27.025879},
            zoom: 18
        });
    const marker = new google.maps.Marker({
        position: {lat: 49.414741, lng: 27.025879},
        map: map,
        title: 'GMhost',
    });
}

function refreshSelects(){
    // remove "selected" from any options that might already be selected
    var array_select = $('#tar_os_ver option[selected="selected"], #tar_cp option[selected="selected"]');

    for (i = 0; i < array_select.length; i++) {
        $(array_select[i]).removeAttr('selected');
    }

    // mark the first option as selected
    $('#tar_os_ver option:first, #tar_cp option:first').attr('selected','selected');

    // refresh styler
    // if(isApple()){
    //     $('#tar_os_ver, #tar_cp').styler('destroy');
    //     $('#tar_os_ver, #tar_cp').addClass('apple-select');
    // } else {
    $('#tar_os_ver, #tar_cp').styler('destroy').styler();
    // }

}
function refreshTotals(){
    //if((window.location.pathname=='/')||(window.location.pathname=="/service/ssd-vps")||(window.location.pathname=="/service/ssd-vps-windows")){
      if(true) {
        var total = 0;
        var rate = 1;
        var service_fee = 0;
        var version_fee = 0;
        var cp_fee = 0;
        var os_fee = 0;

        os_fee = parseFloat($('#tar_os option:selected').attr('data-price'));

        version_fee = parseFloat($('#tar_os_ver option:selected').attr('data-price'));

        cp_fee = parseFloat($('#tar_cp option:selected').attr('data-price'));

        var array_slider_input = $('.tarif-calc-slider input[type="range"]');
        for (var i = 0; i < array_slider_input.length; i++) {
            if(i!=0){
                service_fee = parseFloat(service_fee) + parseFloat($(array_slider_input[i]).attr('data-price')*$(array_slider_input[i]).val()/$(array_slider_input[i]).attr('step'));
            } else{
                var cpu_count=$(array_slider_input[i]).val();
                var cpu_rate=0;
                if(cpu_count<=8){
                    cpu_rate=1;
                }else if(cpu_count<=16){
                    cpu_rate=2;
                }else{
                    cpu_rate=3;
                }
                service_fee = parseFloat(service_fee) + parseFloat(cpu_rate*$(array_slider_input[i]).val()/$(array_slider_input[i]).attr('step'));
            }
        }

        rate = parseFloat($('.tarif-calc-result-price p').attr('data-rate'));

        // update total price
        total = parseFloat(total) + parseFloat(service_fee) + parseFloat(version_fee) + parseFloat(cp_fee) + parseFloat(os_fee);
        total = total * rate;
        total = parseFloat(total).toFixed(2);
        $('.tarif-calc-result-price p .bef_dot').text(parseInt(total));
        $('.tarif-calc-result-price p .aft_dot').text(total.split(".")[1].substr(0,2));

        //update services
        var array_service = $('.service-total div[data-service]');
        for (i = 0; i < array_service.length; i++) {
            $(array_service[i]).text($('.tarif-calc-slider input[name='+$(array_service[i]).attr('data-service')+']').val());
        }

        //update os, version, cp
        $('.osrval .rval').text($('#tar_os option:selected').text());
        $('.vrval .rval').text($('#tar_os_ver option:selected').text());
        $('.panelrval .rval').text($('#tar_cp option:selected').text());
        if( window.location.href.indexOf('ssd-vps-windows') >= 0){
            $('.panelrval .rval').text('-');
        }
    }else if(window.location.pathname=="/service/cloud"){
        debugger;
        var total = 0;
        //Сторедж рейты
        var rate10=0.019;
        var rate100=0.018;
        var rate101=0.015;
        //Рейты трафіка вихідного
        var rateV10=0.015;
        var rateV100=0.013;
        var rateV1000=0.012;
        var rateV1001=0.01;
        var cloud_stor=parseInt($('#cloud_calc #cloud_stor').val().replace(/[^\d]/g, ""));
        var cloud_upload=parseInt($('#cloud_calc #cloud_upload').val().replace(/[^\d]/g, ""));
        var rate=0;
        var ratev=0;
        if (cloud_stor<1000){
            rate=rate1;
        }else if(cloud_stor<10000){
            rate=rate10;
        }else if(cloud_stor<100000){
            rate=rate100;
        }else if(cloud_stor>=100000){
            rate=rate101;
        }
        if (cloud_upload<1000){
            rateV=rateV10;
        }else if(cloud_upload<10000){
            rateV=rateV100;
        }else if(cloud_upload<100000){
            rateV=rateV1000;
        }else if(cloud_upload>=100000){
            rateV=rateV1001;
        }
        total = cloud_stor*rate +cloud_upload*rateV;
        var curRate=$('#currency span[data-type="'+$('.currency .active a').attr('data-type')+'"]').attr('data-value');
        total= total*curRate;
        total = parseFloat(total).toFixed(2);
        $('.osrval .rval').text(cloud_stor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ГБ');
        $('.vrval .rval').text(cloud_upload.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")+' ГБ');
        $('#cloud_stor').next().attr( "data-price-value", rate );
        $('#cloud_upload').next().attr( "data-price-value", rateV );
        $('.tarif-calc-result-price p .bef_dot').text(parseInt(total));
        $('.tarif-calc-result-price p .aft_dot').text(total.split(".")[1].substr(0,2));
        ;
        $('.info-domain.price .symbol').text($('#currency span[data-type="'+$('.currency .active a').attr('data-type')+'"]').attr('data-symbol'));
        $('#cloud_stor').next().find('.value').text((curRate*rate).toFixed(3));
        $('#cloud_upload').next().find('.value').text((curRate*rateV).toFixed(3));
    }
}

function tableSlider() {
    if($(window).width()>767 && $('.host-table').is('.slick-initialized')) {
        $('.host-table').slick('unslick');
    }
    else if($(window).width()<=767 && !$('.hast-table').is('.slick-initialized')) {
        $('.host-table').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            autoScroll: false,
        });
    }
}
function footerMenu() {
    $('.footer__menu-title').click(function () {
        $(this).addClass('active');
        $(this).siblings().slideToggle(200);
    });
}



$(document).ready(function () {

    $('.js-slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('.accordion__item-title').click(function (e) {
        $('.accordion__item-title').removeClass('active');
        $(this).addClass(' active');
        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $(this).removeClass(' active');
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('.accordion__item-content').removeClass('show');
            $this.parent().parent().find('.accordion__item-content').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

    // $('.table-accordion__head').click(function (e) {
    //     $('.table-accordion__head').removeClass('active');
    //     $(this).addClass(' active');
    //     var $this = $(this);
    //
    //     if ($this.next().hasClass('show')) {
    //         $(this).removeClass(' active');
    //         $this.next().removeClass('show');
    //         $this.next().slideUp(350);
    //     } else {
    //         $this.parent().parent().find('.table-accordion__content').removeClass('show');
    //         $this.parent().parent().find('.table-accordion__content').slideUp(350);
    //         $this.next().toggleClass('show');
    //         $this.next().slideToggle(350);
    //     }
    // });

    $('.show-all-certificat').click(function () {
        $(this).toggleClass(' active');
        $(this).closest('.ssl__item').find('.certificat').slideToggle();
    });

    $('.js-show-more').click(function () {
        var btnTitle = this;
        $('.hidden-block').slideToggle('fast', function () {
            if($(this).css('display') == 'list-item') {
                $(btnTitle).text($(btnTitle).data('change-title'));
            }
            else {
                $(btnTitle).text($(btnTitle).data('title'));
            }
        });
    });

    $('.menu__item').hover(function (e) {
        $(this).toggleClass(' active');
    });

    $('.current-list li').click(function () {
        $('.current-list li').removeClass('active');
        $(this).toggleClass('active');
    });

    $('.lang').hover(function () {
        $(this).toggleClass('active');
        $('.lang__btn').toggleClass('active');
        $('.lang__list').slideToggle(100);
    });

    $('.table-accordion__head').click(function () {
        var idElement = $(this).data("id");
        var clickElement = $('.host-table').find("[data-id='" + idElement + "']");

        if ($(clickElement).closest('.table-accordion').find('.table-accordion__content').is('.show')) {
            $(clickElement).removeClass('active');
            $('.table-accordion__content').removeClass('show').slideUp(350);
        } else {
            $('.table-accordion__head').removeClass('active');
            $('.table-accordion__content').removeClass('show').slideUp(350);
            $(clickElement).closest('.table-accordion').find('.table-accordion__content').addClass('show');
            $(clickElement).next().slideDown(350);
            $(clickElement).addClass('active');
        }
    });




    $('.js-tab-button').click(function (e) {
        var data = JSON.parse($(this).attr('data-slider'));
        $('.js-title').html(data.title);
        $('.js-sub-title').html(data['sub-title']);
        if(data.showCalc === true) {
            $('.js-show-calc').show();
        } else {
            $('.js-show-calc').hide();
        }
    });


    // $('.table-accordion__head').click(function(){
    //     var dataId = $(this).attr("data-id");
    //
    // });






    /* tariff calculator BEGIN */

    $('.touch .selecter-element').on('click',function(){
        $(this).siblings( ".selecter-options" ).toggle();
        $(this).parent('.selecter').removeClass('closed').addClass('open');
    });
    $('.touch .selecter-options .selecter-item').on('click',function(){
        var i=$('.touch .selecter-options .selecter-item').index(this);
        var text=$(this).html();
        //$(this).sublings('.selecter-item').removeClass('selected');
        //$(this).addClass('selected');
        $(this).parent('.selecter-options').hide();
        $(this).parent('.selecter').removeClass('open').addClass('closed');
        $(this).parent('.selecter-options').siblings('.selecter-selected').html(text);
        //$(this).parent('.selecter-options').siblings('.selecter-element').find('select option:eq('+i+')').prop('selected', true);
    })


    //replace calculator block according to active tab
    $(document).on('click', '.os-menu li a', function () {
        if ($(this).attr('href') == '#tab-windows-est') {
            $('#v_top .big-background-container h1.w').html('Недорогие Windows серверы за рубежом с идеальным сочетанием производительности и надежности');
            $('#v_top .big-background-container h3.w').html('1С:Бухгалтерия, интернет-серфинг без ограничений и под защитой.');
        } else {
            $('#v_top .big-background-container h1.w').html('Недорогие виртуальные серверы на Windows с идеальным сочетанием производительности и надежности');
            $('#v_top .big-background-container h3.w').html('Безлимитный трафик. Бесплатная лицензия. Помощь в администрировании.');
        }
        if ($(this).attr('href') == '#tab-linux-est') {
            $('#tarif-calc-wrap').hide();
            $('#calc-tariff-place').hide();
        } else {
            $('#calc-tariff-place').show();
            $('#tarif-calc-wrap').show();
        }
        $("#tarif-calc-wrap").detach().appendTo('#calc-tariff-place');
    });

    $(document).on('click', '.tarif-collapse a', function (e) {
        e.preventDefault();
        $('.tarif-calc').slideToggle();
        $('#tar_os_ver, #tar_cp, #tar_os').styler('destroy').styler();
        // }
    })

    //os pick
    $(document).on('click','.ositem', function(){
        $('.ositem.active').removeClass('active');
        $(this).addClass('active');

        //version show
        $('#tar_os_ver option[data-os]').remove();

        $('#helper_tar_os_ver option[data-os='+$(this).find('input').attr('data-id')+']').clone().appendTo('#tar_os_ver');

        $('#tar_os_ver, #tar_cp, #tar_os').styler('destroy').styler();


        $('#tar_cp option[data-os]').remove();
        if ($(this).find('input').attr('data-if-cp') == '1') {
            $('#helper_tar_cp option[data-os]').clone().appendTo('#tar_cp');
        }



        refreshSelects();
        refreshTotals();
    });

    // sliders
    $(document).on('mousemove change touchmove', 'input[type="range"]', function () {
        $(this).parent().parent().find('input[type="text"]').val($(this).val());
        refreshTotals();
    });

    // on cp and version change
    $(document).on('change', '#tar_os_ver, #tar_os, #tar_cp, #cloud_stor, #cloud_upload', function () {
        refreshTotals();
    });
    $('#cloud_stor, #cloud_upload').keyup( function(){
        $(this).val($(this).val().toString().replace(/[^\d]/g, "").replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        if(!$(this).val()==''){
            refreshTotals();
        }
    });
    $('#cloud_stor, #cloud_upload').blur( function(){
        if($(this).val()==''){
            $(this).val(1);
            refreshTotals();
        }
    });
    $(document).on('submit','#cloud_calc',function(e){
        e.preventDefault();
        if (($('#cloud_stor').val() === '0')||($('#cloud_upload').val() === '0')) {
            alert('Закажите больше');
            return false;
        }

        // base url of prod
        var url = 'https://gmhost.com.ua/login?&startpage=s3&startform=s3%2Eorder%2Eparam&pricelist=1940&period=1&project=1';
        window.location.replace(url);
    });

    // generate url for redirect
    $(document).on('submit','#tariff-form',function(e){
        e.preventDefault();



        if ($('#tar_os_ver').val() === 'not_selected') {
            $('#tar_os_ver-styler').addClass('error');
            $('html, body').animate({ scrollTop: $('#tariff-form').offset().top }, 'slow');
            return false;
        }

        // base url of prod
        var url = 'https://gmhost.com.ua/login?&lang=ru&redirect=startpage=vds&startform=vds%2Eorder%2Eparam&pricelist=1563&period=1&project=1';
        if( window.location.href.indexOf('ssd-vps-windows') >= 0){
            url = 'https://gmhost.com.ua/login?&lang=ru&redirect=startpage=vds&startform=vds%2Eorder%2Eparam&pricelist=1921&period=1&project=1';
        }

        // base url of dev
        // var url = 'http://dev.gmhost.hosting/login?&lang=ru&redirect=startpage=vds&startform=vds%2Eorder%2Eparam&pricelist=1563&period=1&project=1';

        if ($('#tar_cp').val() != 'none') {
            url += '&addon_1575=' + $('#tar_cp').val();
        }

        url += '&ostempl=' + $('#tar_os_ver').val();

        var array_slider = $('.tarif-calc-slider input[type="range"]');

        for (i = 0; i < array_slider.length; i++) {
            if ($(array_slider[i]).attr('data-key') == 'addon_1566') {
                url += '&' + $(array_slider[i]).attr('data-key') + '=' + parseInt(parseFloat($(array_slider[i]).val())*1024);
            } else if ($(array_slider[i]).attr('data-key') == 'addon_1565') {
                url += '&' + $(array_slider[i]).attr('data-key') + '=' + parseInt(parseFloat($(array_slider[i]).val()));
            } else {
                url += '&' + $(array_slider[i]).attr('data-key') + '=' + $(array_slider[i]).val();
            }
        }
        window.location.replace(url);
    });
    $(document).on('submit','#cloud_calc',function(e){
        e.preventDefault();



        if (($('#cloud_stor').val() === '0')||($('#cloud_upload').val() === '0')) {
            alert('Закажите больше');
            return false;
        }

        // base url of prod
        var url = 'https://gmhost.com.ua/login?&startpage=s3&startform=s3%2Eorder%2Eparam&pricelist=1940&period=1&project=1';
        window.location.replace(url);
    });

    // remove error class from OS version select
    $(document).on('click touch', '#tar_os_ver-styler.error', function () {
        $(this).removeClass('error');
    });

    // refresh calculator currency rate
    $(document).on('click','.menu_element .currency li a', function(){
        $('.tarif-calc-result-price p sup:first-child').text($('#currency span[data-type="'+$(this).attr('data-type')+'"]').attr('data-symbol'));
        $('.tarif-calc-result-price p').attr('data-rate' , $('#currency span[data-type="'+$(this).attr('data-type')+'"]').attr('data-value'));
        refreshTotals();
    });

    /* tariff calculator END */


    var instances = [];

    $('.js-modal').fancybox({});

    $(document).on('beforeLoad.fb', function (e, instance) {
        instances.push(instance);

        if (instances.length > 1) {
            var prevInstance = instances.shift();
            prevInstance.close();
        }
    });

    $(document).on('beforeClose.fb', function (e, instance) {
        instances = instances.filter(function (el) {
            return el.id !== instance.id;
        });
    });

    //select
    $('.js-select').select2({
        minimumResultsForSearch: -1,
        width: 'element'
    });

    $('.js-tab-button').eq(0).click();
    footerPlaceholder();
    menuToggle();
    scrollDown();
    showMoreInfoTariff();
    tableSlider();
    initMap();
});

$(window).resize(function () {
    footerPlaceholder();
    tableSlider();
});

// $('.footer__menu').each(function () {
//     var fMenuBox = $('.footer__menu-box');
//     var fMenuItem = $('.footer__menu-title');
//
//     if ($(window).width() < 768) {
//         $(fMenuItem).click(function () {
//             $('.footer__menu-title').removeClass('active');
//             $('.footer__menu-container').slideUp(200);
//             $(this).toggleClass('active');
//             $(this).next('.footer__menu-container').slideToggle(200);
//         })
//     }
//
// });

$(".footer__menu-title").click(function () {

    if ($(window).width() < 768) {
        $('.active').not(this).removeClass('active').next().hide(300);

        $(this).toggleClass('active');
        if (false == $(this).next().is(':visible')) {
            $('.footer__menu-title > .footer__menu-container').slideUp(300);
        }
        $(this).next().slideToggle(300);
    }
});

var animationIsOff = $.fx.off;
$.fx.off = true;
// $('.footer__menu-title:eq(0)').click()
$.fx.off = animationIsOff;


$(window).scroll(function () {
    onScroll();
    $('.js-menu-hidden, .openMenu').removeClass('active');
    scrollHeader();
});



