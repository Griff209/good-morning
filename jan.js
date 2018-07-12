const express = require('express');
const jan = express();

jan.get('/', (req, res) => 
    res.sendFile(`${__dirname}/views/welcome.html`)
);
jan.listen(3000, () => 
    console.log('The Jan is listening')
);
