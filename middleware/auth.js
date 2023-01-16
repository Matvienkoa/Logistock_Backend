const jwt = require('jsonwebtoken');
const models = require('../models/Index');

// Security : check if user is loged with token
exports.checkJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
		jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decodedToken) => {
			if (err) {
				console.log(err);
        res.status(400).send({ message: "token expiré" });
			} else {
				next();
			}
		});
	} else {
		console.log('no token !');
	}
};

// Security : check if user is good user with token
exports.checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const user = models.Users.findOne({
      where: { id: userId },
    });
    if (user) {
      next();
    } else {
      res.status(400).send({ message: "Utilisateur non trouvé" });
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


// Security : check if parent is good parent with token
exports.checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const user = await models.Users.findOne({
      where: { id: userId },
    });
    if (user.role === 'warehouse') {
      next();
    } else {
      res.status(400).send({ message: "Utilisateur non autorisé" });
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};