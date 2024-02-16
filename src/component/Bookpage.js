import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

const BookPage = () => {
  const { isLogin, logout } = useAuth();
  const [ebookpage, setEbookpage] = useState();
  const [localBook, setLocalBook] = useState([]);
 console.log("localBook",localBook);


  const handleLogout = () => {
    localStorage.clear('Product-Api')
    logout();
  };

  useEffect(() => {
    const storeBooksJson = localStorage.getItem('Product-Api');
    if (storeBooksJson) {
      const storeBooks = JSON.parse(storeBooksJson);
      setLocalBook(storeBooks);
    }
  }, []);

  if (!isLogin) {
    return null;
  }

  return (
    <div>
      <div className='LogoSection'>
        <img src='logoas.svg' alt='logo' />
      </div>

      <select onChange={(e) => setEbookpage(e.target.value)}>
        <option>select ebook</option>
        {localBook.map((item, i) => (
          <option key={i} value={item.pdf_link}>{item.product_name}</option>
        ))}
      </select>

      <iframe
        allowFullScreen="allowFullScreen"
        scrolling="no"
        className="fp-iframe"
        src={ebookpage}
        style={{ border: '1px solid lightgray', width: '100%', height: '650px' }}
      ></iframe>

      <div className='LogoutBtn'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default BookPage;
