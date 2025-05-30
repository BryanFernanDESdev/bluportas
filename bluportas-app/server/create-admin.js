const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

// Carregar variáveis de ambiente
dotenv.config();

// Função para criar usuário admin
async function createAdmin() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Verificar se já existe um usuário admin
    const adminExists = await User.findOne({ email: 'admin@bluportas.com' });
    
    if (adminExists) {
      console.log('Removendo usuário admin existente...');
      await User.deleteOne({ email: 'admin@bluportas.com' });
    }
    
    // Criar senha simples
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Criar usuário admin
    const admin = new User({
      name: 'Administrador',
      email: 'admin@bluportas.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('Usuário admin criado com sucesso!');
    console.log('Email: admin@bluportas.com');
    console.log('Senha: admin123');
    
    // Desconectar do MongoDB
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Executar a função
createAdmin();