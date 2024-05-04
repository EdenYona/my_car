import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./budgetSearch.scss";
import { sendToAI } from '../../ai.mjs';

const BudgetSearch = () => {
  const userInput = useRef();
  const navigate = useNavigate();

  const handleSearch = async e => {
    e.preventDefault();
    try {
        const returnValue = await sendToAI(userInput.current.value);
        console.log(returnValue); // Print the return value
        // fill the "response" div with the return value
        document.querySelector('.response').innerHTML = returnValue;
    } catch (error) {
        console.error('Error occurred:', error); // Handle any errors
    }
};


  return (
    <div className="budgetSearch">
      <span className="search-title">AI here to assist you.</span>
      <form onSubmit={handleSearch}>
        <input
          ref={userInput}
          type="text"
          min="0"
          placeholder="How can i help?"
          step="100"
        />
        <button type="submit">Send</button>
      </form>
      {/* make some space between the divs */}
      <br></br>
      <br></br>
      <div className="response">
        <span className="response"></span>
      </div>
    </div>
  );
};

export default BudgetSearch;
