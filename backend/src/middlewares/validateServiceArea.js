import SERVICE_AREA from "../config/serviceAreaConfig.js";

const validateServiceArea = (req, res, next) => {
  const { city, pincode } = req.body;

  // Check whether PIN code is provided
  if (!pincode) {
    return res.status(400).json({
      success: false,
      message: "Please select your service PIN code.",
    });
  }

  // Validate six-digit PIN code
  if (!/^\d{6}$/.test(String(pincode))) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid six-digit PIN code.",
    });
  }

  // Check city
  if (
    city &&
    city.trim().toLowerCase() !== SERVICE_AREA.city.toLowerCase()
  ) {
    return res.status(400).json({
      success: false,
      message: `Currently, we provide services only in ${SERVICE_AREA.city}.`,
    });
  }

  // Check service availability
  if (!SERVICE_AREA.supportedPincodes.includes(String(pincode))) {
    return res.status(400).json({
      success: false,
      message: "Sorry, our service is not available at this PIN code yet.",
    });
  }

  next();
};

export default validateServiceArea;
