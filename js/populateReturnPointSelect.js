import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';

// Функция для заполнения селекта "Точка возврата"
export const populateReturnPointSelect = async (selectedRegion, selectedTradingNetwork) => {
    try {
        // Получаем данные по всем точкам возврата и соответствующим регионам и торговым сетям
        const returnPoints = await fetchDataFromGoogleSheets('Sheet1!C3:C'); 
        const regions = await fetchDataFromGoogleSheets('Sheet1!A3:A');
        const tradingNetworks = await fetchDataFromGoogleSheets('Sheet1!B3:B');

        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!returnPoints || returnPoints.length === 0 || !regions || regions.length === 0 || !tradingNetworks || tradingNetworks.length === 0) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        // Фильтруем точки возврата по выбранному региону и торговой сети
        const filteredReturnPoints = [];
        
        // Перебираем точки возврата, соответствующие регионам и торговым сетям
        for (let i = 0; i < regions.length; i++) {
            if (regions[i] === selectedRegion && tradingNetworks[i] === selectedTradingNetwork) {
                filteredReturnPoints.push(returnPoints[i]);
            }
        }

        const uniqueFilteredReturnPoints = getUniqueValues(filteredReturnPoints);
        const returnPointSelect = document.getElementById('return-point');
        
        // Очищаем селект перед заполнением
        returnPointSelect.innerHTML = '';

        // Создание опции "Выберите точку возврата"
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Выберите точку возврата';
        defaultOption.value = '';
        returnPointSelect.appendChild(defaultOption);

        // Добавление уникальных точек возврата в список
        uniqueFilteredReturnPoints.forEach(returnPoint => {
            const option = document.createElement('option');
            option.textContent = returnPoint;
            option.value = returnPoint;
            returnPointSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error populating return point select:', error);
    }
};
