import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useGetUserQuery } from "../../store/api/api";
import { IUser, IUserData } from "../../types/user.types";
import { LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import styles from "./AuthPage.module.css";
import { motion } from "framer-motion";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";

const user = {
  email: "",
  password: "",
};

const SingInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password is too short")
    .max(15, "Password is too long")
    .required("Password is required"),
});

const AuthPage = () => {
  const { setUser } = useActions();
  const [userData, setUserData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  const { data, isLoading, isSuccess } = useGetUserQuery([
    userData.email,
    userData.password,
  ]);

  useEffect(() => {
    data && setUser(data.id);
  }, [data]);

  return (
    <motion.div
      className={styles.container}
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SingInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setUserData({ ...userData, ...values });
          console.log(userData);
        }}
      >
        {({ isSubmitting, setSubmitting, getFieldMeta, values }) => (
          <Form className={styles.form}>
            <label>Email</label>
            <motion.div
              className={styles.formInput}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <LuMail className={styles.icon} />
              <Field
                type="email"
                placeholder="Enter your email"
                // value={userData.email}
                // onChange={(e) =>
                //   setUserData({ ...userData, email: e.target.value })
                // }
                name="email"
              />
            </motion.div>
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />

            <label>Password</label>
            <motion.div
              className={styles.formInput}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              // transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <LuLock className={styles.icon} />
              <Field
                type={showPassword ? "text" : "password"}
                // checked={false}
                // value={userData.password}
                placeholder="Enter your password"
                name="password"

                // onChange={() =>
                //   setUserData({ ...userData, password: e.target.value })
                // }
              />
              {showPassword ? (
                <LuEye
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <LuEyeOff
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </motion.div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />

            <motion.div
              className={styles.btn}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              // transition={{ duration: 1 }}
            >
              <button type="submit">Sign In</button>
            </motion.div>
          </Form>
        )}
      </Formik>
      {/* <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SingInSchema}
        onSubmit={(values, { setSubmitting }) => {
          setUserData(values);
          data && setUser(data.id);
          // setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik> */}
    </motion.div>
  );
};

export default AuthPage;
