const Scheme = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id)
    if(!scheme) {
      next({ status: 404, message: `scheme with scheme_id ${scheme.scheme_id} not found`})
    } else {
      req.scheme = scheme
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (!req.body.scheme_name || req.body.scheme_name === undefined || req.body.scheme_name != typeof(String)) {
    return next({
      status: 400,
      message: 'invalid scheme_name'
    })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
 if (!req.body.instructions || 
  req.body.instructions === undefined || 
  req.body.instructions != typeof(String) ||
  req.body.step_number != typeof(Number)||
  req.body.step_number < 1) {
    return next({ 
      status: 400,
      message: 'invalid step'
    })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
