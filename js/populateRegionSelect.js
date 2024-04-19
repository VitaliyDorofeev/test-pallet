import { fetchDataFromGoogleSheets, getUniqueValues } from './fetchDataFromGoogleSheets.js';
import { populateTradingNetworkSelect } from './populateTradingNetworkSelect.js';


// Функция для заполнения селекта регионов
export const populateRegionSelect = async () => {
    try {
        const regions = await fetchDataFromGoogleSheets('Sheet1!A3:A');
        
        // Проверяем, есть ли данные и не являются ли они пустыми
        if (!regions || regions.length === 0) {
            console.error('No data or empty data returned from Google Sheets');
            return;
        }

        const uniqueRegions = getUniqueValues(regions);
        const regionSelect = document.getElementById('region');
        regionSelect.innerHTML = ''; // Очищаем селект перед заполнением

        // Создание опции "Выберите регион"
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Выберите регион';
        defaultOption.value = '';
        regionSelect.appendChild(defaultOption);

        // Добавление уникальных регионов в список
        uniqueRegions.forEach(region => {
            const option = document.createElement('option');
            option.textContent = region;
            option.value = region;
            regionSelect.appendChild(option);
        });

        // Устанавливаем обработчик события изменения селекта
        regionSelect.addEventListener('change', async () => {
            const selectedRegion = regionSelect.value;
            if (selectedRegion === '') {
                // Если выбрана пустая опция, игнорируем сброс значения
                return;
            }
            // Вызываем функцию для заполнения селекта торговых сетей с учетом выбранного региона
            await populateTradingNetworkSelect(selectedRegion);
        });

    } catch (error) {
        console.error('Error populating region select:', error);
    }
};
