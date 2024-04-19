import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';

// Функция для заполнения селекта "PLN"
export const populatePLNSelect = async (selectReturnPoints, selectedTradingNetwork) => {
    try {
        // Получаем данные по всем PLN и соответствующим регионам и торговым сетям
        const plnList = await fetchDataFromGoogleSheets('Sheet1!D3:D'); 
        const returnPoints = await fetchDataFromGoogleSheets('Sheet1!C3:C');
        const tradingNetworks = await fetchDataFromGoogleSheets('Sheet1!B3:B');


        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!plnList || plnList.length === 0 ) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        // Фильтруем PLN по выбранному региону и торговой сети
        const filteredPLNList = [];
        
        // Перебираем PLN, соответствующие регионам и торговым сетям
        for (let i = 0; i < returnPoints.length; i++) {

            if (returnPoints[i] === selectReturnPoints && tradingNetworks[i] === selectedTradingNetwork) {

                filteredPLNList.push(plnList[i]);
            }
        }

        const uniqueFilteredPLNList = getUniqueValues(filteredPLNList);
        const plnSelect = document.getElementById('pln');
        
        // Очищаем селект перед заполнением
        plnSelect.innerHTML = '';

        // Добавление уникальных PLN в список
            uniqueFilteredPLNList.forEach(pln => {
            const option = document.createElement('option');
            option.textContent = pln;
            option.value = pln;
            plnSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error PLN select:', error);
    }
};
