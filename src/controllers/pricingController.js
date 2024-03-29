const PricingService = require('../services/pricingService');

class PricingController {
  static async calculatePrice(req, res) {
    try {
      const { zone, organization_id, total_distance, item_type } = req.body;
      const totalPrice = await PricingService.calculatePrice(zone, organization_id, total_distance, item_type);
      res.json({ total_price: totalPrice });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PricingController;
