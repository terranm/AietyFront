import React from "react";
import styles from "./AlertModal.module.css";

const AlertModal = (props) => {
  const { open, close, header, func } = props;

  return (
    <div className={`${styles.openModal} ${open && styles.modal}`}>
      {open ? (
        <section>
          {/* <header>{header}</header> */}
          <main>{props.children}</main>
          <footer>
            <button className={styles.close} onClick={close}>
              취소
            </button>
            <button className={styles.close} onClick={func ? func : close}>
              <b>확인</b>
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default AlertModal;
