import StockContainer from "./components/StockContainer";

function App() {
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
			style={{ backgroundImage: 'url(/background.jpeg)' }}
		>
			<div className="absolute inset-0 bg-black/20"></div>


			<div className="backdrop-blur-2xl bg-white/25 border border-white/30 shadow-2xl rounded-3xl p-12 w-full max-w-2xl flex flex-col items-center relative z-10 mx-4"
				style={{
					boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset'
				}}>
				<StockContainer />
			</div>
		</div>
	);
}

export default App;
