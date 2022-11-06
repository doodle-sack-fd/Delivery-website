import { openModal, closeModal } from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    // Берем все наши формы и под каждую из них подвязываю нашу функцию postData

    forms.forEach(item => {
        bindPostData(item);
    });

    // func отвечает за постинг данных (привязку)
    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // Принимаем/собираем данные из формы
            const formData = new FormData(form);

            // Берем formData, которая сорбрала данные с формы, превращаем в массив массивов, потом в обычный объект, а дальше в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Подставили функцию 
            postData('http://localhost:3000/requests', json)
                // data, данные которые вернул сервер
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    // Очищаем форму
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;