import { useState } from "react";
import StockDetails from "./StockDetails";
import StockSuggestions from "./StockSuggestions";
import { getStockData } from "../api/alphaVantageApi";

function StockContainer() {
	const [showDetails, setShowDetails] = useState(false);
	const [selectedStock, setSelectedStock] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [stockData, setStockData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleShowDetails = async () => {
		const searchSymbol = selectedStock || inputValue.trim();

		if (!searchSymbol) {
			setError("Please enter a stock symbol");
			return;
		}

		try {
			setLoading(true);
			setError(null);


			const apiData = await getStockData(searchSymbol);

			const hasValidData = apiData.currentPrice !== '--' &&
				apiData.open !== '--' &&
				apiData.close !== '--' &&
				apiData.high !== '--' &&
				apiData.low !== '--';

			if (!hasValidData) {
				setError(`Stock "${searchSymbol}" not found or no data available. Please check the symbol and try again.`);
				return;
			}

			setStockData(apiData);
			setShowDetails(true);
		} catch (error) {
			console.error('Error fetching stock data:', error);
			if (error.message && error.message.includes('Failed to fetch')) {
				setError('Network error: Unable to reach the stock API. Please check your internet connection, disable any ad blockers, or try again later.');
			} else if (error.message && error.message.includes('API key')) {
				setError('API key error: Please check your API key in the .env file.');
			} else {
				setError(error.message || 'Failed to fetch stock data. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleSelectFromSuggestions = (symbol) => {
		setSelectedStock(symbol);
		setInputValue(symbol);
		setError(null);
	};

	const handleInputChange = (value) => {
		setInputValue(value);
		setSelectedStock(value);
		setError(null);
	};

	const handleBack = () => {
		setShowDetails(false);
		setStockData(null);
		setSelectedStock("");
		setInputValue("");
		setError(null);
	};

	return (
		<>
			<div className="text-center mb-8">
				<h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-2xl">
					Stock Price Checker
				</h1>
				<p className="text-white/80 font-medium text-lg drop-shadow-lg">
					Real-time market data at your fingertips
				</p>
			</div>

			{error && (
				<div className="mb-6 p-4 bg-red-500/20 border border-red-300/30 text-red-100 rounded-2xl backdrop-blur-md shadow-lg">
					<div className="flex items-center space-x-2">
						<svg className="w-5 h-5 text-red-200" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
						<span className="font-medium">{error}</span>
					</div>
				</div>
			)}

			{!showDetails && (
				<>
					
					<StockSuggestions
						onSelectStock={handleSelectFromSuggestions}
						selectedStock={selectedStock}
						onInputChange={handleInputChange}
					/>

					
					<button
						className="w-full py-4 mb-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] border border-white/20"
						onClick={handleShowDetails}
						disabled={!inputValue.trim() || loading}
					>
						{loading ? (
							<>
								<svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span className="font-semibold">Loading...</span>
							</>
						) : (
							<>
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
								</svg>
								Show Stock Details
							</>
						)}
					</button>
				</>
			)}

			{showDetails && <StockDetails data={stockData} onBack={handleBack} />}
		</>
	);
}

export default StockContainer;
