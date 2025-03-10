document.addEventListener("DOMContentLoaded", function () {
    //burger
    // if (document.querySelector(".burger")) {
    //     const dark = document.querySelector(".dark-bgc"),
    //         burger = document.querySelector(".burger"),
    //         menu = document.querySelector(".nav"),
    //         cancel = document.querySelector(".cancel"),
    //         listItem = menu.querySelectorAll("a")

    //     burger.addEventListener("click", function () {
    //         menu.style.left = "0";
    //         dark.style.display = "block"
    //     })

    //     function cancelBurger() {
    //         menu.style.left = "-100%";
    //         dark.style.display = "none"
    //     }
    //     listItem.forEach(item => {
    //         item.addEventListener("click", cancelBurger)
    //     })
    //     cancel.addEventListener("click", cancelBurger)
    //     dark.addEventListener("click", cancelBurger)
    // }

    // // випадаючі блоки з інформацією
    // function toggleVisibility(buttons, visibleClass, activeClass) {
    //     buttons.forEach((item) => {
    //         item.addEventListener("click", function (e) {
    //             e.preventDefault()
    //             const descriptionMore = item.nextElementSibling
    //             descriptionMore.classList.toggle(visibleClass)
    //             item.classList.toggle(activeClass)
    //         })
    //     })
    // }

    // const btnReadMore = document.querySelectorAll(".readmore")

    // toggleVisibility(btnReadMore, "visible", "readmore-active")

    // //btn for block info
    // const buttons = document.querySelectorAll('.nav a '),
    //     sections = document.querySelectorAll('#spivpracia, #delivery, #obmin')
    // let activeSection = null

    // function hideAllSections() {
    //     sections.forEach(section => section.classList.remove('visible'))
    // }

    // function deactivateAllButtons() {
    //     buttons.forEach(button => button.classList.remove('visible'))
    // }

    // buttons.forEach(button => {
    //     button.addEventListener('click', function (event) {
    //         const target = button.getAttribute('data-target')

    //         hideAllSections()
    //         deactivateAllButtons()

    //         const sectionToShow = document.getElementById(target)
    //         if (sectionToShow) {
    //             if (activeSection && activeSection.previousElementSibling) {
    //                 activeSection.previousElementSibling.classList.remove('readmore-active')
    //             }

    //             sectionToShow.classList.add('visible')
    //             if (sectionToShow.previousElementSibling) {
    //                 sectionToShow.previousElementSibling.classList.add('readmore-active')
    //             }

    //             activeSection = sectionToShow
    //         }
    //     })
    // })

    // hideAllSections()
    // deactivateAllButtons()

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
    
            const { days, hours, minutes, seconds } = calculateTimeDifference(difference)
    
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
    
    

})