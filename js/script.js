document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsParrent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent');

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

            if (target && target.classList.contains('tabheader__item')){
                // 1й аргумент, tabs, который перебираем, 2й аргуент, номер элемента по порядку
                tabs.forEach((item, i) => {
                    if(target == item) {
                        hideTabContent();
                        showTabContent(i); 
                    }
                });
            }
        });
});