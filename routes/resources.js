import express from 'express';
import { Resource } from '../models/Resource.js';

const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new resource
router.post('/', async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    
    // Emit new resource to all connected clients
    req.app.get('io').emit('new_resource', resource);
    
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update resource
router.patch('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    // Emit updated resource to all connected clients
    req.app.get('io').emit('update_resource', resource);
    
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const resourceRoutes = router;