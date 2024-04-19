import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';

// Функция для заполнения селекта торговых сетей
export const populateTradingNetworkSelect = async (selectedRegion) => {
    try {
        // Получаем данные по всем торговым сетям и соответствующим регионам
        const tradingNetworks = await fetchDataFromGoogleSheets('Sheet1!B3:B');
        const regions = await fetchDataFromGoogleSheets('Sheet1!A3:A');

        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!tradingNetworks || tradingNetworks.length === 0 || !regions || regions.length === 0) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        // Фильтруем торговые сети по выбранному региону
        const filteredTradingNetworks = [];
        
        // Перебираем торговые сети и соответствующие регионы
        for (let i = 0; i < regions.length; i++) {
            // Если регион совпадает с выбранным, добавляем торговую сеть в отфильтрованный список
            if (regions[i] === selectedRegion) {
                filteredTradingNetworks.push(tradingNetworks[i]);
            }
        }

        const uniqueFilteredTradingNetworks = getUniqueValues(filteredTradingNetworks);
        const tradingNetworkSelect = document.getElementById('trading-network');
        
        // Очищаем селект перед заполнением
        tradingNetworkSelect.innerHTML = '';

        // Создание опции "Выберите торговую сеть"
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Выберите торговую сеть';
        defaultOption.value = '';
        tradingNetworkSelect.appendChild(defaultOption);

        // Добавление уникальных торговых сетей в список
        uniqueFilteredTradingNetworks.forEach(tradingNetwork => {
            const option = document.createElement('option');
            option.textContent = tradingNetwork;
            option.value = tradingNetwork;
            tradingNetworkSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error populating trading network select:', error);
    }
};
