import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Image Gallery</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Image Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
