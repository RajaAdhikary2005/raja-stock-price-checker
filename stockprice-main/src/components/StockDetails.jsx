function StockDetails({ data, onBack }) {
	
	const isIndianStock = data?.name?.includes('.BSE') ||
		['RELIANCE', 'TCS', 'INFY', 'HDFC', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'ITC', 'WIPRO', 'MARUTI', 'TATAMOTORS', 'ONGC', 'NTPC', 'POWERGRID', 'COALINDIA', 'HCLTECH', 'BAJFINANCE', 'ASIANPAINT', 'NESTLEIND', 'KOTAKBANK'].includes(data?.name?.replace('.BSE', ''));

	const currencySymbol = isIndianStock ? '₹' : '$';
	const countryFlag = isIndianStock ? '🇮🇳' : '🇺🇸';

	return (
		<div className="w-full flex flex-col gap-6 z-10 mt-4">
			<div className="flex flex-col items-center mb-2">
				<span id="stock-name" className="text-xl font-extrabold text-blue-900 tracking-wide drop-shadow flex items-center gap-2">
					{countryFlag} {data?.name || "Stock Name"}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold text-gray-800 text-lg">Current Price:</span>
				<span id="current-price" className="text-gray-900 font-extrabold text-xl drop-shadow">
					{currencySymbol}{data?.currentPrice ?? "--"}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold text-gray-800 text-lg">Today's Open:</span>
				<span id="today-open" className="text-yellow-700 font-extrabold text-xl drop-shadow">
					{currencySymbol}{data?.open ?? "--"}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold text-gray-800 text-lg">Previous Close:</span>
				<span id="today-close" className="text-purple-700 font-extrabold text-xl drop-shadow">
					{currencySymbol}{data?.close ?? "--"}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold text-gray-800 text-lg">Today's High:</span>
				<span id="today-high" className="text-green-700 font-extrabold text-xl drop-shadow">
					{currencySymbol}{data?.high ?? "--"}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span className="font-semibold text-gray-800 text-lg">Today's Low:</span>
				<span id="today-low" className="text-red-700 font-extrabold text-xl drop-shadow">
					{currencySymbol}{data?.low ?? "--"}
				</span>
			</div>

			{onBack && (
				<button
					onClick={onBack}
					className="w-full py-3 mt-4 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg transition-colors z-10"
				>
					Search Another Stock
				</button>
			)}
		</div>
	);
}

export default StockDetails;
