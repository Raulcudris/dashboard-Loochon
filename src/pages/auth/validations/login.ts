import * as Yup from 'yup';

export const loginFormValidations = Yup.object({
	rec_logincodigo_reus: Yup.string()
		.max(255)
		.required('El usuario es requerido.'),
	rec_loginclave_reus: Yup.string()
		.max(255)
		.required('La contraseña es requerida.')
});
