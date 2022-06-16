import 'Components/layout/Layout.scss';
import Footer from './footer/Footer';
import Header from './header/Header';

type TChildren =
  | React.ReactNode
  | JSX.Element
  | JSX.Element[]
  | string
  | string[]
  | React.ReactChild
  | React.ReactChild[];

interface ILayout {
  children?: TChildren;
}

function Layout({ children }: ILayout): JSX.Element {
  return (
    <>
      <Header />
      <main className='layout'>
        <div className='layout-container'>
          <div className='layout-content'>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
