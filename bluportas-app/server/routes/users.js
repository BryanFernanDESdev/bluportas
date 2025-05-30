const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Obter todos os usuários
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

// Obter usuário por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

// Criar novo usuário (admin)
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verificar se já existe um usuário com o mesmo email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Já existe um usuário com este email' });
    }
    
    const newUser = new User({
      name,
      email,
      password,
      role: role || 'user'
    });
    
    const savedUser = await newUser.save();
    
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Verificar se o usuário existe
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Se o email foi alterado, verificar se já existe outro usuário com o novo email
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Já existe um usuário com este email' });
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role
      },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
});

// Excluir usuário
router.delete('/:id', auth, async (req, res) => {
  try {
    // Verificar se o usuário existe
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
});

module.exports = router;