const endpoint = 'http://localhost:5001';

export const addEntry = async (req) => {
    const response = await fetch(`${endpoint}/api/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: req.title,
          text: req.text,
          date: req.date,
          time: req.time 
      }),
    });
    const data = await response.json();
    console.log('Add entry response: ', data);
};

export const getEntries = async () => {
    const response = await fetch(`${endpoint}/api/entries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('Get entries response: ', data);
};