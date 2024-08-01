import { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import '../styles/cartList.css'; // Make sure you have the correct CSS file

const CartList = () => {
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    // Simulate a data fetching process
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs only once after the initial render

  if (isLoading) {
    return (
      <div className='loading-container'>
        <Circles
          height="80"
          width="80"
          color="#6B66F3"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return <div className="container"><h1>Show the CartList here</h1></div>;
}

export default CartList;
