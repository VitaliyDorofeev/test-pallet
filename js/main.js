import { populateRegionSelect } from './populateRegionSelect.js';
import { populateReturnPointSelect } from './populateReturnPointSelect.js';
import {populatePLNSelect} from './populatePLNSelect.js';
import { populateRcsSelect } from './populateTradingNetworkAndRCSelect.js';
import {populateTarifSelect} from './populateTarifSelect.js';
import { palletButton } from './palletButton.js';


// Вызов функции для заполнения селекта регионов при загрузке страницы
document.addEventListener('DOMContentLoaded', populateRegionSelect);

// Обработчик события при фокусировке на селекте точек возврата
document.getElementById('return-point').addEventListener('focus', () => {
    const selectedRegion = document.getElementById('region').value;
    const selectedTradingNetwork = document.getElementById('trading-network').value;

    if (selectedRegion !== '' && selectedTradingNetwork !== '') {
        populateReturnPointSelect(selectedRegion, selectedTradingNetwork);
    }
});

// Добавляем обработчик события изменения значения в селекте регионов
document.getElementById('region').addEventListener('change', () => {

       // Очищаем селект PLN
       clearPLNSelect();

            // Очищаем селект Rc
        clearRcsSelect();

            // Очищаем селект Tarif
        clearTarifSelect();

        clearSum();
        
    const regionSelect = document.getElementById('region');

    if (regionSelect.value !== '') {
        // Если выбрано значение, то очищаем селект точек возврата
        clearReturnPointSelect();
    }
});

// Функция для очистки селекта точек возврата
const clearReturnPointSelect = () => {
    const returnPointSelect = document.getElementById('return-point');

    returnPointSelect.innerHTML = '';
    returnPointSelect.value = ''; // Сбрасываем значение


    // Добавляем пустую опцию "Выберите точку возврата"
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Выберите точку возврата';
    defaultOption.value = '';
    returnPointSelect.appendChild(defaultOption);
};

// Функция для очистки селекта PLN
const clearPLNSelect = () => {
    const plnSelect = document.getElementById('pln');
    plnSelect.innerHTML = '';

    // Создаем и добавляем опцию с текстом "PLN"
    const defaultOption = document.createElement('option');
    defaultOption.text = 'PLN';
    defaultOption.value = '';
    plnSelect.appendChild(defaultOption);

    // Сбрасываем значение
    plnSelect.value = '';
};

// Функция для очистки селекта Rcs
const clearRcsSelect = () => {
    const rcsSelect = document.getElementById('rcs');
    rcsSelect.innerHTML = '';

    // Создаем и добавляем опцию с текстом "PLN"
    const defaultOption = document.createElement('option');
    defaultOption.text = 'РЦ в Регионе';
    defaultOption.value = '';
    rcsSelect.appendChild(defaultOption);

    // Сбрасываем значение
    rcsSelect.value = '';
};

// Функция для очистки селекта Rcs
const clearTarifSelect = () => {
    const tarifSelect = document.getElementById('tarif');
    tarifSelect.innerHTML = '';

    // Создаем и добавляем опцию с текстом "PLN"
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Тариф без НДС';
    defaultOption.value = '';
    tarifSelect.appendChild(defaultOption);

    // Сбрасываем значение
    tarifSelect.value = '';
};

const clearSum = () => {
    const slectinput = document.querySelectorAll('.pallet-return-form__group__input');

    slectinput.forEach((e) => {
        e.innerHTML = '';
        e.value = '';
    })
}

// Обработчик события при изменении значения в селекте торговых сетей
document.getElementById('trading-network').addEventListener('change', async () => {
    // Очищаем селект PLN
    clearPLNSelect();

     // Очищаем селект Rc
     clearRcsSelect();

      // Очищаем селект Tarif
    clearTarifSelect();

    clearReturnPointSelect();

    clearSum();

});

document.getElementById('return-point').addEventListener('change', async () => {

    // Очищаем селект PLN
    clearPLNSelect();

     // Очищаем селект Rc
     clearRcsSelect();

      // Очищаем селект Tarif
    clearTarifSelect();

    clearSum();


    const selectedReturnPoint = document.getElementById('return-point').value;
    const selectedTradingNetwork = document.getElementById('trading-network').value;
    

    if (selectedReturnPoint !== '') {
        await populatePLNSelect(selectedReturnPoint, selectedTradingNetwork);
        await populateRcsSelect(selectedTradingNetwork, selectedReturnPoint);
        await populateTarifSelect(selectedTradingNetwork, selectedReturnPoint);
    }
});



// Функция для проверки, были ли подтянуты все данные
const checkDataCompletion = () => {
    const region = document.getElementById('region').value;
    const tradingNetwork = document.getElementById('trading-network').value;
    const returnPoint = document.getElementById('return-point').value;

    // Проверка условия
    if (region !== '' && tradingNetwork !== '' && returnPoint !== '') {

        document.querySelector('.pallet-return-form__sum').style.display = 'flex';

    } else {

        document.querySelector('.pallet-return-form__sum').style.display = 'none';
    }
};

// Добавляем вызов функции при изменении значений в селектах
document.getElementById('return-point').addEventListener('change', checkDataCompletion);

palletButton()
