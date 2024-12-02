import useHttp from "../hooks/useHttp.js"; //fetches meal data from the API
import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx"

const requestConfig = {}; //useHttp hook uses the default HTTP GET method for requests if no method is provided

export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if(isLoading) {
        return <p className="center">Fetching Meals...</p>;
    }

    if(error) {
        return <Error title="Failed to fetch meals" message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => ( //loops through the array of fetched meals and renders each meal as a MealItem
                <MealItem key={meal.id} meal={meal} /> //key property ensures efficient rendering by uniquely identifying each meal
            ))}
        </ul>
    );
}