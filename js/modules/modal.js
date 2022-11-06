function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}



function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalShow = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    // Мы не можем на псевдомассив повешать обработчик событый, нужно перебрать
    modalShow.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector), modalTimerId);
    });
    // Клик по области за модалкой
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    // Закрытие по клавише esc
    document.addEventListener('keydown', (evt) => {
        if (evt.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        // Если высота окна сверху + высота на которой находится клиент, больше чем полная прокрутка (контент), если совпадают, то пользователь долистал до конца 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { openModal, closeModal };