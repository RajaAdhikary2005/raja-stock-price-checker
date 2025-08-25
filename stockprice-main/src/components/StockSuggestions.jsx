import { useState, useRef, useEffect } from "react";

const POPULAR_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", country: "IN" },
  { symbol: "TCS", name: "Tata Consultancy Services", country: "IN" },
  { symbol: "INFY", name: "Infosys Ltd", country: "IN" },
  { symbol: "HDFC", name: "HDFC Bank Ltd", country: "IN" },
  { symbol: "HDFCBANK", name: "HDFC Bank", country: "IN" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", country: "IN" },
  { symbol: "SBIN", name: "State Bank of India", country: "IN" },
  { symbol: "ITC", name: "ITC Ltd", country: "IN" },
  { symbol: "WIPRO", name: "Wipro Ltd", country: "IN" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", country: "IN" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", country: "IN" },
  { symbol: "ONGC", name: "Oil & Natural Gas Corp", country: "IN" },
  { symbol: "NTPC", name: "NTPC Ltd", country: "IN" },
  { symbol: "POWERGRID", name: "Power Grid Corp", country: "IN" },
  { symbol: "COALINDIA", name: "Coal India Ltd", country: "IN" },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", country: "IN" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", country: "IN" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd", country: "IN" },
  { symbol: "NESTLEIND", name: "Nestle India Ltd", country: "IN" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", country: "IN" },
  { symbol: "LT", name: "Larsen & Toubro Ltd", country: "IN" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", country: "IN" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", country: "IN" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", country: "IN" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd", country: "IN" },
  { symbol: "TECHM", name: "Tech Mahindra Ltd", country: "IN" },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd", country: "IN" },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", country: "IN" },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd", country: "IN" },
  { symbol: "HINDALCO", name: "Hindalco Industries Ltd", country: "IN" },
  { symbol: "INDUSINDBK", name: "IndusInd Bank Ltd", country: "IN" },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto Ltd", country: "IN" },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp Ltd", country: "IN" },
  { symbol: "EICHERMOT", name: "Eicher Motors Ltd", country: "IN" },
  { symbol: "M&M", name: "Mahindra & Mahindra Ltd", country: "IN" },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", country: "IN" },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Ind", country: "IN" },
  { symbol: "CIPLA", name: "Cipla Ltd", country: "IN" },
  { symbol: "DIVISLAB", name: "Divi's Laboratories Ltd", country: "IN" },
  { symbol: "BRITANNIA", name: "Britannia Industries Ltd", country: "IN" },
  { symbol: "DABUR", name: "Dabur India Ltd", country: "IN" },
  { symbol: "GODREJCP", name: "Godrej Consumer Products", country: "IN" },
  { symbol: "TITAN", name: "Titan Company Ltd", country: "IN" },
  { symbol: "SHREECEM", name: "Shree Cement Ltd", country: "IN" },
  { symbol: "GRASIM", name: "Grasim Industries Ltd", country: "IN" },
  { symbol: "BPCL", name: "Bharat Petroleum Corp", country: "IN" },
  { symbol: "IOC", name: "Indian Oil Corporation", country: "IN" },
  { symbol: "GAIL", name: "GAIL (India) Ltd", country: "IN" },
  { symbol: "ADANIGREEN", name: "Adani Green Energy Ltd", country: "IN" },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd", country: "IN" },
  { symbol: "SRF", name: "SRF Ltd", country: "IN" },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals Enterprise", country: "IN" },
  { symbol: "ICICIPRULI", name: "ICICI Prudential Life Ins.", country: "IN" },
  { symbol: "SBILIFE", name: "SBI Life Insurance Co.", country: "IN" },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance Co.", country: "IN" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd", country: "IN" },
  { symbol: "UPL", name: "UPL Ltd", country: "IN" },
  { symbol: "AMBUJACEM", name: "Ambuja Cements Ltd", country: "IN" },
  { symbol: "DMART", name: "Avenue Supermarts (DMart)", country: "IN" },
  { symbol: "MUTHOOTFIN", name: "Muthoot Finance Ltd", country: "IN" },
  { symbol: "PAGEIND", name: "Page Industries Ltd", country: "IN" },
  { symbol: "BERGEPAINT", name: "Berger Paints India Ltd", country: "IN" },
  { symbol: "COLPAL", name: "Colgate-Palmolive (India)", country: "IN" },
  { symbol: "TORNTPHARM", name: "Torrent Pharmaceuticals", country: "IN" },
  { symbol: "LUPIN", name: "Lupin Ltd", country: "IN" },
  { symbol: "AUROPHARMA", name: "Aurobindo Pharma Ltd", country: "IN" },
  { symbol: "ABBOTINDIA", name: "Abbott India Ltd", country: "IN" },
  { symbol: "ICICIGI", name: "ICICI Lombard General Ins.", country: "IN" },
  { symbol: "HAVELLS", name: "Havells India Ltd", country: "IN" },
  { symbol: "BOSCHLTD", name: "Bosch Ltd", country: "IN" },
  { symbol: "GODREJPROP", name: "Godrej Properties Ltd", country: "IN" },
  { symbol: "DLF", name: "DLF Ltd", country: "IN" },
  { symbol: "CANBK", name: "Canara Bank", country: "IN" },
  { symbol: "PNB", name: "Punjab National Bank", country: "IN" },
  { symbol: "BANKBARODA", name: "Bank of Baroda", country: "IN" },
  { symbol: "IDFCFIRSTB", name: "IDFC First Bank", country: "IN" },
  { symbol: "FEDERALBNK", name: "Federal Bank", country: "IN" },
  { symbol: "YESBANK", name: "Yes Bank", country: "IN" },
  { symbol: "UNIONBANK", name: "Union Bank of India", country: "IN" },
  { symbol: "BANDHANBNK", name: "Bandhan Bank", country: "IN" },
  { symbol: "RBLBANK", name: "RBL Bank", country: "IN" },
  { symbol: "IDBI", name: "IDBI Bank", country: "IN" },
  { symbol: "SYNGENE", name: "Syngene International Ltd", country: "IN" },
  { symbol: "GLAND", name: "Gland Pharma Ltd", country: "IN" },
  { symbol: "ALKEM", name: "Alkem Laboratories Ltd", country: "IN" },
  { symbol: "PIIND", name: "PI Industries Ltd", country: "IN" },
  { symbol: "ESCORTS", name: "Escorts Kubota Ltd", country: "IN" },
  { symbol: "BALKRISIND", name: "Balkrishna Industries Ltd", country: "IN" },
  { symbol: "ASHOKLEY", name: "Ashok Leyland Ltd", country: "IN" },
  { symbol: "TVSMOTOR", name: "TVS Motor Company Ltd", country: "IN" },
  { symbol: "MOTHERSUMI", name: "Samvardhana Motherson Intl", country: "IN" },
  { symbol: "TATAPOWER", name: "Tata Power Co. Ltd", country: "IN" },
  { symbol: "NHPC", name: "NHPC Ltd", country: "IN" },
  { symbol: "SJVN", name: "SJVN Ltd", country: "IN" },
  { symbol: "IRCTC", name: "Indian Railway Catering & Tourism", country: "IN" },
  { symbol: "CONCOR", name: "Container Corporation of India", country: "IN" },
  { symbol: "BEL", name: "Bharat Electronics Ltd", country: "IN" },
  { symbol: "BHEL", name: "Bharat Heavy Electricals Ltd", country: "IN" },
  { symbol: "HAL", name: "Hindustan Aeronautics Ltd", country: "IN" },
  { symbol: "COFORGE", name: "Coforge Ltd", country: "IN" },
  { symbol: "MPHASIS", name: "Mphasis Ltd", country: "IN" },
  { symbol: "LTI", name: "Larsen & Toubro Infotech", country: "IN" },
  { symbol: "LTTS", name: "L&T Technology Services", country: "IN" },
  { symbol: "MINDTREE", name: "Mindtree Ltd", country: "IN" },
  { symbol: "PERSISTENT", name: "Persistent Systems Ltd", country: "IN" },
  { symbol: "TATAELXSI", name: "Tata Elxsi Ltd", country: "IN" },
  { symbol: "KPITTECH", name: "KPIT Technologies Ltd", country: "IN" },
  { symbol: "ZOMATO", name: "Zomato Ltd", country: "IN" },
  { symbol: "NYKAA", name: "FSN E-Commerce (Nykaa)", country: "IN" },
  { symbol: "PAYTM", name: "One 97 Communications (Paytm)", country: "IN" },
  { symbol: "POLYCAB", name: "Polycab India Ltd", country: "IN" },
  { symbol: "CROMPTON", name: "Crompton Greaves Consumer", country: "IN" },
  { symbol: "VOLTAS", name: "Voltas Ltd", country: "IN" },
  { symbol: "BLUESTARCO", name: "Blue Star Ltd", country: "IN" },
  { symbol: "WHIRLPOOL", name: "Whirlpool of India Ltd", country: "IN" },
  { symbol: "RAJESHEXPO", name: "Rajesh Exports Ltd", country: "IN" },
  { symbol: "TITAGARH", name: "Titagarh Rail Systems Ltd", country: "IN" },
  { symbol: "IRFC", name: "Indian Railway Finance Corp", country: "IN" },
  { symbol: "HUDCO", name: "Housing & Urban Development Corp", country: "IN" },
  { symbol: "NBCC", name: "NBCC (India) Ltd", country: "IN" },
  { symbol: "GMRINFRA", name: "GMR Airports Infrastructure", country: "IN" },
  { symbol: "ADANIPOWER", name: "Adani Power Ltd", country: "IN" },
  { symbol: "ADANITRANS", name: "Adani Transmission Ltd", country: "IN" },
  { symbol: "ADANITOTAL", name: "Adani Total Gas Ltd", country: "IN" },
  { symbol: "FORTIS", name: "Fortis Healthcare Ltd", country: "IN" },
  { symbol: "MAXHEALTH", name: "Max Healthcare Institute Ltd", country: "IN" },
  { symbol: "APOLLOTYRE", name: "Apollo Tyres Ltd", country: "IN" },
  { symbol: "MRF", name: "MRF Ltd", country: "IN" },
  { symbol: "CEATLTD", name: "CEAT Ltd", country: "IN" },
  { symbol: "JKTYRE", name: "JK Tyre & Industries Ltd", country: "IN" },
  { symbol: "SUNDARMFIN", name: "Sundaram Finance Ltd", country: "IN" },
  { symbol: "CHOLAFIN", name: "Cholamandalam Investment", country: "IN" },
  { symbol: "MOTILALOFS", name: "Motilal Oswal Financial Services", country: "IN" },
  { symbol: "ICICISEC", name: "ICICI Securities Ltd", country: "IN" },
  { symbol: "HDFCAMC", name: "HDFC Asset Management Co.", country: "IN" },
  { symbol: "NATIONALUM", name: "National Aluminium Co.", country: "IN" },
  { symbol: "SAIL", name: "Steel Authority of India", country: "IN" },
  { symbol: "NMDC", name: "NMDC Ltd", country: "IN" },
  { symbol: "VEDL", name: "Vedanta Ltd", country: "IN" },
  { symbol: "HINDCOPPER", name: "Hindustan Copper Ltd", country: "IN" },
  { symbol: "MOIL", name: "MOIL Ltd", country: "IN" },
  { symbol: "JINDALSTEL", name: "Jindal Steel & Power Ltd", country: "IN" },
  { symbol: "TATAINVEST", name: "Tata Investment Corp", country: "IN" },
  { symbol: "TATACHEM", name: "Tata Chemicals Ltd", country: "IN" },
  { symbol: "TATACOMM", name: "Tata Communications Ltd", country: "IN" },
  { symbol: "TATACONSUM", name: "Tata Consumer Products Ltd", country: "IN" },
  { symbol: "TATAAIG", name: "Tata AIG General Insurance", country: "IN" },
  { symbol: "TATAMTRDVR", name: "Tata Motors DVR", country: "IN" },
  { symbol: "TATAMETALI", name: "Tata Metaliks Ltd", country: "IN" },
  { symbol: "TATASPONGE", name: "Tata Sponge Iron Ltd", country: "IN" },
  { symbol: "TATASTLLP", name: "Tata Steel Long Products", country: "IN" },
  { symbol: "TATATECH", name: "Tata Technologies Ltd", country: "IN" },
  { symbol: "TATATRUST", name: "Tata Trusts", country: "IN" },
  { symbol: "TATAVOLT", name: "Tata Power Renewable Energy", country: "IN" },
  { symbol: "TATAYODOGA", name: "Tata Yodogawa Ltd", country: "IN" },
  
  // US Stocks - Tech Giants
  { symbol: "AAPL", name: "Apple Inc", country: "US" },
  { symbol: "GOOGL", name: "Alphabet Inc (Google)", country: "US" },
  { symbol: "MSFT", name: "Microsoft Corp", country: "US" },
  { symbol: "AMZN", name: "Amazon.com Inc", country: "US" },
  { symbol: "TSLA", name: "Tesla Inc", country: "US" },
  { symbol: "META", name: "Meta Platforms Inc", country: "US" },
  { symbol: "NVDA", name: "NVIDIA Corp", country: "US" },
  { symbol: "NFLX", name: "Netflix Inc", country: "US" },
  { symbol: "AMD", name: "Advanced Micro Devices", country: "US" },
  { symbol: "INTC", name: "Intel Corp", country: "US" },
  { symbol: "PYPL", name: "PayPal Holdings Inc", country: "US" },
  { symbol: "ADBE", name: "Adobe Inc", country: "US" },
  { symbol: "CRM", name: "Salesforce Inc", country: "US" },
  { symbol: "ORCL", name: "Oracle Corp", country: "US" },
  { symbol: "IBM", name: "International Business Machines", country: "US" },
  { symbol: "SHOP", name: "Shopify Inc", country: "US" },
  { symbol: "UBER", name: "Uber Technologies Inc", country: "US" },
  { symbol: "LYFT", name: "Lyft Inc", country: "US" },
  { symbol: "SNAP", name: "Snap Inc", country: "US" },
  { symbol: "TWTR", name: "Twitter Inc", country: "US" },
  { symbol: "SPOT", name: "Spotify Technology SA", country: "US" },
  { symbol: "ZOOM", name: "Zoom Video Communications", country: "US" },
  { symbol: "ROKU", name: "Roku Inc", country: "US" },
  { symbol: "SQ", name: "Block Inc (Square)", country: "US" },
  { symbol: "PLTR", name: "Palantir Technologies", country: "US" },
  { symbol: "JPM", name: "JPMorgan Chase & Co", country: "US" },
  { symbol: "BAC", name: "Bank of America Corp", country: "US" },
  { symbol: "WFC", name: "Wells Fargo & Co", country: "US" },
  { symbol: "GS", name: "Goldman Sachs Group", country: "US" },
  { symbol: "V", name: "Visa Inc", country: "US" },
  { symbol: "MA", name: "Mastercard Inc", country: "US" },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc", country: "US" },
  { symbol: "JNJ", name: "Johnson & Johnson", country: "US" },
  { symbol: "PG", name: "Procter & Gamble Co", country: "US" },
  { symbol: "KO", name: "Coca-Cola Co", country: "US" },
  { symbol: "PEP", name: "PepsiCo Inc", country: "US" },
  { symbol: "WMT", name: "Walmart Inc", country: "US" },
  { symbol: "HD", name: "Home Depot Inc", country: "US" },
  { symbol: "DIS", name: "Walt Disney Co", country: "US" },
  { symbol: "NKE", name: "Nike Inc", country: "US" },
  { symbol: "MCD", name: "McDonald's Corp", country: "US" },
  { symbol: "SBUX", name: "Starbucks Corp", country: "US" },
  { symbol: "XOM", name: "Exxon Mobil Corp", country: "US" },
  { symbol: "CVX", name: "Chevron Corp", country: "US" },
  { symbol: "BA", name: "Boeing Co", country: "US" },
  { symbol: "CAT", name: "Caterpillar Inc", country: "US" },
  { symbol: "GE", name: "General Electric Co", country: "US" },
  { symbol: "F", name: "Ford Motor Co", country: "US" },
  { symbol: "GM", name: "General Motors Co", country: "US" }
];

