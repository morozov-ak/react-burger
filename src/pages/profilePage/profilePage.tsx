import React, { FunctionComponent } from "react";
import styles from "./profilePage.module.css";
import { ProfileSidebar } from "../../components/profileSidebar/profileSidebar";
import { ProfileEdit } from "../../components/profileEdit/profileEdit";

export const ProfilePage:FunctionComponent = () => {
    return (
      <div className={styles.content}>
        <ProfileSidebar/>
        <ProfileEdit/>
      </div>
    );
}
