import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';

// Функция для заполнения селекта "РЦ"
export const populateRcsSelect = async (selectedTradingNetwork, selectReturnPoints) => {
    try {
        // Получаем данные по всем РЦ и соответствующим регионам и торговым сетям
        const rcsList = await fetchDataFromGoogleSheets('Sheet1!E3:E'); 
        const returnPoints = await fetchDataFromGoogleSheets('Sheet1!C3:C'); 
        const tradingNetworks = await fetchDataFromGoogleSheets('Sheet1!B3:B');




        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!rcsList || rcsList.length === 0) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        // Фильтруем РЦ по выбранному региону и торговой сети
        const filteredRcsList = [];
        
        // Перебираем РЦ, соответствующие регионам и торговым сетям
        for (let i = 0; i < returnPoints.length; i++) {

            if (tradingNetworks[i] === selectedTradingNetwork && returnPoints[i] === selectReturnPoints) {

                filteredRcsList.push(rcsList[i]);
            }
        }

        const uniqueFilteredRcsList = getUniqueValues(filteredRcsList);
        const rcsSelect = document.getElementById('rcs');
        
        // // Очищаем селект перед заполнением
        rcsSelect.innerHTML = '';

        // Добавление уникальных РЦ в список
            uniqueFilteredRcsList.forEach(rcs => {
                const option = document.createElement('option');
                option.textContent = rcs;
                option.value = rcs;
                rcsSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error populating PLN select:', error);
    }
};
