export default function Footer() {
  const release = process.env.NEXT_PUBLIC_RELEASE_VERSION || 'none';
  return (
    <footer className="layout__footer">
      <a
        className="layout__footer-link"
        href="https://github.com/HerrZatacke/svg-wave"
        target="_blank"
      >
        {`this app on GitHub (Version: ${release})`}
      </a>
    </footer>
  );
}
