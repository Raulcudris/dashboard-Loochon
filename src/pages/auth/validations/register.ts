import axios from 'axios';
import * as Yup from 'yup';

export const flgValidaIdUsers = async (tcrIDuser: string) => {
	try {
		const lcrUrl = process.env.NEXT_PUBLIC_ENVIRONMENT_HOST;
		const lcrApiKey = process.env.NEXT_PUBLIC_ENVIRONMENT_APIKEY;
		//Variables de entorno
		const url =
			lcrUrl +
			'form_recmaesusuarima_query.php?auniquekey=' +
			lcrApiKey +
			'&typequery=ID&keyquery=' +
			tcrIDuser;
		// Realiza la solicitud GET a la URL
		const response = await axios.get(url);
		// Analiza la respuesta y obtén la información que necesitas
		if (response.data.RspValue === 'OK') {
			return 'REGISTRADO';
		} else {
			return 'NO';
		}
	} catch (error) {
		return 'Error al validar la identificación del usuario.';
	}
};

export const registerValidations = Yup.object({
	sis_tipide_tide: Yup.string()
		.max(10)
		.required('Tipo Identificación es requerido'),
	rec_nroide_reus: Yup.string()
		.trim()
		.matches(/^[a-zA-Z0-9]*$/, 'El formato no es valido.')
		.required('Numero Identificación es requerido')
		.test(
			'usuario-existe',
			'El usuario ya está registrado',

			// Agregar debounce

			async value => {
				if (value) {
					const lcrRes = await flgValidaIdUsers(value);
					return lcrRes === 'REGISTRADO';
				}
				return true; // Si el campo está vacío, no se realiza la validación
			}
		),
	rec_priape_reus: Yup.string()
		.max(30)
		.required('Primer Apellido es requerido'),
	rec_segape_reus: Yup.string().max(30),
	rec_prinom_reus: Yup.string().max(30).required('Primer Nombre es requerido'),
	rec_segnom_usua: Yup.string().max(30),
	rec_fecnac_reus: Yup.date()
		.max('2007-01-01', 'Usuario debe haber nacido antes del 2007')
		.required('Fecha es requerida'),
	rec_sexusu_reus: Yup.string().max(25).required('Sexo es requerido'),
	rec_dirres_reus: Yup.string().max(255).required('Direccion es requerido'),
	rec_telefo_reus: Yup.number().required('Telefono es requerido'),
	rec_correo_reus: Yup.string()
		.email('El correo no es valido.')
		.required('El correo es requerido'),
	rec_ocupcodigo_reoc: Yup.string().max(255).required('Ocupacion es requerido'),
	rec_traspcodigo_reta: Yup.string()
		.max(255)
		.required('Transporte habitual es requerido'),
	sis_codpai_sipa: Yup.string().max(255).required('Pais es requerido')
});
