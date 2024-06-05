import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import success from "../../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const baseurl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    console.log("calling the useeffect");
    if (id && token) {
      const url = `${baseurl}api/users/${id}/verify/${token}`;
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          if (res?.data?.success) {
            setValidUrl(true);
          } else {
            setValidUrl(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error", err);
          setValidUrl(false);
        });
    }
  }, [id, token]);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {validUrl ? (
            <div className={styles.container}>
              <img
                src={success}
                alt="success_img"
                className={styles.success_img}
              />
              <h1>Email verified successfully</h1>
              <Link to="/login">
                <button className={styles.green_btn}>Login</button>
              </Link>
            </div>
          ) : (
            <h1>404 Not Found</h1>
          )}
        </>
      )}
    </Fragment>
  );
};

export default EmailVerify;
