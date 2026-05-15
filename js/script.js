
/* =========================Swiper========================= */

// sw-visual
new Swiper('.sw-visual', {
    loop: true,
    speed: 1500,
    effect: 'fade',
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true
    // },
    pagination: {
        el: '.visual-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.visual-next',
        prevEl: '.visual-prev',
    }
});
// sw-new
new Swiper('.sw-new', {
    loop: false,
    speed: 1000,
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 1,
    pagination: {
        el: '.new-pagination',
        clickable: true,
    },
    breakpoints: {
        1281: { slidesPerView: 4 },
        681: { slidesPerView: 3 },
        361: {
            slidesPerView: 2.2,
            spaceBetween: 18,
        },
        0: {
            slidesPerView: 2.2,
            spaceBetween: 12,
        },
    }
});

// sw-md-pick
new Swiper('.sw-md-pick', {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.md-pick-pagination',
        clickable: true,
    },
});

// sw-review
new Swiper('.sw-review', {
    loop: true,
    speed: 900,
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 70,
    initialSlide: 1,
    navigation: {
        nextEl: '.review-next',
        prevEl: '.review-prev',
    },
    pagination: {
        el: '.review-pagination',
        clickable: true,
    },
});

/* ========================= Event ========================= */

$(function(){

    /* quick menu top */
    $('.top-btn').click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    /* mobile menu */
    $('.menu-btn').click(function(e){
        e.preventDefault();

        $('.mb-menu, .mb-menu-bg').addClass('active');
    });

    $('.mb-btn-close, .mb-menu-bg').click(function(e){
        e.preventDefault();

        $('.mb-menu, .mb-menu-bg').removeClass('active');
        $('.mb-menu-list').removeClass('active');
        $('.mb-submenu').stop().slideUp();
    });

    /* mobile submenu */
    $('.mb-menu-list').click(function(e){

        let hasSubmenu = $(this).hasClass('mb-li-arrow');
        let isOpen = $(this).hasClass('active');

        $('.mb-menu-list').removeClass('active');
        $('.mb-submenu').stop().slideUp();

        if(hasSubmenu){

            e.preventDefault();

            if(isOpen){

                $(this).removeClass('active');
                $(this).siblings('.mb-submenu').stop().slideUp();

            }else{

                $(this).addClass('active');
                $(this).siblings('.mb-submenu').stop().slideDown();

            }
        }
    });
    /* header click menu */
    $('.header .click-menu > a').click(function(e){
        e.preventDefault();

        const menu = $(this).parent();

        $('.header .click-menu').not(menu).removeClass('active');
        menu.toggleClass('active');
    });

    $(document).click(function(e){
        if (!$(e.target).closest('.header .click-menu').length) {
            $('.header .click-menu').removeClass('active');
        }
    });

    /* top banner close */
    $('.top-banner-close').click(function(e){
        e.preventDefault();

        $('.top-banner').hide();
        $('.header').css('top', '0');
        // $('main').css('padding-top', '110px');/
    });
    /* scroll header */
    let lastScrollTop = 0;

    $(window).on('scroll', $.throttle(100, function(){

        const scrollTop = $(this).scrollTop();

        // 맨 위
        if (scrollTop < 10) {
            $('body').removeClass('banner-hide header-hide');
            lastScrollTop = 0;
            return;
        }

        // 띠배너 먼저 숨김
        if (scrollTop > 50) {
            $('body').addClass('banner-hide');
        } else {
            $('body').removeClass('banner-hide');
        }

        // 헤더는 더 많이 스크롤했을 때 숨김
        if (scrollTop > lastScrollTop && scrollTop > 180) {
            $('body').addClass('header-hide');
        }

        // 위로 스크롤하면 헤더 다시 보임
        if (scrollTop < lastScrollTop) {
            $('body').removeClass('header-hide');
        }

        lastScrollTop = scrollTop;

    }));
    /* best product tab */
    const bestTabs = $('.best-product-tabs ul li a');
    const bestContents = $('.best-product-contents > div');

    bestTabs.click(function(e){
        e.preventDefault();

        bestTabs.removeClass('active');
        $(this).addClass('active');

        bestContents.hide();

        let target = $(this).attr('href');
        $(target).show();
    });

    bestTabs.eq(0).trigger('click');
    
    const slider = document.querySelector('.best-product-tabs ul');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절 (2배)
        slider.scrollLeft = scrollLeft - walk;
    });
    /* review heart */
    $('.review .review-heart').click(function(e){
        e.preventDefault();
        e.stopPropagation();

        const numberNode = this.childNodes[2];
        let count = Number(numberNode.textContent.trim());

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            numberNode.textContent = count - 1;
        } else {
            $(this).addClass('active');
            numberNode.textContent = count + 1;
        }
    });
});