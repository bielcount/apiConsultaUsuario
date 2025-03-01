const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
