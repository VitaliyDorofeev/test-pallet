import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';

// Функция для заполнения селекта "Tarif"
export const populateTarifSelect = async (selectedTradingNetwork, selectReturnPoints) => {
    try {
        // Получаем данные по всем Tarif и соответствующим регионам и торговым сетям
        const tarifList = await fetchDataFromGoogleSheets('Sheet1!F3:F'); 
        const returnPoints = await fetchDataFromGoogleSheets('Sheet1!C3:C');
        const tradingNetworks = await fetchDataFromGoogleSheets('Sheet1!B3:B');

        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!tarifList || tarifList.length === 0) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        // Фильтруем Tarif по выбранному региону и торговой сети
        const filteredTarifList = [];
        
        // Перебираем Tarif, соответствующие регионам и торговым сетям
        for (let i = 0; i < returnPoints.length; i++) {
            if (returnPoints[i] === selectReturnPoints && tradingNetworks[i] === selectedTradingNetwork) {
                filteredTarifList.push(tarifList[i]);
            }
        }

        const uniqueFilteredTariifList = getUniqueValues(filteredTarifList);
        const tarifSelect = document.getElementById('tarif');
        
        // Очищаем селект перед заполнением
        tarifSelect.innerHTML = '';

        // Добавление уникальных Tarif в список
        uniqueFilteredTariifList.forEach(tar => {
            const option = document.createElement('option');
            option.textContent = tar;
            option.value = tar;
            tarifSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error populating PLN select:', error);
    }
};
