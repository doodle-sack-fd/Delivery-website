document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsParrent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent');

    // TABS

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    // Если не задал аргумент, то по умолчанию аргумент 0
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    // Делегирования 
    tabsParrent.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.classList.contains('tabheader__item')) {
            // 1й аргумент, tabs, который перебираем, 2й аргуент, номер элемента по порядку
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // TIMER

    const deadline = '2022-10-21';
    // Аргумент - deadline
    function getTimeRemaining(endtime) {
        // Разница между датами в колличестве мс.
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    // Когда число < 10 , добавлять 0 в начала,передал в updateClock
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    // Получили все элементы со страницы

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            // Запуск функции каждую секунду
            timeInterval = setInterval(updateClock, 1000);
        // Мигание верстки, фикс.
        updateClock();

        function updateClock() {
            // Расчет времени на данную секунду
            // endtime - дедлайн
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Если время вышло, СТОП
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalShow = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    // Мы не можем на псевдомассив повешать обработчик событый, нужно перебрать
    modalShow.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = "";
    }

    modalCloseBtn.addEventListener('click', closeModal);

    // Клик по области за модалкой
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
            closeModal();
        }
    });
    // Закрытие по клавише esc
    document.addEventListener('keydown', (evt) => {
        if (evt.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        // Если высота окна сверху + высота на которой находится клиент, больше чем полная прокрутка (контент), если совпадают, то пользователь долистал до конца 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});