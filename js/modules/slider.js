function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const bntPrev = document.querySelector(prevArrow),
        bntNext = document.querySelector(nextArrow),
        slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    console.log(width);
    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    // Всем слайдам одинаковую ширину
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    // Dots

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        // К каждой точке дата атрибут + нумерацию
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function getDotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function showCurrentIndex() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    bntNext.addEventListener('click', () => {
        // Если наш отступ, будет равен ширине 1 слайда, умноженно на кол-во слайдов -1, то ставим офсет в 0. (долистали до конца, возврат в начало)
        // + конвертирует в числовой тип данных, обрезаем px
        // Все не числа, удаляю
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // ~'500px'
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentIndex();

        getDotsOpacity();
    });

    bntPrev.addEventListener('click', () => {
        // Если первый слайд
        // Возвращаемся к нему 
        if (offset == 0) { // '500px'
            offset = deleteNotDigits(width) * (slides.length - 1);
            // Если не первый слайд
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentIndex();

        getDotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');
            // slideTo кликнули на 4 октрылось 4
            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            showCurrentIndex();

            getDotsOpacity();
        });
    });

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
}

export default slider;