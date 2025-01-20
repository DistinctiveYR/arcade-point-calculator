import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles['center-container']}>
      <div className={styles.content}>
        <h1>About Us</h1>
        <p>We are two friends passionate about tech & server-side development, and we created this project to bring something cool to the community. Our goal is to keep exploring things out of curiosity & make our techs.</p>
        <p>We believe in collaboration and the power of open-source software. That's why we're sharing our GitHub repositories and LinkedIn profiles below.</p><br />
        <p>Feel free to check out our work and connect with us</p>
      </div>
    </div>
  );
}
