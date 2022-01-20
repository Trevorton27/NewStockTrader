import React from 'react';

function HeaderTrade() {
  return (
    <div className='text-center mt-3' id='goup'>
      <h2>Trading Page</h2>
      <p>Search by stock symbol to trade. For example, type TSLA for TESLA.</p>
      <hp>
        Click{' '}
        <a
          href='https://www.nasdaq.com/market-activity/stocks/screener'
          target='_blank'
          rel='noopener noreferrer'
        >
          here
        </a>{' '}
        for a comprehensive list of different stock symbols which you can search
        for by company name.
      </hp>
      <hr />
    </div>
  );
}

export default HeaderTrade;
