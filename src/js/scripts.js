document.addEventListener("DOMContentLoaded", function () {
  // burger
  if (document.querySelector(".burger")) {
    const dark = document.querySelector(".dark-bgc"),
      burger = document.querySelector(".burger"),
      menu = document.querySelector(".nav"),
      cancel = document.querySelector(".cancel"),
      listItem = menu.querySelectorAll("a")

    burger.addEventListener("click", function () {
      menu.style.right = "0";
      dark.style.display = "block"
    })

    function cancelBurger() {
      menu.style.right = "-100%";
      dark.style.display = "none"
    }
    listItem.forEach(item => {
      item.addEventListener("click", cancelBurger)
    })
    cancel.addEventListener("click", function(e) {
      e.preventDefault()
      cancelBurger()
    })
    dark.addEventListener("click", cancelBurger)
  }

  const visitorsBtn = document.querySelectorAll(".visitors"),
    dark = document.querySelector(".dark-bgc-popup"),
    cancelVisBtn = document.querySelector(".cancel_popup_vis"),
    popupVisitor = document.querySelector(".popup_visitors")

    visitorsBtn.forEach(itemVisitor => {
      itemVisitor.addEventListener("click", function(e) {
        e.preventDefault()
        popupVisitor.style.display = "block"
        dark.style.display = "block"
      })
    })

    cancelVisBtn.addEventListener("click", function(e) {
      e.preventDefault()
      popupVisitor.style.display = "none"
      dark.style.display = "none"
    })

  const customersBtn = document.querySelectorAll(".customers"),
    cancelcustBtn = document.querySelector(".cancel_popup_cust"),
    popupcustomer = document.querySelector(".popup_customers")

    customersBtn.forEach(itemCust => {
      itemCust.addEventListener("click", function(e) {
        e.preventDefault()
        popupcustomer.style.display = "block"
        dark.style.display = "block"
      })
    })

    cancelcustBtn.addEventListener("click", function(e) {
      e.preventDefault()
      popupcustomer.style.display = "none"
      dark.style.display = "none"
    })

  // випадаючі блоки з інформацією
  function toggleVisibility(buttons, visibleClass, activeClass) {
    buttons.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault()
        const descriptionMore = item.nextElementSibling
        descriptionMore.classList.toggle(visibleClass)
        item.classList.toggle(activeClass)
      })
    })
  }

  const btnReadMore = document.querySelectorAll(".readmore")

  toggleVisibility(btnReadMore, "visible", "readmore-active")

  //btn for block info
  const buttons = document.querySelectorAll('.nav a '),
    sections = document.querySelectorAll('#spivpracia, #delivery, #obmin')
  let activeSection = null

  function hideAllSections() {
    sections.forEach(section => section.classList.remove('visible'))
  }

  function deactivateAllButtons() {
    buttons.forEach(button => button.classList.remove('visible'))
  }

  buttons.forEach(button => {
    button.addEventListener('click', function (event) {
      const target = button.getAttribute('data-target')

      hideAllSections()
      deactivateAllButtons()

      const sectionToShow = document.getElementById(target)
      if (sectionToShow) {
        if (activeSection && activeSection.previousElementSibling) {
          activeSection.previousElementSibling.classList.remove('readmore-active')
        }

        sectionToShow.classList.add('visible')
        if (sectionToShow.previousElementSibling) {
          sectionToShow.previousElementSibling.classList.add('readmore-active')
        }

        activeSection = sectionToShow
      }
    })
  })

  hideAllSections()
  deactivateAllButtons()

  function startCountdown() {
    const startDate = "23.07.2025 14:30",
      targetDate = parseDate(startDate),
      countElement = document.querySelector('.count'),
      interval = setInterval(() => {
        const currentDate = new Date(),
          difference = targetDate - currentDate

        if (difference <= 0) {
          clearInterval(interval)
          return
        }

        const {
          days,
          hours,
          minutes,
          seconds
        } = calculateTimeDifference(difference)

        countElement.innerHTML = `
                <div class="flex-between items-center">
                    <p class="days"><span>${formatTimeUnit(days)}</span><span> ${getPluralForm(days, 'день', 'дні', 'днів')}</span></p>
                    <p class="hour"><span>${formatTimeUnit(hours)}</span><span> ${getPluralForm(hours, 'година', 'години', 'годин')}</span></p>
                    <p class="minute"><span>${formatTimeUnit(minutes)}</span><span> ${getPluralForm(minutes, 'хвилина', 'хвилини', 'хвилин')}</span></p>
            </div>`;
      }, 1000)
  }

  function parseDate(dateString) {
    let parts = dateString.split(" "),
      dateParts = parts[0].split("."),
      timeParts = parts[1].split(":"),
      day = parseInt(dateParts[0], 10),
      month = parseInt(dateParts[1], 10) - 1,
      year = parseInt(dateParts[2], 10),
      hour = parseInt(timeParts[0], 10),
      minute = parseInt(timeParts[1], 10);

    return new Date(year, month, day, hour, minute)
  }

  function calculateTimeDifference(difference) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    }
  }

  function getPluralForm(number, one, few, many) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return one;
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return few;
    } else {
      return many;
    }
  }

  function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : `${unit}`
  }

  startCountdown()


  const hiddenText = document.querySelector(".hidden_text"),
    readMoreBtn = document.querySelector(".readAll")

  readMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    hiddenText.classList.toggle("expanded")

    if (hiddenText.classList.contains("expanded")) {
      readMoreBtn.textContent = "Сховати"
    } else {
      readMoreBtn.textContent = "Розкрити"
    }
  })


  let isSlideTransitionComplete = true;
  //slider
  class InfinitySlider {
    constructor(selector, settings = {}) {
      this.settings = {
        ...InfinitySlider.defaultSettings,
        ...settings
      };
      this.slider = document.querySelector(selector);
      this.positionCards = 0;
      this.sliderContainer = this.slider.querySelector(".slider-container");
      this.sliderCards = this.sliderContainer.children;
      this.realCardsLength = this.sliderCards.length;
      this.heightCards = 0;
      this.widthSliderContainer;
      this.cardsCount;
      this.widthCards;
      this.distanceCards;
      this.cloneCard;
      this.prevBtnSlider;
      this.nextBtnSlider;
      this.sliderInterval;
      this.maxHeight;
      this.sliderDots;
      this.touchPoint;
      InfinitySlider.defaultSettings.baseCardWidth = this.widthSliderContainer;
    };

    static defaultSettings = {
      // isSlidesToScrollAll: false,
      gap: 0,
      isArrows: false,
      isDots: false,
      distanceToDots: 0,
      isAutoplay: false,
      autoplaySpeed: 3000,
      baseCardWidth: null,
      transitionCard: "all 1s ease-in-out",
      isEffectFadeOut: false
    };

    init() {
      this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;

      if (this.settings.baseCardWidth == null) this.settings.baseCardWidth = this.widthSliderContainer

      this.slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove();
      });

      if (localStorage[this.slider.id + "Interval"]) {
        clearInterval(localStorage[this.slider.id + "Interval"]);
      }

      this.slider.style.position = "relative";
      this.sliderContainer.style.overflow = "hidden";
      this.sliderContainer.style.position = "relative";
      this.sliderContainer.style.width = "100%";

      this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
      if (this.cardsCount == 0) this.cardsCount = 1;
      this.distanceCards = this.settings.gap;
      this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
      this.positionCards = 0 - (this.distanceCards + this.widthCards);

      if (this.settings.isArrows) this.creationArrows();
      this.prevBtnSlider = this.slider.querySelector('.left.slider_navigation');
      this.nextBtnSlider = this.slider.querySelector('.right.slider_navigation');
      if (this.settings.isArrows && this.sliderCards.length <= this.cardsCount) {
        this.prevBtnSlider.style.display = "none";
        this.nextBtnSlider.style.display = "none";
      } else if (this.settings.isArrows) {
        this.prevBtnSlider.style.display = "block";
        this.nextBtnSlider.style.display = "block";
      }
      if (this.settings.isDots && this.realCardsLength > 1) {
        this.creationDots();
        this.sliderDots = document.querySelectorAll('.slider-dot');
        for (let i = 0; i < this.sliderCards.length; i++) {
          if (this.sliderCards[i].classList.contains("activeFade")) {
            this.sliderDots[i].classList.remove("activeFade");
            this.sliderCards[i].classList.remove("activeFade");
          }
        }
        this.sliderDots[0].classList.add("activeFade");
        this.sliderCards[0].classList.add("activeFade");
      }

      if (!this.settings.isEffectFadeOut) {
        this.creationClons();
        this.shuffleCard();
      }

      this.sliderCards = this.sliderContainer.children;
      this.heightCards = 0;
      for (let i = 0; i < this.sliderCards.length; i++) {
        this.sliderCards[i].style.width = this.widthCards + "px";
        this.sliderCards[i].style.position = "absolute";
        this.maxHeight = this.sliderCards[i].getBoundingClientRect().height;
        if (this.heightCards < this.maxHeight) {
          this.heightCards = this.maxHeight;
        }
        this.sliderCards[i].style.transition = 'none';
        setTimeout(() => {
          this.sliderCards[i].style.transition = this.settings.transitionCard;
        }, 1);
      }

      this.settings.isDots ? this.sliderContainer.style.height = this.heightCards + this.settings.distanceToDots + 'px' : this.sliderContainer.style.height = this.heightCards + 'px';

      this.sliderDots = document.querySelectorAll('.slider-dot');
      this.sliderDots.forEach(element => {
        element.onclick = () => {
          clearInterval(sliderInterval);
          clearInterval(localStorage[this.slider.id + "Interval"]);
          for (let index = 0; index < this.realCardsLength; index++) {
            this.sliderDots[index].classList.remove("activeFade");
            this.sliderCards[index].classList.remove("activeFade");
          }
          this.sliderCards[element.dataset.order].classList.add("activeFade");
          element.classList.add("activeFade");
        }
      });
      if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
        clearInterval(sliderInterval);
        this.startAutoPlay();
      }
      this.slider.addEventListener('touchend', () => {
        if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
          clearInterval(sliderInterval);
          this.startAutoPlay();
        }
      });

      this.touchSlider = this.touchSlider.bind(this);

      this.slider.addEventListener('touchstart', (e) => {
        clearInterval(sliderInterval);
        this.touchPoint = e.touches[0].pageX;
        this.slider.addEventListener('touchmove', this.touchSlider);
        clearInterval(localStorage[this.slider.id + "Interval"]);
      }, {
        passive: true
      });

      this.slider.onmouseenter = () => {
        clearInterval(localStorage[this.slider.id + "Interval"]);
      };

      this.slider.onmouseleave = () => {
        if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
          this.startAutoPlay();
        }
      };
    }

    creationClons() {
      let counter = 1;
      do {
        this.cloneCard = this.sliderCards[this.sliderCards.length - counter].cloneNode(true);
        this.cloneCard.classList.add("clone");
        this.cloneCard.style.transition = 'none';
        this.sliderContainer.insertAdjacentElement("afterbegin", this.cloneCard);
        this.realCardsLength = this.sliderCards.length - this.slider.querySelectorAll('.clone').length
        counter++;
      } while (counter <= this.realCardsLength && this.settings.isSlidesToScrollAll);

      if (this.settings.isSlidesToScrollAll) {
        counter = 0;
        while (counter < this.realCardsLength) {
          this.cloneCard = this.sliderCards[counter].cloneNode(true);
          this.cloneCard.classList.add("clone");
          this.cloneCard.style.transition = 'none';
          this.sliderContainer.insertAdjacentElement("beforeend", this.cloneCard);
          counter++;
        }
      }
    }


    creationArrows() {
      const areArrowsExist = this.slider.querySelectorAll('.slider_navigation').length;
      if (areArrowsExist < 1) {
        this.prevBtnSlider = document.createElement("span");
        this.nextBtnSlider = document.createElement("span");
        this.prevBtnSlider.className = "left slider_navigation";
        this.nextBtnSlider.className = "right slider_navigation";
        this.slider.insertAdjacentElement("afterbegin", this.prevBtnSlider);
        this.slider.insertAdjacentElement("beforeend", this.nextBtnSlider);

        let isClickUnabled = true;
        const clickUnabled = () => {
          isClickUnabled = false;
          setTimeout(() => {
            isClickUnabled = true;
          }, (parseFloat(this.sliderCards[0].style.transitionDuration) * 1000));
        };

        this.prevBtnSlider.onclick = () => {
          if (isClickUnabled) {
            this.changeSlide("left");
            clickUnabled();
          }
        };
        this.nextBtnSlider.onclick = () => {
          if (isClickUnabled) {
            this.changeSlide("right");
            clickUnabled();
          }
        };
      }
    }

    creationDots() {
      const dotsContainer = this.slider.querySelector('.dots-container');
      if (!dotsContainer) {
        let dotContainer = document.createElement("div");
        dotContainer.style.position = "absolute";
        dotContainer.className = "dots-container";
        dotContainer.style.bottom = "0";
        this.slider.insertAdjacentElement("beforeend", dotContainer);
        for (let index = 0; index < this.realCardsLength; index++) {
          const slideDot = document.createElement("span");
          slideDot.className = "slider-dot";
          slideDot.dataset.order = index;
          dotContainer.insertAdjacentElement("beforeend", slideDot);
        }
      }
    }

    shuffleCard() {
      this.sliderCards = this.sliderContainer.children;
      this.positionCards = 0 - (this.distanceCards + this.widthCards);
      if (this.settings.isSlidesToScrollAll) {
        this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLength;
      }
      for (let i = 0; i < this.sliderCards.length; i++) {
        this.sliderCards[i].style.left = this.positionCards + 'px';
        this.positionCards += (this.distanceCards + this.widthCards);
      }
    }

    changeSlide(direction) {
      this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
      this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
      if (this.cardsCount == 0) this.cardsCount = 1;
      this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
      this.sliderCards = this.sliderContainer.children;
      let slideIndex = 0;
      for (let i = 0; i < this.sliderCards.length; i++) {
        if (this.sliderCards[i].classList.contains("activeFade")) {
          slideIndex = i;
        }
      }
      if (direction == "left") {
        if (this.settings.isSlidesToScrollAll) {
          for (let index = 0; index < this.cardsCount; index++) {
            this.sliderContainer.insertAdjacentElement("afterbegin", this.sliderCards[this.sliderCards.length - 1]);
          }
        } else if (this.settings.isEffectFadeOut) {
          setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
          setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
          this.sliderCards[slideIndex].classList.remove("activeFade");
          this.sliderDots[slideIndex].classList.remove("activeFade");
          this.sliderCards[slideIndex - 1] ? slideIndex-- : slideIndex = this.sliderCards.length - 1;
        } else {
          this.sliderCards[this.sliderCards.length - 1].remove();
          let cloneLast = this.sliderCards[this.sliderCards.length - 1].cloneNode(true);
          cloneLast.classList.add("clone");
          this.sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
          this.sliderCards[1].classList.remove("clone");
        }
      } else if (direction == "right") {
        if (this.settings.isSlidesToScrollAll) {
          for (let index = 0; index < this.cardsCount; index++) {
            this.sliderContainer.insertAdjacentElement("beforeend", this.sliderCards[0]);
          }
        } else if (this.settings.isEffectFadeOut) {
          setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
          setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
          this.sliderCards[slideIndex].classList.remove("activeFade");
          this.sliderDots[slideIndex].classList.remove("activeFade");
          this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
        } else {
          this.sliderCards[0].remove();
          let cloneFirst = this.sliderCards[0].cloneNode(true);
          cloneFirst.classList.add("clone");
          this.sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
          this.sliderCards[this.sliderCards.length - 2].classList.remove("clone");
        }
      }
      if (!this.settings.isEffectFadeOut) this.shuffleCard();
    }

    startAutoPlay() {
      clearInterval(localStorage[this.slider.id + "Interval"]);
      if (this.settings.isEffectFadeOut) {
        let slideIndex = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
          if (this.sliderCards[i].classList.contains("activeFade")) {
            slideIndex = i;
          }
        }
        const setActive = (index) => {
          setTimeout(() => this.sliderCards[index].classList.add("activeFade"), 1000);
          setTimeout(() => this.sliderDots[index].classList.add("activeFade"), 1000);
        }
        this.sliderInterval = setInterval(() => {
          this.sliderCards[slideIndex].classList.remove("activeFade");
          this.sliderDots[slideIndex].classList.remove("activeFade");
          this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
          setActive(slideIndex);
        }, this.settings.autoplaySpeed);
      } else {
        this.sliderInterval = setInterval(() => {
          this.changeSlide("right");
        }, this.settings.autoplaySpeed);
      }
      localStorage[this.slider.id + "Interval"] = this.sliderInterval;
    }

    touchSlider(e) {
      clearInterval(sliderInterval)
      if (!isSlideTransitionComplete) {
        return
      }

      const touchX = e.touches[0].pageX

      if ((this.touchPoint + 20) < touchX) {
        this.changeSlide('left')
        isSlideTransitionComplete = false
        this.slider.removeEventListener('touchmove', this.touchSlider)
        setTimeout(() => {
          isSlideTransitionComplete = true
        }, 500)
      } else if ((this.touchPoint - 20) > touchX) {
        this.changeSlide('right')
        isSlideTransitionComplete = false
        this.slider.removeEventListener('touchmove', this.touchSlider)
        setTimeout(() => {
          isSlideTransitionComplete = true
        }, 500)
      }

      this.touchPoint = touchX
    }

  }

  const comment = new InfinitySlider(".galery_mobile", {
    isArrows: true,
    isSlidesToScrollAll: false,
    baseCardWidth: "250px",
    gap: 50,
    // isAutoplay: true,
    autoplaySpeed: 5000,
    transitionCard: "all 1.5s ease-in-out",
  });

  function initSlider() {
    comment.init()
  }
  window.onresize = function () {
    initSlider()
  }
  let sliderInterval = setTimeout(function () {
    initSlider()
  }, 50);


})