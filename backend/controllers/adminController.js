// // // controllers/adminController.js
// // const knex = require('../db');

// // exports.getAllAdmins = async (req, res) => {
// //   try {
// //     const admins = await knex('admins').select('*');
// //     res.json(admins);
// //   } catch (error) {
// //     console.error('Error fetching admins:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // exports.addAdmin = async (req, res) => {
// //   const { name, email, password } = req.body; // Removed role as it's not in the schema
  
// //   if (!name || !email || !password) {
// //     return res.status(400).json({ error: 'Missing required fields' });
// //   }
  
// //   try {
// //     const [newAdmin] = await knex('admins')
// //       .insert({ name, email, password })
// //       .returning('*');
  
// //     res.status(201).json(newAdmin);
// //   } catch (error) {
// //     console.error('Error adding admin:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // exports.updateAdmin = async (req, res) => {
// //   const { id } = req.params;
// //   const { name, email, password } = req.body;

// //   if (!name && !email && !password) {
// //     return res.status(400).json({ error: 'No fields to update' });
// //   }

// //   console.log('Updating admin with ID:', id, 'Data:', req.body);

// //   try {
// //     const [updatedAdmin] = await knex('admins')
// //       .where({ id })
// //       .update({ name, email, password })
// //       .returning('*');

// //     if (updatedAdmin) {
// //       res.json(updatedAdmin);
// //     } else {
// //       res.status(404).json({ error: 'Admin not found' });
// //     }
// //   } catch (error) {
// //     console.error('Error updating admin:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };

// // exports.deleteAdmin = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     const result = await knex('admins').where({ id }).del();

// //     if (result) {
// //       res.json({ message: 'Admin deleted' });
// //     } else {
// //       res.status(404).json({ error: 'Admin not found' });
// //     }
// //   } catch (error) {
// //     console.error('Error deleting admin:', error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // };


// const knex = require('../db');

// exports.getAllAdmins = async (req, res) => {
//   try {
//     const admins = await knex('admins').select('*');
//     res.json(admins);
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.addAdmin = async (req, res) => {
//   const { name, email, password, active } = req.body; // Include active

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }
  
//   try {
//     const [newAdmin] = await knex('admins')
//       .insert({ name, email, password, active: active !== undefined ? active : true }) // Default to active if not provided
//       .returning('*');
  
//     res.status(201).json(newAdmin);
//   } catch (error) {
//     console.error('Error adding admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.updateAdmin = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password, active } = req.body;

//   if (!name && !email && !password && active === undefined) {
//     return res.status(400).json({ error: 'No fields to update' });
//   }

//   console.log('Updating admin with ID:', id, 'Data:', req.body);

//   try {
//     const [updatedAdmin] = await knex('admins')
//       .where({ id })
//       .update({ name, email, password, active }) // Update active field
//       .returning('*');

//     if (updatedAdmin) {
//       res.json(updatedAdmin);
//     } else {
//       res.status(404).json({ error: 'Admin not found' });
//     }
//   } catch (error) {
//     console.error('Error updating admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// exports.deleteAdmin = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Soft delete by setting active to false
//     const [result] = await knex('admins')
//       .where({ id })
//       .update({ active: false })
//       .returning('*');

//     if (result) {
//       res.json({ message: 'Admin deactivated' });
//     } else {
//       res.status(404).json({ error: 'Admin not found' });
//     }
//   } catch (error) {
//     console.error('Error deactivating admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Endpoint to activate a deactivated admin
// exports.activateAdmin = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [result] = await knex('admins')
//       .where({ id })
//       .update({ is_active: true })
//       .returning('*');

//     if (result) {
//       res.json({ message: 'Admin activated' });
//     } else {
//       res.status(404).json({ error: 'Admin not found' });
//     }
//   } catch (error) {
//     console.error('Error activating admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const knex = require('../db');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await knex('admins').select('*');
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a new admin
exports.addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [newAdmin] = await knex('admins')
      .insert({ name, email, password, is_active: true }) // Default to active
      .returning('*');
  
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an admin
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, is_active } = req.body;

  if (!name && !email && !password && is_active === undefined) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  try {
    const [updatedAdmin] = await knex('admins')
      .where({ id })
      .update({ name, email, password, is_active })
      .returning('*');

    if (updatedAdmin) {
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete (soft delete) an admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex('admins').where({ id }).update({ is_active: false });

    if (result) {
      res.json({ message: 'Admin deactivated' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deactivating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Activate an admin
// exports.activateAdmin = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await knex('admins').where({ id }).update({ is_active: true });

//     if (result) {
//       res.json({ message: 'Admin activated' });
//     } else {
//       res.status(404).json({ error: 'Admin not found' });
//     }
//   } catch (error) {
//     console.error('Error activating admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

exports.activateAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedAdmin] = await knex('admins')
      .where({ id })
      .update({ is_active: true })
      .returning('*');

    if (updatedAdmin) {
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error activating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller for deactivating an admin
exports.deactivateAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const [updatedAdmin] = await knex('admins')
      .where({ id })
      .update({ is_active: false })
      .returning('*');

    if (updatedAdmin) {
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deactivating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
