export const fetchMenus = async (token: string) => {
    const response = await fetch('http://180.191.51.65:9130/api/menus', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`Error: ${response.statusText} - ${errorData.message}`);
    }
  
    const data = await response.json();
    return data.payload;
  };
  

