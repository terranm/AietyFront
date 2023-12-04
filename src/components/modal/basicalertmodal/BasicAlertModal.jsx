import React from "react";
import styles from "./BasicAlertModal.module.css";
import { useNavigate } from "react-router-dom";

//basicAlertType : "close", "reload" 두개

const BasicAlertModal = (props) => {
  const navigate = useNavigate();
  const { open, close, type } = props;

  const handleAlert = () => {
    if (type == "close") {
      close();
    }
    if (type == "reload") {
      window.location.reload();
    }
    if (type == "home") {
      navigate("/");
    }
  };

  return (
    <div className={`${styles.openModal} ${open && styles.modal}`}>
      {open ? (
        <section>
          <main>{props.children}</main>
          <footer>
            <button className={styles.close} onClick={handleAlert}>
              확인
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default BasicAlertModal;
