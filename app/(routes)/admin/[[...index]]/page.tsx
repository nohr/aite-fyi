"use client";

import { NextStudio } from "next-sanity/studio";
import config from "sanity.config";
import styles from "./admin.module.scss";

export default function AdminPage() {
  return (
    <section className={styles.admin}>
      <NextStudio config={config} />
    </section>
  );
}
