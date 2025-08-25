const API_BASE_URL = 'https://www.alphavantage.co/query';

export async function getStockData(symbol) {
	try {
		let cleanSymbol = symbol.trim().toUpperCase();

		const indianStocks = [
			'RELIANCE', 'TCS', 'INFY', 'HDFC', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'ITC', 'WIPRO', 'MARUTI',
			'TATAMOTORS', 'ONGC', 'NTPC', 'POWERGRID', 'COALINDIA', 'HCLTECH', 'BAJFINANCE', 'ASIANPAINT',
			'NESTLEIND', 'KOTAKBANK', 'LT', 'AXISBANK', 'BHARTIARTL', 'HINDUNILVR', 'ULTRACEMCO', 'TECHM',
			'ADANIPORTS', 'TATASTEEL', 'JSWSTEEL', 'HINDALCO', 'INDUSINDBK', 'BAJAJ-AUTO', 'HEROMOTOCO',
			'EICHERMOT', 'M&M', 'DRREDDY', 'SUNPHARMA', 'CIPLA', 'DIVISLAB', 'BRITANNIA', 'DABUR',
			'GODREJCP', 'TITAN', 'SHREECEM', 'GRASIM', 'BPCL', 'IOC', 'GAIL', 'ADANIGREEN', 'ADANIENT',
			'SRF', 'APOLLOHOSP', 'ICICIPRULI', 'SBILIFE', 'HDFCLIFE', 'BAJAJFINSV', 'UPL', 'AMBUJACEM',
			'DMART', 'MUTHOOTFIN', 'PAGEIND', 'BERGEPAINT', 'COLPAL', 'TORNTPHARM', 'LUPIN', 'AUROPHARMA',
			'ABBOTINDIA', 'ICICIGI', 'HAVELLS', 'BOSCHLTD', 'GODREJPROP', 'DLF', 'CANBK', 'PNB',
			'BANKBARODA', 'IDFCFIRSTB', 'FEDERALBNK', 'YESBANK', 'UNIONBANK', 'BANDHANBNK', 'RBLBANK',
			'IDBI', 'SYNGENE', 'GLAND', 'ALKEM', 'PIIND', 'ESCORTS', 'BALKRISIND', 'ASHOKLEY', 'TVSMOTOR',
			'MOTHERSUMI', 'TATAPOWER', 'NHPC', 'SJVN', 'IRCTC', 'CONCOR', 'BEL', 'BHEL', 'HAL', 'COFORGE',
			'MPHASIS', 'LTI', 'LTTS', 'MINDTREE', 'PERSISTENT', 'TATAELXSI', 'KPITTECH', 'ZOMATO', 'NYKAA',
			'PAYTM', 'POLYCAB', 'CROMPTON', 'VOLTAS', 'BLUESTARCO', 'WHIRLPOOL', 'RAJESHEXPO', 'TITAGARH',
			'IRFC', 'HUDCO', 'NBCC', 'GMRINFRA', 'ADANIPOWER', 'ADANITRANS', 'ADANITOTAL', 'FORTIS',
			'MAXHEALTH', 'APOLLOTYRE', 'MRF', 'CEATLTD', 'JKTYRE', 'SUNDARMFIN', 'CHOLAFIN', 'MOTILALOFS',
			'ICICISEC', 'HDFCAMC', 'NATIONALUM', 'SAIL', 'NMDC', 'VEDL', 'HINDCOPPER', 'MOIL', 'JINDALSTEL',
			'TATAINVEST', 'TATACHEM', 'TATACOMM', 'TATACONSUM', 'TATAAIG', 'TATAMTRDVR', 'TATAMETALI',
			'TATASPONGE', 'TATASTLLP', 'TATATECH', 'TATATRUST', 'TATAVOLT', 'TATAYODOGA'
		];

		if (!cleanSymbol.includes('.') && indianStocks.includes(cleanSymbol)) {
			cleanSymbol = `${cleanSymbol}.BSE`;
		}

		const apiKey = import.meta.env.VITE_ALPHAVANTAGE_KEY;

		if (!apiKey) {
			throw new Error('API key not found. Please add VITE_ALPHAVANTAGE_KEY to your .env file');
		}

		
		const quoteUrl = `${API_BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(cleanSymbol)}&apikey=${apiKey}`;

		const quoteResponse = await fetch(quoteUrl);

		if (!quoteResponse.ok) {
			const errorText = await quoteResponse.text();
			throw new Error(`API returned ${quoteResponse.status}: ${errorText}`);
		}

		const quoteData = await quoteResponse.json();

		
		console.log('Alpha Vantage API Response for', cleanSymbol, ':', quoteData);

		if (quoteData['Error Message']) {
			throw new Error(quoteData['Error Message']);
		}

		if (quoteData['Note']) {
			throw new Error('API call frequency limit reached. Please try again later.');
		}

		if (quoteData['Information'] && quoteData['Information'].includes('rate limit')) {
			throw new Error('Alpha Vantage API rate limit exceeded (25 requests/day). Please try again tomorrow or upgrade your API key.');
		}

		
		const globalQuote = quoteData['Global Quote'];

		if (!globalQuote || Object.keys(globalQuote).length === 0) {
			
			if (cleanSymbol.endsWith('.BSE')) {
				console.log('Retrying without .BSE suffix...');
				return await getStockData(symbol.trim().toUpperCase());
			}
			throw new Error('No data found for this symbol');
		}

		const mappedData = {
			name: globalQuote['01. symbol'] || cleanSymbol,
			currentPrice: globalQuote['05. price'] || '--',
			open: globalQuote['02. open'] || '--',
			close: globalQuote['08. previous close'] || '--',
			high: globalQuote['03. high'] || '--',
			low: globalQuote['04. low'] || '--'
		};

		return mappedData;

	} catch (error) {
		console.error('Alpha Vantage API Error:', error);
		throw new Error(`Failed to fetch stock data: ${error.message}`);
	}
}
