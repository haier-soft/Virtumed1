

window.addEventListener("DOMContentLoaded", () => {
  //add padding to body  when overflow: hidden
  function togglePaddingOfBody() {
    if (!document.body.classList.contains("no-scroll") && window.innerWidth > 325) {
      let paddingValue = window.innerWidth - document.documentElement.clientWidth + 'px'
      document.body.style.paddingRight = paddingValue
    } else {
      document.body.style.paddingRight = '0px'
    }
  }
  // smoothdrop
  function smoothDrop(header, body) {
    if (!header.classList.contains("active")) {
      body.style.height = 'auto';
      let height = body.clientHeight + 'px';
      body.style.height = '0px';
      setTimeout(function () {
        body.style.height = height;
      }, 0);
    } else {
      body.style.height = '0px';
    }
    header.classList.toggle("active")
  }
  // submit form
  function formSend(event, form) {
    event.preventDefault();
    let error = formValidate(form);
    if (error === 0) {
      form.classList.remove("error")
      modal.forEach(mod => {
        if (mod.classList.contains("open")) {
          closeModal(mod, mod.querySelector(".modal__inner"))
        }
      })
      //otpravlaem zapros
      // esli otvet uspeshniy
      setTimeout(() => {
        openModal(fulfilledModal, fulfilledModal.querySelector(".modal__inner"))
        form.querySelectorAll(".form__inp").forEach(inp => inp.value = "")
      }, 500);

      // esli otvet neudachniy
      // setTimeout(() => {
      //  openModal(errorModal, errorModal.querySelector(".modal__inner"))
      // }, 500); 
    } else {
      form.classList.add("error")
    }
  }
  //form validate
  function formValidate(form) {
    let formReg = form.querySelectorAll(".reg");
    let error = 0;
    formReg.forEach(item => {
      formRemoveError(item);
      if (item.classList.contains("mail")) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(item.value)) {
          formAddError(item);
          error++;
        }
      } else {
        if (item.value === "") {
          formAddError(item);
          error++;
        }
      }
    })
    return error
  }
  // ad class error
  function formAddError(item) {
    item.parentElement.classList.add("error");
    item.classList.add("error")
  }
  //remove class error
  function formRemoveError(item) {
    item.parentElement.classList.remove("error");
    item.classList.remove("error")
  }
  // file-form validate
  function formFileValidate(fileForm, formFileInp) {
    const fileName = fileForm.querySelector(".file-form__name")
    formFileInp.addEventListener("change", () => {
      let files = formFileInp.files;
      for (let i = 0; i < files.length; i++) {
        let f = files[i];
        if (f.size > 2*1024*1024) {
          fileForm.classList.add("error")
          fileName.textContent = ""
          return;
        }
        fileForm.classList.remove("error")
        fileName.textContent = f.name + " " + Math.ceil(f.size/1024)  + "KB"
      }
    })
  }
  //open modal
  function openModal(modal, modalInner) {
    let paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
    modal.classList.add("open")
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      modalInner.style.transform = "rotateX(0deg)"
    }, 200)
  }
  //close modal
  function closeModal(modal, modalInner) {
    modalInner.style.transform = "rotateX(90deg)"
    setTimeout(() => {
      modal.classList.remove("open")
      document.body.style.paddingRight = '0px'
      document.body.classList.remove("no-scroll")
    }, 500)
  }
  //burger menu
  const iconMenu = document.querySelector(".icon-menu");
  const header = document.querySelector(".header");
  iconMenu.addEventListener("click", () => {
    window.scrollTo(0, 0)
    if (iconMenu.classList.contains("active")) {
      setTimeout(() => {
        togglePaddingOfBody()
        document.body.classList.toggle("no-scroll")
      }, 1000);
    } else {
      togglePaddingOfBody()
      document.body.classList.toggle("no-scroll")
    }
    iconMenu.classList.toggle("active");
    header.classList.toggle("active");
  })
  // form-search
  if (document.querySelectorAll(".form-search")) {
    const formSearch = document.querySelectorAll(".form-search")
    const formSearchBtn = document.querySelectorAll(".form-search__btn")
    formSearchBtn.forEach((item, idx) => {
      item.addEventListener("click", e => {
        e.preventDefault()
        formSearch[idx].classList.toggle("active")
      })
    })
  }
  //switch active nav when observe.isIntersecting true
  if (document.querySelector(".js-anchor")) {
    const anchors = document.querySelectorAll(".js-anchor")
    anchors.forEach((item,i) => {
      const elementClick = item.getAttribute("href").substring(1)
      const destination = document.querySelector(`#${ elementClick}`)
      let options = {
        rootMargin: "0px",
        threshold: 0.6,
      };
      let callback = function (entries, observer) {
        entries.forEach(observe => {
          if (observe.isIntersecting) {
            anchors.forEach(el => {
              el.classList.remove("active")
            })
            item.classList.add("active")
          }
        })
      }

      let observer = new IntersectionObserver(callback, options);
      observer.observe(destination)
    })
  }
  // change lang of site
  if (document.querySelector(".lang")) {
    const langItem = document.querySelectorAll(".lang__item")
    langItem.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault()
        if (!item.classList.contains("active")) {
          langItem.forEach(el => {
            el.classList.remove("active")
          })
          item.classList.add("active")
        }

      })
    });
  }
  //main slider in main page
  if (document.querySelector(".main-slider")) {
    const mainSliderCurrent = document.querySelector(".main-slider__current")
    const mainSliderTotal = document.querySelector(".main-slider__total")
    let mainSlider = new Swiper(".main-slider", {
      initialSlide: 0,
      slidesPerView: 1,
      observe: true,
      observeParents: true,
      autoplay: {
        delay: 3000,
      },
      effect: "fade",
      navigation: {
        nextEl: '.main-slider__btn--next',
        prevEl: '.main-slider__btn--prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        //dragSize: dragSize
      },
      speed: 300
    })
    mainSliderTotal.textContent = mainSlider.slides.length
    mainSlider.on('slideChange', function () {
      mainSliderCurrent.textContent = mainSlider.realIndex + 1
    })
  }
  //  poppup  
  const feedbackModal = document.querySelector(".feedback-modal")
  const fulfilledModal = document.querySelector(".fulfilled-modal")
  const errorModal = document.querySelector(".error-modal")
  const modal = document.querySelectorAll(".modal");
  const feedBackOpenBtn = document.querySelector(".feedback-openBtn")
  feedBackOpenBtn.addEventListener("click", () => openModal(feedbackModal, feedbackModal.querySelector(".modal__inner")))
  modal.forEach(item => {
    const modalInner = item.querySelector(".modal__inner");
    let formCloseBtn = item.querySelector(".icon-close")
    formCloseBtn.addEventListener("click", e => {
      closeModal(item, modalInner)
    })
    item.addEventListener("click", e => {
      if (!modalInner.contains(e.target)) {
        closeModal(item, modalInner)
      }
    })
  })
  // form 
  if (document.querySelector(".form")) {
    const forms = document.querySelectorAll(".form");
    forms.forEach(form => {
      const fileForm = form.querySelector(".file-form")
      const formFileInp = form.querySelector(".file-form__inp")
      formFileValidate(fileForm, formFileInp)
      form.addEventListener("submit", event => formSend(event, form));

      if (document.querySelector(".error-feedback-openBtn")) {
        const errorFeedbackOpenBtn = document.querySelector(".error-feedback-openBtn")
        errorFeedbackOpenBtn.addEventListener("click", () => {
          closeModal(errorModal, errorModal.querySelector(".modal__inner"))
          setTimeout(() => {
            openModal(feedbackModal, feedbackModal.querySelector(".modal__inner"))
          }, 500);
        })
      }
    })
  }
  // drop filter
  if (document.querySelector(".sec-filter")) {
    const filterHeader = document.querySelectorAll('.sec-filter__header')
    const filterBody= document.querySelectorAll('.sec-filter__body')
    filterHeader.forEach((item,idx) => {
      item.addEventListener("click",()=>smoothDrop(filterHeader[idx],filterBody[idx]))
    })
  }
  //slider of product page
  if (document.querySelector(".slider-product")) {
    const productSliderCurrent = document.querySelector(".slider-product__current")
    const productSliderTotal = document.querySelector(".slider-product__total")
    let swiperThumbs = new Swiper(".slider-product__thumb", {
      direction: 'horizontal',
      slidesPerView: 5,
      spaceBetween: 6,
      watchSlidesProgress: true,
      breakpoints: {
        992.98: {
          direction: 'vertical',
          spaceBetween: 16,
        }
      },
      freeMode: true, 
      speed: 800 
    })
    let swiperImages = new Swiper(".slider-product__main", {
      slidesPerView: 1,
      observe: true,
      observeParents: true,
      effect: 'fade',
      thumbs: {
        swiper: swiperThumbs,
    
      },
      navigation: {
        nextEl: '.slider-product__btn--next',
        prevEl: '.slider-product__btn--prev',
      },
      speed: 300
    })
    productSliderTotal.textContent = swiperImages.slides.length;
    swiperImages.on('slideChange', function () {
      productSliderCurrent.textContent = swiperImages.realIndex + 1
    })
     Fancybox.bind('[data-fancybox="gallery"]', {
      loop : false,
      idle: false,
      compact: false,
      Thumbs : {
        type: 'classic',
        autoStart  : true,   // Display thumbnails on opening
        hideOnClose : true     // Hide thumbnail grid when closing animation starts
      },
      on: {
        close:  (fancybox,slide) =>  {
          swiperImages.slideTo(slide.target.dataset.index)
          swiperThumbs.slideTo(slide.target.dataset.index )
        },
      },
    }); 
  }
  if (document.querySelector(".product__info")) {
    const switchBlock = document.querySelectorAll(".block-product")
    const switchItemMobile = document.querySelectorAll(".product__nav--mobile");
    switchItemMobile.forEach((item,idx) => {
      item.addEventListener("click",()=>smoothDrop(switchItemMobile[idx],switchBlock[idx]))
    })
  }
})


