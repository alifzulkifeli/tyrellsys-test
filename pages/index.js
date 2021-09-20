import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function Home() {
	const [list, setList] = useState();
	const [noPlayer, setNoPlayer] = useState();
	const [loading, setLoading] = useState(false);

	const getData = async () => {
    setLoading(true)
		if (noPlayer < 1 || isNaN(filterInt(noPlayer))) {
			toast.error("Input value does not exist or value is invalid");
			setList();
      setLoading(false)
		} else {
			const arrayList = [];
			const result = await axios(
				`https://tyrellsys-test-1.herokuapp.com/getCardList/${noPlayer}`
			);

			for (const singleList in result.data) {
				arrayList.push(result.data[singleList]);
			}
			setList(arrayList);
		}
    setLoading(false)
	};

	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt#a_stricter_parse_function
	//there is problem when using parseInt()
	//eg. "7abc" is not return as NaN
	function filterInt(value) {
		if (/^[-+]?(\d+|Infinity)$/.test(value)) {
			return Number(value);
		} else {
			return NaN;
		}
	}

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="grid justify-items-center">
					<div className="flex w-5/6 flex-row md:w-1/2 lg:w-1/4  justify-center mt-10 ">
						<div className=" relative ">
							<input
								type="text"
								id='"form-subscribe-Subscribe'
								className=" rounded-lg border-transparent  border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent "
								placeholder="Number of Player"
								onChange={(e) => setNoPlayer(e.target.value)}
								value={noPlayer}
							/>
						</div>
						<button
							className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-purple-200 ml-4"
							type="submit"
							onClick={() => getData()}
						>
							Play
						</button>
					</div>
					{list &&
						list.map((singleList, index) => {
							return (
								<div className=" p-4 ">
									<h1 className="font-bold">{`player ${index + 1}:`}</h1>
									{singleList.map((card, indx) => {
										if (indx % 10 == 0) {
											return <hr />;
										}
										return <span>{`${card},`}</span>;
									})}
								</div>
							);
						})}
				</div>
			)}
		</>
	);
}
