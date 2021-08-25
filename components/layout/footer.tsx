import Link from 'next/link'
import styles from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ DJ Events 2022</p>
      <p>
        <Link href="/about">
          <a>About This Project</a>
        </Link>
      </p>
    </footer>
  )
}

export default Footer
