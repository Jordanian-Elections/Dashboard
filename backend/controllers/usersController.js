// const knex = require('../db');

// // Get all users with pagination and filtering
// exports.getAllUsers = async (req, res) => {
//   const { search = '', role = '', page = 1, pageSize = 10 } = req.query;
//   const offset = (page - 1) * pageSize;

//   try {
//     const query = knex('users')
//       .select('*')
//       .where('isActivate', true)
//       .limit(pageSize)
//       .offset(offset);

//     if (search) {
//       query.where('name', 'ilike', `%${search}%`);
//     }
//     if (role) {
//       query.where('role', role);
//     }

//     const users = await query;
//     const total = await knex('users')
//       .where('isActivate', true)
//       .count()
//       .then(([{ count }]) => count);

//     res.json({ users, total });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Add a new user
// exports.addUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const [newUser] = await knex('users')
//       .insert({ name, email, password, role, is_active: true }) // Default to active
//       .returning('*');

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Update a user
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, role, isActivate } = req.body;

//   if (!name && !email && !password && !role && isActivate === undefined) {
//     return res.status(400).json({ error: 'No fields to update' });
//   }

//   try {
//     const [updatedUser] = await knex('users')
//       .where({ id })
//       .update({ name, email, password, role, isActivate})
//       .returning('*');

//     if (updatedUser) {
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Soft delete a user (deactivate)
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await knex('users').where({ id }).update({ isActivate: false });

//     if (result) {
//       res.json({ message: 'User deactivated' });
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error deactivating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Activate a user
// exports.activateUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [updatedUser] = await knex('users')
//       .where({ id })
//       .update({isActivate: true })
//       .returning('*');

//     if (updatedUser) {
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error activating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Deactivate a user
// exports.deactivateUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [updatedUser] = await knex('users')
//       .where({ id })
//       .update({ isActivate: false })
//       .returning('*');

//     if (updatedUser) {
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error deactivating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const knex = require('../db');

// Get all users with pagination and filtering
exports.getAllUsers = async (req, res) => {
  const { search = '', role = '', page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const query = knex('users')
      .select('*')  // Ensure city and circle are selected
      .where('isActivate', true)
      .limit(pageSize)
      .offset(offset);

    if (search) {
      query.where('name', 'ilike', `%${search}%`);
    }
    if (role) {
      query.where('role', role);
    }

    const users = await query;
    const total = await knex('users')
      .where('isActivate', true)
      .count('id as count')
      .then(([{ count }]) => count);

    res.json({ users, total });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { name, email, password, role, city, circle } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const [newUser] = await knex('users')
      .insert({ name, email, password, role, city, circle, isActivate: true }) // Default to active
      .returning('*');

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, city, circle, isActivate } = req.body;

  if (!name && !email && !password && !role && !city && !circle && isActivate === undefined) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  try {
    const [updatedUser] = await knex('users')
      .where({ id })
      .update({ name, email, password, role, city, circle, isActivate })
      .returning('*');

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Soft delete a user (deactivate)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex('users').where({ id }).update({ isActivate: false });

    if (result) {
      res.json({ message: 'User deactivated' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Activate a user
exports.activateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedUser] = await knex('users')
      .where({ id })
      .update({ isActivate: true })
      .returning('*');

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error activating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Deactivate a user
exports.deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedUser] = await knex('users')
      .where({ id })
      .update({ isActivate: false })
      .returning('*');

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
