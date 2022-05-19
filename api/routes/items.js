var express = require('express');
var router = express.Router();

/**
 * ****
 * Import the model we declared earlier
 */
var Items = require('../schema/Items');


/**
 * Request:
 * POST /api/item
 * Body-
 *  {
 *  name: String
 *  quantity: Number
 * }
 * 
 * Response:
 *  Body: HTTP 200 - 'Success' / HTTP 400 - { message: '' }
 * 
 *  */
router.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Please provide item name' });
    throw new Error('Failed request - ' + req);
  }
  else if (!quantity) {
    quantity = 1;
  }

  const existing = await Items.findOne({
    name: name
  });
  if(existing)
   { existing.quantity += quantity;
  
  if(await existing.save())
    res.status(200).json({
      message: 'Saved..'
    });

}
else{
  const item = await Items.create({
    name: name,
    quantity: quantity
  }).catch(err => {
    console.log(err);
    res.status(400).json({
      message: 'Could not save the item, Please try again.'
    })
  });

  if (item)
    res.status(200).json('Success');
  else res.status(400).json({
    message: 'Item Not saved. Please try again'
  });
}
});


/**
 * Request:
 * GET /api/item
 *  params:
 *  name(optional)
 * 
 * Response:
 *  Body: HTTP 200 - Object{ Item } / HTTP 400 - { message: '' }
 * 
 *  http://localhost:3000/api/items?name=Bread
 * 
 * {
 * name: Bread
 * }
 * 
 * 
 *  */
router.get('/', async (req, res, next) => {
  const name = req.query.name;
  var mongooseQuery = {};
  if (name) {
    mongooseQuery['name'] = name;
  }
  const items = await Items.find(mongooseQuery).sort([['name',1]]).catch(err => { console.log(err); res.status(400).json({ message: 'Not able to get items' }) });
  if(items)
  res.status(200).json({
    count: items.length,
    items: items
  })
})


/**
 * Request:
 * PUT /api/item/update
 * PARAMS:
 *  name(required)
 * 
 * Response:
 *  Body: HTTP 200 - Object{ Item } / HTTP 400 - { message: '' }
 * 
 *  http://localhost:3000/api/items/update?name=Bread
 * {
 *  name : "Eggs"
 * }
 * 
 *  */
router.put('/update', async (req, res, next) => {
  const name = req.query.name;
  if (!name) {
    res.status(400).json({
      message: 'Please pass name of the item'
    })
  }
  else {
    const items = await Items.exists({ name }).catch(err => {
      console.log(err);
      res.status(400).json({
        message: 'Not able to get items'
      })
    });
    if (!items) {
      res.status(400).json({
        message: 'Item with that name not found'
      });
    }
    if (items) {
      try {
        await Items.remove({ name });
        await Items.create({ name: req.body.name, quantity: req.body.quantity });
        res.status(202).json('Success');
      } catch (e) {
        console.log(e);
        res.json('An error occured while updating.');
      }
    }
  }
})




/**
 * Request:
 * DELETE /api/item/delete
 *  param:
 *    name
 * 
 * Response:
 *  Body: HTTP 200 - Success / HTTP 400 - { message: '' }
 * 
 *  */
router.delete('/delete', async (req, res, next) => {
  const name = req.query.name;
  if (!name) {
    res.status(400).json({
      message: 'Please pass name of the item'
    })
  }
  else {
    const items = await Items.exists({ name }).catch(err => {
      console.log(err);
      res.status(400).json({
        message: 'Not able to get items'
      })
    });
    if (!items) {
      res.status(400).json({
        message: 'Item with that name not found'
      });
    }
    if (items) {
      try {
        await Items.remove({ name });
        res.status(200).json('Success');
      } catch (e) {
        console.log(e);
        res.status(400).json({message:'An error occured while deleting item.'});
      }
    }
  }
})




module.exports = router;
