import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Email inválido').required('Requerido'),
  password: yup.string().required('Requerido'),
});

export default function Login() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
