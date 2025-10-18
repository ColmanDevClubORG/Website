import { useQuery } from '@tanstack/react-query';

const fetchDataFromCsv = async () => {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/1zeDo4QaGobB9s4Qnibb9HJujpiFO9OfXSaqhEwv5CUQ/gviz/tq?tqx=out:csv&gid=0'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets. status=' + response.status);
    }

    const csvData = await response.text();
   const parsed = parseCsv(csvData);
   console.log('[useSheets] parsed rows:', parsed.length, parsed.slice(0, 3));
   return parsed;
  } catch (error) {
    console.error('[useSheets] fetch failed:', error);
   return [];
  }
};

const parseCsv = (csvData) => {
  return csvData
    .replace(/\r/g, '')
    .split('\n')
    .map((row) => row.replace(/^"?|"?$/g, '')) 
    .filter((row) => row.trim() !== '')
    .map((row) => row.split(/","/).map((cell) => cell.trim()));
};


const useGoogleSheetsData = () => {
  return useQuery({
    queryKey: ['googleSheetsData'],
    queryFn: fetchDataFromCsv,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGoogleSheetsData;