function StockSuggestions({ onSelectStock, selectedStock, onInputChange }) {
  const [inputValue, setInputValue] = useState(selectedStock || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);


  useEffect(() => {
    setInputValue(selectedStock || "");
  }, [selectedStock]);


  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const filtered = POPULAR_STOCKS.filter(stock =>
        stock.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
        stock.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredStocks(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredStocks([]);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };


  const handleSelectStock = (stock) => {
    setInputValue(stock.symbol);
    setShowSuggestions(false);
    onSelectStock(stock.symbol);
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 0 && filteredStocks.length > 0) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setShowSuggestions(false);
      
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full mb-4">
    
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Type stock symbol or company name (e.g., AAPL, RELIANCE, TCS)..."
          className="w-full pl-12 pr-5 py-3 rounded-2xl bg-white/70 backdrop-blur border-none shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg placeholder-gray-500 transition-all duration-200 focus:bg-white/90"
          autoComplete="off"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </span>
      </div>

 
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 max-h-80 overflow-hidden z-50"
        >
        
          <div className="max-h-80 overflow-y-auto">
          
            {filteredStocks.some(stock => stock.country === "IN") && (
              <>
                <div className="px-3 py-2 bg-blue-50/70 text-blue-800 font-semibold text-sm sticky top-0">
                  🇮🇳 Indian Stocks
                </div>
                {filteredStocks
                  .filter(stock => stock.country === "IN")
                  .map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleSelectStock(stock)}
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-blue-100/70 focus:bg-blue-200/80 transition-all border-b border-gray-100/50 focus:outline-none"
                    >
                      <div className="font-semibold text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </button>
                  ))}
              </>
            )}

           
            {filteredStocks.some(stock => stock.country === "US") && (
              <>
                <div className="px-3 py-2 bg-green-50/70 text-green-800 font-semibold text-sm sticky top-0">
                  🇺🇸 US Stocks
                </div>
                {filteredStocks
                  .filter(stock => stock.country === "US")
                  .map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleSelectStock(stock)}
                      className="w-full px-4 py-3 text-left rounded-lg hover:bg-green-100/70 focus:bg-green-200/80 transition-all border-b border-gray-100/50 last:border-b-0 focus:outline-none"
                    >
                      <div className="font-semibold text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-600">{stock.name}</div>
                    </button>
                  ))}
              </>
            )}

            {filteredStocks.length === 0 && inputValue.trim() && (
              <div className="px-4 py-6 text-center text-gray-500">
                <div className="mb-2">No suggestions found for "{inputValue}"</div>
                <div className="text-sm">You can still search for any stock symbol</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { POPULAR_STOCKS };
export default StockSuggestions;
