const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    // Verificar se já existe um usuário admin
    const adminExists = await User.findOne({ email: 'admin@bluportas.com' });
    
    if (!adminExists) {
      // Criar senha hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Criar usuário admin
      const admin = new User({
        name: 'Administrador',
        email: 'admin@bluportas.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await admin.save();
      console.log('Usuário administrador criado com sucesso');
    }
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  }
};

module.exports = createAdminUser;