import {Router} from 'express';
import {check} from 'express-validator';

import {createUser, deleteUser, getAllUsers, updateUser} from '../controllers/user.controller.js';
import {fieldValidators} from '../middlewares/field-validators.js';
import {isValidateEmail, isValidateId, isValidateRol} from '../helpers/db-validators.js';

const router = Router();

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('email', 'El email no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isValidateRol),
    check('email').custom(isValidateEmail),
    fieldValidators,
  ],
  createUser,
);

router.get('/', getAllUsers);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(isValidateId),
    check('rol').custom(isValidateRol),
    fieldValidators,
  ],
  updateUser,
);

router.delete(
  '/:id',
  [
      check('id', 'No es un ID valido').isMongoId(),
      check('id').custom(isValidateId),
      fieldValidators,
  ],
  deleteUser
);

export default router;