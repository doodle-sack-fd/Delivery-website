function tabs(tabsSelector, tabsContentSelector, tabsParrentSelector, aciveClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParrent = document.querySelector(tabsParrentSelector);


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        }); 

        tabs.forEach(item => {
            item.classList.remove(aciveClass);
        });
    }
    // Если не задал аргумент, то по умолчанию аргумент 0
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(aciveClass);
    }

    hideTabContent();
    showTabContent();

    // Делегирования 
    tabsParrent.addEventListener('click', (evt) => {
        const target = evt.target;
        // удаляем точку перед tabsSelector
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            // 1й аргумент, tabs, который перебираем, 2й аргуент, номер элемента по порядку
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

// Экспорт этой функции
export default tabs;