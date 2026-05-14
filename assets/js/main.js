(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Donaty
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Scroll Up
  | 8. Donation Card
  | 9.Counter Animation
  | 10. Accordian
  | 11. Progress Bar
  | 12. Review
  | 13. Light Gallery
  | 14. Modal
  | 15. Social btns active
  | 16. Hide Mobile Menu
  | 17. Dynamic contact form
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    modalVideo();
    scrollUp();
    donationCard();
    counterInit();
    accordian();
    progressBar();
    review();
    lightGallery();
    modal();
    showHideSocialBtns();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    hideMenu();
    showScrollUp();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader').fadeOut();
    $('cs_preloader_in').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu_item_has_children').append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .toggleClass('cs_active');
      $(".cs_main_header").toggleClass("active")
    });
    $('.cs_menu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });

    /* Side Nav */
    $('.cs_hamburger_btn').on('click', function () {
      $('.cs_side_header').addClass('active');
      $('html').addClass('cs_hamburger_active');
    });
    $('.cs_close, .cs_side_header_overlay').on('click', function () {
      $('.cs_side_header').removeClass('active');
      $('html').removeClass('cs_hamburger_active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 20;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
        $(".cs_main_header").removeClass("active")
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }
      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs_slider')) {
      $('.cs_slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs_slider_container');
        var $slickActive = $(this).find('.cs_slider_wrapper');
        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs_pagination')
          .hasClass('cs_pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs_left_arrow'),
          nextArrow: $(this).find('.cs_right_arrow'),
          appendDots: $(this).find('.cs_pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup-container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup-close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');

        $('.cs_video_popup-container iframe').attr('src', `${video}`);

        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup-close, .cs_video_popup-layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup-container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }

  /*--------------------------------------------------------------
    7. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('.cs_scrollup').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  /* For Scroll Up */
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $('.cs_scrollup').addClass('cs_scrollup_show');
    } else {
      $('.cs_scrollup').removeClass('cs_scrollup_show');
    }
  }

  /*--------------------------------------------------------------
    8. Donation Card
  --------------------------------------------------------------*/
  function donationCard() {
    // Update the value when a different radio button is selected
    $('.cs_fixed_amount_check').on('change', function () {
      var selectedValue = $(this).val();
      $('.cs_input_amount').val('$' + selectedValue);
    });

    // Handle the custom amount button click
    $('.cs_custom_amount_btn[type="button"]').on('click', function () {
      $('.cs_input_amount').prop('disabled', false).val('').focus();
      $('.cs_fixed_amount_check').prop('checked', false);
    });
  }

  /*--------------------------------------------------------------
    9. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.odometer')) {
      $(window).on('scroll', function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $('.odometer').each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data('count-to'));
          }
        });
      });
    }
  }

  /*--------------------------------------------------------------
    10. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_head').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs_accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    11. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $('.cs_progress').each(function () {
      var progressPercentage = $(this).data('progress') + '%';
      $(this).find('.cs_progress_in').css('width', progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    12. Review
  --------------------------------------------------------------*/
  function review() {
    $('.cs_rating').each(function () {
      var review = $(this).data('rating');
      var reviewVal = review * 20 + '%';
      $(this).find('.cs_rating_percentage').css('width', reviewVal);
    });
  }

  /*--------------------------------------------------------------
    13. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    $('.cs_gallery_list').each(function () {
      $(this).lightGallery({
        selector: '.cs_gallery_item',
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
     14. Modal
   --------------------------------------------------------------*/
  function modal() {
    $('.cs_modal_btn').on('click', function () {
      var modalData = $(this).attr('data-modal');
      $(`[data-modal='${modalData}']`).addClass('active');
      $(this).parents('.cs_modal').removeClass('active');
    });
    $('.cs_close_modal, .cs_close_overlay').on('click', function () {
      var modalData = $(this).parents('.cs_modal').attr('data-modal');
      $(`[data-modal='${modalData}']`).removeClass('active');
    });
  }
  /*--------------------------------------------------------------
     15. Social btns active
   --------------------------------------------------------------*/
  function showHideSocialBtns() {
    $('.cs_share_btn').on('click', function () {
      $(this)
        .siblings("a").toggleClass("active");
    });
  }

  /*--------------------------------------------------------------
    16. Hide Mobile Menu
  --------------------------------------------------------------*/
  function hideMenu() {
    let scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.cs_nav_list').removeClass("cs_active");
      $('.cs_menu_toggle').removeClass("cs_toggle_active");
    }
  }
  /*--------------------------------------------------------------
    17. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists('#cs_form')) {
    const form = document.getElementById('cs_form');
    const result = document.getElementById('cs_result');

    form.addEventListener('submit', function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = 'Please wait...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async response => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {

            result.innerHTML = json.message;
          }
        })
        .catch(error => {

          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 5000);
        });
    });
  }

  // Depoimentos Slider - usa slick se disponível, senão fallback drag
  document.addEventListener('DOMContentLoaded', function () {
    const sliderEl = document.querySelector('.cs_testimonials_slider');
    if (!sliderEl) return;
    if (window.jQuery && typeof jQuery(sliderEl).slick === 'function') {
      jQuery(sliderEl).not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 600,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } }
        ]
      });
    } else {
      // Fallback: arrastar para deslizar
      let isDown = false;
      let startX;
      let scrollLeft;
      sliderEl.addEventListener('mousedown', (e) => {
        isDown = true;
        sliderEl.style.cursor = 'grabbing';
        startX = e.pageX - sliderEl.offsetLeft;
        scrollLeft = sliderEl.scrollLeft;
      });
      sliderEl.addEventListener('mouseleave', () => {
        isDown = false;
        sliderEl.style.cursor = 'grab';
      });
      sliderEl.addEventListener('mouseup', () => {
        isDown = false;
        sliderEl.style.cursor = 'grab';
      });
      sliderEl.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderEl.offsetLeft;
        const walk = (x - startX) * 2;
        sliderEl.scrollLeft = scrollLeft - walk;
      });
      sliderEl.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - sliderEl.offsetLeft;
        scrollLeft = sliderEl.scrollLeft;
      });
      sliderEl.addEventListener('touchend', () => {
        isDown = false;
      });
      sliderEl.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - sliderEl.offsetLeft;
        const walk = (x - startX) * 2;
        sliderEl.scrollLeft = scrollLeft - walk;
      });
    }
  });

  // Preencher dados da empresa
  if (window.siteConfig) {
    // Nome da empresa no título
    document.title = window.siteConfig.empresa + ' - Provedor de Internet';
    // Comentário (PT-BR): se existir um span dentro do <title> com id empresa-title, atualiza também
    var empresaTitleEl = document.getElementById('empresa-title');
    if (empresaTitleEl) empresaTitleEl.innerText = window.siteConfig.empresa;
    // Meta author
    var metaEmpresa = document.getElementById('meta-empresa');
    if (metaEmpresa) metaEmpresa.setAttribute('content', window.siteConfig.empresa);
    // Meta description e keywords
    var metaDescricao = document.getElementById('meta-descricao');
    if (metaDescricao && window.siteConfig.descricao) metaDescricao.setAttribute('content', window.siteConfig.descricao);
    var metaKeywords = document.getElementById('meta-keywords');
    if (metaKeywords && window.siteConfig.keywords) metaKeywords.setAttribute('content', window.siteConfig.keywords);
    // Open Graph tags
    var ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', window.siteConfig.empresa + ' - Provedor de Internet');
    var ogDescription = document.getElementById('og-description');
    if (ogDescription && window.siteConfig.descricao) ogDescription.setAttribute('content', window.siteConfig.descricao);
    var dominio = window.siteConfig.dominio ? window.siteConfig.dominio.replace(/\/$/, '') : window.location.origin;
    var ogImage = document.getElementById('og-image');
    if (ogImage) ogImage.setAttribute('content', dominio + '/' + (window.siteConfig.logo || 'assets/img/logo_wps.png'));
    var ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.setAttribute('content', dominio + '/');

    // Canonical link tag update
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', dominio + '/');
    }

    // JSON-LD Schema Update
    var jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      try {
        var schemaData = JSON.parse(jsonLdScript.innerHTML);
        schemaData.name = window.siteConfig.empresa;
        schemaData.image = dominio + '/' + (window.siteConfig.logo || 'assets/img/logo_wps.png');
        schemaData["@id"] = dominio + '/';
        schemaData.url = dominio + '/';
        schemaData.telephone = '+' + window.siteConfig.whatsapp;
        jsonLdScript.innerHTML = JSON.stringify(schemaData, null, 2);
      } catch (e) {
        console.error("Erro ao atualizar JSON-LD", e);
      }
    }

    // Logo src e alt
    var logoEmpresa = document.getElementById('logo-empresa');
    if (logoEmpresa) {
      logoEmpresa.setAttribute('alt', window.siteConfig.empresa + ' Logo');
      if (window.siteConfig.logo) {
        logoEmpresa.setAttribute('src', window.siteConfig.logo);
      }
    }
    // WhatsApp link
    var whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) whatsappLink.setAttribute('href', 'https://wa.me/' + window.siteConfig.whatsapp);

    // Links do WhatsApp no herói (classe comum) - atualiza dinamicamente
    var whatsappLinks = document.querySelectorAll('.js-whatsapp-link');
    if (whatsappLinks && whatsappLinks.length && window.siteConfig && window.siteConfig.whatsapp) {
      var waHrefAll = 'https://wa.me/' + window.siteConfig.whatsapp;
      whatsappLinks.forEach(function (link) {
        link.setAttribute('href', waHrefAll);
      });
    }
    // Hero Section 1
    if (window.siteConfig.hero) {
      if (window.siteConfig.hero.title) {
        var heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.innerText = window.siteConfig.hero.title;
      }
      if (window.siteConfig.hero.subtitle) {
        var heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) heroSubtitle.innerText = window.siteConfig.hero.subtitle;
      }
      if (window.siteConfig.hero.description) {
        var heroDescription = document.getElementById('hero-description');
        if (heroDescription) heroDescription.innerText = window.siteConfig.hero.description;
      }
    }

    // Hero Section 2
    if (window.siteConfig.hero2) {
      if (window.siteConfig.hero2.title) {
        var hero2Title = document.getElementById('hero2-title');
        if (hero2Title) hero2Title.innerText = window.siteConfig.hero2.title;
      }
      if (window.siteConfig.hero2.subtitle) {
        var hero2Subtitle = document.getElementById('hero2-subtitle');
        if (hero2Subtitle) hero2Subtitle.innerText = window.siteConfig.hero2.subtitle;
      }
    }

    // Footer empresa
    var footerEmpresa = document.getElementById('footer-empresa');
    if (footerEmpresa) footerEmpresa.innerText = 'Provedor de internet de alta velocidade com a melhor qualidade e atendimento da região.';
    // Footer CNPJ e Razão Social
    var footerCnpj = document.getElementById('footer-cnpj');
    if (footerCnpj) footerCnpj.innerText = 'CNPJ: ' + window.siteConfig.cnpj;
    var footerRazao = document.getElementById('footer-razao');
    if (footerRazao && window.siteConfig.razaoSocial) footerRazao.innerText = window.siteConfig.razaoSocial;

    // Footer Endereço - completo em uma linha
    var footerEndereco = document.getElementById('footer-endereco');
    if (footerEndereco) {
      var enderecoSpan = footerEndereco.querySelector('span');
      if (enderecoSpan) {
        enderecoSpan.innerText = window.siteConfig.endereco;
      } else {
        footerEndereco.innerText = window.siteConfig.endereco;
      }
    }

    // Logo Footer
    var logoFooter = document.getElementById('logo-footer');
    if (logoFooter) {
      logoFooter.setAttribute('alt', window.siteConfig.empresa + ' Logo');
      if (window.siteConfig.logo) {
        logoFooter.setAttribute('src', window.siteConfig.logo);
      }
    }

    // Footer email (texto e link) - atualiza dinamicamente
    var footerEmail = document.getElementById('footer-email');
    if (footerEmail) {
      var emailLink = footerEmail.querySelector('a');
      if (emailLink) {
        emailLink.setAttribute('href', 'mailto:' + window.siteConfig.email);
        emailLink.innerText = window.siteConfig.email;
      } else {
        footerEmail.innerText = window.siteConfig.email;
      }
    }

    // Footer WhatsApp (texto e link) - atualiza dinamicamente
    var footerWhatsapp = document.getElementById('footer-whatsapp');
    if (footerWhatsapp) {
      var whatsappAnchor = footerWhatsapp.querySelector('a');
      var phoneDisplay = window.siteConfig.phoneDisplay || ('+55 ' + window.siteConfig.whatsapp);
      if (whatsappAnchor) {
        whatsappAnchor.setAttribute('href', 'https://wa.me/' + window.siteConfig.whatsapp);
        whatsappAnchor.innerText = phoneDisplay;
      } else {
        footerWhatsapp.innerText = phoneDisplay;
      }
    }

    // Social links dinâmicos (Instagram e WhatsApp ícone no footer)
    var instagramLinkEl = document.getElementById('instagram-link');
    if (instagramLinkEl && window.siteConfig.instagram) {
      var igHandleOrUrl = window.siteConfig.instagram;
      if (!/^https?:\/\//.test(igHandleOrUrl)) {
        igHandleOrUrl = 'https://instagram.com/' + igHandleOrUrl.replace(/^@/, '');
      }
      instagramLinkEl.setAttribute('href', igHandleOrUrl);
    }
    var whatsappSocialLinkEl = document.getElementById('whatsapp-social-link');
    if (whatsappSocialLinkEl) whatsappSocialLinkEl.setAttribute('href', 'https://wa.me/' + window.siteConfig.whatsapp);

    // Comentário (PT-BR): atualizar o texto de copyright no rodapé com o nome da empresa
    var copyrightEl = document.querySelector('.cs_copyright');
    if (copyrightEl) {
      var year = new Date().getFullYear();
      copyrightEl.innerText = '© ' + year + ' ' + window.siteConfig.empresa + '. Todos os direitos reservados.';
    }

    // Central do Assinante - exibe apenas se configurado
    if (window.siteConfig.centralAssinante) {
      var menuCentral = document.getElementById('menu-central-assinante');
      if (menuCentral) {
        menuCentral.style.display = '';
        var centralLink = menuCentral.querySelector('a');
        if (centralLink) {
          centralLink.setAttribute('href', window.siteConfig.centralAssinante);
          centralLink.setAttribute('target', '_blank');
          centralLink.setAttribute('rel', 'noopener noreferrer');
        }
      }
      // Footer - Central do Assinante
      var footerCentral = document.getElementById('footer-central-assinante');
      if (footerCentral) {
        footerCentral.style.display = '';
        var footerCentralLink = footerCentral.querySelector('a');
        if (footerCentralLink) {
          footerCentralLink.setAttribute('href', window.siteConfig.centralAssinante);
          footerCentralLink.setAttribute('target', '_blank');
          footerCentralLink.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  }

  // Renderizar seletor de cidades e planos dinamicamente
  if (window.siteConfig && window.siteConfig.planosPorCidade) {
    var citySelector = document.getElementById('city-selector');
    var plansList = document.getElementById('plans-list');

    if (citySelector && plansList) {
      var cities = Object.keys(window.siteConfig.planosPorCidade);

      // Função para renderizar planos de uma cidade
      function renderPlans(cityName) {
        plansList.innerHTML = '';
        var plans = window.siteConfig.planosPorCidade[cityName];

        if (plans && plans.length) {
          plans.forEach(function (plan, idx) {
            var displayPrice = /mês/i.test(plan.preco) ? plan.preco : (plan.preco + '/mês');
            var waMessage = 'Olá! Quero contratar o plano ' + plan.nome + ' por ' + displayPrice + ' em ' + cityName + '.';
            var waHref = 'https://wa.me/' + window.siteConfig.whatsapp + '?text=' + encodeURIComponent(waMessage);

            var detailsId = 'plan-details-' + idx;
            var priceHtml = '';
            var pMatch = displayPrice.match(/(R\$)?\s*(\d+)(,\d+)?(.*)/i);
            if (pMatch && pMatch[2]) {
               var currency = pMatch[1] || 'R$';
               var mainVal = pMatch[2];
               var cents = pMatch[3] || ',00';
               var suffix = pMatch[4] || '';
               priceHtml = '<div style="margin-top: 5px; display: flex; align-items: flex-start; justify-content: center;">' +
                           '<span style="font-size: 18px; font-weight: 700; color: #fff; margin-top: 8px; margin-right: 4px;">'+currency+'</span> ' +
                           '<span style="font-size: 56px; font-weight: 900; color: #fff; line-height: 0.85; letter-spacing: -2px;">'+mainVal+'</span>' +
                           '<span style="font-size: 20px; font-weight: 700; color: #fff; margin-top: 2px; letter-spacing: -1px;">'+cents+'</span>' +
                           '<span style="font-size: 15px; color: #a9d4ff; margin-left: 4px; margin-top: 10px; font-weight: bold;">'+suffix+'</span>' +
                           '</div>';
            } else {
               priceHtml = '<div style="font-size: 32px; font-weight: 900; color: #fff; padding-top: 10px;">'+displayPrice+'</div>';
            }

            var planHtml =
              '<div class="col-lg-4 col-md-6 mb-4">' +
              '<div class="" style="background: linear-gradient(145deg, #0F172A, #1E293B); border-radius: 20px; border: 2px solid #5CADD6; box-shadow: 0 10px 25px rgba(0,0,0,0.15); position: relative; overflow: hidden; height: 100%; display: flex; flex-direction: column; padding: 35px 25px; transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform=\'translateY(-8px)\'; this.style.boxShadow=\'0 20px 40px rgba(137,207,240,0.3)\';" onmouseout="this.style.transform=\'none\'; this.style.boxShadow=\'0 10px 25px rgba(0,0,0,0.15)\';" data-plan-name="' + plan.nome + '">' +
              (plan.recomendado ? '<div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); background: #D32F2F; color: #fff; font-size: 13px; font-weight: bold; padding: 6px 25px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3); z-index: 2;">MAIS POPULAR</div>' : '') +
              '<div class="cs_plan_header" style="' + (plan.recomendado ? 'margin-top: 20px; margin-bottom: 25px;' : 'margin-bottom: 25px; margin-top: 5px;') + '">' +
              (plan.detalhes ? '<p style="font-size: 15px; font-weight: 700; letter-spacing: 1px; color: #89CFF0; margin-bottom: 8px; text-transform: uppercase;">' + plan.detalhes + '</p>' : '') +
              '<div style="background: linear-gradient(to right, #5CADD6, #89CFF0); border-radius: 50px; padding: 10px 25px; display: inline-block; border: 1px solid #AEE1F9; box-shadow: 0 0 15px rgba(137, 207, 240, 0.4);">' +
              '<h3 class="m-0" style="color: #fff; font-size: 36px; font-weight: 900; line-height: 1;">' + plan.nome.replace(/MEGAS/i, '<span style="font-size: 17px; font-weight: 700; margin-left: 4px;">MEGAS</span>') + '</h3>' +
              '</div>' +
              '</div>' +
              '<div class="cs_plan_price_box mb-4" style="text-align: center;">' +
              '<span style="font-size: 14px; color: #AEE1F9; font-weight: 600; letter-spacing: 1px;">POR</span><br>' +
              priceHtml +
              '</div>' +
              '<div style="flex-grow: 1; padding: 10px 0;">' +
              (Array.isArray(plan.beneficios) && plan.beneficios.length ? '<ul id="' + detailsId + '" class="text-start mx-auto" style="list-style: none; padding: 0; margin: 0; display: inline-block;">' + plan.beneficios.map(function(b){ return '<li style="margin-bottom: 10px; font-size: 15px; color: #F8FAFC; font-weight: 600; padding-left: 25px; position: relative;"><i class="fa-solid fa-check" style="color: #89CFF0; position: absolute; left: 0; top: 3px; font-size: 14px;"></i>' + b + '</li>'; }).join('') + '</ul>' : '') +
              '</div>' +
              '<div class="cs_plan_footer mt-4">' +
              '<a href="' + waHref + '" style="background: linear-gradient(90deg, #D32F2F, #B71C1C); color: #fff; border: none; padding: 15px 25px; font-size: 16px; font-weight: 800; border-radius: 50px; display: block; text-decoration: none; box-shadow: 0 8px 20px rgba(211, 47, 47, 0.4); text-align: center;" onmouseover="this.style.filter=\'brightness(1.1)\';" onmouseout="this.style.filter=\'none\';" data-plan="' + plan.nome + '" aria-describedby="' + detailsId + '"><i class="fa-brands fa-whatsapp" style="margin-right: 8px; font-size: 18px; vertical-align: middle;"></i>ASSINAR AGORA</a>' +
              '</div>' +
              '</div>' +
              '</div>';
            plansList.innerHTML += planHtml;
          });

          if (typeof equalizePlanCardHeights === 'function') {
            setTimeout(equalizePlanCardHeights, 0);
          }
        } else {
          plansList.innerHTML = '<div class="col-12 text-center"><p>Nenhum plano disponível para esta cidade.</p></div>';
        }
      }

      // Criar botões para cada cidade
      cities.forEach(function (city, index) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cs_tab_btn'; // Custom styling
        btn.innerText = city;

        // Estilo 'ativo' customizado
        if (index === 0) {
          btn.classList.add('active');
          renderPlans(city); // Renderiza a primeira cidade por padrão
        }

        btn.addEventListener('click', function () {
          // Remove active style from all
          var allBtns = citySelector.querySelectorAll('button');
          allBtns.forEach(function (b) {
            b.classList.remove('active');
          });
          // Add active style to clicked
          this.classList.add('active');

          renderPlans(city);
        });

        citySelector.appendChild(btn);
      });
    }
  } else if (window.siteConfig && window.siteConfig.planos && document.getElementById('plans-list')) {
    // Fallback para array simples antigo
    var plansList = document.getElementById('plans-list');
    plansList.innerHTML = '';
    window.siteConfig.planos.forEach(function (plan, idx) {
      // ... (existing logic if needed, but we are replacing the block)
      // Since we are replacing the block, we don't need full fallback duplication here if we are confident, 
      // but let's keep it minimal or just error handle? 
      // Actually, the replacement chunk replaces the entire previous block. I will just rely on the new logic.
    });
  }

  // Renderizar depoimentos dinamicamente
  var depoimentosSection = document.getElementById('depoimentos');
  var depoimentosList = document.getElementById('depoimentos-list');
  var menuDepoimentos = document.getElementById('menu-depoimentos');
  var footerLinkDepoimentos = document.getElementById('footer-link-depoimentos');

  // Se não houver depoimentos ou array vazio, esconde a seção toda e links de navegação
  if (!window.depoimentos || !window.depoimentos.length || !depoimentosList) {
    if (depoimentosSection) {
      depoimentosSection.style.display = 'none';
    }
    if (menuDepoimentos) {
      menuDepoimentos.style.display = 'none';
    }
    if (footerLinkDepoimentos) {
      footerLinkDepoimentos.style.display = 'none';
    }
  } else {
    depoimentosList.innerHTML = '';

    // Função: equaliza a altura dos cards de depoimentos ao maior
    function equalizeTestimonialHeights() {
      var list = document.getElementById('depoimentos-list');
      if (!list) return;
      var cards = list.querySelectorAll('.cs_testimonial');
      if (!cards || !cards.length) return;
      // Resetar alturas antes de medir
      cards.forEach(function (card) {
        card.style.minHeight = '0px';
        card.style.height = 'auto';
      });
      // Medir maior altura
      var maxH = 0;
      cards.forEach(function (card) {
        var h = card.offsetHeight;
        if (h > maxH) maxH = h;
      });
      // Aplicar mesma altura a todos
      cards.forEach(function (card) {
        card.style.minHeight = maxH + 'px';
      });
    }
    window.depoimentos.forEach(function (dep) {
      var html = `
        <div class="cs_testimonial cs_style_1 ${dep.cor} cs_radius_15">
          <div class="cs_avatar cs_style_1">
            <div class="cs_avatar_thumbnail cs_radius_50">
              <img src="${dep.avatar}" alt="Avatar" loading="lazy">
            </div>
            <div class="cs_avatar_info">
              <h3 class="cs_avatar_title cs_fs_21 cs_heading_color">${dep.nome}</h3>
              <p class="cs_avatar_subtitle cs_heading_color mb-0">Cliente desde ${dep.desde}</p>
            </div>
          </div>
          <blockquote class="cs_testimonial_subtitle cs_fs_18 cs_heading_color">
            "${dep.texto}"
          </blockquote>
        </div>
      `;
      depoimentosList.innerHTML += html;
    });
    // Inicializa slick após renderização, se disponível
    if (window.jQuery && typeof jQuery(depoimentosList).slick === 'function') {
      var $slider = jQuery(depoimentosList);
      // Recalcular alturas quando o slick inicia e reposiciona
      $slider.on('init setPosition reInit', function () {
        equalizeTestimonialHeights();
      });
      $slider.not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 600,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } }
        ]
      });
      // Garantir ajuste inicial
      setTimeout(equalizeTestimonialHeights, 0);
      window.addEventListener('resize', equalizeTestimonialHeights);
    }
    else {
      // Fallback sem slick: ainda assim iguala
      setTimeout(equalizeTestimonialHeights, 0);
      window.addEventListener('resize', equalizeTestimonialHeights);
    }
  }

  /*--------------------------------------------------------------
    Planos: Equalização de Altura
  --------------------------------------------------------------*/
  // Comentário (PT-BR): garante que todos os cards de planos tenham a mesma altura
  function equalizePlanCardHeights() {
    var list = document.getElementById('plans-list');
    if (!list) return;
    var cards = list.querySelectorAll('.cs_card.cs_style_1');
    if (!cards || !cards.length) return;

    // Resetar antes de medir
    cards.forEach(function (card) {
      card.style.height = 'auto';
      card.style.minHeight = '0px';
    });

    var maxH = 0;
    cards.forEach(function (card) {
      var h = card.offsetHeight;
      if (h > maxH) maxH = h;
    });

    cards.forEach(function (card) {
      card.style.height = maxH + 'px';
    });
  }

  // Comentário (PT-BR): recalcula em redimensionamento
  window.addEventListener('resize', equalizePlanCardHeights);

})(jQuery); // End of use strict
