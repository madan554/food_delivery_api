const Pricing = require('../models/pricingModel');
const Item = require('../models/itemModel');
const Organization = require('../models/organizationModel');

// Create a new organization document
const newOrganization = new Organization({
    name: 'zomato',
  });
  
  // Save the document to the database
  newOrganization.save()
    .then((result) => {
      console.log('Organization document saved:', result);
    })
    .catch((error) => {
      console.error('Error saving organization document:', error);
    });

// Create a new item document
const newItem = new Item({
    type: 'perishable',
    description: 'Fresh fruits',
  });
  
  // Save the document to the database
  newItem.save()
    .then((result) => {
      console.log('Item document saved:', result);
    })
    .catch((error) => {
      console.error('Error saving item document:', error);
    });

// Create a new pricing document
const newPricing = new Pricing({
    organization_id: '5fec263021e75a3ae0528434', // Replace with a valid ObjectId for organization
    item_id: '5fec263021e75a3ae0528435', // Replace with a valid ObjectId for item
    zone: 'central',
    base_distance_in_km: 5,
    km_price: 1.5,
    fix_price: 10,
  });
  
  // Save the document to the database
  newPricing.save()
    .then((result) => {
      console.log('Pricing document saved:', result);
    })
    .catch((error) => {
      console.error('Error saving pricing document:', error);
    });

class PricingService {
  static async calculatePrice(zone, organizationId, totalDistance, itemType) {
    try {
      // Fetch pricing details from the database based on zone, organization, and item type
      const pricingDetails = await Pricing.findOne({ zone, organization_id: organizationId });
      
      if (!pricingDetails) {
        throw new Error('Pricing details not found for the provided parameters.');
      }

      // Perform calculations using the fetched pricing details
      let totalPrice = pricingDetails.fix_price; // Initial price based on base distance
      
      if (totalDistance > pricingDetails.base_distance_in_km) {
        const additionalDistance = totalDistance - pricingDetails.base_distance_in_km;
        totalPrice += additionalDistance * pricingDetails.km_price; // Add cost for additional distance
      }

      // Return the calculated total price
      return totalPrice;
    } catch (error) {
      throw new Error(`Failed to calculate price: ${error.message}`);
    }
  }
}

module.exports = PricingService;
