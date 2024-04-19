export const palletButton = () => {
    
    const btn = document.querySelector('.pallet-return-form__group__btn');

    btn.addEventListener('click', (e)=> {
        e.preventDefault();

        const selectedTarif = document.getElementById('tarif').value;

        // Получаем введенное значение из инпута
        const inputValue = document.querySelector('.pallet-return-form__group__input').value;

        // Проверяем, что оба значения числовые
        if (!isNaN(selectedTarif) && !isNaN(inputValue)) {
            // Вычисляем результат умножения
            const result = selectedTarif * inputValue;
            const resultText = new Intl.NumberFormat('ru-RU').format(result) + ' Рублей в месяц';

            // Выводим результат 
            document.querySelector('.pallet-return-form__group__input__check').innerHTML = resultText;
            
        } else {
            // Выводим сообщение об ошибке, если одно из значений не является числом
            console.error('Ошибка: одно из значений не является числом');
        }
    })
}