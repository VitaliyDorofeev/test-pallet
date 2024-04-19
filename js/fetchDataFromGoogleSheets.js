// Функция для получения данных из Google Таблицы 
export const fetchDataFromGoogleSheets = async (range) => {
    try {
        const spreadsheetId = '1HUCYLt6G0gy7BKOXUpZQ-eM1KHTogk25KvD7MQEovvg';
        const apiKey = 'AIzaSyAngsqkvSAnquqd4uHLIxBlHUD_kE5z6yU'; // API ключ

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Проверяем, есть ли данные и не являются ли они пустыми
        if (data && data.values && data.values.length > 0) {
            // Преобразование полученных данных в одномерный массив
            const values = data.values.flat();

            return values;
            
        } else {
            throw new Error('Empty data or invalid format returned from Google Sheets');
        }

    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
};

// Функция для получения уникальных значений из массива
export const getUniqueValues = (data) => {
    const uniqueValues = new Set(data);
    return Array.from(uniqueValues);
};
