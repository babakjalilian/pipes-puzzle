import { messages } from 'Utils/constants';
import './Footer.scss';

function Footer(): JSX.Element {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='copyright'>
          <p className='copyright-text'>
            &copy; {new Date().getFullYear()} {messages.app.title}.{' '}
            {messages.text.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
