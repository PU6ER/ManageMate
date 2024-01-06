import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { LuEye, LuEyeOff, LuLock, LuMail, LuUser } from "react-icons/lu";
import styles from "./UserPage.module.css";
import { useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/api/user.api";
import { useUser } from "../../hooks/useUser";
import { storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import ReactModal, { prototype } from "react-modal";

interface InitValues {
  email: string;
  password: string;
  name: string;
  imageUrl: any;
}
type InitValuesType = {
  email?: string;
  password?: string;
  name?: string;
  imageUrl?: any;
};
const checkValues = (values: InitValues) => {
  const res: InitValuesType = {};
  let validCount = 0;
  for (const [key, value] of Object.entries(values)) {
    if (value !== "") {
      res[key as keyof InitValuesType] = value;
      validCount++;
    }
  }
  if (validCount === 0) return null;
  return res;
};

const UserPage = () => {
  const initialValues: InitValues = {
    email: "",
    password: "",
    name: "",
    imageUrl: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [image, setImage] = useState<File>();
  const { user } = useUser();
  const { data, isLoading } = useGetUserByIdQuery(user[0]);
  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storageRef = image && ref(storage, `users/${user[0]}/${image.name}`);
    const uploadTask = storageRef && (await uploadBytes(storageRef, image));
    console.log(image);

    image &&
      !isLoading &&
      data &&
      getDownloadURL(ref(storage, `users/${user[0]}/${image.name}`)).then(
        (downloadURL) => {
          const newUser = data && { ...data, imageUrl: downloadURL };
          updateUser(newUser);
          console.log("newUser", newUser);
        }
      );
  };
  return (
    <div className={styles.outerContainer}>
      <motion.div
        className={styles.container}
        initial={{ y: -300 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.title}>
          <h2>Profile</h2>
        </div>
        <div className={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const newValues = checkValues(values);
              const newUser = data && newValues && { ...data, ...newValues };

              console.log("newUser", newUser);
              newUser && updateUser(newUser);

              console.log("Checked values", checkValues(values));
            }}
          >
            {({
              isSubmitting,
              setSubmitting,
              getFieldMeta,
              values,
              setValues,
            }) => (
              <Form className={styles.form}>
                <label>Name</label>
                <motion.div
                  className={styles.formInput}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  // transition={{ duration: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <LuUser className={styles.icon} />
                  <Field
                    type="text"
                    placeholder="Enter your name"
                    value={isInput ? undefined : data && data.name}
                    // value={userData.email}
                    // onChange={(e) =>
                    //   setUserData({ ...userData, email: e.target.value })
                    // }
                    onClick={() => {
                      setIsInput(true);
                      console.log(values);
                    }}
                    name="name"
                  />
                  <ErrorMessage name="email" component="div" />
                </motion.div>
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
                    value={isInput ? undefined : data && data.email}
                    onClick={() => {
                      setIsInput(true);
                      console.log(values);
                    }}
                    name="email"
                  />
                  <ErrorMessage name="email" component="div" />
                </motion.div>

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
                    value={isInput ? undefined : data && data.password}
                    onClick={() => {
                      setIsInput(true);
                      console.log(values);
                    }}
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
                  <ErrorMessage name="password" component="div" />
                </motion.div>
                {/* <motion.div
                  className={styles.formInput}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  // transition={{ duration: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <LuMail className={styles.icon} />
                  <Field
                    type="file"
                    placeholder="Enter your email"
                    // value={userData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(e.target.files);
                      // e.target.files &&
                      //   setValues({ ...values, image: e.target.files[0] });

                      console.log("values after img", values);
                    }}
                    // onClick={() => {
                    //   setIsInput(true);
                    //   console.log(values);
                    // }}
                    name="image"
                  />
                  <ErrorMessage name="email" component="div" />
                </motion.div> */}
                <motion.div
                  className={styles.btn}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  // transition={{ duration: 1 }}
                >
                  <button
                    type="submit"
                    onKeyDown={() => {}}
                    onKeyDownCapture={() => {}}
                  >
                    Save
                  </button>
                </motion.div>
              </Form>
            )}
          </Formik>
          <div className={styles.imageContainer}>
            <div>
              <img
                src={data?.imageUrl}
                alt=""
                className={styles.profilePhoto}
              />
            </div>
            <form onSubmit={handleSubmit} id="imageForm">
              {/* <label htmlFor="fileUpload" className={styles.fileLabel}>
                Select file
              </label> */}
              <motion.div className={styles.fileUpload}>
                <input
                  type="file"
                  placeholder="Choose a file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files && e.target.files[0];
                    file && setImage(file);

                    console.log(e.target.files);
                  }}
                  accept="image/*"
                  id="fileUpload"
                />
              </motion.div>
              <motion.div
                className={styles.saveImage}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                // transition={{ duration: 1 }}
              >
                <button type="submit" form="imageForm">
                  Save image
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPage;
